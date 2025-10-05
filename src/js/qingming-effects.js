// 🌿 GTA 清明节动态效果
(function() {
    'use strict';
    const decorations = [
        {emoji: '🌿', pos: 'top: 20px; left: 20px;'},
        {emoji: '🌸', pos: 'top: 20px; right: 20px;'},
        {emoji: '🦋', pos: 'bottom: 20px; left: 20px;'},
        {emoji: '☁️', pos: 'bottom: 20px; right: 20px;'}
    ];
    decorations.forEach(d => {
        const el = document.createElement('div');
        el.textContent = d.emoji;
        el.style.cssText = `position: fixed; ${d.pos} font-size: 40px; opacity: 0.4; pointer-events: none; z-index: 9998; animation: float 3s ease-in-out infinite;`;
        document.body.appendChild(el);
    });
    const style = document.createElement('style');
    style.textContent = `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`;
    document.head.appendChild(style);
    console.log('🌿 清明节主题已激活！');
})();
