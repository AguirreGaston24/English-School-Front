import { useLocation, useNavigate } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineComputer } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { BiCategory } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
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
            icon: <MdOutlineComputer size={20} />,
            label: 'Tablero Operativo',
            onClick: () => handleNavigate('/')
          },
          {
            key: '/products',
            icon: <BsBoxSeam size={20} />,
            label: 'Productos',
            onClick: () => handleNavigate('/products')
          },
          {
            key: '/categories',
            icon: <BiCategory size={20} />,
            label: 'Categorías',
            onClick: () => handleNavigate('/categories')
          },
          {
            key: '/opciones',
            icon: <TfiMenuAlt size={20} />,
            label: 'Opciones',
            onClick: () => handleNavigate('/options')
          },
          {
            key: '/users',
            icon: <RiUserSettingsLine size={20} />,
            label: 'Usuarios',
            onClick: () => handleNavigate('/users')
          }
        ]}
      />
    </nav>
  )
}
