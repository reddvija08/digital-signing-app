import { SignatureRequest, SignatureResponse } from '../types';
import crypto from 'crypto';

export class SigningService {
    private signatures: Map<string, string> = new Map();

    generateSignature(request: SignatureRequest): SignatureResponse {
        const { data, privateKey } = request;
        if (!privateKey) throw new Error('Private key is required');
        const sign = crypto.createSign('SHA256');
        sign.update(data);
        sign.end();
        const signature = sign.sign(privateKey, 'base64');
        const signatureId = crypto.randomUUID();
        this.signatures.set(signatureId, signature);
        return {
            signatureId,
            signature,
            status: 'created',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    validateSignature(request: SignatureRequest): boolean {
        const { data, signature, publicKey } = request;
        if (!publicKey || !signature) throw new Error('Public key and signature are required');
        const verify = crypto.createVerify('SHA256');
        verify.update(data);
        verify.end();
        return verify.verify(publicKey, signature, 'base64');
    }

    retrieveSignatureData(signatureId: string): string | undefined {
        return this.signatures.get(signatureId);
    }
}



