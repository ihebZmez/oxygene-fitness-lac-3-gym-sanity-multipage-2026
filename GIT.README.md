# Git Workflow: Complete Terminal-Only Branch Management

## Overview
This document outlines a complete Git workflow for creating, working on, and merging feature branches entirely from the terminal without using GitHub/GitLab UI merge features.

## Workflow Steps

### 1. Start Working from Main
```bash
git checkout main
git pull origin main
git checkout -b R-20102025-customization
```

### 2. Work on Your Feature
```bash
git add .
git commit -m "customization 1 application"
git push -u origin R-20102025-customization
```

### 3. Merge Branch into Main (from Terminal)

First, make sure your branch has all commits saved.

```bash
git checkout main
git pull origin main
```

Merge your branch into main:

```bash
git merge R-20102025-customization
```

**If there are conflicts:**
- Edit files
- Resolve conflicts
- Then:
```bash
git add .
git commit
```

Push merged main:

```bash
git push origin main
```

### 4. Delete Branch Locally + Remotely

After merge is done:

```bash
git branch -d R-20102025-customization
```

**If Git refuses (unmerged branch):**
```bash
git branch -D R-20102025-customization
```

Delete remote branch:

```bash
git push origin --delete R-20102025-customization
```

### 5. Clean Stale Remote Refs
```bash
git fetch -p
```

### 6. Check Branches
```bash
git branch
git branch -r
```

### 7. Final State

You remain connected to main.

Verify:

```bash
git status
```

You should see something like:
```
On branch main
Your branch is up to date with 'origin/main'
```

## Workflow Summary

```
main → create branch → work → commit/push → merge into main → push main → delete branch → cleanup
```

## Pro Tip

If you want a cleaner history, use:

```bash
git merge --no-ff R-20102025-customization
```

This forces a merge commit, making it easier later to see which branch introduced which feature.