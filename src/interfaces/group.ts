import { ITeacher } from "./teacher";

export interface IGroup {
  _id:        string;
  level:      string;
  teacher:    string;
  teacher_id: ITeacher;
  group:      string;
  start_date: Date;
  end_date:   Date;
  days:       string[];
  createdAt:  Date;
  updatedAt:  Date;
}
