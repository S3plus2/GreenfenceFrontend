var html,
		rem,
		body_var,
		$window,
		global_window_Height,
		global_window_Width,
		$wrapper,
		$wrapper_Height,
		$scroll_top,
		timer,
		global_array,
		map_page_array,
		about_page,
		wizard_page,
		map_popup_flag = false,
		map_popup_el,
		map_popup_past_el,
		map_popup_move = false,
		map_popup_top,
		map_popup_left,
		map_top_shift_permanent = 0,
		map_left_shift_permanent = 0,
		map_top_shift = 0,
		map_left_shift = 0,
		myMap,
		invite_user_field_count = 0,
		marker_array = {
			marker_el: [],
			marker_menu_el: [],
			filer_menu: ''
		},
		local_arrays = {
			image_field: false,
			image_credentials_field: false
		},
		profile_page_array = {
			follow_popup: ''
		};

var messages_center = {
	take_action_butt: '',
	compose_msg_butt: '',
	add_msg_block: '',
	create_new_group_butt: '',
	create_group_popup: '',
	autocomplete_el: ''
};

var invite_array = [
	{
		value: "Mitch Chait",
		name: "Mitch Chait",
		icon: "ava_36.jpg"
	},
	{
		value: "John Allen",
		name: "John Allen",
		icon: "ava_36.jpg"
	},
	{
		value: "button",
		class_mod: "import_contacts_auto_butt",
		text: "Import Contacts"
	}
];

var locations_array = [
	{
		coords_Lat: 28.415833,
		coords_Lng: -81.298889
	},
	{
		coords_Lat: 29.428611,
		coords_Lng: -98.493333
	},
	{
		coords_Lat: 40.45,
		coords_Lng: -80
	}
	,
	{
		coords_Lat: 34.736111,
		coords_Lng: -92.331111
	}
	,
	{
		coords_Lat: 39.05,
		coords_Lng: -94.583333
	}
];

$(document).ready(function ($) {

	$window = $(window);
	html = $('html');
	body_var = $('body');
	$wrapper = $('.wrapper');

	global_f();

	if (body_var.hasClass('about_page')) {
		about_page_f();
	}

	//if (body_var.hasClass('messages_center_page')) {
		messages_center_f();
	//}

	if (body_var.hasClass('map_view_page')) {
		map_page_f();
	}

	if (body_var.hasClass('wizard_page')) {
		wizard_page_f();
	}

	if (body_var.hasClass('profile_page')) {
		profile_page_f();
	}

	body_var.on('click', body_close_gl);

	detail_page_f();
	resize();
	all_dialog_close();
});

function global_f() {

	console.log('Updating Listeners ...');

	global_array = {
		user_menu_block:'',
		user_menu_butt:'',
		invite_user_butt: '',
		invite_users: '',
		gl_action_trigger_butt:'',
		gl_action_block:'',
		gl_action_butt:'',
		select_add_category_big: '',
		select_add_category_normal: '',
		viewing_trigger_butt: ''
	};
	global_array.user_menu_butt = $('.user_menu_butt');
	global_array.user_menu_block = $('.user_menu_block');


	body_var.on('click','.user_menu_butt', function () {
		var $this = $(this);
		if ($this.hasClass('active_mod')) {
			$this.removeClass('active_mod');
			$('.user_menu_block').removeClass('active_mod');
		}
		else {
			$this.addClass('active_mod');
			$('.user_menu_block').addClass('active_mod');
		}
	});


	$('.connect_user_butt').on('click', function () {
		$(this).hide();
		$('.message_user_butt').show();
	});


	$(".section_menu_link.menu_trigger").on('click', function () {
		var $this = $(this),
				sub_menu = $this.closest('.section_menu_l_item').find('.section_menu_list.header_mod.hidden_mod');
		if ($this.hasClass('active_mod')) {
			$this.removeClass('active_mod');
			sub_menu.slideUp(400);
		}
		else {
			$this.addClass('active_mod');
			sub_menu.slideDown(400);
		}
		return false;
	});

	global_array.user_menu_block.on('mouseenter', function () {
		body_var.addClass('user_menu_hover');
	})
	.on('mouseleave', function () {
		body_var.removeClass('user_menu_hover');
	});

	body_var.on('click', function () {
		if (!$(this).hasClass('user_menu_hover')) {
			global_array.user_menu_butt.removeClass('active_mod');
			global_array.user_menu_block.removeClass('active_mod');
		}
	});

	global_array.invite_users = new dialog('#invite_users', 'dialog_v1 invite_users_dialog no_close_mod no_title_mod dialog_color_schema_1_mod dialog_g_size_1', '.invite_users_butt', false, '510', false);

	$('.dialog_cancel_butt').on('click', function () {
		all_dialog_close_gl();
		return false;
	});

	if ($(".select_rediz_coosen").length) {
		$(".select_rediz_coosen").chosen({
			//view_mod:'huge_mod',
			disable_search: true,
			inherit_select_classes: true,
			disable_search_threshold: 5,
			no_results_text: "Oops, nothing found!",
			width: "100%"
		});
	}
	if ($(".select_rediz_coosen_huge_mod").length) {
		$(".select_rediz_coosen_huge_mod").chosen({
			view_mod: 'huge_mod',
			disable_search: true,
			inherit_select_classes: true,
			display_disabled_options: false,
			disable_search_threshold: 0,
			no_results_text: "Oops, nothing found!",
			width: "100%"
		});
	}

	if ($(".select_rediz_coosen_huge_2_mod").length) {
		$(".select_rediz_coosen_huge_2_mod").chosen({
			view_mod: 'huge_2_mod',
			disable_search: true,
			inherit_select_classes: true,
			display_disabled_options: true,
			disable_search_threshold: 0,
			no_results_text: "Oops, nothing found!",
			width: "100%"
		});
	}

	$('.add_info_collapse_butt').on('click', function () {
		var $this = $(this),
				parent = $this.closest('.add_info_block');
		if ($this.hasClass('active_mod')) {
			$this.removeClass('active_mod');
			$('.add_info_form_block', parent).slideUp(400);
		}
		else {
			$this.addClass('active_mod');
			$('.add_info_form_block', parent).slideDown(400);
		}
	});

	$('.sectionMenuHiddenTrigger').on('click', function () {
		var $this = $(this),
				parent = $this.closest('.section_menu_l_item');
		if ($this.hasClass('active_mod')) {
			$this.removeClass('active_mod');
			$('.section_menu_hidden', parent).slideUp(400);
		}
		else {
			$this.addClass('active_mod');
			$('.section_menu_hidden', parent).slideDown(400);
		}
	});

	$('.butt_cancel').on('click', function () {
		var $this = $(this),
				parent = $this.closest('.add_info_block');

		$('.add_info_collapse_butt', parent).removeClass('active_mod');
		$('.add_info_form_block', parent).slideUp(400);
	});

	$('.attach_butt').on('click', function () {
		var $this = $(this),
				parent = $this.closest('.add_info_form_block');
		if ($this.hasClass('file_mod')) {
			if (!local_arrays.image_credentials_field) {
				local_arrays.image_credentials_field = $('.form_cell.form_cell_v1_mod', parent);
			}
			local_arrays.image_credentials_field.clone(true).appendTo($('.add_info_form_w', parent));
		} else if ($this.hasClass('image_mod')) {
			if (!local_arrays.image_field) {
				local_arrays.image_field = $('.form_cell.form_cell_v1_mod', parent);
			}
			local_arrays.image_field.clone(true).appendTo($('.add_info_form_w', parent));
		}
	});

	invite_auto($('.import_contacts'));

	$(".tabs_v1" ).tabs();

	$('.invite_another_user_butt').on('click', function () {
			var $this = $(this),
				parent = $this.closest('.dialog_form');
		$('.dialog_form_inject_block', parent)
			.append('' +
				'<dl class="form_cell form_cell_v1_mod">'+
					'<dt class="form_c_hline form_v1_mod hline_hide_mod">'+
						'<label for="Enter_email_of_user">Enter email of user</label>'+
					'</dt>'+
					'<dd class="form_c_f_w form_v1_mod hline_hide_mod">'+
						'<input type="text" id="Enter_email_of_user_'+ invite_user_field_count+'" placeholder="Enter email of user" class="f_c_field default_mod import_contacts">'+
					'</dd>'+
				'</dl>');
		invite_auto($('#Enter_email_of_user_'+ invite_user_field_count));
		invite_user_field_count++
	});

	global_array.gl_action_trigger_butt = $('.gl_action_trigger_butt');
	global_array.gl_action_block = $('.gl_action_block');
	global_array.gl_action_butt = $('.gl_action_butt');

	global_array.gl_action_trigger_butt.on('click', function () {
		var $this = $(this),
				$parent = $this.closest('.gl_action_block');
		if ($this.hasClass('active_mod')) {
			body_var.removeClass('gl_action_open');
			$parent.removeClass('active_mod');
			$this.removeClass('active_mod');
		}
		else {
			body_var.addClass('gl_action_open');
			$parent.addClass('active_mod');
			$this.addClass('active_mod');
		}
		return false;
	});

	global_array.gl_action_block.on('mouseenter', function () {
		body_var.addClass('gl_action_hover');
	})
			.on('mouseleave', function () {
				body_var.removeClass('gl_action_hover');
			});

	global_array.gl_action_butt.on('click', function () {
		var $this = $(this),
				$parent = $this.closest('.gl_action_list');
		if (!$this.hasClass('active_mod')) {
			$('.gl_action_butt', $parent).removeClass('active_mod');
			$this.addClass('active_mod');
		}
		return false;
	});

	$('.add_info_tabs_b_header_search_trigger').on('click', function () {
		var $this = $(this),
				$parent = $this.closest('.add_info_tabs_block');
		if ($this.hasClass('active_mod')) {
			$this.removeClass('active_mod');
			$('.form_cell_v1_mod.hidden_field', $parent).slideUp(400);
		}
		else {
			$this.addClass('active_mod');
			$('.form_cell_v1_mod.hidden_field', $parent).slideDown(400);
		}
		return false;
	});

	if ($('.big_list').length || $('.normal_list').length || $('.viewing_trigger_butt').length) {
		global_array.select_add_category_big = $('.select_add_category.big_list');
		global_array.select_add_category_normal = $('.select_add_category.normal_list');
		global_array.viewing_trigger_butt = $('.viewing_trigger_butt');


		global_array.viewing_trigger_butt.on('click', function () {
			var $this = $(this),
					hidden_b = $this.closest('.browse_list_block').find('.browse_list_b_hidden');

			if ($this.hasClass('active_mod')) {
				hidden_b.slideUp(400);
				$this.removeClass('active_mod');
			}
			else {
				hidden_b.slideDown(400);
				$this.addClass('active_mod');
			}
			return false;
		});

		global_array.select_add_category_big.multiselect({
			minWidth: 'auto',
			classes: 'autocomplete_el_v1_mod big_list_mod',
			//header: false,
			height: 300
			//noneSelectedText: 'Enter name of category'

		}).multiselectfilter({
			filter: function (event, matches) {
				console.log(event);
			}
		});

		global_array.select_add_category_normal.multiselect({
			minWidth: 'auto',
			classes: 'autocomplete_el_v1_mod',
			//header: false,
			height: 300,
			categoryMod: 'category_show',
			create: function (event, ui) {
				$('#' + $(this).attr('id')).multiselect("uncheckAll");
			}
		}).multiselectfilter({
			filter: function (event, matches) {
				console.log(event);
			}
		});

		global_array.select_add_category_normal.on("multiselectoptgrouptoggle", function (event, ui) {
			multiselectclick_f(this, $('#' + $(this).attr('id')));
		});
		global_array.select_add_category_normal.on("multiselectclick", function (event, ui) {
			//console.log($(this).attr('id'));
			multiselectclick_f(this, $('#' + $(this).attr('id')));
		});
	}

	if ($('#reset_user_compliance').length) {

		var reset_user_compliance = new dialog('#reset_user_compliance', 'dialog_v1 follow_popup_dialog no_close_mod dialog_color_schema_1_mod dialog_g_size_1', '.reset_user_compliance_butt', false, '510', false);
	}

	if ($('#profile_send_message').length) {

		var profile_send_message = new dialog('#profile_send_message', 'dialog_v1 follow_popup_dialog no_close_mod dialog_color_schema_1_mod dialog_g_size_1', '.message_user_butt', false, '510', false);
	}


	if ($('#company_send_message').length) {

			var company_send_message = new dialog('#company_send_message', 'dialog_v1 follow_popup_dialog no_close_mod dialog_color_schema_1_mod dialog_g_size_1', '.message_company_butt', false, '510', false);
		}



}

function detail_page_f() {
	var follow_configure;
	follow_configure = new dialog('#follow_configure', 'dialog_v1 follow_configure_dialog no_close_mod dialog_color_schema_1_mod dialog_g_size_1 modal_dialog_mod', '.detail_follow_configure_butt', 'active_mod', '670', '.detail_block');

	var field_spin = $('.field_spin_v1').spinner({
		max: 30,
		min: 1,
		create: function( event, ui ) {
			$(this).spinner('stepUp',30);
			console.log(ui, this);
		},
		spin: function (event, ui) {

		}
	});
}

function body_close_gl(){
	if (body_var.hasClass('gl_action_open') && !body_var.hasClass('gl_action_hover')) {
		body_var.removeClass('gl_action_open');
		global_array.gl_action_trigger_butt.removeClass('active_mod');
		global_array.gl_action_block.removeClass('active_mod')
	}
}

function profile_page_f(){

	profile_page_array.follow_popup = new dialog('#follow_popup', 'dialog_v1 follow_popup_dialog no_close_mod dialog_color_schema_1_mod dialog_g_size_1', '.follow_configure_butt', false, '670', false);


}

function wizard_page_f() {
	wizard_page = {
		menu_cat_option_butt: '',
		create_folder: '',
		share_link_folder: '',
		select_add_category_big: '',
		select_add_category_normal:'',
		viewing_trigger_butt: ''
	};

	wizard_page.menu_cat_option_butt = $('.menu_cat_option_butt');

	wizard_page.menu_cat_option_butt.on('click', function () {
		var $this = $(this),
				hidden_b = $this.closest('.menu_cat_view').find('.menu_cat_view_hidden_b');

		if ($this.hasClass('active_mod')) {
			hidden_b.slideUp(400);
			$this.removeClass('active_mod');
		}
		else {
			hidden_b.slideDown(400);
			$this.addClass('active_mod');
		}
		return false;
	});

	wizard_page.create_folder = new dialog('#create_folder', 'dialog_v1 create_folder_dialog no_close_mod dialog_color_schema_1_mod dialog_g_size_1', '.folders_head_butt.add_edit_mod', false, '520', false);

	wizard_page.share_link_folder = new dialog('#share_link_folder', 'dialog_v1 share_link_folder_dialog no_close_mod dialog_color_schema_1_mod dialog_g_size_1', '.doc_action.folders_mod.share_mod, .folder_b_action.share_mod', false, '520', false);






	//if ($('.add_info_block.product_category_mod').length) {
	//	var select_list_array;
	//
	//	var product_element_block = $('.form_cell_v1_mod.select_add_product');
	//
	//	var select_list_product = $('.select_list_product');
	//
	//	var select_add_product_main = $('.select_add_product.normal_list_v2').multiselect({
	//		minWidth: 'auto',
	//		classes: 'autocomplete_el_v1_mod',
	//		//header: false,
	//		height: 300
	//	}).multiselectfilter({
	//		filter: function (event, matches) {
	//			console.log(event);
	//		}
	//	});
	//
	//	select_add_product_main.multiselect("uncheckAll");
	//
	//	select_add_product_main.on("multiselectclick", function (event, ui) {
	//		var $this = $(this),
	//			parent = $this.closest('.add_info_form_w').find('.category_block');
	//		select_add_product_main.multiselect("close");
	//		parent.empty();
	//		if (!product_element_block.hasClass('active_mod')) {
	//			product_element_block.slideDown(300).addClass('active_mod');
	//		}
	//
	//		//$('.add_info_collapse_butt', product_element_block).trigger('click')
	//		select_add_product_element.empty();
	//
	//		//label
	//
	//		//select_add_product_element.clone().appendTo( ".goodbye" );
	//		var array_of_checked_values = select_add_product_main.multiselect("getChecked").map(function () {
	//			return this.title;
	//		}).get();
	//
	//		if (array_of_checked_values.length == 0) {
	//			select_add_product_element.empty();
	//			product_element_block.slideUp(300).removeClass('active_mod');
	//		}
	//		else {
	//			for (var i = 0; i < array_of_checked_values.length; i++) {
	//				$('optgroup[label="' + array_of_checked_values[i] + '"]', select_list_product).clone().appendTo(select_add_product_element);
	//
	//				if (i == array_of_checked_values.length - 1) {
	//					select_add_product_element.multiselect("refresh");
	//					select_add_product_element.multiselect("uncheckAll");
	//					select_add_product_element.multiselect("open");
	//				}
	//			}
	//
	//		}
	//		console.log(array_of_checked_values, array_of_checked_values.length);
	//	});
	//
	//
	//	var select_add_product_element = $('.select_add_product.normal_list_v3');
	//
	//	select_add_product_element.multiselect({
	//		minWidth: 'auto',
	//		classes: 'autocomplete_el_v1_mod',
	//		//header: false,
	//		height: 300
	//	}).multiselectfilter({
	//		filter: function (event, matches) {
	//			console.log(event);
	//		}
	//	});
	//
	//	select_add_product_element.on("multiselectoptgrouptoggle", function (event, ui) {
	//		multiselectclick_f(this, select_add_product_element);
	//	});
	//	select_add_product_element.on("multiselectclick", function (event, ui) {
	//		multiselectclick_f(this, select_add_product_element);
	//	});
	//
	//}

	body_var.on("change", '.multiselect_trigger', function () {
		var $this = $(this),
			parent = $this.closest('.category_list_item'),
			super_parent = $this.closest('.category_wrap'),
			parent_index = parent.index();

		$('#ui-multiselect-'+$this.attr('data-id')+'-option-'+$this.val()).trigger('click');
		if(parent_index == 0){
			super_parent.remove();
		}else{
			parent.remove();
		}

		//console.log($this, $('#ui-multiselect-'+$this.attr('data-id')+'-option-'+$this.val()));
	});

	invite_auto($(".wizard_page #Enter_name_of_user"));

}

function category_list_item(element, title, value, id, category_title){
	if(title == 'Other'){
		element
			.append('<li class="category_list_item other_mod">' +
						'<label class="lbl_rb_ch_block lbl_rb_ch_default_mod ">' +
							'<input data-id="'+id+'" name="Example" type="checkbox" class="lbl_inp_rb_ch multiselect_trigger" checked value="'+value+'">' +
							'<span class="lbl_rb_ch_text lbl_rb_ch_t_default_mod lbl_rb_ch_t_default_green_grey_mod">' + title + '</span>' +
						'</label>' +
						'<dl class="form_cell form_cell_v1_mod checkbox_list_mod">'+
							'<dt class="form_c_hline form_v1_mod hline_hide_mod checkbox_list_mod">'+
								'<label for="Other_field">Other ' + category_title + '</label>'+
							'</dt>'+
							'<dd class="form_c_f_w form_v1_mod hline_hide_mod checkbox_list_mod">'+
								'<input type="text" id="Other_field" placeholder="Enter Other ' + category_title + '" class="f_c_field second_mod ">'+
							'</dd>'+
						'</dl>'+
					'</li>');
	}else{
		element
			.append('<li class="category_list_item">' +
						'<label class="lbl_rb_ch_block lbl_rb_ch_default_mod ">' +
							'<input data-id="'+id+'" name="Example" type="checkbox" class="lbl_inp_rb_ch multiselect_trigger" checked value="'+value+'">' +
							'<span class="lbl_rb_ch_text lbl_rb_ch_t_default_mod lbl_rb_ch_t_default_green_grey_mod">' + title + '</span>' +
						'</label>' +
					'</li>');
	}

}

function multiselectclick_f(el, selector){
	var $this = $(el),
		parent = $this.closest('.add_info_form_w').find('.category_block'),
		parent_title = parent.attr('data-title'),
		headline,
		temp_category_wrap;


	var array_of_checked_category = selector.multiselect("getChecked").map(function () {
		return this;
	}).get();

	parent.empty();
	console.log(parent_title);

	if (array_of_checked_category.length == 0) {
		parent.empty();
	}
	else {
		for (var i = 0; i < array_of_checked_category.length; i++) {
			var attr_val = array_of_checked_category[i].attributes[0].value;
			if (attr_val == 'undefined'){
				if (parent_title != 'undefined' && parent_title != undefined) {
					attr_val = 'Selected ' + parent_title;
					console.log(parent_title);
				}
				else{
					attr_val = 'Selected Categories'
				}
			}
			if (parent_title == 'undefined') {
				parent_title = 'Category'
			}


			var temp_headline = attr_val;
			temp_headline = temp_headline.replace(/\s/g, '_').replace(/[.,:;(){}/?!@#$%&*]/g, '');
			if (headline != temp_headline) {
				headline = temp_headline;
				parent.append('' +
				'<div class="category_wrap">' +
				'<h2 class="category_hline">' + attr_val + '</h2>' +
				'<ul class="category_list ' + headline + '"></ul>' +
				'</div>');
				temp_category_wrap = $('.category_list.' + headline, parent);
				category_list_item(temp_category_wrap, array_of_checked_category[i].title, array_of_checked_category[i].value, $this.attr('id'), parent_title);
			}
			else {

				category_list_item(temp_category_wrap, array_of_checked_category[i].title, array_of_checked_category[i].value, $this.attr('id'), parent_title);
			}
			//console.log(array_of_checked_category[i], $this.attr('id'), parent_title);

		}
	}
}


function messages_center_f() {
	messages_center.autocomplete_el = $("#Enter_name_of_user");
	messages_center.compose_msg_butt = $('.compose_msg_butt');
	messages_center.add_msg_block = $('.add_msg_block');

	body_var.on('click','.compose_msg_butt', function () {
		var $this = $(this);
		if ($this.hasClass('active_mod')) {
			$('.add_msg_block').slideUp(400);
			$this.removeClass('active_mod');
		}
		else {
			$('.add_msg_block').slideDown(400);
			$this.addClass('active_mod');
		}
		return false;
	});

	$(".section_menu_link.click_mod").on('click', function () {
		var $this = $(this);
		if ($this.hasClass('active_mod')) {
			$this.removeClass('active_mod');
		}
		else {
			$this.addClass('active_mod');
		}
		return false;
	});

	messages_center.create_group_popup = new dialog('#create_new_group', 'dialog_v1 create_new_group_dialog no_close_mod dialog_color_schema_1_mod dialog_g_size_1', '.create_new_group_butt', false, '510', false);


	invite_auto(messages_center.autocomplete_el);

	infinitescroll_msg();
}

function invite_auto(element){
	element.autocomplete({
		minLength: 0,
		position: {my: "left top", at: "left bottom+1"},
		source: invite_array,
		focus: function (event, ui) {
			if (body_var.hasClass('develop_mod')) {
				console.log(ui, event, this);
			}
		}
	}).autocomplete("instance")._renderItem = function (ul, item) {
		var test;
		if (item.value == "button") {
			test = $("<li>")
					.append("<div class='" + item.class_mod + "'>" + item.text + "</div>")
					.appendTo(ul);
		}
		else {
			test = $("<li class='users_l_item added_mod'>")
					.append("<div class='user_block section_menu_mod'>" +
					"<div class='user_avatar_w section_menu_mod'>" +
					"<img src='i/" + item.icon + "' class='user_avatar_img section_menu_mod'>" +
					"</div>" +
					"<div class='user_name section_menu_mod'>" + item.name + "</div>" +
					"</div>")
					.appendTo(ul);
		}

		if (body_var.hasClass('develop_mod')) {
			console.log(test);
		}
		return test;
	};

	element.on('focus', function () { $(this).autocomplete("search", ""); });
}

function infinitescroll_msg() {
	var test_counter = 0;
	var $container = $('.msg_list_wrap');

	var array = [
		{
			'view': 1,
			'msg_time': '3 Min Ago',
			'msg_content': 'Updated inventory to 30 tomatoes',
			'user_block_msg_sender': {
				'class_mod': 'msg_vendor_mod',
				'ava': 'vendor_ava.jpg',
				'name': 'CocaCola',
				'msg_form': 'Updated Tomatoes'
			},
			'user_block_msg_send': {
				'class_mod': 'msg_comment_mod',
				'ava': 'ava_47.jpg'
			}
		},
		{
			'view': 2,
			'msg_time': '3 Min Ago',
			'msg_content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labo et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essy.',

			'user_block_msg_sender': {
				'class_mod': 'msg_mod',
				'ava': 'ava_47.jpg',
				'name': 'Michael Abehsera',
				'msg_form': 'sent you a private message'
			},
			'user_block_msg_send': {
				'class_mod': 'msg_comment_mod',
				'ava': 'ava_47.jpg'
			}
		},
		{
			'view': 3,
			'msg_time': '3 Min Ago',
			'msg_content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labo et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essy.',

			'user_block_msg_sender': {
				'class_mod': 'msg_group_mod',
				'ava': ['ava_47.jpg', 'ava_47.jpg', 'ava_47.jpg'],
				'name': 'Michael Abehsera',
				'msg_form': 'sent a message to “Group Name”'
			},
			'user_block_msg_send': {
				'class_mod': 'msg_comment_mod',
				'ava': 'ava_47.jpg'
			}
		},
		{
			'view': 3,
			'msg_time': '3 Min Ago',
			'msg_content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labo et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essy.',

			'user_block_msg_sender': {
				'class_mod': 'msg_group_mod',
				'ava': ['ava_47.jpg', 'ava_47.jpg', 'ava_47.jpg'],
				'name': 'Michael Abehsera',
				'msg_form': 'sent a message to “Group Name”'
			},
			'user_block_msg_send': {
				'class_mod': 'msg_comment_mod',
				'ava': 'ava_47.jpg'
			}
		},
		{
			'view': 3,
			'msg_time': '3 Min Ago',
			'msg_content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labo et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essy.',

			'user_block_msg_sender': {
				'class_mod': 'msg_group_mod',
				'ava': ['ava_47.jpg', 'ava_47.jpg', 'ava_47.jpg'],
				'name': 'Michael Abehsera',
				'msg_form': 'sent a message to “Group Name”'
			},
			'user_block_msg_send': {
				'class_mod': 'msg_comment_mod',
				'ava': 'ava_47.jpg'
			}
		}
		,
		{
			'view': 3,
			'msg_time': '3 Min Ago',
			'msg_content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labo et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essy.',

			'user_block_msg_sender': {
				'class_mod': 'msg_group_mod',
				'ava': ['ava_47.jpg', 'ava_47.jpg', 'ava_47.jpg'],
				'name': 'Michael Abehsera',
				'msg_form': 'sent a message to “Group Name”'
			},
			'user_block_msg_send': {
				'class_mod': 'msg_comment_mod',
				'ava': 'ava_47.jpg'
			}
		}
	];

	$(document).endlessScroll({
		bottomPixels: 500,
		fireOnce: false,
		fireDelay: 10,
		callback: function (i) {
			//if(i < array.length){
				clone_msg($container, array[i]);
				//test_counter++;
				console.log(i, test_counter, array.length);
			//}
		}
	});

   //$('#images').endlessScroll({
	//   pagesToKeep: 5,
	//   inflowPixels: 100,
	//   fireDelay: 10,
	//   content: function (i, p, d) {
	//	   console.log(i, p, d)
	//	   return images.eq(Math.floor(Math.random() * 8))[0].outerHTML;
	//   }
   //});
}

function clone_msg(el, array) {
	console.log(array);
	if(array.view == 1){
		el.append('' +
		'<article class="msg_block">' +
			'<header class="msg_header">' +
				'<div class="user_block '+ array.user_block_msg_sender.class_mod +'">' +
					'<div class="user_avatar_w '+ array.user_block_msg_sender.class_mod +'">' +
						'<img src="i/'+ array.user_block_msg_sender.ava +'" alt="'+ array.user_block_msg_sender.name +'" class="user_avatar_img '+ array.user_block_msg_sender.class_mod +'"/>' +
					'</div>' +
					'<div class="user_name '+ array.user_block_msg_sender.class_mod +'">'+ array.user_block_msg_sender.name +' '+ array.user_block_msg_sender.msg_form +'</div>' +
				'</div>' +
				'<div class="msg_time">'+array.msg_time+'</div>' +
			'</header>' +
			'<div class="msg_content">'+ array.msg_content + '</div>' +
			'<footer class="msg_footer">' +
				'<div class="msg_comment_form">' +
					'<div class="user_block '+ array.user_block_msg_send.class_mod +'">' +
						'<div class="user_avatar_w '+ array.user_block_msg_send.class_mod +'">' +
							'<img src="i/'+ array.user_block_msg_send.ava +'" class="user_avatar_img '+ array.user_block_msg_send.class_mod +'"/>' +
						'</div>' +
					'</div>' +
					'<dl class="form_cell form_cell_v1_mod">' +
						'<dt class="form_c_hline form_v1_mod hline_hide_mod">' +
							'<label for="Add_a_comment">Add a comment...</label>' +
						'</dt>' +
						'<dd class="form_c_f_w form_v1_mod hline_hide_mod">' +
							'<input type="text" id="Add_a_comment" placeholder="Add a comment..." class="f_c_field default_mod comment_mod "/>' +
						'</dd>' +
					'</dl>' +
					'<div class="butt_wrap msg_comment_mod">' +
						'<div class="attach_butt">Add attachment</div>'+
						'<div class="butt_comment_send">Send</div>' +
					'</div>' +
				'</div>' +
			'</footer>' +
		'</article>');
	}
	else if (array.view == 2){
		el.append('' +
		'<article class="msg_block">' +
			'<header class="msg_header">' +
				'<div class="user_block '+ array.user_block_msg_sender.class_mod +'">' +
					'<div class="user_avatar_w '+ array.user_block_msg_sender.class_mod +'">' +
						'<img src="i/'+ array.user_block_msg_sender.ava +'" alt="'+ array.user_block_msg_sender.name +'" class="user_avatar_img '+ array.user_block_msg_sender.class_mod +'"/>' +
					'</div>' +
					'<div class="user_name '+ array.user_block_msg_sender.class_mod +'">'+ array.user_block_msg_sender.name +' '+ array.user_block_msg_sender.msg_form +'</div>' +
				'</div>' +
				'<div class="msg_time">'+array.msg_time+'</div>' +
			'</header>' +
			'<div class="msg_content">'+ array.msg_content + '</div>' +
			'<footer class="msg_footer">' +
				'<div class="msg_comment_form">' +
					'<div class="user_block '+ array.user_block_msg_send.class_mod +'">' +
						'<div class="user_avatar_w '+ array.user_block_msg_send.class_mod +'">' +
							'<img src="i/'+ array.user_block_msg_send.ava +'" class="user_avatar_img '+ array.user_block_msg_send.class_mod +'"/>' +
						'</div>' +
					'</div>' +
					'<dl class="form_cell form_cell_v1_mod">' +
						'<dt class="form_c_hline form_v1_mod hline_hide_mod">' +
							'<label for="Add_a_comment">Add a comment...</label>' +
						'</dt>' +
						'<dd class="form_c_f_w form_v1_mod hline_hide_mod">' +
							'<input type="text" id="Add_a_comment" placeholder="Add a comment..." class="f_c_field default_mod comment_mod "/>' +
						'</dd>' +
					'</dl>' +
					'<div class="butt_wrap msg_comment_mod">' +
						'<div class="attach_butt">Add attachment</div>'+
						'<div class="butt_comment_send">Send</div>' +
					'</div>' +
				'</div>' +
			'</footer>' +
		'</article>');
	}
	else if (array.view == 3){
		el.append('' +
		'<article class="msg_block">' +
			'<header class="msg_header">' +
				'<div class="user_block '+ array.user_block_msg_sender.class_mod +'">' +
					'<div class="user_avatar_w '+ array.user_block_msg_sender.class_mod +'">' +
						'<img src="i/'+ array.user_block_msg_sender.ava +'" alt="'+ array.user_block_msg_sender.name +'" class="user_avatar_img '+ array.user_block_msg_sender.class_mod +'"/>' +
					'</div>' +
					'<div class="user_name '+ array.user_block_msg_sender.class_mod +'">'+ array.user_block_msg_sender.name +' '+ array.user_block_msg_sender.msg_form +'</div>' +
				'</div>' +
				'<div class="msg_time">'+array.msg_time+'</div>' +
			'</header>' +
			'<div class="msg_content">'+ array.msg_content + '</div>' +
			'<footer class="msg_footer">' +
				'<div class="msg_comment_form">' +
					'<div class="user_block '+ array.user_block_msg_send.class_mod +'">' +
						'<div class="user_avatar_w '+ array.user_block_msg_send.class_mod +'">' +
							'<img src="i/'+ array.user_block_msg_send.ava +'" class="user_avatar_img '+ array.user_block_msg_send.class_mod +'"/>' +
						'</div>' +
					'</div>' +
					'<dl class="form_cell form_cell_v1_mod">' +
						'<dt class="form_c_hline form_v1_mod hline_hide_mod">' +
							'<label for="Add_a_comment">Add a comment...</label>' +
						'</dt>' +
						'<dd class="form_c_f_w form_v1_mod hline_hide_mod">' +
							'<input type="text" id="Add_a_comment" placeholder="Add a comment..." class="f_c_field default_mod comment_mod "/>' +
						'</dd>' +
					'</dl>' +
					'<div class="butt_wrap msg_comment_mod">' +
						'<div class="butt_comment_send">Send</div>' +
						'<div class="attach_butt">Add attachment</div>'+
					'</div>' +
				'</div>' +
			'</footer>' +
		'</article>');
	}
}

function about_page_f() {


	$('.b_block_close_butt').on('click', function () {
		var $this = $(this),
				parent = $this.closest('.video_back_block');

		parent.addClass('hide_state');
		setTimeout(function () {
			parent.remove();
		}, 350);
	});


}

function map_page_f() {
	map_page_array = {
		map_filter: '',
		map_el_popup: ''
	};

	map_page_array.map_el_popup = $('.map_el_popup');

	map_page_array.map_filter = new dialog('#map_filter', 'dialog_v1 map_filter_dialog no_title_mod no_close_mod dialog_color_schema_1_mod dialog_g_size_1', '.filter_map_butt', 'active_mod', '430', false);


	$('.map_el_message_butt').on('click', function () {
		var $this = $(this);
		if ($this.hasClass('active_mod')) {
			$this.removeClass('active_mod');
			$('.send_msg_block').removeClass('active_mod');
		} else {
			$this.addClass('active_mod');
			$('.send_msg_block').addClass('active_mod');
		}
	})

}

function map_view() {

	//var coords_Lat = 40.417181;
	//var coords_Lng = -84.700823;


	var mapOptions = {
		zoom: 6,
		center: new google.maps.LatLng(locations_array[3].coords_Lat, locations_array[3].coords_Lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	};

	myMap = new google.maps.Map(document.getElementById('main_map'), mapOptions);

	//var marker = new MarkerWithLabel({
	//  position: myMap.getCenter(),
	//  icon: {
	//    path: google.maps.SymbolPath.CIRCLE,
	//    scale: 0 //tamaño 0
	//  },
	//  map: myMap,
	//  draggable: true,
	//  labelAnchor: new google.maps.Point(10, 10),
	//  labelClass: "map_label"// the CSS class for the label
	//});

	var locations = [
		['loan 1', locations_array[0].coords_Lat, locations_array[0].coords_Lng, 'address 1', 'map_label_one'],
		['loan 2',locations_array[1].coords_Lat, locations_array[1].coords_Lng, 'address 2', 'map_label_two'],
		['loan 3', locations_array[2].coords_Lat, locations_array[2].coords_Lng, 'address 3', 'map_label_three'],
		['loan 4', locations_array[3].coords_Lat, locations_array[3].coords_Lng, 'address 4', 'map_label_one'],
		['loan 5', locations_array[4].coords_Lat, locations_array[4].coords_Lng, 'address 5', 'map_label_two']
	];

	setMarkers(myMap, locations);
	g_click();
	map_menu_click(myMap);

	google.maps.event.addListenerOnce(myMap, 'idle', function () {
		console.log('idle');

		$('.user_block.section_menu_mod.filer_mod').each(function () {
				var $this = $(this);
			marker_array.marker_menu_el.push($this);
		});
	});
}

function setMarkers(map, locations) {

	for (var i = 0; i < locations.length; i++) {


		var loan = locations[i][0];
		var lat = locations[i][1];
		var long = locations[i][2];
		var add = locations[i][3];
		var icon_class = locations[i][4];
		var ii = i + 1;

		var latlngset = new google.maps.LatLng(lat, long);

		var marker = new MarkerWithLabel({
			position: latlngset,
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 0 //tamaño 0
			},
			map: map,
			labelAnchor: new google.maps.Point(10, 10),
			labelClass: "map_label " + icon_class + " map_label_" + ii// the CSS class for the label
		});

		//var marker = new google.maps.Marker({
		//	map: map,
		//	title: loan,
		//	position: latlngset
		//});
		map.setCenter(marker.getPosition());
		marker_array.marker_el.push(marker);

	}
}

function pan_to(locations_Lat, locations_Lng){
	//myMap.panTo(new GLatLng(locations_Lat, locations_Lng));
	myMap.panTo({lat: locations_Lat, lng: locations_Lng});
}



function map_menu_click() {
	var index;
	marker_array.filer_menu = $('.user_block.section_menu_mod.filer_mod');

	marker_array.filer_menu.on('click', function () {
		var $this = $(this);
		if (!$this.hasClass('map_cliked')) {
			//marker_array.filer_menu.removeClass('map_cliked');

			index = $this.parent().index();
			google.maps.event.trigger(marker_array.marker_el[index], 'click');
		}
		else {

		}

	});
}

function g_click() {
	for (var i = 0; i < marker_array.marker_el.length; i++) {
		google.maps.event.addListener(marker_array.marker_el[i], 'click', function () {
			var el = parseInt(this.labelClass.split(/([0-9])/i)[1]);

			//var pos_top = this.label.eventDiv_.offsetTop;
			//var pos_left = this.label.eventDiv_.offsetLeft;

			//console.log(this.label.eventDiv_.offsetLeft, this.label.eventDiv_.offsetTop);
			if (el != map_popup_el) {
				shift('show', el);
			}
			else {
				shift('close', el);
			}

		});
	}

	//google.maps.event.addListener(myMap, 'dragend', function () {
	//	console.log('dragend');
	//	map_popup_move = false;
	//});
	//google.maps.event.addListener(myMap, 'dragstart', function () {
	//	map_popup_move = true;
	//	console.log('dragstart');
	//});
	//google.maps.event.addListener(myMap, 'mousemove', function (evt) {
	//	if (!map_popup_move) {
	//		map_top_shift_permanent = evt.pixel.y;
	//		map_left_shift_permanent = evt.pixel.x;
	//	} else {
	//		//console.log('mousemove', map_left_shift, map_top_shift, map_left_shift_permanent, map_top_shift_permanent);
	//		//map_top_shift = map_top_shift + evt.pixel.y - map_top_shift_permanent;
	//		//map_left_shift = map_left_shift + evt.pixel.x - map_left_shift_permanent;
	//		//console.log('mousemove', map_left_shift, map_top_shift);
	//	}
	//});
	google.maps.event.addListener(myMap, 'click', function (evt) {
		//console.log('click', evt.pixel);
		if (map_popup_flag) {
			shift('close', map_popup_el);
		}
	});
}

function shift(stage, el) {
	var element = marker_array.marker_el[el - 1],
		//pos_left = element.label.eventDiv_.offsetLeft + map_left_shift,
		//pos_top = element.label.eventDiv_.offsetTop + map_top_shift,
		top = Math.round((global_window_Height - 66) / 2 + 30),
		left = Math.round((global_window_Width - 380) / 2 + 380 + 330);
		//top_2 = map_popup_top + 66 + marker_array.top_difference,
		//left_2 = map_popup_left + 330 + 380 + marker_array.left_difference;


	//console.log('offsetLeft ',element.label.eventDiv_.offsetLeft,'offsetTop ',element.label.eventDiv_.offsetTop, 'pos_left ',pos_left, 'pos_top ',pos_top, stage, 'map_left_shift ',map_left_shift, 'map_top_shift ' ,map_top_shift, 'marker_pos_top ' ,marker_array.marker_pos_top, 'marker_pos_left ',marker_array.marker_pos_left);

	if (stage == 'show' && el != map_popup_el) {
		if (!map_popup_flag) {
			pan_to(locations_array[el-1].coords_Lat,locations_array[el-1].coords_Lng);

			body_var.addClass('map_popup_open');

			map_page_array.map_el_popup.snabbt({
				fromPosition: [left, top, 0],
				position: [left + 40, top, 0],
				fromOpacity: 0,
				opacity: 1,
				easing: 'easeOut',
				duration: 330,
				delay: 350,
				callback: function () {
					map_popup_el = el;
					map_popup_past_el = el - 1;
					map_popup_flag = true;
					myMap.set('draggable', false);

					marker_array.marker_menu_el[el-1].addClass('map_cliked');
				}
			});
		}
		else {
			map_page_array.map_el_popup.snabbt({
				fromPosition: [left + 40, top, 0],
				position: [left, top, 0],
				fromOpacity: 1,
				opacity: 0,
				easing: 'easeIn',
				duration: 165,
				callback: function () {
					pan_to(locations_array[el-1].coords_Lat,locations_array[el-1].coords_Lng);
					marker_array.marker_menu_el[map_popup_past_el].removeClass('map_cliked');
				}
			}).then({
				fromPosition: [left, top, 0],
				position: [left + 40, top, 0],
				fromOpacity: 0,
				opacity: 1,
				easing: 'easeOut',
				duration: 165,
				delay: 400,
				callback: function () {
					map_popup_el = el;
					marker_array.marker_menu_el[el-1].addClass('map_cliked');
					map_popup_past_el = el - 1;
				}
			});

		}
	} else if (stage == 'close' && el == map_popup_el) {

		map_page_array.map_el_popup.snabbt({
			fromPosition: [left + 40, top, 0],
			position: [left, top, 0],
			fromOpacity: 1,
			opacity: 0,
			easing: 'easeOut',
			duration: 330,
			callback: function () {
				map_popup_el = false;
				map_popup_flag = false;
				myMap.set('draggable', true);
				body_var.removeClass('map_popup_open');
				marker_array.marker_menu_el[el-1].removeClass('map_cliked');
				console.log(el-1)
			}
		})
	}

}


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


