#pragma strict

public var fallSpeed : float = 0.0f;
public var fallAccel : float = 0.75f;

private var onAir : boolean = true;

function Start () {
	
}

function Update () {
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
		
		transform.localPosition.y -= fallSpeed;
		
		if (castObj.transform && fallSpeed > 0) {
			var hitTop = castObj.transform.localPosition.y + castObj.collider.bounds.extents.y;
			transform.localPosition.y -= transform.localPosition.y - collider.bounds.extents.y - hitTop;
			
			onAir = false;
		}
	}
}

function OnTriggerEnter2D (collider: Collider2D) {
	if (collider.tag == "Ground") {
		onAir = false;
	}
}