// 🎄 GTA 圣诞节动态效果

(function() {
    'use strict';

    // 🎄 添加雪花飘落效果
    function createSnowfall() {
        const container = document.createElement('div');
        container.className = 'christmas-snow-container';
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
        
        // 创建 20-30 片雪花
        const count = 20 + Math.floor(Math.random() * 11);
        for (let i = 0; i < count; i++) {
            const snowflake = document.createElement('div');
            snowflake.textContent = '❄️';
            
            const size = 15 + Math.random() * 20;
            const duration = 10 + Math.random() * 10;
            const delay = Math.random() * 5;
            const startX = Math.random() * 100;
            
            snowflake.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                left: ${startX}%;
                top: -50px;
                animation: snowfall ${duration}s linear ${delay}s infinite;
                opacity: 0.8;
            `;
            container.appendChild(snowflake);
        }
        
        document.body.appendChild(container);
    }

    // 🎄 添加圣诞装饰
    function addChristmasDecorations() {
        // 添加圣诞树（左上角）
        const tree = document.createElement('div');
        tree.textContent = '🎄';
        tree.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: treeGlow 3s ease-in-out infinite;
        `;
        document.body.appendChild(tree);

        // 添加圣诞老人（右上角）
        const santa = document.createElement('div');
        santa.textContent = '🎅';
        santa.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: santaWave 2s ease-in-out infinite;
        `;
        document.body.appendChild(santa);

        // 添加礼物（左下角）
        const gift = document.createElement('div');
        gift.textContent = '🎁';
        gift.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            font-size: 35px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
        `;
        document.body.appendChild(gift);

        // 添加铃铛（右下角）
        const bell = document.createElement('div');
        bell.textContent = '🔔';
        bell.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 35px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: bellRing 1s ease-in-out infinite;
        `;
        document.body.appendChild(bell);
    }

    // 🎄 添加欢迎消息
    function showChristmasWelcome() {
        // 检查是否已经显示过
        if (sessionStorage.getItem('christmas_welcome_shown')) {
            return;
        }

        const welcome = document.createElement('div');
        welcome.className = 'christmas-welcome';
        welcome.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(30, 20, 20, 0.98) 100%);
            border: 3px solid #c41e3a;
            border-radius: 15px;
            padding: 30px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 50px rgba(196, 30, 58, 0.5);
            animation: fadeIn 0.5s ease-in-out;
        `;

        welcome.innerHTML = `
            <h2 style="color: #ffd700; margin: 0 0 15px 0; font-size: 28px; text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);">
                🎄 圣诞快乐！🎅
            </h2>
            <p style="color: #f0f8ff; font-size: 16px; margin: 0 0 10px 0; line-height: 1.5;">
                欢迎来到 GTA 圣诞特别版！
            </p>
            <p style="color: #f0f8ff; font-size: 14px; margin: 0 0 20px 0;">
                ❄️ 祝你节日愉快，游戏愉快！🎁
            </p>
            <button id="christmas-welcome-close" style="
                padding: 10px 30px;
                background: linear-gradient(135deg, #c41e3a 0%, #165b33 100%);
                border: 2px solid #ffd700;
                border-radius: 25px;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 0 20px rgba(196, 30, 58, 0.5);
            " onmouseover="this.style.background='linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)'; this.style.color='#000'; this.style.boxShadow='0 0 30px rgba(255, 215, 0, 0.8)';" onmouseout="this.style.background='linear-gradient(135deg, #c41e3a 0%, #165b33 100%)'; this.style.color='#fff'; this.style.boxShadow='0 0 20px rgba(196, 30, 58, 0.5)';">
                开始游戏！
            </button>
        `;

        document.body.appendChild(welcome);

        // 添加关闭事件
        document.getElementById('christmas-welcome-close').addEventListener('click', function() {
            welcome.style.animation = 'fadeOut 0.5s ease-in-out';
            setTimeout(() => {
                welcome.remove();
            }, 500);
            sessionStorage.setItem('christmas_welcome_shown', 'true');
        });

        // 5秒后自动关闭
        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.style.animation = 'fadeOut 0.5s ease-in-out';
                setTimeout(() => {
                    welcome.remove();
                }, 500);
                sessionStorage.setItem('christmas_welcome_shown', 'true');
            }
        }, 5000);
    }

    // 🎄 添加 CSS 动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes snowfall {
            0% {
                transform: translateY(-100vh) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(100vh) translateX(100px) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes treeGlow {
            0%, 100% {
                filter: drop-shadow(0 0 10px rgba(22, 91, 51, 0.5));
            }
            50% {
                filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
            }
        }

        @keyframes santaWave {
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

        @keyframes bellRing {
            0%, 100% {
                transform: rotate(0deg);
            }
            25% {
                transform: rotate(-15deg);
            }
            75% {
                transform: rotate(15deg);
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

    // 🎄 初始化所有效果
    function initChristmasEffects() {
        createSnowfall();
        addChristmasDecorations();
        
        // 延迟显示欢迎消息
        setTimeout(showChristmasWelcome, 500);
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChristmasEffects);
    } else {
        initChristmasEffects();
    }

    console.log('🎄 圣诞节主题已激活！');
})();
