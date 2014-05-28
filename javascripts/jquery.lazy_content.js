/*
 * jQuery.LazyContent
 * https://github.com/tulios/jquery.lazy_content
 * version: 0.2.0
 */
(function($, window, document) {

  var LOAD = "lazyContentLoad";
  var RESIZE_EVENT = "resize.lazyContent";
  var SCROLL_EVENT = "scroll.lazyContent";

  $.fn.lazyContent = function(options) {
    options = $.extend({}, $.fn.lazyContent.defaults, options);
    var instance = new LazyContent(this, options);

    $(window).on(RESIZE_EVENT, function() { instance.resize() });
    $(window).on(SCROLL_EVENT, function() { instance.scroll() });

    instance.resize();
  };

  $.fn.lazyContent.defaults = {
    threshold: 0,
    thresholdScroll: 100,
    onLoad: $.noop
  }

  var LazyContent = function (elements, options) {
    this.options = options;
    this.$elements = $(elements).each(function() {
      $(this).data(LOAD, true);
    });

    this.screenHeight = 0;
    this.screenWidth = 0;
    this.locked = false;
  }

  LazyContent.prototype = {
    resize: function() {
      this.screenHeight = window.innerHeight || document.documentElement.clientHeight;
      this.screenWidth = window.innerWidth || document.documentElement.clientWidth;
      this.scroll();
    },

    scroll: function() {
      if (this.locked || this.$elements.length === 0) return;
      this.locked = true;

      var self = this;
      setTimeout(function() {
        var elementsNotLoaded = [];

        self.$elements.each(function() {
          var element = $(this);
          if(!!element.data(LOAD) && element.is(':visible') && self.isVisible(element)) {
            self.options.load(element);
            element.data(LOAD, false);

          } else {
            elementsNotLoaded.push(element);
          }
        });

        if (elementsNotLoaded.length < self.$elements.length) {
          self.$elements = $(elementsNotLoaded);
        }

        self.locked = false;

      }, this.options.thresholdScroll);
    },

    isVisible: function(element) {
      var rect = element[0].getBoundingClientRect();
      var x1 = y1 = -this.options.threshold;
      var y2 = this.screenHeight - y1;
      var x2 = this.screenWidth - x1;
      return (rect.top >= y1 && rect.top <= y2 || rect.bottom >= y1 && rect.bottom <= y2) &&
        (rect.left >= x1 && rect.left <= x2 || rect.right >= x1 && rect.right <= x2);
    }
  }

})(jQuery, window, document);
