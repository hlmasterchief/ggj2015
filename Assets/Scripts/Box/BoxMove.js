#pragma strict

public var speed : float = 2;
public var distance : float = 200;
public var item : GameObject;

private var rad : float;
private var first : float;

function Start () {
	rad = Random.Range(0,Mathf.PI * 2);
	first = transform.position.y;
	transform.position.y = first + Mathf.Sin(rad) * distance;
}

function FixedUpdate () {
	rad = (rad + Time.deltaTime * speed) % (Mathf.PI * 2);
	transform.position.y = first + Mathf.Sin(rad) * distance;
}