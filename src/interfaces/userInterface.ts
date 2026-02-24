export interface IUser {
  mysqlId: number;
  fname: string;
  lname: string;
  email: string;
  gender: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  role: string;
  contact: string;
  company?: string;
  password?: string;
  status: 'pending' | 'active' | 'rejected';
}
