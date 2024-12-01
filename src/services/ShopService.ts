import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

export const getProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/products`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

export const getProductsById = async (id: number) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/products/${id}`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch product by id:', e);
  }
};

export const getCountries = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/countries`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch countries:', e);
  }
};

export const getReviewsByProductId = async (id: number) => {
  try {
    const res = await axios.get(`${BASE_URL}/reviews/product/${id}`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch review by id:', e);
  }
};

export const getCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/categories`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch categories:', e);
  }
};
