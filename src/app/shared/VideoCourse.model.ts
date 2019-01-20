import { VideoRecord } from "./VideoRecord";

export class VideoCourse implements VideoRecord {
  constructor(
    public id: number,
    public title: string,
    public creationDate: Date,
    public duration: number,
    public description: string,
    public topRated: boolean
  ) { }
}