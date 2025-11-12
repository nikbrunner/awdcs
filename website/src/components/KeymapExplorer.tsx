import type { KeymapRoot } from "../types/keymap";
import styles from "./KeymapExplorer.module.css";
import { ScopeCard } from "./ScopeCard";

interface KeymapExplorerProps {
	keymaps: KeymapRoot;
}

export function KeymapExplorer({ keymaps }: KeymapExplorerProps) {
	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				{Object.entries(keymaps).map(
					([key, node]) =>
						node && (
							<ScopeCard
								key={key}
								scopeKey={key === "leader" ? "leader" : key}
								node={node}
							/>
						),
				)}
			</div>
		</div>
	);
}
