# ZUUZ Website — Asset Upload Guide

Drop your files into the directories below. The site will pick them up automatically on next build/deploy.

## Directory Structure

```
website/
├── content/
│   └── resources/
│       ├── blog/                          # MDX blog posts (rendered as pages)
│       │   └── my-post.mdx               # Example: will render at /resources/blog/my-post
│       └── _source/
│           └── docx/                      # Original .docx backups (not rendered)
│
├── public/
│   ├── brand/
│   │   ├── zuuz-logo.png                 # ← DROP LOGO HERE (used in header)
│   │   └── zuuz-logo-white.png           # (optional) white version for dark backgrounds
│   │
│   ├── favicon.ico                        # ← DROP FAVICON HERE (referenced in metadata)
│   │
│   ├── media/
│   │   ├── hero.mp4                       # ← DROP HERO VIDEO HERE
│   │   ├── hero.webm                      # (optional) WebM version for better compression
│   │   └── flow.mp4                       # ← DROP FLOW ANIMATION VIDEO HERE
│   │
│   └── resources/
│       ├── manuals/                       # Agent one-pagers and product manuals (PDF)
│       │   ├── zuuz-email-ai-agent.pdf
│       │   ├── zuuz-documents-ai-agent.pdf
│       │   ├── zuuz-meetings-ai-agent.pdf
│       │   ├── zuuz-sales-ai-agent.pdf
│       │   └── zuuz-hr-ai-agents.pdf
│       │
│       ├── industry/                      # Industry solution documents (PDF)
│       │   ├── zuuz-for-manufacturing.pdf
│       │   ├── zuuz-for-healthcare.pdf
│       │   ├── zuuz-for-finance.pdf
│       │   └── ...
│       │
│       └── images/
│           ├── blog/                      # Blog post cover images
│           │   └── my-post-cover.png
│           └── resources/                 # Generic resource thumbnails
│               └── guide-thumbnail.png
```

## How to upload

1. **Logo**: Place `zuuz-logo.png` in `/public/brand/` — the header will use it automatically.
2. **Favicon**: Place `favicon.ico` in `/public/` (root of public).
3. **Videos**: Place `.mp4` files in `/public/media/`. Run `scripts/convert-videos.sh` if you have `.mov` files.
4. **PDFs**: Drop into `/public/resources/manuals/` or `/public/resources/industry/` as appropriate.
5. **Blog posts**: Create `.mdx` files in `/content/resources/blog/`.
6. **Images**: Place in the appropriate `/public/resources/images/` subdirectory.

All files in `/public/` are served at the root URL path. For example:
- `/public/brand/zuuz-logo.png` → accessible at `https://yoursite.com/brand/zuuz-logo.png`
- `/public/resources/manuals/zuuz-email-ai-agent.pdf` → `https://yoursite.com/resources/manuals/zuuz-email-ai-agent.pdf`
