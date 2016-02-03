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

    var legoBody = new Image();
    var legoRightArm = new Image();
    var legoLeftArm = new Image();
    var legoHip = new Image();
    var legoRightLeg = new Image();
    var legoLeftLeg = new Image();
    var legoHead = new Image();
    var legoCape = new Image();

    var testImage = new Image();

    var legoBodyLoaded = false;
    var legoRightArmLoaded = false;
    var legoLeftArmLoaded = false;
    var legoRightLegLoaded = false;
    var legoLeftLegLoaded = false;
    var legoHipLoaded = false;
    var legoHeadLoaded = false;
    var legoCapeLoaded = false;

    legoBody.addEventListener("load", function () {
        legoBodyLoaded = true;
    }, false);

    legoRightArm.addEventListener("load", function () {
        legoRightArmLoaded = true;
    }, false);
    legoLeftArm.addEventListener("load", function () {
        legoLeftArmLoaded = true;
    }, false);
    legoRightLeg.addEventListener("load", function () {
        legoRightLegLoaded = true;
    }, false);
    legoLeftLeg.addEventListener("load", function () {
        legoLeftLegLoaded = true;
    }, false);
    legoHip.addEventListener("load", function () {
        legoHipLoaded = true;
    }, false);
    legoHead.addEventListener("load", function () {
        legoHeadLoaded = true;
    }, false);
    legoCape.addEventListener("load", function () {
        legoCapeLoaded = true;
    }, false);

 
 
    legoBody.src = "images/batman-body-front.png";
    legoRightArm.src = "images/batman-right-arm-front.png";
    legoLeftArm.src = "images/batman-left-arm-front.png";
    legoRightLeg.src = "images/batman-right-leg-front.png";
    legoLeftLeg.src = "images/batman-left-leg-front.png";
    legoHip.src = "images/batman-hip-front.png";
    legoHead.src = "images/batman-front-head.png";
    legoCape.src = "images/batman-cape.png";

    testImage.src = "llama.jpg"

    
    SpriteLibrary.legoBatman = function ()  {
        // headTilt, rightArmROtation, leftArmRotation, rightLegStep, leftLegStep
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        // ctx.save()
        // ctx.fillRect(100,100,3,3);
        // ctx.fill();
        console.log(legoBodyLoaded && legoRightArmLoaded && legoLeftArmLoaded && legoRightLegLoaded && legoLeftLegLoaded && legoHipLoaded && legoHeadLoaded);
        if(legoBodyLoaded && legoRightArmLoaded && legoLeftArmLoaded && legoRightLegLoaded && legoLeftLegLoaded && legoHipLoaded && legoHeadLoaded){
            ctx.drawImage(legoCape, 100, 100);
            // ctx.drawImage(legoRightLeg, 100, 100);
            // ctx.drawImage(legoLeftLeg, 100, 100);
            // ctx.drawImage(legoHip, 100, 100);
            // ctx.drawImage(legoRightArm, 100, 100);
            // ctx.drawImage(legoLeftArm, 100, 100);
            // ctx.drawImage(legoBody, 100, 100);
            // ctx.drawImage(legoHead, 100, 100);

            // ctx.drawImage(testImage, 100, 100);
    }
        // ctx.restore()
    };

    






    // Put your canvas drawing code (and any other code) here.
    // radialGradient.addColorStop(0, "white");
    // radialGradient.addColorStop(1, "blue");


    // renderingContext.fillStyle = radialGradient;
    // renderingContext.beginPath();
    // renderingContext.arc(256, 256, 200, 0, Math.PI * 2, true);
    // renderingContext.fill();
}());