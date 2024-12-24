function generateRandomString() {
    const length = Math.floor(Math.random() * 37);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function simpleHash(str) {
    let hash = '';
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i).toString(16);
        hash += charCode.padStart(4, '0');
    }
    return hash + hash;
}

function decryptHash(hash) {
    let original = '';
    const halfLength = hash.length / 2;
    for (let i = 0; i < halfLength; i += 4) {
        const charCode = parseInt(hash.substr(i, 4), 16);
        original += String.fromCharCode(charCode);
    }
    return original;
}

module.exports = { simpleHash, decryptHash, generateRandomString }