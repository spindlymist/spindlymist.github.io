(function() {
    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.documentElement.classList.add("force-dark");
    }
    else if (theme === "light") {
        document.documentElement.classList.add("force-light");
    }
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        theme = "dark";
    }
    else {
        theme = "light";
    }

    window.theme = theme;
})();
