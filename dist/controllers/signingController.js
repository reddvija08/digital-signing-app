"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signDocument = exports.SigningController = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class SigningController {
    createSignature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic to create a digital signature
            const signatureData = req.body;
            // Call to service to generate signature
            // const result = await signingService.generateSignature(signatureData);
            res.status(201).json({ message: 'Signature created successfully', data: signatureData });
        });
    }
    verifySignature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic to verify a digital signature
            const { signatureId } = req.params;
            // Call to service to validate signature
            // const isValid = await signingService.validateSignature(signatureId);
            res.status(200).json({ message: 'Signature verification result', isValid: true });
        });
    }
    getSignatureStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic to get the status of a digital signature
            const { signatureId } = req.params;
            // Call to service to retrieve signature data
            // const signatureData = await signingService.retrieveSignatureData(signatureId);
            res.status(200).json({ message: 'Signature status retrieved', data: { signatureId, status: 'completed' } });
        });
    }
}
exports.SigningController = SigningController;
const signDocument = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Read file buffer
    const fileBuffer = fs_1.default.readFileSync(req.file.path);
    // Generate a simple digital signature (for demo)
    const privateKey = crypto_1.default.createPrivateKey({
        key: fs_1.default.readFileSync(path_1.default.join(__dirname, '../../private.pem')),
        format: 'pem',
    });
    const signature = crypto_1.default.sign('sha256', fileBuffer, privateKey);
    // Respond with signature (in real app, attach to document or store)
    res.json({
        filename: req.file.originalname,
        signature: signature.toString('base64'),
        message: 'Document signed successfully',
    });
    // Clean up uploaded file
    fs_1.default.unlinkSync(req.file.path);
};
exports.signDocument = signDocument;
