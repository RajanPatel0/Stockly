import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app=express();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//importing routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import searchRoutes from './routes/searchRoutes.js';


//using routes
app.get('/', (req, res) => {
  res.send('Backend is connected ✅');
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/products', searchRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: err.message
  });
});

//MongoDB connecting
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MONGODB Connected');
}).catch((err)=>{
    console.log('Error connecting MongoDB:', err.message);
});

//starting server
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});