// 🎨 GTA 主题管理系统

(function() {
    'use strict';

    const THEME_STORAGE_KEY = 'gta_theme_preference';

    // 可用主题配置
    const THEMES = {
        default: {
            name: '默认主题',
            css: null,
            js: null,
            description: 'GTA 经典橙色主题'
        },
        halloween: {
            name: '万圣节主题',
            css: '/src/css/halloween-theme.css',
            js: '/src/js/halloween-effects.js',
            description: '🎃 万圣节特别版 - 恐怖氛围'
        },
        christmas: {
            name: '圣诞节主题',
            css: '/src/css/christmas-theme.css',
            js: '/src/js/christmas-effects.js',
            description: '🎄 圣诞节特别版 - 即将推出'
        },
        dark: {
            name: '暗黑主题',
            css: '/src/css/dark-theme.css',
            js: null,
            description: '🌙 纯黑暗模式 - 即将推出'
        }
    };

    // 全局主题配置（从 API 获取）
    let globalThemeConfig = null;
    // 使用 Workers 默认域名（部署后替换为自定义域名）
    const API_BASE = 'https://theme-api.antwen.com';

    // 获取全局主题配置（从 API）
    async function fetchGlobalTheme() {
        try {
            // 尝试从 API 获取
            const response = await fetch(`${API_BASE}/gta-db/api/theme/global?t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data) {
                    globalThemeConfig = data.data;
                    console.log('🎨 已从 API 获取全局主题:', globalThemeConfig.theme);
                    return globalThemeConfig.theme;
                }
            }
        } catch (error) {
            console.warn('⚠️ 无法从 API 获取主题配置，尝试本地配置');
        }

        // 降级：尝试从本地配置文件获取
        try {
            const response = await fetch('/src/config/theme-config.json?t=' + Date.now());
            if (response.ok) {
                globalThemeConfig = await response.json();
                return globalThemeConfig.globalTheme || 'default';
            }
        } catch (error) {
            console.warn('⚠️ 无法获取本地主题配置');
        }

        return 'default';
    }

    // 更新全局主题配置（通过 API）
    async function updateGlobalTheme(themeName) {
        try {
            const response = await fetch(`${API_BASE}/gta-db/api/admin/update-theme`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    theme: themeName,
                    timestamp: Date.now()
                })
            });

            if (response.ok) {
                const data = await response.json();
                return { success: true, data };
            } else {
                throw new Error('API 返回错误');
            }
        } catch (error) {
            console.error('❌ 更新全局主题失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 获取当前主题（优先使用用户设置，否则使用全局配置）
    function getCurrentTheme() {
        // 如果用户手动设置过主题，使用用户设置
        const userTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (userTheme) {
            return userTheme;
        }
        
        // 否则使用全局配置（如果已加载）
        if (globalThemeConfig && globalThemeConfig.theme) {
            return globalThemeConfig.theme;
        }
        
        // 默认主题
        return 'default';
    }

    // 设置主题
    function setTheme(themeName) {
        const theme = THEMES[themeName];
        if (!theme) {
            console.error('主题不存在:', themeName);
            return;
        }

        // 保存到 localStorage
        localStorage.setItem(THEME_STORAGE_KEY, themeName);

        // 移除所有主题样式和脚本
        removeAllThemes();

        // 如果不是默认主题，加载新主题
        if (themeName !== 'default') {
            loadTheme(theme);
        }

        console.log('✅ 主题已切换:', theme.name);
        
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: themeName } 
        }));
    }

    // 移除所有主题
    function removeAllThemes() {
        // 移除主题 CSS
        document.querySelectorAll('link[data-theme-css]').forEach(link => link.remove());
        
        document.querySelectorAll('script[data-theme-js]').forEach(script => script.remove());
    }

    // 加载主题
    function loadTheme(theme) {
        // 生成版本号（使用时间戳强制刷新）
        const version = Date.now();
        
        // 加载 CSS
        if (theme.css) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `${theme.css}?v=${version}`;
            link.setAttribute('data-theme-css', 'true');
            document.head.appendChild(link);
        }

        // 加载 JS
        if (theme.js) {
            const script = document.createElement('script');
            script.src = `${theme.js}?v=${version}`;
            script.setAttribute('data-theme-js', 'true');
            document.head.appendChild(script);
        }
    }

    // 自动应用保存的主题
    async function applyStoredTheme() {
        await fetchGlobalTheme();
        
        const currentTheme = getCurrentTheme();
        if (currentTheme !== 'default') {
            const theme = THEMES[currentTheme];
            if (theme) {
                loadTheme(theme);
            }
        }
    }

    // 导出到全局
    window.ThemeManager = {
        themes: THEMES,
        getCurrentTheme: getCurrentTheme,
        setTheme: setTheme,
        applyStoredTheme: applyStoredTheme,
        updateGlobalTheme: updateGlobalTheme,
        fetchGlobalTheme: fetchGlobalTheme
    };

    // 页面加载时自动应用主题
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyStoredTheme);
    } else {
        applyStoredTheme();
    }

})();
