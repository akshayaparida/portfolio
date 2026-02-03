import { LearningModule } from "@/types/learning";

export const awsAccountSetupModule: LearningModule = {
  id: "aws-account-setup",
  title: "Module 2: AWS Account Setup",
  description: "Step-by-step guide to create and secure your AWS account",
  status: "in-progress",
  detailedContent: `# AWS Account Setup Guide

A complete walkthrough to create your AWS account, set up billing alerts, and secure it with best practices.

---

## Step 1: Create Your AWS Account

### Go to AWS Sign Up Page

1. Visit [aws.amazon.com](https://aws.amazon.com)
2. Click **"Create an AWS Account"** (top right)

### Enter Account Details

\`\`\`
Email address    → Use a new email (this becomes root user)
AWS account name → Your name or organization name
Password         → Strong password (12+ chars, mixed case, numbers, symbols)
\`\`\`

> 🔐 **Important**: The email you use becomes the **root user** — the most powerful account. Use an email you'll always have access to.

### Choose Account Type

| Type | Best For |
|:-----|:---------|
| **Personal** | Learning, side projects, individual use |
| **Professional** | Business, company, organization |

### Enter Contact Information

- Full name
- Phone number
- Country/Region
- Address

### Add Payment Method

- Credit or Debit card required
- AWS may charge ₹2 (or $1) to verify — refunded immediately
- No charges until you exceed Free Tier limits

### Verify Identity

- AWS will call or text a verification code
- Enter the code to proceed

### Select Support Plan

| Plan | Cost | Recommended For |
|:-----|:-----|:----------------|
| **Basic (Free)** | $0/month | Learning, personal projects |
| Developer | $29/month | Development workloads |
| Business | $100+/month | Production workloads |
| Enterprise | Custom | Large organizations |

**Choose Basic (Free)** — you can upgrade later if needed.

### Complete Sign Up

- Click **"Complete sign up"**
- Wait for confirmation email (usually instant)
- Sign in to the **AWS Management Console**

---

## Step 2: Sign In to AWS Console

### Root User Sign In

1. Go to [console.aws.amazon.com](https://console.aws.amazon.com)
2. Select **"Root user"**
3. Enter your email address
4. Enter your password

### First Look at the Console

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  AWS Logo    Services ▼    Search bar    Region ▼   Account │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Recently visited services                                 │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐                    │
│   │   EC2   │  │   S3    │  │   IAM   │                    │
│   └─────────┘  └─────────┘  └─────────┘                    │
│                                                             │
│   AWS Health Dashboard                                      │
│   Cost & Usage                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Step 3: Secure Your Root Account

The root account has **unlimited access** to everything. Secure it immediately.

### Enable MFA (Multi-Factor Authentication)

1. Click your **account name** (top right) → **Security credentials**
2. Under "Multi-factor authentication (MFA)" → Click **Assign MFA device**
3. Choose device type:
   - **Authenticator app** (recommended) — Google Authenticator, Authy
   - Hardware key — YubiKey
   - Virtual MFA device
4. Scan QR code with your authenticator app
5. Enter two consecutive codes from the app
6. Click **Add MFA**

> ✓ **Done!** Your root account now requires MFA to sign in.

### Create an IAM User (Don't Use Root!)

**Never use root for daily tasks.** Create an IAM user instead.

1. Search for **"IAM"** in the console
2. Click **Users** → **Create user**
3. Enter username (e.g., \`akshaya-admin\`)
4. Enable **Provide user access to the AWS Management Console**
5. Choose **I want to create an IAM user**
6. Set a password
7. Click **Next**

### Attach Permissions

For a personal admin user:

1. Select **Attach policies directly**
2. Search and select **AdministratorAccess**
3. Click **Next** → **Create user**

### Download Credentials

- Download the CSV file with sign-in URL and credentials
- **Store securely** — you won't see the password again

### Enable MFA for IAM User Too

1. Go to **IAM** → **Users** → Click your user
2. **Security credentials** tab → **Assign MFA device**
3. Follow same steps as root MFA

---

## Step 4: Set Up Billing Alerts

Avoid surprise charges by setting up billing alerts.

### Enable Billing Alerts

1. Click your **account name** → **Billing and Cost Management**
2. In left sidebar: **Billing preferences**
3. Enable:
   - Receive PDF Invoice By Email
   - Receive Free Tier Usage Alerts
   - Receive Billing Alerts
4. Click **Save preferences**

### Create a Billing Alarm

1. Search for **CloudWatch** in the console
2. Change region to **N. Virginia (us-east-1)** — billing metrics only exist here
3. Click **Alarms** → **All alarms** → **Create alarm**
4. Click **Select metric**
5. Choose **Billing** → **Total Estimated Charge**
6. Select **USD** → Click **Select metric**

### Configure the Alarm

\`\`\`
Threshold type      → Static
Whenever...         → Greater than
Than...             → 5 (or your preferred amount in USD)
\`\`\`

### Set Up Notification

1. Create new SNS topic
2. Topic name: \`billing-alerts\`
3. Email: Your email address
4. Click **Create alarm**

> 📩 Check your email and **confirm the SNS subscription**

---

## Step 5: Understand the Free Tier

AWS offers a Free Tier for 12 months after account creation.

### Free Tier Types

| Type | Duration | Examples |
|:-----|:---------|:---------|
| **12 Months Free** | First year only | EC2 t2.micro, S3, RDS |
| **Always Free** | Forever | Lambda, DynamoDB, SNS |
| **Trials** | Short period | SageMaker, Redshift |

### Popular Free Tier Limits

| Service | Free Tier Limit |
|:--------|:----------------|
| **EC2** | 750 hours/month of t2.micro or t3.micro |
| **S3** | 5 GB storage, 20,000 GET, 2,000 PUT requests |
| **RDS** | 750 hours/month of db.t2.micro or db.t3.micro |
| **Lambda** | 1 million requests/month, 3.2M seconds compute |
| **DynamoDB** | 25 GB storage, 25 WCU/RCU |

### Check Your Usage

1. Go to **Billing** → **Free Tier**
2. See usage vs limits for each service
3. Set up alerts (Step 4) to avoid overages

---

## Step 6: Install AWS CLI

The AWS Command Line Interface lets you manage AWS from your terminal.

### Install on Linux/Mac

\`\`\`bash
# Download and install
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Verify installation
aws --version
\`\`\`

### Install on Windows

Download the MSI installer from [AWS CLI page](https://aws.amazon.com/cli/)

### Configure AWS CLI

\`\`\`bash
aws configure
\`\`\`

Enter:
\`\`\`
AWS Access Key ID     → (your key)
AWS Secret Access Key → (your secret)
Default region name   → ap-south-1 (or your preferred region)
Default output format → json
\`\`\`

### Get Access Keys

1. Go to **IAM** → **Users** → Your user
2. **Security credentials** tab
3. **Access keys** → **Create access key**
4. Choose **Command Line Interface (CLI)**
5. Download the CSV file

> ⚠ **Warning**: Never share or commit access keys to Git!

### Test CLI

\`\`\`bash
# Check who you are
aws sts get-caller-identity

# List S3 buckets
aws s3 ls

# List EC2 instances
aws ec2 describe-instances
\`\`\`

---

## Summary Checklist

- [ ] AWS account created
- [ ] Root user MFA enabled
- [ ] IAM admin user created
- [ ] IAM user MFA enabled
- [ ] Billing alerts set up
- [ ] Free Tier understood
- [ ] AWS CLI installed and configured
- [ ] Sign in with IAM user (not root) for daily use

---

## Best Practices Recap

| Do | Don't |
|:---|:------|
| ✓ Use IAM users for daily work | ✗ Use root account for daily tasks |
| ✓ Enable MFA on all accounts | ✗ Skip MFA setup |
| ✓ Set up billing alerts | ✗ Ignore billing until month-end |
| ✓ Use strong, unique passwords | ✗ Reuse passwords |
| ✓ Rotate access keys regularly | ✗ Commit keys to Git |
| ✓ Start with least privilege | ✗ Give everyone admin access |
`,
};
