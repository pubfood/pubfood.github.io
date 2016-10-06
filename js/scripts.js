jQuery(document).ready(function($) {

var the_window_width = $(window).width();

// begin main navigation
$('#mn-toggle-link').click(
	function() {
		$('#main-nav').stop().slideToggle(500);
	}
);
$(window).resize(
	function() {
		if ( $(this).width() != the_window_width && $(this).width() >= 1000 ) {
			$('#main-nav').stop().css({'display':''});
		}
	}
);
// end main navigation

// begin "Example GA Reports" show/hide sections
$('#example-ga-reports-menu').find('li').click(
	function() {
		var section_id_to_display = $(this).find('a').attr('href');
		$('#adunit, #device, #latency').hide(0);
		$(section_id_to_display).fadeIn(500);	
	}
);
// end  "Example GA Reports" show/hide sections

  //Set nav content anchors in generated content
  if (window.apiContentAnchors) {
    var count = 1;
    for (var i in window.apiContentAnchors) {
      var id = window.apiContentAnchors[i].id;
      var divText = '<div id="anchor-section-heading-' + count + '"></div>';
      $(divText).insertBefore('#' + id);
      count++;
    }
  }
}); // end document ready
