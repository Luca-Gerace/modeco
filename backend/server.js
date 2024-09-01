import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import session from 'express-session';
import passport from './config/passportConfig.js';
// Routes
import {
  authRoutes,
  cartRoutes,
  brandRoutes,
  licenseRoutes,
  orderRoutes,
  postRoutes,
  productRoutes,
  userRoutes,
  wishlistRoutes
} from './routes/index.js';
// Middlewares
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler,
} from './middlewares/errorHandlers.js';

// .env
dotenv.config();

const app = express();

// cors cofiguration
const corsOptions = {
  origin: function(origin, callback) {
    const whiteList = [
      'http://localhost:5173', // development - frontend
      'http://localhost:5174', // development - cms
      // 'https://mern-blog-eight-pearl.vercel.app', // production - Frontend (vercel)
      // 'https://mern-blog-eight-pearl.vercel.app', // production - CMS (vercel)
      // 'https://mern-blog-b8ed.onrender.com' // production - backend (Render)
    ];

    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else if (whiteList.indexOf !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Generic Cors Error'));
    }
  },
  credentials: true
}

// App - Global Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Session configuration
app.use(
  session({
    // use session_secret to validate cookie session 
    secret: process.env.SESSION_SECRET,
    // session optimizations
    resave: false,
    saveUninitialized: false
  })
);

// use passport configuration
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// App - Routes 
app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);

// PORT
const PORT = process.env.PORT || 3000;

// App -  Error handling Middlewares
app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

// Server start info
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  console.log('Available routes:');

  console.table(
    listEndpoints(app).map((route) => ({
      path: route.path,
      methods: route.methods.join(', '),
    })),
  );
});
