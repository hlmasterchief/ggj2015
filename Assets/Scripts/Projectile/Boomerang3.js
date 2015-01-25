#pragma strict

var vx : float = 0;
var vy : float = 0;
var v  : float = 0;
var angle : float = 0;

var ax : float = 0;
var ay : float = 0;

function Start () {
	vx = v * Mathf.Cos(angle * Mathf.PI / 180);
	vy = v * Mathf.Sin(angle * Mathf.PI / 180);
}

function Update () {

}