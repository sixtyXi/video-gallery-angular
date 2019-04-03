export class Author {
  constructor(public id: string, public firstName: string, public lastName: string) {}

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
