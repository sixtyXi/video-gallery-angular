import { Author } from 'src/app/shared/models/Author.model';

export interface VideoCourseBackend {
  id?: number;
  name: string;
  description: string;
  isTopRated: boolean;
  date: string;
  authors?: Author[];
  length: number;
}
