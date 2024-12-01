import axios from 'axios';

const BASE_URL = 'http://localhost:5002';

// dogs
export const getDogs = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/accountDog`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

export const getDogById = async (id: number) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/accountDog/id?id=${id}`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch dog by id:', e);
  }
};

export const getDogsByUserId = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/accountDog/user?userId=${id}`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

export const createDog = async (
  name: string,
  kind: string,
  age: string,
  sex: string,
  rating: number,
  description: string,
  photoPath: string,
  userId: string
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/accountDog`,
      {
        name,
        kind,
        age,
        sex,
        rating,
        description,
        photoPath,
        userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

export const deleteDog = async (id: number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/accountDog?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

// posts

export const getPosts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/post`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

export const getPostById = async (id: number) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/post/id?id=${id}`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

export const getPostsByUserId = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/post/user?userId=${id}`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

export const createPost = async (
  dogId: number,
  userId: string,
  description: string,
  likes: number,
  photoPath: string
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/post`,
      {
        dogId,
        userId,
        description,
        likes,
        photoPath,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

export const deletePost = async (id: number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/post?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};
