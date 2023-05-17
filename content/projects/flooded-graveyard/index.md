+++
title = "Flooded Graveyard"
weight = 3000

[extra]
live_url = "https://github.com/spindlymist/flooded-graveyard/releases"
repo_url = "https://github.com/spindlymist/flooded-graveyard"

[[extra.screenshots]]
file = "scene.png"
alt = "A dim scene of scattered grave markers breaching the surface of standing water. A vague ghostlike figure hangs in the air next to a cross-shaped marble monument. A few fog-cloaked trees are silhouetted against the cloudy night sky and reflected in the water."
caption = "The haunted graveyard."

[[extra.screenshots]]
file = "underwater.png"
alt = "An underwater view of grave markers and tree roots. The tops of the markers and silhouettes of trees against a cloudy night sky appear distorted and blue-tinted beyond the surface of the water."
caption = "From another perspective, the view of the surface world is distorted by the water."

[[extra.screenshots]]
file = "normal_mapping.png"
alt = "Two images of a gravestone with an uneven, cracked surface. The first is lit from above left, indicated by a yellow square. In the second, the light is lower and to the right."
caption = "Normal mapping makes the surface of the gravestone appear cracked and uneven. These are tricks of the light, not present in the geometry."

[[extra.screenshots]]
file = "shadows.png"
alt = "A ring of gravestones viewed from a top-down perspective. Shadows radiate outward like spokes, cast by a central light indicated by a yellow square."
caption = "The point light casts shadows in all directions."

[[extra.screenshots]]
file = "fresnel.png"
alt = "The surface of the water viewed at an angle. Near the top—farther from the viewer—the water reflects the sky and trees. Near the bottom—closer to the viewer—a grassy expanse shows through."
caption = "The Fresnel effect at work. At oblique viewing angles, the reflection of the sky and trees dominates. Viewed straight on, the refracted view of the ground beneath takes over."

[[extra.screenshots]]
file = "transparency.png"
alt = "This image is split in two. On the left is cedar-like foliage. The dark background peeks through gaps and outlines the complex perimeter of individual needles. On the right, the graveyard is obscured by semi-opaque fabric which seems to be draped over an unseen figure."
caption = "Close-ups of the cutout foliage (left) and alpha-blended ghost (right)."

[[extra.screenshots]]
file = "marble.png"
alt = "Close-up of the base of the cross-shaped marble monument. The contiguous nature of its smoky black-and-white texture suggests that it was carved from a single block of stone."
caption = "3D marble texture generated with Perlin noise. Every execution yields a unique texture."

[[extra.tech_groups]]
name = ""
techs = [
    "Java",
    "OpenGL/JOGL",
    "GLSL",
    "JOML",
]
+++

During my penultimate semester at [CSU Sacramento](https://www.csus.edu/), I took an advanced course in computer graphics (CSC 155) taught by the inimitable [Dr. Scott Gordon](https://athena.ecs.csus.edu/~gordonvs/). This was my final project for that course: an atmospheric 3D scene depicting a flooded graveyard on a cloudy, starlit night, populated with trees, grave markers, and a spooky ghost that drifts aimlessly in search of lost souls.

While you could throw a scene like this together in under an hour with a modern game engine like Unity or Godot, this was an exercise in fundamentals—what it would take to *make* something like those engines' rendering subsystems. Nearly everything you see here, from the perspective, to the lighting, to the rippling, reflective surface of the water, was built up from bare mathematical principles. (I say "nearly" because OpenGL lends a helping hand with the interpolation of vertex attributes, texture sampling, and rasterization.) A list of the techniques I employed is given below.

{{ project_screenshots() }}
{{ project_technologies() }}

### Features

- Perspective projection
- Blinn-Phong lighting (single point light)
- Normal mapping
- Omnidirectional shadows
- Skybox
- Fog
- Water with
  - Animated waves
  - Reflection, refraction, and Fresnel effect
- .obj model importer with
    - partial .mtl support
    - multiple textures per model
    - automatic tangent calculation
- Cutouts/alpha blending
- 3D Perlin noise texture (marble)
- Camera controller
