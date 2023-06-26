////////////////////////////////////////////////////////////////////////////////
// Email
////////////////////////////////////////////////////////////////////////////////

const contact_link = document.querySelector("#contact-link");
contact_link.href = "mailto:" + "nibor@su.llennoconibor"
    .split('@')
    .map(s => s.split('').reverse().join(''))
    .join('@');
contact_link.title = "";

////////////////////////////////////////////////////////////////////////////////
// Navigation
////////////////////////////////////////////////////////////////////////////////

const nav = document.querySelector("nav");
const nav_toggle = nav.querySelector(".nav__toggle");
const nav_mobile = nav.querySelector(".nav__mobile");
let is_nav_open = false;

const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle("is-stuck", e.intersectionRatio < 1),
    { threshold: [1], },
);
observer.observe(nav);

nav.addEventListener("click", close_nav);
window.addEventListener("resize", function() {
    if (is_nav_open && window.innerWidth > 720) {
        close_nav();
    }
});

nav_toggle.addEventListener("click", function(e) {
    e.stopPropagation();
    toggle_nav();
});

function close_nav() {
    is_nav_open = false;
    nav.classList.remove("is-open");
    update_body_spacing();
}

function toggle_nav() {
    is_nav_open = !is_nav_open;
    nav.classList.toggle("is-open", is_nav_open);
    update_body_spacing();
}

function update_body_spacing() {
    if (is_nav_open) {
        const height = nav_mobile.offsetHeight + 2; // add 2px for border-bottom of nav
        document.body.style.setProperty("--space-before", `${height}px`);
    }
    else {
        document.body.style.setProperty("--space-before", 0);
    }
}

////////////////////////////////////////////////////////////////////////////////
// Theme
////////////////////////////////////////////////////////////////////////////////

const theme_toggle = document.querySelector("#theme-toggle");
const theme_icon = theme_toggle.querySelector("i");

update_theme_toggle();
theme_toggle.addEventListener("click", function(e) {
    e.stopPropagation();
    window.Theme.toggle();
    update_theme_toggle();
});
theme_toggle.classList.add("is-ready");

function update_theme_toggle() {
    const is_dark_theme = window.Theme.current === window.Theme.DARK;
    theme_icon.classList.toggle("fa-sun", !is_dark_theme);
    theme_icon.classList.toggle("fa-moon", is_dark_theme);  

    if (is_dark_theme) {
        theme_toggle.title = "Switch to light theme";
        theme_toggle.ariaLabel = "Switch to light theme";
    }
    else {
        theme_toggle.title = "Switch to dark theme";
        theme_toggle.ariaLabel = "Switch to dark theme";
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
