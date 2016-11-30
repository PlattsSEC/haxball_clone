var keysPressed = [];

function onKeyUp(event) {
	var keyIndex = keysPressed.indexOf(event.key);
	if (keyIndex != -1)
		keysPressed.splice(keyIndex, 1);
}

function onKeyDown(event){
	if (keysPressed.indexOf(event.key) == -1)
		keysPressed.push(event.key);
}

function Ball(settings) {
	this.type = "Ball";

	this._settings = {
		radius: 12.5,
		fill: "blue",
		stroke: "black",
		deceleration: 0.5
	};

	this.updateSettings(settings);

	this.dirs = ["up", "down", "left", "right"];
	this.speed = {
		up: 0, down: 0, left: 0, right: 0
	};
	this._createCircle();
}

Ball.prototype.updateSettings = function(settings) {
	// this._settings = settings;
};

Ball.prototype._createCircle = function() {
	this._circle = new Path.Circle({
		center: [Math.round(Math.random() * 250), 100],
		radius: this._settings.radius,
		fillColor: this._settings.fill,
		strokeColor: this._settings.stroke
	});
};

Ball.prototype.update = function() {
	for (var i = 0; i < 4; i++) {
		var dir = this.dirs[i];

		this.speed[dir] -= this._settings.deceleration;
		
		this.speed[dir] = Math.max(0, this.speed[dir]);
	}

	this._circle.position.x += this.speed.right - this.speed.left;
	this._circle.position.y += this.speed.down - this.speed.up;

};

function Player(settings) {
	this.type = "Player";

	this.updateSettings(settings || {
		fill: "red",
		stroke: "black",
		name: "N/A",
		radius: 20,
		keys: {
			up: "w",
			down: "s",
			left: "a",
			right: "d",
			dash: "j",
		},
		acceleration: {
			normal: 1,
			dashStart: 16,
			dash: 0
		},
		deceleration: {
			normal: 0.5,
			dashStart: 0.75,
			dash: 1
		},
		speedMax: {
			normal: 7,
			dashStart: 12,
			dash: 12
		}
	});

	this.state = "normal";
	this.dirs = ["up", "down", "left", "right"];
	this.speed = {
		up: 0, down: 0, left: 0, right: 0
	};
	this.moving = false;
	this._createCircle();
}

Player.prototype.updateSettings = function(settings) {
	this._settings = settings;
};

Player.prototype._createCircle = function() {
	this._circle = new Path.Circle({
		center: [150, 70],
		radius: this._settings.radius,
		fillColor: this._settings.fill,
		strokeColor: this._settings.stroke
	});
};

Player.prototype.update = function() {
	if ((this.state == "normal") && keysPressed.includes(this._settings.keys.dash))
		this.state = "dashStart";

	this.moving = false;
	for (var i = 0; i < 4; i++) {
		var dir = this.dirs[i];

		if (keysPressed.includes(this._settings.keys[dir]))
			this.speed[dir] += this._settings.acceleration[this.state];

		this.speed[dir] -= this._settings.deceleration[this.state];
		
		this.speed[dir] = Math.min(
			Math.max(0, this.speed[dir]),
			this._settings.speedMax[this.state]
		);

	}
	$debug.append("State: " + this.state + "<br>");	

	if (this.state == "dashStart")
		this.state = "dash";

	this.moving =
		((this.speed.right - this.speed.left) != 0) ||
		((this.speed.down - this.speed.up) != 0);

	if (!this.moving && (this.state == "dash"))
		this.state = "normal";

	for (var i = 0; i < spritesCollision.length; i++) {
		var sprite = spritesCollision[i];
		if (sprite.type == "Ball") {
			if (this._circle.getIntersections(sprite._circle).length > 0) {
				sprite.speed.up = this.speed.up * 1.25;
				sprite.speed.down = this.speed.down * 1.25;
				sprite.speed.left = this.speed.left * 1.25;
				sprite.speed.right = this.speed.right * 1.25;
				$debug.append("Ball Hit<br>");
			}
		}
	}

	this._circle.position.x += this.speed.right - this.speed.left;
	this._circle.position.y += this.speed.down - this.speed.up;
}

var playerMain = new Player();
var ballMain = new Ball();

var spritesCollision = [ballMain, new Ball(), new Ball(), new Ball(), new Ball()];
var sprites = spritesCollision.concat([playerMain]);

var $debug = $("#debug");

function update() {
	$debug.text("");
	for (var i = 0; i < sprites.length; i++)
		sprites[i].update();
}

setInterval(update, 1000.0/60.0);