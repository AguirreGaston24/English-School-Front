import { Layout } from "antd"
import { Header, Sidebar } from "./"


interface MainLayoutProps {
  children: JSX.Element | JSX.Element[]
}

const { Content } = Layout

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <div className="flex flex-1 min-h-screen w-full">
        <Sidebar className="hidden lg:block pt-14 w-72" />
        <Content className="w-full pt-24 flex-1 space-y-4 p-4 md:px-8 overflow-hidden">
          {children}
        </Content>
      </div>
    </>
  )
}
