import BirthDateForm from "@/components/user-settings/birth-date-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: '设置 | Time is Life',
  description: '调整您的个人设置和偏好',
}

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-2">
          设置
        </h1>
        <p className="text-muted-foreground">
          调整您的个人设置和偏好
        </p>
      </section>
      
      <div className="grid md:grid-cols-2 gap-6">
        <BirthDateForm />
        
        <Card>
          <CardHeader>
            <CardTitle>关于 Time is Life</CardTitle>
            <CardDescription>
              当前版本: 1.0.0
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Time is Life 是一款帮助您意识并珍惜时间的应用程序。通过生命倒计时、目标管理和日志记录，让您更好地利用时间，关注生命中真正重要的事物。
            </p>
            
            <div>
              <h3 className="font-medium mb-2">主要功能:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>生命倒计时显示 - 以多种方式查看生命进度</li>
                <li>时间目标管理 - 为重要事件创建倒计时</li>
                <li>时间日志 - 记录每日反思和感悟</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">导出数据</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>未来功能</CardTitle>
          <CardDescription>
            即将推出的功能和改进
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>轻量社交广场 - 分享时间感悟</li>
            <li>时间资产账户 - 记录时间投资方向</li>
            <li>AI 情绪分析 - 自动分析日志情绪</li>
            <li>深色模式支持</li>
            <li>更多统计图表和年度报告</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 