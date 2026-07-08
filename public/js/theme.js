const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

updateIcon();

if (themeToggle) {

    themeToggle.addEventListener("click", function (e) {

        e.preventDefault();

        document.body.classList.toggle("light-theme");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("light-theme")
                ? "light"
                : "dark"
        );

        updateIcon();

    });

}

function updateIcon() {

    if (!themeToggle) return;

    themeToggle.innerHTML =
        document.body.classList.contains("light-theme")
            ? "🌞"
            : "🌙";

}