$(function () {
    "use strict";
    /**
     * Toggles active class on packages
     */
    
	$('.collection').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
            $(this).siblings('.collection').removeClass('active');
        }
    });
    
    $('.collection:not(#no-album)').click(function(){
        if($(this).hasClass('active')) {
            $('.step#selection').slideDown('slow');
            $('.step#alacarte').slideUp('slow');
        } else {
            $('.step#selection').slideUp('slow');
        }
    });
    
    $('.collection#no-album').click(function(){
        if($(this).hasClass('active')) {
            $('.step#selection').slideUp('slow');
            $('.step#alacarte').slideDown('slow');
        } else {
            $('.step#alacarte').slideUp('slow');
        }
    });
    
    /**
     * Set maximum number of images/package
     */
    
    var select_max;
    
    function set_max() {
        
        if($('.collection#heirloom').hasClass('active')) {
            select_max = 50;
        } else if ($('.collection#signature').hasClass('active')) {
            select_max = 36;
        } else if($('.collection#keepsake').hasClass('active')) {
            select_max = 24;
        } else {
            select_max = 0;
        };
        
        $('input[name="imgselect"]').on('change', function(evt){
            if($('input[name="imgselect"]:checked').length > select_max) {
                this.checked = false;
                $('#selected').text(select_max);
            }
        });
        
        $('#selected').text($('input[name="imgselect"]:checked').length);
        $('.selectmax').text(select_max);
        
        return select_max;
    }
    
    $('.collection').click(function(){
        $('input[name="imgselect"]:checked').prop('checked', false);
    });
    
    /**
     * Set number of options in image dropdown
     */
    
    var max = 130, // Sets number of options
        option = [max],
        select = $(".options"),
        i = 0;
    for (i = 0; i < max; i = i + 1) {
        option[i] = document.createElement("OPTION");
        option[i].value = i + 1;
        option[i].text = i + 1;
        select.append(option[i]);
    }
    
    
    /**
     * Add rows to A La Carte selection
     */
    
    $('#alcmore').click(function(){
        $(this).before("<tr><td><input class='alcimg' type='text'></td><td><select class='alcsize'><option selected disabled>Select a Size</option><option disabled>---</option><option value='4x6 Print'>4x6 Print</option><option value='5x7 Print'>5x7 Print</option><option value='8x10 Print'>8x10 Print</option><option value='8x12 Panoramic'>8x12 Panoramic</option><option value='Single Digital Image File'>Single Digital Image File</option><option value='Set of 3 Digital Image Files'>Set of 3 Digital Image Files</option></select></td><td><input class='alcqty'></td><td><span class='alcprice'></span></td><td><span class='alctotal'></span></td><td class='removealc'><i class='fa fa-minus-circle' style='color: red'></i></td></tr>");
    });
    
    /**
     * Remove rows from A La Carte selection
     */
    
    $('table').on('click', '.removealc', function(events){
       $(this).parents('tr').remove();
    });
    
    /**
     * Get totals from sections
     */
    
    function package_totals() {
        
        if($('.collection#heirloom').hasClass('active')) {
            return 1245;
        } else if($('.collection#signature').hasClass('active')) {
            return 955;
        } else if ($('.collection#keepsake').hasClass('active')) {
            return 695;
        } else if ($('.collection#gift').hasClass('active')) {
            return 300;
        } else {
            return 0;
        }
        
        //return packagetotal;
    }
    
    function alacarte_totals() {
        return 0;
        
        //return alacartetotal
    }
    
    function get_totals() {
        var subtotal = package_totals() + alacarte_totals();
        var tax = subtotal * .065;
        var total = subtotal + tax;
        $('#taxright').text("$" + tax.toFixed(2));
        $('#totalright').text("$" + total.toFixed(2));
    }
    
    $(window).click(function () {
        set_max();
        get_totals();
    });
});