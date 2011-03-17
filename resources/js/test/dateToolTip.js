function parseDate(val, dateFormat){
    //test if the text conatins only '0' to '9' or '-' or '.' or '/' and it doesn't start with '-'/
    if(val.match(/[a-zA-Z&'!,:;()@\\+\\%]+/) == null && val.charAt(0) !='-'){
        datesFormatList = _getPossibleInputFormats(dateFormat);
        i=0;
        do{
            dateObj = Date.parseExact(val,datesFormatList[i]);
            i++;
        }while(i<datesFormatList.length && dateObj == null)
//        console.log(datesFormatList[i-1]);
    }else{
        dateObj = Date.parse(val);
    }
    if(dateFormat!=null)
        return date = jQuery.datepick.formatDate(dateFormat, dateObj);
    else{
        //        console.log(val+" "+dateObj);
        return dateObj;
    }
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