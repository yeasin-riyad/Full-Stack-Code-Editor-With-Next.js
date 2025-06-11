"use client";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import AxiosPublic from "@/lib/AxiosPublic";
import { ArrowLeft, Database, Play } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import UpdateProject from "./UpdateProject";
import { useEditorContext } from "../_provider/EditorProvider";
import { cn } from "@/lib/utils";

const EditorHeader = () => {
  const session = useSession();
  const router = useRouter();
  const { projectId} = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
   const {isLoading:editorUpdateLoading}=useEditorContext()
  
  const [data, setData] = useState({
    name: "",
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await AxiosPublic({
        url: "/project",
        params: {
          projectId,
        },
      });

      if (response.status === 201) {
        setData(response.data.data[0]);
      }
    } catch (e) {
      toast.error(e?.response.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  return (
    <header className="bg-white h-14 sticky top-0 z-40 flex items-center px-4">
      {/* Left Side */}
      <div className="flex items-center max-w-sm gap-4">
        <Button
          className="cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft />
        </Button>

        <h2 className="font-semibold">
          {isLoading ? (
            <span className="text-slate-300">Loading...</span>
          ) : (
            <div className="flex items-center gap-1 group">
              <span>
              {data?.name ?? "--"}
              </span>
              <UpdateProject fetchData={fetchData} projectId={projectId as string} name={data?.name}/>
            </div>
          )}
        </h2>

        <div className={cn("flex items-center gap-1 opacity-100",
          editorUpdateLoading && "animate-pulse opacity-30"
        )}>
          <Database size={16} />
          {editorUpdateLoading ? "Saving.....":"Save"}
        </div>
      </div>

      {/* Right Side */}
      <div className="ml-auto w-fit flex items-center gap-6">
        <div className="bg-primary/70 hover:bg-primary/90 p-1 cursor-pointer rounded-full">
          <Play />
        </div>
        <UserAvatar user={session?.data?.user} />
      </div>
    </header>
  );
};

export default EditorHeader;
