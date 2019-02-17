import { Person } from 'src/app/shared/models/Person.interface';

export interface VideoCourseBackend {
  id?: number;
  name: string;
  description: string;
  isTopRated: boolean;
  date: string;
  authors?: Person[];
  length: number;
}
