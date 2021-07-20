export class User {
  uid: string;
  email: string;
  token: string;
  refresh_token?: string;
  constructor(
    uid: string,
    email: string,
    token: string,
    refresh_token: string
  ) {
    this.uid = uid;
    this.email = email;
    this.token = token;
    this.refresh_token = refresh_token;
  }
}
