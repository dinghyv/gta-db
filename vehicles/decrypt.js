
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

// 密钥（混淆后）
const SECRET_KEY = '5202-newtna-selcihev-atg'.split('').reverse().join('');
