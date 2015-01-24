#pragma strict

public var movedir : float = 1;
public var speed : float = 2;
public var top : float = 350;
public var bot : float = 100;
public var item : GameObject;

function Start () {
	movedir = Random.Range(0,2)*2-1;
}

function Update () {
	if ((transform.position.y >= top) || (transform.position.y <= bot)) {
		movedir *= -1;
	}
	transform.position.y += movedir * speed;
}