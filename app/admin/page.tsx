import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { getImages, getProjects, getTechStacts } from "./_actions/GetStats";
import { formatNumber } from "@/lib/utils";

const Dashboard = async () => {
  const [projectCount, techStacksCount, imagesCount] = await Promise.all([
    getProjects(),
    getTechStacts(),
    getImages(),
  ]);
  return (
    <div className="container flex flex-col h-screen">
      <div className="text-3xl">Welcome to your dashboard!</div>
      <div className="items-center mt-10 mx-24 max-w-full justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <DashboardCard
          title="Projects"
          body={"000 Found"}
          subtitle={`${formatNumber(projectCount)} Projects`}
        />
        {/* <DashboardCard title="" subtitle={""} body={""} /> */}
        <DashboardCard
          title="Images"
          subtitle={`${formatNumber(imagesCount)} Images`}
          body={"000 Found"}
        />
        <DashboardCard
          title="Tech Stacks"
          body={"000 Found"}
          subtitle={`${formatNumber(techStacksCount)} Languages`}
        />
      </div>
    </div>
  );
};
interface DashboardCardProps {
  title: string;
  subtitle: string;
  body: string;
}
export default Dashboard;
function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card className="w-full bg-black-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold leading-6 text-white-100">{body}</p>
      </CardContent>
    </Card>
  );
}
