import { ColumnsType } from "antd/es/table";
import { Becas } from "../../../interfaces/becas";



export const BECAS_COLUMNS: ColumnsType<Becas> = [
  {
    title: 'Nombre de la Beca',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Precio',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => `$${price}`, // Opcional: formato para mostrar el precio
  },
  {
    title: 'Acciones',
    dataIndex: 'action',
    key: 'action',
  },
];