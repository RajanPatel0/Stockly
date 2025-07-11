import express from 'express';

import {searchProducts} from '../controllers/searchController.js';

const router = express.Router();

router.get('/search', searchProducts );

export default router;