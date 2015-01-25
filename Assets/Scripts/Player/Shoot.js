#pragma strict

var boomerang : GameObject;
public var shoot : KeyCode;
private var bmr : GameObject;
private var bmrc : Boomerang;

function Start () {

}

function Update () {
	if (bmr){
		var base = GameObject.Find("Base");
		if ((Mathf.Abs(bmrc.transform.position.x) > base.collider2D.bounds.max.x) || (bmrc.transform.position.y < -200) || (bmrc.transform.position.y > base.collider2D.bounds.max.y)) {	
			 Destroy(bmr);
		 }
	} else {
		if (Input.GetKeyDown(shoot)){

			var mouse = Input.mousePosition;
			mouse.z = 0;
			mouse = Camera.main.ScreenToWorldPoint(mouse);
			

			bmr = Instantiate(boomerang, Vector3 (0, 0, 0), Quaternion.identity);
			bmrc = bmr.GetComponent("Boomerang");

			bmrc.transform.position.x = transform.position.x;
			bmrc.transform.position.y = transform.position.y;
			
			bmrc.posx = transform.position.x;
			bmrc.posy = transform.position.y;

			bmrc.a = Mathf.Atan((mouse.y - bmrc.posy) / (mouse.x - bmrc.posx));
			if ((mouse.x - bmrc.posx) < 0){
				bmrc.a = Mathf.PI + bmrc.a;
			}
			bmrc.start = true;
		}
	}
}