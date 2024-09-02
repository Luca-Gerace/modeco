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

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (err) {
    console.error('Errore nella creazione del prodotto:', err);
    throw err;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.patch(`/products/${productId}`, productData);
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento del prodotto:', err);
    throw err;
  }
};

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

// Cart
export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    const cart = response.data;

    // Calcola totalQuantity e totalPrice se non sono già presenti
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0);

    return cart; // Restituisci l'intero oggetto cart
  } catch (err) {
    console.error('Errore nel recupero del carrello:', err);
    throw err;
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const cart = await getCart(); // Recupera il carrello esistente
    const existingItem = cart.items.find(item => item.productId._id === productId); // Controlla se il prodotto è già nel carrello

    if (existingItem) {
      // Se il prodotto esiste, aggiorna la quantità
      existingItem.quantity += parseInt(quantity);
    } else {
      // Se il prodotto non esiste, aggiungilo come nuovo articolo
      const cartItem = {
        productId,
        quantity,
      };
      cart.items.push(cartItem);
    }

    const response = await api.patch(`/cart/${cart._id}`, { items: cart.items });
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiunta al carrello:', err);
    throw err;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const cart = await getCart(); // Recupera il carrello esistente
    const updatedItems = cart.items.filter(item => item.productId._id !== productId); // Filtra l'articolo da rimuovere
    const response = await api.patch(`/cart/${cart._id}`, { items: updatedItems }); // Usa PATCH per aggiornare il carrello
    return response.data;
  } catch (err) {
    console.error('Errore nella rimozione dell\'articolo dal carrello:', err);
    throw err;
  }
};

export const updateCartItem = async (cartId, items, totalPrice) => {
  try {
    const response = await api.patch(`/cart/${cartId}`, {
      items,
      totalPrice
    });
    return response.data;
  } catch (err) {
    console.error('Errore nell\'aggiornamento dell\'articolo nel carrello:', err);
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
}

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

export default api;