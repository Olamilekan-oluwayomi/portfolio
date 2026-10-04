# Dependency footprint

Measured from installed package files by `scripts/dependency-sizes.mjs`.
These are disk bytes excluding nested dependencies, not browser transfer.
First-load gzip transfer is checked separately by `scripts/check-budgets.mjs`.
Versions are pinned in `package.json` and resolved in `package-lock.json`.

| Package | Version | Direct package bytes | Scope |
| --- | --- | ---: | --- |
| @mdx-js/loader | 3.1.1 | 15084 | dependencies |
| @mdx-js/react | 3.1.1 | 14393 | dependencies |
| @next/mdx | 16.3.8 | 15169 | dependencies |
| gray-matter | 4.0.3 | 38621 | dependencies |
| next | 16.3.8 | 185970409 | dependencies |
| react | 19.3.0 | 178663 | dependencies |
| react-dom | 19.3.0 | 8063782 | dependencies |
| zod | 4.6.5 | 6140311 | dependencies |
| @tailwindcss/postcss | 4.3.3 | 100480 | devDependencies |
| @types/mdx | 2.0.14 | 9985 | devDependencies |
| @types/node | 26.6.4 | 2546018 | devDependencies |
| @types/react | 19.3.0 | 408108 | devDependencies |
| @types/react-dom | 19.3.0 | 32862 | devDependencies |
| eslint | 9.39.5 | 3008896 | devDependencies |
| postcss | 8.5.28 | 218290 | devDependencies |
| tailwindcss | 4.3.3 | 772893 | devDependencies |
| tsx | 4.23.15 | 396881 | devDependencies |
| typescript | 6.0.3 | 24346827 | devDependencies |
| typescript-eslint | 8.71.0 | 42688 | devDependencies |
| vitest | 5.0.3 | 2759444 | devDependencies |
