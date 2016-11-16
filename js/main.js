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


function onKeyDown(event){

	if(event.key == 'w'){
		myCircle.position.y -= 15;
	}

	if(event.key == 'a'){
		myCircle.position.x -= 15;
	}

	if(event.key == 'd'){
		myCircle.position.x += 15;
	}
	
	if(event.key == 's'){
		myCircle.position.y += 15;
	}

	if(event.key == 'w' && event.key == 'd'){
	
		myCircle.position.x += 5;
		myCircle.position.y -= 5;
	
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


var main_ball = new Path.Circle({
	center: [250,100],
	radius: 10
});

main_ball.strokeColor = 'black';
