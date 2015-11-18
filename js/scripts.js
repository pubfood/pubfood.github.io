jQuery(document).ready(
function($) {


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

var page_name = location.pathname;
page_name = page_name.toLowerCase();
page_name = page_name.replace('/','');

$('#main-nav').find('li').each(
	function() {
		var mn_page_name = $(this).find('a').attr('href');
		mn_page_name = mn_page_name.toLowerCase();
		mn_page_name = mn_page_name.replace('/','');
		if (page_name == mn_page_name) {
			$(this).find('a').addClass('mn-link-active');
		}
	}
);
// end main navigation


// begin hiding blue content section under main nav when it is an empty div
$('.top-w-3').each(
	function() {
		if ( ( $(this).html() == '' ) || ( $(this).html() == '<!-- optional text can be placed here -->' ) ) {
			$(this).css({'display':'none'});
		}
	}
);
// end hiding blue content section under main nav when it is an empty div


}
); // end document ready
