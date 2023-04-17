////////////////////////////////////////////////////////////////////////////////
// Scroll animation
////////////////////////////////////////////////////////////////////////////////

const on_scroll_elements = [...document.querySelectorAll("[data-on-scroll]")];
window.addEventListener("scroll", show_on_scroll);
window.addEventListener("resize", show_on_scroll);
show_on_scroll();

function show_on_scroll() {
    for(let el of on_scroll_elements) {
        const isAboveThreshold = (el.getBoundingClientRect().top / window.innerHeight) < 0.75;
        if (isAboveThreshold) {
            el.classList.add(el.dataset.onScroll);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// Navigation
////////////////////////////////////////////////////////////////////////////////

const nav = document.querySelector("nav");

const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle("is-stuck", e.intersectionRatio < 1),
    { threshold: [1], },
);
observer.observe(nav);

nav.addEventListener("click", function() {
    nav.classList.remove("is-open");
});

const nav_toggle = nav.querySelector(".nav__toggle");
nav_toggle.addEventListener("click", function(e) {
    e.stopPropagation();
    nav.classList.toggle("is-open");
});

////////////////////////////////////////////////////////////////////////////////
// Tagline
////////////////////////////////////////////////////////////////////////////////

import { parse_grammar } from "./grammar.js";

let generate_phrase;
const tagline = document.querySelector("#tagline-container");
const current_tag = tagline.querySelector("#tagline");
const old_tag = tagline.querySelector("#old-tagline");

init_tagline();

async function init_tagline() {
    try {
        const response = await window.fetch("/grammar.json");
        const grammar_spec = await response.json();

        generate_phrase = parse_grammar(grammar_spec);
        current_tag.childNodes[0].textContent = generate_phrase();
        
        const button = tagline.querySelector("button");
        button.addEventListener("click", refresh_tagline);
        tagline.addEventListener("click", refresh_tagline);

        tagline.classList.add("is-ready");
    }
    catch(e) {
        console.error("Failed to initialize tagline", e);
    }
}

function refresh_tagline() {
    if (!generate_phrase || tagline.dataset.animState !== "idle") return;

    const phrase = generate_phrase();
    tagline.dataset.animState = "before";
    old_tag.childNodes[0].textContent = current_tag.childNodes[0].textContent;
    current_tag.childNodes[0].textContent = phrase;
    
    window.setTimeout(() => {
        
        tagline.dataset.animState = "play";
        window.setTimeout(() => {
            tagline.dataset.animState = "idle";
        }, 500);

    });
}

////////////////////////////////////////////////////////////////////////////////
// Theme
////////////////////////////////////////////////////////////////////////////////

const theme_toggle = document.querySelector("#theme-toggle");
const theme_icon = theme_toggle.querySelector("i");
update_theme_toggle();
theme_toggle.addEventListener("click", function(e) {
    e.stopPropagation();
    toggle_theme();
});
theme_toggle.classList.add("is-ready");

function update_theme_toggle() {
    const is_dark_theme = window.theme === "dark";

    theme_icon.classList.toggle("fa-sun", !is_dark_theme);
    theme_icon.classList.toggle("fa-moon", is_dark_theme);

    if (is_dark_theme) {
        theme_toggle.title = "Switch to light theme";
    }
    else {
        theme_toggle.title = "Switch to dark theme";
    }
}

function toggle_theme() {
    const is_dark_theme = window.theme === "dark";

    if(is_dark_theme) {
        window.theme = "light";
    }
    else {
        window.theme = "dark";
    }
    localStorage.setItem("theme", window.theme);

    document.documentElement.classList.toggle("force-light", is_dark_theme);
    document.documentElement.classList.toggle("force-dark", !is_dark_theme);

    update_theme_toggle();
}
