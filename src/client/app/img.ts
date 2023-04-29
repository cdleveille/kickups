import background from "../img/background.webp";
import ball from "../img/ball.svg";
import ballPng from "../img/icons/icon-128x128.png";
import { isFirefox, loadImage } from "./util";

export const ballImg = isFirefox ? loadImage(ballPng) : loadImage(ball);
export const backgroundImg = loadImage(background);
