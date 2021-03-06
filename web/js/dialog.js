function dialog(dialog_id, dialog_class, dialog_trigger_id, dialog_active_class, dialog_width, dialog_wrap, modal, modal_height) {
	if (modal == undefined) modal = true;
	if (dialog_wrap == undefined || dialog_wrap == false) dialog_wrap = '.wrapper';
	var $drag = true;
	if (dialog_id == '#dialog_user_data') $drag = false;
	var dialog_ = jQuery(dialog_id),
			dialog_trigger_;
	if (dialog_trigger_id == false) {
		dialog_trigger_ = dialog_trigger_id;
	}
	else {
		dialog_trigger_ = jQuery(dialog_trigger_id);
	}


	if (dialog_active_class != false) {
		dialog_.dialog({
			autoOpen: false,
			modal: false,
			closeOnEscape: true,
			closeText: '',
			dialogClass: dialog_class,
			appendTo: dialog_wrap,
			width: dialog_width,
			open: function (event, ui) {
				console.log(this);
				jQuery(this).parent()
						.on('mouseenter', function () {
							body_var.addClass('dialog_hover');
						})
						.on('mouseleave', function () {
							body_var.removeClass('dialog_hover');
						})
						.addClass(dialog_active_class);

				$(".ui-dialog-content").not(this).dialog('close');

				dialog_trigger_.addClass(dialog_active_class);
				body_var.addClass('dialog_open');

				if (body_var.hasClass('develop_mod')) {
					console.log('open');
				}
			},
			close: function (event, ui) {
				jQuery(this).parent().removeClass(dialog_active_class);

				body_var.removeClass('dialog_open ' + dialog_class);

				dialog_trigger_.removeClass(dialog_active_class);
				if (body_var.hasClass('develop_mod')) {
					console.log('close');
				}
			}
		});
//		jQuery('.butt_v12',dialog_).on('click', function (event) {
//			event.preventDefault();
//		});


		body_var.on('click', function () {
			if ($(this).hasClass('dialog_open') && !$(this).hasClass('dialog_hover') && dialog_.dialog("isOpen") && dialog_active_class != 'always_open') {
				if (body_var.hasClass('develop_mod')) {
					console.log('click_body_var');
				}
				dialog_.dialog('close');
			}

		});
		if (dialog_trigger_ != false) {
			console.log(dialog_trigger_id);
			body_var.on('click',dialog_trigger_id, function () {
				if (jQuery(this).hasClass(dialog_active_class)) {
					if (body_var.hasClass('develop_mod')) {
						console.log('click_close');
					}
					dialog_.dialog('close');
					return false;
				}
				else if (!body_var.hasClass('disable_open_dialog')) {
					if (body_var.hasClass('develop_mod')) {
						console.log('click');
					}
					dialog_.dialog('open');
					return false;
				}
			});
		}
	} else {
		dialog_.dialog({
			autoOpen: false,
			modal: modal,
			closeOnEscape: true,
			closeText: '',
			show: "fade",
			position: {my: "center center", at: "center center", of: window},
			draggable: $drag,
			dialogClass: dialog_class,
			width: dialog_width,
			open: function (event, ui) {
				console.log(this);
				body_var.addClass('dialog_regular_open');
			},
			close: function (event, ui) {
				body_var.removeClass('dialog_regular_open');
			}
		});

		if (dialog_trigger_ != false) {
			console.log(dialog_trigger_id);
			body_var.on('click',dialog_trigger_id, function () {
				dialog_.dialog('open').DialogFixed(modal_height);
				return false;
			});
		}
	}
	this.openDialog = function () {
		if (!$drag) {
			dialog_.parent().draggable({handle: '.admin_user_popup_mod', cursor: 'move'});
		}
		dialog_.dialog('open').DialogFixed(modal_height);
	};
	this.closeDialog = function () {
		dialog_.dialog('close');
	};
	this.getDialog = function () {
		return dialog_;
	}
}
jQuery.fn.DialogFixed = function (height) {
	var element = this.parent();
	element.css('position', 'fixed');

	if (height != null) {
		if(global_window_Height > height){
			element.css('top', (global_window_Height / 2) - (height / 2));
		}else{
			element.css('top', 0);
		}
//		console.log(global_window_Height);
//		console.log(height);
	}
	else {
		element.css('top', (global_window_Height / 2) - (element.outerHeight() / 2));
//		console.log((global_window_Height / 2),(element.outerHeight() / 2));
	}
};