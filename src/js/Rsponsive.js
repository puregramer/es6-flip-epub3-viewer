/***
 * file name : Responsive.js
 * description : Responsive Class
 * create date : 2018-06-20
 * creator : saltgamer
 ***/

export default class Responsive {
    constructor(target) {
        this.currentZoomRate = 0;
        this.target = target;
        this.baseContainer = {
            /* width: this.target.clientWidth,
             height: this.target.clientHeight*/
            width: target.contentWindow.document.body.scrollWidth,
            height: target.contentWindow.document.body.scrollHeight
        };
        this.scaledSize = null;

        /* this.target.style.position = 'absolute';
         this.target.style.padding = '0';
         this.target.style.margin = '0';*/

        this.update();
        this.setScaleElement();

        // window.addEventListener('resize', this._resize.bind(this), false);
        console.log('| -> target: ', target);
        console.log('| -> baseContainer: ', this.baseContainer);


    }

    update() {
        this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // console.log('-> response screenWidth: ', this.screenWidth);
        // console.log('-> response screenHeight: ', this.screenHeight);
    }

    setScaleElement() {
        console.log('--> setScaleElement... ');

        const displayValue = this.currentDisplay === 'single' ? 1 : 2;

        const zoomVertical = this.screenHeight / this.baseContainer.height,
            zoomHorizontal = this.screenWidth / (this.baseContainer.width * displayValue);

        if ((this.baseContainer.width * zoomVertical) * displayValue > this.screenWidth) {
            this.setTransformCSS(zoomHorizontal);
        } else {
            this.setTransformCSS(zoomVertical);
            // this.target.style.left = ((this.screenWidth - (this.baseContainer.width * zoomVertical)) / 2) + 'px';
        }

    }

    setTransformCSS(zoomRate) {
        this.currentZoomRate = zoomRate;

        /*  this.target.contentWindow.document.body.setAttribute('style', '-ms-transform: scale(' + zoomRate + ',' + zoomRate + ');'
              + '-webkit-transform: scale(' + zoomRate + ',' + zoomRate + ');' + 'transform: scale(' + zoomRate + ',' + zoomRate + ');'
              + 'transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;');*/

        const target = this.target.contentWindow.document.body;

        target.style.msTransform = 'scale(' + zoomRate + ', ' + zoomRate + ')';
        target.style.webkitTransform = 'scale(' + zoomRate + ', ' + zoomRate + ')';
        target.style.transform = 'scale(' + zoomRate + ', ' + zoomRate + ')';

        target.style.transformOrigin = '0% 0%';
        target.style.msTransformOrigin = '0% 0%';
        target.style.webkitTransformOrigin = '0% 0%';

        target.style.position = 'absolute';
        target.style.padding = '0';
        target.style.margin = '0';

        this.target.style.width = (this.baseContainer.width * zoomRate).toFixed(1) + 'px';
        this.target.style.height = (this.baseContainer.height * zoomRate).toFixed(1) + 'px';

       /* this.target.style.width = (this.baseContainer.width * zoomRate) + 'px';
        this.target.style.height = (this.baseContainer.height * zoomRate) + 'px';*/

        console.log('| -> target: ', this.target.style.width);

        if (this.baseContainer.width > 0) {
            this.scaledSize = {
                width: (this.baseContainer.width * zoomRate).toFixed(1),
                height: (this.baseContainer.height * zoomRate).toFixed(1)
                /* width: (this.baseContainer.width * zoomRate),
                height: (this.baseContainer.height * zoomRate)*/
            };
        }
    }

    resize(target) {
        this.target = target;
        this.update();
        this.setScaleElement();
    }

  /*  _resize() {
        this.update();
        this.setScaleElement();
    }
*/

}