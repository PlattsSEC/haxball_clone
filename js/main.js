var myCircle = new Path.Circle(new Point(150, 70), 20);
myCircle['fillColor'] = 'red';

myCircle.strokeColor = 'black';

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
		arr = myCircle.getIntersections(main_ball);
		console.log([main_ball.segments[1].point.x,main_ball.segments[0].point.y]);
		main_ball.position.x += 10;

	}

}


var main_ball = new Path.Circle({
	center: [250,100],
	radius: 10
});
main_ball.strokeColor = 'black';
//console.log("Here is the center");
//console.log(main_ball);