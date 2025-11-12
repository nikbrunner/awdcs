import React from 'react';
import type { KeymapRoot } from '../types/keymap';
import { ScopeCard } from './ScopeCard';

interface KeymapExplorerProps {
  keymaps: KeymapRoot;
}

export function KeymapExplorer({ keymaps }: KeymapExplorerProps) {
  return (
    <div style={{
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '2rem',
    }}>
      <div style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
        {Object.entries(keymaps).map(([key, node]) => (
          node && (
            <ScopeCard
              key={key}
              scopeKey={key === 'leader' ? 'leader' : key}
              node={node}
            />
          )
        ))}
      </div>
    </div>
  );
}
