import { verifyJWT } from '../utils/jwt.js';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
    try {
        // pull and clear user token
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).send('Error, Unauthorized request')
        }

        // Decode and verify token
        const decodedToken = await verifyJWT(token);

        // Find user by id
        const user = await User.findById(decodedToken.id).select('-password')

        if (!user) {
            return res.status(401).send('User not found')
        }

        req.user = user;

        next();

    } catch (err) {
        return res.status(401).send('Error, Unauthorized request');
    }
}