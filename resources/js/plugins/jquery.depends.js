// jQuery Depends (jquery.depends.js)
// Full Details: http://code.google.com/p/jquery-depends-plugin/
//
// License: New BSD License
// Copyright (c) 2009, Aaron Silvas (full_name@hotmail.com)
// All rights reserved.
//  
// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
//  
// * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer
//   in the documentation and/or other materials provided with the distribution.
// * Neither the name of the Woozab LLC nor the names of its contributors may be used to endorse or promote products derived from this software
//   without specific prior written permission.
//  
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


(function($) {

    $.depends = function(files, options, context) {

        if (context == null)
            context = 'g';
        var cntx = $.depends.g.context[context];
        if (cntx == null) {
            cntx = { files: [], fileLookup: {}, loadQueue: [], version: '1', key: context };
            $.depends.g.context[context] = cntx;
        }

        if (options != null) {
            if (options.onFileStart === null || $.isFunction(options.onFileStart) == true)
                cntx.onFileStart = options.onFileStart;
            if (options.onFileLoad === null || $.isFunction(options.onFileLoad) == true)
                cntx.onFileLoad = options.onFileLoad;
            if (options.onFileError === null || $.isFunction(options.onFileError) == true)
                cntx.onFileError = options.onFileError;
            if (options.onComplete === null || $.isFunction(options.onComplete) == true)
                cntx.onComplete = options.onComplete;
            if (typeof options.version !== 'undefined')
                cntx.version = options.version;
        }

        var fileArray = [];

        if (files == null)
            return cntx.files;
        else if (isNaN(files) == false) {
            if (files < 0 || files >= cntx.files.length)
                return null;
            cntx.files[files]; // return requested index
        }
        else if (typeof (files) == 'string') { // manifest
            switch (files) {
                case 'abort': // cancel pending downloads
                    delete cntx.loadQueue; // free
                    cntx.loadQueue = [];
                    break;
                case 'destroy':
                    delete cntx.loadQueue; // free
                    cntx.loadQueue = [];
                    for (var i = 0; i < cntx.files.length; i++) {
                        freeFile(cntx.files[i]);
                    }
                    delete cntx.files; // free
                    cntx.files = [];
                    delete cntx.fileLookup; // free
                    cntx.fileLookup = {};
                    delete $.depends.g.context[cntx.key];
                    break;
                default:
                    var cacheFile = files;
                    if (cacheFile.indexOf('?') > 0)
                        cacheFile += '&' + cntx.version;
                    else
                        cacheFile += '?' + cntx.version;
                    $.ajax({ url: cacheFile, async: true, cache: true
                        , dataType: ($.browser.msie) ? 'text' : 'xml', error: function(req, status, error) {
                            if (cntx.onComplete != null)
                                cntx.onComplete(); // signal completion if error.. still need more error handling support later
                        }, success: function(data) {
                            var xml;
                            if (typeof data == 'string') {
                                xml = new ActiveXObject('Microsoft.XMLDOM');
                                xml.async = false;
                                xml.loadXML(data);
                            } else {
                                xml = data;
                            }

                            var files = [];
                            $('manifest > files > file', xml).each(function() {
                                var file = {};

                                $(this).children().each(function() {
                                    var v = $(this);
                                    var val = v.text();
                                    if (this.nodeName.indexOf('on') == 0) {
                                        eval('var func = ' + val + ';');
                                        val = func;
                                    }
                                    file[this.nodeName] = val;
                                });
                                files.push(file);
                            });

                            $.depends(files); // call with downloaded manifest
                        }
                    });

                    break;
            }
        }
        else {
            if ($.isArray(files) == false)
                files = [files]; // turn it into array for now, for processing purposes

            var in_queue = cntx.loadQueue.length;

            for (var i = 0; i < files.length; i++) {
                var f = files[i];
                if (f == null || isUrlValid(f.url) == false)
                    continue;
                var fileKey = f.key ? f.key : urlToKey(f.url);
                var file = cntx.fileLookup[fileKey];
                if (file == null) {
                    file = f;
                    file.key = cntx.key + '_' + fileKey;
                    file.isReady = false;
                    file.loadsQueued = 0;
                    file.loadQueue = [];
                    file.index = cntx.files.length;
                    if ($.isFunction(file.onLoad) == false)
                        delete file.onLoad;
                    if ($.isFunction(file.onError) == false)
                        delete file.onError;
                    if (isNaN(file.cacheExpires) == true)
                        file.cacheExpires = 0; // default - no expiration
                    updateCacheUrl(file);
                    if (file.format == null) { // auto
                        var ext = file.url;
                        q = ext.indexOf('?');
                        d = ext.lastIndexOf('.', (q > 0 ? q : undefined));
                        if (d < 0)
                            throw 'Unrecognized format! Specify "format" in your file object if the uri does not contain recognized extension.';
                        if (q > 0)
                            ext = ext.substring(d + 1, q).toLowerCase();
                        else
                            ext = ext.substring(d + 1).toLowerCase();
                        switch (ext) {
                            case 'xml':
                                file.format = 'xml';
                                break;
                            case 'htm':
                            case 'html':
                                file.format = 'html';
                                break;
                            case 'json':
                                file.format = 'json';
                                break;
                            case 'jsonp':
                                file.format = 'jsonp';
                                break;
                            case 'txt':
                            case 'text':
                            case 'log':
                                file.format = 'text';
                                break;
                            case 'js':
                                file.format = 'script';
                                break;
                            case 'css':
                                file.format = 'css';
                                break;
                            case 'jpg':
                            case 'jpeg':
                            case 'png':
                            case 'bmp':
                            case 'gif':
                                file.format = 'image';
                                break;
                            default:
                                throw 'Unrecognized format! Specify "format" in your file object if the uri does not contain recognized extension.';
                        }
                    }

                    cntx.files.push(file);
                    cntx.fileLookup[fileKey] = file;
                }
                else {
                    // track certain changes, as it may require other actions to take place

                    if (f.onLoad === null || $.isFunction(f.onLoad) == true)
                        file.onLoad = f.onLoad;
                    if (f.onError === null || $.isFunction(f.onError) == true)
                        file.onError = f.onError;
                    if (isNaN(f.cacheExpires) == false)
                        file.cacheExpires = f.cacheExpires;
                }

                fileArray.push(file);

                if (f.free == true || f.free == 'true') {
                    freeFile(file);
                }
                else { // otherwise attempt to download, if needed
                    queueDownload(file);
                }
            }

            if (in_queue == 0 && cntx.loadQueue.length >= 1)
                processDownloads(); // begin downloads
            else if (in_queue == cntx.loadQueue.length) { // no new items being downloaded
                if (cntx.onComplete != null)
                    cntx.onComplete(); // signal completion if error.. still need more error handling support later
            }
        }

        function urlToKey(url) {
            return url.toLowerCase().replace(/[^a-zA-Z 0-9]+/g, '');
        }

        function isUrlValid(url) {
            return (url != null & url.length > 0);
        }

        function freeFile(file) {
            if (file.isReady == true) {
                file.isReady = false;

                switch (file.format) {
                    case 'script':
                        $('head > script[key=' + file.key + ']').remove();
                        break;
                    case 'css':
                        $('head > link[key=' + file.key + ']').remove();
                        break;
                    case 'image':
                        $('img[key=' + file.key + ']').remove();
                        break;
                }
            }

            delete file.data;
        }

        function queueDownload(file) {
            if (file.isReady == true && file.onLoad == null)
                return; // if resource is already available and load was not requested, nothing more to do
            else if ($.isFunction(file.onLoad) == false)
                file.onLoad = function() { }; // any new resource automatically loads, regardless if onLoad is specified or not

            file.loadQueue.push(file.onLoad);
            delete file.onLoad;

            file.loadCount++;

            cntx.loadQueue.push(file);
        }

        function processDownloads(file) {
            if (cntx.loadQueue.length == 0) {
                if (cntx.onComplete != null)
                    cntx.onComplete(); // signal completion
                return; // no more to process
            }

            var file = cntx.loadQueue.shift();
            file.isComplete = false;

            switch (file.format) {
                case 'xml':
                    var elapsed = (new Date().getTime() - file.lastFetch);
                    if (file.isReady == true && (file.cacheExpires == 0 || (file.cacheExpires > 0 && (new Date().getTime() - file.lastFetch) < file.cacheExpires))) {
                        if (cntx.onFileStart != null)
                            cntx.onFileStart(file, file.index, cntx.files.length);
                        completeDownload(file, true);
                        break;
                    }
                    updateCacheUrl(file);
                    if (cntx.onFileStart != null)
                        cntx.onFileStart(file, file.index, cntx.files.length);
                    $.ajax({ url: file.cacheUrl, async: true, cache: true, complete: function() {
                        completeDownload(file);
                    }, dataType: ($.browser.msie) ? 'text' : 'xml', error: function(req, status, error) {
                        file.data = null;
                        file.loadError = status;
                    }, success: function(data) {
                        var xml;
                        if (typeof data == 'string') {
                            xml = new ActiveXObject('Microsoft.XMLDOM');
                            xml.async = false;
                            xml.loadXML(data);
                        } else {
                            xml = data;
                        }

                        file.data = xml;
                        file.loadError = null;
                    }
                    });
                    break;
                case 'json':
                    if (file.isReady == true && (file.cacheExpires == 0 || (file.cacheExpires > 0 && (new Date().getTime() - file.lastFetch) < file.cacheExpires))) {
                        if (cntx.onFileStart != null)
                            cntx.onFileStart(file, file.index, cntx.files.length);
                        completeDownload(file, true);
                        break;
                    }
                    updateCacheUrl(file);
                    if (cntx.onFileStart != null)
                        cntx.onFileStart(file, file.index, cntx.files.length);
                    $.ajax({ url: file.cacheUrl, async: true, cache: true, complete: function() {
                        completeDownload(file);
                    }, dataType: 'json', error: function(req, status, error) {
                        file.data = null;
                        file.loadError = status;
                    }, success: function(data) {
                        file.data = data;
                        file.loadError = null;
                    }
                    });
                    break;
                case 'jsonp':
                    if (file.isReady == true && (file.cacheExpires == 0 || (file.cacheExpires > 0 && (new Date().getTime() - file.lastFetch) < file.cacheExpires))) {
                        if (cntx.onFileStart != null)
                            cntx.onFileStart(file, file.index, cntx.files.length);
                        completeDownload(file, true);
                        break;
                    }
                    updateCacheUrl(file);
                    if (cntx.onFileStart != null)
                        cntx.onFileStart(file, file.index, cntx.files.length);
                    $.ajax({ url: file.cacheUrl, async: true, cache: true, complete: function() {
                        completeDownload(file);
                    }, dataType: 'jsonp', error: function(req, status, error) {
                        file.data = null;
                        file.loadError = status;
                    }, success: function(data) {
                        file.data = data;
                        file.loadError = null;
                    }
                    });
                    break;

                case 'text':
                    if (file.isReady == true && (file.cacheExpires == 0 || (file.cacheExpires > 0 && (new Date().getTime() - file.lastFetch) < file.cacheExpires))) {
                        if (cntx.onFileStart != null)
                            cntx.onFileStart(file, file.index, cntx.files.length);
                        completeDownload(file, true);
                        break;
                    }
                    updateCacheUrl(file);
                    if (cntx.onFileStart != null)
                        cntx.onFileStart(file, file.index, cntx.files.length);
                    $.ajax({ url: file.cacheUrl, async: true, cache: true, complete: function() {
                        completeDownload(file);
                    }, dataType: 'text', error: function(req, status, error) {
                        file.data = null;
                        file.loadError = status;
                    }, success: function(data) {
                        file.data = data;
                        file.loadError = null;
                    }
                    });
                    break;
                case 'html':
                    if (file.isReady == true && (file.cacheExpires == 0 || (file.cacheExpires > 0 && (new Date().getTime() - file.lastFetch) < file.cacheExpires))) {
                        if (cntx.onFileStart != null)
                            cntx.onFileStart(file, file.index, cntx.files.length);
                        completeDownload(file, true);
                        break;
                    }
                    updateCacheUrl(file);
                    if (cntx.onFileStart != null)
                        cntx.onFileStart(file, file.index, cntx.files.length);
                    $.ajax({ url: file.cacheUrl, async: true, cache: true, complete: function() {
                        completeDownload(file);
                    }, dataType: 'html', error: function(req, status, error) {
                        file.data = null;
                        file.loadError = status;
                    }, success: function(data) {
                        file.data = data;
                        file.loadError = null;
                    }
                    });
                    break;
                case 'script':
                    var script = $('head > script[key=' + file.key + ']');
                    file.isReady = (script.length > 0);
                    if (file.isReady == true) {
                        if (cntx.onFileStart != null)
                            cntx.onFileStart(file, file.index, cntx.files.length);
                        file.data = script[0];
                        completeDownload(file, true);
                        break;
                    }

                    updateCacheUrl(file);
                    if (cntx.onFileStart != null)
                        cntx.onFileStart(file, file.index, cntx.files.length);
                    script = $('<script type="text/javascript"></script>').attr('key', file.key);
                    file.data = script[0];
                    file.loadError = null;
                    script
                        .load(function() {
                            file.loadError = null;
                            completeDownload(file);
                        })
                        .error(function(err) {
                            $(file.data).remove();
                            file.data = null;
                            file.loadError = err;
                            completeDownload(file);
                        })
                    ;

                    var head = $('head');
                    if (head.length > 0)
                        head[0].appendChild(file.data);
                    else
                        $('body')[0].appendChild(file.data);

                    script.attr('src', file.cacheUrl);

                    if (file.data && file.data.readyState) {
                        switch (file.data.readyState) {
                            case 'loaded':
                                file.loadError = null;
                                completeDownload(file);
                                break;
                            case 'error':
                                $(file.data).remove();
                                file.data = null;
                                file.loadError = err;
                                completeDownload(file);
                                break;
                        }
                    }
                    
                    break;
                case 'css':
                    var css = $('head > link[key=' + file.key + ']');
                    file.isReady = (css.length > 0);
                    if (file.isReady == true) {
                        if (cntx.onFileStart != null)
                            cntx.onFileStart(file, file.index, cntx.files.length);
                        file.data = css[0];
                        completeDownload(file, true);
                        break;
                    }

                    updateCacheUrl(file);
                    if (cntx.onFileStart != null)
                        cntx.onFileStart(file, file.index, cntx.files.length);
                    css = $('<link rel="stylesheet" type="text/css"></link>').attr('key', file.key);
                    file.data = css[0];
                    file.loadError = null;

                    var head = $('head');
                    if (head.length > 0)
                        head[0].appendChild(file.data);
                    else
                        $('body')[0].appendChild(file.data);

                    css.attr('href', file.cacheUrl);

                    // not aware of any way to actually know when a css is loaded, so lets just assume it worked for now
                    completeDownload(file);

                    break;
                case 'image':
                    updateCacheUrl(file);
                    if (cntx.onFileStart != null)
                        cntx.onFileStart(file, file.index, cntx.files.length);

                    var img = $('<img />').attr('key', file.key);
                    file.data = img[0];
                    img
                        .load(function(req) {
                            file.loadError = null;
                            completeDownload(file, file.isReady);
                        })
                        .error(function() {
                            $(file.data).remove();
                            file.data = null;
                            file.loadError = 'Unable to load image';
                            completeDownload(file);
                        })
                        .hide()
                    ;

                    $('body').append(file.data);

                    img.attr('src', file.cacheUrl);

                    break;
                default:
                    throw 'Unsupported format: ' + file.format;
            }
        }

        function completeDownload(file, isCached) {
            if (file.isComplete == true)
                return; // this is to prevent multiple callbacks. appears to be an isolated issue with jsonp callbacks, but should resolve all cases if more than one exists
            file.isComplete = true;
            if (file.loadError == null && cntx.onFileLoad)
                cntx.onFileLoad(file, file.index, cntx.files.length, (isCached == true)); // success callback
            else if (file.loadError != null && cntx.onFileError)
                cntx.onFileError(file, file.loadError, file.index, cntx.files.length); // failure callback
            var callback = file.loadQueue.shift(); // remove first callback
            if (file.loadError == null) {
                file.isReady = true;
                if (isCached != true)
                    file.lastFetch = new Date().getTime();
            }
            if (callback != null) {
                callback(file, file.data, file.loadError);
            }
            processDownloads();
        }

        function updateCacheUrl(file) {
            file.cacheUrl = file.url;
            if (file.cacheUrl.indexOf('?') > 0)
                file.cacheUrl += '&' + (file.cacheExpires != 0 ? $.depends.g.seed++ : cntx.version);
            else
                file.cacheUrl += '?' + (file.cacheExpires != 0 ? $.depends.g.seed++ : cntx.version);
        }

        return fileArray;
    } // jQuery.depends

    /* GLOBAL */
    $.depends.g = { context: {}, seed: Math.round(Math.random() * Math.pow(2, 32)) };

})(jQuery);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         // (function($) {
