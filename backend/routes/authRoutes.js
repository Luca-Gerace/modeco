import express from 'express';
import User from '../models/User.js';
import { generateJWT } from '../utils/jwt.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import passport from '../config/passportConfig.js';


// TODO: Gestire doppio endpoint (frontend e cms)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const CMS_URL = process.env.CMS_URL || 'http://localhost:5174';

const router = express.Router();

// POST /login
router.post('/login', async (req, res) => {
    try {
        // get email and password
        const { email, password } = req.body;

        // find author in MongoDb by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Not valid credentials' })
        }

        // Compare password with hashed password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Not valid credentials' })
        }

        // generate token
        const token = await generateJWT({ id: user._id });

        // send token and message inside the response
        res.json({ token, message: 'Login successful' })

    } catch (err) {
        console.error('Login error', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /me
router.get('/me', authMiddleware, async (req, res) => {

    const userData = req.user.toObject();
    delete userData.password;

    res.json(userData)
});

// GET /google - handle google auth
router.get('/google', (req, res, next) => {
    const redirect = req.query.redirect || 'frontend'; // Default to 'frontend'
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: redirect // Pass the redirect target through state parameter
    })(req, res, next);
});

// GET /google/callback - callback function after google auth
router.get('/google/callback', passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login` }), async (req, res) => {
    try {
        // generate jwt token
        const token = await generateJWT({ id: req.user._id });
        const redirectUrl = req.authInfo.redirect || 'frontend'; // Use the redirect passed from the strategy
        const destinationUrl = redirectUrl === 'cms' ? CMS_URL : FRONTEND_URL;
        res.redirect(`${destinationUrl}/login?token=${token}`);

    } catch (err) {
        console.error('Token generation error', err);
        res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
    }
});

export default router;