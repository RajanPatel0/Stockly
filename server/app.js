import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

//importing routes
// import authRoutes from './routes/authRoutes.js';
// import productRoutes from './routes/productRoutes.js';

//using routes
app.get('/', (req, res) => {
  res.send('Backend is connected ✅');
});
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);

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