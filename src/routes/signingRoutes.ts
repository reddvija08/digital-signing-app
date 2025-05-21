import { Router } from 'express';
import express from 'express';
import multer from 'multer';
import { SigningController } from '../controllers/signingController';
import { signDocument } from '../controllers/signingController';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const signingController = new SigningController();

export function setSigningRoutes(app: Router) {
    app.post('/signatures', signingController.createSignature.bind(signingController));
    app.post('/signatures/verify', signingController.verifySignature.bind(signingController));
    app.get('/signatures/status/:id', signingController.getSignatureStatus.bind(signingController));
    app.post('/sign', upload.single('document'), signDocument);
}






