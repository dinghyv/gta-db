// 🇺🇸 GTA 美国独立日动态效果
(function() {
    'use strict';
    
    // 🇺🇸 添加烟花效果
    function createFireworks() {
        function addFirework() {
            const firework = document.createElement('div');
            firework.textContent = ['🎆', '🎇', '✨', '💥'][Math.floor(Math.random() * 4)];
            const size = 30 + Math.random() * 30;
            const left = Math.random() * 100;
            
            firework.style.cssText = `position: fixed; font-size: ${size}px; left: ${left}%; bottom: 0; animation: fireworksUp 2s ease-out forwards; opacity: 1; pointer-events: none; z-index: 9999;`;
            document.body.appendChild(firework);
            setTimeout(() => firework.remove(), 2000);
        }
        setInterval(() => addFirework(), 1500);
    }
    
    // 🇺🇸 添加装饰
    const decorations = [
        {emoji: '🇺🇸', pos: 'top: 20px; left: 20px;'},
        {emoji: '🗽', pos: 'top: 20px; right: 20px;'},
        {emoji: '🦅', pos: 'bottom: 20px; left: 20px;'},
        {emoji: '🎆', pos: 'bottom: 20px; right: 20px;'}
    ];
    decorations.forEach(d => {
        const el = document.createElement('div');
        el.textContent = d.emoji;
        el.style.cssText = `position: fixed; ${d.pos} font-size: 40px; opacity: 0.4; pointer-events: none; z-index: 9998; animation: pulse 2s ease-in-out infinite;`;
        document.body.appendChild(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fireworksUp { 0% { transform: translateY(0) scale(0); opacity: 1; } 50% { opacity: 1; } 100% { transform: translateY(-300px) scale(1.5); opacity: 0; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
    `;
    document.head.appendChild(style);
    
    createFireworks();
    console.log('🇺🇸 美国独立日主题已激活！');
})();
