export const now = (): number => {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};

export const getDistanceBetweenPoints = (x1: number, y1: number, x2: number, y2: number) => {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
