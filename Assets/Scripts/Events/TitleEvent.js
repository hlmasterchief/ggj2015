#pragma strict

public var delay : float = 0;

function Start () {

}

function Update () {
	delay -= Time.deltaTime;
	if (Input.anyKeyDown && delay <= 0) {
		Application.LoadLevel("main");
	}
}