#pragma strict

public var shoot : KeyCode;

var posx : float;
var posy : float;
var a: float = 0;

var flag: boolean = false;
var start: boolean = false;

public var character : GameObject;
public var speedBase : float = 10;
public var maxBase : float = 200;
public var power : float = 1;

function Start() {
	
}

function Update () {
	if (start) {
		if (!flag) {
			transform.position.x += speedBase * Mathf.Cos(a);
			transform.position.y += speedBase * Mathf.Sin(a);
			if (Mathf.Abs(transform.position.x - posx) > Mathf.Abs(maxBase * Mathf.Cos(a) * power)) { //Max
				flag = true;
			}
		} else {
			transform.position.x -= speedBase * Mathf.Cos(a);
			transform.position.y -= speedBase * Mathf.Sin(a);
		}
	}
}
