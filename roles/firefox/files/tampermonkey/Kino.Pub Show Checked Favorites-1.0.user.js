// ==UserScript==
// @name         Kino.Pub Show Checked Favorites
// @description  kinpub show favorites on top
// @namespace    http://tampermonkey.net/
// @version      1.0
// @match        https://kino.watch/item/view/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const titles = [...document.querySelectorAll('a.favorites-title')]
        .filter(a => a.querySelector('i.fa-check-square'))
        .map(a => a.textContent.trim());

    const titleDiv = document.querySelector('h1.iv-title-ru');

    if (titleDiv && titles.length) {
        const element = document.createElement('span');

        element.textContent = titles.join(', ');
        element.style.fontWeight = 'bold';
        element.style.background = 'red';
        element.style.color = 'white';
        element.style.marginLeft = '0px';
        element.style.padding = '4px 12px';
        element.style.borderRadius = '7px';
        titleDiv.after(element);
    }
})();
