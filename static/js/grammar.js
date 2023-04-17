// Parses a grammar spec and returns a function that generates random strings conforming
// to the grammar.
//
// The grammar format is a simplified version of Tracery's (https://github.com/galaxykate/tracery)
// that doesn't support variables, modifiers, or literal # characters.
export function parse_grammar(spec) {
    const grammar = {};
    const key_defs = [...Object.keys(spec)];
    const key_refs = new Set(["origin"]);

    // Parse each key of the grammar spec
    for (let key of key_defs) {
        grammar[key] = parse_definition(grammar, key_refs, spec, key);
    }

    // Check for keys that are referenced but not defined
    {
        const key_defs_set = new Set(key_defs);
        const missing_keys = [...key_refs]
            .filter(key => !key_defs_set.has(key));
        if(missing_keys.length > 0) {
            console.error("Grammar references undefined keys:", missing_keys);
        }
    }

    // Check for keys that are defined but not referenced
    {
        const unused_keys = key_defs
            .filter(key => !key_refs.has(key));
        if(unused_keys.length > 0) {
            console.warn("Grammar has unused keys:", unused_keys);
        }
    }

    return grammar.origin;
}

// Parses one key from the spec and returns a function that generates random strings
// conforming to that key's grammar. Any keys referenced by this sub-grammar will
// be added to `key_refs`.
//
// A definition can be a string (single variant) or an array of strings (multiple variants).
function parse_definition(grammar, key_refs, spec, key) {
    const def = spec[key];

    if (typeof def === "string") {
        // This definition has only one variant
        return parse_variant(grammar, key_refs, def);
    }
    else if (def instanceof Array) {
        // This definition has multiple variants - parse each one individually
        const variants = def
            .map(variant_def => {
                if (typeof variant_def === "string") {
                    return parse_variant(grammar, key_refs, variant_def);
                }
                else {
                    return console.warn(`Invalid variant under key \`${key}\`: all variants must be strings`);
                }
            })
            .filter(Boolean);

        // The generator function returns one variant at random each time it is called
        return function() {
            const roll = Math.random();
            const idx = Math.floor(roll * variants.length);
            return variants[idx]();
        };
    }
    else {
        console.warn(`Invalid key \`${key}\`: must be string or array`);
    }
}

// Parses one variant string. Any keys referenced by this definition will be added to `key_refs`.
//
// A variant string can be as simple as a string literal. Optionally, it can reference other
// definitions by wrapping their keys between # characters: "#greeting# world".
function parse_variant(grammar, key_refs, def) {
    // By splitting the string on each #, each even-indexed part will be
    // a literal and each odd-indexed part will be a reference. Example:
    //
    // INPUT              | OUTPUT
    // ===================+=======================================
    //                    | 0             |            |
    // "hello world"      | "hello world" |            |
    //                    | literal       |            |
    // -------------------+---------------+------------+----------
    //                    | 0             | 1          | 2
    // "#greeting# world" | ""            | "greeting" | " world"
    //                    | literal       | reference  | literal
    // -------------------+---------------+------------+----------
    const parts = def.split('#');

    // Add referenced keys to key_refs
    for(let i = 1; i < parts.length; i += 2) {
        key_refs.add(parts[i]);
    }

    // The generator function replaces each key reference with a random
    // instantiation of that key's grammar and then stitches the whole
    // thing together
    return function() {
        return parts
            .map((part, i) => {
                let isLiteral = i % 2 == 0;
                if(isLiteral) {
                    return part;
                }
                else {
                    return grammar[part]();
                }
            })
            .join("");
    }
}
