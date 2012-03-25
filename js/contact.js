jQuery(function($) {
  $("#submit input").click(function(){
		$('#response').html('Sending...');
		//get teh link
		queryString = '';
      queryString += 'name='+$('#name').attr('value');
      queryString += '&email='+$('#email').attr('value');
		queryString += '&phone='+$('#phone').attr('value');
		queryString += '&occupation='+$('#occupation').attr('value');
      queryString += '&message='+$('#message').attr('value');
		theLink = "contact.php?"+queryString;

		var xhr;
		
		if (window.XMLHttpRequest) {
		  xhr = new XMLHttpRequest();
		}else if (window.ActiveXObject) {
		  xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}else {
		  throw new Error("Ajax is not supported by this browser");
		}
		
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) { 
		    if (xhr.status >= 200 && xhr.status < 300) {
				
			  $('#response').slideUp('normal', function(){$(this).html(xhr.responseText)});
		      
			  $('#response').slideDown('normal');
		    }
		  }
		}
		
		xhr.open('GET', theLink);
		xhr.send(null);
	});
});