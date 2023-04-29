declare module "*.svg" {
	const content: string;
	export default content;
}

declare module "*.webp" {
	const content: string;
	export default content;
}

declare module "*.png" {
	const content: string;
	export default content;
}

declare module "react-use-keypress" {
	export default function useKeypress(keys: string | string[], handler: (event: KeyboardEvent) => void): void;
}
