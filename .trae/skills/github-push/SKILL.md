---
name: github-push
description: 将当前项目改动提交并推送到 GitHub 仓库 fujianingaaa/fujianing623，通过 SSH 公钥认证走 443 端口。当用户要求提交到 github、commit 并 push、上传代码到远程仓库时使用。不用于 gitee 推送或代码审查。
---

# 提交到 GitHub

把当前工作区的改动提交并推送到 `fujianingaaa/fujianing623`。仓库为空仓库、默认分支 `main`。

## 固定参数

- 远程地址：`ssh://git@ssh.github.com:443/fujianingaaa/fujianing623.git`
- 认证方式：SSH 公钥 `C:\Users\DELL\.ssh\id_ed25519`（无需密码、无需 token）
- 分支：`main`

## 必须遵守

1. 端口 22 在本机被拒，**不要**用 `git@github.com:...` 的默认 SSH 形式，必须走 `ssh.github.com:443`。
2. 工作区根目录 `高级网页设计` 是仓库根；`333/` 是历史上独立的仓库，已在 `.gitignore` 中排除 `333/.git/`，不要改成子模块。
3. 提交信息用中文，简述本次改动意图。
4. 不执行 `push --force`，不做 `reset --hard`。
5. 只提交用户要求的内容，不提交密钥、`.env`、凭据文件。

## 执行步骤

```powershell
# 首次使用（仅当 .git 不存在时执行）
git init -b main
git remote add origin ssh://git@ssh.github.com:443/fujianingaaa/fujianing623.git

# 常规提交流程
git status --short
git add <具体文件>          # 不要用 git add -A，避免误提交
git commit -m "<中文提交说明>"
git push -u origin main
```

推送完成后用 `git log --oneline -n 3` 和 `git status --short --branch` 确认本地与 `origin/main` 同步。

## 失败处理

- `Connection refused` / 端口 22 超时：确认远程地址用的是 443 形式。
- `Permission denied (publickey)`：检查 `C:\Users\DELL\.ssh\id_ed25519.pub` 是否已添加到 GitHub 账号。
- 未配置提交身份时，使用本机已有配置（`付佳宁` / `a3687941a@qq.com`），不要修改全局 git config。
