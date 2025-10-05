# 🎨 GTA 主题管理 API

Cloudflare Workers API for managing GTA website themes.


### 1. 获取全局主题
```
GET https://theme-api.antwen.com/gta-db/api/theme/global
```
### 2. 更新全局主题
{{ ... }}
POST https://theme-api.antwen.com/gta-db/api/admin/update-theme
Content-Type: application/json

{
  "theme": "halloween",
  "timestamp": 1696492800000
}
```

**响应**:
```json
{
  "success": true,
  "message": "主题已成功更新",
  "data": {
    "theme": "halloween",
    "lastUpdate": "2025-10-05T13:27:00+08:00",
    "updatedBy": "admin",
    "timestamp": 1696492800000,
    "description": "全局主题配置 - halloween"
  }
}
```


## 🚀 部署步骤

### 1. 安装依赖
```bash
cd workers/theme-api
npm install
```

### 2. 登录 Cloudflare
```bash
npx wrangler login
```

### 3. 创建 KV 命名空间
```bash
# 生产环境
npx wrangler kv namespace create "THEME_KV"

# 预览环境
npx wrangler kv namespace create "THEME_KV" --preview
```

记录返回的 ID，更新 `wrangler.toml` 中的：
```toml
kv_namespaces = [
  { binding = "THEME_KV", id = "你的KV_ID", preview_id = "你的预览KV_ID" }
]
```

### 4. 本地开发
```bash
npm run dev
```

访问 `http://localhost:8787`

### 5. 部署到生产环境
```bash
npm run deploy
```

### 6. 配置自定义域名

在 Cloudflare Dashboard:
1. 进入 Workers & Pages
2. 选择 `theme-api`
3. Settings → Triggers → Custom Domains
4. 添加 `theme-api.antwen.com`

## 🧪 测试

### 测试获取主题
```bash
curl https://theme-api.antwen.com/gta-db/api/theme/global
```

### 测试更新主题
```bash
curl -X POST https://theme-api.antwen.com/gta-db/api/admin/update-theme \
  -H "Content-Type: application/json" \
  -d '{"theme": "halloween", "timestamp": 1696492800000}'
```

## 📊 可用主题

- `default` - GTA 经典橙色主题
- `halloween` - 🎃 万圣节主题
- `christmas` - 🎄 圣诞节主题（即将推出）
- `dark` - 🌙 暗黑主题（即将推出）

## 🔒 安全建议

### 添加身份验证（可选）

编辑 `src/index.js`，在 `updateGlobalTheme` 函数中添加：

```javascript
// 验证 API 密钥
const apiKey = request.headers.get('X-API-Key');
if (apiKey !== env.ADMIN_API_KEY) {
  return jsonResponse({
    success: false,
    error: '未授权'
  }, 401);
}
```

在 `wrangler.toml` 中添加：
```toml
[vars]
ADMIN_API_KEY = "your-secret-key"
```

## 📝 日志查看

```bash
# 实时查看日志
npm run tail

# 或
npx wrangler tail
```

## 🔄 更新前端配置

更新 `src/js/theme-manager.js` 中的 API 地址：

```javascript
const API_BASE = 'https://theme-api.antwen.com';
```

## 📈 监控

在 Cloudflare Dashboard 查看：
- 请求数量
- 错误率
- 响应时间
- KV 存储使用量

## 🐛 故障排除

### KV 命名空间未找到
确保在 `wrangler.toml` 中正确配置了 KV ID

### CORS 错误
检查 `CORS_HEADERS` 配置是否正确

### 404 错误
确认自定义域名已正确配置

## 📞 支持

如有问题，检查：
1. Cloudflare Workers 日志
2. KV 存储状态
3. 自定义域名配置
4. DNS 解析是否正确
