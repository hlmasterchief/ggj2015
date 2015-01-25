#pragma strict

function Awake () {
	DontDestroyOnLoad (transform.gameObject);
}

function Start () {
	audio.Play();
}

function Update () {

}