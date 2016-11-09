var myCircle = new Path.Circle(new Point(100, 70), 50);
myCircle['fillColor'] = 'red';

myCircle.strokeColor = 'black';


var myCircle2 = myCircle.clone()
myCircle.strokecolor = 'red';
myCircle2.position.x += 200;

function onKeyDown(event){

	if(event.key == 'w'){
		myCircle2.position.y -= 10;
	}

	if(event.key == 'a'){
		myCircle2.position.x -= 10;
	}

	if(event.key == 'd'){
		myCircle2.position.x += 10;
	}
	
	if(event.key == 's'){
		myCircle2.position.y += 10;
	}




}
