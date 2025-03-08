// models/UserController.js
import User from './User'; // Adjust the import path as necessary
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage }).single('profilePicture');

// Controller function to update user profile
export const updateUserProfile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file.' });
    }

    const { role, listings, purchases } = req.body;
    const userId = req.params.id; // Assuming user ID is passed as a URL parameter

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePicture: req.file.path, // Save the file path
          role,
          listings: listings ? JSON.parse(listings) : [], // Parse listings if provided
          purchases: purchases ? JSON.parse(purchases) : [] // Parse purchases if provided
        },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({