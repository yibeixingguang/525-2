import LogForm from "@/components/time-logs/log-form"
import LogList from "@/components/time-logs/log-list"

export const metadata = {
  title: '时间日志 | Time is Life',
  description: '记录每一天的感受与收获，反思时间的使用',
}

export default function LogsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-2">
          时间日志
        </h1>
        <p className="text-muted-foreground">
          记录每一天的感受与收获，通过回顾反思更好地利用时间
        </p>
      </section>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <LogForm />
        <LogList />
      </div>
    </div>
  )
} 