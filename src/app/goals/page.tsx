import GoalForm from "@/components/time-goals/goal-form"
import GoalList from "@/components/time-goals/goal-list"

export const metadata = {
  title: '时间目标 | Time is Life',
  description: '设定您的时间目标，珍惜生命中的每一个重要节点',
}

export default function GoalsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-2">
          设定时间目标
        </h1>
        <p className="text-muted-foreground">
          为生命中的重要时刻创建倒计时，提醒自己珍惜每一个里程碑
        </p>
      </section>
      
      <div className="grid md:grid-cols-2 gap-6">
        <GoalForm />
        <GoalList />
      </div>
    </div>
  )
} 