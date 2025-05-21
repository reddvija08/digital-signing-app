"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSigningRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const signingController_1 = require("../controllers/signingController");
const signingController_2 = require("../controllers/signingController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const signingController = new signingController_1.SigningController();
function setSigningRoutes(app) {
    app.post('/signatures', signingController.createSignature.bind(signingController));
    app.post('/signatures/verify', signingController.verifySignature.bind(signingController));
    app.get('/signatures/status/:id', signingController.getSignatureStatus.bind(signingController));
    app.post('/sign', upload.single('document'), signingController_2.signDocument);
}
exports.setSigningRoutes = setSigningRoutes;
