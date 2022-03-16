class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    setX(x) {
        this.x = x;
    }

    getY() {
        return this.y;
    }

    setY(y) {
        this.y = y;
    }

     add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    multiply(value) {
        return new Vector(this.x * value, this.y * value);
    }

    divide(value) {
        return new Vector(this.x / value, this.y / value);
    }

    addTo(vector) {
        this.x += vector.getX();
        this.y += vector.getY();
    }

    subtractFrom(vector) {
        this.x -= vector.getX();
        this.y -= vector.getY();
    }

    multiplyBy(value) {
        this.x *= value;
        this.y *= value;
    }

    divideBy(value) {
        this.x /= value;
        this.y /= value;
    }
}
