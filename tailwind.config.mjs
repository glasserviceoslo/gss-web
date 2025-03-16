/** @type {import('tailwindcss').Config} */
const config = {
	theme: {
		extend: {
			// borderRadius: {
			// 	lg: "var(--radius)",
			// 	md: "calc(var(--radius) - 2px)",
			// 	sm: "calc(var(--radius) - 4px)",
			// },
			// colors: {
			// 	accent: {
			// 		DEFAULT: "hsl(var(--accent))",
			// 		foreground: "hsl(var(--accent-foreground))",
			// 	},
			// 	background: "hsl(var(--background))",
			// 	border: "hsla(var(--border))",
			// 	card: {
			// 		DEFAULT: "hsl(var(--card))",
			// 		foreground: "hsl(var(--card-foreground))",
			// 	},
			// 	destructive: {
			// 		DEFAULT: "hsl(var(--destructive))",
			// 		foreground: "hsl(var(--destructive-foreground))",
			// 	},
			// 	foreground: "hsl(var(--foreground))",
			// 	input: "hsl(var(--input))",
			// 	muted: {
			// 		DEFAULT: "hsl(var(--muted))",
			// 		foreground: "hsl(var(--muted-foreground))",
			// 	},
			// 	popover: {
			// 		DEFAULT: "hsl(var(--popover))",
			// 		foreground: "hsl(var(--popover-foreground))",
			// 	},
			// 	primary: {
			// 		DEFAULT: "hsl(var(--primary))",
			// 		foreground: "hsl(var(--primary-foreground))",
			// 	},
			// 	ring: "hsl(var(--ring))",
			// 	secondary: {
			// 		DEFAULT: "hsl(var(--secondary))",
			// 		foreground: "hsl(var(--secondary-foreground))",
			// 	},
			// 	success: "hsl(var(--success))",
			// 	error: "hsl(var(--error))",
			// 	warning: "hsl(var(--warning))",
			// },
			fontFamily: {
				mono: ["var(--font-geist-mono)"],
				sans: ["var(--font-geist-sans)"],
			},
			typography: () => ({
				DEFAULT: {
					css: [
						{
							"--tw-prose-body": "var(--text)",
							"--tw-prose-headings": "var(--text)",
							"--tw-prose-links": "var(--text)",
							h1: {
								fontWeight: "normal",
								marginBottom: "0.25em",
							},
						},
					],
				},
				base: {
					css: [
						{
							h1: {
								fontSize: "2.5rem",
							},
							h2: {
								fontSize: "1.25rem",
								fontWeight: 600,
							},
						},
					],
				},
				md: {
					css: [
						{
							h1: {
								fontSize: "3.5rem",
							},
							h2: {
								fontSize: "1.5rem",
							},
						},
					],
				},
			}),
		},
	},
};

export default config;
