export interface Customer {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  /** Plain text for now — encrypt later */
  password?: string;
  createdAt: string;
  demo?: boolean;
}
