#pragma strict
var radius: float = 1;
var player : Transform;
var fx : GameObject;

function OnTriggerEnter2D (other:  Collider2D) {	
	var player = GameObject.FindGameObjectWithTag("Player").transform;
	if (other.tag == "Boomerang"){
		var hitColliders : Collider2D[] = Physics2D.OverlapCircleAll(transform.position, radius, (1 << 8) | (1 << 10) | (1<< 11) | (1 << 13));
		for (var i = 0; i < hitColliders.Length; i++){
			if (hitColliders[i].tag == "Player") {
				player.gameObject.GetComponent(Move).SendMessage("Death");
			} else {
				Destroy(hitColliders[i].gameObject);			
			}
		}
		
		Instantiate(fx, transform.position, Quaternion.identity);
	}
}