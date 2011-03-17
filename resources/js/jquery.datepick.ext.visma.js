/* http://keith-wood.name/datepick.html
   Datepicker extensions for jQuery v4.0.4.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2009.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) {

    var vismaThemeRenderer = {
        picker: '<div{popup:start} id="vismaDatePickerDiv"{popup:end} class="vismaDatePicker ' +
        'ui-helper-clearfix{inline:start} ui-datepicker-inline{inline:end}">' +
        '{months}' +
        '</div>',
        monthRow: '{months}',
        month: '<div class="vismaDatePickerHeader ui-helper-clearfix">{link:prev}{monthHeader:MM yyyy}{link:next}</div>' +
        '<div class="vismaDatePickerCalendar"><table class="vismaDatePickerCalendar"><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table>' +
	   '<div class="vismaDatePickerFooter ui-helper-clearfix">{link:today}</div></div>',
        weekHeader: '<tr><th class="vismaDatePickerWeek"><span></span></th>{days}</tr>',
        dayHeader: '<th>{day}</th>',
        week: '<tr><td class="vismaDatePickerWeek">{weekOfYear}</td>{days}</tr>',
        day: '<td>{day}</td>',
        monthSelector: '.ui-datepicker-group',
        daySelector: 'td',
        rtlClass: 'ui-datepicker-rtl',
        multiClass: 'ui-datepicker-multi',
        defaultClass: 'vismaDatePickerDays',
        selectedClass: 'vismaDatePickerActive',
        highlightedClass: 'vismaDatePickerHover',
        todayClass: 'vismaDatePickerHighlight',
        otherMonthClass: 'vismaDatePickerOtherMonth',
        weekendClass: 'vismaDatePickerWeekend',
        commandClass: 'vismaDatePickerCmd',
        commandButtonClass: 'vismaDatePickerBtn',
        commandLinkClass: '',
        disabledClass: 'vismaDatePickerDisabled'
    };

    $.extend($.datepick, {
        // visma theme template for generating a datepicker.
        vismaThemeRenderer: vismaThemeRenderer
    });

})(jQuery);
