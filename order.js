$(document).ready(function () {
	"use strict";

	// Load Typekit
	try{Typekit.load({ async: true });}catch(e){}

	var totalAvailable = 130; // Set total number of album images available
	var setCouponCode = "couponcode200"; // Sets the coupon code
	var setCouponDiscount = 200; // Sets amount coupon takes off order


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
		order_list();
	});

	// Create Photo Select Checkboxes

	$('#photoselect').append(function() {
		for (var i = 1; i <= totalAvailable; i++) {
    		$(this).append('<div class="ck-button"><label><input id="img' + i + '" name="imgselect" type="checkbox" value="' + i + '"><span>' + i + '</span></input></label></div>');
		}
	});

	// Toggles active class on packages
	$('.collection').on('change', 'input[type="checkbox"]', function () {
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
		updatePrices();
	});

	$('.collection input[type="checkbox"]').click(function(){
		clearSelected();
	});

	function clearSelected() {
		$('#selected').text('0');
	}

	var price_4x6,
		price_5x7,
		price_8x10,
		price_8x12,
		price_sdif,
		price_3dif;

	function updatePrices(){
		if ($('.collection').hasClass('active')) {
		// Set prices for A La Carte if Collection is selected

			price_4x6 =		20;	// Price for 4x6 Print
			price_5x7 =		20; // Price for 5x7 Print
			price_8x10 =	30; // Price for 8x10 Print
			price_8x12 = 	35; // Price for 8x12 Panoramic
			price_sdif =	80; // Price for Single Digital Image File
			price_3dif =	200; // Price for Set of 3 Digital Image Files
		} else {
		// Set prices for A La Carte if NO Collection is selected

			price_4x6 =		35;	// Price for 4x6 Print
			price_5x7 =		35; // Price for 5x7 Print
			price_8x10 =	35; // Price for 8x10 Print
			price_8x12 = 	40; // Price for 8x12 Panoramic
			price_sdif =	120; // Price for Single Digital Image File
			price_3dif =	300; // Price for Set of 3 Digital Image Files
		}
		printPrices();

	}

	function printPrices(){

		$('.alcsize').each(function(){

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

		alcSelections();
	}
	
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
		} else if ($('.collection#gift').hasClass('active')) {
			select_max = 12;
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
			"<td># <input class='alcimg' type='text'></td>" +
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
			"<td>Qty. <input class='alcqty' type='number' min='0'></td>" +
			"<td><span class='alcprice'></span></td>" +
			"<td><span class='alctotal'></span></td>" +
			"<td class='removealc'><i class='fa fa-minus-circle' style='color: red'></i></td>" +
			"</tr>"
		);
	});
	
	// Remove rows from A La Carte selection
	
	$('table').on('click', '.removealc', function () {
		$(this).parents('tr').find('.alcqty').val(0);
		$(this).parents('tr').remove();
		alcSelections();
	});

	/*
	 * Add A La Carte totals / row
	 */

	// Update on size change

	$('table').on('change', '.alcsize', function(events){
		updatePrices();
	});

	// Update on quantity change

	$('table').on('change', '.alcqty', function() {
		updatePrices();
	});

	$('table').on('change', '.alcimg', function() {
		updatePrices();
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
		} else if ($('.collection#gift').hasClass('active')) {
			$('.totalitem.package').html(
				'<tr>\n' +
				'<td class="left">Gift Print Collection</td>\n' +
				'<td class="right">$300.00</td>\n' +
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
		if ($('#couponcode').val() == setCouponCode && $('.collection').hasClass('active')) {
			coupon = setCouponDiscount;
			get_totals();
			$('#couponcode').val('Code successfully redeemed!');
			$('#couponcode').css({'background-color': '#5cb85c', 'width': '100%', 'text-align': 'center', 'border': '0', 'line-height': '26px', 'color': 'white', 'margin': '12px'});
			$('#couponcode').attr('disabled', 'disabled');
			$('#ordertotalinner').before('<tr style="width: 50%; margin: auto;"><td>Coupon</td><td id="coupondiscount" style="float: right;">' +
				'- $200.00</td></tr>');
			$('#addcoupon').remove();
			setTimeout(function(){
				$('#couponcode').fadeOut(1000);
				setTimeout(function(){
					$('#couponcontainer').remove();
				}, 1500);
			}, 2000);
		} else {
			$('#couponcode').css({'border-color': '#d9534f'});
			if ($('#couponcode').val != setCouponCode && $('.collection').hasClass('active')){
				$('#couponcode').attr('placeholder', 'Invalid code.');
			} else {
				$('#couponcode').attr('placeholder', 'Code not valid for this order.');
			}
			$('#couponcode').val(null);
			setTimeout(function(){
				$('#couponcode').css({'border-color': 'initial'});
				$('#couponcode').attr('placeholder', 'Priority Portrait code');
			}, 2000);
		}
	});
	
	function get_totals() {
		var alacarteSubtotal = alacarte_totals(),
			alacarteDiscount = .40 * alacarteSubtotal,
			alacarteTotal = ($('.collection').hasClass('active') ? alacarteSubtotal - alacarteDiscount : alacarteSubtotal),
			subtotal = package_totals() + alacarteTotal,
			tax = subtotal * 0.0675,
			total = subtotal + tax - coupon;
		$('#taxright').text("$" + tax.toFixed(2));
		$('#totalright').text("$" + total.toFixed(2));
	}

	function alcSelections() {

		var alctotalsfinal = alacarte_totals();
		if ($('.alcselection').length > 0) {
			$('.totalitem.alctotals').html(
				'<tr>\n' +
				'<td class="left">A La Carte Items</td>\n' +
				'<td class="right">$' + alctotalsfinal + '</td>\n' +
				'</tr>\n' +
				'<tr id="alcdata">\n' +
				'<td colspan="2">A La Carte Selections:</td>\n' +
				'</tr>\n' +
				'<tr class="alcdatatotal">\n' +
				'</tr>'
			);
		} else {
			$('.totalitem.alctotals').html('');
		}


		$('.alcselection').each(function(){
			var imagenum = $(this).find('.alcimg').val().toString(),
		    	imagesize = $(this).find('.alcsize').val().toString(),
		    	imgqty = ($(this).find('.alcqty').val().toString() == "" ? "0" : $(this).find('.alcqty').val().toString()),
		    	fullcost = $(this).find('.alctotal span').val().toString();

			$('.totalitem.alctotals').append(
				'<tr class="alcdatatotal">' +
				'<td style="float:left;">#' + imagenum + ' - ' + imagesize + ' (x' + imgqty + ')</td>' +
				'<td style="float:right;text-align:right;">$' + fullcost + '</td>' +
				'</tr>' +
				'\r\n'
			);

		});
	}
	
	$(window).change(function () {
		set_max();
		order_list();
		get_totals();
	});

	function sendEmail() {
		var collection = $('.totalitem.package'),
			alcpackage = $('.totalitem.alctotals'),
			dbt = $('input[name="debutante"]'),
			dbtNum = $('input[name="debNumber"]'),
			fName = $('input[name="firstName"]'),
			lName = $('input[name="lastName"]'),
			addr = $('input[name="streetAddress"]'),
			city = $('input[name="city"]'),
			state = $('input[name="state"]'),
			zip = $('input[name="zipcode"]'),
			p1 = $('input[name="phone1"]'),
			p2 = $('input[name="phone2"]'),
			p3 = $('input[name="phone3"]'),
			email = $('input[name="email"]'),
			totaltax = $('#taxright'),
			couponused = $('#coupondiscount'),
			totalcost = $('#totalright');

		$.ajax(
			{
				type: 'POST',
				url: 'sendmail.php',
				data: {
					collection: collection.html(),
					alc: alcpackage.html(),
					dbt: dbt.val(),
					dbtNum: dbtNum.val(),
					fName: fName.val(),
					lName: lName.val(),
					addr: addr.val(),
					city: city.val(),
					state: state.val(),
					zip: zip.val(),
					p1: p1.val(),
					p2: p2.val(),
					p3: p3.val(),
					email: email.val(),
					ship: $('input[name="shippickup"]').attr('data'),
					pay: $('input[name="payment"]:checked').attr('data'),
					tax: totaltax.text(),
					total: totalcost.text(),
					coupon: couponused.text()
				}
			}
		);
	}
	
	function validateCollection() {
		var success = true;

		$('.collection.active input[type="text"]').each(function(){
			if($(this).val() == "") {
				$(this).first().focus();
				$(this).css('border-color', '#d9534f');
				success = false;
			} else {
				$(this).css('border-color', 'initial');
			}
		});

		return success;
	}

	function validateContact() {
		var success = true;

		$('#contactinfo input[type="text"], #contactinfo input[type="email"]').each(function(){
			if($(this).val() == "") {
				$(this).focus();
				$(this).css('border-color', '#d9534f');
				success = false;
			} else {
				$(this).css('border-color', 'initial');
			}
		});

		return success;
	}

	$('#orderSubmit > button').click(function () {
		
		if (validateCollection() == false || validateContact() == false) {
			return false;
		} else {
			alert("An email will send on the live version.");
			// sendEmail();
		}
	});
});