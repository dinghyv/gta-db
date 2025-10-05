// JSON 加密脚本
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 简单的加密密钥（可以修改）
const SECRET_KEY = 'gta-vehicles-antwen-2025';

// 简单加密函数（Base64 + XOR）- 支持 Unicode
function encryptData(data, key) {
    const jsonStr = JSON.stringify(data);
    // 使用 UTF-8 编码处理中文
    const utf8Bytes = Buffer.from(jsonStr, 'utf8');
    const base64Str = utf8Bytes.toString('base64');
    
    // XOR 加密
    const encrypted = base64Str.split('').map((char, i) => {
        const keyChar = key.charCodeAt(i % key.length);
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
    }).join('');
    
    return Buffer.from(encrypted, 'binary').toString('base64');
}

// 解密函数（供前端使用）
function generateDecryptFunction() {
    return `
// 解密函数 - 支持 Unicode/中文
function decryptVehicleData(encryptedData, key) {
    try {
        // 第一步：Base64 解码
        const step1 = atob(encryptedData);
        
        // 第二步：XOR 解密
        const step2 = step1.split('').map((char, i) => {
            const keyChar = key.charCodeAt(i % key.length);
            return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
        }).join('');
        
        // 第三步：Base64 解码
        const step3 = atob(step2);
        
        // 第四步：UTF-8 解码（处理中文）
        const bytes = new Uint8Array(step3.length);
        for (let i = 0; i < step3.length; i++) {
            bytes[i] = step3.charCodeAt(i);
        }
        const jsonStr = new TextDecoder('utf-8').decode(bytes);
        
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error('解密失败:', e);
        return null;
    }
}
`;
}

async function encryptVehicleDatabase() {
    console.log('🔐 开始加密车辆数据库...');
    
    const inputFile = path.join(__dirname, '../src/data/vehicles_database_antwen.json');
    const outputFile = path.join(__dirname, '../src/data/vehicles_database_encrypted.json');
    const decryptScriptFile = path.join(__dirname, '../vehicles/decrypt.js');
    
    // 读取原始数据
    const rawData = fs.readFileSync(inputFile, 'utf8');
    const vehicleData = JSON.parse(rawData);
    
    console.log(`📊 车辆数量: ${vehicleData.length}`);
    console.log(`📦 原始大小: ${(rawData.length / 1024 / 1024).toFixed(2)} MB`);
    
    // 加密数据
    const encrypted = encryptData(vehicleData, SECRET_KEY);
    
    // 保存加密后的数据
    const encryptedJson = {
        version: '1.0.0',
        encrypted: true,
        data: encrypted
    };
    
    fs.writeFileSync(outputFile, JSON.stringify(encryptedJson));
    console.log(`✅ 已加密: ${outputFile}`);
    console.log(`📦 加密后大小: ${(JSON.stringify(encryptedJson).length / 1024 / 1024).toFixed(2)} MB`);
    
    // 生成解密脚本
    const decryptScript = `${generateDecryptFunction()}
// 密钥（混淆后）
const SECRET_KEY = '${SECRET_KEY.split('').reverse().join('')}'.split('').reverse().join('');
`;
    
    fs.writeFileSync(decryptScriptFile, decryptScript);
    console.log(`✅ 已生成解密脚本: ${decryptScriptFile}`);
    
    console.log('\n💡 使用说明:');
    console.log('1. 在 vehicles/index.html 中引入 decrypt.js');
    console.log('2. 使用 decryptVehicleData() 函数解密数据');
    console.log('3. 将原始 JSON 文件替换为加密版本');
}

encryptVehicleDatabase().catch(console.error);
