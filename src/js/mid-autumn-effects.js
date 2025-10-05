// 🌕 GTA 中秋节动态效果

(function() {
    'use strict';

    // 🌕 添加月亮和星星
    function createMoonAndStars() {
        // 创建大月亮
        const moon = document.createElement('div');
        moon.textContent = '🌕';
        moon.style.cssText = `
            position: fixed;
            top: 50px;
            right: 100px;
            font-size: 80px;
            opacity: 0.6;
            pointer-events: none;
            z-index: 9998;
            animation: moonGlow 4s ease-in-out infinite;
        `;
        document.body.appendChild(moon);

        // 创建星星
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.textContent = '⭐';
            const size = 15 + Math.random() * 15;
            const left = Math.random() * 100;
            const top = Math.random() * 50;
            const delay = Math.random() * 3;
            
            star.style.cssText = `
                position: fixed;
                font-size: ${size}px;
                left: ${left}%;
                top: ${top}%;
                opacity: 0.4;
                pointer-events: none;
                z-index: 9997;
                animation: starTwinkle 2s ease-in-out ${delay}s infinite;
            `;
            document.body.appendChild(star);
        }
    }

    // 🌕 添加月饼和兔子装饰
    function addMidAutumnDecorations() {
        // 月饼（左上角）
        const mooncake = document.createElement('div');
        mooncake.textContent = '🥮';
        mooncake.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: rotate360 10s linear infinite;
        `;
        document.body.appendChild(mooncake);

        // 兔子（左下角）
        const rabbit = document.createElement('div');
        rabbit.textContent = '🐰';
        rabbit.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: bounce 2s ease-in-out infinite;
        `;
        document.body.appendChild(rabbit);

        // 灯笼（右下角）
        const lantern = document.createElement('div');
        lantern.textContent = '🏮';
        lantern.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: swing 3s ease-in-out infinite;
        `;
        document.body.appendChild(lantern);
    }

    // 🌕 添加欢迎消息
    function showMidAutumnWelcome() {
        if (sessionStorage.getItem('midautumn_welcome_shown')) {
            return;
        }

        const welcome = document.createElement('div');
        welcome.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(26, 26, 62, 0.98) 0%, rgba(30, 30, 50, 0.98) 100%);
            border: 3px solid #ffd700;
            border-radius: 15px;
            padding: 30px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
            animation: fadeIn 0.5s ease-in-out;
        `;

        welcome.innerHTML = `
            <h2 style="color: #ffd700; margin: 0 0 15px 0; font-size: 28px; text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);">
                🌕 中秋快乐！🥮
            </h2>
            <p style="color: #f5f5dc; font-size: 16px; margin: 0 0 10px 0; line-height: 1.5;">
                月圆人团圆，祝你中秋愉快！
            </p>
            <p style="color: #f5f5dc; font-size: 14px; margin: 0 0 20px 0;">
                🐰 玉兔送福，花好月圆 🏮
            </p>
            <button id="midautumn-welcome-close" style="
                padding: 10px 30px;
                background: linear-gradient(135deg, #ffd700 0%, #c0c0c0 100%);
                border: 2px solid #ffd700;
                border-radius: 25px;
                color: #1a1a3e;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            " onmouseover="this.style.background='linear-gradient(135deg, #ffed4e 0%, #e0e0e0 100%)'; this.style.boxShadow='0 0 30px rgba(255, 215, 0, 0.8)';" onmouseout="this.style.background='linear-gradient(135deg, #ffd700 0%, #c0c0c0 100%)'; this.style.boxShadow='0 0 20px rgba(255, 215, 0, 0.5)';">
                开始游戏！
            </button>
        `;

        document.body.appendChild(welcome);

        document.getElementById('midautumn-welcome-close').addEventListener('click', function() {
            welcome.style.animation = 'fadeOut 0.5s ease-in-out';
            setTimeout(() => welcome.remove(), 500);
            sessionStorage.setItem('midautumn_welcome_shown', 'true');
        });

        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.style.animation = 'fadeOut 0.5s ease-in-out';
                setTimeout(() => welcome.remove(), 500);
                sessionStorage.setItem('midautumn_welcome_shown', 'true');
            }
        }, 5000);
    }

    // 🌕 添加 CSS 动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes moonGlow {
            0%, 100% {
                filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.6));
                transform: scale(1);
            }
            50% {
                filter: drop-shadow(0 0 40px rgba(255, 215, 0, 0.9));
                transform: scale(1.05);
            }
        }

        @keyframes starTwinkle {
            0%, 100% {
                opacity: 0.4;
                transform: scale(1);
            }
            50% {
                opacity: 0.8;
                transform: scale(1.2);
            }
        }

        @keyframes rotate360 {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        @keyframes swing {
            0%, 100% {
                transform: rotate(0deg);
            }
            25% {
                transform: rotate(-10deg);
            }
            75% {
                transform: rotate(10deg);
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    `;
    document.head.appendChild(style);

    // 🌕 初始化所有效果
    function initMidAutumnEffects() {
        createMoonAndStars();
        addMidAutumnDecorations();
        setTimeout(showMidAutumnWelcome, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMidAutumnEffects);
    } else {
        initMidAutumnEffects();
    }

    console.log('🌕 中秋节主题已激活！');
})();
