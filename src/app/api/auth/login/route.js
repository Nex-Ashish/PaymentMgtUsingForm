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

        return Response.json({ success: true, user: data.user }, { status: 200 })
        
    } catch (error) {
        return Response.json({ success: false, error: error.message }, {status: 500})
    }
}
