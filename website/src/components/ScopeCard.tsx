import React, { useState } from 'react';
import { Keyboard, ChevronDown, ChevronRight } from 'lucide-react';
import type { KeymapNode as KeymapNodeType } from '../types/keymap';
import { KeymapNode } from './KeymapNode';

interface ScopeCardProps {
  scopeKey: string;
  node: KeymapNodeType;
}

const getScopeColor = (key: string): string => {
  const scopeMap: Record<string, string> = {
    a: 'scope-app',
    w: 'scope-workspace',
    d: 'scope-document',
    c: 'scope-change',
    s: 'scope-symbol',
  };
  return scopeMap[key] || 'scope-app';
};

export function ScopeCard({ scopeKey, node }: ScopeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.keymaps && Object.keys(node.keymaps).length > 0;
  const scopeColorClass = getScopeColor(scopeKey);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '320px',
        maxWidth: '400px',
      }}
    >
      {/* Top-level Scope Card */}
      <button
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        className="neobrutalist-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          padding: '2rem',
          background: 'var(--color-surface)',
          cursor: hasChildren ? 'pointer' : 'default',
          width: '100%',
          textAlign: 'left',
        }}
        disabled={!hasChildren}
      >
        {/* Header with key indicator */}
        <div
          className={scopeColorClass}
          style={{
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Keyboard size={28} />
            <kbd
              className="neobrutalist-kbd"
              style={{
                fontSize: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '3px solid rgba(255, 255, 255, 0.5)',
              }}
            >
              {scopeKey === 'leader' ? '<leader>' : scopeKey}
            </kbd>
          </div>
          {hasChildren && (
            isExpanded ? (
              <ChevronDown size={24} />
            ) : (
              <ChevronRight size={24} />
            )
          )}
        </div>

        {/* Label and Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3
            style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              margin: 0,
              color: 'var(--color-text)',
            }}
          >
            {node.label}
          </h3>
          {node.description && (
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--color-text-muted)',
                margin: 0,
                lineHeight: '1.5',
              }}
            >
              {node.description}
            </p>
          )}
        </div>

        {/* Notes */}
        {node.notes && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
              margin: 0,
              lineHeight: '1.4',
            }}
          >
            {node.notes}
          </p>
        )}
      </button>

      {/* Expanded Children */}
      {isExpanded && hasChildren && (
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            paddingLeft: '1rem',
          }}
        >
          {Object.entries(node.keymaps!).map(([key, childNode]) => {
            // For leader's direct children (a, w, d, c), apply scope colors
            const scopeColorClass = scopeKey === 'leader' ? getScopeColor(key) : undefined;

            return (
              <KeymapNode
                key={key}
                nodeKey={key}
                node={childNode}
                path={[scopeKey === 'leader' ? '<leader>' : scopeKey]}
                depth={1}
                scopeColorClass={scopeColorClass}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
