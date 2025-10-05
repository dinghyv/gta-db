# 🚀 部署指南

## 部署到 Vercel

### 方法 1：网页界面部署（推荐）

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择 `dinghyv/gta-db` 仓库
   - 点击 "Import"

3. **配置已自动完成**
   - ✅ Build Command: `npm run build`
   - ✅ Output Directory: `dist`
   - ✅ Install Command: `npm install`
   - （这些配置已在 `vercel.json` 中设置）

4. **部署**
   - 点击 "Deploy"
   - 等待 2-3 分钟
   - 完成！🎉

5. **访问网站**
   - Vercel 会提供一个域名，如：`gta-db.vercel.app`
   - 可以绑定自定义域名

### 方法 2：命令行部署

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod

# 4. 按提示操作
# - Set up and deploy? Yes
# - Which scope? 选择你的账号
# - Link to existing project? No
# - What's your project's name? gta-db
# - In which directory is your code located? ./
# - Want to override the settings? No
```

## 自动部署

每次推送到 GitHub 时，Vercel 会自动重新部署：

```bash
# 提交更改
git add .
git commit -m "更新内容"
git push origin main

# Vercel 会自动检测并部署
```

## 环境变量（如果需要）

在 Vercel 项目设置中添加：
- Settings → Environment Variables
- 添加你需要的环境变量

## 自定义域名

1. 在 Vercel 项目中点击 "Settings" → "Domains"
2. 添加你的域名
3. 按照提示配置 DNS

## 构建日志

如果部署失败：
1. 查看 Vercel 的构建日志
2. 检查是否有错误
3. 常见问题：
   - 缺少依赖：运行 `npm install`
   - 构建失败：检查 `npm run build` 是否正常

## 性能优化

Vercel 已自动配置：
- ✅ CDN 加速
- ✅ 自动压缩
- ✅ 缓存优化
- ✅ HTTPS

## 监控

在 Vercel Dashboard 可以查看：
- 访问量统计
- 构建历史
- 性能指标
- 错误日志
