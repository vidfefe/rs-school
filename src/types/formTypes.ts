export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  picture: File;
  acceptTerms: boolean;
}

export type FormDataWithFile = Omit<FormData, 'picture'> & { picture: File };
