// ==UserScript==
// @name         [YP] Collections Title
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      /https:\/\/www\.youporn\.com\/collections\/videos\/\d+\//
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youporn.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
var ypcPrefix = '[YP Collections]';
var ypcName = document.querySelector('div.collection-infos h4').innerText.replace('Collection: ','');
var ypcPage = ypcPrefix + ' ' + ypcName;
document.title = ypcPage;
})();

