jQuery(document).ready(function($){
	//set some variables
	var isAnimating = false,
		firstLoad = false,
		newScaleValue = 1;

	//cache DOM elements
	var dashboard = $('.cd-side-navigation'),
		mainContent = $('.cd-main'),
		loadingBar = $('#cd-loading-bar'),
		charMenu = $('.char-menu');

	//select a new section
	dashboard.on('click', 'a', function(event){
		// event.preventDefault();
		var target = $(this),
			//detect which section user has chosen
			sectionTarget = target.data('menu');
		// if( !target.hasClass('selected') && !isAnimating ) {
		// 	//if user has selected a section different from the one alredy visible - load the new content
		// 	// console.log(sectionTarget);
		// 	triggerAnimation(sectionTarget, true);
		// }

		firstLoad = true;
	});


	var newPageArray = location.pathname;

	if (newPageArray === '/kinds') $('.char-menu li:first-child a').addClass('selected');
	if (newPageArray === '/advantages') $('.char-menu li:nth-child(2) a').addClass('selected');
	if (newPageArray === '/options') $('.char-menu li:nth-child(3) a').addClass('selected');
	if (newPageArray === '/functions') $('.char-menu li:nth-child(4) a').addClass('selected');



	//detect the 'popstate' event - e.g. user clicking the back button
  	$(window).on('popstate', function() {
	  	if( firstLoad ) {
		    /*
		    Safari emits a popstate event on page load - check if firstLoad is true before animating
		    if it's false - the page has just been loaded
		    */
	      	var newPageArray = location.pathname.split('/'),
	        //this is the url of the page to be loaded
	        newPage = newPageArray[newPageArray.length - 1].replace('.html', '');
	      	if( !isAnimating ) triggerAnimation(newPage, false);
	    }
	    firstLoad = true;
	});

  	//scroll to content if user clicks the .cd-scroll icon
	mainContent.on('click', '.cd-scroll', function(event){
		event.preventDefault();
		var scrollId = $(this.hash);
		// $(scrollId).velocity('scroll', { container: $(".cd-section") }, 200);
		$('.cd-section').animate({ scrollTop: 450}, 500);
	});

	//start animation
	function triggerAnimation(newSection, bool) {
		isAnimating =  true;
		newSection = ( newSection == '' ) ? 'index' : newSection;

		//update dashboard
		dashboard.find('*[data-menu="'+newSection+'"]').addClass('selected').parent('li').siblings('li').children('.selected').removeClass('selected');
		//trigger loading bar animation
		initializeLoadingBar(newSection);
		//load new content
		loadNewContent(newSection, bool);
	}

	function initializeLoadingBar(section) {
		var selectedItem =  dashboard.find('.selected'),
			barHeight = selectedItem.outerHeight(),
			barTop = selectedItem.offset().top,
			windowHeight = $(window).height(),
			maxOffset = ( barTop + barHeight/2 > windowHeight/2 ) ? barTop : windowHeight- barTop - barHeight,
			scaleValue = ((2*maxOffset+barHeight)/barHeight).toFixed(3)/1 + 0.001;

		//place the loading bar next to the selected dashboard element
		loadingBar.data('scale', scaleValue).css({
		    height: barHeight,
		    top: barTop
		}).attr('class', '').addClass('loading '+section);
	}

	function loadNewContent(newSection, bool) {
		setTimeout(function(){
			//animate loading bar
			loadingBarAnimation();

			//create a new section element and insert it into the DOM
			var section = $('<section class="cd-section overflow-hidden '+newSection+'"></section>').appendTo(mainContent);
			//load the new content from the proper html file
			section.load(newSection+'.html .cd-section > *', function(event){
				//finish up the animation and then make the new section visible
				var scaleMax = loadingBar.data('scale');

				loadingBar.velocity('stop').velocity({
					scaleY: scaleMax
				}, 400, function(){
					//add the .visible class to the new section element -> it will cover the old one
					section.prev('.visible').removeClass('visible').end().addClass('visible').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						resetAfterAnimation(section);
					});

					//if browser doesn't support transition
					if( $('.no-csstransitions').length > 0 ) {
						resetAfterAnimation(section);
					}

					var url = newSection + '.html';

					if(url!=window.location && bool){
				        //add the new page to the window.history
				        //if the new page was triggered by a 'popstate' event, don't add it
				        window.history.pushState({path: url},'',url);
				    }
				});
			});

		}, 50);
	}

	function loadingBarAnimation() {
		var scaleMax = loadingBar.data('scale');
		if( newScaleValue + 1 < scaleMax) {
			newScaleValue = newScaleValue + 1;
		} else if ( newScaleValue + 0.5 < scaleMax ) {
			newScaleValue = newScaleValue + 0.5;
		}

		loadingBar.velocity({
			scaleY: newScaleValue
		}, 500, loadingBarAnimation);
	}

	function resetAfterAnimation(newSection) {
		//once the new section animation is over, remove the old section and make the new one scrollable
		newSection.removeClass('overflow-hidden').prev('.cd-section').remove();
		isAnimating =  false;
		//reset your loading bar
		resetLoadingBar();
	}

	function resetLoadingBar() {
		loadingBar.removeClass('loading').velocity({
			scaleY: 1
		}, 1);
	}

	//accardion
	$(function(){
		var button = $('.button-news')
				fullNews = $('.full-news');
		$.fn.toggleText = function(t1, t2){
		  if (this.text() == t1) this.text(t2);
		  else                   this.text(t1);
		  return this;
		};
		button.on('click',function() {
			event.preventDefault();
			fullNews.not($(this).prev().slideToggle());
			$(this).toggleText('Читать дальше','Свернуть');
		});
	});

	//main-menu
	$(function(){
		var mainMenu = $('#main-menu');
		var openMenu = $('#menu-open');

		openMenu.on('click', function() {
			openMenu.toggleClass('openMenu');
			mainMenu.toggleClass('open');
		});
	});

	//char
	$(function(){
		var buttonUp = $('#up-block');

		buttonUp.on('click', function() {
			event.preventDefault();
			$("html,body").animate({ scrollTop: 0}, 1000);
			return false;
		});
	});

	$(function(){
		var newPage = location.pathname;
		var str = newPage.slice(1,newPage.langth);
		if (str === '') str = 'main';
		var lilili = $('.main-menu_list li.' + str).addClass('active');
	})

});
