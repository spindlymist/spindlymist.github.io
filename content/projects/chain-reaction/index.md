+++
title = "Chain Reaction"
weight = 8000

[extra]
live_url = "https://spindlymist.github.io/explosions/"
repo_url = "https://github.com/spindlymist/explosions"

[[extra.screenshots]]
file = "tame.png"
alt = "A screenshot of a web application. Perhaps a few hundred cyan-colored circles of varying size are scattered somewhat haphazardly on a dark purple background. Here and there, particularly near the edges, groups of same-sized circles are arranged in distinct semicircular arcs."
caption = "A typical scene."

[[extra.screenshots]]
file = "options.png"
alt = "A screenshot of a web application. A panel labeled \"Options\" is prominently displayed. Various parameters appear below: a checkbox labeled \"Auto-Spawn\"; 6 sliders labeled \"Spawn Rate\", \"Min Size\", \"Max Size\", \"Min Speed\", \"Max Speed\", and \"Explosion Particles\"; and, in another section labeled \"Color Randomization\", 2 checkboxes labeled \"On Spawn\" and \"On Explosion\". Below is a button labeled \"Close\". In the background, perhaps a few hundred bright orange-colored circles of varying size are scattered somewhat haphazardly on a rusty orange background. Here and there, particularly near the edges, groups of same-sized circles are arranged in distinct semicircular arcs."
caption = "Tweak parameters to your heart's content."

[[extra.screenshots]]
file = "colorful.png"
alt = "A screenshot of a web application. Hundreds of circles of varying size in a dizzying array of colors are scattered somewhat haphazardly on a nearly black background. Here and there, particularly near the edges, groups of same-sized circles are arranged in distinct semicircular arcs."
caption = "This one goes out to all the fans of rainbow sprinkles."

[[extra.screenshots]]
file = "chaotic.png"
alt = "Hundreds or thousands of pale green-colored circles of varying size are scattered somewhat haphazardly on a deep teal background. Notably, many of the circles are arranged in unevenly spaced bands parallel to the edges of the image, forming a pattern reminiscent of logarithmic graph paper. Clusters of half-cropped circles form a rough border around the image. Here and there, groups of same-sized circles are arranged in distinct semicircular arcs."
caption = "Banding patterns appear when the framerate drops. The simulation is discrete, so a long enough time step will cause many particles to become clamped to the edges of the canvas and thereafter move together as a line."

[[extra.tech_groups]]
name = ""
techs = [
    "HTML",
    "CSS",
    "JavaScript",
]
+++

This is a pointless, yet fun simulation to play around with. Hold the left mouse button down to spawn particles with randomized radius and velocity. When a particle collides with the edge of the window, it will explode in an arc of smaller particles which are reflected back onto the page—each of which will eventually explode into even smaller particles, and so on, until they reach a minimum size.

Right click to tweak various parameters. Beware that if you spawn a lot of particles, the framerate will drop to a crawl and your fans will probably kick into overdrive. The "Explosion Particles" parameter, which controls how many smaller particles are spawned when a particle explodes, is particularly devious.

{{ project_screenshots() }}
{{ project_technologies() }}
