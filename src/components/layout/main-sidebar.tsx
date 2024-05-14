import { useLocation, useNavigate } from "react-router-dom";
import { FaBirthdayCake, FaHome } from "react-icons/fa"
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu"
import { FaRankingStar } from "react-icons/fa6"
import { IoIosSchool } from "react-icons/io";
import { IoReceipt } from "react-icons/io5"
import { MdGroups } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Menu } from 'antd'

import { useUiContext } from "../../context/ui";
import { cn } from '../../libs/utils'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { setOpenMenu } = useUiContext()
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    setOpenMenu(false)
    navigate(path)
  }

  return (
    <nav
      className={cn(className)}
    >
      <Menu
        mode="inline"
        className="h-full pt-6"
        defaultSelectedKeys={[location.pathname]}
        items={[
          {
            key: '/',
            icon: <FaHome size={20} />,
            label: 'Inicio',
            onClick: () => handleNavigate('/')
          },
          {
            key: '/students',
            icon: <FaUser size={20} />,
            label: 'Alumnos',
            onClick: () => handleNavigate('/students')
          },
          {
            key: '/teachers',
            icon: <IoIosSchool size={20} />,
            label: 'Profesoras',
            onClick: () => handleNavigate('/teachers')
          },
          {
            key: '/groups',
            icon: <MdGroups size={20} />,
            label: 'Grupos',
            onClick: () => handleNavigate('/groups')
          },
          {
            key: '/assists',
            icon: <FaCircleDollarToSlot size={20} />,
            label: 'Asistencias',
            onClick: () => handleNavigate('/assists')
          },
          {
            key: '/pagos-profesores',
            icon: <FaCircleDollarToSlot size={20} />,
            label: 'Pagos Profesores',
            onClick: () => handleNavigate('/pagos-profesores')
          },
          {
            key: '/recibos-alumnos',
            icon: <IoReceipt size={20} />,
            label: 'Recibos Alumnos',
            onClick: () => handleNavigate('/recibos-alumnos')
          },
          {
            key: '/listado-alumnos',
            icon: <LuClipboardList size={20} />,
            label: 'Listado Alumnos',
            onClick: () => handleNavigate('/listado-alumnos')
          },
          {
            key: '/ranking',
            icon: <FaRankingStar size={20} />,
            label: 'Ranking',
            onClick: () => handleNavigate('/ranking')
          },
          {
            key: '/cumpleaños-alumnos',
            icon: <FaBirthdayCake size={20} />,
            label: 'Cumpleaños Alumnos',
            onClick: () => handleNavigate('/cumpleaños-alumnos')
          },
        ]}
      />
    </nav>
  )
}
