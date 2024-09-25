import { ColumnsType } from "antd/es/table";
import { Becas } from "../../../interfaces/becas";

export const BECAS_COLUMNS: ColumnsType<Becas> = [
  {
    title: 'Nombre de la Beca',
    dataIndex: 'name', // Asegúrate de que coincida con el campo "name" en el array de becas
    key: 'name',
  },
  {
    title: 'Precio',
    dataIndex: 'price', // Asegúrate de que coincida con el campo "price"
    key: 'price',
    render: (value: number) => `$${value}`, // Opcional: muestra el precio con formato
  },
  {
    title: 'Acciones',
    key: 'action',
  },
];