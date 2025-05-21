"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigningService = void 0;
const crypto_1 = __importDefault(require("crypto"));
class SigningService {
    constructor() {
        this.signatures = new Map();
    }
    generateSignature(request) {
        const { data, privateKey } = request;
        if (!privateKey)
            throw new Error('Private key is required');
        const sign = crypto_1.default.createSign('SHA256');
        sign.update(data);
        sign.end();
        const signature = sign.sign(privateKey, 'base64');
        const signatureId = crypto_1.default.randomUUID();
        this.signatures.set(signatureId, signature);
        return {
            signatureId,
            signature,
            status: 'created',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }
    validateSignature(request) {
        const { data, signature, publicKey } = request;
        if (!publicKey || !signature)
            throw new Error('Public key and signature are required');
        const verify = crypto_1.default.createVerify('SHA256');
        verify.update(data);
        verify.end();
        return verify.verify(publicKey, signature, 'base64');
    }
    retrieveSignatureData(signatureId) {
        return this.signatures.get(signatureId);
    }
}
exports.SigningService = SigningService;
