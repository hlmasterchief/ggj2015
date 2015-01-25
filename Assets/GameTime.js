#pragma strict

public var time : float = 120;
public var digiWidth : int = 24;
public var digits : GameObject[] = new GameObject[10];

private var oldTime : int = -1;

function Start () {

}

function Update () {
	time -= Time.deltaTime;

	if (Mathf.Floor(time) != oldTime) {
		var n : int;
		var obj : GameObject;
		var i : int = 0;
		var num : int = Mathf.Floor(time);
		oldTime = time;
		
		for (var child : Transform in transform) {
			Destroy(child.gameObject);
		}

		if (num == 0) {
			obj = Instantiate(digits[0]);
			obj.transform.parent = transform;
			obj.transform.localPosition.x = 0;
			obj.transform.localPosition.y = 0;
		} else {
			n = Mathf.Floor(Mathf.Log10(num));
		}
		
		while (num > 0) {
			var d : int = num % 10;
			num = Mathf.Floor(num / 10);
			
			obj = Instantiate(digits[d]);
			obj.transform.parent = transform;
			obj.transform.localPosition.x = digiWidth * (n / 2.0f - i);
			obj.transform.localPosition.y = 0;
			
			i += 1;
		}
	}
	
	if (time <= 0) {
		Application.LoadLevel("gameover");
	}
}