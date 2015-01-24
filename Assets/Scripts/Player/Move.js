#pragma strict

public var moveLeft : KeyCode;
public var moveRight : KeyCode;
public var space: KeyCode;
public var speedx : float = 1;
public var speedy : float = 10;
public var g: float = 0.2;
public var onair : boolean = true;

function Update () {
	movement();	
}

function jump(){
	if (Input.GetKey(space)){
		speedy = 7.5;
		onair = true;
	}
}

function movement(){
	if (Input.GetKey(moveLeft)){
		transform.position.x -= speedx;		
	} else if (Input.GetKey(moveRight)){
		transform.position.x += speedx;
	} 	
	if (onair == true){
		speedy += -g*Time.deltaTime/0.2;
		transform.position.y += speedy;		
	} else {
		jump();		
	}
}

function OnTriggerEnter2D (col: Collider2D) {
	if (col.tag =="Ground"){
		onair = false;
		print("yo");
	}
}