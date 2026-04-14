import { supabase } from "../../../../../lib/supabaseClient";

export async function POST() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
        }

        return Response.json({ success: true, message: "Logged out" }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, error: err.message }, {status: 500})
    }
}