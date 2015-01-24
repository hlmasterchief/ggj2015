#pragma strict

public var speedx : float = 2;
public var speedy : float = 2;
public var g: float = 0.2;
public var onair : boolean = true;
public var character : GameObject;

function Update () {
	movement();	
}

function jump(){
		speedy = 1;
		onair = true;
}

function movement(){
	
	if (character.transform.position.x < transform.position.x) {
		transform.position.x -= speedx;
	} else {
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