import { Person } from './Person';

export class User implements Person {
  constructor(
    public id: number,
    public firstName: string,
    public secondName: string
  ) { }
}