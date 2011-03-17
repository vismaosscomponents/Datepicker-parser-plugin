var filePath = "../../i18n/";
//sv-SE
module('sv-SE yyyy-mm-dd');
$.depends({
    url: filePath+"date-sv-SE.js",
    format: 'script',
    onLoad: function(file, data, error) {
    }
});
test('parseDate()', function() {
    ok(Date.today().equals(parseDate("Today")),"Today "+Date.today());
    ok(Date.today().addDays(-1).equals(parseDate("Yesterday")),"Yesterday "+Date.today().addDays(-1));
    ok(Date.today().addDays(1).equals(parseDate("Tomorrow")),"Tomorrow "+Date.today().addDays(1));
    ok(Date.today().equals(parseDate("t")),"t = Today "+Date.today());
    ok(Date.today().equals(parseDate("tod")),"tod = Today "+Date.today());
    ok(Date.today().addDays(-1).equals(parseDate("yes")),"yes = Yesterday "+Date.today().addDays(-1));
    ok(Date.today().addDays(1).equals(parseDate("tom")),"tom = Tomorrow "+Date.today().addDays(1));
    ok(Date.today().next().monday().equals(parseDate("next monday")),"next monday "+Date.today().next().monday());
    ok(Date.today().last().tuesday().equals(parseDate("last tuesday")),"last tuesday "+Date.today().last().tuesday());
    ok(Date.today().last().monday().equals(parseDate("last mon")),"last mon = last monday "+Date.today().last().monday());
    ok(Date.today().addDays(1).equals(parseDate("+1day")),"+1day "+Date.today().addDays(1));
    ok(Date.today().addDays(1).equals(parseDate("+1d")),"+1d "+Date.today().addDays(1));
    ok(Date.today().addWeeks(1).equals(parseDate("+1week")),"+1week "+Date.today().addWeeks(1));
    ok(Date.today().addMonths(1).equals(parseDate("+1month")),"+1month "+Date.today().addMonths(1));
})
$.depends({
    url: filePath+"date-sv-SE.js",
    free: true
});