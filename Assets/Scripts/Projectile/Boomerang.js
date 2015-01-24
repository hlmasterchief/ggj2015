#pragma strict
public var vx : float ;
public var vy : float ;
public var vix : float = 5;
public var viy : float = 5;
public var ax: float = 0.1;
public var ay: float = 1;
var a: float;
var t: float;
var y : float;
var x: float;
var flag: boolean = true;

function Start() {
	vx = vix;
	vy = viy;	
	x = transform.position.x;
	y = transform.position.y;
}

function Update () {
	if (flag) {
		movementup();
	} else {
		movementdown();
	}
	
}

function addforce(){
	var acc : float = 5;
	
}

function movementup(){
	transform.position.x +=vx;
	transform.position.y +=vy;	 		
	vy -=ay;
	
	if ((Mathf.Abs(transform.position.y - y) <0.001)){
		vy = - viy;
		ay = -1;
		print("quay");
		vx=-vx;
		flag = false;
	}	
}


function movementdown(){
	transform.position.x +=vx;
	transform.position.y +=vy;	 		
	vy -=ay;
	
	if ((Mathf.Abs(transform.position.y - y) <0.01)){
		vy =  viy;
		vx=-vx;
		ay = 1;
		print("quay1");
		
		flag = true;
	}	
}

