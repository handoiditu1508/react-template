export type AuthenticationUser = {
  id: number;
  username: string;
  email: string;
  name: string;
}

export type AuthenticationState = {
  currentUser?: AuthenticationUser;
  loginExpiration?: Date;
}
