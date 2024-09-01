import axios from "axios";

// API Base URL
const API_URL = "http://localhost:5003/api"

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// CRUD Operations

// User
export const userLogin = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
};

export const registerUser = (userData) => api.post("/users", userData);

export const getMe = () => api.get("/auth/me").then((response) => response.data);

export const getUserData = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (err) {
    console.error('Error retrieving user data:', err);
    throw err;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
};

export const updateUserAvatar = async (userId, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    const response = await api.patch(`/users/${userId}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (err) {
    console.error('Error updating avatar:', err);
    throw err;
  }
};

// Product
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (err) {
    console.error('Errore nel recupero dei prodotti:', err);
    throw err;
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (err) {
    console.error('Errore nel recupero del prodotto:', err);
    throw err;
  }
};

export const createProduct = (productData) => api.post("/products", productData, {headers: {'Content-Type': 'multipart/form-data'},});

export const updateProduct = async (productId, productData) => {
  api.patch(`/products/${productId}`, productData);
  try {
    const response = await api.patch(`/products/${productId}`, productData);
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento del prodotto:', err);
    throw err;
  }
}

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (err) {
    console.error('Errore nell\'eliminazione del prodotto:', err);
    throw err;
  }
};

export const updateProductImage = async (productId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.patch(`/products/${productId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento dell\'immagine del prodotto:', err);
    throw err;
  }
};

// Brand
export const getBrands = async () => {
  try {
    const response = await api.get('/brands');
    return response.data;
  } catch (err) {
    console.error('Errore nel recupero dei brand:', err);
    throw err;
  }
};

export const getBrand = async (brandId) => {
  try {
    const response = await api.get(`/brands/${brandId}`);
    return response.data;
  } catch (err) {
    console.error('Errore nel recupero del brand:', err);
    throw err;
  }
};

export const createBrand = (brandData) => api.post("/brands", brandData, {headers: {'Content-Type': 'multipart/form-data'},});

export const updateBrand = async (brandId, brandData) => {
  api.patch(`/brands/${brandId}`, brandData);
  try {
    const response = await api.patch(`/brands/${brandId}`, brandData);
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento del brand:', err);
    throw err;
  }
}

export const deleteBrand = async (brandId) => {
  try {
    const response = await api.delete(`/brands/${brandId}`);
    return response.data;
  } catch (err) {
    console.error('Errore nell\'eliminazione del brand:', err);
    throw err;
  }
};

export const updateBrandImage = async (brandId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.patch(`/brands/${brandId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento dell\'immagine del brand:', err);
    throw err;
  }
};

// License
export const getLicenses = async () => {
  try {
    const response = await api.get('/licenses');
    return response.data;
  } catch (err) {
    console.error('Errore nel recupero dei license:', err);
    throw err;
  }
};

export const getLicense = async (licenseId) => {
  try {
    const response = await api.get(`/licenses/${licenseId}`);
    return response.data;
  } catch (err) {
    console.error('Errore nel recupero del license:', err);
    throw err;
  }
};

export const createLicense = (licenseData) => api.post("/licenses", licenseData, {headers: {'Content-Type': 'multipart/form-data'},});

export const updateLicense = async (licenseId, licenseData) => {
  api.patch(`/licenses/${licenseId}`, licenseData);
  try {
    const response = await api.patch(`/licenses/${licenseId}`, licenseData);
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento del license:', err);
    throw err;
  }
}

export const deleteLicense = async (licenseId) => {
  try {
    const response = await api.delete(`/licenses/${licenseId}`);
    return response.data;
  } catch (err) {
    console.error('Errore nell\'eliminazione del license:', err);
    throw err;
  }
};

export const updateLicenseImage = async (licenseId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.patch(`/licenses/${licenseId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento dell\'immagine del license:', err);
    throw err;
  }
};

// Post
export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (err) {
    console.error('Errore nel recupero dei post:', err);
    throw err;
  }
};

export const getPost = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (err) {
    console.error('Errore nel recupero del post:', err);
    throw err;
  }
};

export const createPost = (postData) => api.post("/posts", postData, {headers: {'Content-Type': 'multipart/form-data'},});

export const updatePost = async (postId, postData) => {
  api.patch(`/posts/${postId}`, postData);
  try {
    const response = await api.patch(`/posts/${postId}`, postData);
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento del post:', err);
    throw err;
  }
}

export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (err) {
    console.error('Errore nell\'eliminazione del post:', err);
    throw err;
  }
};

export const updatePostImage = async (postId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.patch(`/posts/${postId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento dell\'immagine del post:', err);
    throw err;
  }
};


// Order
export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (err) {
    console.error('Error retrieving orders:', err);
    throw err;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (err) {
    console.error('Error retrieving order:', err);
    throw err;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (err) {
    console.error('Error creating order:', err.response.data);
    throw err;
  }
};

export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await api.put(`/orders/${orderId}`, orderData);
    return response.data;
  } catch (err) {
    console.error('Error updating order:', err);
    throw err;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting order:', err);
    throw err;
  }
};

// Review
export const getReviews = async () => {
  try {
    const response = await api.get('/reviews');
    return response.data;
  } catch (err) {
    console.error('Error retrieving reviews:', err);
    throw err;
  }
};

export const getReview = async (reviewId) => {
  try {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data;
  } catch (err) {
    console.error('Error retrieving review:', err);
    throw err;
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  } catch (err) {
    console.error('Error creating review:', err);
    throw err;
  }
};

export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  } catch (err) {
    console.error('Error updating review:', err);
    throw err;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting review:', err);
    throw err;
  }
};

// Wishlist
export const getWishlist = async () => {
  try {
    const response = await api.get('/wishlist');
    return response.data;
  } catch (err) {
    console.error('Errore nel recupero della wishlist:', err);
    throw err;
  }
};

export const createWishlist = async (wishlistData) => {
  try {
    const response = await api.post('/wishlist', wishlistData);
    return response.data;
  } catch (err) {
    console.error('Error creating wishlist:', err);
    throw err;
  }
};

export const updateWishlist = async (productId) => {
  try {
    const response = await api.post('/wishlist', { productId });
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento della wishlist:', err);
    throw err;
  }
};

export const deleteWishlist = async (wishlistId) => {
  try {
    const response = await api.delete(`/wishlist/${wishlistId}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting wishlist:', err);
    throw err;
  }
};

// Coupon
export const getCoupons = async () => {
  try {
    const response = await api.get('/coupons');
    return response.data;
  } catch (err) {
    console.error('Error retrieving coupons:', err);
    throw err;
  }
};

export const getCoupon = async (couponId) => {
  try {
    const response = await api.get(`/coupons/${couponId}`);
    return response.data;
  } catch (err) {
    console.error('Error retrieving coupon:', err);
    throw err;
  }
};

export const createCoupon = async (couponData) => {
  try {
    const response = await api.post('/coupons', couponData);
    return response.data;
  } catch (err) {
    console.error('Error creating coupon:', err);
    throw err;
  }
};

export const updateCoupon = async (couponId, couponData) => {
  try {
    const response = await api.put(`/coupons/${couponId}`, couponData);
    return response.data;
  } catch (err) {
    console.error('Error updating coupon:', err);
    throw err;
  }
};

export const deleteCoupon = async (couponId) => {
  try {
    const response = await api.delete(`/coupons/${couponId}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting coupon:', err);
    throw err;
  }
};

export default api;