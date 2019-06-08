/***
 * file name : Resize.js
 * description : Resize Class
 * create date : 2018-07-30
 * creator : saltgamer
 ***/
import {$qsa} from './utility';
import {applyStyle} from "./core";

export default class Resize {
    constructor(epub, target) {
        this.epub = epub;
        this.target = target;

        window.addEventListener('resize', (e) => {
            e.preventDefault();

            console.log('| -> resize!');
            this.update();
            this.setScale();
            this.resizeContentsFrame();
            this.setScale();


        }, false);

    }

    update() {
        this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        console.log('-> resize screenWidth: ', this.screenWidth);
        console.log('-> resize screenHeight: ', this.screenHeight);
    }

    setScale() {
        console.log('| -> target clientWidth: ', this.target.clientWidth);
        // console.log('| -> target width: ', this.target.style.width);

        const zoomVertical = this.screenHeight / this.target.clientHeight,
            zoomHorizontal = this.screenWidth / this.target.clientWidth;

        if (this.target.clientWidth * zoomVertical > this.screenWidth) {
            this.setTransformCSS(zoomHorizontal);
        } else {
            this.setTransformCSS(zoomVertical);
        }


    }

    setTransformCSS(zoomRate) {
        const target = this.target;

        console.log('| -> resize zoomRate: ', zoomRate);

        this.target.style.width = (target.clientWidth * zoomRate) + 'px';
        this.target.style.height = (target.clientHeight * zoomRate) + 'px';

        target.style.left = ((this.screenWidth - (target.clientWidth * zoomRate)) / 2) + 'px';

        let top = (this.screenHeight - (target.clientHeight * zoomRate)) / 2;
        if (top <= 0) top = 0;
        target.style.top = top + 'px';

        console.log('| -> resize left: ', target.style.left);
        console.log('| -> resize top: ', target.style.top);


    }

    resizeContentsFrame() {
        console.log('| -> resizeContentsFrame!');

        const contentsFrames = $qsa('.contentsFrame');
       /* contentsFrames.forEach((frame) => {
            this.epub.responsive.resize(frame);
        });*/

       for (let i = 0; i < contentsFrames.length; i++) {
           this.epub.responsive.resize(contentsFrames[i]);

           const frameParent = contentsFrames[i].parentNode;
           applyStyle(frameParent, {
               width: contentsFrames[i].style.width,
               height: contentsFrames[i].style.height
           });
       }

    }

}