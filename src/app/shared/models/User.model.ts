import { Person } from './Person.interface';

export class User implements Person {
  constructor(
    public id: number,
    public firstName: string,
    public secondName: string
  ) { }
}