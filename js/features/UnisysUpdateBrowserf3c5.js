/*
  Old Browser Detection for Unisys sites
  Supported browsers would be ie 10 and above
*/
var notSupportedBrowsers = [{ 'os': 'Any', 'browser': 'Internet Explorer', 'version': 11 }, { 'os': 'Any', 'browser': 'Firefox', 'version': 28 }, { 'os': 'Any', 'browser': 'Chrome', 'version': 29 }, { 'os': 'Any', 'browser': 'Opera', 'version': 15 }, { 'os': 'Any', 'browser': 'Apple Safari', 'version': 5 }];
var noticeLangCustom = null;
var supportedBrowsers = [];
var noticeLang = 'professional';

var Browser_Detection = {
    init: function () {
        if (notSupportedBrowsers == null || notSupportedBrowsers.length < 1) {
            notSupportedBrowsers = this.defaultNotSupportedBrowsers;
        }
        this.detectBrowser();
        this.detectOS();

        if (this.browser == '' || this.browser == 'Unknown' || this.os == '' ||
            this.os == 'Unknown' || this.browserVersion == '' || this.browserVersion == 0) {
            return;
        }
        // Check if this is old browser
        var oldBrowser = false;
        for (var i = 0; i < notSupportedBrowsers.length; i++) {
            if (notSupportedBrowsers[i].os == 'Any' || notSupportedBrowsers[i].os == this.os) {
                if (notSupportedBrowsers[i].browser == 'Any' || notSupportedBrowsers[i].browser == this.browser) {
                    if (notSupportedBrowsers[i].version == "Any" || this.browserVersion <= parseFloat(notSupportedBrowsers[i].version)) {
                        oldBrowser = true;
                        break;
                    }
                }
            }
        }

        if (oldBrowser) {
            this.displayNotice();
        }
    },
    displayNotice: function () {
        if (this.readCookie('bdnotice') == 1) {
            return;
        }

        this.writeNoticeCode();
    },
    writeNoticeCode: function () {
        var title = '';
        var notice = '';
        var browserName = '';
        var selectBrowserURl = '';
        var remindMeLater = '';
        var neverRemindAgain = '';
        var browsersList = null;
        if (noticeLang == 'custom' && noticeLangCustom != null) {
            title = noticeLangCustom.title;
            notice = noticeLangCustom.notice;
            remindMeLater = noticeLangCustom.remindMeLater;
            neverRemindAgain = noticeLangCustom.neverRemindAgain;
        } else {
            var noticeTextObj = null;
            eval('noticeTextObj = this.noticeText.' + noticeLang + ';');

            if (!noticeTextObj) {
                noticeTextObj = this.noticeText.professional;
            }

            title = noticeTextObj.title;
            notice = noticeTextObj.notice;
            remindMeLater = noticeTextObj.remindMeLater;
            neverRemindAgain = noticeTextObj.neverRemindAgain;
        }
        if (supportedBrowsers.length > 0) {
            browsersList = supportedBrowsers;
        } else {
            browsersList = this.supportedBrowsers;
        }
        for (var i = 0; i < browsersList.length; i++) {
            if (browsersList[i].cssClass == this.browser.toLowerCase()) {
                browserName = browsersList[i].name;
                selectBrowserURl = browsersList[i].downloadUrl;
                break;
            }
        }
          
        notice = this.formatNoticeText(notice, browserName + " " + this.browserVersion, ' href="' + selectBrowserURl + '"' + 'target=_blank');
        var noticeh2Text = notice;
        var noticeh3Text = "For a better experience on this site, please update your browser.";
        var downloadLink = selectBrowserURl;
        var downloadButtonText = browserName == "Internet Explorer" ? "Download Edge" : 'update '+browserName;
        var div = document.createElement("article");
        this.div = div;
        div.innerHTML = '<div class="logo"><picture><img src="https://www.app5.unisys.com/common/about__unisys/Mockups/unisys-logo.png" alt="Unisys" width="260" height="41"></picture></div><hr/><h2>' + noticeh2Text + '</h2><h3>' + noticeh3Text + '</h3><div><p> <a href="' + downloadLink + '" class="btn btn--primary" target="_blank" rel="noreferrer">'+downloadButtonText+'</a></p></div><hr/>';
        var sheet = document.createElement("style");
        var style = "body{text-align:center;padding:100px 50px;background:#25282a;font-family:Rubik,sans-serif;color:#fff}h1{font-size:3.375rem;line-height:1.07;margin-bottom:30px;margin-top:25.2px;font-family:Vollkorn,serif;font-weight:700}h2{font-size:32px;line-height:1.13;margin-bottom:25px;margin-bottom:25px;font-family:Vollkorn,serif;font-weight:500}h3{font-size:24px;font-weight:300;margin-bottom:25px;margin-bottom:0;font-family:Vollkorn,serif}article{display:block;text-align:left;width:40%;margin:0 auto}p{font-size:16px;line-height:25px;margin-bottom:52px;margin-top:32px;font-weight:300}a{color:#dc8100;text-decoration:none}.logo{margin-bottom:25px}hr{border:none;height:2px;color:#ba0c2f;background-color:#ba0c2f}a:hover{color:#333;text-decoration:none}.btn.btn--primary{background:#007bc2;background-size:200% 200%;border-color:#fff;color:#fff}.btn{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border:0;border-radius:6px;cursor:pointer;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;font-size:16px;font-weight:500;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;letter-spacing:2px;line-height:normal;padding:21px 32px 20px;position:relative;text-align:center;text-decoration:none;text-transform:uppercase;z-index:1}primary:hover{background-position:100% 100%}.btn:after{border-radius:6px;height:100%;left:0;opacity:0;position:absolute;top:0;width:100%;z-index:-1}.IE-Pic{width:100%}@media only screen and (max-width:760px),(min-device-width:768px) and (max-device-width:1024px){article{width:100%;margin:0 auto}body{padding:20px 10px}.IE-Pic{width:100%}}";
        sheet.type = "text/css";
        document.body.innerHTML = "";
        document.body.insertBefore(div, document.body.firstChild);
        try {
            sheet.innerText = style;
            sheet.innerHTML = style;
        } catch (e) {
            try {
                sheet.styleSheet.cssText = style;
            } catch (e) {
                return;
            }
        }
        var htmlElement = document.getElementsByTagName("html")[0];
        htmlElement.removeChild(document.getElementsByTagName("head")[0])
        var headElement = document.createElement("head");
        htmlElement.insertBefore(headElement, document.body);

        var metalink = document.createElement('meta');
        metalink.name = "viewport";
        metalink.content = "width=device-width, initial-scale=1.0";
        document.getElementsByTagName('head')[0].appendChild(metalink);

        var link1 = document.createElement('link');
        link1.rel = "preconnect";
        link1.href = "https://fonts.googleapis.com/";
        document.getElementsByTagName('head')[0].appendChild(link1);

        var link2 = document.createElement('link');
        link2.rel = "preconnect";
        link2.href = "https://fonts.gstatic.com/";
        link2.crossOrigin = "";
        document.getElementsByTagName('head')[0].appendChild(link2);

        var link3 = document.createElement('link');
        link3.rel = "stylesheet";
        link3.href = "https://fonts.googleapis.com/css2?family=Rubik&amp;display=swap";
        document.getElementsByTagName('head')[0].appendChild(link3);

        var link4 = document.createElement('link');
        link4.rel = "stylesheet";
        link4.href = "https://fonts.googleapis.com/css2?family=Vollkorn:wght@500;600;700&amp;display=swap";
        document.getElementsByTagName('head')[0].appendChild(link4);
        document.getElementsByTagName("head")[0].appendChild(sheet);
    },
    detectBrowser: function (ua_str) {
        this.browser = '';
        this.browserVersion = 0;

        var n, t, ua = ua_str || navigator.userAgent;
        var names = {
            i: 'Internet Explorer',
            f: 'Firefox',
            o: 'Opera',
            s: 'Apple Safari',
            n: 'Netscape Navigator',
            c: "Chrome",
            x: "Other"
        };
        if (/bot|googlebot|facebook|slurp|wii|silk|blackberry|maxthon|maxton|mediapartners|dolfin|dolphin|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|konqueror|rekonq|symbian|webos|coolnovo|blackberry|bb10|RIM|PlayBook|PaleMoon|QupZilla|YaBrowser|Otter|Midori|qutebrowser/i.test(ua)) n = "x";
        else if (/Trident.*rv:(\d+\.\d+)/i.test(ua)) n = "i";
        else if (/Trident.(\d+\.\d+)/i.test(ua)) n = "io";
        else if (/MSIE.(\d+\.\d+)/i.test(ua)) n = "i";
        else if (/Edge.(\d+)/i.test(ua)) n = "i";
        else if (/OPR.(\d+\.\d+)/i.test(ua)) n = "o";
        else if (/Chrome.(\d+\.\d+)/i.test(ua)) n = "c";
        else if (/Firefox.(\d+\.\d+)/i.test(ua)) n = "f";
        else if (/Version.(\d+.\d+).{0,10}Safari/i.test(ua)) n = "s";
        else if (/Safari.(\d+)/i.test(ua)) n = "so";
        else if (/Opera.*Version.(\d+\.\d+)/i.test(ua)) n = "o";
        else if (/Opera.(\d+\.?\d+)/i.test(ua)) n = "o";
        else if (/Netscape.(\d+)/i.test(ua)) n = "n";
        var v = parseFloat(RegExp.$1);
        var donotnotify = false;
        if (/windows.nt.5.0|windows.nt.4.0|windows.98|os x 10.4|os x 10.5|os x 10.3|os x 10.2/.test(ua)) donotnotify = "oldOS";
        if (n == "f" && (Math.round(v) == 31 || Math.round(v) == 38 || Math.round(v) == 45)) donotnotify = "ESR";
        if (/linux|x11|unix|bsd/.test(ua) && n == "o" && v > 12) donotnotify = "Opera12Linux";
        if (n == "x") {
            n = "x";
            v = v || 0;
            t = names[n];
            donotnotify = donotnotify;
        }
        if (n == "so") {
            v = ((v < 100) && 1.0) || ((v < 130) && 1.2) || ((v < 320) && 1.3) || ((v < 520) && 2.0) || ((v < 524) && 3.0) || ((v < 526) && 3.2) || 4.0;
            n = "s";
        }
        if (n == "i" && v == 7 && window.XDomainRequest) v = 8;
        if (n == "io") {
            n = "i";
            if (v > 6) v = 11;
            else if (v > 5) v = 10;
            else if (v > 4) v = 9;
            else if (v > 3.1) v = 8;
            else if (v > 3) v = 7;
            else v = 9;
        }
        this.browserVersion = v;
        this.browser = names[n];
        if (this.browser == '') {
            this.browser = 'Unknown';
        }
    },
    // Detect operation system
    detectOS: function () {
        for (var i = 0; i < this.operatingSystems.length; i++) {
            if (this.operatingSystems[i].searchString.indexOf(this.operatingSystems[i].subStr) != -1) {
                this.os = this.operatingSystems[i].name;
                return;
            }
        }

        this.os = "Unknown";
    },
    browser: '',
    os: '',
    browserVersion: '',
    supportedBrowsers: [
        { 'cssClass': 'firefox', 'name': 'Mozilla Firefox', 'downloadUrl': 'http://www.getfirefox.com/' },
        { 'cssClass': 'chrome', 'name': 'Google Chrome', 'downloadUrl': 'http://www.google.com/chrome/' },
        { 'cssClass': 'internet explorer', 'name': 'Internet Explorer', 'downloadUrl': 'http://www.getie.com/' },
        { 'cssClass': 'opera', 'name': 'Opera', 'downloadUrl': 'http://www.opera.com/' },
        { 'cssClass': 'safari', 'name': 'Apple Safari', 'downloadUrl': 'http://www.apple.com/safari/' }
    ],
    operatingSystems: [
        { 'searchString': navigator.platform, 'name': 'Windows', 'subStr': 'Win' },
        { 'searchString': navigator.platform, 'name': 'Mac', 'subStr': 'Mac' },
        { 'searchString': navigator.platform, 'name': 'Linux', 'subStr': 'Linux' },
        { 'searchString': navigator.userAgent, 'name': 'iPhone', 'subStr': 'iPhone/iPod' }
    ],
    defaultNotSupportedBrowsers: [{ 'os': 'Any', 'browser': 'Internet Explore', 'version': 11 }],
    noticeText: {
        'professional': { "title": "Outdated Browser Detected", "notice": "This website is designed to function on a more current browser (Your browser is: %s). ", "selectBrowser": "Use the links below to download a new browser or upgrade your existing browser.", "remindMeLater": "Remind me later", "neverRemindAgain": "No, don't remind me again" }
    },
    formatNoticeText: function () {
        var args = arguments;
        var data = args[0];
        for (var k = 1; k < args.length; ++k) data = data.replace(/%s/, args[k]);
        return data;
    },
    writeCookie: function (name, value, days) {
        var expiration = "";
        if (parseInt(days) > 0) {
            var date = new Date();
            date.setTime(date.getTime() + parseInt(days) * 24 * 60 * 60 * 1000);
            expiration = '; expires=' + date.toGMTString();
        }

        document.cookie = name + '=' + value + expiration + '; path=/';
    },

    readCookie: function (name) {
        if (!document.cookie) { return ''; }

        var searchName = name + '=';
        var data = document.cookie.split(';');

        for (var i = 0; i < data.length; i++) {
            while (data[i].charAt(0) == ' ') {
                data[i] = data[i].substring(1, data[i].length);
            }

            if (data[i].indexOf(searchName) == 0) {
                return data[i].substring(searchName.length, data[i].length);
            }
        }

        return '';
    }

};