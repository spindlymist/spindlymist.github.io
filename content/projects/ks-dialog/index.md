+++
title = "Knytt Stories Dialog"
weight = 7500

[extra]
live_url = "?A demo level and manual will be out soon!"
repo_url = "https://github.com/spindlymist/ks_dialog_system"
screenshot_aspect_ratio = 1.778

[[extra.screenshots]]
file = "pass.png"
alt = "Minimalist pixel art of two diminutive creatures near a low passage buried in snow. One is saying \"Sorry, Juni. The pass out of the valley completely snowed in last night.\" A menu gives two potential replies: \"Oh no!\" and \"That's okay. I wasn't going anywhere today, anyway.\" The latter is selected."
caption = "The player shares their feelings about a snowed-in mountain pass. Normally, they wouldn't be able to respond to this character."

[[extra.screenshots]]
file = "favor.png"
alt = "Minimalist pixel art of two diminutive creatures in front of a home carved from a tree trunk. One is saying \"I've got a favor to ask of ya, actually.\" A menu gives three potential replies: \"Anything for my favorite neighbor\", \"What can I do for you?\", and \"Keep talking, old man.\" The first is selected."
caption = "The uppermost response only appears if the player has previously indicated that they live nearby. This character also tracks their disposition toward the player—determined by friendly or rude exchanges—and reacts accordingly."

[[extra.screenshots]]
file = "terminal.png"
alt = "Minimalist pixel art of a diminutive creature in an abstract room with fluorescent lights. A prompt asks \"Where do you want to go?\". A lime green-on-black menu gives 5 numbered responses and the option to cancel."
caption = "Although designed primarily for dialog, the system works well for any sort of menu. Here, several parameters have been tweaked to give the impression of using a computer terminal."

[[extra.tech_groups]]
name = ""
techs = [
    "Knytt Stories Ex",
    "Lua",
    "Python",
]
+++

This project enables creators to add complex, interactive conversations to their Knytt Stories levels. It introduces a powerful format for writing branching dialog trees and a new, highly configurable UI for holding conversations.

A little background: Knytt Stories is a minimalist platforming game created by [Swedish indie dev Nicklas Nygren](https://twitter.com/nifflas) (better known as Nifflas). Released in 2007, it features an easy-to-use yet capable level editor which has spawned a dedicated community of creators and players.

A number of mods have been created over the years with the primary goal of extending the editor's capabilities. This project was made possible by an [ambitious mod called Knytt Stories Ex](https://grayface.github.io/ks/), created by Sergey Rozhenko (GrayFace), which added support for Lua scripting.

{{ project_screenshots() }}
{{ project_technologies() }}
