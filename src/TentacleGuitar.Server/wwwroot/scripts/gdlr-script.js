(function($){
		
	if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || 
		navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || 
		navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || 
		navigator.userAgent.match(/Windows Phone/i) ){ 
		var gdlr_touch_device = true; 
	}else{ 
		var gdlr_touch_device = false; 
	}
	
	if( window.innerWidth < 767 ){
		var gdlr_is_mobile = true;
	}else{
		var gdlr_is_mobile = false;
	}
	
	// retrieve GET variable from url
	$.extend({
	  getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  vars.push(hash[0]);
		  vars[hash[0]] = hash[1];
		}
		return vars;
	  },
	  getUrlVar: function(name){
		return $.getUrlVars()[name];
	  }
	});	
	
	// runs flex slider function
	$.fn.gdlr_flexslider = function(){
		if(typeof($.fn.flexslider) == 'function'){
			$(this).each(function(){
				var flex_attr = {
					animation: 'fade',
					animationLoop: true,
					prevText: '<i class="icon-angle-left" ></i>', 
					nextText: '<i class="icon-angle-right" ></i>',
					useCSS: false
				};
				
				// slide duration
				if( $(this).attr('data-pausetime') ){
					flex_attr.slideshowSpeed = parseInt($(this).attr('data-pausetime'));
				}
				if( $(this).attr('data-slidespeed') ){
					flex_attr.animationSpeed = parseInt($(this).attr('data-slidespeed'));
				}

				// set the attribute for carousel type
				if( $(this).attr('data-type') == 'carousel' ){
					flex_attr.move = 1;
					flex_attr.animation = 'slide';
					
					if( $(this).closest('.gdlr-item-no-space').length > 0 ){
						flex_attr.itemWidth = $(this).width() / parseInt($(this).attr('data-columns'));
						flex_attr.itemMargin = 0;						
					}else{
						flex_attr.itemWidth = (($(this).width() + 40) / parseInt($(this).attr('data-columns'))) - 40;
						flex_attr.itemMargin = 40;	
					}
					if( $(this).attr('data-columns') == "1" ){ flex_attr.smoothHeight = true; }
				}else{
					if( $(this).attr('data-effect') ){
						flex_attr.animation = $(this).attr('data-effect');
					}
				}
				if( $(this).attr('data-columns') ){
					flex_attr.minItems = parseInt($(this).attr('data-columns'));
					flex_attr.maxItems = parseInt($(this).attr('data-columns'));	
				}				
				
				// set the navigation to different area
				if( $(this).attr('data-nav-container') ){
					var flex_parent = $(this).parents('.' + $(this).attr('data-nav-container'));
					flex_attr.controlsContainer = flex_parent.siblings('.gdlr-nav-container').find('.nav-container');	
				}

				$(this).flexslider(flex_attr);	
			});	
		}
	}
	
	// runs nivo slider function
	$.fn.gdlr_nivoslider = function(){
		if(typeof($.fn.nivoSlider) == 'function'){
			$(this).each(function(){
				var nivo_attr = {};
				
				if( $(this).attr('data-pausetime') ){
					nivo_attr.pauseTime = parseInt($(this).attr('data-pausetime'));
				}
				if( $(this).attr('data-slidespeed') ){
					nivo_attr.animSpeed = parseInt($(this).attr('data-slidespeed'));
				}
				if( $(this).attr('data-effect') ){
					nivo_attr.effect = $(this).attr('data-effect');
				}

				$(this).nivoSlider(nivo_attr);	
			});	
		}
	}	
	
	// runs isotope function
	$.fn.gdlr_isotope = function(){
		if(typeof($.fn.isotope) == 'function'){
			$(this).each(function(){
				var layout = ($(this).attr('data-layout'))? $(this).attr('data-layout'): 'fitRows';
				if( layout == 'fitRows' ) return;
				
				// execute isotope
				var isotope_element = $(this);
				isotope_element.children('.clear').remove();
				isotope_element.isotope({
					layoutMode: layout
				});
				
				// resize event
				$(window).resize(function(){ isotope_element.isotope(); });				
			});	
		}
	}
	
	// runs fancybox function
	$.fn.gdlr_fancybox = function(){
		if(typeof($.fn.fancybox) == 'function'){
			var fancybox_attr = {
				nextMethod : 'resizeIn',
				nextSpeed : 250,
				prevMethod : false,
				prevSpeed : 250,	
				helpers : { media : {} }
			};
			
			if( typeof($.fancybox.helpers.thumbs) == 'object' ){
				fancybox_attr.helpers.thumbs = { width: 50, height: 50 };
			}

			$(this).fancybox(fancybox_attr);
		}	
	}
	
	// responsive video
	$.fn.gdlr_fluid_video = function(){
		$(this).find('iframe[src^="http://www.youtube.com"], iframe[src^="//www.youtube.com"],'  +
					 'iframe[src^="http://player.vimeo.com"], iframe[src^="//player.vimeo.com"]').each(function(){
			
			// ignore if inside layerslidr
			if( $(this).closest('.ls-container').length <= 0 ){ 
				var ratio = $(this).height() / $(this).width();
				$(this).removeAttr('height').removeAttr('width');
				$(this).wrap('<div class="gdlr-fluid-video-wrapper"></div>').parent().css('padding-top', (ratio * 100)+"%");
			}
		
		});	
	}
	
	// pie chart
	$.fn.gdlr_pie_chart = function(){
		if(typeof($.fn.easyPieChart) == 'function'){
			$(this).each(function(){
				var gdlr_chart = $(this);
				
				$(this).easyPieChart({
					animate: 1200,
					lineWidth: gdlr_chart.attr('data-linewidth')? parseInt(gdlr_chart.attr('data-linewidth')): 8,
					size: gdlr_chart.attr('data-size')? parseInt(gdlr_chart.attr('data-size')): 155,
					barColor: gdlr_chart.attr('data-color')? gdlr_chart.attr('data-color'): '#a9e16e',
					trackColor: gdlr_chart.attr('data-bg-color')? gdlr_chart.attr('data-bg-color'): '#f2f2f2',
					backgroundColor: gdlr_chart.attr('data-background'),
					scaleColor: false,
					lineCap: 'square'
				});

				// for responsive purpose
				if($.browser.msie && (parseInt($.browser.version) <= 8)) return;
				function limit_gdlr_chart_size(){
					if( gdlr_chart.parent().width() < parseInt(gdlr_chart.attr('data-size')) ){
						var max_width = gdlr_chart.parent().width() + 'px';
						gdlr_chart.css({'max-width': max_width, 'max-height': max_width});
					}				
				}
				limit_gdlr_chart_size();
				$(window).resize(function(){ limit_gdlr_chart_size(); });
			});
		}
	}
	
	// gdlr play list
	$.fn.gdlr_play_list = function(){
		$(this).click(function(){
			if( $(this).hasClass('gdlr-playing') ) return;
			
			// case for album category page
			$('.gdlr-album-song-list li').eq($(this).index()).each(function(){
				$(this).addClass('active gdlr-playing');
				$(this).siblings().removeClass('active gdlr-playing');
			});
			
			$(this).addClass('active').siblings().removeClass('active gdlr-playing');
		
			var file = [];
			if( $(this).attr('data-mp3') ){
				file.push({src: $(this).attr('data-mp3'), type:'audio/mpeg'});
			}
			if( $(this).attr('data-ogg') ){
				file.push({src: $(this).attr('data-ogg'), type:'audio/ogg'});
			}
			if( $(this).attr('data-wav') ){
				file.push({src: $(this).attr('data-wav'), type:'audio/wav'});
			}
			
			var top_player = $(this).parent('.gdlr-player-list').siblings('.gdlr-top-player, .gdlr-float-top-player');
			var song_title = ($(this).attr('data-title'))? $(this).attr('data-title'): $(this).html();
			top_player.find('.gdlr-top-player-title').html(song_title);
			
			if( $(this).attr('data-download') ){
				top_player.find('.top-player-download').attr('href', $(this).attr('data-download')).show();
			}else{
				top_player.find('.top-player-download').hide();
			}
			if( $(this).attr('data-apple') ){
				top_player.find('.top-player-apple').attr('href', $(this).attr('data-apple')).show();
			}else{
				top_player.find('.top-player-apple').hide();
			}
			if( $(this).attr('data-amazon') ){
				top_player.find('.top-player-amazon').attr('href', $(this).attr('data-amazon')).show();
			}else{
				top_player.find('.top-player-amazon').hide();
			}
			
			top_player.find('audio:first').each(function(){
				var temp_player;
				if( typeof(this.player) == 'undefined' ){
					temp_player = this;
				}else{
					temp_player = this.player;
				}			
			
				temp_player.pause();
				temp_player.setSrc(file);
				temp_player.load();
				temp_player.play();
			});
		});			
	}
		
	$(document).ready(function(){
	
		// script for accordion item
		$('.gdlr-accordion-item').each(function(){
			var multiple_tab = $(this).hasClass('gdlr-multiple-tab');
			$(this).children('.accordion-tab').children('.accordion-title').click(function(){
				var current_tab = $(this).parent();
				if( current_tab.hasClass('active') ){
					$(this).children('i').removeClass('icon-minus').addClass('icon-plus');
					$(this).siblings('.accordion-content').slideUp(function(){ current_tab.removeClass('active'); });
				}else{
					$(this).children('i').removeClass('icon-plus').addClass('icon-minus');	
					$(this).siblings('.accordion-content').slideDown(function(){ current_tab.addClass('active'); });
								
				}
				
				// close another tab if multiple tab is not allowed ( accordion )
				if( !multiple_tab ){
					current_tab.siblings().children('.accordion-title').children('i').removeClass('icon-minus').addClass('icon-plus');
					current_tab.siblings().children('.accordion-content').slideUp(function(){ $(this).parent().removeClass('active'); });
				}
			});
		});
		
		// script for tab item
		$('.tab-title-wrapper').children().click(function(){
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			
			var selected_index = $(this).index() + 1;
			$(this).parent().siblings('.tab-content-wrapper').children(':nth-child(' + selected_index + ')').each(function(){
				$(this).siblings().removeClass('active').hide();
				$(this).fadeIn(function(){ $(this).addClass('active'); });
			})
		});		
	
		// initiate the tab when the get tab variable is sent
		var inital_tab = $.getUrlVar('tab');
		if( inital_tab ){ $('#' + inital_tab.replace(',', ', #')).each(function(){ $(this).trigger('click'); }); }
		
		// script for code item
		$('.gdlr-code-item .gdlr-code-title').click(function(){
			var parent = $(this).parent();
			if( parent.hasClass('active') ){
				$(this).children('i').removeClass('icon-minus').addClass('icon-plus');
				$(this).siblings('.gdlr-code-content').slideUp(function(){
					parent.removeClass('active');
				});	
			}else{
				$(this).children('i').removeClass('icon-plus').addClass('icon-minus');
				$(this).siblings('.gdlr-code-content').slideDown(function(){
					parent.addClass('active');	
				});				
			}
		});		
		
		// script for parallax background
		$('.gdlr-parallax-wrapper').each(function(){
			if( $(this).hasClass('gdlr-background-image') ){
				var parallax_section = $(this);
				var parallax_speed = parseFloat(parallax_section.attr('data-bgspeed'));
				if( parallax_speed == 0 || gdlr_touch_device ) return;
				if( parallax_speed == -1 ){
					parallax_section.css('background-attachment', 'fixed');
					parallax_section.css('background-position', 'center center');
					return;
				}
					
				$(window).scroll(function(){
					// if in area of interest
					if( ( $(window).scrollTop() + $(window).height() > parallax_section.offset().top ) &&
						( $(window).scrollTop() < parallax_section.offset().top + parallax_section.outerHeight() ) ){
						
						var scroll_pos = 0;
						if( $(window).height() > parallax_section.offset().top ){
							scroll_pos = $(window).scrollTop();
						}else{
							scroll_pos = $(window).scrollTop() + $(window).height() - parallax_section.offset().top;
						}
						parallax_section.css('background-position', 'center ' + (-scroll_pos * parallax_speed) + 'px');
					}
				});			
			}else if( $(this).hasClass('gdlr-background-video') ){
				if(typeof($.fn.mb_YTPlayer) == 'function'){
					$(this).children('.gdlr-bg-player').mb_YTPlayer();
				}
			}else{
				return;
			}
		});
		
		// video responsive
		$('body').gdlr_fluid_video();		
		
		// audio player
		if( typeof($.fn.mediaelementplayer) == 'function' ){
			
			var wpme_settings = {};
			
			if ( typeof(_wpmejsSettings) !== 'undefined' ){
				wpme_settings.pluginPath = _wpmejsSettings.pluginPath;	
			}
			
			wpme_settings.success = function(audio){
				var gdlr_player = $(audio).closest('.gdlr-float-top-player, .gdlr-top-player');
				if( gdlr_player.hasClass('gdlr-float-top-player') ){
					var gdlr_float_playing = $('#gdlr-open-float-player');
				}
				
				if( gdlr_player.length > 0 ){
					audio.addEventListener('play', function(){
						gdlr_player.siblings('.gdlr-player-list').children('.active').each(function(){
							$(this).addClass('gdlr-playing');
							$('.gdlr-album-song-list li').eq($(this).index()).each(function(){
								$(this).addClass('active gdlr-playing');
							});
						});
						$('.gdlr-album-item .gdlr-album-playing').addClass('active');
						
						if(gdlr_float_playing){
							gdlr_float_playing.addClass('gdlr-now-playing');
						}
					});
					audio.addEventListener('pause', function(){
						gdlr_player.siblings('.gdlr-player-list').children('.active').each(function(){
							$(this).removeClass('gdlr-playing');
							$('.gdlr-album-song-list li').eq($(this).index()).each(function(){
								$(this).removeClass('active gdlr-playing');
							});
						});
						$('.gdlr-album-item .gdlr-album-playing').removeClass('active');
						
						if(gdlr_float_playing){
							gdlr_float_playing.removeClass('gdlr-now-playing');
						}
					});
					audio.addEventListener('ended', function(){
						var current_song = gdlr_player.siblings('.gdlr-player-list').children('.active');
						if( current_song.next().length > 0 ){
							current_song.next().trigger('click');
						}else{
							current_song.parent().children(':first').trigger('click');
						}
						
					});
				}
			
				if( gdlr_player.hasClass('gdlr-float-top-player') ){
					var control = $(audio).parent('.mejs-mediaelement').siblings('.mejs-controls');
					
					// play pause next previous button
					var play_control = $('<div class="gdlr-play-control"></div>');
					control.prepend(play_control);
					
					var previous = $('<div class="gdlr-previous-button"></div>');
					previous.click(function(){
						gdlr_player.siblings('.gdlr-player-list').children('.active').prev().trigger('click');
					});
					previous.append('<i class="icon-backward" ></i>');
					previous.appendTo(play_control);
					
					var play = control.children('.mejs-playpause-button');
					play.children('button').remove();
					play.append('<i class="icon-play" ></i>');
					play.appendTo(play_control)
					
					var next = $('<div class="gdlr-next-button"></div>');
					next.click(function(){
						gdlr_player.siblings('.gdlr-player-list').children('.active').next().trigger('click');
					});
					next.append('<i class="icon-forward" ></i>')
					next.appendTo(play_control);
					
					// time elapse 
					var time_rail = control.children('.mejs-time-rail');
					var time_elapse = $('<div class="gdlr-time-elapse">( </div>');
					time_elapse.appendTo(time_rail);
					time_elapse.append(control.children('.mejs-currenttime-container'));
					time_elapse.append($('<span class="gdlr-seperator"> / </span>'));
					time_elapse.append(control.children('.mejs-duration-container'));
					time_elapse.append(')');
					
					// title and album thumbnail 
					gdlr_player.children('.gdlr-top-player-title').prependTo(time_rail);
					gdlr_player.children('.gdlr-top-player-thumbnail').appendTo(time_rail);
					
					// download section	
					gdlr_player.children('.gdlr-top-player-download').each(function(){
						$(this).children('.top-player-list').click(function(){
							gdlr_player.siblings('.gdlr-player-list').slideToggle();
							return false;
						});
						$(this).appendTo(control);
					});
					
					// volumn bar
					var volume_bar = $('<div class="gdlr-volumn-bar"></div>');
					control.append(volume_bar);
					control.children('.mejs-volume-button').appendTo(volume_bar);
					control.children('.mejs-horizontal-volume-slider').appendTo(volume_bar);	

					// close bar
					var open_bar = $('#gdlr-open-float-player');
					var close_bar = $('<div class="gdlr-hide-float-bar"></div>');
					close_bar.append('<i class="icon-remove"></i>');
					close_bar.click(function(){
						gdlr_player.parents('#gdlr-float-player').slideUp();
						//open_bar.css('left', $(this).offset().left).slideDown();
						open_bar.slideDown();
					});
					
					open_bar.click(function(){
						$('#gdlr-float-player').slideDown();
						$(this).slideUp();
						$(window).trigger('resize');
					});
					control.append(close_bar);
					
				}else if( gdlr_player.hasClass('gdlr-top-player') ){
					var control = $(audio).parent('.mejs-mediaelement').siblings('.mejs-controls');
					
					var time_elapse = $('<div class="gdlr-time-elapse">( </div>');
					control.append(time_elapse);
					control.children('.mejs-currenttime-container').appendTo(time_elapse);
					$('<span class="gdlr-seperator"> / </span>').appendTo(time_elapse);
					control.children('.mejs-duration-container').appendTo(time_elapse);
					time_elapse.append(')')
					
					var volume_bar = $('<div class="gdlr-volumn-bar"></div>');
					control.append(volume_bar);
					control.children('.mejs-volume-button').appendTo(volume_bar);
					control.children('.mejs-horizontal-volume-slider').appendTo(volume_bar);
				}
			}
			
			
			$('.gdlr-audio-player').mediaelementplayer(wpme_settings);		
			
			// select album 
			$('.gdlr-play-album').click(function(){
				$('.gdlr-album-playing').removeClass('gdlr-album-playing');
				$(this).addClass('gdlr-album-playing');
			
				var float_player = $('#gdlr-float-player');
				var play_list = float_player.find('.gdlr-player-list');
				
				if( $(this).siblings('.gdlr-album-thumbnail').html() ){
					float_player.find('.gdlr-top-player-thumbnail').html( $(this).siblings('.gdlr-album-thumbnail').html() );
				}
				
				play_list.html( $(this).siblings('.gdlr-album-list').html() );
				play_list.children('li').gdlr_play_list();
				play_list.children('li:first').trigger('click');
				
				//$('#gdlr-float-player').slideDown();
				//$('#gdlr-open-float-player').slideUp();
			});
			
			// single alum
			$('.gdlr-album-song-list li .gdlr-list-icon').click(function(){
				var float_player = $('#gdlr-float-player');
				var play_list = float_player.find('.gdlr-player-list');

				play_list.children().eq($(this).parent().index()).trigger('click');
				
				//$('#gdlr-float-player').slideDown();
				//$('#gdlr-open-float-player').slideUp();
			});
			
			// audio playlist
			$('.gdlr-player-list li').gdlr_play_list();
			
		}	

		// runs superfish menu
		if(typeof($.fn.superfish) == 'function'){
			
			// create the mega menu script
			$('#gdlr-main-navigation .sf-mega > ul').each(function(){	
				$(this).children('li').each(function(){
					var current_item = $(this);
					current_item.replaceWith(
						$('<div />').addClass('sf-mega-section')
									.addClass(current_item.attr('data-column'))
									.attr('data-size', current_item.attr('data-size'))
									.html(  $('<div />').addClass('sf-mega-section-inner')
														.addClass(current_item.attr('class'))
														.attr('id', current_item.attr('id'))
														.html(current_item.html())
									)		
					);
				});
				$(this).replaceWith(this.innerHTML);
			});
			
			// make every menu same height
			$('#gdlr-main-navigation .sf-mega').each(function(){
				var sf_mega = $(this); $(this).show();
				
				var row = 0; var column = 0; var max_height = 0;
				sf_mega.children('.sf-mega-section').each(function(){
					if( column % 60 == 0 ){ 
						if( row != 0 ){
							sf_mega.children('[data-row="' + row + '"]').children('.sf-mega-section-inner').height( max_height - 50 );
							max_height = 0;
						}
						row++; $(this).addClass('first-column'); 
					}		
					
					$(this).attr('data-row', row);	
					column += eval('60*' + $(this).attr('data-size'));
				
					if( $(this).height() > max_height ){
						max_height = $(this).height();
					}
				});
				
				sf_mega.children('[data-row="' + row + '"]').children('.sf-mega-section-inner').height( max_height - 50 );		
			});
			
			$('#gdlr-main-navigation').superfish({
				delay: 500, 
				speed: 'fast', 
				animation: {opacity:'show', height:'show'}
			});
			
			$('#gdlr-top-navigation').superfish({
				delay: 500, 
				speed: 'fast', 
				animation: {opacity:'show', height:'show'}
			});		

			// slide bar for style-2 menu
			$('.gdlr-navigation-wrapper.gdlr-style-2').each(function(){
				var sf_menu = $(this).find('#gdlr-main-navigation').children('.sf-menu');
				var slide_bar = $(this).find('.gdlr-navigation-slide-bar'); 
				
				var current_menu = sf_menu.children('.current-menu-item, .current-menu-ancestor');
				var current_menu_att = {'left': 0, 'width': 0};
				if( current_menu.length > 0 ){
						current_menu_att = {'left': current_menu.position().left, 'width': current_menu.width()};
				}
					
				sf_menu.children().hover(function(){
					slide_bar.animate({'left': $(this).position().left, 'width': $(this).width()},
						{queue: false, easing: 'easeOutQuad', duration: 250});
				}, function(){
					slide_bar.animate(current_menu_att, {queue: false, easing: 'easeOutQuad', duration: 250});
				});
				
				$(window).resize(function(){ 
					if( current_menu.length > 0 ){
						current_menu_att = {'left': current_menu.position().left, 'width': current_menu.width()};
					}
					slide_bar.animate(current_menu_att, {queue: false, easing: 'easeOutQuad', duration: 250});
				});			
			});			
		}
		
		// responsive menu
		if(typeof($.fn.dlmenu) == 'function'){
			$('#gdlr-responsive-navigation').each(function(){
				$(this).find('.dl-submenu').each(function(){
					if( $(this).siblings('a').attr('href') && $(this).siblings('a').attr('href') != '#' ){
						var parent_nav = $('<li class="menu-item gdlr-parent-menu"></li>');
						parent_nav.append($(this).siblings('a').clone());
						
						$(this).prepend(parent_nav);
					}
				});
				$(this).dlmenu();
			});
		}	
		
		// gallery thumbnail type
		$('.gdlr-gallery-thumbnail').each(function(){
			var thumbnail_container = $(this).children('.gdlr-gallery-thumbnail-container');
		
			$(this).find('.gallery-item').click(function(){
				var selected_slide = thumbnail_container.children('[data-id="' + $(this).attr('data-id') + '"]');
				if(selected_slide.css('display') == 'block') return false;
			
				// check the gallery height
				var image_width = selected_slide.children('img').attr('width');
				var image_ratio = selected_slide.children('img').attr('height') / image_width;
				var temp_height = image_ratio * Math.min(thumbnail_container.width(), image_width);
				
				thumbnail_container.animate({'height': temp_height});
				selected_slide.fadeIn().siblings().hide();
				return false;
			});		
			$(window).resize(function(){ thumbnail_container.css('height', 'auto') });
		});

		// fancybox
		$('a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]').not('[data-rel="fancybox"]').attr('data-rel', 'fancybox');
		$('[data-rel="fancybox"]').gdlr_fancybox();
		
		// image shortcode 
		$('.gdlr-image-link-shortcode').hover(function(){
			$(this).find('.gdlr-image-link-overlay').animate({opacity: 0.8}, 150);
			$(this).find('.gdlr-image-link-icon').animate({opacity: 1}, 150);
		}, function(){
			$(this).find('.gdlr-image-link-overlay').animate({opacity: 0}, 150);
			$(this).find('.gdlr-image-link-icon').animate({opacity: 0}, 150);
		});	
		
		// Price Table
		$('.gdlr-price-table-item').each(function(){
			var price_table = $(this);
			
			function set_price_table_height(){
				var max_height = 0;
				var price_content = price_table.find('.price-content');
				
				price_content.css('height', 'auto');
				price_content.each(function(){
					if( max_height < $(this).height() ){ max_height = $(this).height(); }
				});
				price_content.css('height', max_height);
			}
			set_price_table_height()
			$(window).resize(function(){ set_price_table_height(); });
		});

		// Default text
		$('form').submit(function(){
			var has_default = false;
			$(this).find('input[data-default]').each(function(){
				if( $(this).is('#url') ){
					if( $(this).val() == $(this).attr('data-default') ) $(this).val('');
				}else{
					if( $(this).val() == $(this).attr('data-default') ) has_default = true;
				}
			});
			
			if(has_default) return false;
		});
		
		// Search option
		$('#gdlr-nav-search-form-button').click(function(){
			$('#gdlr-nav-search-form').slideToggle(200);
			return false;
		});
		$('#gdlr-nav-search-form').click(function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else if(window.event){
				window.event.cancelBubble=true;
			}
		});
		$("html").click(function(){
			$('#gdlr-nav-search-form').slideUp(200);
		});			
		$('.search-text input[data-default], .gdlr-comments-area input[data-default]').each(function(){
			var default_value = $(this).attr("data-default");
			$(this).val(default_value);
			$(this).live("blur", function(){
				if ($(this).val() == ""){
					$(this).val(default_value);
				}	
			}).live("focus", function(){
				if ($(this).val() == default_value){
					$(this).val("");
				}
			});		
		});		

		// animate ux
		if( !gdlr_touch_device && ( !$.browser.msie || (parseInt($.browser.version) > 8)) ){
		
			// image ux
			$('.content-wrapper img').each(function(){
				if( $(this).closest('.gdlr-ux, .ls-wp-container, .product, .flexslider, .nivoSlider, .rev_slider_wrapper').length ) return;
				
				var ux_item = $(this);
				if( ux_item.offset().top > $(window).scrollTop() + $(window).height() ){
					ux_item.css({ 'opacity':0 });
				}else{ return; }
				
				$(window).scroll(function(){
					if( $(window).scrollTop() + $(window).height() > ux_item.offset().top + 100 ){
						ux_item.animate({ 'opacity':1 }, 1200); 
					}
				});					
			});
		
			// item ux
			$('.gdlr-ux').each(function(){
				var ux_item = $(this);
				if( ux_item.hasClass('gdlr-chart') || ux_item.hasClass('gdlr-skill-bar') ){
					if( ux_item.offset().top < $(window).scrollTop() + $(window).height() ){
						if( ux_item.hasClass('gdlr-chart') && (!$.browser.msie || (parseInt($.browser.version) > 8)) ){
							ux_item.gdlr_pie_chart();
						}else if( ux_item.hasClass('gdlr-skill-bar') ){
							ux_item.children('.gdlr-skill-bar-progress').each(function(){
								if($(this).attr('data-percent')){
									$(this).animate({width: $(this).attr('data-percent') + '%'}, 1200, 'easeOutQuart');
								}
							});	
						}
						return;
					}
				}else if( ux_item.offset().top > $(window).scrollTop() + $(window).height() ){
					ux_item.css({ 'opacity':0, 'padding-top':20, 'margin-bottom':-20 });
				}else{ return; }	

				$(window).scroll(function(){
					if( $(window).scrollTop() + $(window).height() > ux_item.offset().top + 100 ){
						if( ux_item.hasClass('gdlr-chart') && (!$.browser.msie || (parseInt($.browser.version) > 8)) ){
							ux_item.gdlr_pie_chart();
						}else if( ux_item.hasClass('gdlr-skill-bar') ){
							ux_item.children('.gdlr-skill-bar-progress').each(function(){
								if($(this).attr('data-percent')){
									$(this).animate({width: $(this).attr('data-percent') + '%'}, 1200, 'easeOutQuart');
								}
							});	
						}else{
							ux_item.animate({ 'opacity':1, 'padding-top':0, 'margin-bottom':0 }, 1200);
						}
					}
				});					
			});
			
		// do not animate on scroll in mobile
		}else{
		
			// Pie chart
			if(!$.browser.msie || (parseInt($.browser.version) > 8)){
				$('.gdlr-chart').gdlr_pie_chart();
			}	

		
			// skill bar
			$('.gdlr-skill-bar-progress').each(function(){
				if($(this).attr('data-percent')){
					$(this).animate({width: $(this).attr('data-percent') + '%'}, 1200, 'easeOutQuart');
				}
			});			
		}		

		// runs nivoslider when available
		$('.nivoSlider').gdlr_nivoslider();		
		
		// runs flexslider when available
		$('.flexslider').gdlr_flexslider();
		
	});
	
	$(window).load(function(){

		// run isotope when available
		$('.gdlr-isotope').gdlr_isotope();	
		
		// run pie chart for ie8 and below
		if($.browser.msie && (parseInt($.browser.version) <= 8)){
			$('.gdlr-chart').gdlr_pie_chart();
		}
		
		// float menu
		if( !gdlr_touch_device && !gdlr_is_mobile ){
			$('header.gdlr-header-wrapper.float-menu').each(function(){
				var has_height = !$(this).hasClass('gdlr-no-height');
				var header_area = $(this).children('.gdlr-header-substitute');
				var nav_area = header_area.children('.gdlr-header-inner');
				
				var logo = nav_area.find('.gdlr-logo');
				var logo_img = nav_area.find('.gdlr-logo img');
				var navigation = nav_area.find('.gdlr-navigation');
				var original = {
					logo_top: logo.css('margin-top'),
					logo_bottom: logo.css('margin-bottom'),
					logo_img: logo_img.css('height'),
					nav_top: navigation.css('margin-top')
				};
				
				$(window).scroll(function(){
					if( $(this).scrollTop() > 0 && $(this).width() > 959 ){
						if( !nav_area.hasClass('gdlr-fixed-menu') ){
							$('body').prepend(nav_area);
							if( has_height ){ header_area.css('height', nav_area.height()); }
							nav_area.addClass('gdlr-fixed-menu');		
							nav_area.children('.gdlr-header-overlay').animate({'opacity': 0.85}, 1000);
							
							logo.animate({'margin-top': '17', 'margin-bottom': '18'}, {duration: 100, queue: false});
							logo_img.animate({'height': '27'}, {duration: 100, queue: false});
							navigation.animate({'margin-top': '10'}, {duration: 100, queue: false});
						}
					}else{
						if( nav_area.hasClass('gdlr-fixed-menu') ){
							nav_area.appendTo(header_area);
							nav_area.removeClass('gdlr-fixed-menu');
							nav_area.children('.gdlr-header-overlay').animate({'opacity': 0.4}, 1000);
							
							logo.animate({'margin-top': original.logo_top, 'margin-bottom': original.logo_bottom}, {duration: 100, queue: false});
							logo_img.animate({'height': original.logo_img}, {duration: 100, queue: false,
									complete: function(){ header_area.css('height', 'auto'); }});	
							navigation.animate({'margin-top': original.nav_top}, {duration: 100, queue: false});	
						}
					}
				});
			});
		}		
	
		$(window).trigger('resize');
	});

})(jQuery);