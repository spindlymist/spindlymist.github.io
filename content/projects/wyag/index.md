+++
title = "Git in Rust"
weight = 4000

[extra]
live_url = "?I haven't published binaries, but you're more than welcome to build it from the source."
repo_url = "https://github.com/spindlymist/wyag_in_rust"
thumbnail_background_size = "auto"

#[[extra.screenshots]]
#file = ""
#alt = ""
#caption = ""

[[extra.tech_groups]]
name = "Languages"
techs = [
    "Rust",
    "Python",
]

[[extra.tech_groups]]
name = "Crates"
techs = [
    "CLI: clap",
    "Error handling: anyhow, thiserror",
    "Testing: assert_fs, dir-diff, predicates, sevenz-rust",
    "Utility: base16ct, byteorder, flate2, itertools, ordered-multimap, path-absolutize, regex, rust-ini, sha1",
]
+++

wyag (**W**rite **Y**ourself **a** **G**it) is a simplified clone of Git written in Rust. I wrote it to deepen my understanding of Git and to solidify and expand my knowledge of Rust after working through [the Rust book](https://doc.rust-lang.org/book/title-page.html). I started out following [a Python-based guide written by Thibault Polge](https://wyag.thb.lt/) (hence the name) but diverged considerably along the way—not least because Polge's guide is unfinished.

See [the README on GitHub](https://github.com/spindlymist/wyag_in_rust#write-yourself-a-git-in-rust) for a detailed account of wyag's features, limitations, and test methodology as well as my reflection on how the codebase could be improved.

### Features

The core functionality of the following Git commands is implemented in wyag:
- `add`
- `branch`
- `cat-file`
- `commit`
- `hash-object`
- `init`
- `log`
- `ls-files`
- `ls-tree`
- `restore`
- `rev-parse`
- `rm`
- `show-ref`
- `status`
- `switch`
- `tag`

This subset of commands is sufficient for a single-branch workflow. `branch` and `switch` allow the creation and use of additional branches, but the presently unimplemented `merge` command is needed to take full advantage of them.
