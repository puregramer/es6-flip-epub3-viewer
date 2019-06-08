/***
 * file name : Notice.js
 * description : Notice Class
 * create date : 2018-07-27
 * creator : saltgamer
 ***/
import {$qs} from './utility';
import '../css/Notice.css';
import DOMBuilder from './utility/DOMBuilder';
import {initAniDom} from './aniDom/AniDom';

export default class Notice {
    constructor() {
        throw new Error('--> This is static class. Creating instances is forbidden.');
    }

    static append(params) {
        Notice.remove();

        const noticeBox = DOMBuilder.createElement('div', {
            attrs: {
                id: 'noticeBox'
            },
            parent: document.body
        });

        const noticeCell = DOMBuilder.createElement('div', {
            attrs: {
                class: 'noticeCell'
            },
            parent: noticeBox
        });

        const noticeBody = DOMBuilder.createElement('div', {
            attrs: {
                class: 'noticeBody'
            },
            parent: noticeCell
        });

        const noticeTitle = DOMBuilder.createElement('div', {
            attrs: {
                class: 'noticeTitle'
            },
            text: params.title,
            parent: noticeBody
        });

        const noticeBodyText = DOMBuilder.createElement('div', {
            attrs: {
                class: 'noticeBodyText'
            },
            text: params.bodyText,
            parent: noticeBody
        });
       /* const brCount = Notice.getBrCount(params.bodyText);
        if (brCount) noticeBodyText.style.lineHeight = (brCount.length * 22) + 'px';*/
        if (params.bodyText.indexOf('br') !== -1) {
            noticeBodyText.style.lineHeight = 22 + 'px';
        }


        const noticeButton = DOMBuilder.createElement('div', {
            attrs: {
                class: 'noticeButton'
            },
            text: params.buttonText,
            parent: noticeBody
        });
        noticeButton.addEventListener('click', params.clickEvent, false);

        if (params.callBack) params.callBack();

    }

    static remove() {
        const noticeBox = $qs('#noticeBox');
        if (noticeBox) document.body.removeChild(noticeBox);
    }

    static show(params) {
        Notice.append(params);

        const noticeAni = initAniDom({
            direction: 'normal',
        });
        const noticeBody = $qs('.noticeBody');
        noticeAni.add({
            targets: noticeBody,
            rotate: 0,
            scale: 0,
            opacity: 0,
            duration: 0
        })
            .add({
                targets: noticeBody,
                rotate: 360,
                scale: 1,
                opacity: 1,
                duration: 2000
            });

    }

    static hide() {
        const noticeAni = initAniDom({
            direction: 'normal',
            easing: 'linear'
        });

        noticeAni.add({
            targets: $qs('.noticeBody'),
            rotate: 0,
            scale: 0,
            opacity: 0,
            duration: 300,
            complete: () => {
                $qs('#noticeBox').style.display = 'none';
            }
        });


    }

    static macro(index) {

        switch (index) {
            case 1:
                Notice.show({
                    bodyText: '입력한 페이지가 존재하지 않아 <br> 첫번째 페이지로 이동되었습니다.',
                    buttonText: '확 인',
                    clickEvent: (e) => {
                        e.preventDefault();
                        Notice.hide();

                    }
                });
                break;

        }

    }

    /*static getBrCount(text) {
        return text.match(/br/ig);
        // console.log('| -> brCount: ', brCount);
    }
*/
}