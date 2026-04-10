// ==UserScript==
// @name         custom css for all-guitar-chords.com
// @namespace    http://tampermonkey.net/
// @version      2026-04-06
// @description  try to take over the world!
// @author       You
// @match        https://www.all-guitar-chords.com/*
// @match        https://chord.rocks/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        .bg-orange { background-color: rgb(0, 255, 64) !important; }
        .sf.in_scale.scale_root > .sfs { background-color: #FF05EF !important; }
    `);

})();

