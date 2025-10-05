# 🔐 JSON 数据加密说明

## 概述

车辆数据库已加密，防止直接查看和复制。使用简单的 Base64 + XOR 加密。

## 📊 加密效果

| 项目 | 原始 JSON | 加密后 |
|------|----------|--------|
| **文件大小** | 3.12 MB | 4.50 MB |
| **可读性** | ✅ 可直接查看 | ❌ 乱码 |
| **可复制性** | ✅ 可直接复制 | ❌ 需要解密 |

## 🔧 使用方法

### 1. 加密数据

当你更新 `vehicles_database_antwen.json` 后：

```bash
npm run encrypt
```

这会生成：
- `src/data/vehicles_database_encrypted.json` - 加密后的数据
- `vehicles/decrypt.js` - 解密脚本

### 2. 构建项目

```bash
npm run build
```

### 3. 预览

```bash
npm run preview
```

## 🔑 加密原理

1. **Base64 编码** - 将 JSON 转为 Base64
2. **XOR 混淆** - 使用密钥进行 XOR 运算
3. **二次 Base64** - 再次 Base64 编码

## 📝 更新数据流程

1. 编辑 `src/data/vehicles_database_antwen.json`
2. 运行 `npm run encrypt` 加密数据
3. 修改 `vehicles/index.html` 中的 `CACHE_VERSION`（强制用户更新缓存）
4. 运行 `npm run build` 构建项目
5. 部署 `dist/` 目录

## 🛡️ 安全性说明

**注意**：这是**前端加密**，只能防止普通用户查看，专业人士仍可破解。

- ✅ 防止普通用户直接查看 JSON
- ✅ 防止简单的复制粘贴
- ✅ 增加逆向工程难度
- ❌ 无法完全防止破解（前端代码都可见）

## 🔄 修改加密密钥

如果你想修改密钥，编辑 `scripts/encrypt-json.js`：

```javascript
const SECRET_KEY = 'your-new-secret-key';
```

然后重新加密：

```bash
npm run encrypt
npm run build
```

## 🗑️ 清除用户缓存

如果用户遇到问题，可以在浏览器控制台运行：

```javascript
localStorage.removeItem('vehicles_database_cache');
localStorage.removeItem('vehicles_database_version');
location.reload();
```

## 📂 文件结构

```
gta-db/
├── src/data/
│   ├── vehicles_database_antwen.json      # 原始数据（保留）
│   └── vehicles_database_encrypted.json   # 加密数据（使用）
├── vehicles/
│   ├── index.html                         # 主页面
│   └── decrypt.js                         # 解密脚本
└── scripts/
    └── encrypt-json.js                    # 加密脚本
```

## ⚡ 性能影响

- **首次加载**：需要解密，增加约 50-100ms
- **后续加载**：使用缓存，无影响
- **文件大小**：增加约 44%（3.12 MB → 4.50 MB）

## 💡 进一步优化建议

1. **服务器端加密** - 使用后端 API 提供数据
2. **分片加载** - 按需加载车辆数据
3. **WebAssembly** - 使用 WASM 进行更强的加密
