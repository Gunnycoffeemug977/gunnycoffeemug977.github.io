const supabaseUrl = "https://wzjlytqilsjcboqpwldz.supabase.co/";
const supabaseKey = "sb_publishable_Nyt-q7qFiYGd7aV25sgGuQ_yk-1gHxN";

const db = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

async function testConnection() {

    const { data, error } = await db
        .from("appointments")
        .select("*");

    console.log(data);
    console.log(error);

}

testConnection();
