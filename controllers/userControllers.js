const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


const serverBaseUrl = 'http://192.168.1.51:3001';


const register = asyncHandler(async (req, res) => {
    const { username, email, password, phonenumber } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please fill all required fields." });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    let profileImageUrl = "";

    if (req.file) {
        const fileName = `profile_${Date.now()}_${req.file.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, req.file.buffer);
        profileImageUrl = `${serverBaseUrl}/uploads/${fileName}`;
    }

    const user = new User({
        username,
        email,
        password: hashPassword,
        phonenumber,
        profileImage: profileImageUrl
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
});

// Login
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const JWT_SECRET = 'manuss';

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ status: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
        status: true,
        message: "Login successful",
        token,
        user,
    });
});

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json({ user });
};

// Update User
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const updateFields = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let profileImageUrl = req.body.profileImage;

    if (req.file) {
        const fileName = `profile_${Date.now()}_${req.file.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, req.file.buffer);
        profileImageUrl = `${serverBaseUrl}/uploads/${fileName}`;
    }

    for (const field in updateFields) {
        if ([
            'fullName', 'username', 'email', 'password', 'mobile', 'dateOfBirth', 'age',
            'gender', 'weight', 'medals', 'height', 'profileImage', 'goals', 'dietaryPreferences'
        ].includes(field)) {
            if (field === 'password') {
                updateFields[field] = await bcrypt.hash(updateFields[field], 10);
            }
            user[field] = updateFields[field];
        }
    }

    user.profileImage = profileImageUrl;
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
});

// Request Password Reset
const requestPasswordResetWithOTP = asyncHandler(async (req, res) => {
    const startTime = new Date().getTime();
    const { email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

    user.resetOTP = otp;
    user.resetOTPExpiration = Date.now() + 600000; // 10 mins
    await user.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'manulperera5@gmail.com',
            pass: 'gmkf otsz qjsj nbhd',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: {
            name: 'Healthy Bite',
            address: 'manulperera5@gmail.com'
        },
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email', error);
            return res.status(500).json({ message: 'Failed to send OTP email' });
        }

        const endTime = new Date().getTime();
        console.log('Backend response time:', endTime - startTime, 'ms');
        res.status(200).json({ message: 'OTP sent successfully' });
    });
});

// Verify OTP
const verifyOTPAndPassword = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.resetOTP !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.resetOTPExpiration < Date.now()) {
        return res.status(400).json({ message: 'Expired OTP' });
    }

    user.resetOTP = null;
    user.resetOTPExpiration = null;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully!' });
});

// Update Password
const updatePassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully!' });
});

// Delete Account
const deleteAccount = asyncHandler(async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOneAndDelete({ username });
        if (!user) throw new Error('User not found');
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Failed to delete account', error);
        res.status(500).json({ message: 'Failed to delete account' });
    }
});

module.exports = {
    register,
    login,
    getProfile,
    updateUser,
    requestPasswordResetWithOTP,
    verifyOTPAndPassword,
    updatePassword,
    deleteAccount,
    
};
