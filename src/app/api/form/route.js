import { supabase } from "../../../../lib/supabaseClient";

// POST form Api
export async function POST(req) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
                            .from("form_data")
                            .insert([body]);

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
