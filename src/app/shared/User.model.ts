import { person } from './person';

export class User implements person {
  constructor(
    public id: number,
    public firstName: string,
    public secondName: string
  ) { }
}