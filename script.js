const PROJECT_URL = "https://wzjlytqilsjcboqpwldz.supabase.co/";
const PUBLISHABLE_KEY = "sb_publishable_Nyt-q7qFiYGd7aV25sgGuQ_yk-1gHxN";

const client = window.supabase.createClient(
    PROJECT_URL,
    PUBLISHABLE_KEY
);

async function loadAppointments() {
    const { data, error } = await client
        .from("appointments")
        .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);
}

loadAppointments();

/*
async function loadAppointments() {

    const { data, error } = await client
        .from("appointments")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    console.log(data);

    const container = document.getElementById("appointments");

    container.innerHTML = "";

    data.forEach(slot => {

        container.innerHTML += `
            <p>${slot.date} | ${slot.time}</p>
        `;

    });

}

loadAppointments();
*/
