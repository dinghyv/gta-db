// 强制在支持的浏览器上阻止手势缩放（iOS 的 gesture events）
        (function preventPinchZoom() {
            // Prevent iOS gesture events
            function stopEvent(e) { e.preventDefault(); }
            try {
                document.addEventListener('gesturestart', stopEvent, { passive: false });
                document.addEventListener('gesturechange', stopEvent, { passive: false });
                document.addEventListener('gestureend', stopEvent, { passive: false });
            } catch (err) {
                // 某些浏览器不支持 gesture* 事件，忽略错误
            }

            // Prevent pinch-zoom via two-finger touchmove
            document.addEventListener('touchstart', function(e) {
                if (e.touches && e.touches.length > 1) {
                    e.preventDefault();
                }
            }, { passive: false });

            document.addEventListener('touchmove', function(e) {
                if (e.touches && e.touches.length > 1) {
                    e.preventDefault();
                }
            }, { passive: false });

            // Prevent double-tap zoom (by blocking very quick successive touchend)
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function(e) {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, { passive: false });

            // Prevent zooming with Ctrl + wheel (desktop/tablet)
            window.addEventListener('wheel', function(e) {
                if (e.ctrlKey) {
                    e.preventDefault();
                }
            }, { passive: false });
        })();


