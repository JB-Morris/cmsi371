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

    
    function FacePart(src) {
        this.image = new Image();
        this.image.src = src;
        this.loaded = false;
        var thisLegoPart = this;
        this.image.addEventListener("load", function () {
            thisLegoPart.loaded = true;
        }, false);
    }

    var bottom = new FacePart("../components/dondiLowerJaw.png");
    var top = new FacePart("../components/dondiTopHead.png");
    
    var drawFace = function (ctx, open, quiver) {
        ctx.save();
        if(top.loaded && bottom.loaded){
            ctx.save();
            ctx.drawImage(top.image, Math.sin(quiver), -open);
            ctx.restore();
            ctx.drawImage(bottom.image, 0, 0);
        }        
        ctx.restore();
    }
    SpriteLibrary.dondi = function (faceSpecification)  {
        var ctx = faceSpecification.ctx;
        var open = faceSpecification.open || 0;
        var quiver = faceSpecification.quiver || 5;
        drawFace(ctx, open, quiver);
    };
}());