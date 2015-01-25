#pragma strict

function Start () {
	var data = GameObject.Find("Data");
	var dataScript = data.GetComponent(Data);
	
	var timer = GameObject.Find("GameTime");
	var timerScript = timer.GetComponent(GameTime);
	
	dataScript.highscore = 0;
	timerScript.time = 120;
}

function Update () {

}