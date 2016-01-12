jQuery(document).ready(function($) {

// begin main navigation
$('#mn-toggle-link').click(
	function() {
		$('#main-nav').stop().slideToggle(500);
	}
);
if ( $(window).width() <= 1024 ) {
	var the_mn_window_width = $(window).width();
	$(window).resize(
		function() {
			if ( $(this).width() != the_mn_window_width ) {
				$('#main-nav').stop().css({'display':''});
			}
		}
	);
}
// end main navigation

  //Set nav content anchors in generated content
  if (window.apiContentAnchors) {
    var count = 1;
    for (var i in window.apiContentAnchors) {
      var id = window.apiContentAnchors[i].id;
      var divText = '<div id="anchor-section-heading-' + count + '"></div>';
      $(divText).insertAfter('#' + id);
      count++;
    }
  }
}); // end document ready
