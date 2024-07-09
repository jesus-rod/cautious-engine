export type DocumentData = {
  id: string;
  filename: string;
  filesize: number;
  uploadDate: string;
  analysisResult: string;
}
export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};
export type User = {
  id: string;
  name: string | null;
  email: string | null;
}