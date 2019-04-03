import { VideoRecord } from './VideoRecord.interface';
import { Author } from './Author.model';

export class VideoCourse implements VideoRecord {
  constructor(
    public id: number,
    public title: string,
    public creationDate: Date,
    public duration: number,
    public description: string,
    public topRated: boolean,
    public authors: Author[]
  ) {}
}
