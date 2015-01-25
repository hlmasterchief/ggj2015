#pragma strict

public var coin: GameObject[] = new GameObject[2];
public var position:Vector3 ;

function Update(){
	position = new Vector3(transform.position.x,transform.position.y,0);
}

function OnTriggerEnter2D (other:  Collider2D) {
	if (other.tag =="Boomerang"){
		var random : int = Random.Range(0, coin.length);
	 	Instantiate(coin[random],position, Quaternion.identity);
		Destroy(gameObject);		
	}
}