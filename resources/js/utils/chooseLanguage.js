$(function() {
    var curentLanguage = "en-GB";

    $(":radio").click(function(){
        fileUrl="resources/js/i18n/date-"+curentLanguage+".js";
        fileUrl1="resources/js/i18n/jquery.datepick-"+curentLanguage+".js";
        $.depends([{
            url: fileUrl,
            free: true
        },{
            url: fileUrl1,
            free: true
        }]);
        nextLanguage = $(this).attr("id");
        fileUrl="resources/js/i18n/date-"+nextLanguage+".js";
        fileUrl1="resources/js/i18n/jquery.datepick-"+nextLanguage+".js";
        $.depends([{
            url: fileUrl,
            format: 'script',
            onLoad: function(file, data, error) {
            //log(data);
            }
        },{
            url: fileUrl1,
            format: 'script',
            onLoad: function(file, data, error) {
            //log(data);
            }
        }]);
        curentLanguage= nextLanguage;
        jQuery(".date").datepick("option",{
            dateFormat:$(this).attr("dateFormat")
        });
    })

    $("#en-GB").trigger('click');
});
