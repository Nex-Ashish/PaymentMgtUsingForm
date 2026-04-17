import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabaseClient";

export async function POST() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
        }

        const response = NextResponse.json(
            { success: true, message: "Logged out" },
            { status: 200 }
        );

        response.cookies.set("token", "", {
            path: "/",
            expires: new Date(0), 
        });

        return response;

        // return Response.json({ success: true, message: "Logged out" }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, error: err.message }, {status: 500})
    }
}