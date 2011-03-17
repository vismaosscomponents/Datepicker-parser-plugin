var date = new Date
var currentYear = date.getFullYear();
var currentMonth = date.getMonth()+1;
var filePath = "../../i18n/";
//en-GB
module('en-GB dd/mm/yyyy');
$.depends({
    url: filePath+"date-en-GB.js",
    format: 'script',
    onLoad: function(file, data, error) {
    //log(data);
    }
});

test('parseDate()', function() {
    // equal(parseDate(value,dateFormat),expected result, some f... message);
    equal(parseDate("11","dd/mm/yyyy"),"11/"+currentMonth+"/"+currentYear, "11");
    equal(parseDate("101","dd/mm/yyyy"),"10/01/"+currentYear, "101");
    equal(parseDate("1012","dd/mm/yyyy"),"10/12/"+currentYear, "1012");
    equal(parseDate("441","dd/mm/yyyy"),"04/04/2001", "441");
    equal(parseDate("04041","dd/mm/yyyy"),"04/04/2001", "04041");
    equal(parseDate("4411","dd/mm/yyyy"),"04/04/2011", "4411");
    equal(parseDate("040411","dd/mm/yyyy"),"04/04/2011", "040411");
    equal(parseDate("04042111","dd/mm/yyyy"),"04/04/2111", "04042111");
    equal(parseDate("1241","dd/mm/yyyy"),"12/04/2001", "1241");
    equal(parseDate("12041","dd/mm/yyyy"),"12/04/2001", "12041");
    equal(parseDate("2541","dd/mm/yyyy"),"25/04/2001", "2541");
    equal(parseDate("25121","dd/mm/yyyy"),"25/12/2001", "2541");
    equal(parseDate("251201","dd/mm/yyyy"),"25/12/2001", "25401");
    equal(parseDate("25122001","dd/mm/yyyy"),"25/12/2001", "2542001");
    equal(parseDate("02122","dd/mm/yyyy"),"02/12/2002", "02122");
    equal(parseDate("1","dd/mm/yyyy"),"01/"+currentMonth+"/"+currentYear, "1");
    equal(parseDate("01","dd/mm/yyyy"),"01/"+currentMonth+"/"+currentYear, "01");
    equal(parseDate("1/","dd/mm/yyyy"),"01/"+currentMonth+"/"+currentYear, "1/");
    equal(parseDate("01/","dd/mm/yyyy"),"01/"+currentMonth+"/"+currentYear, "01/");
    equal(parseDate("1/1","dd/mm/yyyy"),"01/01/"+currentYear, "1/1");
    equal(parseDate("1/01","dd/mm/yyyy"),"01/01/"+currentYear, "1/01");
    equal(parseDate("01/1","dd/mm/yyyy"),"01/01/"+currentYear, "01/1");
    equal(parseDate("01/01","dd/mm/yyyy"),"01/01/"+currentYear, "01/01");
    equal(parseDate("1/11","dd/mm/yyyy"),"01/11/"+currentYear, "1/11");
    equal(parseDate("01/11","dd/mm/yyyy"),"01/11/"+currentYear, "01/11");
    equal(parseDate("1/1/","dd/mm/yyyy"),"01/01/"+currentYear, "1/1/");
    equal(parseDate("1/01/","dd/mm/yyyy"),"01/01/"+currentYear, "1/01/");
    equal(parseDate("01/1/","dd/mm/yyyy"),"01/01/"+currentYear, "01/1/");
    equal(parseDate("01/01/","dd/mm/yyyy"),"01/01/"+currentYear, "01/01/");
    equal(parseDate("1/1/2","dd/mm/yyyy"),"01/01/2002", "1/1/2");
    equal(parseDate("01/1/2","dd/mm/yyyy"),"01/01/2002", "01/1/2");
    equal(parseDate("1/01/2","dd/mm/yyyy"),"01/01/2002", "1/01/2");
    equal(parseDate("01/01/2","dd/mm/yyyy"),"01/01/2002", "01/01/2");
    equal(parseDate("1/1/20","dd/mm/yyyy"),"01/01/2020", "1/1/20");
    equal(parseDate("1/01/20","dd/mm/yyyy"),"01/01/2020", "1/01/2");
    equal(parseDate("01/1/20","dd/mm/yyyy"),"01/01/2020", "01/1/2");
    equal(parseDate("01/01/20","dd/mm/yyyy"),"01/01/2020", "01/01/2");
    equal(parseDate("1/1/2020","dd/mm/yyyy"),"01/01/2020", "1/1/2020");
    equal(parseDate("01/1/2020","dd/mm/yyyy"),"01/01/2020", "01/1/2020");
    equal(parseDate("1/01/2020","dd/mm/yyyy"),"01/01/2020", "1/01/2020");
    equal(parseDate("01/01/2020","dd/mm/yyyy"),"01/01/2020", "01/01/2020");

})

$.depends({
    url: filePath+"date-en-GB.js",
    free: true
});


//no-NO
module('no-NO dd.mm.yyyy');
$.depends({
    url: filePath+"date-no-NO.js",
    format: 'script',
    onLoad: function(file, data, error) {
    //log(data);
    }
});

test('parseDate()', function() {
    // equal(parseDate(value,dateFormat),expected result, some f... message);
    equal(parseDate("01","dd.mm.yyyy"),"01."+currentMonth+"."+currentYear, "01");
    equal(parseDate("1","dd.mm.yyyy"),"01."+currentMonth+"."+currentYear, "1");
    equal(parseDate("11","dd.mm.yyyy"),"11."+currentMonth+"."+currentYear, "11");
    equal(parseDate("101","dd.mm.yyyy"),"10.01."+currentYear, "101");
    equal(parseDate("1012","dd.mm.yyyy"),"10.12."+currentYear, "1012");
    equal(parseDate("441","dd.mm.yyyy"),"04.04.2001", "441");
    equal(parseDate("04041","dd.mm.yyyy"),"04.04.2001", "04041");
    equal(parseDate("4411","dd.mm.yyyy"),"04.04.2011", "4411");
    equal(parseDate("040411","dd.mm.yyyy"),"04.04.2011", "040411");
    equal(parseDate("04042111","dd.mm.yyyy"),"04.04.2111", "04042111");
    equal(parseDate("1241","dd.mm.yyyy"),"12.04.2001", "1241");
    equal(parseDate("12041","dd.mm.yyyy"),"12.04.2001", "12041");
    equal(parseDate("2541","dd.mm.yyyy"),"25.04.2001", "2541");
    equal(parseDate("25121","dd.mm.yyyy"),"25.12.2001", "2541");
    equal(parseDate("251201","dd.mm.yyyy"),"25.12.2001", "25401");
    equal(parseDate("25122001","dd.mm.yyyy"),"25.12.2001", "2542001");
    equal(parseDate("02122","dd.mm.yyyy"),"02.12.2002", "02122");
    equal(parseDate("1.","dd.mm.yyyy"),"01."+currentMonth+"."+currentYear, "1.");
    equal(parseDate("01.","dd.mm.yyyy"),"01."+currentMonth+"."+currentYear, "01.");
    equal(parseDate("1.1","dd.mm.yyyy"),"01.01."+currentYear, "1.1");
    equal(parseDate("1.01","dd.mm.yyyy"),"01.01."+currentYear, "1.01");
    equal(parseDate("01.1","dd.mm.yyyy"),"01.01."+currentYear, "01.1");
    equal(parseDate("01.01","dd.mm.yyyy"),"01.01."+currentYear, "01.01");
    equal(parseDate("1.11","dd.mm.yyyy"),"01.11."+currentYear, "1.11");
    equal(parseDate("01.11","dd.mm.yyyy"),"01.11."+currentYear, "01.11");
    equal(parseDate("1.1.","dd.mm.yyyy"),"01.01."+currentYear, "1.1.");
    equal(parseDate("1.01.","dd.mm.yyyy"),"01.01."+currentYear, "1.01.");
    equal(parseDate("01.1.","dd.mm.yyyy"),"01.01."+currentYear, "01.1.");
    equal(parseDate("01.01.","dd.mm.yyyy"),"01.01."+currentYear, "01.01.");
    equal(parseDate("1.1.2","dd.mm.yyyy"),"01.01.2002", "1.1.2");
    equal(parseDate("01.1.2","dd.mm.yyyy"),"01.01.2002", "01.1.2");
    equal(parseDate("1.01.2","dd.mm.yyyy"),"01.01.2002", "1.01.2");
    equal(parseDate("01.01.2","dd.mm.yyyy"),"01.01.2002", "01.01.2");
    equal(parseDate("1.1.20","dd.mm.yyyy"),"01.01.2020", "1.1.20");
    equal(parseDate("1.01.20","dd.mm.yyyy"),"01.01.2020", "1.01.2");
    equal(parseDate("01.1.20","dd.mm.yyyy"),"01.01.2020", "01.1.2");
    equal(parseDate("01.01.20","dd.mm.yyyy"),"01.01.2020", "01.01.2");
    equal(parseDate("1.1.2020","dd.mm.yyyy"),"01.01.2020", "1.1.2020");
    equal(parseDate("01.1.2020","dd.mm.yyyy"),"01.01.2020", "01.1.2020");
    equal(parseDate("1.01.2020","dd.mm.yyyy"),"01.01.2020", "1.01.2020");
    equal(parseDate("01.01.2020","dd.mm.yyyy"),"01.01.2020", "01.01.2020");
})
$.depends({
    url: filePath+"date-no-NO.js",
    free: true
});

//sv-SE
module('sv-SE yyyy-mm-dd');
$.depends({
    url: filePath+"date-sv-SE.js",
    format: 'script',
    onLoad: function(file, data, error) {
    //log(data);
    }
});

test('parseDate()', function() {
    // equal(parseDate(value,dateFormat),expected result, some f... message);
    equal(parseDate("1","yyyy-mm-dd"),currentYear+"-"+currentMonth+"-01", "1");
    equal(parseDate("01","yyyy-mm-dd"),currentYear+"-"+currentMonth+"-01", "01");
    equal(parseDate("11","yyyy-mm-dd"),currentYear+"-"+currentMonth+"-11", "11");
    equal(parseDate("204","yyyy-mm-dd"),"2020-04-01", "204");
    equal(parseDate("2012","yyyy-mm-dd"),"2020-12-01", "2012");
    equal(parseDate("20121","yyyy-mm-dd"),"2020-12-01", "20121");
    equal(parseDate("201211","yyyy-mm-dd"),"2020-12-11", "201211");
    equal(parseDate("20201211","yyyy-mm-dd"),"2020-12-11", "20201211");
    equal(parseDate("03-","yyyy-mm-dd"),"2003-"+currentMonth+"-01", "03-");
    equal(parseDate("2003-","yyyy-mm-dd"),"2003-"+currentMonth+"-01", "2003-");
    equal(parseDate("03-1","yyyy-mm-dd"),"2003-01-01", "03-1");
    equal(parseDate("2003-1","yyyy-mm-dd"),"2003-01-01", "2003-1");
    equal(parseDate("03-01","yyyy-mm-dd"),"2003-01-01", "03-01");
    equal(parseDate("2003-01","yyyy-mm-dd"),"2003-01-01", "2003-01");
    equal(parseDate("03-11","yyyy-mm-dd"),"2003-11-01", "03-11");
    equal(parseDate("2003-11","yyyy-mm-dd"),"2003-11-01", "2003-11");
    equal(parseDate("03-1-1","yyyy-mm-dd"),"2003-01-01", "03-1-1");
    equal(parseDate("03-01-1","yyyy-mm-dd"),"2003-01-01", "03-01-1");
    equal(parseDate("03-1-01","yyyy-mm-dd"),"2003-01-01", "03-1-1");
    equal(parseDate("03-01-01","yyyy-mm-dd"),"2003-01-01", "03-01-01");
    equal(parseDate("2003-1-1","yyyy-mm-dd"),"2003-01-01", "2003-1-1");
    equal(parseDate("2003-01-1","yyyy-mm-dd"),"2003-01-01", "2003-01-1");
    equal(parseDate("2003-1-01","yyyy-mm-dd"),"2003-01-01", "2003-1-01");
    equal(parseDate("2003-01-01","yyyy-mm-dd"),"2003-01-01", "2003-01-01");
    equal(parseDate("2003-11-10","yyyy-mm-dd"),"2003-11-10", "2003-11-10");
    equal(parseDate("1/","yyyy-mm-dd"),currentYear+"-"+currentMonth+"-01", "1/");
    equal(parseDate("01/","yyyy-mm-dd"),currentYear+"-"+currentMonth+"-01", "01/");
    equal(parseDate("1/1","yyyy-mm-dd"),currentYear+"-01-01", "1/1");
    equal(parseDate("1/01","yyyy-mm-dd"),currentYear+"-01-01", "1/01");
    equal(parseDate("01/1","yyyy-mm-dd"),currentYear+"-01-01", "01/1");
    equal(parseDate("01/01","yyyy-mm-dd"),currentYear+"-01-01", "01/01");
    equal(parseDate("1/11","yyyy-mm-dd"),currentYear+"-11-01", "1/11");
    equal(parseDate("01/11","yyyy-mm-dd"),currentYear+"-11-01", "01/11");
    equal(parseDate("1/1/","yyyy-mm-dd"),currentYear+"-01-01", "1/1/");
    equal(parseDate("1/01/","yyyy-mm-dd"),currentYear+"-01-01", "1/01/");
    equal(parseDate("01/1/","yyyy-mm-dd"),currentYear+"-01-01", "01/1/");
    equal(parseDate("01/01/","yyyy-mm-dd"),currentYear+"-01-01", "01/01/");
    equal(parseDate("1/1/2","yyyy-mm-dd"),"2002-01-01", "1/1/2");
    equal(parseDate("01/1/2","yyyy-mm-dd"),"2002-01-01", "01/1/2");
    equal(parseDate("1/01/2","yyyy-mm-dd"),"2002-01-01", "1/01/2");
    equal(parseDate("01/01/2","yyyy-mm-dd"),"2002-01-01", "01/01/2");
    equal(parseDate("1/1/20","yyyy-mm-dd"),"2020-01-01", "1/1/20");
    equal(parseDate("1/01/20","yyyy-mm-dd"),"2020-01-01", "1/01/2");
    equal(parseDate("01/1/20","yyyy-mm-dd"),"2020-01-01", "01/1/2");
    equal(parseDate("01/01/20","yyyy-mm-dd"),"2020-01-01", "01/01/2");
    equal(parseDate("1/1/2020","yyyy-mm-dd"),"2020-01-01", "1/1/2020");
    equal(parseDate("01/1/2020","yyyy-mm-dd"),"2020-01-01", "01/1/2020");
    equal(parseDate("1/01/2020","yyyy-mm-dd"),"2020-01-01", "1/01/2020");
    equal(parseDate("01/01/2020","yyyy-mm-dd"),"2020-01-01", "2020-01-01");
})

$.depends({
    url: filePath+"date-sv-SE.js",
    free: true
});

//fi-FI
module('fi-FI d.m.yyyy');
$.depends({
    url: filePath+"date-fi-FI.js",
    format: 'script',
    onLoad: function(file, data, error) {
    //log(data);
    }
});

test('parseDate()', function() {
    // equal(parseDate(value,dateFormat),expected result, some f... message);
    equal(parseDate("11","d.m.yyyy"),"11."+currentMonth+"."+currentYear, "11");
    equal(parseDate("101","d.m.yyyy"),"10.1."+currentYear, "101");
    equal(parseDate("1012","d.m.yyyy"),"10.12."+currentYear, "1012");
    equal(parseDate("441","d.m.yyyy"),"4.4.2001", "441");
    equal(parseDate("04041","d.m.yyyy"),"4.4.2001", "04041");
    equal(parseDate("4411","d.m.yyyy"),"4.4.2011", "4411");
    equal(parseDate("040411","d.m.yyyy"),"4.4.2011", "040411");
    equal(parseDate("04042111","d.m.yyyy"),"4.4.2111", "04042111");
    equal(parseDate("1241","d.m.yyyy"),"12.4.2001", "1241");
    equal(parseDate("12041","d.m.yyyy"),"12.4.2001", "12041");
    equal(parseDate("2541","d.m.yyyy"),"25.4.2001", "2541");
    equal(parseDate("25121","d.m.yyyy"),"25.12.2001", "2541");
    equal(parseDate("251201","d.m.yyyy"),"25.12.2001", "25401");
    equal(parseDate("25122001","d.m.yyyy"),"25.12.2001", "2542001");
    equal(parseDate("02122","d.m.yyyy"),"2.12.2002", "02122");
    equal(parseDate("1","d.m.yyyy"),"1."+currentMonth+"."+currentYear, "1");
    equal(parseDate("01","d.m.yyyy"),"1."+currentMonth+"."+currentYear, "01");
    equal(parseDate("1.","d.m.yyyy"),"1."+currentMonth+"."+currentYear, "1.");
    equal(parseDate("01.","d.m.yyyy"),"1."+currentMonth+"."+currentYear, "01.");
    equal(parseDate("1.1","d.m.yyyy"),"1.1."+currentYear, "1.1");
    equal(parseDate("1.01","d.m.yyyy"),"1.1."+currentYear, "1.01");
    equal(parseDate("01.1","d.m.yyyy"),"1.1."+currentYear, "01.1");
    equal(parseDate("01.01","d.m.yyyy"),"1.1."+currentYear, "01.01");
    equal(parseDate("1.11","d.m.yyyy"),"1.11."+currentYear, "1.11");
    equal(parseDate("01.11","d.m.yyyy"),"1.11."+currentYear, "01.11");
    equal(parseDate("1.1.","d.m.yyyy"),"1.1."+currentYear, "1.1.");
    equal(parseDate("1.01.","d.m.yyyy"),"1.1."+currentYear, "1.01.");
    equal(parseDate("01.1.","d.m.yyyy"),"1.1."+currentYear, "01.1.");
    equal(parseDate("01.01.","d.m.yyyy"),"1.1."+currentYear, "01.01.");
    equal(parseDate("1.1.2","d.m.yyyy"),"1.1.2002", "1.1.2");
    equal(parseDate("01.1.2","d.m.yyyy"),"1.1.2002", "01.1.2");
    equal(parseDate("1.01.2","d.m.yyyy"),"1.1.2002", "1.01.2");
    equal(parseDate("01.01.2","d.m.yyyy"),"1.1.2002", "01.01.2");
    equal(parseDate("1.1.20","d.m.yyyy"),"1.1.2020", "1.1.20");
    equal(parseDate("1.01.20","d.m.yyyy"),"1.1.2020", "1.01.2");
    equal(parseDate("01.1.20","d.m.yyyy"),"1.1.2020", "01.1.2");
    equal(parseDate("01.01.20","d.m.yyyy"),"1.1.2020", "01.01.2");
    equal(parseDate("1.1.2020","d.m.yyyy"),"1.1.2020", "1.1.2020");
    equal(parseDate("01.1.2020","d.m.yyyy"),"1.1.2020", "01.1.2020");
    equal(parseDate("1.01.2020","d.m.yyyy"),"1.1.2020", "1.01.2020");
    equal(parseDate("01.01.2020","d.m.yyyy"),"1.1.2020", "01.01.2020");
})

$.depends({
    url: filePath+"date-fi-FI.js",
    free: true
});

//ro-RO
module('ro-RO dd.mm.yyyy');
$.depends({
    url: filePath+"date-ro-RO.js",
    format: 'script',
    onLoad: function(file, data, error) {
    //log(data);
    }
});

test('parseDate()', function() {
    // equal(parseDate(value,dateFormat),expected result, some f... message);
    equal(parseDate("11","dd.mm.yyyy"),"11."+currentMonth+"."+currentYear, "11");
    equal(parseDate("101","dd.mm.yyyy"),"10.01."+currentYear, "101");
    equal(parseDate("1012","dd.mm.yyyy"),"10.12."+currentYear, "1012");
    equal(parseDate("441","dd.mm.yyyy"),"04.04.2001", "441");
    equal(parseDate("04041","dd.mm.yyyy"),"04.04.2001", "04041");
    equal(parseDate("4411","dd.mm.yyyy"),"04.04.2011", "4411");
    equal(parseDate("040411","dd.mm.yyyy"),"04.04.2011", "040411");
    equal(parseDate("04042111","dd.mm.yyyy"),"04.04.2111", "04042111");
    equal(parseDate("1241","dd.mm.yyyy"),"12.04.2001", "1241");
    equal(parseDate("12041","dd.mm.yyyy"),"12.04.2001", "12041");
    equal(parseDate("2541","dd.mm.yyyy"),"25.04.2001", "2541");
    equal(parseDate("25121","dd.mm.yyyy"),"25.12.2001", "2541");
    equal(parseDate("251201","dd.mm.yyyy"),"25.12.2001", "25401");
    equal(parseDate("25122001","dd.mm.yyyy"),"25.12.2001", "2542001");
    equal(parseDate("02122","dd.mm.yyyy"),"02.12.2002", "02122");
    equal(parseDate("1","dd.mm.yyyy"),"01."+currentMonth+"."+currentYear, "1");
    equal(parseDate("01","dd.mm.yyyy"),"01."+currentMonth+"."+currentYear, "01");
    equal(parseDate("1.","dd.mm.yyyy"),"01."+currentMonth+"."+currentYear, "1.");
    equal(parseDate("01.","dd.mm.yyyy"),"01."+currentMonth+"."+currentYear, "01.");
    equal(parseDate("1.1","dd.mm.yyyy"),"01.01."+currentYear, "1.1");
    equal(parseDate("1.01","dd.mm.yyyy"),"01.01."+currentYear, "1.01");
    equal(parseDate("01.1","dd.mm.yyyy"),"01.01."+currentYear, "01.1");
    equal(parseDate("01.01","dd.mm.yyyy"),"01.01."+currentYear, "01.01");
    equal(parseDate("1.11","dd.mm.yyyy"),"01.11."+currentYear, "1.11");
    equal(parseDate("01.11","dd.mm.yyyy"),"01.11."+currentYear, "01.11");
    equal(parseDate("1.1.","dd.mm.yyyy"),"01.01."+currentYear, "1.1.");
    equal(parseDate("1.01.","dd.mm.yyyy"),"01.01."+currentYear, "1.01.");
    equal(parseDate("01.1.","dd.mm.yyyy"),"01.01."+currentYear, "01.1.");
    equal(parseDate("01.01.","dd.mm.yyyy"),"01.01."+currentYear, "01.01.");
    equal(parseDate("1.1.2","dd.mm.yyyy"),"01.01.2002", "1.1.2");
    equal(parseDate("01.1.2","dd.mm.yyyy"),"01.01.2002", "01.1.2");
    equal(parseDate("1.01.2","dd.mm.yyyy"),"01.01.2002", "1.01.2");
    equal(parseDate("01.01.2","dd.mm.yyyy"),"01.01.2002", "01.01.2");
    equal(parseDate("1.1.20","dd.mm.yyyy"),"01.01.2020", "1.1.20");
    equal(parseDate("1.01.20","dd.mm.yyyy"),"01.01.2020", "1.01.2");
    equal(parseDate("01.1.20","dd.mm.yyyy"),"01.01.2020", "01.1.2");
    equal(parseDate("01.01.20","dd.mm.yyyy"),"01.01.2020", "01.01.2");
    equal(parseDate("1.1.2020","dd.mm.yyyy"),"01.01.2020", "1.1.2020");
    equal(parseDate("01.1.2020","dd.mm.yyyy"),"01.01.2020", "01.1.2020");
    equal(parseDate("1.01.2020","dd.mm.yyyy"),"01.01.2020", "1.01.2020");
    equal(parseDate("01.01.2020","dd.mm.yyyy"),"01.01.2020", "01.01.2020");
})
$.depends({
    url: filePath+"date-ro-RO.js",
    free: true
});