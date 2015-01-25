#pragma strict

var vx : float = 0;
var vy : float = 0;
var v  : float = 0;
var angle : float = 0;

var ax : float = 0;
var ay : float = 0;

function Start () {
	vx = v * Mathf.Cos(angle * Mathf.PI / 180) * 100;
	vy = v * Mathf.Sin(angle * Mathf.PI / 180);
}

function Update () {
	vx = vx + ax * 100;
	vy = vy + ay;
	
	transform.localPosition.x += Mathf.Sign(vx) * Mathf.Pow(Mathf.Abs(vx), 1 / 3.0f);
	transform.localPosition.y += vy;
	
	print(Mathf.Pow(vx, 1 / 3.0f));
}