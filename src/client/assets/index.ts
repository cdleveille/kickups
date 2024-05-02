import background from "./background.webp";
import ball from "./ball.svg";

const loadImage = (url: string) => {
	const img = new Image();
	img.src = url;
	return img;
};

export const backgroundImg = loadImage(background);
export const ballImg = loadImage(ball);
