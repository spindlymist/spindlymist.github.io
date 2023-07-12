////////////////////////////////////////////////////////////////////////////////
// Setup
////////////////////////////////////////////////////////////////////////////////

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const first_section = document.querySelector('main > section:first-of-type');
const y_min = first_section.offsetTop / document.body.offsetHeight;
const height = document.body.offsetHeight - first_section.offsetTop;
const min_circle_count = 12;
const max_circle_count = 36;
const px_per_circle = 150;
const count = clamp(Math.floor(height / px_per_circle), min_circle_count, max_circle_count);

const circles = generate_circles({
    count,
    seed: Date.now() % 256,
    colors: [
        { value: '#524a47', weight: 2 },
        { value: '#9fb9cf', weight: 2 },
        { value: '#ed9b8e', weight: 1 },
    ],
    fill_chance: .3333,
    parallax: {
        mean: 1,
        std_dev: 0,
    },
    boundary: {
        x_min: 0,
        x_max: 1,
        y_min,
        y_max: 1,
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_grid(canvas, ctx);
    draw_circles(canvas, ctx);
}
window.addEventListener('scroll', draw);
window.Theme.add_listener(draw);

function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    draw();
}
window.addEventListener('resize', resize);

resize();
canvas.classList.add('is-ready');

////////////////////////////////////////////////////////////////////////////////
// Circle generation
////////////////////////////////////////////////////////////////////////////////

function generate_circles({
    count,
    seed,
    colors,
    fill_chance,
    parallax: {
        mean: parallax_mean,
        std_dev: parallax_std_dev
    },
    boundary: { x_min, x_max, y_min, y_max }
}) {
    const circles = [];
    const pick_color = make_color_picker(colors);
    const coord_sequence = halton_coord_sequence(seed);
    const norm_sequence = normal_sequence(parallax_mean, parallax_std_dev);
    const x_range = x_max - x_min;
    const y_range = y_max - y_min;

    for(let i = 0; i < count; i++) {
        const { x, y } = coord_sequence.next().value;
        circles.push({
            x: x * x_range + x_min,
            y: y * y_range + y_min,
            parallax: Math.max(0, norm_sequence.next().value),
            color: pick_color(),
            filled: !(Math.random() > fill_chance),
            theta_offset: Math.random() * 2 * Math.PI,
        });
    }

    return circles;
}

function make_color_picker(colors) {
    let total_weight = 0;

    for (let color of colors) {
        total_weight += color.weight;
        color.cumulative_weight = total_weight;
    }

    for (let color of colors) {
        color.cumulative_chance = color.cumulative_weight / total_weight;
    }

    return () => {
        const roll = Math.random();
        return colors
            .find(({ cumulative_chance }) => roll < cumulative_chance)
            .value;
    };
}

////////////////////////////////////////////////////////////////////////////////
// Drawing
////////////////////////////////////////////////////////////////////////////////

function draw_grid(canvas, ctx) {
    const grid_size = canvas.width / 12;
    const offset = Math.round((window.scrollY * 0.25) % grid_size);

    ctx.lineWidth = 1;
    if (window.Theme.current === window.Theme.DARK) {
        ctx.strokeStyle = 'rgba(255, 255, 255, .10)';
    }
    else {
        ctx.strokeStyle = 'rgba(0, 0, 0, .10)';
    }

    ctx.beginPath();
    for(let x = -0.5; x < 12; x++) {
        let x_canvas = Math.round(x * grid_size) + 0.5;
        ctx.moveTo(x_canvas, 0);
        ctx.lineTo(x_canvas, canvas.height);
    }
    for(let y = -0.5; y < window.innerHeight / grid_size; y++) {
        let y_canvas = Math.round(y * grid_size) - offset + 0.5;
        ctx.moveTo(0, y_canvas);
        ctx.lineTo(canvas.width, y_canvas);
    }
    ctx.stroke();
}

function draw_circles(canvas, ctx) {
    ctx.lineWidth = 2;

    const visible_range = canvas.height / 1.5;
    const max_radius = canvas.width / 12;
    const waver_count = 1;
    const waver_amplitude = 0;
    const min_alpha = 0.1;

    for(let circle of circles) {
        const scrollY = window.scrollY * circle.parallax + window.innerHeight / 2;
        const circleY = circle.y * document.body.offsetHeight;
        const t = rescale(scrollY - circleY, -visible_range, visible_range, 0, 1);
        if (t <= 0 || t >= 1) continue;
        // const tt = (0.5 - Math.abs(t - 0.5)) * 2;
        const theta = t * waver_count * 2 * Math.PI + circle.theta_offset;

        const r = t * t * max_radius;
        const x = circle.x * canvas.width;
        const y = circleY - window.scrollY * circle.parallax;
        const deltaX = waver_amplitude * (1 - t) * Math.sin(theta);

        ctx.beginPath();
        ctx.ellipse(x + deltaX, y, r, r, 0, 0, 2 * Math.PI);
        ctx.globalAlpha = Math.min(t + min_alpha, 1);
        if (circle.filled) {
            ctx.fillStyle = circle.color;
            ctx.fill();
        }
        else {
            ctx.strokeStyle = circle.color;
            ctx.stroke();
        }
    }

    ctx.globalAlpha = 1;
}

////////////////////////////////////////////////////////////////////////////////
// Math utilities
////////////////////////////////////////////////////////////////////////////////

function* normal_sequence(mean, std_dev) {
    while (true) {
        const u1 = Math.random();
        const u2 = Math.random();
        const r_times_std_dev = (-2 * Math.log(u1)) * std_dev;
        const theta = 2 * Math.PI * u2;

        yield r_times_std_dev * Math.cos(theta) + mean;
        yield r_times_std_dev * Math.sin(theta) + mean;
    }
}

function* halton_sequence(base) {
    let n = 0;
    let d = 1;

    while (true) {
        let x = d - n;

        if (x == 1) {
            n = 1;
            d *= base;
        }
        else {
            let y = Math.floor(d / base);
            while (x <= y) {
                y = Math.floor(y / base);
            }
            n = (base + 1) * y - x;
        }

        yield n / d;
    }
}

function* halton_coord_sequence(skip = 0, x_base = 2, y_base = 3) {
    const x_sequence = halton_sequence(x_base);
    const y_sequence = halton_sequence(y_base);

    for(let i = 0; i < skip; i++) {
        x_sequence.next();
        y_sequence.next();
    }

    while (true) {
        yield {
            x: x_sequence.next().value,
            y: y_sequence.next().value,
        };
    }
}

function rescale(t, old_min, old_max, new_min, new_max) {
    return (t - old_min) / (old_max - old_min) * (new_max - new_min) + new_min;
}

function clamp(t, min, max) {
    return Math.min(max, Math.max(min, t));
}
