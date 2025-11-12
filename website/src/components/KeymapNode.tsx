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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}>
      {/* Parent Node */}
      <div>
        <button
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
          className={`neobrutalist-card ${scopeColorClass || ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem 1.25rem',
            background: scopeColorClass ? undefined : 'var(--color-surface)',
            cursor: hasChildren ? 'pointer' : 'default',
            width: '100%',
            textAlign: 'left',
          }}
          disabled={!hasChildren}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flex: 1,
          }}>
            <Keyboard
              size={20}
              style={{
                color: scopeColorClass ? 'white' : 'var(--color-text)',
                flexShrink: 0,
              }}
            />
            <kbd
              className="neobrutalist-kbd"
              style={{
                fontSize: '1rem',
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
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '0.125rem',
                color: scopeColorClass ? 'white' : 'var(--color-text)',
              }}>
                {node.label}
              </div>

              {node.description && (
                <p style={{
                  fontSize: '0.875rem',
                  color: scopeColorClass ? 'rgba(255, 255, 255, 0.9)' : 'var(--color-text-muted)',
                  margin: 0,
                  lineHeight: '1.3',
                }}>
                  {node.description}
                </p>
              )}

              {node.notes && (
                <p style={{
                  fontSize: '0.75rem',
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
                <ChevronDown size={20} style={{ color: scopeColorClass ? 'white' : 'var(--color-text)' }} />
              ) : (
                <ChevronRight size={20} style={{ color: scopeColorClass ? 'white' : 'var(--color-text)' }} />
              )}
            </div>
          )}
        </button>
      </div>

      {/* Children Nodes */}
      {isExpanded && hasChildren && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1rem',
            paddingLeft: '2rem',
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
