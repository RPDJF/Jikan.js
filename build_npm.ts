import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("npm");

await build({
	entryPoints: ["./src/mod.ts"],
	outDir: "./npm",
	shims: {
		deno: true,
	},
	typeCheck: false,
	package: {
		name: "Jikan.js",
		version: Deno.args[0] || "0.0.0",
		description: "A TypeScript client for Jikan API",
		license: "MIT",
		repository: {
			type: "git",
			url: "git+https://github.com/RPDJF/Jikan.js.git",
		},
		bugs: {
			url: "git+https://github.com/RPDJF/Jikan.js/issues",
		},
	},
	postBuild() {
		Deno.copyFileSync("./README.md", "./npm/README.md");
		Deno.copyFileSync("./LICENSE", "./npm/LICENSE");
	},
})