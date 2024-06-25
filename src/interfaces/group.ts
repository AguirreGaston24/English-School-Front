export interface IGroup {
  _id:        string;
  level:      string;
  teacher:    string;
  group:      string;
  start_date: Date;
  end_date:   Date;
  days:       string[];
  createdAt:  Date;
  updatedAt:  Date;
}
