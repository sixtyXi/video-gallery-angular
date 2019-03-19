import { Author } from './Author.model';

export interface VideoRecord {
  id?: number;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated: boolean;
  authors?: Author[];
}
