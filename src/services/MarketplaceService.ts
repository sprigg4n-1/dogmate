import axios from 'axios';

const BASE_URL = 'http://localhost:5048';

export const getMarketplaceReviews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/gateway/reviews`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch marketplace reviews:', e);
  }
};

export const getMarketplaceCertificates = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/gateway/certificates`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch marketplace certificates:', e);
  }
};

export const getMarketplaceSellers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/gateway/sellers`);

    return res.data;
  } catch (e) {
    console.error('Failed to marketplace sellers:', e);
  }
};

export const getMarketplaceServices = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/gateway/services`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch marketplace services:', e);
  }
};

export const getMarketplaceCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/gateway/categories`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch marketplace categories:', e);
  }
};
