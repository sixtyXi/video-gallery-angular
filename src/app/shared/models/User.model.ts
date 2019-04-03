import { Person } from './Person.interface';

export class User implements Person {
  constructor(
    public id: number,
    public fakeToken: string,
    public login: string,
    public password: string
  ) {}
}
