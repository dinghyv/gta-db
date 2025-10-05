// ☢️ GTA 末日动态效果
(function() {
    'use strict';
    
    // ☢️ 添加闪烁警报效果
    function createAlertFlash() {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, transparent 0%, #ff0000 50%, transparent 100%);
            pointer-events: none;
            z-index: 10000;
            animation: alertBlink 1.5s ease-in-out infinite;
        `;
        document.body.appendChild(alert);
    }
    
    // ☢️ 添加装饰
    const decorations = [
        {emoji: '☢️', pos: 'top: 20px; left: 20px;'},
        {emoji: '💀', pos: 'top: 20px; right: 20px;'},
        {emoji: '⚠️', pos: 'bottom: 20px; left: 20px;'},
        {emoji: '🔥', pos: 'bottom: 20px; right: 20px;'}
    ];
    decorations.forEach(d => {
        const el = document.createElement('div');
        el.textContent = d.emoji;
        el.style.cssText = `position: fixed; ${d.pos} font-size: 40px; opacity: 0.4; pointer-events: none; z-index: 9998; animation: shake 0.5s ease-in-out infinite;`;
        document.body.appendChild(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes alertBlink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    `;
    document.head.appendChild(style);
    
    createAlertFlash();
    console.log('☢️ 末日主题已激活！');
})();
