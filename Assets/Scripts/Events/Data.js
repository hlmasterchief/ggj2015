#pragma strict

public var highscore : int = 0;

function Awake () {
	DontDestroyOnLoad (transform.gameObject);
}

function Start () {
	highscore = 0;
}

function Update () {

}