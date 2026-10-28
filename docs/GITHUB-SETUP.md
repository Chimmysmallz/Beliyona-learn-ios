# Publishing Study Egg on GitHub Pages

Imagine sending a friend one link, and it opens Study Egg full-screen on their phone with its own icon on the home screen. GitHub Pages gives you that link for free. This guide gets you there in about ten minutes, without typing a single command.

---

## Before you start: one decision

On a free GitHub account, a Pages site must come from a **public** repository. Public means anyone can browse the code, including the question bank and lessons. That is normal for web apps, because anyone can also read the code from the live site in their browser. If you would rather keep the code private, GitHub's paid plan allows Pages from a private repository.

---

## Step 1: Create an account and a repository

1. Sign up at **github.com** (free).
2. Click **+** (top right) → **New repository**.
3. Name it `study-egg`. Choose **Public**. Leave everything else as it is. Click **Create repository**.

## Step 2: Upload the files (easiest way: GitHub Desktop)

1. Install **GitHub Desktop** from desktop.github.com and sign in.
2. **File → Clone repository** → pick `study-egg` → choose a folder on your computer.
3. Unzip `StudyEgg-GitHub.zip`. Copy everything **inside** the `study-egg` folder (including the hidden `.github` folder) into the cloned folder.
   - On Windows, turn on File Explorer → View → **Hidden items** so you can see `.github`, `.gitignore` and `.nojekyll`.
4. GitHub Desktop now lists all the files. Type a summary such as `First upload` and click **Commit to main**, then **Push origin**.

**No GitHub Desktop?** On the repository page click **Add file → Upload files**, then drag in the contents of the `study-egg` folder. The site still works if the hidden files do not come across. You only lose the automatic checks.

## Step 3: Switch on GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**. Click **Save**.
4. Wait one to two minutes, then refresh. GitHub shows your address, for example `https://yourname.github.io/study-egg/`.

## Step 4: Install it on your iPhone

1. Open your address in **Safari** (it must be Safari on iPhone).
2. Tap **Share** → **Add to Home Screen** → **Add**.
3. Open Study Egg from the new icon. It runs full-screen like a real app.

---

## Updating the live app

1. Edit files in `src/`.
2. Double-click **BUILD.bat**. Continue only if it says **ALL GOOD**.
3. In GitHub Desktop, write a summary of the change, click **Commit to main**, then **Push origin**.
4. The live site updates within about two minutes. On iPhone, close the app fully and reopen it.

The **Actions** tab on GitHub shows a green tick when the automatic checks pass and a red cross if something is wrong. The red cross usually means you forgot to run BUILD before committing.

## Testing on your phone before publishing

Double-click **SERVE.bat**. It shows an address such as `http://192.168.1.20:8000/`. With your phone on the same Wi-Fi, open that address in Safari. Nothing is uploaded anywhere, and you can stop it with Ctrl+C.

## Your own domain (optional)

If you buy a domain such as `studyegg.ng`, add it under **Settings → Pages → Custom domain** and follow GitHub's instructions for your domain registrar. Decide this early. Changing the address later resets every learner's saved progress (see the golden rules in the README).
