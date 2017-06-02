---
---
var Alerts =
{
    DELIVERY_SUCCESS:
    {
        title: "Response Delivered!",
      content: "Your response has been delivered. We will get in touch with you shortly.",
         icon: { src: "{{ site.urls.icons }}/happy.png" }
    },
    DELIVERY_FAILURE:
    {
        title: "Whoops!",
      content: "An error occured while attempting to submit your response. Please try again.",
         icon: { src: "{{ site.urls.icons }}/sad.png" }
    },
};

function displayAlert (alert) {
  $(".modal-info-heading").html(alert.title);
  $(".modal-info-content").html(alert.content);

  $(".modal-info-icon").attr("src", alert.icon.src);

  $(".modal-info").modal("show");
};

function submitEmail (data) {
  $.ajax({
    url: "https://formspree.io/{{ site.brand.email }}",
    method: "POST",
    data: data,
    dataType: "json",
    success: function (response) {
      if ( response.success == "email sent" ) {
        displayAlert(Alerts.DELIVERY_SUCCESS);
      } else {
        displayAlert(Alerts.DELIVERY_FAILURE);
        console.log('ERROR: Confirm formspree.io email address.');
      }
    },
    error: function (xhr, status, err) {
      displayAlert(Alerts.DELIVERY_FAILURE);
    }
  });
}

$(document).ready(function ( ) {
  // Fix shifting fixed navbar to the right on modal click
  // Shamelessly taken from https://github.com/twbs/bootstrap/issues/14040#issuecomment-89720484
  $(window).load(function(){
      var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
      $.fn.modal.Constructor.prototype.setScrollbar = function ()
      {
          oldSSB.apply(this);
          if(this.bodyIsOverflowing && this.scrollbarWidth)
          {
              $(".navbar-fixed-top, .navbar-fixed-bottom").css("padding-right", this.scrollbarWidth);
          }
      }

      var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
      $.fn.modal.Constructor.prototype.resetScrollbar = function ()
      {
          oldRSB.apply(this);
          $(".navbar-fixed-top, .navbar-fixed-bottom").css("padding-right", "");
      }
  });

  // lazyload
  $("img.lazy").lazyload({
    effect: "fadeIn"
  });

  // not-available on error
  $("img").on("error", function ( ) {
    $(this).attr("src", "{{ site.urls.images }}/not-available.jpg")
  });

  // smoothScroll
  smoothScroll.init({
    selectorHeader: "[data-scroll-header]",
    speed: 1000,
    easing: "easeInOutQuint"
  });

  // copyright-date
  var today = new Date();
  var year  = today.getFullYear();

  $(".copyright-date").html(year);

  // form
  $("form.fconsultation, form.fcontact")
    .validator()
    .on("submit", function (event) {
    if ( ! event.isDefaultPrevented() ) {
      event.preventDefault();

      var $element = $(this)
      ,   data     = $element.serializeObject();

      delete data['_gotcha'];

      submitEmail(data);
    }
  });

  $("form.fbuy form.fconsultation form.subscription")
    .validator()
    .on("submit", function (event) {
    if ( ! event.isDefaultPrevented() ) {
      event.preventDefault();

      $(".modal-buy").modal("hide");

      var $element = $(this)
      ,   data     = $element.serializeObject()
      ,   name     = $(".modal-buy-title").html();

      data['item'] = name;

      delete data['_gotcha'];

      submitEmail(data);
    }
  });

  paypal.Button.render({
    client: {
         sandbox: "ARG9MxICmYkPvVAUxIeAw2I34uG3wvy13vPBVVPLaD-He6bViTKylKwJJJP-jIBd_FMvfBxzVzg6vBxN",
      production: "AVM48MplL9ASEftrcb5X9QTlt8iS89AlpiBLdB01f6ed1dnxGxj8ClSWS0n9HtLMkVyMD2vu7bHTEG7d",
    },
    payment: function(data, actions) {
      var item     = $(".item-view").data("item")
      ,   $element = $("#" + item)
      ,   selected = $(".item-select").selectpicker("val")
      ,   source   = $element.data("source")
      ,   price    = $element.data("price")
      ,   frame    = $element.data("frame")
      , totalPrice = (selected == "no-frame") ? price : price + frame;

      console.log(totalPrice);

      var payment  = actions.payment.create({
        transactions: [
          {
            amount: {
                 total: totalPrice,
              currency: 'USD',
            }
          }
        ]
      })

      return payment;
    },

    onAuthorize: function(data, actions) {

    },

    onCancel: function(data) {
      console.log('ERROR: Payment was cancelled.')
    }
  }, '.paypal-checkout-container');
});
