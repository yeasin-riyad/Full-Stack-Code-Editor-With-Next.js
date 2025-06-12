"use client";
import AxiosPublic from "@/lib/AxiosPublic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CreateProject from "./_component/CreateProject";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [page] = useState(1);
  const [, setTotalPage] = useState(1);
  const router = useRouter();
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await AxiosPublic({
        url: "/project",
        params: {
          page,
        },
      });

      if (response.status === 201) {
        setData(response.data.data || []);
        setTotalPage(response?.data.totalPages || 1);
      }
    } catch (e) {
      toast.error(e?.response.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectToEditorPage = async (projectId: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_BASE_URL}/editor/${projectId}/?file=index.html`
    );
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      {isLoading ? (
        <p className="my-4 w-fit mx-auto">Loading.......</p>
      ) : (
        <>
          {Array.isArray(data) && data.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2 p-4 lg:p-6">
              {data?.map((item) => {
                return (
                  <Card
                    onClick={() => handleRedirectToEditorPage(item?._id)}
                    key={item?._id}
                    className="cursor-pointer overflow-hidden group max-h-60"
                  >
                    <CardHeader>
                      <CardTitle>{item?.name}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="border min-h-60 overflow-hidden rounded-lg top-15 group-hover:top-4 transition-all relative shadow drop-shadow-2xl ">
                        <iframe
                          className="w-full h-full rounded-md"
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/file/${item?._id}/index.html`}
                        ></iframe>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[calc(100vh-3rem)]  flex-col items-center justify-center">
              <Image
                src={"/project.svg"}
                width={300}
                height={300}
                alt="Create Project"
              />
              <p className="text-gray-500 my-4">
                Create Project Effortlessly With Our Intuitive Editor
              </p>
              <CreateProject buttonVariant="default" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
