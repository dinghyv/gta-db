# GTA地图添加物品完整模板

## 概述
基于对 `los-santos-map.html` 的分析，以下是添加新物品类型的完整流程和模板。

## 1. 数据结构定义

### 1.1 在 `itemData` 对象中添加新类型
```javascript
// 在 los-santos-map.html 的 itemData 对象中添加新类型
const itemData = {
    // ... 现有类型
    your_new_item_type: [],  // 添加你的新物品类型
};
```

### 1.2 数据文件格式

#### 方式一：添加到 `zones.json`
```json
{
  "your_new_item_type": [
    {"name": "物品名称1", "x": 1234.567, "y": -2345.678},
    {"name": "物品名称2", "x": 2345.678, "y": -3456.789}
  ]
}
```

#### 方式二：添加到 `common_collectibles.json`
```json
{
  "your_new_item_type": [
    [1234.567, -2345.678, "物品名称1"],
    [2345.678, -3456.789, "物品名称2"]
  ]
}
```

## 2. 图标配置

### 2.1 添加图标路径
```javascript
// 在 itemIcons 对象中添加图标
const itemIcons = {
    // ... 现有图标
    your_new_item_type: './src/assets/your_icon.svg',  // 添加你的图标
};
```

### 2.2 准备图标文件
- 将图标文件放在 `src/assets/` 目录下
- 推荐使用 SVG 格式，尺寸 32x32 像素
- 图标应该简洁明了，易于在地图上识别

## 3. 侧边栏配置

### 3.1 添加到侧边栏选项
```javascript
// 在 sidebarItemOptions 数组中添加选项
const sidebarItemOptions = [
    // ... 现有选项
    { value: 'your_new_item_type', text: '🎯 你的物品名称' },
];
```

## 4. 数据加载逻辑

### 4.1 如果使用 `zones.json`
```javascript
// 在 loadItemData() 函数中，数据会自动加载
// 无需额外代码，因为使用了 Object.keys(itemData).forEach 循环
```

### 4.2 如果使用 `common_collectibles.json`
```javascript
// 在 loadItemData() 函数的 itemTypes 数组中添加
const itemTypes = [
    // ... 现有类型
    'your_new_item_type',
];
```

## 5. 点击事件处理

### 5.1 基本点击处理（自动处理）
```javascript
// 基本的点击事件会自动处理，显示物品信息
// 无需额外代码
```

### 5.2 特殊点击处理（如需要）
```javascript
// 如果需要特殊的点击处理，在 checkItemClick 函数中添加
function checkItemClick(clickX, clickY) {
    // ... 现有检查逻辑
    
    if (activeItemTypes.has('your_new_item_type') && itemData.your_new_item_type) {
        const nearbyItem = itemData.your_new_item_type.find((item, index) => {
            const distance = Math.sqrt(
                Math.pow(clickX - item.x, 2) + Math.pow(clickY - item.y, 2)
            );
            return distance < 50; // 50像素范围内
        });
        
        if (nearbyItem) {
            const itemIndex = itemData.your_new_item_type.findIndex(item => 
                item === nearbyItem
            );
            if (itemIndex !== -1) {
                showItemInfo(itemData.your_new_item_type[itemIndex], 'your_new_item_type', itemIndex);
            }
        }
    }
}
```

## 6. 特殊功能（可选）

### 6.1 图片弹窗功能
```javascript
// 如果需要显示图片弹窗，添加类似函数
function showYourItemImage(index) {
    const popup = document.createElement('div');
    popup.className = 'item-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <h3>你的物品名称 ${index + 1}</h3>
                <button id="close-popup" class="close-btn">×</button>
            </div>
            <div class="popup-body">
                <img src="./src/assets/your_item_image.jpg" alt="物品图片" style="max-width: 100%; height: auto;">
                <p>物品描述信息</p>
            </div>
            <div class="popup-footer">
                <button id="hide-item-btn" class="hide-btn">隐藏此标记</button>
            </div>
        </div>
    `;
    
    // 添加事件监听器
    popup.querySelector('#close-popup').addEventListener('click', () => {
        popup.remove();
    });
    
    popup.querySelector('#hide-item-btn').addEventListener('click', () => {
        // 隐藏标记逻辑
        const markers = document.querySelectorAll('.item-marker');
        markers.forEach(marker => {
            const img = marker.querySelector('img');
            if (img && img.src && img.src.includes('your_icon') && marker.dataset.index == index) {
                marker.style.opacity = '0.25';
            }
        });
        popup.remove();
    });
    
    document.body.appendChild(popup);
}
```

### 6.2 在 showItemInfo 中添加特殊处理
```javascript
// 在 showItemInfo 函数中添加特殊处理
function showItemInfo(item, type, index) {
    // ... 现有逻辑
    
    if (type === 'your_new_item_type') {
        // 特殊处理逻辑
        showYourItemImage(index);
        return;
    }
    
    // ... 其他类型处理
}
```

## 7. 完整示例

### 7.1 添加"神秘宝箱"物品类型

#### 步骤1：准备数据
在 `zones.json` 中添加：
```json
{
  "mystery_chests": [
    {"name": "神秘宝箱1", "x": 1000.0, "y": -2000.0},
    {"name": "神秘宝箱2", "x": 2000.0, "y": -3000.0}
  ]
}
```

#### 步骤2：准备图标
- 创建 `src/assets/mystery_chest.svg` 图标文件

#### 步骤3：修改代码
```javascript
// 1. 在 itemData 中添加
const itemData = {
    // ... 现有类型
    mystery_chests: [],
};

// 2. 在 itemIcons 中添加
const itemIcons = {
    // ... 现有图标
    mystery_chests: './src/assets/mystery_chest.svg',
};

// 3. 在 sidebarItemOptions 中添加
const sidebarItemOptions = [
    // ... 现有选项
    { value: 'mystery_chests', text: '📦 神秘宝箱' },
];
```

## 8. 测试和验证

### 8.1 测试步骤
1. 确保所有文件修改正确
2. 刷新页面
3. 在侧边栏中勾选新物品类型
4. 检查地图上是否显示标记
5. 点击标记测试功能

### 8.2 常见问题
- **标记不显示**：检查数据格式和坐标是否正确
- **图标不显示**：检查图标路径和文件是否存在
- **点击无响应**：检查事件处理逻辑是否正确

## 9. 最佳实践

1. **命名规范**：使用下划线命名法，如 `mystery_chests`
2. **图标设计**：使用简洁的SVG图标，确保在小尺寸下清晰可见
3. **数据格式**：保持与现有数据格式一致
4. **错误处理**：添加适当的错误处理和默认值
5. **性能考虑**：避免在数据加载时阻塞页面渲染

## 10. 扩展功能

### 10.1 动态数据加载
```javascript
// 从API加载数据
async function loadYourItemData() {
    try {
        const response = await fetch('https://api.example.com/your-items');
        const result = await response.json();
        itemData.your_new_item_type = result.data.coordinate;
    } catch (error) {
        console.error('加载数据失败:', error);
        itemData.your_new_item_type = [];
    }
}
```

### 10.2 实时更新
```javascript
// 定期更新数据
setInterval(loadYourItemData, 300000); // 每5分钟更新一次
```

这个模板提供了添加新物品类型的完整流程，从数据结构到用户界面，确保新功能能够无缝集成到现有系统中。
