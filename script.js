// 1. Connect to Supabase
const PROJECT_URL = "https://wzjlytqilsjcboqpwldz.supabase.co/";
const PUBLISHABLE_KEY = "sb_publishable_Nyt-q7qFiYGd7aV25sgGuQ_yk-1gHxN";

const client = window.supabase.createClient(
    PROJECT_URL,
    PUBLISHABLE_KEY
);

// 2. Function to load appointments
async function loadAppointments() {

    const { data, error } = await client
        .from("appointments")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    const container = document.getElementById("appointments");
    container.innerHTML = "";

    // 3. Create a button for each appointment
    data.forEach(slot => {

        const button = document.createElement("button");

        if (slot.booked) {
            button.textContent = `${slot.date} ${slot.time} (Booked)`;
            button.disabled = true;
        } else {
            button.textContent = `${slot.date} ${slot.time}`;

            // When this appointment is clicked...
            button.onclick = async () => {

                const { error } = await client
                    .from("appointments")
                    .update({ booked: true })
                    .eq("id", slot.id);

                if (error) {
                    console.error(error);
                } else {
                    loadAppointments(); // Refresh the page
                }
            };
        }

        container.appendChild(button);
    });
}

// 4. Run the function when the page loads
loadAppointments();
