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

        const titles = [
            ...document.querySelectorAll(
                'button.dropdown-item:has(i.bi-check-square)'
            )
        ].map(button => {
            const icon = button.querySelector('i');
            return button.textContent
                .replace(icon.textContent, '')
                .trim();
        });

    const chips = document.querySelector('.kp-chips');
    const lastChip = chips?.querySelector('.kp-chip:last-of-type');

    if (lastChip && titles.length) {
        titles.forEach(title => {
            const element = document.createElement('span');
            element.className = 'kp-chip';
            element.textContent = title;
            element.style.background = 'rgba(240, 41, 41, 0.1)';
            element.style.color = '#f02929';
            lastChip.after(element);
        });
    }
})();
