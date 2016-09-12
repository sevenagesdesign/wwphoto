$(function () {
	"use strict";
	
	var imgSelector = [];
	$('input[name="imgselect"]').click(function () {
		set_max(select_max);
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
	
	// Toggles active class on packages
	
	$('.collection input[type="checkbox"]').click(function () {
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
		
		$('input[name="imgselect"]').on('change', function (evt) {
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
	
	$('.collection').click(function () {
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
		if($(this).val() === '4x6 Print') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="35">$35</span>');
		} else if($(this).val() === '5x7 Print') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="35">$35</span>');
		} else if($(this).val() === '8x10 Print') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="35">$35</span>');
		} else if($(this).val() === '8x12 Panoramic') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="40">$40</span>');
		} else if($(this).val() === 'Single Digital Image File') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="120">$120</span>');
		} else if($(this).val() === 'Set of 3 Digital Image Files') {
			$(this).parents('td').siblings().find('.alcprice').html('<span value="300">$300</span>');
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
	
	function get_totals() {
		var subtotal = package_totals() + alacarte_totals(),
			tax = subtotal * 0.0675,
			total = subtotal + tax;
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