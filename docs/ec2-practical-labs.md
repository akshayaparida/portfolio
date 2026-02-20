# EC2 Practical Labs

> **Goal**: Go from "reading about EC2" to "mastering EC2" with 3 progressive labs.

## 🛠️ Lab 1: Launch & Connect (The Basics)

**Objective**: Launch an Amazon Linux 2023 instance and connect securely without managing SSH keys.

1.  **Launch Instance**:
    - Go to EC2 Console -> **Launch Instances**.
    - **Name**: `Lab1-MyFirstInstance`.
    - **AMI**: Amazon Linux 2023 AMI (Free Tier Eligible).
    - **Instance Type**: `t2.micro` or `t3.micro`.
    - **Key Pair**: Select "Proceed without a key pair" (We will use EC2 Instance Connect).
    - **Network Settings**: Check "Allow SSH traffic from Anywhere" (for this lab only).
2.  **Connect**:
    - Select the running instance.
    - Click **Connect** (top right).
    - Tab: **EC2 Instance Connect** -> Click **Connect**.
    - _Success_: You should see a terminal window in your browser.
3.  **Verify**:
    - Run `whoami` to see you are `ec2-user`.
    - Run `hostname -f` to see your internal DNS name.

---

## 🚀 Lab 2: The Web Server (Bootstrapping)

**Objective**: Deploy a web server automatically using **User Data** scripts.

1.  **Launch Instance**:
    - **Name**: `Lab2-WebServer`.
    - **AMI**: Amazon Linux 2023.
    - **Security Group**: Create a new one. Allow **HTTP** (Port 80) and **SSH** (Port 22) from Anywhere.
2.  **Add User Data** (Advanced Details -> User Data):
    ```bash
    #!/bin/bash
    dnf update -y
    dnf install -y httpd
    systemctl start httpd
    systemctl enable httpd
    echo "<h1>Hello from EC2 $(hostname -f)</h1>" > /var/www/html/index.html
    ```
3.  **Verify**:
    - Wait 2 minutes for the instance to initialize.
    - Copy the **Public IPv4 address**.
    - Paste it into your browser (ensure it is `http://`, not `https://`).
    - _Success_: You should see "Hello from EC2...".

---

## 🏆 Lab 3: Custom AMI & Resilience (Advanced)

**Objective**: Simulate a disaster recovery scenario by creating a custom image (AMI) and relaunching in a different Availability Zone (AZ).

1.  **Create Image (AMI)**:
    - Select your `Lab2-WebServer` instance (it must be running or stopped).
    - Actions -> Image and templates -> **Create image**.
    - **Name**: `My-Web-Server-v1`.
    - Click **Create image**.
    - Wait for the AMI status to become `Available` in the **AMIs** section (left sidebar).
2.  **Simulate Disaster**:
    - Terminate your `Lab2-WebServer` instance. (Oh no! The server is gone!)
3.  **Recover**:
    - Go to **AMIs**. Select `My-Web-Server-v1` -> **Launch instance from AMI**.
    - **Name**: `Lab3-Recovery`.
    - **Subnet**: Choose a **DIFFERENT Availability Zone** than Lab 2 (e.g., if Lab 2 was `us-east-1a`, choose `us-east-1b`).
    - **Security Group**: Select the existing web server group from Lab 2.
4.  **Verify**:
    - Copy the _new_ Public IP.
    - Visit it in the browser.
    - _Success_: The website works immediately because the software was pre-installed in your Custom AMI!

---

## 🧹 Cleanup (Don't Forget!)

Avoid surprise bills.

1.  **Terminate** all instances (`Lab1`, `Lab3`).
2.  **Deregister** your AMI (`My-Web-Server-v1`).
3.  **Delete** the Snapshot associated with the AMI (in **Snapshots** section).
