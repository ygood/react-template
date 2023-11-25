import CryptoJS from 'crypto-js';
import hmacSHA256 from 'crypto-js/hmac-sha256';

export const isNullOrVoid = (value: any) => {
  return value === undefined || value === null;
};

export const isNullOrVoidOrEmpty = (value: any) => {
  return value === undefined || value === null || value === '';
};

// 睡眠等待
export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const sha256Encryption = (value: string, key: string) => {
  if (!value) return '';
  const hmacDigest = hmacSHA256(value, key).toString();
  return hmacDigest;
};

// AES加密, 根据key值的长度作为加密复杂度，此处为16*8 = 128位加密
const key = CryptoJS.enc.Utf8.parse('s&o@Kp3W@wwylusr'); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ASDFGH0123456789'); //十六位十六进制数作为密钥偏移量
export const AESEncryption = (value: string) => {
  if (!value) return '';
  const src = CryptoJS.enc.Utf8.parse(value);
  const encrypted = CryptoJS.AES.encrypt(src, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  const psd = encrypted.ciphertext.toString();
  return psd;
};

//AES解密
export const AESDecrypt = (value: string) => {
  if (!value) return '';
  try {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(value);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  } catch (error) {
    return value;
  }
};
