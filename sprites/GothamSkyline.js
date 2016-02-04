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

    var foreground = new Buildings("gothamSkyline.png");
    var background = new Buildings("skylineFront.png");

    var drawCity = function (ctx, percentTilt) {
        
        if(!(0 <= percentTilt && percentTilt <= 100)){
            console.log("percentTilt must be a value between 0 and 100.");
            if (percentTilt > 100){
                percentTilt = 100;
            }else {
                percentTilt = 0;
            }
        }
        var bgY = percentTilt * 1.9;


        ctx.save();
        
        if (foreground.loaded && background.loaded){
            ctx.drawImage(background.image, 0, -bgY);
            ctx.drawImage(foreground.image, 0, 0);
        }

        ctx.restore();

    }
    
    SpriteLibrary.gothamSkyline = function (citySpecification)  {
        var ctx = citySpecification.ctx;
        var percentTilt = citySpecification.percentTilt || 0;

        drawCity(ctx, percentTilt); 
        
    };


}());