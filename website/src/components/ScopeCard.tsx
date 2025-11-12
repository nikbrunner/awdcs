import { cva, cx } from "class-variance-authority";
import { ChevronDown, ChevronRight, Keyboard } from "lucide-react";
import { useState } from "react";
import type { KeymapNode as KeymapNodeType } from "../types/keymap";
import { KeymapNode } from "./KeymapNode";
import styles from "./ScopeCard.module.css";

interface ScopeCardProps {
    scopeKey: string;
    node: KeymapNodeType;
}

const getScopeColor = (key: string): string => {
    const scopeMap: Record<string, string> = {
        a: "scope-app",
        w: "scope-workspace",
        d: "scope-document",
        c: "scope-change",
        s: "scope-symbol",
    };
    return scopeMap[key] || "scope-app";
};

const cardVariants = cva(cx("neobrutalist-card", styles.card), {
    variants: {
        clickable: {
            true: styles.clickable,
            false: "",
        },
    },
});

export function ScopeCard({ scopeKey, node }: ScopeCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = node.keymaps && Object.keys(node.keymaps).length > 0;
    const scopeColorClass = getScopeColor(scopeKey);

    return (
        <div className={styles.wrapper}>
            {/* Top-level Scope Card */}
            <button
                type="button"
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
                className={cardVariants({ clickable: hasChildren })}
                disabled={!hasChildren}
            >
                {/* Header with key indicator */}
                <div className={cx(scopeColorClass, styles.header)}>
                    <div className={styles.headerContent}>
                        <Keyboard size={28} />
                        <kbd className={cx("neobrutalist-kbd", styles.kbd)}>
                            {scopeKey === "leader" ? "<leader>" : scopeKey}
                        </kbd>
                    </div>
                    {hasChildren &&
                        (isExpanded ? (
                            <ChevronDown size={24} />
                        ) : (
                            <ChevronRight size={24} />
                        ))}
                </div>

                {/* Label and Description */}
                <div className={styles.content}>
                    <h3 className={styles.title}>{node.label}</h3>
                    {node.description && (
                        <p className={styles.description}>{node.description}</p>
                    )}
                </div>

                {/* Notes */}
                {node.notes && <p className={styles.notes}>{node.notes}</p>}
            </button>

            {/* Expanded Children */}
            {isExpanded && hasChildren && node.keymaps && (
                <div className={styles.childrenGrid}>
                    {Object.entries(node.keymaps).map(([key, childNode]) => {
                        // For leader's direct children (a, w, d, c), apply scope colors
                        const scopeColorClass =
                            scopeKey === "leader"
                                ? getScopeColor(key)
                                : undefined;

                        return (
                            <KeymapNode
                                key={key}
                                nodeKey={key}
                                node={childNode}
                                path={[
                                    scopeKey === "leader"
                                        ? "<leader>"
                                        : scopeKey,
                                ]}
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
