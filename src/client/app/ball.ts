import { Color } from "@types";

export class Ball {
	x: number;
	y: number;
	xv: number;
	yv: number;
	radius: number;
	g: number;
	bounceRatio: number;

	constructor() {
		this.g = 4000;
		this.bounceRatio = 0.75;
	}

	init(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.xv = 0;
		this.yv = 0;
	}

	resize(newWidth: number, scaleRatio: number) {
		const oldWidth = this.radius / scaleRatio;
		const ratio = newWidth / oldWidth;
		this.x *= ratio;
		this.y *= ratio;
		this.radius = newWidth * scaleRatio;
	}

	update(delta: number) {
		this.yv += this.g * delta;
		this.x += this.xv * delta;
		this.y += this.yv * delta;
	}

	draw(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number) {
		ctx.fillStyle = Color.RED;
		ctx.beginPath();
		ctx.arc(this.x + offsetX, this.y + offsetY, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
	}
}
