# Enterprise SSO Setup Guide

soPres Enterprise supports Single Sign-On (SSO) via SAML 2.0 and OpenID Connect (OIDC), enabling seamless integration with enterprise identity providers (IdP) such as Okta, Azure AD, Keycloak, and Google Workspace.

## 1. Supported Providers

- **Generic OIDC**: Compatible with any OIDC-compliant provider (Google, Azure AD, Keycloak, Auth0).
- **Generic SAML**: Compatible with SAML 2.0 Identity Providers.
- **GitHub Enterprise**: Specific connector for GitHub Enterprise Server.

## 2. Configuration

SSO is configured via environment variables or the `config/custom-environment-variables.json` file.

### OIDC Configuration

```env
OIDC_ISSUER="https://your-idp.com/auth/realms/enterprise"
OIDC_CLIENT_ID="vitecms-enterprise"
OIDC_CLIENT_SECRET="your-secret-key"
OIDC_CALLBACK_URL="https://cms.your-company.com/api/auth/callback/oidc"
```

### SAML Configuration

```env
SAML_ENTRY_POINT="https://your-idp.com/auth/realms/enterprise/protocol/saml"
SAML_CERT="<your-idp-public-cert>"
SAML_ISSUER="vitecms-enterprise"
SAML_CALLBACK_URL="https://cms.your-company.com/api/auth/callback/saml"
```

## 3. Just-In-Time (JIT) Provisioning

soPres supports JIT provisioning. When a user logs in via SSO for the first time:

1. A new user record is created in the database.
2. The user's profile information (Email, First Name, Last Name) is mapped from the IDP response.
3. **Roles** are assigned based on Group Mapping (see below).

## 4. Attribute & Group Mapping

To automate permission management, you can map IDP groups to soPres roles.

**Mapping Logic:**

| IDP Group          | soPres Role |
| :----------------- | :---------- |
| `scim-cms-admins`  | `ADMIN`     |
| `scim-cms-editors` | `EDITOR`    |
| `scim-cms-viewers` | `VIEWER`    |

**Configuration:**

User roles are currently determined by checking the `groups` or `roles` claim in the IDP token. Ensure your IDP is configured to send these claims.

## 5. Security Recommendations

- **Enforce MFA**: Configure Multi-Factor Authentication at the IDP level.
- **Short Session Lifetimes**: Set reasonable token expiration times (e.g., 1 hour for access tokens).
- **TLS/SSL**: Always use HTTPS for the Callback URL.
- **IdP IP Whitelisting**: If possible, restrict IdP access to known corporate IP ranges.
