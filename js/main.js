var myCircle = new Path.Circle(new Point(150, 70), 20);
myCircle['fillColor'] = 'red';
myCircle.strokeColor = 'black';

function straight_line(ball,circle,sign){
	if(sign == '+'){
		y = ((circle[0] + 20) - ball[0])*(circle[1] - ball[1])/(circle[0] - ball[0]);
	}else{
		y = ((circle[0] - 20) - ball[0])*(circle[1] - ball[1])/(circle[0] - ball[0]);	
	}

	return y;
};

function update() {

	if (keysPressed.indexOf('w') != -1) {
		myCircle.position.y -= 15;
	}

	if (keysPressed.indexOf('a') != -1) {
		myCircle.position.x -= 15;
	}

	if (keysPressed.indexOf('d') != -1) {
		myCircle.position.x += 15;
	}
	
	if (keysPressed.indexOf('s') != -1) {
		myCircle.position.y += 15;
	}

	if((myCircle.getIntersections(main_ball)).length > 0){
		//arr = myCircle.getIntersections(main_ball);
		x_ball = [main_ball.position.x,main_ball.position.y];
		x_circle = [myCircle.position.x, myCircle.position.y];
		if(x_circle[0]>x_ball[0]){
			main_ball.position.x -= 20;
			main_ball.position.y -= straight_line(x_ball, x_circle,'-');
		}else{
			main_ball.position.x += 20;
			main_ball.position.y += straight_line(x_ball, x_circle),'+';
		}
		
	}
}

setInterval(update, 1000.0/30.0);

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


var main_ball = new Path.Circle({
	center: [250,100],
	radius: 10
});

main_ball.strokeColor = 'black';
