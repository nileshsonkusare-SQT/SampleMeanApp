const CryptoJS = require("crypto-js");

let Common = {
    encrypt: function (text) {        
        var cipherText = CryptoJS.HmacSHA256(text, process.env.SECRET_KEY).toString();
        console.log("Encrypted Text : " + cipherText);
        return cipherText;
    },
    encrypt_AES: function (text) {        
        var cipherText = CryptoJS.AES.encrypt(text, process.env.SECRET_KEY).toString();
        console.log("Encrypted Text : " + cipherText);
        return cipherText;
    },
    decrypt_AES: function (cipherText) {        
        var originalText  = CryptoJS.AES.decrypt(cipherText, process.env.SECRET_KEY).toString();
        console.log("Original Text : " + originalText );
        return originalText;
    }
}

module.exports = Common;