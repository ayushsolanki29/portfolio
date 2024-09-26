"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { formatNumber } from "@/lib/utils";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projectCount: 0,
    techStacksCount: 0,
    imagesCount: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/stats");
        console.log("API Response:", response.data); // Log response

        if (response.data.success) {
          setStats({
            projectCount: response.data.stats.projects || 0,
            techStacksCount: response.data.stats.techStacks || 0,
            imagesCount: response.data.stats.images || 0,
            contacts: response.data.stats.contacts || 0,
          });
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container flex flex-col h-screen">
      <div className="text-3xl">Welcome to your dashboard!</div>
      <div className="items-center mt-10 mx-24 max-w-full justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <DashboardCard
          title="Projects"
          subtitle={""}
          body={`${formatNumber(stats.projectCount)} Projects`}
        />
        <DashboardCard
          title="Images"
          body={`${formatNumber(stats.imagesCount)} Images`}
          subtitle={""}
        />
        <DashboardCard
          title="Tech Stacks"
          subtitle={""}
          body={`${formatNumber(stats.techStacksCount)} Languages`}
        />
        <DashboardCard
          title="Contact Submissions"
          subtitle={""}
          body={`${formatNumber(stats.contacts)} Submissions`}
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

export default Dashboard;
