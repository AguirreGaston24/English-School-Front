import { Avatar, Dropdown, MenuProps, Switch } from 'antd';
import { MdMenu } from 'react-icons/md'

import { useAuthContext } from '../../context/auth';
import { useTheme } from '../../context/theme';
import { useUiContext } from '../../context/ui';

type Theme = 'dark' | 'light';

export const Header = () => {
  const { user, handleLogout } = useAuthContext()
  const { setOpenMenu } = useUiContext()
  const { setTheme } = useTheme();


  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      type: 'group',
      label: user?.email ?? "",
      children: [
        {
          key: '2',
          label: 'Cerrar Sesion',
          onClick: handleLogout
        },
      ],
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center">
          <div
            className="block cursor-pointer mr-4"
            onClick={() => setOpenMenu(true)}
          >
            <MdMenu size={24} />
          </div>
          <img className="w-10" src='assets/placeholder.jpg' alt="Logo del Instituto" />
        </div>
        <div className="flex items-center gap-2">
          <Dropdown menu={{ items }}>
            <Avatar>
              {user?.username.charAt(0).toUpperCase()}
            </Avatar>
          </Dropdown>
          <Switch onChange={(e) => handleThemeChange(e ? 'dark' : 'light')} />
        </div>
      </nav>
    </div>
  )
}
