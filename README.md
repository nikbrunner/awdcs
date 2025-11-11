# AWDCS

A scope-based keymap system that brings simplicity and clarity to modal editor configurations through mindful organization and purposeful design.

## Philosophy

Traditional modal editor keymaps typically organize bindings by tool or function.

But I noticed a pattern in my thinking: I always consider the scope first.

- I want to toggle the **App** keymaps.
- I want to search the entire **Workspace** for...
- I want to look in this **Document** for...
- I want to do something with this **Change**...
- I want to rename that **Symbol**...

**That's when I decided to adapt my modal editor to this mental model.**

This system takes a different approach by organizing mappings based on their scope of operation:

```
<Scope><?Group?><Operation>
```

- **[A]pp** (`<leader>a`) - Application-level operations
- **[W]orkspace** (`<leader>w`) - Operations affecting the entire workspace
- **[D]ocument** (`<leader>d`) - Operations on the current document
- **[C]hange** (`<leader>c`) - Operations on a change (Hunk)
- **[S]ymbol** (`s`) - Operations on code symbols

## Design Principles

- **Scope First**
  - Every operation must clearly belong to a specific scope (workspace, document, symbol)
  - The scope should be immediately obvious from the operation's nature
- **Semantic Operations**
  - Mappings should represent clear, meaningful operations
  - Focus on frequently used operations that benefit from quick access
  - Focus on what the operation means, not how it's implemented
- **Tool & Editor Agnostic**:
  - Mappings should be independent of specific tools or editors
  - Use semantic terms (e.g., 'History' instead of 'Git')
  - Implementation details are left to the user's configuration
- **Preserve Editor Defaults**:
  - Don't replace basic editor operations with custom mappings
  - Focus on operations that enhance rather than replace core functionality
  - Leave common editor commands in their traditional form
- **Consistent Patterns**:
  - Second key should relate to the action within the scope
  - Related operations should share the same scope
  - Maintain predictable patterns across all mappings
- **Single Source**:
  - Each operation should have exactly one mapping
  - Avoid duplicate mappings across different key combinations
  - Choose the most appropriate and efficient mapping location

## Leader Key

I personally use (and recommend) `,` as my leader key, but you can use any key you like.
This way we use both hands in combination when typing the keymaps, which reduces strain by balancing the workload on the fingers.
Also I find that the the middle finger is faster than the thumb, which is generally a good thing, but also very nice to quickly double tap the leader key, to reach the command mode.

## Keymap

### `<leader><leader>` - Global

This is a little bit of a special case, as it's not really a keymap, but a global command.
This is an alternative way to quickly enter the command mode (same as `:`), which lends to increased direct usage of the builtin commands without mapping them.

Since I am using home row mods (really bottom row mods.. See my layout [here](https://github.com/nikbrunner/koyo>), I sometimes get missfires for quickly typing `:`.
When quickly dobule tapping the leader key, I quickly and safely reach the command mode, without worrying about typos.

This is of course just personal preference.

For example in Neovim you can create a mapping like so:

```lua
vim.keymap.set({ "n", "x" }, "<leader><leader>", function()
    vim.api.nvim_feedkeys(":", "n", true)
end, { desc = "Command Mode" })
```

### Alphabetical Order

All keybindings in each scope are listed alphabetically for easier reference and maintenance, not by frequency of use or importance.

### Ergonomic Design

When using `,` as the leader key, the system naturally creates efficient left-hand finger patterns. The scope key (first key after leader) and the operation key (second key) are often adjacent or nearby on the keyboard (e.g., `sa`, `we`, `wd`), minimizing finger travel and creating comfortable rolling motions for the left hand. This ergonomic benefit is a fortunate consequence of the alphabetical organization combined with the QWERTY layout's letter placement.

### `<leader>a` - [A]pp

| Keybinding   | Mnemonic              | Description                                                    | Notes                                                                                                                |
| ------------ | --------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `<leader>aa` | `A`pp `A`ctions       | Show available app actions / commands                          |
| `<leader>ad` | `A`pp `D`ocument      | Open document from any workspace                               | If available. (e.g. `file-surfer.nvim`)                                                                              |
| `<leader>af` | `A`pp `F`ocus         | Focus Mode                                                     |
| `<leader>ag` | `A`pp `G`it           | Show git module                                                |                                                                                                                      |
| `<leader>ah` | `A`pp `H`elp          | Show help submenu                                              | Submenu for documentation, manuals, and help resources                                                               |
| `<leader>ahh` | `A`pp `H`elp `H`ighlights | Show syntax highlights                                     |                                                                                                                      |
| `<leader>ahm` | `A`pp `H`elp `M`anuals | Show man pages                                                |                                                                                                                      |
| `<leader>ahp` | `A`pp `H`elp `P`ages  | Show help pages                                                |                                                                                                                      |
| `<leader>ai` | `A`pp `I`ntelligence  | Show AI tools                                                  | If available.                                                                                                        |
| `<leader>aj` | `A`pp `J`umps         | Show application jump list                                     | If available.                                                                                                        |
| `<leader>ak` | `A`pp `K`eybindings   | Show keybindings                                               |
| `<leader>al` | `A`pp `L`anguages     | Manage language servers                                        |
| `<leader>an` | `A`pp `N`otifications | Show notifications                                             |
| `<leader>ao` | `A`pp `O`ptions       | Toggle app options like Background, Line numbers, etc.         |
| `<leader>ap` | `A`pp `P`lugins       | Manage plugins                                                 |
| `<leader>ar` | `A`pp `R`ecent        | Open recently visited documents accross all workspace          | If available.                                                                                                        |
| `<leader>as` | `A`pp `S`ettings      | Toggle app settings                                            | In Neovim this would let us fuzzy find config files, and on a mac app this would lead us to `settings.json`. (cmd-,) |
| `<leader>at` | `A`pp `T`hemes        | Switch theme or colorscheme                                    |
| `<leader>aw` | `A`pp `W`orkspace     | Open workspace                                                 |
| `<leader>az` | `A`pp `Z`oom          | Zoom Mode                                                      |
| `<leader>aI` | `A`pp `I`nformation   | Show app information (formatter, lsp, linters, help tags, etc) |

### `<leader>w` - [W]orkspace

| Keybinding    | Mnemonic                         | Description                            | Notes                                                                                                 |
| ------------- | -------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `<leader>wc`  | `W`orkspace **`C`hanged**        | Show changed files in workspace        |
| `<leader>wd`  | `W`orkspace **`D`ocument**       | Find document in workspace             |
| `<leader>we`  | `W`orkspace `E`xplorer           | Open file explorer                     |
| `<leader>wf`  | `W`orkspace `F`ind               | Find and replace in workspace          | Optional: Maybe not needed, if the editor offers a replace field under `<leader>wt`.                  |
| `<leader>wg`  | `W`orkspace `G`it                | Show git submenu                       | Submenu for all git/version control operations                                                        |
| `<leader>wgb` | `W`orkspace `G`it `B`ranches     | Show git branches                      |                                                                                                       |
| `<leader>wgh` | `W`orkspace `G`it `H`istory      | Show git history (picker)              |                                                                                                       |
| `<leader>wgH` | `W`orkspace `G`it `H`istory      | Show git history (interactive)         | If available (e.g., LazyGit)                                                                          |
| `<leader>wgi` | `W`orkspace `G`it `I`ssues       | Browse GitHub issues                   | If available (GitHub integration)                                                                     |
| `<leader>wgp` | `W`orkspace `G`it `P`ull Requests | Show pull requests submenu            | If available (GitHub integration)                                                                     |
| `<leader>wgpb` | `W`orkspace `G`it `P`ull Requests `B`rowse | Browse GitHub pull requests  | If available (GitHub integration)                                                                     |
| `<leader>wgpc` | `W`orkspace `G`it `P`ull Requests `C`hanges | Show current PR changes     | If available (GitHub integration)                                                                     |
| `<leader>wgpd` | `W`orkspace `G`it `P`ull Requests `D`escription | Show current PR description | If available (GitHub integration)                                                                     |
| `<leader>wgr` | `W`orkspace `G`it `R`emote       | Open remote repository                 |                                                                                                       |
| `<leader>wgs` | `W`orkspace `G`it `S`tatus       | Show git status (interactive)          | If available (e.g., LazyGit)                                                                          |
| `<leader>wj`  | `W`orkspace `J`umps              | Show workspace jumps                   | Jump list for workspace-level navigation                                                              |
| `<leader>wm`  | `W`orkspace `M`odified           | Show modified documents                | Git-tracked changes                                                                                   |
| `<leader>wp`  | `W`orkspace `P`roblems           | Show workspace diagnostics             |
| `<leader>wr`  | `W`orkspace `R`ecent             | Show recently visited documents        | Optional: Maybe not needed, if editor merges recently opend documents in `<leader>wd`.                |
| `<leader>ws`  | `W`orkspace `S`ymbol             | Find symbol in workspace               |
| `<leader>wt`  | `W`orkspace `T`ext               | Find text in workspace                 |
| `<leader>ww`  | `W`orkspace `W`ord               | Find word under cursor in workspace    | Optional: Maybe not needed if the editor uses the selection under the cursor when using `<leader>wt`. |

### `<leader>d` - [D]ocument

| Shortcut      | Mnemonic                      | Description                           | Notes                                       |
| ------------- | ----------------------------- | ------------------------------------- | ------------------------------------------- |
| `<leader>da`  | `D`ocument `A`ssociated       | Find associated documents             |
| `<leader>dc`  | `D`ocument `C`hanges          | Show document changes (if available)  |
| `<leader>df`  | `D`ocument `F`ind             | Find and replace in document          |
| `<leader>dg`  | `D`ocument `G`it              | Show git submenu                      | Submenu for document-level git operations   |
| `<leader>dgh` | `D`ocument `G`it `H`istory    | Show document git history (picker)    |                                             |
| `<leader>dgH` | `D`ocument `G`it `H`istory    | Show document git history (interactive) | If available (e.g., LazyGit)              |
| `<leader>dl`  | `D`ocument `L`ast             | Switch to last document               | <C-^> in Neovim                             |
| `<leader>dp`  | `D`ocument `P`roblems         | Show document diagnostics             |
| `<leader>ds`  | `D`ocument `S`ymbol           | Find symbol in document               |
| `<leader>dt`  | `D`ocument `T`ext             | Find text in document                 |
| `<leader>du`  | `D`ocument `U`ndo             | Open undo tree                        | If available.                               |
| `<leader>dvr` | `D`ocument `V`ersion `R`evert | Revert changes                        |
| `<leader>dvs` | `D`ocument `V`ersion `S`tage  | Stage changes                         |
| `<leader>dvu` | `D`ocument `V`ersion `U`tage  | Unstage changes                       |
| `<leader>dw`  | `D`ocument `W`ord             | Find word under cursor in document    |
| `<leader>dya` | `D`ocument `Y`ank `A`ll       | Copy whole document                   |                                             |
| `<leader>dyp` | `D`ocument `Y`ank `P`ath      | Copy path of document                 | e.g. absolute, relative path, filename etc. |
| `<leader>dyr` | `D`ocument `Y`ank `R`emote    | Copy remote path of document          | e.g. GitHub Perma link                      |

### `<leader>c` - [C]hange

| Shortcut     | Mnemonic          | Description         | Notes                                         |
| ------------ | ----------------- | ------------------- | --------------------------------------------- |
| `<leader>cs` | `C`hange `S`tage  | Stage current hunk  |
| `<leader>cr` | `C`hange `R`evert | Revert current hunk |
| `<leader>cu` | `C`hange `U`ndo   | Undo staged hunk    |
| `<leader>cd` | `C`hange `D`iff   | Show hunk diff      |
| `<leader>ca` | `C`hange `A`ll    | Show all changes    | If available. (e.g. `Snacks.picker.git_diff`) |

### `s` - [S]ymbol

> [!NOTE]
> Unlike other scopes, symbol operations do not use the leader key due to their high frequency of use.
> This intentional exception optimizes for efficiency while maintaining the semantic meaning of the scope.
> **But of course it is possible to just also use the leader prefix before that!**

> [!CAUTION]
> If you plan to use it without a leader prefix, and use Neovim, I would recommend to disable the default `s` Binding.
> Yes- this goes against the principle not to overwrite editor defaults, but it is (at least for me), not a used keymapping, and is also often overridden by other plugins and systems.

You can disable the default mapping in Neovim like so:

```lua
vim.keymap.set("n", "s", "<Nop>")
```

| Shortcut | Mnemonic              | Description                 | Notes                                                         |
| -------- | --------------------- | --------------------------- | ------------------------------------------------------------- |
| `s;`     | `S`ymbol `A`ctions    | Show symbol actions         |
| `sd`     | `S`ymbol `D`efinition | Go to symbol definition     |
| `sg`     | `S`ymbol `G`it        | Show git submenu            | Submenu for symbol-level git operations                       |
| `sgb`    | `S`ymbol `G`it `B`lame | Show git blame for line    |                                                               |
| `sgh`    | `S`ymbol `G`it `H`istory | Show git history for line |                                                               |
| `si`     | `S`ymbol `I`nfo       | Show symbol information     | Hover Information                                             |
| `sl`     | `S`ymbol `L`og        | Insert log for symbol       | If available. (e.g. Programmatically log symbol under cursor) |
| `sn`     | `S`ymbol `N`ame       | Rename symbol               |
| `sr`     | `S`ymbol `R`eferences | Show symbol references      |
| `sI`     | `S`ymbol `I`nspect    | Inspect symbol under cursor |

## Contributing

Feel free to:

- Suggest improvements to the scope organization
- Propose new scopes for uncovered contexts
- Share your adaptations for different editors

## License

MIT License - Feel free to adapt and use in your own configurations.
