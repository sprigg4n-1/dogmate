// header
export type HeaderItemProps = {
  title: string;
  link: string;
  isActive: boolean;
};

// user
export type UserProps = {
  id: number;
  name: string;
  surname: string;
  age: string;
  nickname?: string;
  photoUrl?: string;
  email?: string;
  sex: string;
  description: string;
  role: string;
  isVerified: boolean;
  contactInfo?: string;
  rating?: number;
};

export type UserPostProps = {
  id: number;
  userId: string;
  dogId: number;
  likes: number;
  description: string;
  photoPath: string;
};

// dog + tindog
export enum DogAge {
  PUPPY = 'PUPPY',
  ADULT = 'ADULT',
  SENIOR = 'SENIOR',
  UNKNOWN = 'UNKNOWN',
}

export enum DogSex {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

export enum TindogAppType {
  WALK = 'WALK',
  BREEDING = 'BREEDING',
  BOTH = 'BOTH',
}

export type UserDogProps = {
  id: number;
  name: string;
  kind: string;
  age: string;
  sex: string;
  rating: number;
  description: string;
  photoPath: string;
  userId: string;
};

export type TinDogApplication = {
  id: number;
  dogId: number;
  rating: number;
  description: string;
  applicationType: string;
};

export type LikeApp = {
  id: number;
  dogLiker: number;
  applicationId: number;
};

export type Matching = {
  id: number;
  dogOwner: number;
  dogLiker: number;
};

// shop
export type DogProductProps = {
  productId: number;
  name: string;
  description: string;
  price: number;
  country: CountryType;
  rating: number;
  category: CategoryType;
  imageUrl: string;
  stockAvailable: boolean;
};

export type DogProductReviews = {
  reviewId: number;
  userName: string;
  rating: number;
  comment: string;
};

export type DogProductCartProps = {
  id: number;
  name: string;
  photoUrl: string;
  price: number;
  count: number;
  isAvailable: boolean;
};

export type CountryType = {
  id: number;
  name: string;
};

export type CategoryType = {
  id: number;
  name: string;
};

// marketplace
export type MarketplaceCategories = {
  categoryId: number;
  name: string;
  description: string;
  photoUrl?: string;
};

export type ServiceProps = {
  service: string;
  name: string;
  description: string;
  price: number;
  availability: true;
  categoryId: number;
  workerId?: string;
  rating?: number;
};
