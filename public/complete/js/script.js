
/*****	One Page Menu *****/

jQuery(function($){
	
	/*** Navigation in responsive layouts 
	--------------------------------------------------- ****/
	$('.navbar .navbar-nav').clone(true).appendTo('body').wrap('<nav class="nav-tablet"></nav>');
	$('.nav-tablet').append('<button type"button" class="navbar-handle-in"><i class="icon-arrow-circle-o-left"></i></button>');
	$('.nav-tablet').find('li.active').removeClass('active');
	$('body').append('<button type="button" class="navbar-handle"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>');

	/*** Mobile version Open Toggle menu ***/
	$('.navbar-handle, .navbar-handle-in').on('click', this, function(){
		$('body').toggleClass('navIn');
	});

	/***** Main Menu for Single page 
	-------------------------------------------------------------- ***/
	function singlePageMenu(){
		$('.navbar').each(function(){

				var $active, $content, $links = $(this).find('a.on'),
				$li = $(this).find('a').closest('li');
			
				$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
				$content = $($active.attr('href'));
			
				$(this).on('click', 'a', function(e){
		
					$li.removeClass('active');
			
					$active = $(this);
					$content = $($(this).attr('href'));
	
					$(this).closest('li').addClass('active');
					$("body,html").animate({scrollTop:$content.position().top + 1}, 1000);
					
					e.preventDefault();
				});
		});
	}

	/*** single page Main Menu add Class to current Menu's Target Section ****/
	function activeMainMenuItem(){
		
		var scrollPos = $(document).scrollTop();
		
		$('.navbar a.on').each(function () {

			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			var	$li = currLink.closest('li');
			
			if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$('.navbar > li').removeClass("active");
				$li.addClass("active");
			}
			else{
				$li.removeClass("active");
			}
		});
	}		
	
	singlePageMenu();

	/**** Create Fixed on page scroll ***/
	function scrolledHeader(){

		var headerHT = $('.navbar').height();
		
		if ( $('.fullscreen-container').length){
			
			var sliderHT = $('.fullscreen-container').height() - headerHT;
			
			if ( $(document).scrollTop() > sliderHT){

				$('.navbar').addClass('nav-sticky');

			}
			else {
				$('.navbar').removeClass('nav-sticky');
			}
		}

		else { 
			if ( $(document).scrollTop() > headerHT){
				$('.navbar').addClass('nav-sticky');
			}
			else {
				$('.navbar').removeClass('nav-sticky');
			}
		}
		
	}

	scrolledHeader();
	activeMainMenuItem();
	
	$(window).scroll( function(){
		activeMainMenuItem();
		scrolledHeader();
	});
	
	/*** Elements Animation ***/
	$('.animated').appear(function(){
		var el = $(this);
		var anim = el.data('animation');
		var animDelay = el.data('delay');
		if (animDelay) {

			setTimeout(function(){
				el.addClass( anim + " in" );
				el.removeClass('out');
			}, animDelay);

		}

		else {
			el.addClass( anim + " in" );
			el.removeClass('out');
		}    
		},{accY: -150});			
	
	/*** Animate Progess bar ***/
	$('.progress').each(function () {

		var progress = $(this);

		progress.appear(function () {

			var progressBar = $(this),

			percent = progressBar.find('.progress-bar').attr('aria-valuenow'),
			centVal = percent + '%';
			progressBar.find('em').text(centVal);
			
			progressBar.find('.progress-bar').animate({
				width: percent + '%'
			}, 800);

		});
	});

	/*** contact form form-control focused and unfocused ***/
	$('.contact-form div .form-control').on('focus', this, function(){
			$(this).closest('div').addClass('focused');
	});
	$('.contact-form div .form-control').on('blur', this, function(){
			if ( $(this).val() === '') {
				$(this).closest('div').removeClass('focused');
			}
	});

	// Filter tabs mixitup
	if ( $('.filter-list').length) {
		$('.filter-list').mixitup();
	}

	$('.ajax-popup').magnificPopup({ 
		type: 'ajax',
		gallery: {
      enabled: true
    }
	});

	$('.blog-popup').magnificPopup({ 
		type: 'ajax',
		gallery: {
      enabled: true
    }
	});

	$('.image-popup').magnificPopup({ 
		type: 'image',
		gallery: {
      enabled: true
    }
	});	

});
