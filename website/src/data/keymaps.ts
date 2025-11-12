import type { KeymapRoot } from '../types/keymap';

export const keymaps: KeymapRoot = {
  leader: {
    label: 'Leader',
    keymaps: {
      a: {
        label: 'App',
        description: 'Application-level operations',
        keymaps: {
          a: { label: 'Actions', description: 'Show available app actions / commands' },
          d: { label: 'Document', description: 'Open document from any workspace', notes: 'If available. (e.g. `file-surfer.nvim`)' },
          f: { label: 'Focus', description: 'Focus Mode' },
          g: { label: 'Version', description: 'Show version control', notes: 'e.g. LazyGit' },
          h: {
            label: 'Help',
            description: 'Show help submenu',
            keymaps: {
              h: { label: 'Highlights', description: 'Show syntax highlights' },
              k: { label: 'Keybindings', description: 'Show keybindings' },
              m: { label: 'Manuals', description: 'Show man pages' },
              p: { label: 'Pages', description: 'Show help pages' },
            },
          },
          i: { label: 'Intelligence', description: 'Show AI tools', notes: 'If available.' },
          j: { label: 'Jumps', description: 'Show application jump list', notes: 'If available.' },
          l: {
            label: 'Languages',
            description: 'Show language servers submenu',
            keymaps: {
              i: { label: 'Info', description: 'Show LSP information' },
              l: { label: 'Log', description: 'Open LSP log' },
              s: { label: 'Server', description: 'Open Mason (server manager)' },
            },
          },
          n: { label: 'Notifications', description: 'Show notifications' },
          o: { label: 'Options', description: 'Toggle app options like Background, Line numbers, etc.' },
          p: { label: 'Plugins', description: 'Manage plugins' },
          r: { label: 'Recent', description: 'Open recently visited documents across all workspace', notes: 'If available.' },
          s: { label: 'Settings', description: 'Toggle app settings', notes: 'In Neovim this would let us fuzzy find config files, and on a mac app this would lead us to `settings.json`. (cmd-,)' },
          t: { label: 'Themes', description: 'Switch theme or colorscheme' },
          w: { label: 'Workspace', description: 'Open workspace' },
          z: { label: 'Zoom', description: 'Zoom Mode' },
        },
      },
      w: {
        label: 'Workspace',
        description: 'Operations affecting the entire workspace',
        keymaps: {
          c: { label: 'Changes', description: 'Show changes/hunks in workspace', notes: 'Picker for individual hunks/changes (git diff)' },
          d: { label: 'Document', description: 'Find document in workspace' },
          e: { label: 'Explorer', description: 'Open file explorer' },
          f: { label: 'Find', description: 'Find and replace in workspace', notes: "Optional: Maybe not needed, if the editor offers a replace field under `<leader>wt`." },
          j: { label: 'Jumps', description: 'Show workspace jumps', notes: 'Jump list for workspace-level navigation' },
          m: { label: 'Modified', description: 'Show modified documents', notes: 'List of modified files (git status)' },
          p: { label: 'Problems', description: 'Show workspace diagnostics' },
          r: { label: 'Recent', description: 'Show recently visited documents', notes: "Optional: Maybe not needed, if editor merges recently opened documents in `<leader>wd`." },
          s: { label: 'Symbol', description: 'Find symbol in workspace' },
          t: { label: 'Text', description: 'Find text in workspace' },
          v: {
            label: 'Version',
            description: 'Show version submenu',
            keymaps: {
              b: { label: 'Branches', description: 'Show version branches' },
              h: { label: 'History', description: 'Show version history (picker)' },
              H: { label: 'History', description: 'Show version history (interactive)', notes: 'If available (e.g., LazyGit)' },
              i: {
                label: 'Issues',
                description: 'Show issues submenu',
                notes: 'If available (GitHub integration)',
                keymaps: {
                  b: { label: 'Browse', description: 'Browse GitHub issues', notes: 'If available (GitHub integration)' },
                },
              },
              p: {
                label: 'Pull Requests',
                description: 'Show pull requests submenu',
                notes: 'If available (GitHub integration)',
                keymaps: {
                  b: { label: 'Browse', description: 'Browse pull requests', notes: 'If available (GitHub integration)' },
                  c: { label: 'Changes', description: 'Show current PR changes', notes: 'If available (GitHub integration)' },
                  d: { label: 'Description', description: 'Show current PR description', notes: 'If available (GitHub integration)' },
                },
              },
              r: { label: 'Remote', description: 'Open remote repository' },
              s: { label: 'Status', description: 'Show version status (interactive)', notes: 'If available (e.g., LazyGit)' },
            },
          },
          w: { label: 'Word', description: 'Find word under cursor in workspace', notes: "Optional: Maybe not needed if the editor uses the selection under the cursor when using `<leader>wt`." },
        },
      },
      d: {
        label: 'Document',
        description: 'Operations on the current document',
        keymaps: {
          a: { label: 'Associated', description: 'Find associated documents' },
          c: { label: 'Changes', description: 'Show document changes (if available)' },
          f: { label: 'Find', description: 'Find and replace in document' },
          l: { label: 'Last', description: 'Switch to last document', notes: '<C-^> in Neovim' },
          p: { label: 'Problems', description: 'Show document diagnostics' },
          s: { label: 'Symbol', description: 'Find symbol in document' },
          t: { label: 'Text', description: 'Find text in document' },
          u: { label: 'Undo', description: 'Open undo tree', notes: 'If available.' },
          v: {
            label: 'Version',
            description: 'Show version submenu',
            keymaps: {
              h: { label: 'History', description: 'Show document version history (picker)' },
              H: { label: 'History', description: 'Show document version history (interactive)', notes: 'If available (e.g., LazyGit)' },
              r: { label: 'Revert', description: 'Revert changes' },
              s: { label: 'Stage', description: 'Stage changes' },
            },
          },
          w: { label: 'Word', description: 'Find word under cursor in document' },
          y: {
            label: 'Yank',
            description: 'Copy operations',
            keymaps: {
              a: { label: 'All', description: 'Copy whole document' },
              p: { label: 'Path', description: 'Copy path of document', notes: 'e.g. absolute, relative path, filename etc.' },
              r: { label: 'Remote', description: 'Copy remote path of document', notes: 'e.g. GitHub Perma link' },
            },
          },
        },
      },
      c: {
        label: 'Change',
        description: 'Operations on a change (Hunk)',
        keymaps: {
          a: { label: 'All', description: 'Show all changes', notes: 'If available. (e.g. `Snacks.picker.git_diff`)' },
          d: { label: 'Diff', description: 'Show hunk diff' },
          g: { label: 'Git', description: 'Show hunk preview', notes: 'Toggle overlay/preview' },
          r: { label: 'Revert', description: 'Revert current hunk' },
          s: { label: 'Stage', description: 'Stage current hunk' },
          u: { label: 'Undo', description: 'Undo staged hunk' },
        },
      },
    },
  },
  s: {
    label: 'Symbol',
    description: 'Operations on code symbols (Can also be used as <leader>s)',
    keymaps: {
      I: { label: 'Inspect', description: 'Inspect symbol under cursor' },
      a: { label: 'Actions', description: 'Show symbol actions' },
      c: {
        label: 'Calls',
        description: 'Show calls submenu',
        keymaps: {
          i: { label: 'Incoming', description: 'Show incoming calls' },
          o: { label: 'Outgoing', description: 'Show outgoing calls' },
        },
      },
      d: { label: 'Definition', description: 'Go to symbol definition' },
      i: { label: 'Info', description: 'Show symbol information', notes: 'Hover Information' },
      l: { label: 'Log', description: 'Insert log for symbol', notes: 'If available. (e.g. Programmatically log symbol under cursor)' },
      n: { label: 'Name', description: 'Rename symbol' },
      r: { label: 'References', description: 'Show symbol references' },
      t: { label: 'Type', description: 'Go to type definition' },
      v: {
        label: 'Version',
        description: 'Show version submenu',
        keymaps: {
          b: { label: 'Blame', description: 'Show version blame for line' },
          h: { label: 'History', description: 'Show version history for line' },
        },
      },
    },
  },
} as const;
