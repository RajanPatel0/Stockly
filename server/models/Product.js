import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  image: {
			type: String,
			required: [true, "Image is required"],
	},
  quantity: Number,
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Product=mongoose.model('Product', productSchema);

export default Product;