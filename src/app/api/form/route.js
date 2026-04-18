import { cookies } from "next/headers";
import { supabase } from "../../../../lib/supabaseClient";

// POST form Api
export async function POST(req) {
  try {
    // const { data: { user } } = await supabase.auth.getUser();

    const cookieStore = await cookies();

    // console.log(typeof cookieStore); 
    // console.log(cookieStore.getAll()); 

    const token = cookieStore.get('token')?.value
    if (!token) {
      return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const user_id = payload.sub;
    // console.log(user_id,'user-id')

    const body = await req.json();

    // const { data, error } = await supabase
    //                         .from("form_data")
    //                         .insert([body]);

    const { data, error } = await supabase
                                  .from("form_data")
                                  .insert([
                                    {
                                      ...body,
                                      user_id: user_id 
                                    }
                                  ]);

    if (error) {
      return Response.json( { success: false, error: error.message }, { status: 500 } );
    }

    return Response.json( { success: true, data }, { status: 201 } );
  } catch (err) {
    return Response.json( { success: false, error: err.message }, { status: 500 } );
  }
}

// GET form Api
export async function GET() {
  try {
    const { data, error } = await supabase
                            .from("form_data")
                            .select("*");

    if (error) {
      return Response.json( { success: false, error: error.message }, { status: 500 } );
    }

    return Response.json( { success: true, data }, { status: 200 } );

  } catch (err) {
    return Response.json( { success: false, error: err.message }, { status: 500 } );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json()
     const { id, ...formData } = body
    const { data, error } = await supabase.from('form_data')
                                          .update(formData)
                                          .eq("id", id)
                                          .select()
    
    if (error) {
      return Response.json( { success: false, error: error.message }, { status: 500 } );
    }
    
    return Response.json( { success: true, data }, { status: 201 } );
  } catch (error) {
    return Response.json( { success: false, error: err.message }, { status: 500 } );
  }
}