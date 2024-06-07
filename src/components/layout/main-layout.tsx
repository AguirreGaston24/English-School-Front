import { Drawer, Layout } from "antd"

import { Header, Sidebar } from "./"
import { useUiContext } from "../../context/ui"
import { TeacherProvider } from "../../context/teacher"


interface MainLayoutProps {
  children: JSX.Element | JSX.Element[]
}

const { Content } = Layout

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { openMenu, setOpenMenu } = useUiContext()

  return (
    <TeacherProvider>
      <Header />
      <Drawer
        classNames={{ body: '!p-0' }}
        onClose={() => setOpenMenu(!openMenu)}
        closable={false}
        placement='left'
        open={openMenu}
      >
        <Sidebar className='h-full' />
      </Drawer>
      <div className="flex flex-1 min-h-screen w-full">
        {/* <Sidebar className="hidden xl:block pt-14 w-72" /> */}
        <Content className="w-full pt-24 flex-1 space-y-4 p-4 md:px-8 overflow-hidden">
          {children}
        </Content>
      </div>
    </TeacherProvider>
  )
}
