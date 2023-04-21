import { Ball, getDistanceBetweenPoints } from "@app";
import { Color, IResize } from "@types";

export class Game {
	width: number;
	height: number;
	xOffset: number;
	yOffset: number;
	floorHeight: number;
	ball: Ball;
	radiusRatio: number;
	scaleRatio: number;

	constructor() {
		this.ball = new Ball();
		this.radiusRatio = 1 / 10;
	}

	init() {
		this.ball.init(this.width / 2, this.height / 3);
	}

	resize(screen: IResize) {
		this.width = screen.width;
		this.height = screen.height;
		this.xOffset = screen.xOffset;
		this.yOffset = screen.yOffset;
		this.floorHeight = this.height / 5;
		this.scaleRatio = this.height / 929;

		this.ball.resize(this.width, this.radiusRatio, this.scaleRatio);
	}

	update(delta: number) {
		this.ball.update(delta);
		this.checkForCollision(this.ball);
	}

	checkForCollision(ball: Ball) {
		if (this.isBallCollidingWithFloor(ball)) {
			ball.y = this.height - this.floorHeight - ball.radius;
			ball.yv = -ball.yv * ball.bounceRatio;
			if (ball.xv > 0) {
				const newXV = ball.xv - ball.rollDecel;
				ball.xv = newXV > 0 ? newXV : 0;
			} else if (ball.xv < 0) {
				const newXV = ball.xv + ball.rollDecel;
				ball.xv = newXV < 0 ? newXV : 0;
			}
		}
		if (this.isBallCollidingWithWall(ball)) {
			ball.x = ball.x - ball.radius <= 0 ? ball.radius : this.width - ball.radius;
			ball.xv = -ball.xv * ball.bounceRatio;
		}
	}

	isBallCollidingWithFloor(ball: Ball) {
		return ball.y + ball.radius >= this.height - this.floorHeight;
	}

	isBallCollidingWithWall(ball: Ball) {
		return ball.x - ball.radius <= 0 || ball.x + ball.radius >= this.width;
	}

	onKick(x: number, y: number) {
		if (getDistanceBetweenPoints(x, y, this.ball.x, this.ball.y) > this.ball.radius) return;
		const xBoostPct = (x - this.ball.x) / this.ball.radius;
		const yBoostPct = (y - this.ball.y + this.ball.radius) / (this.ball.radius * 2);
		this.ball.xv = -800 * this.scaleRatio * xBoostPct;
		this.ball.yv = -1000 * this.scaleRatio - 800 * this.scaleRatio * yBoostPct;
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
