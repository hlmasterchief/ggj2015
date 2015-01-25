#pragma strict

function Start () {
	if (GetComponent(AudioSource))
		audio.Play();
}

function Update () {

}

function DestroyFX() {
	Destroy(gameObject);
}