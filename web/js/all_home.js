var html,
		rem,
		body_var,
		html_body,
		$window,
		global_window_Height,
		global_window_Width,
		$wrapper,
		$wrapper_Height,
		$scroll_top;

$(document).ready(function ($) {

	$window = $(window);
	html = $('html');
	body_var = $('body');
	$wrapper = $('.wrapper');
	html_body = $("html, body");



	resize();
	all_dialog_close();

	$('.user_full_text_trigger').on('click', function () {
			var $this = $(this);
			var $text = $this.closest('.user_block').find('.user_full_text');
			if ($this.hasClass('active_mod')) {
				$this.removeClass('active_mod');
				$text.slideUp(400);
			}
			else {
				$this.addClass('active_mod');
				$text.slideDown(400);
			}
		return false;
	});

	$('.meet_team_butt').on('click', function () {
		html_body.animate({scrollTop:global_window_Height}, 800,'easeInSine', function() {});
		return false;
	});
});

$(window).on('load', function () {
	body_var.removeClass('no_animation');
});

$(window).on('resize', resize);
$(window).on('orientationchange', resize);
$(window).on('scroll', scroll_f);

function resize() {
	global_window_Height = $window.height();
	global_window_Width = $window.width();
	$wrapper_Height = $wrapper.height();
}

function scroll_f() {
	$scroll_top = $(document).scrollTop();

	//clearTimeout(timer);
	//if (!body_var.classList.contains('disable-hover')) {
	//	body_var.classList.add('disable-hover')
	//}
	//
	//timer = setTimeout(function () {
	//	body_var.classList.remove('disable-hover')
	//}, 500);
}

function all_dialog_close() {
	body_var.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl() {
	$(".ui-dialog-content").each(function () {
		var $this = $(this);
		if (!$this.parent().hasClass('always_open')) {
			$this.dialog("close");
		}
	});
}
