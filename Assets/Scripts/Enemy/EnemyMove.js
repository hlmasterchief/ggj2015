#pragma strict

public var speed : float = 2.0f;
public var fallSpeed : float = 0.0f;
public var fallAccel : float = 0.5f;
public var maxJumpSpeed : float = 15.0f;
public var delayJump : float = 120.0f;
public var maxDelayJump : float = 120.0f;
public var jumpDirection : int = 1; // positive = right

private var onAir : boolean = true;
private var onJump : boolean = false;
private var preJump : boolean = false;

function Update () {
	var animator: Animator = GetComponent(Animator);
	
	if (delayJump <= 0 && !preJump) {
		preJump = true;
		animator.SetBool("prejump", true);
	}
	
	if (onAir) {
		var collider = GetComponent(Collider2D);
		var bottomSelf : float = collider.bounds.max.y;
		var dir = -Vector2.up;
		var origin : Vector2;
		var dist : float;
		var castObj : RaycastHit2D;
		
		fallSpeed += fallAccel;
		
		origin = new Vector2(transform.localPosition.x, transform.localPosition.y - collider.bounds.extents.y);
		dist = Mathf.Abs(fallSpeed);
		castObj = Physics2D.Raycast(origin, dir, dist, 1 << 12);		
		
		transform.localPosition.y -= fallSpeed * Time.deltaTime / Time.fixedDeltaTime;
		
		if (castObj.transform && fallSpeed > 0) {
			var hitTop = castObj.transform.localPosition.y + castObj.collider.bounds.extents.y;
			transform.localPosition.y -= transform.localPosition.y - collider.bounds.extents.y - hitTop;
		}
	}
	
	if (onJump) {
		transform.localPosition.x += speed * jumpDirection * Time.deltaTime / Time.fixedDeltaTime;
	}
}

function FixedUpdate() {
	if (!onJump && !onAir) {
		delayJump -= 1;
	}
}

function OnTriggerEnter2D (collider: Collider2D) {
	var animator: Animator = GetComponent(Animator);
	if (collider.tag == "Ground") {
		onAir = false;
		onJump = false;
		animator.SetBool("jump", false);
	}
}

function SetJump() {
	var animator: Animator = GetComponent(Animator);
	delayJump = maxDelayJump;
	fallSpeed = -maxJumpSpeed;
	onAir = true;
	onJump = true;
	preJump = false;
	animator.SetBool("prejump", false);
	animator.SetBool("jump", true);
}