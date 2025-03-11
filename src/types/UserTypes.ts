export interface UserDocumentType {
  _id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormUserType {
  username: string;
  password: string;
}
