// 🎰 GTA 赌场动态效果
(function() {
    'use strict';
    
    // 🎰 添加筹码飘落效果
    function createChipRain() {
        const container = document.createElement('div');
        container.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9998; overflow: hidden;`;
        
        for (let i = 0; i < 10; i++) {
            const chip = document.createElement('div');
            chip.textContent = ['🪙', '💰', '💎', '💵'][Math.floor(Math.random() * 4)];
            const size = 25 + Math.random() * 20;
            const duration = 8 + Math.random() * 6;
            const delay = Math.random() * 5;
            
            chip.style.cssText = `position: absolute; font-size: ${size}px; left: ${Math.random() * 100}%; top: -50px; animation: fall ${duration}s linear ${delay}s infinite; opacity: 0.7;`;
            container.appendChild(chip);
        }
        document.body.appendChild(container);
    }
    
    // 🎰 添加装饰
    const decorations = [
        {emoji: '🎰', pos: 'top: 20px; left: 20px;'},
        {emoji: '🃏', pos: 'top: 20px; right: 20px;'},
        {emoji: '🎲', pos: 'bottom: 20px; left: 20px;'},
        {emoji: '💎', pos: 'bottom: 20px; right: 20px;'}
    ];
    decorations.forEach(d => {
        const el = document.createElement('div');
        el.textContent = d.emoji;
        el.style.cssText = `position: fixed; ${d.pos} font-size: 40px; opacity: 0.4; pointer-events: none; z-index: 9998; animation: pulse 2s ease-in-out infinite;`;
        document.body.appendChild(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall { 0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
    `;
    document.head.appendChild(style);
    
    createChipRain();
    console.log('🎰 赌场主题已激活！');
})();
