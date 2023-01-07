function Code128(chaine) {
  var code128 = "";
  if (chaine.length > 0){
	  var z = 0;
	  var i = 1;
	  while ((i <= chaine.length) && (z == 0)){
		  if ((chaine.substring((i - 1), i).charCodeAt(0) >= 32 && chaine.substring((i - 1), i).charCodeAt(0) <= 126) || (chaine.substring((i - 1), i).charCodeAt(0) == 198)){
			  i++;
		  } else {
			  i = 0;
			  z = 1;
		  }
	  }
	  code128 = "";
	  var tableB = true;
	  var mini = 0;
	  var dummy = 0;
	  var checksum = 0;
	  if (i > 0){
		  i = 1;
		  while (i <= chaine.length){
			  if (tableB){
				  if ((i == 1) || ((i + 1) == chaine.length)){
					  mini = 4;
				  } else {
					  mini = 6;
				  }
				  mini = Testnum(mini, chaine, i);
				  if (mini < 0){
					  if (i == 1){
						  code128 = String.fromCharCode(210);
					  } else {
						  code128 = code128 + String.fromCharCode(204);;
					  }
					  tableB = false;
				  } else {
					  if (i == 1){
						  code128 = String.fromCharCode(209);
					  }
				  }
			  }
			  if (!tableB){
				  mini = 2;
				  mini = Testnum(mini, chaine, i);
				  if (mini < 0){
					  dummy = parseInt(Myval(chaine.substring((i - 1), (i + 1))));
					  if (dummy < 95){
						  dummy += 32;
					  } else {
						  dummy += 105;
					  }
					  code128 += String.fromCharCode(dummy);
					  i += 2;
				  } else {
					  code128 += String.fromCharCode(205);
					  tableB = true;
				  }
			  }
			  if (tableB){
				  code128 += chaine.substring((i-1), i);
				  i++;
			  }
		  }
		  for (let i = 1; i <= code128.length; i++){
			  dummy = code128.substring((i - 1), i).charCodeAt(0);
			  if (dummy < 127){
				  dummy -= 32;
			  } else {
				  dummy -= 105;
			  }
			  if (i == 1){
				  checksum = dummy;
			  }
			  checksum = (checksum + (i - 1) * dummy) % 103;
		  }
		  if (checksum < 95){
			  checksum += 32;
		  } else {
			  checksum += 100;
		  }
		  code128 = code128 + String.fromCharCode(checksum) + String.fromCharCode(211);
	  }
  }
  return code128;
}

function Testnum(mini, chaine, i) {
  mini--;
  if ((i + mini) <= chaine.length){
	  var y = 0;
	  while ((mini >= 0) && (y == 0)){
		  if (chaine.substring((i + mini - 1), (i + mini)).charCodeAt(0) < 48 || chaine.substring((i + mini - 1), (i + mini)).charCodeAt(0) > 57  ){
			  y = 1;
			  mini++;
		  }
		  mini--;
	  }
  }
  return mini;
}

function Myval(chaine) {
  var j = 1;
  var chaine2 = "";
  const regex = /\d/;
  
  while (j <= chaine.length){
	  if (regex.test(chaine.substring((j - 1), j))){
		  chaine2 = chaine2 + chaine.substring((j - 1), j);
		  j++;
	  } else {
		  break;
	  }
  }
  return chaine2;
}