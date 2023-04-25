import { backgroundImg, Ball, getDistanceBetweenPoints } from "@app";
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
	mousePos: { x: number; y: number };
	score: number;
	shadow: { opacity: number; radius: number };
	setScore: (score: number) => void;
	setScaleRatio: (scaleRatio: number) => void;
	setOffset: (offset: { xOffset: number; yOffset: number }) => void;
	endStreak: (score: number) => void;
	clearScreen: () => void;

	constructor(
		setScore: (score: number) => void,
		setScaleRatio: (scaleRatio: number) => void,
		setOffset: (offset: { xOffset: number; yOffset: number }) => void,
		endStreak: (score: number) => void,
		clearScreen: () => void
	) {
		this.ball = new Ball();
		this.radiusRatio = 1 / 12;
		this.setScore = (score: number) => {
			this.score = score;
			setScore(score);
		};
		this.setScaleRatio = setScaleRatio;
		this.setOffset = setOffset;
		this.endStreak = endStreak;
		this.clearScreen = clearScreen;
	}

	init() {
		this.ball.init(this.width / 2, this.height - this.floorHeight - this.ball.radius);
		this.setScore(0);
		this.updateShadow();
	}

	resize(screen: IResize) {
		this.width = screen.width;
		this.height = screen.height;
		this.xOffset = screen.xOffset;
		this.yOffset = screen.yOffset;
		this.floorHeight = this.height / 5;
		this.scaleRatio = this.height / 929;
		this.ball.resize(this.width, this.radiusRatio, this.scaleRatio);
		this.setScaleRatio(this.scaleRatio);
		this.setOffset({ xOffset: this.xOffset, yOffset: this.yOffset });
	}

	update(delta: number) {
		this.ball.update(delta);
		this.checkForHover();
		this.checkForCollisions(this.ball, delta);
		this.updateShadow();
	}

	updateMousePos(pos: { x: number; y: number }) {
		this.mousePos = pos;
	}

	checkForHover() {
		if (!this.mousePos) return;
		const hovering =
			getDistanceBetweenPoints({ x: this.mousePos.x, y: this.mousePos.y }, { x: this.ball.x, y: this.ball.y }) <=
			this.ball.radius;
		document.body.style.cursor = hovering ? "pointer" : "default";
	}

	checkForCollisions(ball: Ball, delta: number) {
		if (this.isBallCollidingWithFloor(ball)) {
			if (this.score > 0) {
				this.endStreak(this.score);
				this.score = 0;
			}
			ball.y = this.height - this.floorHeight - ball.radius;

			if (!this.ball.isStoppedVertical) {
				if (ball.yv > 20 * this.scaleRatio) {
					ball.yv = -ball.yv * ball.bounceRatio;
				} else {
					ball.yv = 0;
					this.ball.isStoppedVertical = true;
				}
			}
			if (ball.xv > 0) {
				const newXV = ball.xv - ball.rollDecel * delta;
				ball.xv = newXV > 0 ? newXV : 0;
			} else if (ball.xv < 0) {
				const newXV = ball.xv + ball.rollDecel * delta;
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

	onKick(pos: { x: number; y: number }) {
		const { x, y } = pos;
		if (getDistanceBetweenPoints({ x, y }, { x: this.ball.x, y: this.ball.y }) > this.ball.radius) return;
		this.clearScreen();
		this.ball.isStoppedVertical = false;
		this.setScore(this.score + 1);
		const xBoostPct = (x - this.ball.x) / this.ball.radius;
		const yBoostPct = (y - this.ball.y + this.ball.radius) / (this.ball.radius * 2);
		this.ball.xv = -800 * this.scaleRatio * xBoostPct;
		this.ball.yv = -1000 * this.scaleRatio - 800 * this.scaleRatio * yBoostPct;
	}

	updateShadow() {
		const opacity = 0.05 + 0.25 * (this.ball.y / (this.height - this.floorHeight));
		const radius = 10;
		this.shadow = { opacity, radius };
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = Color.GRAY;
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

		ctx.drawImage(
			backgroundImg as unknown as CanvasImageSource,
			this.xOffset,
			this.yOffset,
			this.width,
			this.height
		);

		ctx.fillStyle = `rgba(0, 0, 0, ${this.shadow.opacity})`;
		ctx.save();
		ctx.scale(5, 1);
		ctx.beginPath();
		ctx.arc(
			(this.ball.x + this.xOffset) / 5,
			this.height - this.floorHeight + this.yOffset,
			this.shadow.radius * this.scaleRatio,
			0,
			Math.PI * 2,
			false
		);
		ctx.fill();
		ctx.closePath();
		ctx.restore();

		this.ball.draw(ctx, this.xOffset, this.yOffset);

		if (this.yOffset > 0) {
			ctx.fillStyle = Color.GRAY;
			ctx.fillRect(0, 0, window.innerWidth, this.yOffset);
		}
	}
}
