# 🎨 主题管理 API 端点

## 概述

主题管理系统通过 API 实现全局主题配置，无需重新构建和部署。

## API 端点

### 1. 获取全局主题

**端点**: `GET /api/theme/global`

**描述**: 获取当前全局主题配置

**响应示例**:
```json
{
  "success": true,
  "data": {
    "theme": "halloween",
    "lastUpdate": "2025-10-05T13:24:00+08:00",
    "updatedBy": "admin"
  }
}
```

### 2. 更新全局主题

**端点**: `POST /api/admin/update-theme`

**描述**: 更新全局主题配置（需要管理员权限）

**请求体**:
```json
{
  "theme": "halloween",
  "timestamp": 1696492800000
}
```

**响应示例**:
```json
{
  "success": true,
  "message": "主题已更新",
  "data": {
    "theme": "halloween",
    "lastUpdate": "2025-10-05T13:24:00+08:00"
  }
}
```

## 实现方案

### 方案 1：使用现有数据库

如果你的 API 已经有数据库，添加一个主题配置表：

```sql
CREATE TABLE theme_config (
  id INT PRIMARY KEY AUTO_INCREMENT,
  theme VARCHAR(50) NOT NULL,
  last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by VARCHAR(50)
);

-- 插入默认配置
INSERT INTO theme_config (theme, updated_by) 
VALUES ('halloween', 'admin');
```

### 方案 2：使用 JSON 文件存储

在你的 API 服务器上创建一个 JSON 文件：

```javascript
// api/theme/global.js (Vercel Serverless Function)
const fs = require('fs');
const path = require('path');

const THEME_FILE = path.join('/tmp', 'theme-config.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // 读取主题配置
    try {
      if (fs.existsSync(THEME_FILE)) {
        const data = JSON.parse(fs.readFileSync(THEME_FILE, 'utf8'));
        return res.status(200).json({
          success: true,
          data: data
        });
      }
    } catch (error) {
      console.error(error);
    }
    
    // 返回默认配置
    return res.status(200).json({
      success: true,
      data: {
        theme: 'halloween',
        lastUpdate: new Date().toISOString(),
        updatedBy: 'system'
      }
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
```

```javascript
// api/admin/update-theme.js (Vercel Serverless Function)
const fs = require('fs');
const path = require('path');

const THEME_FILE = path.join('/tmp', 'theme-config.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { theme, timestamp } = req.body;
      
      // 验证主题名称
      const validThemes = ['default', 'halloween', 'christmas', 'dark'];
      if (!validThemes.includes(theme)) {
        return res.status(400).json({
          success: false,
          error: '无效的主题名称'
        });
      }
      
      // 保存配置
      const config = {
        theme: theme,
        lastUpdate: new Date().toISOString(),
        updatedBy: 'admin',
        timestamp: timestamp
      };
      
      fs.writeFileSync(THEME_FILE, JSON.stringify(config, null, 2));
      
      return res.status(200).json({
        success: true,
        message: '主题已更新',
        data: config
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
```

### 方案 3：使用 Cloudflare KV（推荐）

如果部署在 Cloudflare，可以使用 KV 存储：

```javascript
// workers/theme.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // GET /api/theme/global
    if (url.pathname === '/api/theme/global' && request.method === 'GET') {
      const theme = await env.THEME_KV.get('global_theme', { type: 'json' });
      return new Response(JSON.stringify({
        success: true,
        data: theme || { theme: 'halloween', lastUpdate: new Date().toISOString() }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // POST /api/admin/update-theme
    if (url.pathname === '/api/admin/update-theme' && request.method === 'POST') {
      const body = await request.json();
      const config = {
        theme: body.theme,
        lastUpdate: new Date().toISOString(),
        updatedBy: 'admin'
      };
      
      await env.THEME_KV.put('global_theme', JSON.stringify(config));
      
      return new Response(JSON.stringify({
        success: true,
        message: '主题已更新',
        data: config
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('Not found', { status: 404 });
  }
};
```

## 部署步骤

### 使用 Vercel Serverless Functions

1. 在项目根目录创建 `api` 文件夹
2. 创建 `api/theme/global.js`
3. 创建 `api/admin/update-theme.js`
4. 部署到 Vercel

### 使用现有 API 服务器

将端点添加到你现有的 `api-gta.antwen.com` 服务器。

## 测试

### 测试获取主题
```bash
curl https://api-gta.antwen.com/api/theme/global
```

### 测试更新主题
```bash
curl -X POST https://api-gta.antwen.com/api/admin/update-theme \
  -H "Content-Type: application/json" \
  -d '{"theme": "halloween", "timestamp": 1696492800000}'
```

## 安全建议

1. **添加身份验证**: 更新主题端点应该需要管理员权限
2. **限流**: 防止恶意请求
3. **验证输入**: 确保主题名称有效
4. **日志记录**: 记录所有主题更改

## 降级方案

如果 API 不可用，系统会自动降级到本地配置文件：
- `/src/config/theme-config.json`

## 优势

✅ **无需重新构建**: 主题更改立即生效  
✅ **无需重新部署**: 通过 API 动态更新  
✅ **全局生效**: 所有访问者立即看到新主题  
✅ **可回滚**: 随时切换回之前的主题  
✅ **有降级方案**: API 失败时使用本地配置
