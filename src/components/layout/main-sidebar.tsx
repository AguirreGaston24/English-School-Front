import { useLocation, useNavigate } from "react-router-dom";
import { IoIosSchool } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { Menu } from 'antd';

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
            key: '/billing-students',
            icon: <GiReceiveMoney size={20} />,
            label: 'Pagos Alumnos',
            onClick: () => handleNavigate('/billing-students')
          },
          {
            key: '/billing-teachers',
            icon: <GiReceiveMoney size={20} />,
            label: 'Pagos Profesores',
            onClick: () => handleNavigate('/billing-teachers')
          },
        ]}
      />
    </nav>
  )
}
