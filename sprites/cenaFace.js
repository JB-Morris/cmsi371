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

    
    function cenaHead(src) {
        this.image = new Image();
        this.image.src = src;
        this.loaded = false;
        var thisLegoPart = this;
        this.image.addEventListener("load", function () {
            thisLegoPart.loaded = true;
        }, false);
    }

    var head = new cenaHead("../components/JC52.png");
    
    var drawHead = function (ctx, spin) {
        if(head.loaded){
            ctx.save();
            ctx.translate(100, 100);
            ctx.rotate(Math.PI/180 * spin);
            ctx.drawImage(head.image, -100, -100);
            ctx.restore();
        }        
    }
    SpriteLibrary.cena = function (headSpecification)  {
        var ctx = headSpecification.ctx;
        var spin = headSpecification.spin || 0;
        drawHead(ctx, spin);
    };
}());