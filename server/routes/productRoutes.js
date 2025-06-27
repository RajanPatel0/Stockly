import express from 'express';
import {addProduct,
        deleteProduct,
        updateProduct,
        getProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/vendor/:id', getProduct);
router.post('/add', addProduct);
router.put('/update/:id', updateProduct);   //update is of quantity,image,name,desc,price
router.delete('/delete/:id', deleteProduct);

export default router;