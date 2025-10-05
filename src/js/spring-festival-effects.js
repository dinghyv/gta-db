// 🧧 GTA 农历新年动态效果

(function() {
    'use strict';

    // 🧧 添加鞭炮和烟花效果
    function createFirecrackers() {
        const container = document.createElement('div');
        container.className = 'spring-fireworks-container';
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
        
        function addFirework() {
            const firework = document.createElement('div');
            firework.textContent = ['🎆', '🎇', '✨'][Math.floor(Math.random() * 3)];
            
            const size = 30 + Math.random() * 30;
            const left = Math.random() * 100;
            
            firework.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                left: ${left}%;
                bottom: 0;
                animation: fireworksUp 2s ease-out forwards;
                opacity: 1;
            `;
            container.appendChild(firework);
            
            setTimeout(() => firework.remove(), 2000);
        }
        
        setInterval(() => addFirework(), 1500);
        document.body.appendChild(container);
    }

    // 🧧 添加春节装饰
    function addSpringFestivalDecorations() {
        // 红包（左上角）
        const hongbao = document.createElement('div');
        hongbao.textContent = '🧧';
        hongbao.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: pulse 2s ease-in-out infinite;
        `;
        document.body.appendChild(hongbao);

        // 灯笼（右上角）
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
            animation: swing 3s ease-in-out infinite;
        `;
        document.body.appendChild(lantern);

        // 鞭炮（左下角）
        const firecracker = document.createElement('div');
        firecracker.textContent = '🧨';
        firecracker.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: shake 0.5s ease-in-out infinite;
        `;
        document.body.appendChild(firecracker);

        // 福字（右下角）
        const fu = document.createElement('div');
        fu.textContent = '🀄';
        fu.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: rotate360 10s linear infinite;
        `;
        document.body.appendChild(fu);
    }

    // 🧧 添加欢迎消息
    function showSpringFestivalWelcome() {
        if (sessionStorage.getItem('springfestival_welcome_shown')) {
            return;
        }

        const welcome = document.createElement('div');
        welcome.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(200, 16, 46, 0.98) 0%, rgba(139, 0, 0, 0.98) 100%);
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
                🧧 新年快乐！🎆
            </h2>
            <p style="color: #fff; font-size: 16px; margin: 0 0 10px 0; line-height: 1.5;">
                恭喜发财，万事如意！
            </p>
            <p style="color: #fff; font-size: 14px; margin: 0 0 20px 0;">
                🏮 龙年大吉，阖家欢乐 🧨
            </p>
            <button id="springfestival-welcome-close" style="
                padding: 10px 30px;
                background: linear-gradient(135deg, #ff0000 0%, #c8102e 100%);
                border: 2px solid #ffd700;
                border-radius: 25px;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            " onmouseover="this.style.background='linear-gradient(135deg, #ff3333 0%, #ffd700 100%)'; this.style.boxShadow='0 0 30px rgba(255, 215, 0, 0.8)';" onmouseout="this.style.background='linear-gradient(135deg, #ff0000 0%, #c8102e 100%)'; this.style.boxShadow='0 0 20px rgba(255, 215, 0, 0.5)';">
                开始游戏！
            </button>
        `;

        document.body.appendChild(welcome);

        document.getElementById('springfestival-welcome-close').addEventListener('click', function() {
            welcome.style.animation = 'fadeOut 0.5s ease-in-out';
            setTimeout(() => welcome.remove(), 500);
            sessionStorage.setItem('springfestival_welcome_shown', 'true');
        });

        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.style.animation = 'fadeOut 0.5s ease-in-out';
                setTimeout(() => welcome.remove(), 500);
                sessionStorage.setItem('springfestival_welcome_shown', 'true');
            }
        }, 5000);
    }

    // 🧧 添加 CSS 动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fireworksUp {
            0% {
                transform: translateY(0) scale(0);
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-300px) scale(1.5);
                opacity: 0;
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
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

        @keyframes shake {
            0%, 100% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-5px);
            }
            75% {
                transform: translateX(5px);
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

    // 🧧 初始化所有效果
    function initSpringFestivalEffects() {
        createFirecrackers();
        addSpringFestivalDecorations();
        setTimeout(showSpringFestivalWelcome, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSpringFestivalEffects);
    } else {
        initSpringFestivalEffects();
    }

    console.log('🧧 农历新年主题已激活！');
})();
