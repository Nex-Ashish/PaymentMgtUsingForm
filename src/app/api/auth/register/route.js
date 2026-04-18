import { supabase } from "../../../../../lib/supabaseClient";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return Response.json({ success: false, error: error.message });
    }

    const user = data.user;

    const { error: insertError } = await supabase.from("users").insert([
      {
        user_id: user.id,  
        name: name,
        email: email,
        // role: "user", 
      },
    ]);

    if (insertError) {
      return Response.json({ success: false, error: insertError.message });
    }

    return Response.json({ success: true, data: user });

  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}