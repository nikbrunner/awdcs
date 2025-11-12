import { Header } from "./components/Header";
import { KeymapExplorer } from "./components/KeymapExplorer";
import { keymaps } from "./data/keymaps";
import { useTheme } from "./hooks/useTheme";

function App() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div
			style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
		>
			<Header theme={theme} onThemeToggle={toggleTheme} />
			<main style={{ flex: 1 }}>
				<div
					style={{
						maxWidth: "1200px",
						margin: "0 auto",
						padding: "3rem 2rem 2rem",
						textAlign: "center",
					}}
				>
					<h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
						AWDCS Keymap Reference
					</h1>
					<p
						style={{
							fontSize: "1.125rem",
							color: "var(--color-text-muted)",
							maxWidth: "600px",
							margin: "0 auto 1.5rem",
						}}
					>
						Traditional modal editor keymaps typically organize bindings by tool
						or function. AWDCS takes a different approach by organizing mappings
						based on their scope of operation.
					</p>
					<div style={{ marginTop: "1.5rem" }}>
						<code style={{ fontSize: "1.125rem", padding: "0.5rem 1rem" }}>
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
