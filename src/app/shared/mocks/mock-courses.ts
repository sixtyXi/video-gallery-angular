import { VideoRecord } from '../models/VideoRecord.interface';

export const COURSES: VideoRecord[] = [
  {
    id: 1,
    title: 'video course 1',
    creationDate: new Date(2019, 4, 23),
    duration: 88,
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta libero similique aperiam, velit inventore tempora sequi repudiandae sunt nesciunt!',
    topRated: false
  },
  {
    id: 2,
    title: 'video course 2',
    creationDate: new Date(2018, 11, 21),
    duration: 27,
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta libero similique aperiam, velit inventore tempora sequi repudiandae sunt nesciunt!',
    topRated: false
  },
  {
    id: 3,
    title: 'video course 3',
    creationDate: new Date(2018, 6, 14),
    duration: 70,
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta libero similique aperiam, velit inventore tempora sequi repudiandae sunt nesciunt!',
    topRated: false
  },
  {
    id: 4,
    title: 'video course 4',
    creationDate: new Date(2018, 6, 16),
    duration: 46,
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta libero similique aperiam, velit inventore tempora sequi repudiandae sunt nesciunt!',
    topRated: true
  },
  {
    id: 5,
    title: 'video course 5',
    creationDate: new Date(2018, 11, 19),
    duration: 30,
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta libero similique aperiam, velit inventore tempora sequi repudiandae sunt nesciunt!',
    topRated: false
  }
];
