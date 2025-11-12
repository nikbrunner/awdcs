import React, { useState } from 'react';
import { Keyboard, ChevronDown, ChevronRight } from 'lucide-react';
import type { KeymapNode as KeymapNodeType } from '../types/keymap';

interface KeymapNodeProps {
  nodeKey: string;
  node: KeymapNodeType;
  path: string[];
  depth: number;
  scopeColorClass?: string;
}

export function KeymapNode({ nodeKey, node, path, depth, scopeColorClass }: KeymapNodeProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 1);
  const hasChildren = node.keymaps && Object.keys(node.keymaps).length > 0;
  const currentPath = [...path, nodeKey];
  const binding = currentPath.join('');
  const isTopLevel = depth === 0;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: isTopLevel ? '2rem' : '1rem',
    }}>
      {/* Parent Node */}
      <button
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        className={`neobrutalist-card ${scopeColorClass || ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isTopLevel ? '1rem' : '0.5rem',
          padding: isTopLevel ? '0.75rem 1rem' : '0.5rem 0.75rem',
          background: scopeColorClass ? undefined : 'var(--color-surface)',
          cursor: hasChildren ? 'pointer' : 'default',
          minWidth: isTopLevel ? '280px' : '240px',
          maxWidth: isTopLevel ? '400px' : '360px',
          textAlign: 'left',
          flexShrink: 0,
        }}
        disabled={!hasChildren}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isTopLevel ? '1rem' : '0.5rem',
          flex: 1,
        }}>
          {isTopLevel && (
            <Keyboard
              size={18}
              style={{
                color: scopeColorClass ? 'white' : 'var(--color-text)',
                flexShrink: 0,
              }}
            />
          )}
          <kbd
            className="neobrutalist-kbd"
            style={{
              fontSize: isTopLevel ? '1rem' : '0.875rem',
              color: scopeColorClass ? 'white' : 'var(--color-text)',
              backgroundColor: scopeColorClass ? 'rgba(255, 255, 255, 0.2)' : undefined,
              border: scopeColorClass ? '3px solid rgba(255, 255, 255, 0.5)' : undefined,
              flexShrink: 0,
            }}
          >
            {binding}
          </kbd>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: isTopLevel ? '1rem' : '0.875rem',
              fontWeight: '700',
              marginBottom: '0.125rem',
              color: scopeColorClass ? 'white' : 'var(--color-text)',
            }}>
              {node.label}
            </div>

            {node.description && (
              <p style={{
                fontSize: isTopLevel ? '0.875rem' : '0.75rem',
                color: scopeColorClass ? 'rgba(255, 255, 255, 0.9)' : 'var(--color-text-muted)',
                margin: 0,
                lineHeight: '1.3',
              }}>
                {node.description}
              </p>
            )}

            {node.notes && (
              <p style={{
                fontSize: isTopLevel ? '0.75rem' : '0.7rem',
                color: scopeColorClass ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-text-muted)',
                fontStyle: 'italic',
                margin: '0.25rem 0 0 0',
                lineHeight: '1.3',
              }}>
                {node.notes}
              </p>
            )}
          </div>
        </div>

        {hasChildren && (
          <div style={{ flexShrink: 0 }}>
            {isExpanded ? (
              <ChevronDown size={18} style={{ color: scopeColorClass ? 'white' : 'var(--color-text)' }} />
            ) : (
              <ChevronRight size={18} style={{ color: scopeColorClass ? 'white' : 'var(--color-text)' }} />
            )}
          </div>
        )}
      </button>

      {/* Children Nodes */}
      {isExpanded && hasChildren && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            flex: 1,
            minWidth: 0,
            paddingLeft: '1rem',
            borderLeft: '4px solid var(--color-border)',
          }}
        >
          {Object.entries(node.keymaps!).map(([key, childNode]) => (
            <div key={key} data-child-node>
              <KeymapNode
                nodeKey={key}
                node={childNode}
                path={currentPath}
                depth={depth + 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
