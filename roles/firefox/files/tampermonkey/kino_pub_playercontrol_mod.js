// ==UserScript==
// @name         Ремонт авто-скрытия UI для плеера KinoPub
// @description  Отредактируйте путь к своему персональному зеркалу KinoPub в настройках скрипта, замените my.kpub.com на свой домен
// @namespace    http://tampermonkey.net/
// @version      2026-02-13
// @author       yubm
// @match        https://kino.pub/item/view/*
// @match        https://h87l.cme.ovh/item/view/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kino.pub
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    // hide player center controls buttons
    const playercontrol_element = document.getElementById("desktopCenterControls");
    if (playercontrol_element) {
        playercontrol_element.style.display = 'none';
    }

    // добавляет обработчик на запуск видео
    function attachPlayListener(videoEl) {
        if (!videoEl) {
            return;
        }

        let playTimeout = null;

        const clearTimer = () => {
            if (playTimeout) {
                clearTimeout(playTimeout);
                playTimeout = null;
            }
        };

        videoEl.addEventListener('play', () => {
            clearTimer();

            playTimeout = setTimeout(() => {
                const shell = document.getElementsByClassName('player-shell')?.[0];
                shell?.classList?.add?.('ui-hidden');

                console.log('the player UI was auto hidden');
            }, 1000); // скрытие через 1 секунду после начала воспроизведения
        });

        videoEl.addEventListener('pause', clearTimer);
        videoEl.addEventListener('ended', clearTimer);
    }

    function isInsideMediaProvider(el) {
        return !!el.closest('media-provider');
    }

    // обрабатывает найденные <video>
    const processedVideos = new WeakSet();
    function handleVideo(videoEl) {
        if (processedVideos.has(videoEl)) return;
        if (!isInsideMediaProvider(videoEl)) return;

        processedVideos.add(videoEl);

        setTimeout(() => {
            attachPlayListener(videoEl);
        }, 100); // на всякий случай
    }

    function checkExisting() {
        const videos = document.getElementsByTagName('video');
        for (const video of videos) {
            handleVideo(video);
        }
    }

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (!(node instanceof HTMLElement)) continue;

                // если добавили сам <video>
                if (node.tagName?.toLowerCase() === 'video') {
                    handleVideo(node);
                }

                // если добавили контейнер с <video> внутри
                const nestedVideos = node.querySelectorAll?.('video');
                if (nestedVideos?.length) {
                    nestedVideos.forEach(handleVideo);
                }
            }
        }
    });

    function init() {
        checkExisting();

        // наблюдает за структурой страницы и добавляет обработчики на подгружаемые video
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    // гарантирует запуск init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    }
    else {
        init();
    }
})();
