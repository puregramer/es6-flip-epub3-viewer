/***
 * file name : Loading.js
 * description : Loading Class
 * create date : 2018-06-20
 * creator : saltgamer
 ***/
import DOMBuilder from './utility/DOMBuilder';
import {$qs} from './utility';

import '../css/Loading.css';

export default class Loading {
    constructor() {
        throw new Error('--> This is static class. Creating instances is forbidden.');
    }

    static show() {

        const loadingElement = $qs('.loadingContainer');
        if (loadingElement) {
            loadingElement.style.display = 'block';
        } else {
            const loadingContainer = DOMBuilder.createElement('div', {
                attrs: {
                    class: 'loadingContainer'
                },
                parent: document.body
            });

            const loadingMask = DOMBuilder.createElement('div', {
                attrs: {
                    class: 'loadingMask'
                },
                parent: loadingContainer
            });

            Loading.appendBarIcons(loadingContainer);
        }

    }

    static hide() {
        const loadingElement = $qs('.loadingContainer');
        if (loadingElement) {
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 300);

        }
    }

    static appendBarIcons(target) {
        const loadingBarBox = DOMBuilder.createElement('div', {
            attrs: {
                class: 'loadingBarBox'
            },
            parent: target
        });

        for (let i = 0; i < 5; i++) {
            const iconBar = DOMBuilder.createElement('div', {
                attrs: {
                    class: 'loadingIconBar barIcon' + (i + 1)
                },
                parent: loadingBarBox
            });
            const blinkNode = DOMBuilder.createTextNode(' ', loadingBarBox);
        }


    }
}