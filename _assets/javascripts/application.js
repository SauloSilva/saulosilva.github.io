//= require jquery-2.1.4
//= require jquery.lazyload
//= require materialize

$(document).ready(function() {
  $('.button-collapse').sideNav();
  $('img.lazy').lazyload({
    effect : 'fadeIn'
  });
});