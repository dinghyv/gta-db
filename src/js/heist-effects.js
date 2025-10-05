// 💰 GTA 抢劫月动态效果

(function() {
    'use strict';

    // 💰 添加钱和钻石掉落效果
    function createMoneyRain() {
        const container = document.createElement('div');
        container.className = 'heist-money-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        
        // 钱和钻石的 emoji
        const items = ['💵', '💎', '💰', '💸'];
        
        // 创建 15-20 个掉落物
        const count = 15 + Math.floor(Math.random() * 6);
        for (let i = 0; i < count; i++) {
            const item = document.createElement('div');
            // 随机选择钱或钻石
            item.textContent = items[Math.floor(Math.random() * items.length)];
            
            const size = 30 + Math.random() * 25;
            const duration = 6 + Math.random() * 6;
            const delay = Math.random() * 3;
            
            item.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                left: ${Math.random() * 100}%;
                top: -50px;
                animation: moneyFall ${duration}s linear ${delay}s infinite;
                opacity: 0.8;
            `;
            container.appendChild(item);
        }
        
        document.body.appendChild(container);
        
        // 10秒后移除特效
        setTimeout(() => {
            container.style.transition = 'opacity 1s ease-out';
            container.style.opacity = '0';
            setTimeout(() => {
                container.remove();
            }, 1000);
        }, 10000);
    }


    // 💰 简单的欢迎提示
    function showHeistWelcome() {
        console.log('💰 抢劫月主题已激活 - 钱和钻石掉落特效！');
    }


    // 💰 初始化效果
    function initHeistEffects() {
        createMoneyRain();
        showHeistWelcome();
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeistEffects);
    } else {
        initHeistEffects();
    }

    console.log('💰 抢劫月主题已激活！');
})();
