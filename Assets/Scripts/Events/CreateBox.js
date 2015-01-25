#pragma strict

public var maxDelay : float = 8;
public var boxes : GameObject[] = new GameObject[2];

private var delay : float = 0;

function Start () {
	delay = Random.Range(1.0f, maxDelay);
}

function Update () {

}

function FixedUpdate () {
	if (delay <= 0) {
		var random : int = Random.Range(0, boxes.length);
		var box : GameObject = boxes[random];
		var base = GameObject.Find("Base");
		var pos : Vector3 = new Vector3(Random.Range(-base.collider2D.bounds.max.x, base.collider2D.bounds.max.x), 
										base.collider2D.bounds.max.y + box.collider2D.bounds.extents.y + 4, 
										0);
		var obj : GameObject;
		var script : BoxMove;
		
		if (pos.x < 0) {
			pos.x += box.collider2D.bounds.extents.x + 12;
		} else if (pos.x > 0) {
			pos.x -= box.collider2D.bounds.extents.x + 12;
		}
		
		delay = Random.Range(1, maxDelay);
		obj = Instantiate(box, pos, Quaternion.identity);
		
		script = obj.GetComponent(BoxMove);
		script.distance = Random.Range(20, (base.collider2D.bounds.max.y - script.getFirst() - box.collider2D.bounds.extents.y) / 2);
	}
	
	delay -= Time.deltaTime;
}