import { connectDB } from "@/config/connectDB";
import { authOptions } from "@/lib/authOptions";
import { ProjectModel } from "@/models/ProjectModel";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try{
        const session=await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({
                error:"Unauthorized Access"
            },{status:401})
        }
        await connectDB();
        const recentProjects= await ProjectModel.find({
            userId:session.user.id
        }).sort({updatedAt:-1}).limit(10);

       return  NextResponse.json({
            message:"Recent Projects",
            data:recentProjects
        },{status:201})

    }catch(error:any){
            return NextResponse.json({
                error:error.message || "Internel server Error"
            },{status:500})
        }
    
}