'use client'

import { Button, Card, Input, Select, Table } from 'antd'
import TeacherSelect from '../../components/teacher-select'
import { useGroupContext } from '../../context/group'
import { getStudent } from '../../api/students'
import { getBilling } from '../../api/billing'
import { useState } from 'react'

export const BillingTeachersScreen = () => {

  const { groups, handleFilterChange, loading } = useGroupContext()
  const [billings, setBillings] = useState<any>([])


  const handleGetUserGroup = (value: string) => {
    console.log(value)
    getStudent(value)
      .then(({ data }) => {
        handleFilterChange([['group', data.response.group]])
      })
      .catch((error) => {
        console.log(error)
      })
    getBilling(value)
      .then(({ data }) => {
        console.log(data)
        setBillings(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }



  return (
    <div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <h2 className="text-lg font-bold col-span-1 lg:col-span-4 text-center md:text-start">Historial sobre pagos de profesores</h2>
        <Card title="Seleccionar un Profesor" className="col-span-1 lg:col-span-4 p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex items-center">
              <TeacherSelect className="w-full" onChange={(_: string, value: any) => handleGetUserGroup(value.key)} />
            </div>
            <div className="flex items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">N° de telefono:</h2>
              <Input className="w-2/3 md:w-3/4" placeholder="N° de telefono" />
            </div>
            <div className="flex items-center justify-center">
              <Button type="primary" className="w-full md:w-auto">
                Enviar Recibo
              </Button>
            </div>
          </div>
        </Card>
        <Card title="Informacion del profesor seleccionado" className="col-span-1 lg:col-span-4">
          <Table
            scroll={{ x: 800 }}
          />
        </Card>
        <Card title='Detalle del recibo' className="col-span-1 lg:col-span-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
            <Table
              className="col-span-1 md:col-span-1"
              scroll={{ x: 200 }}
              pagination={{
                pageSize: 20
              }}
            />
            <Table
              className="col-span-1 md:col-span-3"
              scroll={{ x: 800 }}
            />
          </div>
        </Card>
        <h2 className="text-lg font-bold col-span-1 lg:col-span-4 text-center md:text-start">Registrar pagos de alumnos</h2>
        <Card className="col-span-1 lg:col-span-4 md:p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">N° de recibo:</h2>
              <Input className="w-2/3 md:w-3/4" placeholder="N° de recibo" />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Mes a pagar:</h2>
              <Select className="w-2/3 md:w-3/4" placeholder="Seleccionar un mes" />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Tipo de beca:</h2>
              <Select className="w-2/3 md:w-3/4" placeholder="Selecciona una beca" />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Forma de pago:</h2>
              <Select className="w-2/3 md:w-3/4" placeholder="Selecciona una forma de pago" />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Valor de la cuota:</h2>
              <Input className="w-2/3 md:w-3/4" placeholder="Ingresa el valor de la cuota" />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Entrego:</h2>
              <Input className="w-2/3 md:w-3/4" placeholder="Ingresa el valor que entrego" />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Debe:</h2>
              <Input className="w-2/3 md:w-3/4" placeholder="Ingresa el valor que debe" />
            </div>
            <div className="flex w-full justify-center md:col-span-2">
              <Button size="large" className="text-white" type="primary">
                Guardar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
