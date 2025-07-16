import express from 'express';
import {register, login, getVendorById } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get("/vendor/:id", getVendorById);


export default router;





 