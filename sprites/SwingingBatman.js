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

    var drawSwinger = function (ctx, swing, ropeLength) {
        var swingAngle = (Math.PI/180)*swing || 0;
        var rl = ropeLength || 0;

        ctx.save();

        if (batman.loaded){
            // console.log("drawSwinger");
            ctx.rotate(swingAngle);
            ctx.drawImage(batman.image, rl - 300, rl);
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(rl + 1150 , rl + 1125);
            ctx.lineWidth = 3;
            ctx.stroke();

        }

        ctx.restore();
    }
    SpriteLibrary.swingingBatman = function (swingerSpecification)  {
        var ctx = swingerSpecification.ctx;
        var swing = swingerSpecification.swing || 0;
        var ropeLength = swingerSpecification.ropeLength || 0;
        drawSwinger(ctx, swing, ropeLength);   
    };
}());