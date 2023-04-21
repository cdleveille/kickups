export const now = (): number => {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};

export const getDistanceBetweenPoints = (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
	const { x: x1, y: y1 } = pos1;
	const { x: x2, y: y2 } = pos2;
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

export const loadImage = (url: string) => {
	console.log(url);
	const img = new Image();
	img.src = url;
	return img;
};
