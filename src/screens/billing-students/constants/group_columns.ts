import moment from "moment";

import { DAYS_OF_WEEK } from "../../../constant/days_of_week";
import { ITeacher } from "../../../interfaces/teacher";

export const GROUP_COLUMNS = [
  { title: 'Grupo', dataIndex: 'group', key: 'group' },
  { title: 'Nivel', dataIndex: 'level', key: 'nivel' },
  { title: 'Profesor/a', dataIndex: 'teacher_id', key: 'teacher_id', render: (_: any, { teacher_id }: { teacher_id: ITeacher }) => `${teacher_id.firstname} ${teacher_id.lastname}` },
  { title: 'Hora de inicio', dataIndex: 'start_date', key: 'start_date', render: (_: any, record: any) => moment(record.start_date).format('h:mm A') },
  { title: 'Hora de finalización', dataIndex: 'end_date', key: 'end_date', render: (_: any, record: any) => moment(record.end_date).format('h:mm A') },
  {
    dataIndex: 'days',
    key: 'days',
    width: 100,
    children: DAYS_OF_WEEK.map(({ value }: any) => ({
      title: value,
      dataIndex: value,
      key: value,
      width: 20,
      render: (_: any, record: any) => record.days.includes(value) ? 'X' : ''
    }))
  },
];