// 🐉 GTA 端午节动态效果

(function() {
    'use strict';

    // 🐉 添加龙舟划过效果
    function createDragonBoat() {
        function addBoat() {
            const boat = document.createElement('div');
            boat.textContent = '🐉';
            boat.style.cssText = `
                position: fixed;
                font-size: 50px;
                left: -100px;
                top: ${20 + Math.random() * 60}%;
                opacity: 0.6;
                pointer-events: none;
                z-index: 9999;
                animation: boatMove 15s linear forwards;
            `;
            document.body.appendChild(boat);
            
            setTimeout(() => boat.remove(), 15000);
        }
        
        addBoat();
        setInterval(() => addBoat(), 20000);
    }

    // 🐉 添加粽子飘落效果
    function createZongziRain() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 10; i++) {
            const zongzi = document.createElement('div');
            zongzi.textContent = '🍙';
            
            const size = 25 + Math.random() * 20;
            const duration = 8 + Math.random() * 6;
            const delay = Math.random() * 5;
            
            zongzi.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                left: ${Math.random() * 100}%;
                top: -50px;
                animation: fall ${duration}s linear ${delay}s infinite;
                opacity: 0.7;
            `;
            container.appendChild(zongzi);
        }
        
        document.body.appendChild(container);
    }

    // 🐉 添加端午装饰
    function addDragonBoatDecorations() {
        // 龙头（左上角）
        const dragon = document.createElement('div');
        dragon.textContent = '🐲';
        dragon.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: dragonBreathe 3s ease-in-out infinite;
        `;
        document.body.appendChild(dragon);

        // 粽子（右上角）
        const zongzi = document.createElement('div');
        zongzi.textContent = '🍙';
        zongzi.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: rotate360 10s linear infinite;
        `;
        document.body.appendChild(zongzi);

        // 竹叶（左下角）
        const bamboo = document.createElement('div');
        bamboo.textContent = '🎋';
        bamboo.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: sway 4s ease-in-out infinite;
        `;
        document.body.appendChild(bamboo);

        // 水波（右下角）
        const wave = document.createElement('div');
        wave.textContent = '🌊';
        wave.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 9998;
            animation: wave 2s ease-in-out infinite;
        `;
        document.body.appendChild(wave);
    }

    // 🐉 添加欢迎消息
    function showDragonBoatWelcome() {
        if (sessionStorage.getItem('dragonboat_welcome_shown')) {
            return;
        }

        const welcome = document.createElement('div');
        welcome.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(0, 168, 107, 0.98) 0%, rgba(74, 124, 89, 0.98) 100%);
            border: 3px solid #1e90ff;
            border-radius: 15px;
            padding: 30px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 50px rgba(30, 144, 255, 0.5);
            animation: fadeIn 0.5s ease-in-out;
        `;

        welcome.innerHTML = `
            <h2 style="color: #1e90ff; margin: 0 0 15px 0; font-size: 28px; text-shadow: 0 0 20px rgba(30, 144, 255, 0.8);">
                🐉 端午安康！🍙
            </h2>
            <p style="color: #fff; font-size: 16px; margin: 0 0 10px 0; line-height: 1.5;">
                龙舟竞渡，粽叶飘香！
            </p>
            <p style="color: #fff; font-size: 14px; margin: 0 0 20px 0;">
                🎋 祝你端午节快乐 🌊
            </p>
            <button id="dragonboat-welcome-close" style="
                padding: 10px 30px;
                background: linear-gradient(135deg, #00a86b 0%, #4a7c59 100%);
                border: 2px solid #1e90ff;
                border-radius: 25px;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 0 20px rgba(30, 144, 255, 0.5);
            " onmouseover="this.style.background='linear-gradient(135deg, #00c87f 0%, #1e90ff 100%)'; this.style.boxShadow='0 0 30px rgba(30, 144, 255, 0.8)';" onmouseout="this.style.background='linear-gradient(135deg, #00a86b 0%, #4a7c59 100%)'; this.style.boxShadow='0 0 20px rgba(30, 144, 255, 0.5)';">
                开始游戏！
            </button>
        `;

        document.body.appendChild(welcome);

        document.getElementById('dragonboat-welcome-close').addEventListener('click', function() {
            welcome.style.animation = 'fadeOut 0.5s ease-in-out';
            setTimeout(() => welcome.remove(), 500);
            sessionStorage.setItem('dragonboat_welcome_shown', 'true');
        });

        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.style.animation = 'fadeOut 0.5s ease-in-out';
                setTimeout(() => welcome.remove(), 500);
                sessionStorage.setItem('dragonboat_welcome_shown', 'true');
            }
        }, 5000);
    }

    // 🐉 添加 CSS 动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes boatMove {
            from {
                left: -100px;
            }
            to {
                left: calc(100% + 100px);
            }
        }

        @keyframes fall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.7;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes dragonBreathe {
            0%, 100% {
                filter: drop-shadow(0 0 10px rgba(0, 168, 107, 0.5));
                transform: scale(1);
            }
            50% {
                filter: drop-shadow(0 0 20px rgba(30, 144, 255, 0.8));
                transform: scale(1.1);
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

        @keyframes sway {
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

        @keyframes wave {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
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

    // 🐉 初始化所有效果
    function initDragonBoatEffects() {
        createDragonBoat();
        createZongziRain();
        addDragonBoatDecorations();
        setTimeout(showDragonBoatWelcome, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDragonBoatEffects);
    } else {
        initDragonBoatEffects();
    }

    console.log('🐉 端午节主题已激活！');
})();
