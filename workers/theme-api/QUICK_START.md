# ⚡ 快速开始 - 5 分钟部署

## 1️⃣ 安装 Wrangler (30 秒)

```bash
npm install -g wrangler
wrangler login
```

## 2️⃣ 创建 KV 存储 (1 分钟)

```bash
cd workers/theme-api

# 生产环境
wrangler kv namespace create "THEME_KV"
# 复制输出的 id

# 预览环境
wrangler kv namespace create "THEME_KV" --preview
# 复制输出的 preview_id
```

## 3️⃣ 更新配置 (30 秒)

编辑 `wrangler.toml`，替换这一行：

```toml
kv_namespaces = [
  { binding = "THEME_KV", id = "你的id", preview_id = "你的preview_id" }
]
```

## 4️⃣ 部署 (1 分钟)

```bash
npm install
npm run deploy
```

## 5️⃣ 配置域名 (2 分钟)

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers & Pages → theme-api → Settings → Triggers
3. Custom Domains → Add Custom Domain
4. 输入 `theme-api.antwen.com`
5. 点击 Add

## 6️⃣ 测试 (30 秒)

```bash
curl https://theme-api.antwen.com/gta-db/api/theme/global
```

看到这个就成功了：
```json
{
  "success": true,
  "data": {
    "theme": "halloween",
    "lastUpdate": "..."
  }
}
```

## ✅ 完成！

现在访问你的网站 admin 面板，点击"应用到全局"就能立即切换主题了！

## 🔧 常用命令

```bash
# 查看日志
npm run tail

# 重新部署
npm run deploy

# 本地开发
npm run dev
```

## 💡 提示

- Workers 免费套餐每天 100,000 次请求
- 对于主题 API 来说完全够用
- 部署后立即生效，无需等待
