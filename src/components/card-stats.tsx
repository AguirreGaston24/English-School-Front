import { Card, Spin } from 'antd'
import { Link } from 'react-router-dom'

interface CardStatsProps {
  count: number
  title: string
  description: string
  loading: boolean
  icon: JSX.Element
  path: string
  value: number;
  color?: string;
}

export const CardStats = ({ count, description, icon, loading, title, path }: CardStatsProps) => {
  return (
    <Link to={path}>
      <Card className="shadow-md">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-xl font-medium">
            {title}
          </div>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold">{loading ? <Spin /> : count}</div>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </Card>
    </Link>
  )
}
