var CryptoJS = require("crypto-js");

const dynamicValue = '12/12/2021'; // Could use a date or something dynamic

export function AESEncrypt(pureText) {    
    const privateKey=`${dynamicValue} secret key 123`;    
    var ciphertext = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(pureText), privateKey).toString());    
    return ciphertext;
}

export function AESDecrypt(encryptedText) {  
    const privateKey=`${dynamicValue} secret key 123`;    
    var bytes  = CryptoJS.AES.decrypt(decodeURIComponent(encryptedText), privateKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));    
    return decryptedData;
}
