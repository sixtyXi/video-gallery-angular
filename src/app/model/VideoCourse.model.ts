import { videoRecord } from "./videoRecord";

export class VideoCourse implements videoRecord {
  constructor(
    public id: number,
    public title: string,
    public creationDate: Date,
    public duration: number,
    public description: string
  ) { }
}