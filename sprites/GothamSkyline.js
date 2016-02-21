/*
 * This template file is meant to be a template for canvas-based
 * web page code.  Nothing here is set in stone; it is mainly
 * intended to save you some typing.
 */
// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
(function () {
    // Ditto on using jQuery here.


    // Declare other variables here.
    window.SpriteLibrary = window.SpriteLibrary || { };

    
    function Buildings(src) {
        this.image = new Image();
        this.image.src = src;
        this.loaded = false;
        var thisLegoPart = this;
        this.image.addEventListener("load", function () {
            thisLegoPart.loaded = true;
        }, false);
    }

    var foreground = new Buildings("../components/gothamSkyline.png");
    var background = new Buildings("../components/skylineFront.png");
    var framingBuilding = new Buildings("../components/framingBuilding.svg");

    var drawCity = function (ctx, percentTilt, percentPan) {
        
        if(!(0 <= percentTilt && percentTilt <= 100 && -100 <= percentPan && percentPan <= 100)){
            console.log("percentTiltmust be a value between 0 and 100 and percent pan must be a value between -100 and 100");
            if (percentTilt > 100){
                percentTilt = 100;
            }else if(percentTilt < 0){
                percentTilt = 0;
            }else if(percentPan > 100){
                percentPan = 0;
            }else if(percentPan < -100){
                percentPan = -100;
            }
        }

        var tiltY = percentTilt * 1.9;
        var panX = percentPan * .9
        ctx.save();
        if (foreground.loaded && background.loaded){
            ctx.drawImage(background.image, panX + 100, -tiltY - 100);
            ctx.drawImage(foreground.image, 240, 0);
            ctx.drawImage(framingBuilding.image, 1.15*(-panX) - 20, -500 + tiltY);
        }
        ctx.restore();
    }
    SpriteLibrary.gothamSkyline = function (citySpecification)  {
        var ctx = citySpecification.ctx;
        var percentTilt = citySpecification.percentTilt || 0;
        var percentPan = citySpecification.percentPan || 0;
        drawCity(ctx, percentTilt, percentPan);

    };
}());