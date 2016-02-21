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
    // var radialGradient = renderingContext.createRadialGradient(160, 160, 1, 180, 180, 320);
    window.SpriteLibrary = window.SpriteLibrary || { };

    
    function LegoPart(src) {
        this.image = new Image();
        this.image.src = src;
        this.loaded = false;
        var thisLegoPart = this
        this.image.addEventListener("load", function () {
            thisLegoPart.loaded = true;
        }, false);
    }

    var body = new LegoPart("../components/batman-body-front.png");
    var rightArm = new LegoPart("../components/batman-right-arm-front.png");
    var leftArm = new LegoPart("../components/batman-left-arm-front.png");
    var hip = new LegoPart("../components/batman-hip-front.png");
    var rightLeg = new LegoPart("../components/batman-right-leg-front.png");
    var leftLeg = new LegoPart("../components/batman-left-leg-front.png");
    var head = new LegoPart("../components/batman-front-head.png");
    var cape = new LegoPart("../components/batman-cape.png");


    var drawLegoBatman = function (ctx, leftArmRotation, rightArmRotation, leftLegStep, rightLegStep, capeWidth, capelength) {
        if (body.loaded && rightArm.loaded && leftArm.loaded && rightLeg.loaded && leftLeg.loaded && hip.loaded && head.loaded){
            ctx.save();
            ctx.translate(1550, 1600);
            ctx.scale(capeWidth, capelength);
            ctx.drawImage(cape.image, -1550, 0);
            ctx.restore();

            ctx.save();
            ctx.translate(850, 2850);
            ctx.scale(1, rightLegStep);       
            ctx.drawImage(rightLeg.image, 0, 0);
            ctx.restore();

            ctx.save();
            ctx.translate(1550, 2850);
            ctx.scale(1, leftLegStep);
            ctx.drawImage(leftLeg.image, 0, 0);
            ctx.restore();

            ctx.drawImage(hip.image, 900, 2700);
                    
            ctx.drawImage(body.image, 900, 1500);
            ctx.drawImage(head.image, 1000, 0);

            ctx.save();
            ctx.translate(450 + 650, 1750);
            ctx.rotate(-((Math.PI/180 * -rightArmRotation)));
            ctx.drawImage(rightArm.image, -650, -150);

            ctx.restore();

            ctx.save();
            ctx.translate(1950, 1750);
            ctx.rotate((Math.PI/180) * -leftArmRotation);
            ctx.drawImage(leftArm.image, 0, -150);
            ctx.restore();

        }

    }
    
    SpriteLibrary.legoBatman = function (batmanSpecification)  {
        var ctx = batmanSpecification.ctx;

        ctx.save()
        
        drawLegoBatman(ctx, batmanSpecification.leftArmRotation, batmanSpecification.rightArmRotation, batmanSpecification.leftLegStep, batmanSpecification.rightLegStep, batmanSpecification.capeWidth, batmanSpecification.capeLength);
        
        
        ctx.restore()
    };


}());