import { Request, Response } from 'express';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export class SigningController {
    async createSignature(req: Request, res: Response) {
        // Logic to create a digital signature
        const signatureData = req.body;
        // Call to service to generate signature
        // const result = await signingService.generateSignature(signatureData);
        res.status(201).json({ message: 'Signature created successfully', data: signatureData });
    }

    async verifySignature(req: Request, res: Response) {
        // Logic to verify a digital signature
        const { signatureId } = req.params;
        // Call to service to validate signature
        // const isValid = await signingService.validateSignature(signatureId);
        res.status(200).json({ message: 'Signature verification result', isValid: true });
    }

    async getSignatureStatus(req: Request, res: Response) {
        // Logic to get the status of a digital signature
        const { signatureId } = req.params;
        // Call to service to retrieve signature data
        // const signatureData = await signingService.retrieveSignatureData(signatureId);
        res.status(200).json({ message: 'Signature status retrieved', data: { signatureId, status: 'completed' } });
    }
}

export const signDocument = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Read file buffer
  const fileBuffer = fs.readFileSync(req.file.path);

  // Generate a simple digital signature (for demo)
  const privateKey = crypto.createPrivateKey({
    key: fs.readFileSync(path.join(__dirname, '../../private.pem')),
    format: 'pem',
  });
  const signature = crypto.sign('sha256', fileBuffer, privateKey);

  // Respond with signature (in real app, attach to document or store)
  res.json({
    filename: req.file.originalname,
    signature: signature.toString('base64'),
    message: 'Document signed successfully',
  });

  // Clean up uploaded file
  fs.unlinkSync(req.file.path);
};
