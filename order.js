$(function () {
	"use strict";

	var totalAvailable = 130; // Set total number of album images available


	// Firefox bug workaround

	$('input[type="checkbox"]').prop('checked', false);
	$('input').val('');
	$('input').attr('disabled', false);

	var imgSelector = [];
	$('#photoselect').on('click', 'input[name="imgselect"]', function () {
		set_max();
		var maximum = select_max;
		if($(this).prop('checked')){
			if(imgSelector.length < maximum) {
				imgSelector.push($(this).val());
			} else {
				return false;
			}
		} else {
			var index = imgSelector.indexOf($(this).val());
			imgSelector.splice(index, 1);  
		}
	});

	// Create Photo Select Checkboxes

	$('#photoselect').append(function() {
		for (var i = 1; i <= totalAvailable; i++) {
    		$(this).append('<div class="ck-button"><label><input id="img' + i + '" name="imgselect" type="checkbox" value="' + i + '"><span>' + i + '</span></input></label></div>');
		}
	});

	// Prepare coupon code

	$('#couponcode').css('width', 'calc(100% - ' + $('#addcoupon').outerWidth() * 1.75 + 'px)');

	


	// Toggles active class on packages
	
	$('.collection').on('click', 'input[type="checkbox"]', function () {
		if ($(this).parents('.collection').hasClass('active')) {
			$(this).parents('.collection').removeClass('active');
			$('.step#selection').slideUp();
			$('.step#alacarte').slideDown();
		} else {
			$(this).parents('.collection').addClass('active');
			$(this).parents('.collection').siblings('.collection').removeClass('active');
			$(this).parents('.collection').siblings('.collection').find('.collectionselector').prop('checked', false);
			$('#openalc').show();
			$('.step#selection').slideDown();
			$('.step#alacarte').slideUp();
			imgSelector = [];
		}
	});
	
	$('#openalc').click(function () {
		$('.step#alacarte').slideDown();
		$(this).hide();
	});
	
	var select_max,
		max = 130, // Sets number of options
		option = [max],
		select = $(".options"),
		i = 0;
	
	function set_max() {
		
		if ($('.collection#heirloom').hasClass('active')) {
			select_max = 50;
		} else if ($('.collection#signature').hasClass('active')) {
			select_max = 36;
		} else if ($('.collection#keepsake').hasClass('active')) {
			select_max = 24;
		} else {
			select_max = 0;
		}
		
		$('input[name="imgselect"]').on('change', function () {
			if ($('input[name="imgselect"]:checked').length > select_max) {
				this.checked = false;
				$('#selected').text(select_max);
			}
		});
		
		$('#selected').text($('input[name="imgselect"]:checked').length);
		$('.selectmax').text(select_max);
		
		return select_max;
	}
	
	// Get images from selector
	
	$('.collection').on('click', 'input[type="checkbox"]', function () {
		$('input[name="imgselect"]:checked').prop('checked', false);
	});
	
	// Set number of options in image dropdown

	for (i = 0; i < max; i = i + 1) {
		option[i] = document.createElement("OPTION");
		option[i].value = i + 1;
		option[i].text = i + 1;
		select.append(option[i]);
	}
	
	// Add rows to A La Carte selection
	
	$('#alcmore button').click(function () {
		$(this).parents('#alcmore').before(
			"<tr class='alcselection'>" +
			"<td><input class='alcimg' type='text'></td>" +
			"<td><select class='alcsize'>" +
			"<option selected disabled>Select a Size</option>" +
			"<option disabled>---</option>" +
			"<option value='4x6 Print'>4x6 Print</option>" +
			"<option value='5x7 Print'>5x7 Print</option>" +
			"<option value='8x10 Print'>8x10 Print</option>" +
			"<option value='8x12 Panoramic'>8x12 Panoramic</option>" +
			"<option value='Single Digital Image File'>Single Digital Image File</option>" +
			"<option value='Set of 3 Digital Image Files'>Set of 3 Digital Image Files</option>" +
			"</select></td>" +
			"<td><input class='alcqty' type='number' min='0'></td>" +
			"<td><span class='alcprice'></span></td>" +
			"<td><span class='alctotal'></span></td>" +
			"<td class='removealc'><i class='fa fa-minus-circle' style='color: red'></i></td>" +
			"</tr>"
		);
	});
	
	// Remove rows from A La Carte selection
	
	$('table').on('click', '.removealc', function (events) {
		$(this).parents('tr').remove();
	});

	/*
	 * Add A La Carte totals / row
	 */

	// Update on size change

	$('table').on('change', '.alcsize', function(events){
		if ($('.collection').hasClass('active')) {
		// Set prices for A La Carte if Collection is selected

		var price_4x6 =		20,	// Price for 4x6 Print
			price_5x7 =		20, // Price for 5x7 Print
			price_8x10 =	30, // Price for 8x10 Print
			price_8x12 = 	35, // Price for 8x12 Panoramic
			price_sdif =	80, // Price for Single Digital Image File
			price_3dif =	200 // Price for Set of 3 Digital Image Files
		} else {
		// Set prices for A La Carte if NO Collection is selected

		var price_4x6 =		35,	// Price for 4x6 Print
			price_5x7 =		35, // Price for 5x7 Print
			price_8x10 =	35, // Price for 8x10 Print
			price_8x12 = 	40, // Price for 8x12 Panoramic
			price_sdif =	120, // Price for Single Digital Image File
			price_3dif =	300 // Price for Set of 3 Digital Image Files
		}

		if($(this).val() === '4x6 Print') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="' + price_4x6 + '">$' + price_4x6 +'</span>');
		} else if($(this).val() === '5x7 Print') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="' + price_5x7 + '">$' + price_5x7 + '</span>');
		} else if($(this).val() === '8x10 Print') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="' + price_8x10 + '">$' + price_8x10 + '</span>');
		} else if($(this).val() === '8x12 Panoramic') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="' + price_8x12 + '">$' + price_8x12 + '</span>');
		} else if($(this).val() === 'Single Digital Image File') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="' + price_sdif + '">$' + price_sdif + '</span>');
		} else if($(this).val() === 'Set of 3 Digital Image Files') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="' + price_3dif + '">$' + price_3dif +'</span>');
		} else {
			return false;
		}

		$(this).parents('td').siblings().find('.alctotal').html('<span>$' + $(this).parents('td').siblings().find('.alcqty').val() * $(this).parents('td').siblings().find('.alcprice > span').attr('value') + '</span>' );
		$(this).parents('td').siblings().find('.alctotal span').val($(this).parents('td').siblings().find('.alcqty').val() * $(this).parents('td').siblings().find('.alcprice > span').attr('value'));
	});

	// Update on quantity change

	$('table').on('change', '.alcqty', function(events) {
		$(this).parents('td').siblings().find('.alctotal').html('<span>$' + $(this).val() * $(this).parents('td').siblings().find('.alcprice > span').attr('value') + '</span>' );
		$(this).parents('td').siblings().find('.alctotal span').val($(this).val() * $(this).parents('td').siblings().find('.alcprice > span').attr('value'));
	});

	// Get totals from sections
	
	function package_totals() {
		
		if ($('.collection#heirloom').hasClass('active')) {
			return 1245;
		} else if ($('.collection#signature').hasClass('active')) {
			return 955;
		} else if ($('.collection#keepsake').hasClass('active')) {
			return 695;
		} else if ($('.collection#gift').hasClass('active')) {
			return 300;
		} else {
			return 0;
		}
	}

	
	function alacarte_totals() {
		var alctotalsfinal = 0;
		$('.alctotal span').each(function(){
			alctotalsfinal += parseInt($(this).val());
			return alctotalsfinal;
		});
		if (alctotalsfinal > 0) {
			$('.totalitem.alctotals').html(
				'<tr>\n' +
				'<td class="left">A La Carte Items</td>\n' +
				'<td class="right">$' + alctotalsfinal + '</td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td colspan="2">A La Carte Selections:</td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td>Placeholder Text</td>\n' +
				'</tr>'
			);
		} else {
			$('.totalitem.alctotals').html('');
		}
		return alctotalsfinal;
		//return alacartetotal
	}

	function folioItems() {
		var items = [];
		$('.collection.active input[type="text"]').each(function(){
			items.push($(this).val().toString());
		});
		return items.join(', ');
	
	}
	
	function order_list() {
		if ($('.collection#heirloom').hasClass('active')) {
			$('.totalitem.package').html(
				'<tr>\n' +
				'<td class="left">Heirloom Collection</td>\n' +
				'<td class="right">$1245.00</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">8x10 Folio Prints Selected:</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">' + folioItems() + '</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">Album Images Selected:</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">' + imgSelector.sort(function (a, b) {return a - b; }).join(', ') + '</td>\n' +
				'</tr>'
			);
		} else if ($('.collection#signature').hasClass('active')) {
			$('.totalitem.package').html(
				'<tr>\n' +
				'<td class="left">Signature Collection</td>\n' +
				'<td class="right">$955.00</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">5x7 Folio Prints Selected:</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">' + folioItems() + '</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">Images Selected:</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">' + imgSelector.sort(function (a, b) {return a - b; }).join(', ') + '</td>\n' +
				'</tr>'
			);
		} else if ($('.collection#keepsake').hasClass('active')) {
			$('.totalitem.package').html(
				'<tr>\n' +
				'<td class="left">Keepsake Collection</td>\n' +
				'<td class="right">$695.00</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">5x7 Folio Prints Selected:</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">' + folioItems() + '</td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<tr class="form-hidden">' +
				'<td colspan="2">Images Selected:</td>\n' +
				'</tr>\n' +
				'<tr class="form-hidden">\n' +
				'<td colspan="2">' + imgSelector.sort(function (a, b) {return a - b; }).join(', ') + '</td>\n' +
				'</tr>'
			);
		} else {
			$('.totalitem.package').html('');
		}
	}

	var coupon = 0;

	$('#addcoupon').click(function(e){
		e.preventDefault();
		if ($('#couponcode').val() == "couponcode200") {
			coupon = 200;
			get_totals();
			$('#couponcode').val('Coupon successfully redeemed!');
			$('#couponcode').css({'background-color': '#5cb85c', 'width': '100%', 'text-align': 'center', 'border': '0', 'line-height': '26px', 'color': 'white', 'margin': '12px'});
			$('#couponcode').attr('disabled', 'disabled');
			$('#ordertotalinner').before('<tr style="width: 50%; margin: auto;"><td>Coupon</td><td style="float: right;">- $200.00</td></tr>');
			$('#addcoupon').remove();
			setTimeout(function(){
				$('#couponcode').fadeOut(1000);
				setTimeout(function(){
					$('#couponcontainer').remove();
				}, 1500);
			}, 2000);
		} else {
			$('#couponcode').css({'border-color': '#d9534f'});
			$('#couponcode').attr('placeholder', 'Invalid coupon code.');
			$('#couponcode').val(null);
			setTimeout(function(){
				$('#couponcode').css({'border-color': 'initial'});
				$('#couponcode').attr('placeholder', 'Coupon code');
			}, 2000);
		}
	});
	
	function get_totals() {
		var subtotal = package_totals() + alacarte_totals(),
			tax = subtotal * 0.0675,
			total = subtotal + tax - coupon;
		$('#taxright').text("$" + tax.toFixed(2));
		$('#totalright').text("$" + total.toFixed(2));
	}
	
	$(window).change(function () {
		set_max();
		order_list();
		get_totals();
	});
	
	var orderForm = $('#ordertotalmain');
	
	$('#orderSubmit > button').click(function () {
		$.ajax({
			type: 'POST',
			url: 'sendmail.php',
			data: { content: orderForm.html() }
		});
	});
});