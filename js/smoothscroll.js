function smoothscroll(cls, settings) {
	var easings = {
		'linear': function(t){return t;},
		'ease-in-quad': function(t){return t * t;},
		'ease-out-quad': function(t) {return t * (2 - t);},
		'ease-in-out-quad': function(t) {return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;},
		'ease-in-cubic': function(t) {return t * t * t;},
		'ease-out-cubic': function(t) {return (--t) * t * t + 1;},
		'ease-in-out-cubic': function(t) {return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;},
		'ease-in-quart': function(t) {return t * t * t * t;},
		'ease-out-quart': function(t) {return 1 - (--t) * t * t * t;},
		'ease-in-out-quart': function(t) {return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;},
		'ease-in-quint': function(t) {return t * t * t * t * t;},
		'ease-out-quint': function(t) {return 1 + (--t) * t * t * t * t;},
		'ease-in-out-quint': function(t) {return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;}
	}

	var duration = settings.animateDuration || 1000;
	var easing = settings.easingFunction || 'ease-in-out-quad';
	var offset = settings.offset || 0;

	var body = (function() {
		document.documentElement.scrollTop += 1;
		var body = (document.documentElement.scrollTop !== 0) ? document.documentElement : document.body;
		document.documentElement.scrollTop -= 1;
		return body;
	}());

	function getPageScroll() {
		if (window.pageYOffset) {
			return window.pageYOffset;
		} else if (document.documentElement && document.documentElement.scrollTop) {
			return document.documentElement.scrollTop;
		} else if (body) {
			return body.scrollTop;
		}
	}

	function assign(e) {
		e.addEventListener('click', function (event) {
			var destElement = document.getElementById(event.target.hash.substr(1));
			if (undefined === destElement) return;

			var startTime = Date.now();
			var from = getPageScroll();
			var to = destElement.offsetTop + offset;
			var scrollDown = (to - from) > 0;

			function scroll() {
				var now = Date.now();
				var time = Math.min(1, ((now - startTime) / duration));
				var timeFunction = easings[easing](time);

				body.scrollTop = (timeFunction * (to - from)) + from;

				var maxScroll = document.body.offsetHeight - Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
				if (body.scrollTop === to || (scrollDown && body.scrollTop === maxScroll)) {
					return;
				}
				requestAnimationFrame(scroll);
			}
			scroll();

			event.preventDefault();
		});
	}

	switch (cls.charAt(0)) {
		case ".":
			var list = document.getElementsByClassName(cls.substr(1));
			for (i = 0; i < list.length; i++) assign(list[i]);
			break;
		case "#":
			assign(document.getElementById(cls.substr(1)));
			break;
		default:
			console.log("smoothscroll invalid specifier: "+cls);
			break;
	}

}
