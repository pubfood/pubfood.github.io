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
      id = id.replace(/([^\a-z]+)/gi, '-');
      var divText = '<div id="anchor-section-heading-' + count + '"></div>';
      $(divText).insertBefore('#' + id);
      count++;
    }
  }
}); // end document ready

// begin "Example GA Reports" show/hide sections
 +$('#example-ga-reports-menu').find('li').click(
function() {
		var section_id_to_display = $(this).find('a').attr('href');
		$('#adunit, #device, #latency').hide(0);
				$(section_id_to_display).fadeIn(500);	
	}
);
// end  "Example GA Reports" show/hide sections
