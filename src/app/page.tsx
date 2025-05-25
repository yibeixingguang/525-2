import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LinearLifeProgress from "@/components/life-countdown/linear-progress"
import CircularLifeProgress from "@/components/life-countdown/circular-progress"
import DigitalCounter from "@/components/life-countdown/digital-counter"
import BirthDateForm from "@/components/user-settings/birth-date-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-2">
          时间即生命，珍惜当下每一刻
        </h1>
        <p className="text-xl text-muted-foreground">
          生命不息，时间不止，让我们更好地意识并珍视流逝的时光
        </p>
      </section>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>生命进度</CardTitle>
          <CardDescription>
            基于您的出生日期和预期寿命，了解生命旅程已走过的时光
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="linear" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="linear">线性进度条</TabsTrigger>
              <TabsTrigger value="circular">环形图表</TabsTrigger>
              <TabsTrigger value="digital">数字计时器</TabsTrigger>
            </TabsList>
            <TabsContent value="linear">
              <LinearLifeProgress />
            </TabsContent>
            <TabsContent value="circular">
              <CircularLifeProgress />
            </TabsContent>
            <TabsContent value="digital">
              <DigitalCounter />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <BirthDateForm />
        
        <Card>
          <CardHeader>
            <CardTitle>关于时间</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              "昨天是一张作废的支票，明天是一张期票，只有今天是你可以兑现的现金。"
              <footer className="text-right mt-2 text-sm">— 卡耐基</footer>
            </blockquote>
            
            <ul className="mt-6 space-y-2 list-disc list-inside text-muted-foreground">
              <li>每个人平均有约 27,375 天的生命</li>
              <li>每天有 86,400 秒，每周有 10,080 分钟</li>
              <li>时间是唯一无法挽回的资源</li>
              <li>意识到时间的流逝，才能真正珍惜现在</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 