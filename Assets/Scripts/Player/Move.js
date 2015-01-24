#pragma strict

var moveLeft : KeyCode;
var moveRight : KeyCode;
var speed : float = 50;

function Update () {

	if (Input.GetKey(moveLeft)){
		transform.position.x -= speed;		
	} else if (Input.GetKey(moveRight)){
		transform.position.x += speed;
	} 	
}

function OnTriggerEnter2D (other: Collider2D) {
	print("yo");
}