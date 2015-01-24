#pragma strict
public var vx : float ;
public var vy : float ;
public var vix : float = 5;
public var viy : float = 5;
public var ax: float = 0.1;
public var ay: float = 1;
var tmpx : float; 
var tmpy : float;
var posx : float;
var posy :float;
var angle: float = 30;
var a: float;
var t: float;
var y : float;
var x: float;
var flag: boolean = true;

function Start() {
	vx = vix;
	vy = viy;	
	tmpx = transform.position.x;
	tmpy = transform.position.y;
	posx = tmpx;
	posy = tmpy;
	a = angle*3.1416/180;
	
}

function rotate(u: float, v: float, k:int){
	//quay x
	if (k ==1) {
		return u*Mathf.Cos(a) - v*Mathf.Sin(a)-(posx*Mathf.Cos(a) - posy*Mathf.Sin(a))+posx;
	}
	//quay y
	else {
		return v*Mathf.Cos(a) + u*Mathf.Sin(a)-(posy*Mathf.Cos(a) + posx*Mathf.Sin(a))+posy;
	}
}

function Update () {
	if (flag) {
		movementup();
	} else {
		movementdown();
	}
	transform.position.x = rotate(tmpx,tmpy,1);
	transform.position.y = rotate(tmpx,tmpy,2);
	
}


function movementup(){
	tmpx +=vx;
	tmpy +=vy;	 		
	vy -=ay;
	
	if ((Mathf.Abs(tmpy - posy) <0.001)){
		vy = - viy;
		ay = -1;
		vx=-vx;
		flag = false;
	}	
}


function movementdown(){
	tmpx +=vx;
	tmpy +=vy;	 		
	vy -=ay;
	
	if ((Mathf.Abs(tmpy - posy) <0.01)){
		vy =  viy;
		vx=-vx;
		ay = 1;		
		flag = true;
	}	
}

