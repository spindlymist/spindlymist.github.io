+++
title = "Chain Reaction"
weight = 8000

[extra]
live_url = "https://spindlymist.github.io/explosions/"
repo_url = "https://github.com/spindlymist/explosions"

[[extra.screenshots]]
file = "tame.png"
alt = "A haphazard scattering of hundreds of cyan circles. Some are arranged in semicircular arcs."
caption = "A typical scene."

[[extra.screenshots]]
file = "options.png"
alt = "A panel labeled \"Options\" hosts various parameters: a checkbox labeled \"Auto-Spawn\"; 6 sliders labeled \"Spawn Rate\", \"Min Size\", \"Max Size\", \"Min Speed\", \"Max Speed\", and \"Explosion Particles\"; 2 colors labeled \"Background\" and \"Color\"; and, under the subheader \"Color Randomization\", 2 checkboxes labeled \"On Spawn\" and \"On Explosion\". Below is a button labeled \"Close\"."
caption = "Tweak parameters to your heart's content."

[[extra.screenshots]]
file = "colorful.png"
alt = "A haphazard scattering of hundreds of circles in a dizzying array of colors. Some are arranged in semicircular arcs."
caption = "This one goes out to all the fans of rainbow sprinkles."

[[extra.screenshots]]
file = "chaotic.png"
alt = "A haphazard scattering of thousands of green circles. Some circles are arranged in unevenly spaced bands parallel to the edges, forming a pattern reminiscent of logarithmic graph paper."
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
