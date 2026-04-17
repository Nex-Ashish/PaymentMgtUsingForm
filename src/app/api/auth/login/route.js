import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabaseClient";

export async function POST(req){
    try {
        const {email, password} = await req.json();
        const { data, error } = await supabase.auth.signInWithPassword({
            email, password
        })
        if(error){
            return Response.json({ success: false, error: error.message }, {status: 401})
        }
        const token = data?.session?.access_token;
        const response = NextResponse.json(
          { success: true, user: data.user },
          { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true, 
            path: "/",
            maxAge: 60 * 60,
        });

        return response;

        // return Response.json({ success: true, user: data.user, session: data.session }, { status: 200 })
        
    } catch (error) {
        return Response.json({ success: false, error: error.message }, {status: 500})
    }
}
