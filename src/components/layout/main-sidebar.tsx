import { useLocation, useNavigate } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaUser  } from "react-icons/fa";
import { FaCircleDollarToSlot  } from "react-icons/fa6";
import { MdGroups  } from "react-icons/md";
import { IoIosSchool  } from "react-icons/io";
import {IoReceipt } from "react-icons/io5"
import {LuClipboardList } from "react-icons/lu"
import {FaRankingStar } from "react-icons/fa6"
import {FaBirthdayCake } from "react-icons/fa"
import {FaDoorClosed } from "react-icons/fa"
import { Menu } from 'antd'

import { cn } from '../../libs/utils'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    // setOpenMenu(false)
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
            icon: <FaUser  size={20} />,
            label: 'Alumnos',
            onClick: () => handleNavigate('/')
          },
          {
            key: '/profesoras',
            icon: <IoIosSchool  size={20} />,
            label: 'Profesoras',
            onClick: () => handleNavigate('/profesoras')
          },
          {
            key: '/grupos',
            icon: <MdGroups  size={20} />,
            label: 'Grupos',
            onClick: () => handleNavigate('/grupos')
          },
          {
            key: '/cuotas-alumnos',
            icon: <FaCircleDollarToSlot  size={20} />,
            label: 'Cuotas-Alumnos',
            onClick: () => handleNavigate('/cuotas-alumnos')
          },
          {
            key: '/pagos-profesores',
            icon: <FaCircleDollarToSlot size={20} />,
            label: 'Pagos-profesores',
            onClick: () => handleNavigate('/pagos-profesores')
          },
          {
            key: '/recibos-alumnos',
            icon: <IoReceipt  size={20} />,
            label: 'Recibos-alumnos',
            onClick: () => handleNavigate('/recibos-alumnos')
          },
          {
            key: '/listado-alumnos',
            icon: <LuClipboardList  size={20} />,
            label: 'Listado-alumnos',
            onClick: () => handleNavigate('/listado-alumnos')
          },
          {
            key: '/ranking',
            icon: <FaRankingStar  size={20} />,
            label: 'Ranking',
            onClick: () => handleNavigate('/ranking')
          },
          {
            key: '/cumpleaños-alumnos',
            icon: <FaBirthdayCake  size={20} />,
            label: 'Cumpleaños-alumnos',
            onClick: () => handleNavigate('/cumpleaños-alumnos')
          },
          {
            key: '/salir',
            icon: <FaDoorClosed  size={20} />,
            label: 'Salir',
            onClick: () => handleNavigate('/salir')
          },
        ]}
      />
    </nav>
  )
}
