import Product from '../models/Product.js'
import cloudinary from '../lib/cloudinary.js';

const getProduct= async(req,res)=>{
    try {
		const products = await Product.find({ vendor: req.params.id }); // find all products
		res.json({ products });
	} catch (error) {
		console.log("Error in getProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const addProduct = async (req, res) => {
  const { name, description, price, image, quantity, vendor } = req.body;
  const uploaded = image
    ? await cloudinary.uploader.upload(image, { folder: 'products' })
    : null;

  const product = await Product.create({
    name,
    description,
    price,
    image: uploaded?.secure_url || '',
    quantity,
    vendor,
  });
  res.status(201).json({ product });
};


const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];  //this will get the id of the image
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const updateProduct = async (req, res) => {
	try {
		const { name, description, price, image, quantity } = req.body;
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		let updatedImageURL = product.image;

		// If new image is provided and it's different from old one
		if (image && image !== product.image) {
			// Delete old image from Cloudinary
			if (product.image) {
				const publicId = product.image.split("/").pop().split(".")[0];
				try {
					await cloudinary.uploader.destroy(`products/${publicId}`);
					console.log("Old image deleted from Cloudinary");
				} catch (error) {
					console.log("Error deleting old image:", error.message);
				}
			}

			// Upload new image
			const cloudinaryResponse = await cloudinary.uploader.upload(image, {
				folder: "products",
			});
			updatedImageURL = cloudinaryResponse.secure_url;
		}

		// Update fields
		product.name = name || product.name;
		product.description = description || product.description;
		product.price = price || product.price;
		product.quantity = quantity || product.quantity;
		product.image = updatedImageURL;

		const updatedProduct = await product.save();

		res.status(200).json(updatedProduct);
	} catch (error) {
		console.log("Error in updateProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export {getProduct, addProduct, updateProduct, deleteProduct};