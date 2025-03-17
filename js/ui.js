////////////////////////////////////////////////////////////////////////////////
// Email
////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll("[data-mailto]").forEach(a => {
    a.href = "mailto:" + a.dataset.mailto
        .split('@')
        .map(s => s.split('').reverse().join(''))
        .join('@');
    a.title = "";
});

////////////////////////////////////////////////////////////////////////////////
// Navigation
////////////////////////////////////////////////////////////////////////////////

const nav = document.querySelector("nav");

const nav_observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle("is-stuck", e.intersectionRatio < 1),
    { threshold: [1], },
);
nav_observer.observe(nav);

window.addEventListener("resize", function() {
    if (window.innerWidth > 720) {
        window.MicroModal.close("modal-nav");
    }
});

window.MicroModal.init({
    onShow: () => {
        nav.classList.add("is-open")
    },
    onClose: () => {
        nav.classList.remove("is-open");
    },
});

////////////////////////////////////////////////////////////////////////////////
// Theme
////////////////////////////////////////////////////////////////////////////////

const theme_toggles = [...document.querySelectorAll(".theme-toggle")];
update_theme_toggles();
for (const theme_toggle of theme_toggles) {
    theme_toggle.addEventListener("click", function(_) {
        window.Theme.toggle();
        update_theme_toggles();
    });
    theme_toggle.classList.add("is-ready");
}

function update_theme_toggles() {
    const is_dark_theme = window.Theme.current === window.Theme.DARK;
    const label = is_dark_theme ? "Switch to light theme" : "Switch to dark theme";

    for (const theme_toggle of theme_toggles) {
        theme_toggle.title = label;
        theme_toggle.ariaLabel = label;
        theme_toggle.dataset.theme = window.Theme.current;
    }
}

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
