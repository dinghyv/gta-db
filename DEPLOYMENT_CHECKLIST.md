# 🚀 部署前检查清单

## ✅ 部署前必做

### 1. 清理缓存
```bash
# 清除 localStorage 缓存
localStorage.clear();
```

### 2. 重新构建
```bash
npm run build
```

### 3. 本地测试
```bash
npm run preview
# 访问 http://localhost:8080
```

### 4. 检查关键文件

确保以下文件存在于 `dist/` 目录：

```
dist/
├── index.html ✅
├── 404.html ✅
├── admin/
│   └── index.html ✅
├── vehicles/
│   ├── index.html ✅
│   └── decrypt.js ✅
├── gta-map/
│   ├── ls/
│   │   ├── index.html ✅
│   │   └── js/
│   │       ├── map-core.js (混淆后) ✅
│   │       ├── mobile-controls.js ✅
│   │       └── protection.js ✅
│   └── cp/ ✅
├── src/
│   ├── assets/ ✅
│   └── data/
│       ├── vehicles_database_encrypted.json ✅
│       └── vehicles_database_antwen.json ✅ (备用)
├── rdr-map/ ✅
└── group/ ✅
```

### 5. 验证文件
```bash
# 检查 vehicles/decrypt.js
cat dist/vehicles/decrypt.js

# 检查 vehicles/index.html
cat dist/vehicles/index.html | grep "decrypt.js"
```

## 🔧 Vercel 部署配置

### vercel.json 检查

确保配置正确：
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

### 环境变量（如果需要）

在 Vercel Dashboard 设置：
- 无需设置（纯静态网站）

## 🐛 常见问题排查

### 问题 1: decrypt.js 404

**症状**：
```
GET /decrypt.js 404
Refused to execute script... MIME type ('text/html')
```

**解决方案**：
1. 检查 `dist/vehicles/decrypt.js` 是否存在
2. 检查 HTML 中的引用路径：`<script src="decrypt.js"></script>`
3. 重新构建：`npm run build`

### 问题 2: 解密失败

**症状**：
```
allVehicles.forEach is not a function
```

**解决方案**：
1. 清除浏览器缓存和 localStorage
2. 检查加密数据是否正确生成：`npm run encrypt`
3. 查看控制台错误信息

### 问题 3: 中文乱码

**症状**：车辆名称显示乱码

**解决方案**：
1. 重新加密：`npm run encrypt`
2. 重新构建：`npm run build`
3. 清除缓存

### 问题 4: Tailwind CSS 警告

**症状**：
```
cdn.tailwindcss.com should not be used in production
```

**解决方案**：
- 这是警告，不影响功能
- 可以忽略，或者安装 Tailwind CSS：
  ```bash
  npm install -D tailwindcss
  npx tailwindcss init
  ```

## 📝 部署步骤

### 1. 提交代码
```bash
git add .
git commit -m "🚀 准备部署"
git push origin main
```

### 2. Vercel 自动部署

- Vercel 会自动检测到 push
- 等待 2-3 分钟
- 查看部署日志

### 3. 验证部署

访问以下页面确认：
- ✅ 主页：`/`
- ✅ 管理面板：`/admin`
- ✅ 车辆百科：`/vehicles`
- ✅ GTA 地图：`/gta-map/ls`
- ✅ RDR 地图：`/rdr-map`

### 4. 测试功能

在车辆页面控制台应该看到：
```
✅ 使用缓存的车辆数据
开始处理图片URL... 780 辆车
💾 已缓存车辆数据到本地
```

## 🔄 更新数据流程

### 更新车辆数据
```bash
# 1. 编辑原始数据
vim src/data/vehicles_database_antwen.json

# 2. 重新加密
npm run encrypt

# 3. 修改版本号（强制用户更新缓存）
# 编辑 vehicles/index.html
# 修改 CACHE_VERSION = '1.0.1'

# 4. 构建
npm run build

# 5. 提交
git add .
git commit -m "📊 更新车辆数据"
git push

# 6. Vercel 自动部署
```

## 🎯 性能优化

### 已实现
- ✅ 代码混淆（57% 压缩）
- ✅ localStorage 缓存
- ✅ HTTP 缓存
- ✅ CDN 加速（Vercel）
- ✅ 数据加密

### 可选优化
- [ ] 图片懒加载
- [ ] Service Worker
- [ ] 预加载关键资源
- [ ] 代码分割

## 📊 监控

### Vercel Analytics
- 访问量
- 性能指标
- 错误日志

### 浏览器控制台
- 检查错误
- 查看加载时间
- 验证缓存
