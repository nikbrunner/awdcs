interface HeaderProps {
	theme: "light" | "dark";
	onThemeToggle: () => void;
}

export function Header({ theme, onThemeToggle }: HeaderProps) {
	return (
		<header
			style={{
				backgroundColor: "var(--color-surface)",
				borderBottom: "1px solid var(--color-border)",
				padding: "1rem 0",
			}}
		>
			<div
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					padding: "0 2rem",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div>
					<h1 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>AWDCS</h1>
					<p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
						A Working Directory Context System
					</p>
				</div>
				<nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
					<button
						type="button"
						onClick={onThemeToggle}
						aria-label="Toggle theme"
						style={{
							background: "none",
							border: "none",
							fontSize: "1.25rem",
							cursor: "pointer",
							padding: "0.5rem",
							borderRadius: "4px",
							transition: "background-color 0.2s",
						}}
					>
						{theme === "light" ? "🌙" : "☀️"}
					</button>
					<a
						href="https://github.com/nikbrunner/awdcs"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							color: "var(--color-primary)",
							textDecoration: "none",
							fontWeight: "500",
						}}
					>
						GitHub
					</a>
				</nav>
			</div>
		</header>
	);
}
