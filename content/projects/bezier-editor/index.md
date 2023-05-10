+++
title = "Bezier Editor"
weight = 10000

[extra]
live_url = "https://spindlymist.github.io/bezier-editor/"
repo_url = "https://github.com/spindlymist/bezier-editor"

[[extra.screenshots]]
file = "bezier.png"
alt = "A screenshot of a web application. On the left side, a meandering curve appears in light gray against a white background. Part of the curve is highlighted in blue. Its endpoints are marked by open blue circles. Two additional open circles in red mark the curve's control points. To the right, a sidebar lists the curve segments, labeled \"Curve 1\" through \"Curve 6\". \"Curve 6\" is highlighted in blue. Below that are 4 buttons with the labels \"Delete\", \"Rename\", \"Clipboard\", and \"Follow\"."
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
