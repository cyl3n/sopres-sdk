# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.017.x | Yes       |
| 0.016.x | Yes       |
| < 0.016 | No        |

## Reporting a Vulnerability

**Do NOT report security vulnerabilities through public GitHub issues.**

Report via email: **security@sopres.com**

### What to Include

- Type of issue (e.g., SQL injection, XSS, etc.)
- Location of affected source code
- Steps to reproduce
- Proof-of-concept (if possible)
- Impact assessment

### Timeline

- **Initial Response**: Within 48 hours
- **Fix Timeline**:
  - Critical: 1-7 days
  - High: 7-14 days
  - Medium: 14-30 days
  - Low: 30-90 days

## Security Features

soPres includes:

- JWT Authentication with refresh tokens
- Password hashing (bcrypt)
- Rate limiting for API endpoints
- Security headers (Helmet.js)
- CORS policies
- Input validation (Zod)
- SQL injection protection (Prisma ORM)
- Audit logging

## Best Practices

### For Administrators

- Keep software updated
- Use strong passwords
- Never commit `.env` files
- Use HTTPS in production
- Regular database backups

### For Developers

- Keep dependencies updated
- Validate all user input
- Use parameterized queries
- Implement proper error handling

## Contact

- **Email**: security@sopres.com
- **GitHub**: @cyl3n
- **Response Time**: Within 48 hours

---

**Last Updated**: 2025-11-26
