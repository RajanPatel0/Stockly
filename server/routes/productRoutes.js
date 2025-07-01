import express from 'express';
import {addProduct,
        deleteProduct,
        updateProduct,
        getProduct
} from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';  // Ensure this checks JWT


const router = express.Router();

router.get('/', protect, getProduct);
router.post('/add', protect, addProduct);
router.put('/update/:id', protect, updateProduct);
router.delete('/delete/:id', protect, deleteProduct);


export default router;