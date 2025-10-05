/**
 * 🎨 GTA 主题管理 API
 * 域名: theme-api.antwen.com
 */

// CORS 配置
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

// 处理 CORS 预检请求
function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

// 返回 JSON 响应
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: CORS_HEADERS
  });
}

// 获取全局主题配置
async function getGlobalTheme(env) {
  try {
    // 从 KV 存储读取
    const themeData = await env.THEME_KV.get('global_theme', { type: 'json' });
    
    if (themeData) {
      return jsonResponse({
        success: true,
        data: themeData
      });
    }
    
    // 如果没有配置，返回默认主题
    const defaultTheme = {
      theme: 'default',
      lastUpdate: new Date().toISOString(),
      updatedBy: 'system',
      description: '默认主题配置'
    };
    
    // 保存默认配置
    await env.THEME_KV.put('global_theme', JSON.stringify(defaultTheme));
    
    return jsonResponse({
      success: true,
      data: defaultTheme
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error.message
    }, 500);
  }
}

// 更新全局主题配置
async function updateGlobalTheme(request, env) {
  try {
    const body = await request.json();
    const { theme, timestamp } = body;
    
    // 验证主题名称
    const validThemes = ['default', 'halloween', 'heist', 'christmas', 'nationalday', 
                         'midautumn', 'springfestival', 'dragonboat', 'laborday', 'qingming', 'lanternfestival',
                         'valentine', 'independenceday', 'oktoberfest', 'cayoperico', 'casino', 'doomsday', 'dark'];
    if (!theme || !validThemes.includes(theme)) {
      return jsonResponse({
        success: false,
        error: '无效的主题名称',
        validThemes: validThemes
      }, 400);
    }
    
    // 创建新的主题配置
    const themeConfig = {
      theme: theme,
      lastUpdate: new Date().toISOString(),
      updatedBy: 'admin',
      timestamp: timestamp || Date.now(),
      description: `全局主题配置 - ${theme}`
    };
    
    // 保存到 KV
    await env.THEME_KV.put('global_theme', JSON.stringify(themeConfig));
    
    // 记录历史（可选）
    const historyKey = `theme_history_${Date.now()}`;
    await env.THEME_KV.put(historyKey, JSON.stringify(themeConfig), {
      expirationTtl: 86400 * 30 // 保留 30 天
    });
    
    return jsonResponse({
      success: true,
      message: '主题已成功更新',
      data: themeConfig
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error.message
    }, 500);
  }
}


// 主处理函数
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // 处理 CORS 预检
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }
    
    // 路由处理
    try {
      // 获取全局主题
      if (path === '/gta-db/api/theme/global' && request.method === 'GET') {
        return await getGlobalTheme(env);
      }
      
      // 更新全局主题
      if (path === '/gta-db/api/admin/update-theme' && request.method === 'POST') {
        return await updateGlobalTheme(request, env);
      }
      
      // 404
      return jsonResponse({
        success: false,
        error: 'Not Found',
        path: path,
        availableEndpoints: [
          'GET /gta-db/api/theme/global',
          'POST /gta-db/api/admin/update-theme'
        ]
      }, 404);
    } catch (error) {
      return jsonResponse({
        success: false,
        error: error.message
      }, 500);
    }
  }
};
