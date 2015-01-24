#pragma strict

public var moveLeft : KeyCode;
public var moveRight : KeyCode;
public var speed : float = 5;

private var faceRight : boolean = true;

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
	
}