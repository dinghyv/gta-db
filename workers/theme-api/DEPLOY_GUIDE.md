# 🚀 快速部署指南

## 步骤 1: 安装 Wrangler CLI

```bash
npm install -g wrangler
```

## 步骤 2: 登录 Cloudflare

```bash
wrangler login
```

浏览器会打开，授权 Wrangler 访问你的 Cloudflare 账户。

## 步骤 3: 创建 KV 命名空间

```bash
cd workers/theme-api

# 创建生产环境 KV
wrangler kv namespace create "THEME_KV"
```

输出示例：
```
Creating namespace with title "theme-api-THEME_KV"
Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "THEME_KV", id = "abc123def456" }
```

```bash
# 创建预览环境 KV
wrangler kv namespace create "THEME_KV" --preview
```

输出示例：
```
Creating namespace with title "theme-api-THEME_KV_preview"
Success!
{ binding = "THEME_KV", preview_id = "xyz789 uvw012" }
{ binding = "THEME_KV", preview_id = "xyz789uvw012" }
```

## 步骤 4: 更新配置文件

编辑 `wrangler.toml`，替换 KV ID：

```toml
kv_namespaces = [
  { binding = "THEME_KV", id = "abc123def456", preview_id = "xyz789uvw012" }
]
```

## 步骤 5: 本地测试

```bash
npm install
npm run dev
```

访问 `http://localhost:8787/health` 测试。

## 步骤 6: 部署到 Cloudflare

```bash
npm run deploy
```

输出示例：
```
Total Upload: 2.34 KiB / gzip: 0.98 KiB
Uploaded theme-api (1.23 sec)
Published theme-api (0.45 sec)
  https://theme-api.your-subdomain.workers.dev
```

## 步骤 7: 配置自定义域名

### 方法 1: 通过 Dashboard（推荐）

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages**
3. 选择 **theme-api**
4. 点击 **Settings** → **Triggers**
5. 在 **Custom Domains** 部分点击 **Add Custom Domain**
6. 输入 `theme-api.antwen.com`
7. 点击 **Add Custom Domain**

Cloudflare 会自动配置 DNS 记录。

### 方法 2: 通过 CLI

```bash
wrangler domains add theme-api.antwen.com
```

## 步骤 8: 验证部署

```bash
# 测试健康检查
curl https://theme-api.antwen.com/health

# 测试获取主题
curl https://theme-api.antwen.com/api/theme/global

# 测试更新主题
curl -X POST https://theme-api.antwen.com/api/admin/update-theme \
  -H "Content-Type: application/json" \
  -d '{"theme": "halloween", "timestamp": 1696492800000}'
```

## 步骤 9: 初始化默认主题

访问一次 API 会自动创建默认配置：
```bash
curl https://theme-api.antwen.com/api/theme/global
```

## 步骤 10: 更新前端

前端已经配置好了，只需重新构建：

```bash
cd ../..  # 回到项目根目录
npm run build
git add .
git commit -m "🎨 添加主题 API 支持"
git push origin main
```

## ✅ 完成！

现在你可以：
1. 访问 `https://你的域名/admin`
2. 选择主题
3. 点击"应用到全局"
4. 所有访问者立即看到新主题！

## 🔧 常用命令

```bash
# 查看实时日志
npm run tail

# 重新部署
npm run deploy

# 查看 KV 数据
wrangler kv:key get --binding=THEME_KV "global_theme"

# 手动设置 KV 数据
wrangler kv:key put --binding=THEME_KV "global_theme" '{"theme":"halloween","lastUpdate":"2025-10-05T13:27:00+08:00"}'

# 列出所有 KV 键
wrangler kv:key list --binding=THEME_KV
```

## 🐛 故障排除

### 问题 1: KV 命名空间未找到
```
Error: KV namespace binding "THEME_KV" not found
```

**解决**: 确保在 `wrangler.toml` 中正确配置了 KV ID。

### 问题 2: 自定义域名未生效
```
DNS_PROBE_FINISHED_NXDOMAIN
```

**解决**: 
1. 检查域名是否在 Cloudflare 托管
2. 等待 DNS 传播（最多 5 分钟）
3. 清除浏览器 DNS 缓存

### 问题 3: CORS 错误
```
Access to fetch at 'https://theme-api.antwen.com' has been blocked by CORS policy
```

**解决**: 检查 `src/index.js` 中的 CORS_HEADERS 配置。

## 📊 监控

在 Cloudflare Dashboard 查看：
- **Analytics**: 请求数、错误率、响应时间
- **Logs**: 实时日志流
- **KV**: 存储使用情况

## 🔄 更新 API

修改代码后：
```bash
npm run deploy
```

更改会立即生效，无需重启。

## 💡 提示

- Workers 免费套餐：每天 100,000 次请求
- KV 免费套餐：1 GB 存储，每天 100,000 次读取
- 对于 GTA 主题 API 来说完全够用！
