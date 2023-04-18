window.Theme = {
    DARK: "dark",
    LIGHT: "light",

    current: "light",
    listeners: [],

    init: function() {
        const preference = localStorage.getItem("theme");

        if (preference === this.DARK) {
            this.current = preference;
            document.documentElement.classList.add("force-dark-theme");
        }
        else if (preference === this.LIGHT) {
            this.current = preference;
            document.documentElement.classList.add("force-light-theme");
        }
        else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            this.current = this.DARK;
        }
        else {
            this.current = this.LIGHT;
        }
    },

    toggle: function() {
        if (this.current === this.DARK) {
            this.current = this.LIGHT;
        }
        else {
            this.current = this.DARK;
        }
        localStorage.setItem("theme", this.current);

        const is_dark_theme = (this.current === this.DARK);
        document.documentElement.classList.toggle("force-light-theme", !is_dark_theme);
        document.documentElement.classList.toggle("force-dark-theme", is_dark_theme);

        for (let listener of this.listeners) {
            listener(this.current);
        }

        return this.current;
    },

    add_listener: function(listener) {
        this.listeners.push(listener);
    },

    remove_listener: function(listener) {
        const idx = this.listeners.indexOf(listener);
        if (idx >= 0) {
            this.listeners.splice(idx, 1);
        }
    }
};

Theme.init();
