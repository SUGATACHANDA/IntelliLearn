import getDashboardCourses from "@/actions/get-dashboard-courses";
import CourseList from "@/components/courses-list";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import InfoCard from "./_components/info-card";


export default async function Home() {
  const { userId } = auth()
  if (!userId) {
    return redirect("/")
  }

  const { completedCourses, coursesinProgress } = await getDashboardCourses(userId)
  return (
    <>
      <title>Student Dashboard | IntelliLearn</title>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <InfoCard
            icon={Clock}
            label="In Progress"
            numberOfItems={coursesinProgress.length}
          />
          <InfoCard
            icon={CheckCircle}
            label="Completed"
            numberOfItems={completedCourses.length}
          />


        </div>
        <CourseList
          items={[...coursesinProgress, ...completedCourses]}
        />
      </div>
    </>
  );
}
