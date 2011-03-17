/**
 * Datepicker-tooltip extension for jQuery Datepicker (http://keith-wood.name/datepick.html) and Datejs (http://www.datejs.com/) 
 * Adrian Crapciu adrian.crapciu@visma.com
 * http://www.visma.com/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/

(function($) {
    $.extend($.datepick, {
        dateToolTip: function(opts) {
            $t = opts;
            _attachToolTip($t);
            _attachEvents($t);
        }
    });
    function _attachToolTip(target){
        var html = "<div class='dateToolTip' style='display:none'></div>";
        $(target).next().after(html);
    }
    function _attachEvents(target){
        $(target).bind('keyup',_KeyUp);
        $(target).bind('blur',_Blur);
        $(target).next().hover(_triggerIn, _triggerOut);
        $(target).next().bind('mousedown', _triggerDown);
        $(target).next().bind('mouseup', _triggerUp);
        $(target).next().next().bind('click',_Click);
    }
    function _KeyUp(event){
        var target = event.target;
        var inst = $.data(target, $.datepick.dataName);
        var keyCode = event.keyCode || event.wich;
        if(inst){
            if(keyCode == 13 && inst.target.next().next().text() !== ""){
                _setDatepickDate(inst.target);
            }else{
                if(inst.target.val().length>0){
                    dateFormat =  inst.target.datepick('options','dateFormat')
                    dateObj = _parseDate(inst.target.val(), dateFormat);
                    date = $.datepick.formatDate(dateFormat, dateObj);
                    if(dateObj != null && date !==""){
                        _fillToolTip( inst.target, date, dateObj)
                    }else{
                        _clearToolTip(inst.target);
                    }
                }else{
                    _clearToolTip(inst.target);
                }
            }
        }
    }
    function _Click(event){
        _setDatepickDate(event.data.target);
    }
    function _triggerIn(){
        $(this).prev().addClass("vismaDateTriggerHover");
    }
    function _triggerOut(){
        $(this).prev().removeClass("vismaDateTriggerHover vismaDateTriggerActive");
    }
    function _triggerDown(){
        $(this).prev().addClass("vismaDateTriggerActive");
    }
    function _triggerUp(){
        $(this).prev().removeClass("vismaDateTriggerActive");
    }
    function _Blur(event){
        var target = event.target;
        var inst = $.data(target, $.datepick.dataName);
        if(inst && inst.target.next().next().text() !== ""){
            _setDatepickDate(inst.target);
        }
    }
    function _setDatepickDate(target){
        target.datepick('setDate',$.data(target.next().next()[0],'dateobj'));
        target.next().next().text("").hide();
    }
    function _clearToolTip(target){
        target.next().next().text("").hide();
        $.data(target.next().next()[0],'dateobj', '');
    }
    function _fillToolTip(target, date, dateObj){
        target.next().next().text(date).show().css({
            left: (target.position().left) + 'px',
            top: (target.position().top+18) + 'px'
        });
        ;
        $.data(target.next().next()[0],'dateobj', dateObj);
    }
    function _parseDate(val, dateFormat){
        //test if the text conatins only '0' to '9' or '-' or '.' and it doesn't start with '-'/
        if(val.match(/[a-zA-Z&'!,:;()@\\+\\%]+/) == null && val.charAt(0) !='-'){
            datesFormatList = _getPossibleInputFormats(dateFormat);
            i=0;
            do{
                dateObj = Date.parseExact(val,datesFormatList[i]);
                i++;
            }while(i<datesFormatList.length && dateObj == null)
        //            console.log(datesFormatList[i-1]);
        }else{
            dateObj = Date.parse(val);
        //            console.log(dateObj);
        }
        return dateObj;
    }
    function _getPossibleInputFormats(dateFormat){
        generalShort=["d","dM","dMy","dMyyyy"];
        en_GB=["d/","d/M","d/M/","d/M/y","d/M/yyyy"];
        no_NO=["d.","d.M","d.M.","d.M.y","d.M.yyyy"];
        sv_SE=["d","yM","yMd","yyyyMd","yy-","yyyy-","yy-M","yyyy-M","yy-M-d","yyyy-M-d"];
        fi_FI=["d.","d.M","d.M.","d.M.y","d.M.yyyy"];
        ro_RO=["d.","d.M","d.M.","d.M.y","d.M.yyyy"];
        switch (dateFormat){
            //en_GB
            case "dd/mm/yyyy":
                //            return generalShort.concat(generalLong);
                return generalShort.concat(en_GB);
            //no_NO
            case "dd.mm.yyyy":
                return generalShort.concat(no_NO);
            //sv_SE
            case "yyyy-mm-dd":
                return en_GB.concat(sv_SE);
            //fi_FI
            case "d.m.yyyy":
                return generalShort.concat(fi_FI);
            //ro_RO
            case "dd.mm.yyyy":
                return generalShort.concat(ro_RO);
            default:
                return generalShort.concat(en_GB);
        }
    }
})(jQuery);
