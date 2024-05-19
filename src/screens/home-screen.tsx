import { Card } from 'antd'
import { PiStudentBold } from "react-icons/pi";

export const HomeScreen = () => {
  return (
    <div className='space-y-4'>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-xl font-medium">
              Alumnos
            </div>
            <PiStudentBold size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Todos los alumnos registrados
            </p>
          </div>
        </Card>
        <Card className="shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-xl font-medium">
              Alumnos
            </div>
            <PiStudentBold size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Todos los alumnos registrados
            </p>
          </div>
        </Card>
        <Card className="shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-xl font-medium">
              Alumnos
            </div>
            <PiStudentBold size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Todos los alumnos registrados
            </p>
          </div>
        </Card >
        <Card className="shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-xl font-medium">
              Alumnos
            </div>
            <PiStudentBold size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Todos los alumnos registrados
            </p>
          </div>
        </Card>
      </div>
    </div >
  )
}
