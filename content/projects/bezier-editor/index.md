+++
title = "Bezier Editor"
weight = 10000

[extra]
live_url = "https://spindlymist.github.io/bezier-editor/"
repo_url = "https://github.com/spindlymist/bezier-editor"

[[extra.screenshots]]
file = "bezier.png"
alt = "A meandering gray curve appears on a blank canvas. Part of the curve is blue with endpoints marked by open blue circles. Two open red circles mark the curve's control points. A sidebar lists 6 curve segments, the last of which is highlighted."
caption = "Editing a pseudo-spline that I created by manually lining up 6 curves."

[[extra.tech_groups]]
name = ""
techs = [
    "HTML",
    "CSS",
    "JavaScript",
]
+++

This is a simple cubic Bezier curve editor that I created while learning about the mathematics of such curves.

The are more features I would like to add (e.g. splines), but the vanilla JS architecture is not the best suited for the increased complexity. If I were starting the project today, I would probably select a declarative/reactive framework like [Solid](https://www.solidjs.com/).

{{ project_screenshots() }}
{{ project_technologies() }}
