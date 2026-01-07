# Getting Started with soPres

**Time to First Page:** ~15 minutes ⏱️
**Difficulty:** Easy 🟢
**Version:** v.0.016

---

## 📋 What You'll Learn

In this guide, you'll:

- ✅ Install and set up soPres
- ✅ Access the admin panel
- ✅ Create your first page
- ✅ Upload media files
- ✅ Publish content
- ✅ Understand the basics

**Let's get started!** 🚀

---

## ⚡ Quick Start (5 Minutes)

### Prerequisites

Before you begin, make sure you have:

- **Node.js** 18.x or higher ([Download](https://nodejs.org))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com))

**Check your versions:**

```bash
node --version  # Should be v18.x.x or higher
npm --version   # Should be 9.x.x or higher
```

---

## 📥 Installation

### Step 1: Get the Code

```bash
# Clone the repository
git clone https://github.com/yourusername/sopres.git

# Navigate into the directory
cd sopres
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages. Takes about 2-3 minutes depending on your internet connection.

### Step 3: Setup Environment

```bash
# Copy the example environment file
cp .env.example .env
```

The default `.env` file works perfectly for development. You don't need to change anything!

**Default configuration:**

```bash
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET="dev-secret-change-in-production"
JWT_REFRESH_SECRET="dev-refresh-secret-change-in-production"
```

### Step 4: Initialize Database

```bash
# Create database tables
npx prisma migrate dev

# Add sample data
npx prisma db seed
```

**What this does:**

- Creates a SQLite database file (`dev.db`)
- Creates all necessary tables (users, pages, media, etc.)
- Adds a default admin user
- Adds some sample content

### Step 5: Start Development Servers

```bash
npm run dev
```

**This starts two servers:**

- 🎨 **Admin Panel:** http://localhost:5173
- 🔌 **API Server:** http://localhost:3000

**You'll see output like:**

```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose

Server running on port 3000
```

---

## 🎨 First Login

### 1. Open Admin Panel

Navigate to: **http://localhost:5173**

### 2. Login with Default Credentials

```
Email:    admin@sopres.com
Password: admin123
```

⚠️ **Important:** Change this password immediately after first login!

### 3. You're In!

Welcome to the soPres dashboard! 🎉

You should see:

- **Dashboard** with content overview
- **Sidebar** with navigation menu
- **User menu** in top-right corner

---

## 📝 Creating Your First Page

### Step 1: Navigate to Content

Click **"Content"** in the sidebar, then click **"New Page"** button.

### Step 2: Fill in the Details

**Required fields:**

**Title:**

```
Welcome to My Website
```

**Slug:** (auto-generated from title)

```
welcome-to-my-website
```

**Content:** (Markdown format)

```markdown
# Welcome to My Website

This is my first page created with soPres!

## Features I Love

- Easy to use
- Fast and modern
- Markdown support
- Built-in media library

## Getting Started

Check out the [documentation](https://sopres.de/docs) to learn more!
```

**Optional fields:**

**Description/Excerpt:**

```
Welcome page for my new website built with soPres
```

**SEO Title:**

```
Welcome | My Website
```

**SEO Description:**

```
Discover my new website powered by soPres - fast, modern, and easy to use.
```

**SEO Keywords:**

```
welcome, sopres, cms, website
```

### Step 3: Save as Draft

Click **"Save Draft"** button.

Your page is now saved but not yet published (visible only to you).

### Step 4: Preview

Click **"Preview"** to see how your page looks.

### Step 5: Publish

When you're happy with your page, click **"Publish"**.

**Congratulations!** 🎉 Your first page is now live!

---

## 🖼️ Uploading Media

### Step 1: Go to Media Library

Click **"Media"** in the sidebar.

### Step 2: Upload Files

Click **"Upload"** or drag & drop files into the upload area.

**Supported formats:**

- **Images:** JPG, PNG, GIF, WebP, SVG
- **Documents:** PDF, DOCX, XLSX
- **Videos:** MP4, WebM
- **Max size:** 100MB per file

### Step 3: View Uploaded Files

Your uploaded files appear in the media library with:

- Thumbnail preview
- File name
- File size
- Upload date
- Actions (edit, delete, copy URL)

### Step 4: Use in Content

**Copy the file URL and use in Markdown:**

```markdown
![My Image](/uploads/image-name.jpg)
```

Or use the pattern system:

```markdown
{{pattern:image|src=/uploads/image-name.jpg|alt=Description}}
```

---

## 🎯 Understanding the Interface

### Dashboard

The **Dashboard** shows you:

- Total pages, drafts, published
- Media library stats
- Recent activity
- Quick actions

### Sidebar Navigation

- **Dashboard** - Overview and stats
- **Content** - Manage pages
- **Media** - Media library
- **Patterns** - Reusable components
- **Users** - User management (admin only)
- **Settings** - System settings

### Top Bar

- **Search** - Find content quickly
- **Notifications** - System alerts
- **User Menu** - Profile, settings, logout

---

## ✏️ Markdown Basics

soPres uses Markdown for content. Here's a quick reference:

### Headings

```markdown
# Heading 1

## Heading 2

### Heading 3
```

### Text Formatting

```markdown
**Bold text**
_Italic text_
~~Strikethrough~~
```

### Lists

**Unordered:**

```markdown
- Item 1
- Item 2
  - Nested item
```

**Ordered:**

```markdown
1. First item
2. Second item
3. Third item
```

### Links

```markdown
[Link Text](https://example.com)
```

### Images

```markdown
![Alt Text](/path/to/image.jpg)
```

### Code

**Inline code:**

```markdown
Use `code` for inline code
```

**Code blocks:**

````markdown
```javascript
function hello() {
  console.log("Hello World!");
}
```
````

### Blockquotes

```markdown
> This is a quote
```

---

## 🔒 Changing Your Password

### Step 1: Access User Menu

Click your **user icon** in the top-right corner.

### Step 2: Go to Profile

Select **"Profile"** from the dropdown.

### Step 3: Change Password

1. Enter current password
2. Enter new password
3. Confirm new password
4. Click **"Update Password"**

**Password requirements:**

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

---

## 🎨 Using Patterns

Patterns are reusable content components.

### What are Patterns?

Think of patterns as **building blocks** for your content:

- Hero sections
- Call-to-action buttons
- Image galleries
- Contact forms
- Testimonials

### Using a Pattern

**Syntax:**

```markdown
{{pattern:pattern-name}}
```

**With parameters:**

```markdown
{{pattern:pattern-name|param1=value1|param2=value2}}
```

### Example: Hero Section

```markdown
{{pattern:hero|title=Welcome|subtitle=Start your journey|bg=/uploads/hero.jpg}}
```

### Creating Custom Patterns

1. Go to **Patterns** in sidebar
2. Click **"New Pattern"**
3. Define your pattern with HTML/CSS
4. Save and use in content

---

## 📊 Understanding Page Status

### DRAFT 📝

- Not visible to public
- You can edit and preview
- Use for work-in-progress

### PUBLISHED ✅

- Live and visible to everyone
- Can still be edited
- Changes are immediate

### ARCHIVED 📦

- Hidden from public
- Still in database
- Can be restored anytime

### Changing Status

Click the **status dropdown** on any page to change between:

- Draft → Published
- Published → Archived
- Archived → Published

---

## 🔄 Version History

Every time you save a page, soPres creates a **version snapshot**.

### Viewing Versions

1. Open any page
2. Click **"Version History"** button
3. See list of all versions with:
   - Version number
   - Timestamp
   - Author

### Restoring a Version

1. Open version history
2. Find the version you want
3. Click **"Restore"**
4. Confirm the action

**The page reverts to that version!**

---

## 🚀 Next Steps

Now that you've mastered the basics, explore:

### Learn More

- 📖 [User Guide](HANDBOOK.md#4-user-guide) - Detailed user documentation
- 🎨 [Content Creation](HANDBOOK.md#42-content-management) - Advanced content techniques
- 🖼️ [Media Management](HANDBOOK.md#43-media-management) - Media best practices
- 🎯 [Pattern System](HANDBOOK.md#44-pattern-system) - Create reusable components

### For Developers

- 🛠️ [Developer Guide](HANDBOOK.md#5-developer-guide) - Development workflow
- 📡 [API Documentation](api/README.md) - REST API reference
- 🧪 [Testing Guide](development/TESTING.md) - Testing guidelines
- 🐳 [Deployment](DEPLOYMENT_GUIDE.md) - Production deployment

### Advanced Features

- 👥 User Management - Add editors and collaborators
- 🔍 SEO Optimization - Improve search rankings
- 🌍 Multi-language - Support multiple languages
- 📈 Analytics - Track your content performance

---

## 💡 Tips & Tricks

### Keyboard Shortcuts

| Shortcut       | Action       |
| -------------- | ------------ |
| `Ctrl/Cmd + S` | Save draft   |
| `Ctrl/Cmd + P` | Publish      |
| `Ctrl/Cmd + K` | Open search  |
| `Esc`          | Close modals |

### Quick Actions

- **Duplicate a page:** Click "..." menu → Duplicate
- **Preview before publish:** Always use Preview button
- **Bulk operations:** Select multiple items → Actions
- **Search everything:** Use Cmd/Ctrl + K

### Best Practices

✅ **Always preview before publishing**
✅ **Use descriptive slugs** (good: "about-us", bad: "page-1")
✅ **Add alt text to images** (good for SEO and accessibility)
✅ **Fill in SEO fields** (title, description, keywords)
✅ **Use headings hierarchically** (H1 → H2 → H3)
✅ **Save drafts frequently** (auto-save is coming!)

---

## ❓ Frequently Asked Questions

### How do I delete a page?

1. Go to Content → Pages
2. Find the page
3. Click "..." menu → Delete
4. Confirm deletion

**Note:** Deleted pages are removed permanently. Use Archive instead if you might need them later.

### Can I undo changes?

Yes! Use Version History to restore any previous version.

### How do I add more users?

Go to **Users** → **New User** (Admin only):

1. Enter email, name, password
2. Select role (Admin, Editor, Viewer)
3. Set active status
4. Click "Create User"

### What's the difference between roles?

- **ADMIN:** Full access, can manage users
- **EDITOR:** Create/edit content, upload media
- **VIEWER:** Read-only access

### Can I change the admin email?

Yes! Go to your Profile and update the email field.

### What if I forget my password?

Currently, password reset must be done manually by an admin. Password reset feature is coming in v0.2!

### Can I use HTML in my content?

Markdown supports basic HTML, so yes! But be careful with security.

### How do I embed videos?

Use standard Markdown image syntax or create a video pattern:

```markdown
![Video Title](/uploads/video.mp4)
```

### Is my data safe?

Yes!

- Database is backed up automatically (if configured)
- Version history preserves all changes
- All passwords are encrypted
- API uses secure JWT tokens

---

## 🐛 Troubleshooting

### I can't login

**Check:**

- Are you using correct credentials?
- Is the API server running? (http://localhost:3000)
- Check browser console for errors

### Pages won't save

**Check:**

- Required fields filled in?
- Internet connection stable?
- Check API server logs

### Images won't upload

**Check:**

- File size under 100MB?
- Supported file format?
- Enough disk space?

### Admin panel is slow

**Try:**

- Clear browser cache
- Reload the page
- Check network connection
- Restart development servers

### Database errors

**Fix:**

```bash
# Reset database (WARNING: Deletes all data!)
npx prisma migrate reset

# Re-seed
npx prisma db seed
```

---

## 🆘 Getting Help

### Resources

- 📖 **Handbook:** [HANDBOOK.md](../HANDBOOK.md)
- 🔧 **Troubleshooting:** [HANDBOOK.md#8-troubleshooting](../HANDBOOK.md#8-troubleshooting)
- 📚 **Documentation:** [docs/README.md](README.md)
- 🐛 **Known Issues:** [KNOWN_ISSUES.md](KNOWN_ISSUES.md)

### Community

- 💬 **GitHub Discussions:** Ask questions
- 🐛 **GitHub Issues:** Report bugs
- ✉️ **Email:** support@sopres.com

---

## 🎉 Congratulations!

You've completed the Getting Started guide! You now know how to:

✅ Install and set up soPres
✅ Login to the admin panel
✅ Create and publish pages
✅ Upload and manage media
✅ Use Markdown formatting
✅ Work with patterns
✅ Manage versions

**You're ready to start building amazing websites with soPres!** 🚀

---

## 📚 What's Next?

### Beginner Path

1. **Create more pages** - Practice makes perfect!
2. **Upload some images** - Build your media library
3. **Experiment with Markdown** - Try different formatting
4. **Create a navigation menu** - Link your pages together

### Intermediate Path

1. **Learn patterns** - Create reusable components
2. **Customize SEO** - Optimize for search engines
3. **Invite collaborators** - Add more users
4. **Organize content** - Use categories and tags

### Advanced Path

1. **Explore the API** - [API Documentation](api/README.md)
2. **Build custom themes** - [Theme Development](development/THEMES.md)
3. **Create plugins** - [Plugin Development](development/PLUGINS.md)
4. **Deploy to production** - [Deployment Guide](DEPLOYMENT_GUIDE.md)

---

**Happy Building!** 🎨✨

**Questions?** Check the [Handbook](../HANDBOOK.md) or [open an issue](https://github.com/yourusername/sopres/issues)!

---

**Last Updated:** 2025-11-26
**Version:** v.0.016
