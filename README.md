# Jason L. Albano — Portfolio Website
### Senior AI-Enabled Healthcare Data Analyst

---

## 📁 Folder Structure

```
jason-albano-portfolio/
├── index.html                  ← Main website (edit this for content)
├── README.md                   ← This file
├── assets/
│   ├── css/
│   │   └── style.css           ← All styles (edit for design changes)
│   ├── js/
│   │   └── script.js           ← All JavaScript (animations, interactions)
│   └── images/                 ← Place your images here
│       ├── profile.jpg         ← YOUR PHOTO (add this!)
│       └── og-preview.png      ← Social share preview image
├── Jason_Albano_Resume.pdf     ← YOUR RESUME PDF (add this!)
```

---

## ✅ CUSTOMIZATION CHECKLIST (Before Publishing)

Work through this list before going live:

### 🔴 Required
- [ ] **Add your profile photo**: Save as `assets/images/profile.jpg`
      Then open `index.html`, find `photo-placeholder` div, replace with:
      `<img src="assets/images/profile.jpg" alt="Jason Albano" class="profile-photo">`
      And add to style.css: `.profile-photo { width:100%; border-radius:var(--radius-lg); object-fit:cover; }`

- [ ] **Add your resume PDF**: Save as `assets/Jason_Albano_Resume.pdf`

- [ ] **Add LinkedIn URL**: In `index.html`, find "Visit LinkedIn profile" and replace `href="#"` with your actual LinkedIn URL

- [ ] **Add GitHub URL**: In `index.html`, find "Visit GitHub profile" and replace `href="#"` with your actual GitHub URL

- [ ] **Update project links**: Find each `project-link` anchor tag and replace `href="#"` with actual GitHub or demo URLs

- [ ] **Update contact form**: Sign up at formspree.io (free), create a form, copy the endpoint URL, and replace `https://formspree.io/f/YOUR_FORM_ID` in the form action attribute

### 🟡 Recommended
- [ ] **Update og:url meta tag**: Replace `https://yourusername.github.io` with your real GitHub Pages URL

- [ ] **Add og-preview.png**: Create a 1200×630px preview image at `assets/images/og-preview.png` for social sharing

- [ ] **Update phone/email**: Verify phone number `615.598.1794` and email `Japi782004@yahoo.com` are your preferred contact info

- [ ] **Add favicon**: Create a small icon and update the favicon `<link>` tag in `<head>`

- [ ] **Update project descriptions**: In the projects section, update any descriptions to match your actual portfolio projects exactly

### 🟢 Optional
- [ ] Add a blog section with links to LinkedIn articles
- [ ] Add Google Analytics tracking code before `</head>`
- [ ] Customize the color palette in the `:root` section of style.css
- [ ] Update typewriter phrases in script.js (`phrases` array)

---

## 🚀 DEPLOYING TO GITHUB PAGES

### Step 1: Create a GitHub Account
If you don't have one, go to https://github.com and sign up (free).

### Step 2: Create a New Repository
1. Click the **+** icon (top right) → **New repository**
2. Name it: `your-username.github.io` ← replace with YOUR GitHub username
   - Example: if your username is `jalbano`, name it `jalbano.github.io`
   - Using this exact format enables the free GitHub Pages domain
3. Set visibility to **Public**
4. Check **Add a README file** (optional)
5. Click **Create repository**

### Step 3: Upload Your Files
**Option A — GitHub Website (Easiest)**
1. Open your new repository on GitHub
2. Click **Add file** → **Upload files**
3. Drag and drop ALL files and the `assets` folder
4. Important: You MUST maintain the folder structure exactly
5. Scroll down, add a commit message (e.g., "Initial portfolio upload")
6. Click **Commit changes**

**Option B — GitHub Desktop App (Recommended)**
1. Download GitHub Desktop from https://desktop.github.com
2. Sign in with your GitHub account
3. Click **Clone a repository** → select your new repo → choose local folder
4. Copy all your portfolio files into that local folder
5. GitHub Desktop will show the new files
6. Add a summary (e.g., "Add portfolio files") → click **Commit to main**
7. Click **Push origin** to upload to GitHub

**Option C — Git Command Line**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (tab at top)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select **main** and **/ (root)**
6. Click **Save**
7. Wait 2–5 minutes
8. Refresh — you'll see: "Your site is published at https://yourusername.github.io"

### Step 5: Visit Your Site
Go to: `https://yourusername.github.io`

---

## 🔄 UPDATING THE WEBSITE LATER

### To change content (text, jobs, certifications, etc.):
1. Edit `index.html` in a text editor (VS Code recommended — free at code.visualstudio.com)
2. Find the section you want to change using Ctrl+F (search)
3. Make your changes, save the file
4. Re-upload to GitHub using the same method as Step 3

### To change colors or fonts:
1. Open `assets/css/style.css`
2. Find the `:root { }` block at the top
3. Change the color values (e.g., `--cyan: #00D4FF` → change to your preferred color)
4. Save and re-upload

### To update your resume:
1. Replace `assets/Jason_Albano_Resume.pdf` with your new file
2. Keep the same filename, or update the `href` in index.html if you rename it
3. Re-upload to GitHub

---

## 🔧 TROUBLESHOOTING

### Site doesn't load / shows 404
- Wait 5–10 minutes after enabling GitHub Pages — it takes time to build
- Verify the repository is named exactly `yourusername.github.io`
- Check that `index.html` is in the root of the repository (not inside a folder)
- Verify the branch is set to `main` in Pages settings

### Styles aren't loading (site looks plain/unstyled)
- Check that `assets/css/style.css` path is correct
- Make sure the `assets` folder was uploaded (common mistake)
- Hard-refresh the browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Images not showing
- Confirm the file is at `assets/images/profile.jpg` (exact filename, case-sensitive)
- Image filenames are case-sensitive on GitHub — `Profile.jpg` ≠ `profile.jpg`

### Contact form not working
- Make sure you replaced `YOUR_FORM_ID` with your actual Formspree form ID
- Formspree free tier requires email verification — check your inbox after first submission

### Dark/light toggle not saving preference
- This uses localStorage which requires the site to be served over HTTP(S)
- It won't work when opening `index.html` as a local file — it works on GitHub Pages

### GitHub Pages not updating after upload
- GitHub Pages can take 2–5 minutes to rebuild after each push
- Hard-refresh the browser after waiting
- Check the **Actions** tab in your repo to see if the build completed

---

## 📞 QUICK REFERENCE — Key Areas to Edit

| What you want to change | Where to find it |
|---|---|
| Name, title, value statement | `index.html` → `#hero` section |
| About Me bio text | `index.html` → `#about` section |
| Job history | `index.html` → `#experience` section |
| Projects | `index.html` → `#projects` section |
| Contact info | `index.html` → `#contact` section |
| Colors | `style.css` → `:root { }` at the top |
| Typewriter phrases | `script.js` → `phrases` array (~line 65) |
| Nav links | `index.html` → `.nav-links` section |

---

*Built for Jason L. Albano — Senior AI-Enabled Healthcare Data Analyst | Nashville, TN*
