#pragma strict

public var moveLeft : KeyCode;
public var moveRight : KeyCode;
public var jump : KeyCode;
public var speed : float = 5;
public var fallSpeed : float = 0;
public var fallAccel : float = 0.5;
public var maxJumpSpeed : float = 10.0;

private var faceRight : boolean = true;
private var onAir : boolean = true;

function Update () {
	var animator: Animator = GetComponent(Animator);

	// key down
	// move when key down
	if (Input.GetKey(moveLeft)) {
		transform.localPosition.x -= speed * Time.deltaTime / Time.fixedDeltaTime;
		animator.SetBool("move", true);
		if (faceRight) {
			FlipFace();
		}
	} else if (Input.GetKey(moveRight)) {
		transform.localPosition.x += speed * Time.deltaTime / Time.fixedDeltaTime;
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
	
	// jump
	if (Input.GetKey(jump) && !onAir) {
		fallSpeed = -maxJumpSpeed;
		onAir = true;
		animator.SetBool("jump", true);
	}
	
	if (onAir) {
		var collider = GetComponent(BoxCollider2D);
		var halfCol = collider.size.y * 0.5f * transform.localScale.y;
		var dir = -Vector2.up;
		var origin : Vector2;
		var dist : float;
		var castObj : RaycastHit2D;
		
		fallSpeed += fallAccel;
		
		origin = new Vector2(transform.localPosition.x, transform.localPosition.y - halfCol);
		dist = Mathf.Abs(fallSpeed);
		castObj = Physics2D.Raycast(origin, dir, dist, 1 << 12);		
		transform.localPosition.y -= fallSpeed * Time.deltaTime / Time.fixedDeltaTime;
		
		if (castObj.transform && fallSpeed > 0) {
			var hitCollider = castObj.collider.GetComponent(BoxCollider2D);
			var hitHalfCol  = hitCollider.size.y * 0.5f * castObj.transform.localScale.y;
			var hitTop      = castObj.transform.localPosition.y + hitHalfCol;
			
			transform.localPosition.y -= transform.localPosition.y - halfCol - hitTop;
		}
	}
}

function FlipFace() {
	var scaleX = transform.localScale.x;
	faceRight = !faceRight;
	scaleX = scaleX * -1;
	transform.localScale.x = scaleX;
}

function OnTriggerEnter2D (collider : Collider2D) {
	var animator: Animator = GetComponent(Animator);
	if (collider.tag == "Ground") {
		onAir = false;
		animator.SetBool("jump", false);
	}
}