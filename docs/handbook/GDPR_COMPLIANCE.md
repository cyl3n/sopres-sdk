# GDPR & Compliance Manual

soPres is designed to help organizations comply with data privacy regulations such as GDPR (General Data Protection Regulation) and CCPA.

## 1. Data Minimization

soPres minimizes personally identifiable information (PII) storage:

- **Users**: Stores only Name, Email, and hashed Password (if not using SSO).
- **Visitors**: No visitor analytics or tracking cookies are included in the core CMS.

## 2. Right to Access (SAR)

Database administrators can handle Subject Access Requests (SAR) by exporting user data in JSON format.

**Command Line (CLI):**

```bash
npm run cli users:export --email user@example.com
```

**API:**

```http
GET /api/users/:id/export
```

_(Requires Admin Privileges)_

## 3. Right to Erasure ("Right to be Forgotten")

Users can be permanently deleted from the system, removing their PII.

**Data Handling upon Deletion:**

- **User Record**: Permanently deleted.
- **Content Authorship**: Pages created by the user are preserved but re-assigned to a "System/Deleted User" placeholder or kept with the original `authorId` (depending on configuration) to maintain content history integrity, while anonymizing the visible name.
- **Audit Logs**: Logs referencing the user are kept for security/audit purposes but can be anonymized upon request.

## 4. Consent Management

If you build frontend applications consuming the soPres API:

- **Cookies**: The Admin Panel uses essential cookies (`accessToken`, `refreshToken`) for authentication. These are strictly necessary.
- **Tracking**: No tracking scripts are injected by the CMS.

## 5. Security Measures

- **Encryption at Rest**: Recommended to enable at the database layer (e.g., PostgreSQL TDE).
- **Encryption in Transit**: All API communication should be over HTTPS (TLS 1.2+).
- **Password Hashing**: Uses robust hashing algorithms (e.g., bcrypt/Argon2) for local credentials.

## 6. Data Processing Agreement (DPA)

When using soPres Enterprise as a managed service, a DPA is provided. For self-hosted instances, you are the Data Controller and Data Processor.
