$(function(){
		$('.section:not(.active)').css('cursor', 'pointer');
		$('.toSection').each(function(){$(this).attr('href', '#'+$(this).attr('rel'))});
		
	 $('ul.items li img').hover(
		function(){
			$(this).css('opacity', 0.8);
		},
		function(){
			$(this).css('opacity', 1);
		}
	 );
	 
	 $('a[href^=#]').click(function(){$('#container div#'+$(this).attr('href').substr(1, $(this).attr('href').length)).click()});
					 
	 var running = false;
	 var speed = 770;
	 if ($.browser.msie && ($.browser.version.substr(0, 1) == '6' || $.browser.version.substr(0, 1) == '7')){
	 	speed = 10;
	 }
	 
   $('#container div.section').click(function(){
			if(!running && !$(this).hasClass('.active')){
			  running = true;
				
			  $('.active').stop().animate({ "width": '45px' }, speed, "swing", null);
			  $(this).stop().animate({ "width": '660px' }, speed, "swing", function(){ 
			  																$('.active').removeClass('active');
			  																$(this).addClass('active');
																		 	running = false; 
																		 });
				
			  $('.active').css('cursor', 'pointer');
				$('.active').removeClass('active');
			  $(this).addClass('active');
				$(this).css('cursor', 'default');
			}
   });
	 
	 $('#portfolio .content').append("<div id='project_details'></div>");
	 
	 $('#portfolio ul.items li a').click(function(){
			var projectDetails = $(this).siblings('.project_details').html();
			
			$('#portfolio .content #projects').fadeOut('slow', function(){ 
																												 	 $('#project_details').html(projectDetails);
																												 	 $('#project_details').fadeIn('fast');
																												 	 $('#project_details a.to_portfolio').click(function(){
																																																		 	  $('#project_details').fadeOut('slow', function(){ $('#projects').fadeIn('fast'); });
																																																	    })
																												 });
	 });
	 
})