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

    const container = document.getElementById("dates");
    container.innerHTML = "";


    // 3. Create a checkbox for each available appointment
    data.forEach(slot => {

        const option = document.createElement("div");

        if (slot.booked) {
            option.innerHTML = `
                <label>
                    <input type="checkbox" disabled>
                    ${slot.date} ${slot.time} (Booked)
                </label>
            `;
        } else {
            option.innerHTML = `
                <label>
                    <input type="checkbox" value="${slot.id}">
                    ${slot.date} ${slot.time}
                </label>
            `;

            const checkbox = option.querySelector("input");

            checkbox.onchange = async () => {

                if (checkbox.checked) {

                    const { error } = await client
                        .from("appointments")
                        .update({ booked: true })
                        .eq("id", slot.id);

                    if (error) {
                        console.error(error);
                    } else {
                        loadAppointments();
                    }
                }

            };
        }

        container.appendChild(option);
    });
}


// 4. Run when page loads
loadAppointments();
