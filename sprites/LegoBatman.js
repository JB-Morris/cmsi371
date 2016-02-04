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

    var body = new LegoPart("batman-body-front.png");
    var rightArm = new LegoPart("batman-right-arm-front.png");
    var leftArm = new LegoPart("batman-left-arm-front.png");
    var hip = new LegoPart("batman-hip-front.png");
    var rightLeg = new LegoPart("batman-right-leg-front.png");
    var leftLeg = new LegoPart("batman-left-leg-front.png");
    var head = new LegoPart("batman-front-head.png");
    var cape = new LegoPart("batman-cape.png");


    
    SpriteLibrary.legoBatman = function (batmanSpecification)  {
        // headTilt, rightArmROtation, leftArmRotation, rightLegStep, leftLegStep
        var ctx = batmanSpecification.ctx;

        ctx.save()
        // ctx.fillRect(100,100,3,3);
        // ctx.fill();
        console.log(body.loaded && rightArm.loaded && leftArm.loaded && rightLeg.loaded && leftLeg.loaded && hip.loaded && head.loaded);
        // console.log(legoBodyLoaded && legoRightArmLoaded && legoLeftArmLoaded && legoRightLegLoaded && legoLeftLegLoaded && legoHipLoaded && legoHeadLoaded);
        if (body.loaded && rightArm.loaded && leftArm.loaded && rightLeg.loaded && leftLeg.loaded && hip.loaded && head.loaded){
            ctx.drawImage(cape.image, 0, 1500);

            ctx.drawImage(rightLeg.image, 850, 2850);
            ctx.drawImage(leftLeg.image, 1550, 2850);

            ctx.drawImage(hip.image, 900, 2700);

            

            ctx.drawImage(body.image, 900, 1500);
            ctx.drawImage(head.image, 1000, 0);

            ctx.drawImage(rightArm.image, 450, 1600);
            ctx.drawImage(leftArm.image, 1950, 1600);

            // ctx.drawImage(testImage, 100, 100);
        }
        ctx.restore()
    };


}());