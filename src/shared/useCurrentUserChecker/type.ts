export interface User {
  email: string;
  name: string;
  uid: string;
}

export interface CurrentUserCheckerProps {
  children: React.ReactNode;
}
