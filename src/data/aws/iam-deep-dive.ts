import { LearningModule } from "@/types/learning";

export const iamDeepDiveModule: LearningModule = {
  id: "iam-deep-dive",
  title: "Module 3: AWS IAM - Complete Guide",
  description:
    "Master IAM: Users, Groups, Roles, Policies, and Security Best Practices",
  status: "in-progress",
  detailedContent: `# AWS IAM - Complete Guide

**Identity and Access Management (IAM)** is the foundation of AWS security. Understanding IAM thoroughly is essential for every AWS practitioner.

## What You'll Learn

| # | Topic |
|:--|:------|
| 1 | What is IAM? |
| 2 | IAM Users |
| 3 | IAM Groups |
| 4 | IAM Policies (JSON Deep Dive) |
| 5 | IAM Roles |
| 6 | Identity Federation |
| 7 | Advanced IAM Concepts |
| 8 | IAM Security Tools |
| 9 | Best Practices |
| 10 | Real-World Scenarios |
| 11 | Common Mistakes to Avoid |

---

## 1. What is IAM?

**IAM (Identity and Access Management)** is a **free** AWS service that controls **who** can access **what** in your AWS account.

### IAM Answers Three Questions

| Question | IAM Component |
|:---------|:--------------|
| **Who are you?** | Authentication (Users, Roles, Federation) |
| **What can you do?** | Authorization (Policies) |
| **What did you do?** | Auditing (CloudTrail integration) |

### Key Characteristics

- **Global service** — IAM is not region-specific
- **Free** — No charges for IAM usage
- **Root account** — Created by default, has unlimited access
- **Least privilege** — Give minimum permissions needed

### IAM Components Overview

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                      AWS ACCOUNT                             │
│                                                              │
│   ┌─────────────┐                                           │
│   │ ROOT USER   │ ← Full access, DO NOT USE for daily tasks │
│   └─────────────┘                                           │
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                      IAM                             │   │
│   │                                                      │   │
│   │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐  │   │
│   │  │  USERS  │  │ GROUPS  │  │  ROLES  │  │POLICIES│  │   │
│   │  └─────────┘  └─────────┘  └─────────┘  └────────┘  │   │
│   │                                                      │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 2. IAM Users

An **IAM User** represents a person or application that interacts with AWS.

### User Properties

| Property | Description |
|:---------|:------------|
| **Username** | Unique identifier within the account |
| **ARN** | Amazon Resource Name (unique global identifier) |
| **Password** | For console access (optional) |
| **Access Keys** | For programmatic access (optional) |
| **MFA** | Multi-factor authentication (recommended) |
| **Permissions** | What the user can do (via policies) |

### Creating an IAM User - Console (Step-by-Step)

**Step 1: Navigate to IAM**

1. Sign in to the **AWS Management Console**
2. Search for **"IAM"** in the top search bar
3. Click on **IAM** to open the dashboard

**Step 2: Create User**

1. In the left sidebar, click **Users**
2. Click the **Create user** button (top right)
3. Enter a username:
   - Use a descriptive name (e.g., \`john-developer\`, \`api-service-user\`)
   - Naming convention: \`firstname-role\` or \`service-purpose\`

**Step 3: Configure Access Type**

Choose what type of access this user needs:

| Access Type | When to Use | What User Gets |
|:------------|:------------|:---------------|
| **AWS Management Console** | Human users who need web UI access | Password to login |
| **Programmatic access** | Applications, CLI, SDK | Access Key ID + Secret Key |

\`\`\`
Scenario Examples:
┌─────────────────────────────────────────────────────────────┐
│ Developer needing both console + CLI → Enable BOTH         │
│ CI/CD pipeline (GitHub Actions)     → Programmatic ONLY    │
│ Admin for web console only          → Console ONLY         │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Step 4: Set Console Password (if enabled)**

1. Choose password option:
   - **Autogenerated password** → AWS creates a random password
   - **Custom password** → You set the password
2. Check **User must create a new password at next sign-in** (recommended for security)

**Step 5: Set Permissions**

Choose one of three methods:

| Method | Best For |
|:-------|:---------|
| **Add user to group** | Multiple users with same permissions (recommended) |
| **Copy permissions** | Duplicate another user's access |
| **Attach policies directly** | Quick setup, but harder to manage |

**Recommended Policies by Role:**

| User Role | AWS Managed Policies to Attach |
|:----------|:-------------------------------|
| **Admin (full access)** | \`AdministratorAccess\` |
| **Developer** | \`PowerUserAccess\` (all services except IAM) |
| **Read-only viewer** | \`ReadOnlyAccess\` or \`ViewOnlyAccess\` |
| **S3 only** | \`AmazonS3FullAccess\` or \`AmazonS3ReadOnlyAccess\` |
| **EC2 only** | \`AmazonEC2FullAccess\` or \`AmazonEC2ReadOnlyAccess\` |
| **IAM management** | \`IAMFullAccess\` or \`IAMReadOnlyAccess\` |

**To attach a policy:**

1. Click **Attach policies directly**
2. Search for the policy name (e.g., \`AdministratorAccess\`)
3. Check the box next to the policy
4. Click **Next**

> ⚠ **What happens if you skip this step?** You will get **Access Denied** errors when trying to use AWS services!

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  Example Error (if no policies attached):                   │
│                                                              │
│  "Access denied to iam:ListAccountAliases"                  │
│  "You don't have permission to iam:ListUsers"               │
│                                                              │
│  Fix: Attach IAMReadOnlyAccess or appropriate policy        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

> ⚠ **Best Practice**: Always use groups! Create groups like \`Developers\`, \`Admins\`, \`ReadOnlyUsers\` and add users to them.

**Step 6: Add Tags (Optional)**

Add metadata to help organize users:

\`\`\`
Key: Department    Value: Engineering
Key: Project       Value: MLOps
Key: Environment   Value: Production
\`\`\`

**Step 7: Review and Create**

1. Review all settings
2. Click **Create user**
3. **Download credentials immediately** (you won't see the secret key again!)

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  ⚠ IMPORTANT: Save these credentials NOW!                  │
│                                                              │
│  Access Key ID:     AKIAIOSFODNN7EXAMPLE                    │
│  Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY│
│                                                              │
│  Click "Download .csv" to save securely                     │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Step 8: Enable MFA (Critical!)**

1. Go to **Users** → Click on the new user
2. Click **Security credentials** tab
3. Under **MFA**, click **Assign MFA device**
4. Choose **Authenticator app**
5. Scan QR code with Google Authenticator or Authy
6. Enter two consecutive codes
7. Click **Add MFA**

> ⚠ **Never skip MFA!** Even for programmatic users, ensure the account owner has MFA enabled.

### Creating an IAM User - CLI

> 📋 **Prerequisites:** Before running any AWS CLI commands, you must configure your credentials first!

**Step 1: Install AWS CLI** (if not already installed)

Download from: https://aws.amazon.com/cli/

Verify installation:
\`\`\`bash
aws --version
# Should show: aws-cli/2.x.x Python/3.x.x ...
\`\`\`

**Step 2: Configure AWS Credentials**

\`\`\`bash
aws configure
\`\`\`

You'll be prompted for:

| Prompt | What to Enter |
|:-------|:--------------|
| **AWS Access Key ID** | Your access key (from IAM user) |
| **AWS Secret Access Key** | Your secret key (shown only once when created) |
| **Default region name** | e.g., \`ap-south-1\` (Mumbai), \`us-east-1\` (N. Virginia) |
| **Default output format** | \`json\` (recommended) |

> 💡 **To get access keys:** Go to AWS Console → IAM → Users → Your User → Security credentials → Create access key

**Verify configuration:**
\`\`\`bash
aws sts get-caller-identity
# Should show your account ID and user ARN
\`\`\`

> ⚠ **Never commit access keys to Git!** Use environment variables or AWS Secrets Manager.

---

**Step 3: Now You Can Run IAM CLI Commands**

\`\`\`bash
# Create a user
aws iam create-user --user-name john-developer

# Create access keys for programmatic access
aws iam create-access-key --user-name john-developer

# Create login profile for console access
aws iam create-login-profile --user-name john-developer --password MyP@ssw0rd! --password-reset-required

# Attach a policy
aws iam attach-user-policy --user-name john-developer --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
\`\`\`

### User ARN Format

\`\`\`
arn:aws:iam::123456789012:user/john-developer
     │    │        │           │
     │    │        │           └── User name
     │    │        └────────────── AWS Account ID
     │    └─────────────────────── Service (IAM)
     └──────────────────────────── Partition (aws, aws-cn, aws-us-gov)
\`\`\`

### Access Keys

Access keys are for **programmatic access** (CLI, SDK, API).

| Key | Description |
|:----|:------------|
| **Access Key ID** | Like a username (public, starts with AKIA) |
| **Secret Access Key** | Like a password (secret, only shown once) |

\`\`\`bash
# Where keys are stored after 'aws configure'
~/.aws/credentials

[default]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
\`\`\`

> ⚠ **Never commit access keys to Git!** Use environment variables or AWS Secrets Manager.

---

## 3. IAM Groups

An **IAM Group** is a collection of IAM users. Groups make it easier to manage permissions for multiple users.

### Group Characteristics

| Property | Description |
|:---------|:------------|
| **Contains** | Only users (not other groups or roles) |
| **Purpose** | Apply policies to multiple users at once |
| **Membership** | A user can belong to multiple groups (max 10) |
| **No nesting** | Groups cannot contain other groups |

### Common Group Structure

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     AWS ACCOUNT                              │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Developers    │  │    Operators    │  │   Admins    │  │
│  │                 │  │                 │  │             │  │
│  │  John           │  │  Sarah          │  │  Mike       │  │
│  │  Jane           │  │  Tom            │  │             │  │
│  │  Bob            │  │                 │  │             │  │
│  │                 │  │                 │  │             │  │
│  │ [EC2, S3, RDS]  │  │ [CloudWatch,    │  │ [Admin      │  │
│  │                 │  │  EC2 Read]      │  │  Access]    │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Creating Groups - CLI

\`\`\`bash
# Create a group
aws iam create-group --group-name Developers

# Attach policy to group
aws iam attach-group-policy --group-name Developers \\
    --policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess

# Add user to group
aws iam add-user-to-group --user-name john-developer --group-name Developers

# List groups for a user
aws iam list-groups-for-user --user-name john-developer
\`\`\`

### Best Practices for Groups

- ✓ Organize users by job function (Developers, Testers, Admins)
- ✓ Attach policies to groups, not individual users
- ✓ Use multiple groups for users with multiple roles
- ✗ Don't create groups for each user

---

## 4. IAM Policies

**IAM Policies** are JSON documents that define permissions. They specify what actions are allowed or denied on which resources.

### Policy Types

| Type | Description | Example |
|:-----|:------------|:--------|
| **AWS Managed** | Created and maintained by AWS | AmazonS3ReadOnlyAccess |
| **Customer Managed** | Created by you, reusable | MyCompanyS3Policy |
| **Inline** | Embedded directly in user/group/role | One-off permissions |

### Identity-based vs Resource-based Policies

This is a critical distinction in AWS IAM:

| Aspect | Identity-based | Resource-based |
|:-------|:---------------|:---------------|
| **Attached to** | Users, Groups, Roles | Resources (S3, SQS, Lambda, etc.) |
| **Specifies** | What the identity CAN do | Who CAN access the resource |
| **Principal** | Not required (implied) | Required (specifies who) |
| **Cross-account** | Needs role assumption | Direct access possible |

**Identity-based Policy Example** (attached to a user/role):

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-bucket/*"
        }
    ]
}
\`\`\`

**Resource-based Policy Example** (S3 Bucket Policy):

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::111122223333:root"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-bucket/*"
        }
    ]
}
\`\`\`

> ⚠ **Key Difference**: Resource-based policies have a \`Principal\` element that specifies WHO can access. Identity-based policies don't need this because they're already attached to an identity.

### Cross-Account Access Comparison

\`\`\`
Identity-based (needs role):
Account A User → Assume Role in Account B → Access Resource

Resource-based (direct):
Account A User → Directly access Account B's S3 (if bucket policy allows)
\`\`\`

### Policy Structure

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowS3ReadAccess",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::my-bucket",
                "arn:aws:s3:::my-bucket/*"
            ],
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": "203.0.113.0/24"
                }
            }
        }
    ]
}
\`\`\`

### Policy Elements Explained

| Element | Required | Description |
|:--------|:---------|:------------|
| **Version** | Yes | Always use "2012-10-17" (latest) |
| **Statement** | Yes | Array of permission statements |
| **Sid** | No | Statement ID (readable identifier) |
| **Effect** | Yes | "Allow" or "Deny" |
| **Action** | Yes | What actions (e.g., s3:GetObject) |
| **Resource** | Yes | What resources (ARNs) |
| **Condition** | No | When the policy applies |

### Understanding Actions

Actions follow the pattern: \`service:action\`

\`\`\`
s3:GetObject          → Read an object from S3
s3:PutObject          → Upload an object to S3
s3:*                  → All S3 actions
ec2:RunInstances      → Launch EC2 instances
ec2:Describe*         → All EC2 describe actions
*                     → All actions (dangerous!)
\`\`\`

### Understanding Resources

Resources are specified as ARNs:

\`\`\`
arn:aws:s3:::my-bucket              → The bucket itself
arn:aws:s3:::my-bucket/*            → All objects in the bucket
arn:aws:s3:::my-bucket/reports/*    → Objects in reports folder
arn:aws:ec2:ap-south-1:123456789012:instance/i-12345
\`\`\`

### Conditions - Advanced Filtering

\`\`\`json
{
    "Condition": {
        "StringEquals": {
            "s3:x-amz-acl": "bucket-owner-full-control"
        },
        "IpAddress": {
            "aws:SourceIp": ["192.168.1.0/24", "10.0.0.0/8"]
        },
        "Bool": {
            "aws:MultiFactorAuthPresent": "true"
        },
        "DateGreaterThan": {
            "aws:CurrentTime": "2024-01-01T00:00:00Z"
        }
    }
}
\`\`\`

### Common Condition Keys

| Key | Description |
|:----|:------------|
| aws:SourceIp | Client's IP address |
| aws:CurrentTime | Current date/time |
| aws:MultiFactorAuthPresent | MFA used? |
| aws:PrincipalTag/key | Tag on the principal |
| s3:x-amz-acl | S3 ACL being set |
| ec2:InstanceType | EC2 instance type |

### Policy Evaluation Logic

When a request is made, AWS evaluates all applicable policies:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                   Policy Evaluation                          │
│                                                              │
│   1. Is there an explicit DENY?                             │
│      └── YES → DENY (stop here)                             │
│                                                              │
│   2. Is there an explicit ALLOW?                            │
│      └── YES → ALLOW                                        │
│      └── NO  → DENY (implicit deny)                         │
│                                                              │
│   Rule: DENY always wins                                    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Example Policies

**1. Read-Only S3 Access**

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::company-data",
                "arn:aws:s3:::company-data/*"
            ]
        }
    ]
}
\`\`\`

**2. EC2 Admin with Region Restriction**

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "ec2:*",
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "aws:RequestedRegion": "ap-south-1"
                }
            }
        }
    ]
}
\`\`\`

**3. Require MFA for Sensitive Actions**

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Deny",
            "Action": [
                "ec2:StopInstances",
                "ec2:TerminateInstances"
            ],
            "Resource": "*",
            "Condition": {
                "BoolIfExists": {
                    "aws:MultiFactorAuthPresent": "false"
                }
            }
        }
    ]
}
\`\`\`

**4. Self-Service Password Management**

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "iam:ChangePassword",
                "iam:GetUser"
            ],
            "Resource": "arn:aws:iam::*:user/\${aws:username}"
        }
    ]
}
\`\`\`

### Policy Variables

Use variables to create dynamic policies:

| Variable | Description |
|:---------|:------------|
| \${aws:username} | IAM user name |
| \${aws:userid} | Unique user ID |
| \${aws:PrincipalTag/key} | Principal's tag value |
| \${aws:SourceAccount} | Source account ID |

---

## 5. IAM Roles

An **IAM Role** is an identity that can be assumed by trusted entities. Unlike users, roles don't have permanent credentials.

### When to Use Roles

| Scenario | Why Role? |
|:---------|:----------|
| **EC2 accessing S3** | No need to store credentials on instance |
| **Lambda accessing DynamoDB** | Temporary credentials per invocation |
| **Cross-account access** | Securely access another AWS account |
| **Federation** | External users (SAML, OIDC) |
| **Service-to-service** | AWS services accessing other services |

### Role Components

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        IAM ROLE                              │
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │         Trust Policy (Who can assume?)               │   │
│   │                                                      │   │
│   │   "Principal": {                                     │   │
│   │       "Service": "ec2.amazonaws.com"                 │   │
│   │   }                                                  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │      Permission Policy (What can they do?)           │   │
│   │                                                      │   │
│   │   "Action": ["s3:GetObject", "s3:PutObject"]         │   │
│   │   "Resource": "arn:aws:s3:::my-bucket/*"             │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Trust Policy Examples

**EC2 Service Role**

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "ec2.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
\`\`\`

**Lambda Service Role**

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
\`\`\`

**Cross-Account Role**

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::111122223333:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "my-secret-id"
                }
            }
        }
    ]
}
\`\`\`

### Creating a Role - Console

1. Go to **IAM** → **Roles** → **Create role**
2. Select trusted entity:
   - AWS service (EC2, Lambda, etc.)
   - Another AWS account
   - Web identity (Cognito, OIDC)
   - SAML 2.0 federation
3. Attach permission policies
4. Name the role and create

### Creating a Role - CLI

\`\`\`bash
# Create trust policy file
cat > trust-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "ec2.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
EOF

# Create the role
aws iam create-role --role-name EC2-S3-AccessRole \\
    --assume-role-policy-document file://trust-policy.json

# Attach permission policy
aws iam attach-role-policy --role-name EC2-S3-AccessRole \\
    --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

# Create instance profile (required for EC2)
aws iam create-instance-profile --instance-profile-name EC2-S3-Profile
aws iam add-role-to-instance-profile --instance-profile-name EC2-S3-Profile \\
    --role-name EC2-S3-AccessRole
\`\`\`

### Instance Profiles

EC2 uses **instance profiles** as a container for IAM roles.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  EC2 Instance                                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Instance Profile (container)                          │  │
│  │  ┌───────────────────────────────────────────────┐    │  │
│  │  │  IAM Role                                      │    │  │
│  │  │  - Trust Policy: ec2.amazonaws.com             │    │  │
│  │  │  - Permission Policy: S3 Access               │    │  │
│  │  └───────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  Application can access S3 without hardcoded credentials    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Assuming a Role

\`\`\`bash
# Assume a role (returns temporary credentials)
aws sts assume-role \\
    --role-arn arn:aws:iam::123456789012:role/MyRole \\
    --role-session-name my-session

# Response contains:
# - AccessKeyId
# - SecretAccessKey
# - SessionToken
# - Expiration
\`\`\`

---

## 6. Identity Federation

Federation allows external identities to access AWS without creating IAM users.

### Federation Options

| Type | Use Case | Provider |
|:-----|:---------|:---------|
| **SAML 2.0** | Enterprise SSO | Okta, Azure AD, ADFS |
| **Web Identity** | Mobile/Web apps | Google, Facebook, Amazon |
| **Amazon Cognito** | App users | AWS service |
| **IAM Identity Center** | Multi-account SSO | AWS managed |

### How SAML Federation Works

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   1. User authenticates with Corporate IdP (Okta/ADFS)      │
│                      │                                       │
│                      ▼                                       │
│   2. IdP returns SAML assertion                             │
│                      │                                       │
│                      ▼                                       │
│   3. User calls AWS STS AssumeRoleWithSAML                  │
│                      │                                       │
│                      ▼                                       │
│   4. STS returns temporary credentials                      │
│                      │                                       │
│                      ▼                                       │
│   5. User accesses AWS resources                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Web Identity Federation

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│   Mobile App                                                 │
│       │                                                      │
│       │ 1. Login with Google/Facebook                        │
│       ▼                                                      │
│   Google/Facebook (IdP)                                      │
│       │                                                      │
│       │ 2. Returns ID token                                  │
│       ▼                                                      │
│   App calls AssumeRoleWithWebIdentity                       │
│       │                                                      │
│       │ 3. STS validates token, returns temp credentials    │
│       ▼                                                      │
│   App accesses AWS (S3, DynamoDB)                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### AWS IAM Identity Center (Recommended)

Formerly AWS SSO, this is the **recommended** approach for workforce identity.

Features:
- Single sign-on to multiple AWS accounts
- Integration with corporate directories
- Automatic credential rotation
- Centralized permission management

---

## 7. Advanced IAM Concepts

### IAM Roles Anywhere

**IAM Roles Anywhere** allows workloads running **outside of AWS** (on-premises servers, other clouds) to use IAM roles for temporary credentials.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  Traditional Approach (Problematic):                         │
│                                                              │
│  On-premises server → Long-lived access keys → AWS          │
│  (Keys can be stolen, hard to rotate)                        │
│                                                              │
│  With IAM Roles Anywhere:                                    │
│                                                              │
│  On-premises server → X.509 Certificate → Trust Anchor      │
│                              ↓                               │
│                       IAM Roles Anywhere                     │
│                              ↓                               │
│                    Temporary credentials → AWS               │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Components:**

| Component | Description |
|:----------|:------------|
| **Trust Anchor** | CA certificate that IAM Roles Anywhere trusts |
| **Profile** | Maps certificate attributes to IAM role |
| **X.509 Certificate** | Installed on external workload |

**Use Cases:**
- On-premises backup servers accessing S3
- Multi-cloud workloads needing AWS access
- CI/CD pipelines running outside AWS

\`\`\`bash
# Get temporary credentials with Roles Anywhere
aws_signing_helper credential-process \\
    --certificate /path/to/cert.pem \\
    --private-key /path/to/key.pem \\
    --trust-anchor-arn arn:aws:rolesanywhere:region:account:trust-anchor/id \\
    --profile-arn arn:aws:rolesanywhere:region:account:profile/id \\
    --role-arn arn:aws:iam::account:role/MyRole
\`\`\`

### Permissions Boundaries

**Permissions Boundaries** set the **maximum permissions** an IAM entity can have. Even if a policy grants permissions, the boundary restricts what's actually allowed.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                   Permissions Boundary                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │     Effective permissions = Intersection of:          │  │
│  │                                                        │  │
│  │     ┌─────────────┐     ┌─────────────────────┐       │  │
│  │     │  Identity   │  ∩  │   Permissions       │       │  │
│  │     │  Policies   │     │   Boundary          │       │  │
│  │     └─────────────┘     └─────────────────────┘       │  │
│  │                                                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Example Scenario:**

Developer has AdministratorAccess policy, but boundary limits to S3 and EC2:

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "ec2:*"
            ],
            "Resource": "*"
        }
    ]
}
\`\`\`

**Result:** Developer can only use S3 and EC2, even with AdministratorAccess!

**Use Cases:**
- Delegating user creation to teams (they can't escalate beyond boundary)
- Limiting permissions for service accounts
- Enforcing security guardrails

\`\`\`bash
# Attach permissions boundary to user
aws iam put-user-permissions-boundary \\
    --user-name developer-john \\
    --permissions-boundary arn:aws:iam::123456789012:policy/DeveloperBoundary

# Attach permissions boundary to role
aws iam put-role-permissions-boundary \\
    --role-name DevRole \\
    --permissions-boundary arn:aws:iam::123456789012:policy/DeveloperBoundary
\`\`\`

### Service Control Policies (SCPs)

**SCPs** are part of **AWS Organizations** and set permission guardrails across **entire accounts or organizational units (OUs)**.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    AWS Organization                          │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Root                                                │    │
│  │  SCP: Allow all (default)                            │    │
│  │                                                      │    │
│  │  ┌───────────────┐    ┌───────────────┐             │    │
│  │  │ OU: Production│    │ OU: Dev       │             │    │
│  │  │ SCP: Restrict │    │ SCP: Allow    │             │    │
│  │  │ regions       │    │ most actions  │             │    │
│  │  │               │    │               │             │    │
│  │  │ [Account A]   │    │ [Account C]   │             │    │
│  │  │ [Account B]   │    │ [Account D]   │             │    │
│  │  └───────────────┘    └───────────────┘             │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Key Points:**

| Aspect | Description |
|:-------|:------------|
| **Scope** | Applies to entire AWS accounts |
| **Inheritance** | SCPs are inherited down the hierarchy |
| **Effect** | Sets maximum available permissions |
| **Root account** | SCPs do NOT affect the management account |

**Example: Deny Region Access**

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DenyNonApprovedRegions",
            "Effect": "Deny",
            "Action": "*",
            "Resource": "*",
            "Condition": {
                "StringNotEquals": {
                    "aws:RequestedRegion": [
                        "ap-south-1",
                        "us-east-1"
                    ]
                }
            }
        }
    ]
}
\`\`\`

**Example: Prevent Leaving Organization**

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Deny",
            "Action": "organizations:LeaveOrganization",
            "Resource": "*"
        }
    ]
}
\`\`\`

### Session Policies

**Session Policies** are policies passed **when assuming a role** to further restrict permissions for that specific session.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  Role has: S3 Full Access + EC2 Full Access                 │
│                                                              │
│  Session Policy: Only S3:GetObject                          │
│                                                              │
│  Effective session permissions: Only S3:GetObject           │
│  (Intersection of role permissions and session policy)      │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Use Cases:**
- Giving contractors limited access through shared role
- Restricting permissions based on context (time, IP, etc.)
- Fine-grained access control per session

\`\`\`bash
# Assume role with session policy
aws sts assume-role \\
    --role-arn arn:aws:iam::123456789012:role/DataAccessRole \\
    --role-session-name read-only-session \\
    --policy '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::data-bucket/reports/*"
            }
        ]
    }'
\`\`\`

**Session Policy vs Permissions Boundary:**

| Aspect | Session Policy | Permissions Boundary |
|:-------|:---------------|:---------------------|
| **Applied when** | Assuming a role | Creating user/role |
| **Duration** | Single session | Permanent until changed |
| **Use case** | Temporary restrictions | Delegated administration |

---

## 8. IAM Security Tools

AWS provides several tools to audit and improve IAM security.

### IAM Credentials Report

Account-level report showing all users and their credential status.

\`\`\`bash
# Generate credentials report
aws iam generate-credential-report

# Download report
aws iam get-credential-report --query 'Content' --output text | base64 -d > credentials.csv
\`\`\`

**Report includes:**
- User creation time
- Password last used
- MFA enabled
- Access key status
- Access key last used

### IAM Access Advisor

Shows when permissions were last used for each service.

\`\`\`bash
# Generate service last accessed details
aws iam generate-service-last-accessed-details --arn arn:aws:iam::123456789012:user/john

# Get the report
aws iam get-service-last-accessed-details --job-id <job-id>
\`\`\`

**Use case:** Remove unused permissions (principle of least privilege)

### IAM Access Analyzer

Helps identify resources shared with external principals.

Features:
- Finds S3 buckets accessible from outside your account
- Identifies IAM roles assumed by external accounts
- Analyzes Lambda function policies
- Validates policy changes before applying

\`\`\`bash
# Create an analyzer
aws accessanalyzer create-analyzer --analyzer-name MyAnalyzer --type ACCOUNT

# List findings
aws accessanalyzer list-findings --analyzer-arn <analyzer-arn>
\`\`\`

### IAM Policy Simulator

Test policies before applying them.

\`\`\`bash
# Simulate a policy
aws iam simulate-principal-policy \\
    --policy-source-arn arn:aws:iam::123456789012:user/john \\
    --action-names s3:GetObject \\
    --resource-arns arn:aws:s3:::my-bucket/file.txt
\`\`\`

**Console:** IAM → Policy Simulator (visual interface)

---

## 9. Best Practices

### Security Best Practices

| # | Practice | Why |
|:--|:---------|:----|
| 1 | **Enable MFA** | Protects against password compromise |
| 2 | **Use roles for applications** | No hardcoded credentials |
| 3 | **Rotate credentials** | Limit exposure if leaked |
| 4 | **Apply least privilege** | Only give needed permissions |
| 5 | **Use groups for permissions** | Easier management |
| 6 | **Monitor with CloudTrail** | Track all API calls |
| 7 | **Use strong password policy** | Prevent weak passwords |
| 8 | **Don't use root account** | Too powerful for daily use |

### Password Policy

\`\`\`bash
# Set password policy
aws iam update-account-password-policy \\
    --minimum-password-length 14 \\
    --require-symbols \\
    --require-numbers \\
    --require-uppercase-characters \\
    --require-lowercase-characters \\
    --allow-users-to-change-password \\
    --max-password-age 90 \\
    --password-reuse-prevention 12
\`\`\`

### Credential Rotation

| Credential | Rotation Period | How |
|:-----------|:----------------|:----|
| **Password** | 90 days | Password policy |
| **Access Keys** | 90 days | Create new, update apps, delete old |
| **MFA device** | When lost/compromised | Deactivate and reassign |

### Access Key Best Practices

1. **Never embed in code** → Use roles or environment variables
2. **Use separate keys per application** → Easy to rotate/revoke
3. **Delete unused keys** → Check IAM Credentials Report
4. **Store securely** → Use AWS Secrets Manager for applications

---

## 10. Real-World Scenarios

### Scenario 1: Developer Access

**Requirement:** Developers need EC2, S3, and RDS access in dev environment only.

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:*",
                "s3:*",
                "rds:*"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "aws:ResourceTag/Environment": "dev"
                }
            }
        }
    ]
}
\`\`\`

### Scenario 2: Restrict Region

**Requirement:** Users can only launch resources in Mumbai region.

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Deny",
            "Action": "*",
            "Resource": "*",
            "Condition": {
                "StringNotEquals": {
                    "aws:RequestedRegion": "ap-south-1"
                }
            }
        }
    ]
}
\`\`\`

### Scenario 3: Require MFA for Dangerous Actions

**Requirement:** Terminate instances only with MFA.

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Deny",
            "Action": [
                "ec2:TerminateInstances",
                "rds:DeleteDBInstance",
                "s3:DeleteBucket"
            ],
            "Resource": "*",
            "Condition": {
                "BoolIfExists": {
                    "aws:MultiFactorAuthPresent": "false"
                }
            }
        }
    ]
}
\`\`\`

### Scenario 4: Cross-Account S3 Access

**Account A** wants to let **Account B** read from its S3 bucket.

**In Account A (bucket owner):**

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::ACCOUNT-B-ID:role/CrossAccountRole"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-bucket/*"
        }
    ]
}
\`\`\`

### Scenario 5: Lambda Execution Role

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:PutItem"
            ],
            "Resource": "arn:aws:dynamodb:ap-south-1:123456789012:table/MyTable"
        }
    ]
}
\`\`\`

---

## 11. Common Mistakes to Avoid

### ✗ Mistake 1: Using Root Account

**Problem:** Root has unlimited access, can't be restricted.

**Solution:** Create IAM users/roles for all operations.

### ✗ Mistake 2: No MFA

**Problem:** Passwords can be stolen via phishing.

**Solution:** Enable MFA on all users, especially admins.

### ✗ Mistake 3: Overly Permissive Policies

**Problem:** \`"Action": "*", "Resource": "*"\` is too broad.

**Solution:** Start with minimum permissions, add as needed.

### ✗ Mistake 4: Hardcoded Access Keys

**Problem:** Keys in code get committed to Git, exposed.

**Solution:** Use IAM roles, environment variables, or Secrets Manager.

### ✗ Mistake 5: Sharing Credentials

**Problem:** Can't track who did what.

**Solution:** One user per person, use groups for permissions.

### ✗ Mistake 6: Not Rotating Credentials

**Problem:** Long-lived credentials are risky if leaked.

**Solution:** Rotate passwords and access keys every 90 days.

### ✗ Mistake 7: Ignoring IAM Reports

**Problem:** Unused users/keys accumulate risk.

**Solution:** Review Credentials Report and Access Advisor monthly.

---

## TL;DR - Quick Reference

| Component | Purpose | Key Points |
|:----------|:--------|:-----------|
| **Users** | Individual identities | One per person, has credentials |
| **Groups** | Collection of users | Attach policies here, not users |
| **Roles** | Assumable identities | No credentials, for services/apps |
| **Policies** | Define permissions | JSON: Allow/Deny + Actions + Resources |
| **MFA** | Extra security | Enable on all accounts |

### Policy Evaluation

1. Explicit **DENY** → Denied
2. Explicit **ALLOW** → Allowed
3. Nothing found → Denied (implicit)

### Key Commands

\`\`\`bash
# User management
aws iam create-user --user-name NAME
aws iam delete-user --user-name NAME
aws iam list-users

# Group management
aws iam create-group --group-name NAME
aws iam add-user-to-group --user-name USER --group-name GROUP

# Role management
aws iam create-role --role-name NAME --assume-role-policy-document file://trust.json
aws iam attach-role-policy --role-name NAME --policy-arn ARN

# Policy management
aws iam create-policy --policy-name NAME --policy-document file://policy.json
aws iam attach-user-policy --user-name USER --policy-arn ARN

# Security tools
aws iam generate-credential-report
aws iam get-account-password-policy
\`\`\`

### Exam Tips

- **Root account**: Only for billing and account management
- **Roles vs Users**: Roles for services, Users for people
- **Explicit Deny**: Always wins over Allow
- **Instance Profile**: Required for EC2 to use roles
- **Federation**: External identities, no IAM users needed
`,
  practiceQuiz: [
    {
      id: "iam-1",
      question:
        "What is the maximum number of IAM groups a user can belong to?",
      options: ["5", "10", "15", "Unlimited"],
      correctAnswer: 1,
      explanation:
        "An IAM user can be a member of up to 10 IAM groups. This is a hard limit in AWS.",
      difficulty: "medium" as const,
    },
    {
      id: "iam-2",
      question:
        "Which IAM entity should you use when an EC2 instance needs to access S3?",
      options: [
        "IAM User with access keys",
        "IAM Group",
        "IAM Role",
        "Root account",
      ],
      correctAnswer: 2,
      explanation:
        "IAM Roles are the recommended way for AWS services like EC2 to access other services. Roles provide temporary credentials and don't require storing access keys on instances.",
      difficulty: "easy" as const,
    },
    {
      id: "iam-3",
      question:
        "In IAM policy evaluation, what happens when there's no explicit Allow or Deny for an action?",
      options: [
        "The action is allowed",
        "The action is denied implicitly",
        "The user is prompted for approval",
        "It depends on the service",
      ],
      correctAnswer: 1,
      explanation:
        "By default, all requests are implicitly denied. You need an explicit Allow statement for the request to be permitted. This is the 'deny by default' security model.",
      difficulty: "easy" as const,
    },
    {
      id: "iam-4",
      question: "What is required for an EC2 instance to assume an IAM role?",
      options: [
        "Access keys stored in the instance",
        "An instance profile attached to the instance",
        "A user password configured",
        "Direct role attachment to EC2",
      ],
      correctAnswer: 1,
      explanation:
        "EC2 instances use instance profiles as a container for IAM roles. When you attach a role to an EC2 instance through the console, AWS automatically creates and attaches an instance profile.",
      difficulty: "medium" as const,
    },
    {
      id: "iam-5",
      question:
        "Which policy element specifies the AWS account, user, role, or service that is allowed to assume a role?",
      options: ["Action", "Resource", "Principal", "Condition"],
      correctAnswer: 2,
      explanation:
        "The Principal element in a trust policy specifies who (which entity) is allowed to assume the role. It can be an AWS account, IAM user, IAM role, or AWS service.",
      difficulty: "medium" as const,
    },
    {
      id: "iam-6",
      question:
        "What happens if both Allow and Deny statements apply to the same action in different policies?",
      options: [
        "Allow takes precedence",
        "Deny takes precedence",
        "The most specific policy wins",
        "The most recently created policy wins",
      ],
      correctAnswer: 1,
      explanation:
        "In IAM, an explicit Deny always overrides any Allow. This is a fundamental security principle that ensures you can always restrict access even if Allow permissions exist elsewhere.",
      difficulty: "easy" as const,
    },
    {
      id: "iam-7",
      question:
        "Which AWS tool shows when a user last accessed each AWS service?",
      options: [
        "IAM Credentials Report",
        "IAM Access Advisor",
        "AWS CloudTrail",
        "IAM Policy Simulator",
      ],
      correctAnswer: 1,
      explanation:
        "IAM Access Advisor shows the service permissions granted to a user and when those services were last accessed. This helps identify unused permissions for least privilege compliance.",
      difficulty: "medium" as const,
    },
    {
      id: "iam-8",
      question:
        "What is the purpose of an External ID in cross-account role assumption?",
      options: [
        "To identify the external user's name",
        "To prevent the 'confused deputy' problem",
        "To log the external account's actions",
        "To encrypt data in transit",
      ],
      correctAnswer: 1,
      explanation:
        "External IDs are used to prevent the 'confused deputy' problem where a service might be tricked into accessing resources it shouldn't. The external ID acts as a shared secret between the trusting and trusted accounts.",
      difficulty: "hard" as const,
    },
    {
      id: "iam-9",
      question:
        "Which statement correctly describes AWS managed policies vs customer managed policies?",
      options: [
        "AWS managed policies can be modified by customers",
        "Customer managed policies are automatically updated by AWS",
        "AWS managed policies are created and maintained by AWS",
        "Customer managed policies cannot be attached to groups",
      ],
      correctAnswer: 2,
      explanation:
        "AWS managed policies are created and maintained by AWS. They are updated automatically when new services or features are added. Customer managed policies are created and maintained by you.",
      difficulty: "easy" as const,
    },
    {
      id: "iam-10",
      question:
        "What is the recommended way to provide AWS access to an application running outside of AWS?",
      options: [
        "Create an IAM user with programmatic access",
        "Use the root account credentials",
        "Use IAM Roles Anywhere or federation",
        "Store access keys in application config",
      ],
      correctAnswer: 2,
      explanation:
        "IAM Roles Anywhere allows workloads outside of AWS to use IAM roles for temporary credentials. This is more secure than long-lived access keys. Federation is another option for identity providers.",
      difficulty: "hard" as const,
    },
  ],
};
