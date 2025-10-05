// 基本的前端保护（可选，不推荐使用）
// 注意：这些措施只能阻止普通用户，专业人士仍可绕过

(function() {
    'use strict';
    
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 禁用常见的开发者工具快捷键
    document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
            (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
    });
    
    // 检测开发者工具是否打开
    const devtools = /./;
    devtools.toString = function() {
        this.opened = true;
    };
    
    setInterval(function() {
        console.log('%c', devtools);
        if (devtools.opened) {
            // 可以在这里添加警告或重定向
            // window.location.href = 'about:blank';
        }
        devtools.opened = false;
    }, 1000);
    
    // 添加版权水印
    console.log('%c⚠️ 警告', 'color: red; font-size: 20px; font-weight: bold;');
    console.log('%c此网站代码写的一坨屎，等我美化一下公布。', 'font-size: 14px;');
    console.log('%cCopyright © 2025 dinghyv. All rights reserved.', 'color: gray;');
})();
