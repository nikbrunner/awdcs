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
