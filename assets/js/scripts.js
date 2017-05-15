$(document).ready(function ( ) {
  // Fix shifting fixed navbar to the right on show modal
  // Shamelessly taken from https://github.com/twbs/bootstrap/issues/14040#issuecomment-89720484
  var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
  $.fn.modal.Constructor.prototype.setScrollbar = function ()
  {
      oldSSB.apply(this);
      if(this.bodyIsOverflowing && this.scrollbarWidth)
      {
          $('.navbar-fixed-top, .navbar-fixed-bottom').css('padding-right', this.scrollbarWidth);
      }
  }

  var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
  $.fn.modal.Constructor.prototype.resetScrollbar = function ()
  {
      oldRSB.apply(this);
      $('.navbar-fixed-top, .navbar-fixed-bottom').css('padding-right', '');
  }

  // lazyload
  $("img.lazy").lazyload({
    effect: "fadeIn"
  });

  // copyright
  var date = new Date();
  var year = date.getFullYear();
  $(".copyright-date").html(year);

  // launch subscription modal
  // $('.modal-subscription').modal('show');
});
