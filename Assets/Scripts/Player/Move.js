#pragma strict

public var moveLeft : KeyCode;
public var moveRight : KeyCode;
public var jump : KeyCode;
public var speed : float = 5;
public var fallSpeed : float = 0;
public var fallAccel : float = 0.5;

private var faceRight : boolean = true;
private var onAir : boolean = true;

function Update () {
	var animator: Animator = GetComponent(Animator);

	// key down
	// move when key down
	if (Input.GetKey(moveLeft)){
		transform.localPosition.x -= speed;
		animator.SetBool("move", true);
		if (faceRight) {
			FlipFace();
		}
	} else if (Input.GetKey(moveRight)){
		transform.localPosition.x += speed;
		animator.SetBool("move", true);
		if (!faceRight) {
			FlipFace();
		}
	} 	

	if (Input.GetKey(jump)) {
		fallSpeed = -7.5;
		onair = true;
	}
	
	// key up
	// set animation when not move
	if (Input.GetKeyUp(moveLeft)) {
		if (!faceRight) {
			animator.SetBool("move", false);
		}
	}
	
	if (Input.GetKeyUp(moveRight)) {
		if (faceRight) {
			animator.SetBool("move", false);
		}
	}
}

function FlipFace() {
	var scaleX = transform.localScale.x;
	faceRight = !faceRight;
	scaleX = scaleX * -1;
	transform.localScale.x = scaleX;
}

function OnTriggerEnter2D (other: Collider2D) {
	if (col.tag == "Ground"){
		onair = false;
	}
}