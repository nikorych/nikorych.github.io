class Particle {

	MOUSE_RADIUS = 200;
	MOUSE_SPEED = 20;
	MOUSE_MASS = 10;
	PARTICLE_MASS = 1;
	SPRING_FRICTION = 0.95; // 0.9
	SPRING_FORCE = 0.01; // 0.1

	constructor(sx, sy, x, y, color) {
		this.startPosition = new Vector(sx, sy);
		this.position = new Vector(x, y);
		this.velocity = new Vector(0, 0);
		this.mass = this.PARTICLE_MASS;
		this.color = color;
	}

	render(context) {
        context.fillStyle = this.color;
      	context.fillRect(this.position.getX(), this.position.getY(), 1, 1);
	}

	update(mouse) {
		if (this.distanceTo(mouse.x, mouse.y, this.position.getX(), this.position.getY()) <= this.MOUSE_RADIUS) {
			this.resolveCollision(this, mouse);
		} else {
			this.updateSpring();
		}
		if (this.velocity.getX() < 0.1 && this.velocity.getY() < 0.1) {
			this.velocity.addTo(new Vector(Math.random() - 0.5, Math.random() - 0.5));
		}
		this.position.addTo(this.velocity);
	}

	resolveCollision(particle, mouse) {
		var mouseVelocity = new Vector((Math.random() - 0.5) * this.MOUSE_SPEED, (Math.random() - 0.5) * this.MOUSE_SPEED);

		var xVelocityDiff = particle.velocity.getX() - mouseVelocity.getX();
		var yVelocityDiff = particle.velocity.getY() - mouseVelocity.getY();

		var xDist = mouse.x - particle.position.getX();
		var yDist = mouse.y - particle.position.getY();

		if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
			var angle = -Math.atan2(mouse.y - particle.position.getY(), mouse.x - particle.position.getX());

			var m1 = particle.mass;
			var m2 = this.MOUSE_MASS;

			var u1 = this.rotate(particle.velocity, angle);
			var u2 = this.rotate(mouseVelocity, angle);

			var v1 = new Vector(u1.getX() * (m1 - m2) / (m1 + m2) + u2.getX() * 2 * m2 / (m1 + m2), u1.getY());

			var vFinal1 = this.rotate(v1, -angle);

			particle.velocity.setX(vFinal1.getX());
			particle.velocity.setY(vFinal1.getY());
		}
	}

	updateSpring() {
		var distance = this.startPosition.subtract(this.position);
		var springForce = distance.multiply(this.SPRING_FORCE);
		this.velocity.addTo(springForce);
		this.velocity.multiplyBy(this.SPRING_FRICTION);
	}

	rotate(velocity, angle) {
		return new Vector(velocity.getX() * Math.cos(angle) - velocity.getY() * Math.sin(angle),
				velocity.getX() * Math.sin(angle) - velocity.getY() * Math.cos(angle));
	}

	distanceTo(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;

		return Math.sqrt((dx * dx) + (dy * dy));
	}	
}
