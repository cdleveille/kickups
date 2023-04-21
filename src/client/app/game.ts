import { Ball, getDistanceBetweenPoints } from "@app";
import { Color, IResize } from "@types";

export class Game {
	width: number;
	height: number;
	xOffset: number;
	yOffset: number;
	floorHeight: number;
	ball: Ball;
	scaleRatio: number;

	constructor() {
		this.ball = new Ball();
		this.scaleRatio = 0.1;
	}

	init() {
		this.ball.init(this.width / 2, this.height / 4);
	}

	resize(screen: IResize) {
		this.width = screen.width;
		this.height = screen.height;
		this.xOffset = screen.xOffset;
		this.yOffset = screen.yOffset;
		this.floorHeight = this.height / 5;

		this.ball.resize(this.width, this.scaleRatio);
	}

	update(delta: number) {
		this.ball.update(delta);
		this.checkCollision();
	}

	checkCollision() {
		if (this.ball.y + this.ball.radius >= this.height - this.floorHeight) {
			this.ball.y = this.height - this.floorHeight - this.ball.radius;
			this.ball.yv = -this.ball.yv * this.ball.bounceRatio;
		}
	}

	onClick(x: number, y: number) {
		if (getDistanceBetweenPoints(x, y, this.ball.x, this.ball.y) <= this.ball.radius) {
			this.ball.yv = -1000;
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = Color.GRAY;
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

		ctx.fillStyle = Color.WHITE;
		ctx.fillRect(this.xOffset, this.yOffset, this.width, this.height);

		ctx.fillStyle = Color.GREEN;
		ctx.fillRect(this.xOffset, this.yOffset + this.height - this.floorHeight, this.width, this.floorHeight);

		this.ball.draw(ctx, this.xOffset, this.yOffset);
	}
}
