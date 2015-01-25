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
		var random : int = Random.Range(0, 11);
		var box : GameObject;
		var base = GameObject.Find("Base");
		var xIndex : int;
		var pos : Vector3;
		var obj : GameObject;
		var maxCol : int;
		var script : BoxMove;
		var boxParent : GameObject = GameObject.Find("Boxes");
		
		if (random > 7) {
			box = boxes[0];
		} else {
			box = boxes[1];
		}
		
		if (pos.x < 0) {
			pos.x += box.collider2D.bounds.extents.x + 12;
		} else if (pos.x > 0) {
			pos.x -= box.collider2D.bounds.extents.x + 12;
		}
		
		delay = Random.Range(1, maxDelay);
		obj = Instantiate(box);
		obj.transform.parent = boxParent.transform;
		
		maxCol = Mathf.Ceil((base.collider2D.bounds.extents.x * 2 * base.transform.localScale.x)
											/ (obj.collider2D.bounds.extents.x * 2 * obj.transform.localScale.x + 6));
		xIndex = Random.Range(-maxCol / 2, maxCol / 2);
		obj.transform.position.x = (obj.collider2D.bounds.extents.x * 2 * box.transform.localScale.x + 6) / 2 * xIndex;
		
		script = obj.GetComponent(BoxMove);
		script.distance = Random.Range(20, (base.collider2D.bounds.max.y - script.getFirst() - obj.collider2D.bounds.extents.y) / 2);
	}
	
	delay -= Time.deltaTime;
}