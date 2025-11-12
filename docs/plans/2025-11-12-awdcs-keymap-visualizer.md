# AWDCS Keymap Visualizer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive web-based keymap explorer for AWDCS using Vite + React + TypeScript, deployed to GitHub Pages.

**Architecture:** Static site built with Vite. Keymap data defined in a nested TypeScript object that mirrors the actual key sequence structure. Simple recursive React components render the data. Theme switcher for dark/light modes. Print-optimized CSS for physical reference.

**Tech Stack:** Vite, React, TypeScript, GitHub Pages, GitHub Actions

**Data Structure Philosophy:** The keymap data structure directly mirrors the key sequences. Components recursively render the nested structure - "dumb" rendering that just walks the object tree.

---

## Task 1: Initialize Vite + React Project

**Files:**
- Create: `website/` (new directory for the site)
- Create: `website/package.json`
- Create: `website/vite.config.ts`
- Create: `website/tsconfig.json`
- Create: `website/index.html`

**Step 1: Create website directory and initialize**

```bash
mkdir website
cd website
npm create vite@latest . -- --template react-ts
```

When prompted:
- Package name: awdcs-keymap-visualizer
- Select framework: React
- Select variant: TypeScript

Expected: Vite + React + TypeScript project scaffolded

**Step 2: Install dependencies**

```bash
npm install
```

Expected: Dependencies installed

**Step 3: Configure base path for GitHub Pages**

Modify `website/vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/awdcs/' : '/',
})
```

Expected: Base path configured for GitHub Pages deployment

**Step 4: Test build**

```bash
npm run build
```

Expected: Build completes successfully, `dist/` directory created

**Step 5: Commit initial setup**

```bash
cd ..
git add website/
git commit -m "feat: initialize Vite + React + TypeScript project"
```

---

## Task 2: Set Up GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: website/package-lock.json

      - name: Install dependencies
        run: |
          cd website
          npm ci

      - name: Build
        run: |
          cd website
          npm run build
        env:
          NODE_ENV: production

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: website/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Expected: GitHub Actions workflow configured

**Step 2: Create .nojekyll file**

```bash
cd website
mkdir -p public
touch public/.nojekyll
```

Expected: File prevents Jekyll processing on GitHub Pages (Vite copies `public/` to `dist/`)

**Step 3: Commit deployment setup**

```bash
cd ..
git add .github/workflows/deploy.yml website/public/.nojekyll
git commit -m "feat: add GitHub Pages deployment workflow"
```

---

## Task 3: Create Keymap Data Structure

**Files:**
- Create: `website/src/data/keymaps.ts`
- Create: `website/src/types/keymap.ts`

**Step 1: Define TypeScript types**

Create `website/src/types/keymap.ts`:

```typescript
export interface KeymapNode {
  label: string;
  description?: string;
  notes?: string;
  keymaps?: Record<string, KeymapNode>;
}

export interface KeymapRoot {
  leader?: {
    label: string;
    keymaps: Record<string, KeymapNode>;
  };
  [key: string]: KeymapNode | undefined;
}
```

Expected: Type definitions for nested keymap structure

**Step 2: Create keymap data file**

Create `website/src/data/keymaps.ts`:

```typescript
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
          r: { label: 'Recent', description: 'Open recently visited documents accross all workspace', notes: 'If available.' },
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
          r: { label: 'Recent', description: 'Show recently visited documents', notes: "Optional: Maybe not needed, if editor merges recently opend documents in `<leader>wd`." },
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
```

Expected: Complete keymap data in nested structure

**Step 3: Commit data structure**

```bash
git add website/src/
git commit -m "feat: add nested keymap data structure"
```

---

## Task 4: Build Core Components

**Files:**
- Create: `website/src/components/Header.tsx`
- Create: `website/src/components/KeymapExplorer.tsx`
- Create: `website/src/components/KeymapNode.tsx`
- Create: `website/src/hooks/useTheme.ts`
- Modify: `website/src/App.tsx`
- Modify: `website/src/index.css`

**Step 1: Create global styles**

Modify `website/src/index.css`:

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #1a1a1a;
  --color-text-muted: #666666;
  --color-primary: #0066cc;
  --color-border: #e0e0e0;
  --color-accent: #f0f7ff;

  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

[data-theme='dark'] {
  --color-bg: #1a1a1a;
  --color-surface: #2a2a2a;
  --color-text: #e0e0e0;
  --color-text-muted: #999999;
  --color-primary: #4da6ff;
  --color-border: #404040;
  --color-accent: #1a2a3a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}

code, kbd {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background-color: var(--color-surface);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  border: 1px solid var(--color-border);
}
```

Expected: CSS variables for theming

**Step 2: Create theme hook**

Create `website/src/hooks/useTheme.ts`:

```typescript
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
```

Expected: Theme management hook

**Step 3: Create Header component**

Create `website/src/components/Header.tsx`:

```typescript
import React from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Header({ theme, onThemeToggle }: HeaderProps) {
  return (
    <header style={{
      backgroundColor: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      padding: '1rem 0',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>AWDCS</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            A Working Directory Context System
          </p>
        </div>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={onThemeToggle}
            aria-label="Toggle theme"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <a
            href="https://github.com/nikbrunner/awdcs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
```

Expected: Header with theme toggle

**Step 4: Create KeymapNode component**

Create `website/src/components/KeymapNode.tsx`:

```typescript
import React, { useState } from 'react';
import type { KeymapNode as KeymapNodeType } from '../types/keymap';

interface KeymapNodeProps {
  nodeKey: string;
  node: KeymapNodeType;
  path: string[];
  depth: number;
}

export function KeymapNode({ nodeKey, node, path, depth }: KeymapNodeProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const hasChildren = node.keymaps && Object.keys(node.keymaps).length > 0;
  const currentPath = [...path, nodeKey];
  const binding = currentPath.join('');

  return (
    <div style={{
      marginBottom: depth === 0 ? '1rem' : '0',
      border: depth === 0 ? '1px solid var(--color-border)' : 'none',
      borderRadius: depth === 0 ? '8px' : '0',
      overflow: 'hidden',
      backgroundColor: depth === 0 ? 'var(--color-surface)' : 'transparent',
    }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          padding: depth === 0 ? '1.5rem' : '0.75rem 1.5rem',
          background: 'none',
          border: 'none',
          cursor: hasChildren ? 'pointer' : 'default',
          textAlign: 'left',
          transition: 'background-color 0.2s',
          backgroundColor: depth === 0 ? 'var(--color-surface)' : 'transparent',
        }}
        disabled={!hasChildren}
      >
        {hasChildren && (
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            paddingTop: '0.25rem',
          }}>
            {isExpanded ? '▼' : '▶'}
          </span>
        )}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: depth === 0 ? '1.5rem' : '1rem',
            marginBottom: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <kbd style={{
              fontSize: depth === 0 ? '1rem' : '0.875rem',
              color: 'var(--color-primary)',
            }}>
              {binding}
            </kbd>
            <span>{node.label}</span>
          </div>
          {node.description && (
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              margin: 0,
            }}>
              {node.description}
            </p>
          )}
          {node.notes && (
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
              marginTop: '0.25rem',
            }}>
              {node.notes}
            </p>
          )}
        </div>
      </button>

      {isExpanded && hasChildren && (
        <div style={{
          padding: '0 1.5rem 1.5rem 3.5rem',
          backgroundColor: depth === 0 ? 'var(--color-bg)' : 'transparent',
        }}>
          {Object.entries(node.keymaps!).map(([key, childNode]) => (
            <KeymapNode
              key={key}
              nodeKey={key}
              node={childNode}
              path={currentPath}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

Expected: Recursive component for rendering keymap tree

**Step 5: Create KeymapExplorer component**

Create `website/src/components/KeymapExplorer.tsx`:

```typescript
import React from 'react';
import type { KeymapRoot } from '../types/keymap';
import { KeymapNode } from './KeymapNode';

interface KeymapExplorerProps {
  keymaps: KeymapRoot;
}

export function KeymapExplorer({ keymaps }: KeymapExplorerProps) {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
    }}>
      {Object.entries(keymaps).map(([key, node]) => (
        node && (
          <KeymapNode
            key={key}
            nodeKey={key === 'leader' ? '<leader>' : key}
            node={node}
            path={[]}
            depth={0}
          />
        )
      ))}
    </div>
  );
}
```

Expected: Explorer component that renders the keymap tree

**Step 6: Update App component**

Modify `website/src/App.tsx`:

```typescript
import React from 'react';
import { Header } from './components/Header';
import { KeymapExplorer } from './components/KeymapExplorer';
import { useTheme } from './hooks/useTheme';
import { keymaps } from './data/keymaps';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header theme={theme} onThemeToggle={toggleTheme} />
      <main style={{ flex: 1 }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 2rem 2rem',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            AWDCS Keymap Reference
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto 1.5rem',
          }}>
            Traditional modal editor keymaps typically organize bindings by tool or function.
            AWDCS takes a different approach by organizing mappings based on their scope of operation.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <code style={{ fontSize: '1.125rem', padding: '0.5rem 1rem' }}>
              &lt;Scope&gt;&lt;?Group?&gt;&lt;Operation&gt;
            </code>
          </div>
        </div>
        <KeymapExplorer keymaps={keymaps} />
      </main>
    </div>
  );
}

export default App;
```

Expected: Complete App with all components integrated

**Step 7: Test locally**

```bash
cd website
npm run dev
```

Open browser to http://localhost:5173

Expected: Site loads with expandable keymap tree, theme toggle works

**Step 8: Commit UI components**

```bash
cd ..
git add website/src/
git commit -m "feat: add React components and theme support"
```

---

## Task 5: Add Print Styles

**Files:**
- Modify: `website/src/index.css`

**Step 1: Add print media queries**

Append to `website/src/index.css`:

```css
@media print {
  :root {
    --color-bg: #ffffff;
    --color-surface: #ffffff;
    --color-text: #000000;
    --color-text-muted: #666666;
    --color-primary: #000000;
    --color-border: #cccccc;
    --color-accent: #ffffff;
  }

  body {
    font-size: 10pt;
  }

  header nav {
    display: none;
  }

  button {
    background-color: #f5f5f5 !important;
    page-break-inside: avoid;
  }

  button[disabled] {
    cursor: default;
  }

  kbd, code {
    border: 1px solid #cccccc;
    background-color: #f5f5f5;
  }

  /* Expand all sections for print */
  button + div {
    display: block !important;
  }
}
```

Expected: Print-optimized styles

**Step 2: Update KeymapNode for print**

Modify `website/src/components/KeymapNode.tsx` to auto-expand for print.

Add effect to component:

```typescript
// Add at top of component
React.useEffect(() => {
  const handleBeforePrint = () => setIsExpanded(true);
  window.addEventListener('beforeprint', handleBeforePrint);
  return () => window.removeEventListener('beforeprint', handleBeforePrint);
}, []);
```

Expected: All nodes expand when printing

**Step 3: Test print view**

```bash
cd website
npm run dev
```

Open browser, press Ctrl/Cmd+P to preview print

Expected: Clean print layout with all sections visible

**Step 4: Commit print styles**

```bash
cd ..
git add website/src/
git commit -m "feat: add print-optimized styles"
```

---

## Task 6: Final Testing and Deployment

**Files:**
- Modify: `README.md`

**Step 1: Build production version**

```bash
cd website
npm run build
```

Expected: Build completes without errors

**Step 2: Preview production build locally**

```bash
npm run preview
```

Open browser to preview URL

Expected: Site works correctly with /awdcs/ base path

**Step 3: Update main README with website link**

Modify `README.md`, add after the banner:

```markdown
## 🌐 Interactive Keymap Reference

Visit the [interactive keymap visualizer](https://nikbrunner.github.io/awdcs/) for a better browsing experience.
```

Expected: Link added to README

**Step 4: Commit README update**

```bash
git add README.md
git commit -m "docs: add link to interactive keymap visualizer"
```

**Step 5: Push to GitHub**

```bash
git push origin main
```

Expected: GitHub Actions workflow triggers

**Step 6: Enable GitHub Pages**

1. Go to repository settings on GitHub
2. Navigate to Pages section
3. Source should be "GitHub Actions" (automatically set by workflow)
4. Wait for deployment (check Actions tab)

Expected: Site deployed to https://nikbrunner.github.io/awdcs/

**Step 7: Verify deployment**

Visit https://nikbrunner.github.io/awdcs/

Expected: Site loads correctly with all features working

**Step 8: Final commit**

```bash
git commit --allow-empty -m "docs: deployment complete"
git push origin main
```

---

## Notes

- **Data Structure**: The keymap data directly mirrors the key sequence tree. To add a new keymap, just add it to the nested object in the right place.
- **GitHub Pages Configuration**: The repository needs Pages enabled with "GitHub Actions" as the source
- **Base Path**: The site uses `/awdcs/` as base path since it's hosted at username.github.io/awdcs
- **Theme Persistence**: Theme preference is saved to localStorage
- **Print Optimization**: Print view automatically expands all sections and uses printer-friendly colors
- **Component Architecture**: Recursive `KeymapNode` component renders the nested structure - very simple, just walks the object tree

## Future Enhancements (Out of Scope)

- Search/filter functionality
- Copy to clipboard for keybindings
- Export to PDF
- Keyboard shortcuts reference card
- Visual keyboard layout view
