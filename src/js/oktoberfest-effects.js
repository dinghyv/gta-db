// 🍺 GTA 啤酒节动态效果
(function() {
    'use strict';
    
    // 🍺 添加装饰
    const decorations = [
        {emoji: '🍺', pos: 'top: 20px; left: 20px;'},
        {emoji: '🥨', pos: 'top: 20px; right: 20px;'},
        {emoji: '🎪', pos: 'bottom: 20px; left: 20px;'},
        {emoji: '🎵', pos: 'bottom: 20px; right: 20px;'}
    ];
    decorations.forEach(d => {
        const el = document.createElement('div');
        el.textContent = d.emoji;
        el.style.cssText = `position: fixed; ${d.pos} font-size: 40px; opacity: 0.4; pointer-events: none; z-index: 9998; animation: swing 3s ease-in-out infinite;`;
        document.body.appendChild(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `@keyframes swing { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(10deg); } }`;
    document.head.appendChild(style);
    
    console.log('🍺 啤酒节主题已激活！');
})();
