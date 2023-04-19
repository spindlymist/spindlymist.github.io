////////////////////////////////////////////////////////////////////////////////
// Setup
////////////////////////////////////////////////////////////////////////////////

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const first_section = document.querySelector('main > section:first-of-type');
const y_min = first_section.offsetTop / document.body.offsetHeight;

const circles = generate_circles({
    count: 32,
    seed: Date.now() % 512,
    colors: [
        { value: '#524a47', weight: 2 },
        { value: '#9fb9cf', weight: 2 },
        { value: '#ed9b8e', weight: 1 },
    ],
    fill_chance: .3333,
    parallax: {
        mean: 0.6,
        std_dev: .15,
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
            p: Math.random(),
            x: x * x_range + x_min,
            y: y * y_range + y_min,
            parallax: Math.max(0, norm_sequence.next().value),
            color: pick_color(),
            filled: !(Math.random() > fill_chance),
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
    const p = window.scrollY / (document.body.offsetHeight - window.innerHeight);

    ctx.lineWidth = 2;
    for(let circle of circles) {
        const delta = Math.abs(circle.p - p) * 2;
        const r = Math.max(0, 1 - delta) * (canvas.width / 20)
        const x = circle.x * canvas.width;
        const y = (circle.y * document.body.offsetHeight) - (window.scrollY * circle.parallax);
        
        ctx.beginPath();
        ctx.ellipse(x, y, r, r, 0, 0, 2*Math.PI);
        if (circle.filled) {
            ctx.fillStyle = circle.color;
            ctx.fill();
        }
        else {
            ctx.strokeStyle = circle.color;
            ctx.stroke();
        }
    }
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
