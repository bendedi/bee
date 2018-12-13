$(document).ready(function(){
   $('[data-toggle="offcanvas"]').click(function(){
       $("#navigation").toggleClass("hidden-xs");
   });
});



//made by vipul mirajkar thevipulm.appspot.com
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

    (function ($) {
    	$.fn.countTo = function (options) {
    		options = options || {};

    		return $(this).each(function () {
    			// set options for current element
    			var settings = $.extend({}, $.fn.countTo.defaults, {
    				from:            $(this).data('from'),
    				to:              $(this).data('to'),
    				speed:           $(this).data('speed'),
    				refreshInterval: $(this).data('refresh-interval'),
    				decimals:        $(this).data('decimals')
    			}, options);

    			// how many times to update the value, and how much to increment the value on each update
    			var loops = Math.ceil(settings.speed / settings.refreshInterval),
    				increment = (settings.to - settings.from) / loops;

    			// references & variables that will change with each update
    			var self = this,
    				$self = $(this),
    				loopCount = 0,
    				value = settings.from,
    				data = $self.data('countTo') || {};

    			$self.data('countTo', data);

    			// if an existing interval can be found, clear it first
    			if (data.interval) {
    				clearInterval(data.interval);
    			}
    			data.interval = setInterval(updateTimer, settings.refreshInterval);

    			// initialize the element with the starting value
    			render(value);

    			function updateTimer() {
    				value += increment;
    				loopCount++;

    				render(value);

    				if (typeof(settings.onUpdate) == 'function') {
    					settings.onUpdate.call(self, value);
    				}

    				if (loopCount >= loops) {
    					// remove the interval
    					$self.removeData('countTo');
    					clearInterval(data.interval);
    					value = settings.to;

    					if (typeof(settings.onComplete) == 'function') {
    						settings.onComplete.call(self, value);
    					}
    				}
    			}

    			function render(value) {
    				var formattedValue = settings.formatter.call(self, value, settings);
    				$self.html(formattedValue);
    			}
    		});
    	};

    	$.fn.countTo.defaults = {
    		from: 0,               // the number the element should start at
    		to: 0,                 // the number the element should end at
    		speed: 1000,           // how long it should take to count between the target numbers
    		refreshInterval: 100,  // how often the element should be updated
    		decimals: 0,           // the number of decimal places to show
    		formatter: formatter,  // handler for formatting the value before rendering
    		onUpdate: null,        // callback method for every time the element is updated
    		onComplete: null       // callback method for when the element finishes updating
    	};

    	function formatter(value, settings) {
    		return value.toFixed(settings.decimals);
    	}
    }(jQuery));

    jQuery(function ($) {
      // custom formatting example
      $('.count-number').data('countToOptions', {
    	formatter: function (value, options) {
    	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    	}
      });

      // start all the timers
      $('.timer').each(count);

      function count(options) {
    	var $this = $(this);
    	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    	$this.countTo(options);
      }
    });
