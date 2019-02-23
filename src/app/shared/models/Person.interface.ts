export interface Person {
  id: number;
  fakeToken: string;
  login: string;
  password: string;
  name?: {
    first: string;
    last: string;
  };
}
