#pragma strict

public var speed : float = 3.0f;
public var fallSpeed : float = 0.0f;
public var fallAccel : float = 0.75f;
public var maxJumpSpeed : float = 12.0f;
public var delayJump : float = 120.0f;
public var maxDelayJump : float = 120.0f;
public var jumpDirection : int = 1; // positive = right

private var onAir : boolean = true;
private var onJump : boolean = false;
private var preJump : boolean = false;

function Start() {
	var r = Random.Range(0,10);
	if (r >= 5) {
		jumpDirection = 1;
	} else {
		jumpDirection = -1;
	}
}

function Update() {
}

function FixedUpdate () {
	var animator: Animator = GetComponent(Animator);
	var base = GameObject.Find("Base");
	
	if (delayJump <= 0 && !preJump) {
		preJump = true;
		animator.SetBool("prejump", true);
	}
	
	if (onAir) {
		var collider = GetComponent(Collider2D);
		var bottomSelf : float = collider.bounds.min.y;
		var dir = -Vector2.up;
		var origin : Vector2;
		var dist : float;
		var castObj : RaycastHit2D;
		
		fallSpeed += fallAccel;
		
		origin = new Vector2(transform.localPosition.x, transform.localPosition.y - collider.bounds.extents.y);
		dist = Mathf.Abs(fallSpeed);
		castObj = Physics2D.Raycast(origin, dir, dist, 1 << 12);		
		
		transform.localPosition.y -= fallSpeed;
		
		if (castObj.transform && fallSpeed > 0) {
			var hitTop = castObj.transform.localPosition.y + castObj.collider.bounds.extents.y;
			transform.localPosition.y -= transform.localPosition.y - collider.bounds.extents.y - hitTop;
			
			onAir = false;
			onJump = false;
		}
	}
	
	if (onJump) {
		transform.localPosition.x += speed * jumpDirection;
	}
	
	if (!onJump && !onAir) {
		delayJump -= 1;
	}
	
	if (collider2D.bounds.max.x >= base.collider2D.bounds.max.x + 48) {
		Destroy(gameObject);
	}
	
	if (collider2D.bounds.min.x <= base.collider2D.bounds.min.x - 48) {
		Destroy(gameObject);
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