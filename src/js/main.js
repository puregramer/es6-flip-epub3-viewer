/***
 * file name : main.js
 * description : project Paper entry file
 * create date : 2018-06-28
 * creator : saltgamer
 ***/
import Loading from './Loading';
// import Core from './core/Core';
import Epub from './epub/Epub';
import '../css/normalize.css';
import '../css/projectPaper.css';
import {$qs, getURLParameter, removePolyfill} from './utility';
import UI from "./ui/UI";
import Paper from './core/Paper';

function main(display, page) {
    Loading.show();

    const epub = new Epub();

    epub.loadContainerXmlObject()
        .then(() => {
            epub.loadContentOpf()
                .then(() => {
                    console.log('| -> step1');
                    const projectPaper = $qs('#projectPaper');

                    /*  const core = new Core(epub, {
                          target: projectPaper,
                          page: 1,
                          pagesInDOM: 6,
                          display: 'double'
                      });*/

                    const paper = new Paper(epub, {
                        target: projectPaper,
                        page: page,
                        pagesInDOM: 6,
                        display: display,
                        acceleration: true
                    });

                    console.log('| -> paper: ', paper);
                    const ui = new UI(document.body, paper);
                    console.log('| -> ui: ', ui);


                });
        });

}

document.addEventListener('DOMContentLoaded', () => {

    let display = getURLParameter('display'),
        page = parseInt(getURLParameter('page'), 10);

    if (!display) display = 'double';
    if (!page) page = 1;

    removePolyfill();

    main(display, page);
});

