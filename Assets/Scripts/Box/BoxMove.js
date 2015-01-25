#pragma strict

public var speed : float = 2;
public var distance : float = 200;
public var item : GameObject[] = new GameObject[2];

private var rad : float;
private var first : float;
private var init : boolean = true;

function Start () {
	var base = GameObject.Find("Base");

	rad = 0;
	first = Random.Range(0, base.collider2D.bounds.max.y - collider2D.bounds.extents.y - 16);
	transform.position.y = base.collider2D.bounds.max.y + collider2D.bounds.extents.y + 16;
}

function getFirst() {
	return first;
}

function FixedUpdate () {
	if (init) {
		transform.position.y -=	speed;
		if (transform.position.y <= first) {
			transform.position.y += (first - transform.position.y);
			init = false;
		}
	} else {
		rad = (rad + Time.deltaTime * speed) % (Mathf.PI * 2);
		transform.position.y = first + Mathf.Sin(rad) * distance;
	}
}