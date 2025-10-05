// 简单的构建脚本
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

async function buildProject() {
    console.log('🔨 开始构建项目...');
    
    // 创建 dist 目录
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    // 混淆 JavaScript 文件
    const jsFiles = [
        'gta-map/ls/js/map-core.js',
        // 添加其他需要混淆的 JS 文件
    ];

    for (const file of jsFiles) {
        const filePath = path.join(__dirname, file);
        const code = fs.readFileSync(filePath, 'utf8');
        
        const result = await minify(code, {
            compress: {
                dead_code: true,
                drop_console: false, // 保留 console（设为 true 可删除所有 console）
                drop_debugger: true,
                pure_funcs: ['console.debug'],
                passes: 2, // 减少压缩次数，避免过度优化
                unsafe: false, // 禁用不安全的优化
                unsafe_comps: false,
                unsafe_math: false,
                unsafe_proto: false
            },
            mangle: {
                toplevel: false, // 不混淆顶级作用域，避免破坏全局变量
                eval: false, // 不混淆 eval
                reserved: ['map', 'L', 'Leaflet', 'MapboxGL', 'mapboxgl'], // 保留 Leaflet 等全局变量
                properties: false // 不混淆属性名，避免破坏对象方法
            },
            format: {
                comments: false,
                ascii_only: false, // 不转义 Unicode，避免中文乱码
                beautify: false
            }
        });

        const outputPath = path.join(distDir, file);
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(outputPath, result.code);
        console.log(`✅ 已混淆: ${file}`);
    }

    // 复制其他 JS 文件（不混淆）
    const otherJsFiles = [
        'gta-map/ls/js/mobile-controls.js',
        'gta-map/ls/js/protection.js',
        'vehicles/decrypt.js',
    ];

    for (const file of otherJsFiles) {
        const srcPath = path.join(__dirname, file);
        const destPath = path.join(distDir, file);
        const destDir = path.dirname(destPath);
        
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`📋 已复制 JS: ${file}`);
        }
    }

    // 复制其他文件（HTML, CSS, 图片等）
    const copyFiles = [
        'index.html',
        '404.html',
        'blank.html',
        'admin/index.html',
        'gta-map/ls/index.html',
        'vehicles/index.html',
        // 添加其他需要复制的文件
    ];

    for (const file of copyFiles) {
        const srcPath = path.join(__dirname, file);
        const destPath = path.join(distDir, file);
        const destDir = path.dirname(destPath);
        
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`📋 已复制: ${file}`);
        }
    }

    // 递归复制整个目录
    function copyDir(src, dest) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        const entries = fs.readdirSync(src, { withFileTypes: true });
        
        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            
            if (entry.isDirectory()) {
                // 跳过 node_modules 和 dist
                if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') {
                    continue;
                }
                copyDir(srcPath, destPath);
            } else {
                // 跳过已经处理的 JS 文件
                if (srcPath.includes('map-core.js')) {
                    continue;
                }
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    // 复制必要的目录（在复制单个文件之前）
    console.log('📁 复制资源文件...');
    const dirsToC = [
        { src: 'src', dest: 'src' }, // 根目录的 src（静态资源）
        { src: 'group', dest: 'group' }, // group 目录
        { src: 'gta-map/cp', dest: 'gta-map/cp' }, // gta-map/cp
        { src: 'gta-map/ls/css', dest: 'gta-map/ls/css' },
        { src: 'gta-map/ls/src', dest: 'gta-map/ls/src' },
        { src: 'gta-map/ls/images', dest: 'gta-map/ls/images' },
        { src: 'rdr-map', dest: 'rdr-map' }, // rdr-map 目录
        // vehicles 目录不在这里复制，因为我们需要单独处理 index.html
    ];

    for (const dir of dirsToC) {
        const srcDir = path.join(__dirname, dir.src);
        const destDir2 = path.join(distDir, dir.dest);
        if (fs.existsSync(srcDir)) {
            copyDir(srcDir, destDir2);
            console.log(`📁 已复制目录: ${dir.src} -> ${dir.dest}`);
        } else {
            console.log(`⚠️  目录不存在，跳过: ${dir.src}`);
        }
    }

    // 统计构建结果
    console.log('\n📊 构建统计:');
    const distFiles = [];
    function countFiles(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                countFiles(fullPath);
            } else {
                distFiles.push(fullPath);
            }
        }
    }
    countFiles(distDir);
    console.log(`   总文件数: ${distFiles.length}`);
    console.log(`   总大小: ${(distFiles.reduce((sum, f) => sum + fs.statSync(f).size, 0) / 1024 / 1024).toFixed(2)} MB`);
    
    console.log('\n✨ 构建完成！输出目录: dist/');
    console.log('💡 提示: 运行 npm run preview 预览构建结果');
}

buildProject().catch(console.error);
