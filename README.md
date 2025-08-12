# Authify - Developer Authentication Service

![Authify Logo](https://i.imgur.com/JK7UW9p.png)  
*Secure developer account management for Authify*

## Features
- ✅ Developer signup with email/password  
- ✅ JWT token generation & validation  
- ✅ Email verification with time-limited tokens  
- ✅ PostgreSQL data storage  
- ✅ SMTP email delivery  
- 🔜 Password reset flow  
- 🔜 Rate limiting  

## Tech Stack
- **Framework**: FastAPI  
- **Database**: PostgreSQL (Supabase)  
- **Security**: JWT, BCrypt  
- **Email**: SMTP (SendGrid/Mailgun compatible)  

## Getting Started

### Prerequisites
- Python 3.10+  
- PostgreSQL database  
- SMTP credentials  

### Installation
```bash
# Clone repository
git clone https://github.com/yourorg/authify-dev-auth.git
cd authify-dev-auth

# Install dependencies
pip install -r requirements.txt
