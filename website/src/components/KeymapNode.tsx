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
