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

    
    function Swinger(src) {
        this.image = new Image();
        this.image.src = src;
        this.loaded = false;
        var thisLegoPart = this;
        this.image.addEventListener("load", function () {
            thisLegoPart.loaded = true;
        }, false);
    }

    var batman = new Swinger("SwingingBatman.png");

    var drawSwinger = function (ctx, swing) {

        ctx.save();
        
        if (batman.loaded){
            ctx.drawImage(batman.image, 0, 0);
        }

        ctx.restore();

    }
    
    SpriteLibrary.SwingingBatman = function (swingerSpecification)  {
        var ctx = swingerSpecification.ctx;
        var percentTilt = swinger.swing || 0;
        drawSwinger(ctx, swing); 
        
    };


}());