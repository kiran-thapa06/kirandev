// Ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");
    const greetingElement = document.getElementById("greeting");
    const clockElement = document.getElementById("clock");

    // Toggle navbar visibility
    hamburger.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    // Close navbar when clicking outside
    document.addEventListener("click", (event) => {
        if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
            navbar.classList.remove("active");
        }
    });

    // Update greeting based on time of day
    const updateGreeting = () => {
        const hour = new Date().getHours();
        let message = hour < 12 ? "Good Morning! ☀️"
                    : hour < 18 ? "Good Afternoon! 🌤️"
                    : "Good Evening! 🌙";
        greetingElement.textContent = message;
    };

    // Update clock every second
    const updateClock = () => {
        const now = new Date();
        const formatTime = (time) => (time < 10 ? "0" : "") + time;

        clockElement.textContent = `${formatTime(now.getHours())}:${formatTime(now.getMinutes())}:${formatTime(now.getSeconds())}`;
    };

    // Initialize content
    updateGreeting();
    updateClock();
    setInterval(updateClock, 1000);
});
