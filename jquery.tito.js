/**
 * tito 0.1
 * 
 * tito is a jQuery plugin for making labels on inputs similar to their
 * default values, with nice fade in/out transition effect
 * 
 * @author		Szymon Stepniak <simons@ifdesign.pl>
 * @version		0.1
 * @license		MIT (http://www.opensource.org/licenses/mit-license.php)
 * @released	2011-12-12
 *
 */
(function($){
	$.fn.tito = function(a) {
		if ($.isFunction(this.each)) {
			
			return this.each(function(){
				if ($(this).data("tito.instance") == undefined)
				{
					$(this).data("tito.instance", new $.fn.tito());
					$(this).data("tito.instance").init($(this), a);
				}
			});
		}
	};
	
	$.extend($.fn.tito.prototype, {
		defaults: {
			top:		7,
			left:		30
		},
		
		init: function(input, a) {
			if (input.attr("value").length < 1 && input.attr("title").length > 1)
			{
				var a = $.extend({}, this.defaults, a);
				
				var title = input.attr("title");
				
				input.attr("title", "");
				
				var span = document.createElement("span");
				
				$(span).css({
					position: "absolute",
					zIndex: 1000,
					top: input.context.offsetTop + a.top,
					left: input.context.offsetLeft + a.left,
					fontSize: input.css("font-size"),
					fontFamily: input.css("font-family"),
					color: input.css("color")
				});
				
				$(span).html(title);
				
				$(span).addClass("tito-label");
				
				$(span).click(function(){
					$(this).fadeOut().prev().focus();
				});
				
				$(input).after(span);
				
				$(input).focusin(function(){
					if (input.attr("value").length == 0)
					{
						$(span).fadeOut();
					}
				});
				
				$(input).focusout(function(){
					if (input.attr("value").length == 0)
					{
						$(span).fadeIn();
					}
				});
			}
		}
	});
	
})(jQuery);
