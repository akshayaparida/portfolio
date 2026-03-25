import { LearningModule } from "@/types/learning";

export const awsDeploymentModule: LearningModule = {
  id: "aws-deployment",
  title: "Module 5: Scalable Cloud Architecture for ML",
  description:
    "Deploy a containerized machine learning model to AWS utilizing S3, ECR, and ECS for scalable, robust production service.",
  status: "in-progress",
  detailedContent: `# Orchestrating ML Containers on AWS

When moving from local Docker containers to production-grade deployments, the cloud provides the necessary scalability, reliability, and security. We'll explore how to host our model artifacts securely, manage Docker images with managed registries, and orchestrate containers across virtual instances using Amazon Web Services (AWS).

## What You'll Learn

| # | Topic | Skill |
|:-:|:------|:------|
| 1 | **IAM & Least Privilege** | Configure deployment identities securely |
| 2 | **Remote Artifacts (S3)** | Store and version large ML models with DVC |
| 3 | **Docker Optimization (ECR)** | Build secure images utilizing build secrets |
| 4 | **Container Orchestration (ECS)**| Manage scalable compute clusters via EC2 |
| 5 | **Resource Management** | Teardown architecture and cost control |

## The Deployment Architecture

| Service | Purpose in ML Deployment |
|:--------|:-------------------------|
| **IAM** | Identity & Access Management for least privilege configuration. |
| **S3**  | Remote storage for large DVC artifacts (models, datasets). |
| **ECR** | Elastic Container Registry for hosting Docker images securely. |
| **ECS** | Elastic Container Service for orchestrating container deployments. |
| **EC2** | Elastic Compute Cloud instances to provide compute for ECS clusters. |

---

## 1. Setting Up Deployment Identities (IAM)

**Why This Matters:**
Using an AWS root account for routine deployment tasks is a significant security risk. We follow the principle of least privilege by creating a dedicated IAM user with only the necessary permissions.

### Steps to Create a Deployment User
1. Navigate to IAM in the AWS Management Console.
2. Create an IAM User (e.g., \`ml-deployer-account\`).
3. Attach policies: \`AmazonS3FullAccess\`, \`AmazonEC2ContainerRegistryFullAccess\`, \`AmazonECS_FullAccess\`.
4. Create an inline policy allowing specific actions like \`iam:PassRole\` for generating ECS instances, \`ec2:RunInstances\`, and CloudWatch log management.
5. Generate an **Access Key ID** and **Secret Access Key** and configure the \`aws\` CLI using \`aws configure\`.

---

## 2. Remote Artifact Storage (S3 & DVC)

**Why This Matters:**
Large binaries, such as serialized models (\`.pkl\`) and parquet data lakes, shouldn't be tracked in Git. We utilize DVC (Data Version Control) paired with an S3 bucket configured for versioning to protect against overwrites.

\`\`\`bash
# Create an S3 Bucket securely via CLI
BUCKET_NAME="ml-artifact-store-unique-123"
aws s3 mb s3://\${BUCKET_NAME} --region us-east-1

# Enable Versioning for safety
aws s3api put-bucket-versioning --bucket \${BUCKET_NAME} --versioning-configuration Status=Enabled

# Configure DVC to push to S3
dvc remote add -d s3remote s3://\${BUCKET_NAME}/dvc-store
dvc push
\`\`\`

---

## 3. Optimizing the Docker Image (ECR)

**Why This Matters:**
Instead of packaging gigantic model artifacts into a Docker repository directly, we pull them during the build pipeline using secure mount patterns. We then push the Docker image to ECR for managed hosting.

### Secure DVC Build via Secrets
Never bake AWS credentials into Docker images. Use Docker Buildkit's \`--mount=type=secret\`.

\`\`\`dockerfile
# Inside the Dockerfile
RUN --mount=type=secret,id=aws,target=\${HOME}/.aws/credentials,uid=1001,gid=1001 \\
    dvc pull /app/artifacts/models/processor.pkl /app/artifacts/models/model.pkl -v
\`\`\`

### Pushing to ECR
Create the resilient repository:
\`\`\`bash
aws ecr create-repository \\
    --repository-name ml-container-repo \\
    --image-scanning-configuration scanOnPush=true \\
    --image-tag-mutability IMMUTABLE # Prevents accidental tag overwrites in production
\`\`\`

Authenticate and push using the BuildKit secret logic:
\`\`\`bash
# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin \$AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Build securely mounting your local IAM credentials
docker buildx build --secret id=aws,src=\$HOME/.aws/credentials --platform linux/amd64 -t ml-container-repo:v1 .

# Tag & Push
docker tag ml-container-repo:v1 \$AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/ml-container-repo:v1
docker push \$AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/ml-container-repo:v1
\`\`\`

---

## 4. Container Orchestration (ECS & EC2)

**Why This Matters:**
Running a container manually doesn't scale. ECS coordinates clusters of resources, determining where, when, and how to run tasks reliably.

### Provisioning the EC2 Cluster

1. **Cluster Creation**: Define a logical grouping (e.g., \`ml-cluster\`).
2. **IAM Roles**: Establish the \`ecsInstanceRole\` allowing EC2 instances to speak to ECS. Establish \`ecsTaskExecutionRole\` allowing tasks to pull ECR images & write logs.
3. **Security Groups**: Allow SSH (port 22) restricted to your IP, and App Server Traffic (port 8000).
4. **Bootstrapping**: Upon EC2 launch, use \`user-data.sh\` to configure the ECS agent:

\`\`\`bash
#!/bin/bash
mkdir -p /etc/ecs
echo ECS_CLUSTER='ml-cluster' >> /etc/ecs/ecs.config
\`\`\`

Launch the instance using an **ECS-Optimized AMI**.

### ECS Task Definitions & Service
A Task Definition dictates how the container runs (memory, CPU, network mode, and roles).

\`\`\`json
{
  "family": "ml-api-task",
  "requiresCompatibilities": ["EC2"],
  "networkMode": "bridge",
  "executionRoleArn": "...",
  "containerDefinitions": [
    {
      "name": "ml-api",
      "image": "YOUR_ECR_IMAGE_URI",
      "memoryReservation": 512,
      "portMappings": [{"containerPort": 8000, "hostPort": 8000, "protocol": "tcp"}],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/ml-api-logs",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
\`\`\`

Register the task definition, then create a **Service** specifying a desired task count to ensure high availability.

---

## 5. Teardown and Resource Management

To avoid surprise billing, systematically tear down cloud artifacts.
Reverse order is essential due to dependencies:
1. Delete ECS Service -> Delete ECS Task Definition -> Delete ECS Cluster
2. Terminate EC2 Instances -> Delete EC2 Security Groups
3. Empty S3 Bucket -> Delete S3 Bucket
4. Delete ECR Repository Images -> Delete ECR Repository
5. Delete CloudWatch Logs

---

## TL;DR - Quick Recall

**Key Takeaways:**
- **Least Privilege Constraints**: Lock down identities utilizing strict IAM configurations to avoid breaches.
- **Docker Secrets**: Keep deployment credentials securely handled utilizing Docker build toolkit mounts, preventing them from bleeding into repository images.
- **Controlled Immutability**: Apply versioning to S3 and mark ECR registries as IMMUTABLE to govern deployment state safely.

<details>
<summary><strong>Quick Commands Reference (Click to Expand)</strong></summary>

\`\`\`bash
# Create an S3 Bucket dynamically
aws s3 mb s3://my-ml-artifacts-bucket --region us-east-1

# Enable protection versioning
aws s3api put-bucket-versioning --bucket my-ml-artifacts-bucket --versioning-configuration Status=Enabled

# Docker Auth to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
\`\`\`
</details>
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "md-aws-1",
      question:
        "Why should you create a dedicated IAM user for deployment logic?",
      options: [
        "To avoid exposing and potentially compromising root credentials",
        "It provides significantly better network bandwidth to EC2",
        "Root accounts are limited in the number of ECR registries they can create",
        "To automatically decrease region latency",
      ],
      correctAnswer: 0,
      explanation:
        "Following the principle of least privilege, specific IAM roles map explicitly to deployment responsibilities without exposing absolute system rights through root credentials.",
      difficulty: "easy",
    },
    {
      id: "md-aws-2",
      question:
        "What flag ensures that Docker build configurations can utilize local credentials safely to pull remote artifacts without baking them into layers?",
      options: [
        "--env AWS_SECRET=...",
        "--build-arg creds=",
        "--mount=type=secret",
        "--volume ~/.aws:/root/.aws",
      ],
      correctAnswer: 2,
      explanation:
        "Using `--mount=type=secret` allows the image compilation layer to access securely mounted secrets (like AWS credentials) during execution without persisting them continuously into the created image layers.",
      difficulty: "medium",
    },
    {
      id: "md-aws-3",
      question:
        "What purpose does the ECS-Optimized AMI serve when launching EC2 deployment instances?",
      options: [
        "It provides pre-trained ML models out-of-the-box",
        "It eliminates the need for AWS Security Groups completely",
        "It acts as a load balancer inherently",
        "It ensures the EC2 runtime is pre-configured with the agent required to map seamlessly with ECS frameworks",
      ],
      correctAnswer: 3,
      explanation:
        "For EC2 instances to operate and register into custom Elastic Container Service clusters, they fundamentally require the installed ECS agent runtime standard within ECS-Optimized AMIs.",
      difficulty: "medium",
    },
    {
      id: "md-aws-4",
      question:
        "Why enable bucket versioning explicitly on an S3 artifact storage instance?",
      options: [
        "It encrypts the bucket at rest",
        "It increases retrieval throughput dynamically",
        "It prevents accidental catastrophic data deletions or accidental overwrites",
        "It forces DVC to compress files further",
      ],
      correctAnswer: 2,
      explanation:
        "Bucket versioning retains distinct variant records against overwritten or deleted files. Model artifacts are crucial; storing strict historical variants prevents accidental destruction and provides reliable rollback architecture.",
      difficulty: "easy",
    },
    {
      id: "md-aws-5",
      question:
        "Which IAM Role dictates permissions strictly mapping an ECS executing task allowing it execution logic, such as pushing logging diagnostics or pulling authenticated ECR images?",
      options: [
        "ecsTaskExecutionRole",
        "RootUserPolicy",
        "AmazonS3FullAccess",
        "ecsInstanceRole",
      ],
      correctAnswer: 0,
      explanation:
        "The `ecsTaskExecutionRole` grants executing task boundaries the explicit clearance natively required to interact safely with ECR (to pull deployment images) and CloudWatch Logs natively without relying strictly on the host EC2's identity mappings.",
      difficulty: "hard",
    },
  ],
};
