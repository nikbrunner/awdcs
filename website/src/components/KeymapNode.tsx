import { cva, cx } from "class-variance-authority";
import { ChevronDown, ChevronRight, Keyboard } from "lucide-react";
import { useState } from "react";
import type { KeymapNode as KeymapNodeType } from "../types/keymap";
import styles from "./KeymapNode.module.css";

interface KeymapNodeProps {
    nodeKey: string;
    node: KeymapNodeType;
    path: string[];
    depth: number;
    scopeColorClass?: string;
}

const cardVariants = cva(cx("neobrutalist-card", styles.card), {
    variants: {
        level: {
            top: styles.topLevel,
            nested: styles.nested,
        },
        colored: {
            true: styles.colored,
            false: styles.default,
        },
        clickable: {
            true: styles.clickable,
            false: "",
        },
    },
});

const cardContentVariants = cva(styles.cardContent, {
    variants: {
        level: {
            top: styles.topLevel,
            nested: styles.nested,
        },
    },
});

const iconVariants = cva(styles.icon, {
    variants: {
        colored: {
            true: styles.colored,
            false: styles.default,
        },
    },
});

const kbdVariants = cva(cx("neobrutalist-kbd", styles.kbd), {
    variants: {
        level: {
            top: styles.topLevel,
            nested: styles.nested,
        },
        colored: {
            true: styles.colored,
            false: styles.default,
        },
    },
});

const labelVariants = cva(styles.label, {
    variants: {
        level: {
            top: styles.topLevel,
            nested: styles.nested,
        },
        colored: {
            true: styles.colored,
            false: styles.default,
        },
    },
});

const descriptionVariants = cva(styles.description, {
    variants: {
        level: {
            top: styles.topLevel,
            nested: styles.nested,
        },
        colored: {
            true: styles.colored,
            false: styles.default,
        },
    },
});

const notesVariants = cva(styles.notes, {
    variants: {
        level: {
            top: styles.topLevel,
            nested: styles.nested,
        },
        colored: {
            true: styles.colored,
            false: styles.default,
        },
    },
});

const chevronVariants = cva(styles.chevron, {
    variants: {
        colored: {
            true: styles.colored,
            false: styles.default,
        },
    },
});

const childrenGridVariants = cva(styles.childrenGrid, {
    variants: {
        level: {
            top: styles.topLevel,
            nested: styles.nested,
        },
        root: {
            true: styles.root,
            false: "",
        },
    },
});

export function KeymapNode({
    nodeKey,
    node,
    path,
    depth,
    scopeColorClass,
}: KeymapNodeProps) {
    const [isExpanded, setIsExpanded] = useState(depth < 1);
    const hasChildren = node.keymaps && Object.keys(node.keymaps).length > 0;
    const currentPath = [...path, nodeKey];
    const binding = currentPath.join("");
    const isTopLevel = depth === 0;
    const isColored = !!scopeColorClass;
    const level = isTopLevel ? "top" : "nested";

    return (
        <div className={styles.wrapper}>
            {/* Parent Node */}
            <button
                type="button"
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
                className={cx(
                    cardVariants({
                        level,
                        colored: isColored,
                        clickable: hasChildren,
                    }),
                    scopeColorClass,
                )}
                disabled={!hasChildren}
            >
                <div className={cardContentVariants({ level })}>
                    {isTopLevel && (
                        <Keyboard
                            size={18}
                            className={iconVariants({ colored: isColored })}
                        />
                    )}
                    <kbd className={kbdVariants({ level, colored: isColored })}>
                        {binding}
                    </kbd>

                    <div className={styles.textContent}>
                        <div
                            className={labelVariants({
                                level,
                                colored: isColored,
                            })}
                        >
                            {node.label}
                        </div>

                        {node.description && (
                            <p
                                className={descriptionVariants({
                                    level,
                                    colored: isColored,
                                })}
                            >
                                {node.description}
                            </p>
                        )}

                        {node.notes && (
                            <p
                                className={notesVariants({
                                    level,
                                    colored: isColored,
                                })}
                            >
                                {node.notes}
                            </p>
                        )}
                    </div>
                </div>

                {hasChildren && (
                    <div>
                        {isExpanded ? (
                            <ChevronDown
                                size={18}
                                className={chevronVariants({
                                    colored: isColored,
                                })}
                            />
                        ) : (
                            <ChevronRight
                                size={18}
                                className={chevronVariants({
                                    colored: isColored,
                                })}
                            />
                        )}
                    </div>
                )}
            </button>

            {/* Children Nodes */}
            {isExpanded && hasChildren && node.keymaps && (
                <div
                    className={childrenGridVariants({
                        level: depth === 1 ? "top" : "nested",
                        root: depth === 0,
                    })}
                >
                    {Object.entries(node.keymaps).map(([key, childNode]) => (
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
