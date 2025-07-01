import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

const sendAuthResponse = (res, status, user) => {
  const token = generateToken(user);
  return res.status(status).json({
    user: {
      id: user._id,
      name: user.name,
      role: user.role
    },
    token
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password, role, storeAddress, storeLocation } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const newUser = new User({
      name,
      email,
      password,
      role,
      ...(role === 'vendor' && {
        storeAddress,
        storeLocation: {
          type: "Point",
          coordinates: [storeLocation.lng, storeLocation.lat]
        }
      })
    });

    await newUser.save();
    sendAuthResponse(res, 201, newUser);
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    sendAuthResponse(res, 200, user);

  } catch (err) {
    res.status(500).json({ 
      message: 'Login failed', 
      error: err.message 
    });
  }
};

export { register, login };