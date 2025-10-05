// 🎃 GTA 万圣节动态效果

(function() {
    'use strict';

    // 🎃 添加万圣节装饰元素
    function addHalloweenDecorations() {
        // 添加 UFO（替换蝙蝠）
        for (let i = 0; i < 3; i++) {
            const bat = document.createElement('div');
            bat.className = 'halloween-bat';
            bat.textContent = '🛸';
            bat.style.animationDelay = `${i * 5}s`;
            bat.style.top = `${10 + i * 15}%`;
            document.body.appendChild(bat);
        }

        // 添加 UFO（替换幽灵）
        for (let i = 0; i < 2; i++) {
            const ghost = document.createElement('div');
            ghost.className = 'halloween-ghost';
            ghost.textContent = '🛸';
            ghost.style.animationDelay = `${i * 7}s`;
            ghost.style.left = `${20 + i * 40}%`;
            document.body.appendChild(ghost);
        }

        // 添加骷髅头
        const skull = document.createElement('div');
        skull.className = 'halloween-skull';
        skull.textContent = '💀';
        document.body.appendChild(skull);

        // 添加蜘蛛网
        const web = document.createElement('div');
        web.className = 'halloween-web';
        web.textContent = '🕸️';
        document.body.appendChild(web);

        // 添加右上角蜘蛛网
        const web2 = document.createElement('div');
        web2.className = 'halloween-web';
        web2.textContent = '🕸️';
        web2.style.left = 'auto';
        web2.style.right = '0';
        web2.style.transform = 'scaleX(-1)';
        document.body.appendChild(web2);
    }

    // 🎃 随机闪电效果
    function triggerLightning() {
        const lightning = document.createElement('div');
        lightning.className = 'halloween-lightning';
        document.body.appendChild(lightning);
        setTimeout(() => {
            lightning.remove();
        }, 200);
    }

    // 🎃 创建漂浮的万圣节元素
    function createFloatingPumpkins() {
        const halloweenEmojis = [
            '🎃', '👻', '🦇', '💀', '🕷️', 
            '🕸️', '🧙', '🧛', '🧟', '🍬',
            '🛸', '👽', '🌙', '⚰️', '🔮'
        ];
        
        // 确保包含 UFO 和南瓜
        const guaranteedEmojis = ['🎃', '🛸', '🛸'];
        
        const container = document.createElement('div');
        container.className = 'halloween-floating-container';
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
        
        const usedEmojis = [];
        
        // 创建更多元素（12-15个）
        const count = 12 + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.className = 'halloween-float';
            
            // 前3个使用保证的 emoji，其余随机
            let emoji;
            if (i < guaranteedEmojis.length) {
                emoji = guaranteedEmojis[i];
            } else {
                emoji = halloweenEmojis[Math.floor(Math.random() * halloweenEmojis.length)];
            }
            
            element.textContent = emoji;
            usedEmojis.push(emoji);
            
            const size = 30 + Math.random() * 30;
            const duration = 15 + Math.random() * 15;
            const delay = Math.random() * 10;
            
            element.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatingPumpkin ${duration}s linear infinite;
                animation-delay: ${delay}s;
                opacity: ${0.5 + Math.random() * 0.3};
                transform: rotate(${Math.random() * 360}deg);
                will-change: transform;
            `;
            container.appendChild(element);
        }
        
        console.log('🎃 漂浮元素:', usedEmojis.join(' '));
        document.body.appendChild(container);
    }

    // 🎃 添加万圣节欢迎消息
    function showHalloweenWelcome() {
        // 检查是否已经显示过
        if (sessionStorage.getItem('halloween_welcome_shown')) {
            return;
        }
        welcome.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(26, 10, 46, 0.98) 0%, rgba(15, 5, 25, 0.98) 100%);
            border: 3px solid #ff6b00;
            border-radius: 15px;
            padding: 30px;
            z-index: 10000;
            text-align: center;
            box-shadow: 
                0 0 30px rgba(255, 107, 0, 0.6),
                0 0 60px rgba(139, 0, 255, 0.4);
            animation: fadeIn 0.5s ease-in-out;
        `;

        welcome.innerHTML = `
            <h2 style="color: #ff6b00; font-size: 32px; margin: 0 0 15px 0; text-shadow: 0 0 20px rgba(255, 107, 0, 0.8);">
                🎃 万圣节快乐！🎃
            </h2>
            <p style="color: #fff; font-size: 18px; margin: 0 0 20px 0; text-shadow: 0 0 10px rgba(139, 0, 255, 0.5);">
                欢迎来到 GTA 万圣节特别版！
            </p>
            <p style="color: #00ff41; font-size: 14px; margin: 0 0 20px 0;">
                🦇 探索洛圣都的恐怖秘密 👻
            </p>
            <button id="halloween-welcome-close" style="
                padding: 10px 30px;
                background: linear-gradient(135deg, #ff6b00 0%, #8b0000 100%);
                border: 2px solid #8b00ff;
                border-radius: 8px;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 0 15px rgba(255, 107, 0, 0.5);
                transition: all 0.3s ease;
            ">进入</button>
        `;

        document.body.appendChild(welcome);

        // 添加淡入动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);

        // 关闭按钮
        const closeBtn = welcome.querySelector('#halloween-welcome-close');
        closeBtn.addEventListener('click', () => {
            welcome.style.animation = 'fadeOut 0.5s ease-in-out';
            setTimeout(() => {
                welcome.remove();
            }, 500);
            sessionStorage.setItem('halloween_welcome_shown', 'true');
        });

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.boxShadow = '0 0 25px rgba(255, 107, 0, 0.8), 0 0 50px rgba(139, 0, 255, 0.5)';
            closeBtn.style.transform = 'scale(1.1)';
        });

        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.boxShadow = '0 0 15px rgba(255, 107, 0, 0.5)';
            closeBtn.style.transform = 'scale(1)';
        });

        // 添加淡出动画
        style.textContent += `
            @keyframes fadeOut {
                from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
    }

    // 🎃 鼠标点击南瓜效果
    function addClickPumpkinEffect() {
        document.addEventListener('click', (e) => {
            if (Math.random() > 0.7) { // 30% 概率
                const pumpkin = document.createElement('div');
                pumpkin.textContent = '🎃';
                pumpkin.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    font-size: 30px;
                    pointer-events: none;
                    z-index: 9999;
                    animation: pumpkinPop 1s ease-out forwards;
                `;
                document.body.appendChild(pumpkin);

                setTimeout(() => pumpkin.remove(), 1000);
            }
        });

        // 添加动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pumpkinPop {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.2) rotate(180deg);
                }
                100% {
                    transform: scale(0) rotate(360deg) translateY(-100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 🎃 添加标题发光效果（空函数，CSS 已处理）
    function addGlowToTitles() {
        // 标题发光效果已在 CSS 中定义，这里不需要额外处理
    }

    // 🎃 添加导航栏南瓜（空函数，装饰已在其他地方处理）
    function addPumpkinToNav() {
        // 导航栏装饰已在其他地方处理
    }

    // 🎃 初始化万圣节效果
    function initHalloweenTheme() {
        // 等待 DOM 加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        function init() {
            console.log('🎃 万圣节主题已激活！');
            
            // 添加装饰
            addHalloweenDecorations();
            
            // 添加标题发光效果
            addGlowToTitles();
            
            // 添加导航栏南瓜
            setTimeout(addPumpkinToNav, 500);
            
            // 显示欢迎消息
            setTimeout(showHalloweenWelcome, 1000);
            
            // 添加点击效果
            addClickPumpkinEffect();
            
            // 随机闪电效果
            setInterval(() => {
                if (Math.random() > 0.95) { // 5% 概率
                    triggerLightning();
                }
            }, 5000);

            // 定期更新标题发光效果（处理动态添加的元素）
            setInterval(addGlowToTitles, 3000);
        }
    }

    // 🎃 启动！
    initHalloweenTheme();

})();
