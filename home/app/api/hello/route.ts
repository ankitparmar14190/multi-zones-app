import { NextResponse } from "next/server"
 
export const GET = ()=>{
    return new NextResponse("This is a simple Hello World API in next JS");
}