#pragma strict

var boomerang : GameObject;
public var shoot : KeyCode;
public var maxDelay : float = 0.5;
public var sprites : Sprite[] = new Sprite[6];
public var throwSE : AudioClip;

private var bmr : GameObject;
private var bmrc : Boomerang;
private var delay : float = 0;
private var gauge : GameObject;
private var gaugeRenderer : SpriteRenderer;

function Start () {
	delay = maxDelay;
	gauge = gameObject.Find("Gauge");
	gaugeRenderer = gauge.GetComponent(SpriteRenderer);
}

function Update () {
	if (bmr){
		var base = GameObject.Find("Base");
		if ((Mathf.Abs(bmrc.transform.position.x) > base.collider2D.bounds.max.x) || (bmrc.transform.position.y < -200) || (bmrc.transform.position.y > base.collider2D.bounds.max.y)) {	
			 Destroy(bmr);
			 gauge.renderer.enabled = true;
			 gaugeRenderer.sprite = sprites[0];
		 }
		 if (Input.GetKeyUp(shoot)) {
		 	bmr.transform.position.x = transform.position.x;
			bmr.transform.position.y = transform.position.y;
		 	bmr.renderer.enabled = true;
		 	bmrc.start = true;
		 	gauge.renderer.enabled = false;
		 	gaugeRenderer.sprite = sprites[0];
		 	audio.PlayOneShot(throwSE);
		 }
		 
	} else {
		if (Input.GetKeyDown(shoot)){

			var mouse = Input.mousePosition;
			mouse.z = 0;
			mouse = Camera.main.ScreenToWorldPoint(mouse);
			

			bmr = Instantiate(boomerang, Vector3 (0, 0, 0), Quaternion.identity);
			bmrc = bmr.GetComponent(Boomerang);
			
			bmr.renderer.enabled = false;

			bmr.transform.position.x = transform.position.x;
			bmr.transform.position.y = transform.position.y;
			
			bmrc.posx = transform.position.x;
			bmrc.posy = transform.position.y;

			bmrc.a = Mathf.Atan((mouse.y - bmrc.posy) / (mouse.x - bmrc.posx));
			if ((mouse.x - bmrc.posx) < 0){
				bmrc.a = Mathf.PI + bmrc.a;
			}
			
			delay = maxDelay;
			gaugeRenderer.sprite = sprites[1];
		}
	}
}

function FixedUpdate() {
	if (bmr){
		if (!bmrc.start){
			delay -= Time.deltaTime;
			if ((delay <= 0) && (bmrc.power <=4)) {
				bmrc.power += 1;
				gaugeRenderer.sprite = sprites[bmrc.power];
				delay = 0.5;
			}
		}
	}
}