import crypto from "crypto";
export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export class AES {
  private key: Buffer;
  private iv: Buffer;

  constructor(key: string) {
    this.key = crypto.randomBytes(32);
    this.iv = crypto.randomBytes(16);
  }

  get IV() {
    return this.iv;
  }

  encrypt(text: string) {
    let cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(this.key),
      this.iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex");
  }

  decrypt(text: string) {
    let encryptedText = Buffer.from(text, "hex");
    let decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(this.key),
      this.iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
