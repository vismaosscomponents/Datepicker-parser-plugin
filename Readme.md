#Datepicker-parser-plugin
A plugin that glues together jQuery Datepicker ([Keith Wood jQuery Datepicker](http://keith-wood.name/datepick.html)) and [Datejs](http://www.datejs.com/)  to create a super cool date-picker widget.

Demo page: [http://osi.visma.com/cc/Datepick-demo/index.html](http://osi.visma.com/cc/Datepick-demo/index.html)

## Installation

In your html you need to include:

* vismaDatepick.css (this is our css file)
* jquery.datepick.js
* jquery.datepick.ext.visma.js (this is our extension file for datepicker)
* dateToolTip.js (this is our plugin)
* date-en-GB.js
* jquery.datepick-en-GB.js

It's important that the language JS file (jquery.datepick-en-GB.js) gets loaded after the jquery.datepick.js

This is how you connect the datepicker and the datepicker-tooltip functionality to your input field:

<pre>jQuery(".date").datepick();
jQuery(".date").datepick('dateToolTip'); 
</pre>

That's all.