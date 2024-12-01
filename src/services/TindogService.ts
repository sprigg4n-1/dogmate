import axios from 'axios';

const BASE_URL = 'http://localhost:5003';

export const getApplications = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/application`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch applications:', e);
  }
};

export const getApplicationsById = async (id: number) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/application/id?id=${id}`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch applications by id:', e);
  }
};

export const getApplicationsByDogId = async (id: number) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/application/dog/${id}`);

    return res.data;
  } catch (e) {
    console.error('Failed to fetch applications by dog id:', e);
  }
};

export const createApplication = async (
  dogId: number,
  rating: number,
  description: string,
  applicationType: string
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/application`,
      {
        dogId,
        rating,
        description,
        applicationType,
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

export const deleteApplication = async (id: number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/application?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

export const getMatchingByDogId = async (id: number) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/matching/dogOwnerId?dogOwnerId=${id}`
    );

    return res.data;
  } catch (e) {
    console.error('Failed to fetch applications by dog id:', e);
  }
};

export const deleteMatching = async (id: number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/matching?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (e) {
    console.error('Failed to fetch products:', e);
  }
};

export const createMatching = async (dogOwner: number, dogLiker: number) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/matching`,
      {
        dogOwner,
        dogLiker,
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

export const getLikerApplication = async (applicationId: number) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/like/application?applicationId=${applicationId}`
    );

    return res.data;
  } catch (e) {
    console.error('Failed to fetch applications by dog id:', e);
  }
};

export const getLikedApplications = async (dogLikerId: number) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/like/dogLiker?dogLikerId=${dogLikerId}`
    );

    return res.data;
  } catch (e) {
    console.error('Failed to fetch applications by dog id:', e);
  }
};

export const createLike = async (dogLiker: number, applicationId: number) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/like`,
      {
        dogLiker,
        applicationId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  } catch (e) {
    console.error('Failed to fetch create like:', e);
  }
};

export const deleteLike = async (id: number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/like?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (e) {
    console.error('Failed to fetch delete like by id:', e);
  }
};
