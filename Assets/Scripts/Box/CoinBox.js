#pragma strict

public var coin: Transform;
public var position:Vector3 ;

function Update(){
	position = new Vector3(transform.position.x,transform.position.y,0);
}

function OnTriggerEnter2D (other:  Collider2D) {
	if (other.tag =="Boomerang"){
	 	Instantiate(coin,position, Quaternion.identity);
		Destroy(gameObject);		
	
	}
}