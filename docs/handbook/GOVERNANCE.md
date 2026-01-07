# Governance & Workflows

Ensure content quality, consistency, and accountability with soPres Enterprise governance features.

## 1. Role-Based Access Control (RBAC)

soPres implements a strict RBAC model to secure content and administrative functions.

### Defined Roles

| Role       | Permissions                      | Description                                                      |
| :--------- | :------------------------------- | :--------------------------------------------------------------- |
| **ADMIN**  | `*` (All)                        | Full system access. Can manage users, settings, and all content. |
| **EDITOR** | `content.*`, `media.*`           | Can create, edit, and publish content. Can upload media.         |
| **AUTHOR** | `content.create`, `content.read` | Can create drafts but **cannot publish**. Needs approval.        |
| **VIEWER** | `content.read`                   | Read-only access to published content.                           |

## 2. Content Approval Workflow

(Coming in v0.2.0)

For robust editorial control, enable the Content Approval Workflow.

1. **Draft Creation**: An `AUTHOR` creates a page and saves it as a draft.
2. **Review Request**: The Author requests a review. Status changes to `PENDING_REVIEW`.
3. **Editorial Review**: An `EDITOR` or `ADMIN` reviews the content.
   - **Approve**: Content is published (Status: `PUBLISHED`).
   - **Reject**: Content is returned to draft with comments (Status: `DRAFT`).

## 3. Audit Logging

Every significant action in the system is recorded in the Audit Log for accountability and compliance.

### Tracked Events

- **Authentication**: Usage of Login/Logout, failed attempts.
- **Content**: Creation, updates, deletion, and status changes of pages.
- **User Management**: Creation, updates, and deletion of user accounts.
- **System**: Configuration changes.

### Viewing Logs

Admins can view audit logs via the **Settings > Audit Logs** panel or query them via the API:

```http
GET /api/audit-logs?startDate=2023-01-01&endDate=2023-01-31
```

## 4. Content Retention

By default, soPres uses "soft deletes" for pages (Archiving).

- **Archive**: Content is hidden but preserved in the database.
- **Restore**: Archived content can be restored to Draft status.
- **Permanent Delete**: Only Admins can permanently remove content from the database.

## 5. Environment Protection

To prevent accidental changes in production:

- **Schema Locking**: Database schema changes should only be applied via CI/CD pipelines.
- **Read-Only Mode**: (Planned) Ability to lock the entire CMS into read-only mode during maintenance windows.
