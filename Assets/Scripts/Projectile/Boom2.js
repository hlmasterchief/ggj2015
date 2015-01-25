#pragma strict
public var vx : float ;
public var vy : float ;
public var vix : float = 5;
public var viy : float = 5;
public var ax: float = 0.1;
public var ay: float = 1;
public var shoot : KeyCode;
var tmpx : float; 
var tmpy : float;
var posx : float;
var posy :float;
var angle: float = 30;
var a: float;

var flag: boolean = true;
var start: boolean = false;

public var character : GameObject;

function Start() {
	
}

function Update () {

	if (start) {
		if (flag) {
			movementup();
		} else {
			movementdown();
		}
		transform.position.x = rotate(tmpx,tmpy,1);
		transform.position.y = rotate(tmpx,tmpy,2);
	} else {
		if (Input.GetKey(shoot)){
			vx = vix;
			vy = viy;

			var mouse = Input.mousePosition;
			mouse.z = 0;
			mouse = Camera.main.ScreenToWorldPoint(mouse);

			transform.position.x = character.transform.position.x;
			transform.position.y = character.transform.position.y;

			tmpx = transform.position.x;
			tmpy = transform.position.y;
			posx = tmpx;
			posy = tmpy;

			a = Mathf.Atan((mouse.y - posy) / (mouse.x - posx));
			if ((mouse.x - posx) < 0){
				a = Mathf.PI + a;
			}
			start = true;
		}
	}
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


function movementup(){
	tmpx +=vx;
	tmpy +=vy;	 		
	vy -=ay;
	
	if ((Mathf.Abs(tmpy - posy) <0.001)){
		vy = - 1.5*viy;
		ay = -0.2;
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
		flag = false;
	}	
}

