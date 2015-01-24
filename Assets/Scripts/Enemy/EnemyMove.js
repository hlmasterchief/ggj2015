#pragma strict

public var speedx : float = 2;
public var speedy : float = 2;
public var g: float = 0.2;
public var onair : boolean = true;
public var character : GameObject;
public var movedir : float = 1;
public var setdir : boolean = false;
public var drop: boolean = false;

function Update () {
	if (!drop) {
		transform.position.y  -= 5;
	} else {
		if (!setdir) {	
			if (character.transform.position.x < transform.position.x) {
				movedir = -1;
			}
			setdir = true;
		}
		movement();
	}
}

function jump(){
		speedy = 1;
		onair = true;
}

function movement(){
	transform.position.x += movedir * speedx;

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
		drop = true;
		print("yo");
	}
}