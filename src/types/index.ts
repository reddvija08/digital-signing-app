export interface SignatureRequest {
    documentId: string;
    signerId: string;
    signatureOptions?: {
        reason?: string;
        location?: string;
    };
    data: string | Buffer; // <-- Add this line
    privateKey?: string | Buffer;
    publicKey?: string | Buffer;
    signature?: string;
}

export interface SignatureResponse {
    signatureId: string;
    signature: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
