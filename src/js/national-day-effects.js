// 🇨🇳 GTA 国庆节动态效果

(function() {
    'use strict';

    // 🇨🇳 添加烟花效果
    function createFireworks() {
        const container = document.createElement('div');
        container.className = 'national-fireworks-container';
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
        
        // 创建烟花效果
        function addFirework() {
            const firework = document.createElement('div');
            firework.textContent = '🎆';
            
            const size = 30 + Math.random() * 30;
            const left = Math.random() * 100;
            
            firework.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                left: ${left}%;
                bottom: 0;
                animation: fireworks 2s ease-out forwards;
                opacity: 1;
            `;
            container.appendChild(firework);
            
            // 2秒后移除
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }
        
        // 每隔1-3秒添加一个烟花
        setInterval(() => {
            addFirework();
        }, 1000 + Math.random() * 2000);
        
        document.body.appendChild(container);
    }

    // 🇨🇳 添加国旗装饰
    function addNationalDecorations() {
        // 添加国旗（左上角）
        const flag = document.createElement('div');
        flag.textContent = '🇨🇳';
        flag.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: flagWave 3s ease-in-out infinite;
        `;
        document.body.appendChild(flag);

        // 添加灯笼（右上角）
        const lantern = document.createElement('div');
        lantern.textContent = '🏮';
        lantern.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: lanternSwing 2s ease-in-out infinite;
        `;
        document.body.appendChild(lantern);

        // 添加礼花（左下角）
        const firework1 = document.createElement('div');
        firework1.textContent = '🎆';
        firework1.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            font-size: 35px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
        `;
        document.body.appendChild(firework1);

        // 添加礼花（右下角）
        const firework2 = document.createElement('div');
        firework2.textContent = '🎇';
        firework2.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 35px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
        `;
        document.body.appendChild(firework2);
    }

    // 🇨🇳 添加欢迎消息
    function showNationalDayWelcome() {
        // 检查是否已经显示过
        if (sessionStorage.getItem('national_day_welcome_shown')) {
            return;
        }

        const welcome = document.createElement('div');
        welcome.className = 'national-day-welcome';
        welcome.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(26, 10, 10, 0.98) 0%, rgba(30, 15, 15, 0.98) 100%);
            border: 3px solid #de2910;
            border-radius: 15px;
            padding: 30px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 50px rgba(222, 41, 16, 0.5);
            animation: fadeIn 0.5s ease-in-out;
        `;

        welcome.innerHTML = `
            <h2 style="color: #ffde00; margin: 0 0 15px 0; font-size: 28px; text-shadow: 0 0 20px rgba(255, 222, 0, 0.8);">
                🇨🇳 国庆快乐！🎆
            </h2>
            <p style="color: #fff5cc; font-size: 16px; margin: 0 0 10px 0; line-height: 1.5;">
                祝祖国繁荣昌盛！
            </p>
            <p style="color: #fff5cc; font-size: 14px; margin: 0 0 20px 0;">
                🎇 欢度国庆，游戏愉快！🎆
            </p>
            <button id="national-day-welcome-close" style="
                padding: 10px 30px;
                background: linear-gradient(135deg, #de2910 0%, #9e1c0c 100%);
                border: 2px solid #ffde00;
                border-radius: 25px;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 0 20px rgba(222, 41, 16, 0.5);
            " onmouseover="this.style.background='linear-gradient(135deg, #ff3520 0%, #ffde00 100%)'; this.style.boxShadow='0 0 30px rgba(255, 222, 0, 0.8)';" onmouseout="this.style.background='linear-gradient(135deg, #de2910 0%, #9e1c0c 100%)'; this.style.boxShadow='0 0 20px rgba(222, 41, 16, 0.5)';">
                开始游戏！
            </button>
        `;

        document.body.appendChild(welcome);

        // 添加关闭事件
        document.getElementById('national-day-welcome-close').addEventListener('click', function() {
            welcome.style.animation = 'fadeOut 0.5s ease-in-out';
            setTimeout(() => {
                welcome.remove();
            }, 500);
            sessionStorage.setItem('national_day_welcome_shown', 'true');
        });

        // 5秒后自动关闭
        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.style.animation = 'fadeOut 0.5s ease-in-out';
                setTimeout(() => {
                    welcome.remove();
                }, 500);
                sessionStorage.setItem('national_day_welcome_shown', 'true');
            }
        }, 5000);
    }

    // 🇨🇳 添加 CSS 动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fireworks {
            0% {
                transform: translateY(0) scale(0);
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-200px) scale(1.5);
                opacity: 0;
            }
        }

        @keyframes flagWave {
            0%, 100% {
                transform: rotate(0deg);
            }
            25% {
                transform: rotate(-5deg);
            }
            75% {
                transform: rotate(5deg);
            }
        }

        @keyframes lanternSwing {
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

    // 🇨🇳 初始化所有效果
    function initNationalDayEffects() {
        createFireworks();
        addNationalDecorations();
        
        // 延迟显示欢迎消息
        setTimeout(showNationalDayWelcome, 500);
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNationalDayEffects);
    } else {
        initNationalDayEffects();
    }

    console.log('🇨🇳 国庆节主题已激活！');
})();
