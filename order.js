$(function () {
    "use strict";
    /**
     * Toggles active class on packages
     */
    
	$('.collection').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
    
    /**
     * Set number of options in image dropdown
     */
    
    var option = [130], // Sets number of options
        select = $("#options"),
        i = 0;
    for (i = 0; i < 130; i++) {
        option[i] = document.createElement("OPTION");
        option[i].value = i + 1;
        option[i].text = i + 1;
        select.append(option[i]);
    }
    
    /**
     * Get totals from sections
     */
    $('input[name="imgselect"]').click(function () {
        
        var imgtotal = $('input[name="imgselect"]:checked').length * 5.25,
            imgtotalfixed = imgtotal.toFixed(2);
        
        if ($('#imgtotal').length === 0) {
            $('#ordertotal').before("<div class='total' id='imgtotal''>Selected Images (x" + $('input[name="imgselect"]:checked').length + ")</div>");
        } else {
            $('#imgtotal').text("Selected Images (x" + $('input[name="imgselect"]:checked').length + ")");
        }
        
        
        $('#totalright').text("$" + imgtotalfixed);
    });
});