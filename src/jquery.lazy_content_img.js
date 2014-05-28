/*
 * jQuery.LazyContent
 * https://github.com/tulios/jquery.lazy_content
 * version: 0.2.0
 *
 * jQuery.LazyContentImg
 * version: 0.1.0
 */
(function($, window, document) {

  $.fn.lazyContentImg = function(options) {
    var callback = {
      load: function(element) {
        options.beforeLoad(element);
        element.attr("src", element.data("src"));
        element.load(function() { element.addClass(options.loadedClass) });
        options.afterLoad(element);
      }
    }

    options = $.extend({},
      $.fn.lazyContent.defaults,
      $.fn.lazyContentImg.defaults,
      options,
      callback
    );

    $(this).lazyContent(options);
  }

  $.fn.lazyContentImg.defaults = {
    beforeLoad: $.noop,
    afterLoad: $.noop,
    loadedClass: "loaded"
  }

})(jQuery, window, document);
