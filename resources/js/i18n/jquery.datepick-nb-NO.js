/* http://keith-wood.name/datepick.html
   Norwegian localisation for jQuery Datepicker.
   Written by Naimdjon Takhirov (naimdjon@gmail.com). */
(function($) {
    $.datepick.regional['no'] = {
        clearText: 'Tøm',
        clearStatus: '',
        closeText: 'Lukk',
        closeStatus: '',
        prevText: '&laquo;Forrige',
        prevStatus: '',
        prevBigText: '&#x3c;&#x3c;',
        prevBigStatus: '',
        nextText: 'Neste&raquo;',
        nextStatus: '',
        nextBigText: '&#x3e;&#x3e;',
        nextBigStatus: '',
        currentText: 'I dag',
        currentStatus: '',
        monthNames: ['Januar','Februar','Mars','April','Mai','Juni',
        'Juli','August','September','Oktober','November','Desember'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Mai','Jun',
        'Jul','Aug','Sep','Okt','Nov','Des'],
        monthStatus: '',
        yearStatus: '',
        weekHeader: 'Uke',
        weekStatus: '',
        dayNamesShort: ['Søn','Man','Tir','Ons','Tor','Fre','Lør'],
        dayNames: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
        dayNamesMin: ['Sø','Ma','Ti','On','To','Fr','Lø'],
        dayStatus: 'DD',
        dateStatus: 'D, M d',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        initStatus: '',
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepick.setDefaults($.datepick.regional['no']);
})(jQuery);
