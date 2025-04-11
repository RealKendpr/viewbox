export interface UserDocumentType {
  _id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userTheme: "light" | "dark";
}

export interface FormUserType {
  username: string;
  password: string;
}
