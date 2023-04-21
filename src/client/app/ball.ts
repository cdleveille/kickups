import { ballImg } from "@app";

export class Ball {
	x: number;
	y: number;
	xv: number;
	yv: number;
	radius: number;
	g: number;
	bounceRatio: number;
	rollDecel: number;

	constructor() {
		this.bounceRatio = 0.75;
	}

	init(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.xv = 0;
		this.yv = 0;
	}

	resize(newWidth: number, radiusRatio: number, scaleRatio: number) {
		const oldWidth = this.radius / radiusRatio;
		const ratio = newWidth / oldWidth;
		this.x *= ratio;
		this.y *= ratio;
		this.xv *= scaleRatio;
		this.yv *= scaleRatio;
		this.g = 5000 * scaleRatio;
		this.rollDecel = 1 * scaleRatio;
		this.radius = newWidth * radiusRatio;
	}

	update(delta: number) {
		this.yv += this.g * delta;
		this.x += this.xv * delta;
		this.y += this.yv * delta;
	}

	draw(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number) {
		ctx.drawImage(
			ballImg as unknown as CanvasImageSource,
			this.x + offsetX - this.radius,
			this.y + offsetY - this.radius,
			this.radius * 2,
			this.radius * 2
		);
	}
}
