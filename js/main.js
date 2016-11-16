var myCircle = new Path.Circle(new Point(150, 70), 20);
myCircle['fillColor'] = 'red';
myCircle.strokeColor = 'black';

var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;

var velocity = 3;

function straight_line(ball,circle,sign){
	if(sign == '+'){
		y = ((circle[0] + 20) - ball[0])*(circle[1] - ball[1])/(circle[0] - ball[0]);
	}else{
		y = ((circle[0] - 20) - ball[0])*(circle[1] - ball[1])/(circle[0] - ball[0]);	
	}

	return y;
};




function gameLoop()
{
	while(true){
		movePlayer();
		//gameLoop()
	}
}


function onFrame(event)
{
	if(moveUp){
		myCircle.position.y -= velocity;
	}
	if(moveDown){
		myCircle.position.y += velocity;
	}
	if(moveLeft){
		myCircle.position.x -= velocity;
	}
	if(moveRight){
		myCircle.position.x += velocity;
	}
}

function onKeyDown(event){

	if(event.key == 'w'){
		moveUp = true;
	}

	if(event.key == 'a'){
		moveLeft = true;
	}

	if(event.key == 'd'){
		moveRight = true;
	}
	
	if(event.key == 's'){
		moveDown = true;
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
	movePlayer();

}

function onKeyUp(event)
{
	if(event.key == 'w'){
		moveUp = false;
		    
	}

	if(event.key == 'a'){
		moveLeft = false;
		    
	}

	if(event.key == 'd'){
		moveRight = false;
		    
	}

	if(event.key == 's'){
		moveDown = false;
		    
	}

	
}

var main_ball = new Path.Circle({
	center: [250,100],
	radius: 10
});

main_ball.strokeColor = 'black';

//gameLoop();
