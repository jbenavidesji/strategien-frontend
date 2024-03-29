export async function getAllNotifications() {
    try {
        const response = await fetch("http://localhost:5000/notifications");
        return await response.json();
    } catch (err) {
        return console.error(err.message);
    }
}