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
	rotationRate: number;
	rotationMagnitude: number;
	isStopped: boolean;

	constructor() {
		this.bounceRatio = 0.75;
	}

	init(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.xv = 0;
		this.yv = 0;
		this.rotationMagnitude = 0;
		this.isStopped = true;
	}

	resize(newWidth: number, radiusRatio: number, scaleRatio: number) {
		const oldWidth = this.radius / radiusRatio;
		const ratio = newWidth / oldWidth;
		this.radius = newWidth * radiusRatio;
		this.x *= ratio;
		this.y *= ratio;
		this.xv *= ratio;
		this.yv *= ratio;
		this.g = 4000 * scaleRatio;
		this.rollDecel = 500 * scaleRatio;
		this.rotationRate = 0.009;
	}

	update(delta: number, scaleRatio: number) {
		if (!this.isStopped) this.yv += this.g * delta;
		this.y += this.yv * delta;
		this.x += this.xv * delta;
		this.rotationMagnitude = this.rotationMagnitude + this.rotationRate * (this.xv / scaleRatio) * delta;
	}

	draw(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number) {
		ctx.save();
		ctx.translate(this.x + offsetX, this.y + offsetY);
		ctx.rotate(this.rotationMagnitude);
		ctx.drawImage(
			ballImg as unknown as CanvasImageSource,
			-this.radius,
			-this.radius,
			this.radius * 2,
			this.radius * 2
		);
		ctx.restore();
	}
}
