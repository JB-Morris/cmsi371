/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas");

    // First, a selection of "drawing functions" from which we
    // can choose.  Their common trait: they all accept a single
    // renderingContext argument.

    var transitionBlack = function (spriteProperties) {
        spriteProperties.ctx.fillStyle = "black"
        spriteProperties.ctx.fillRect(0, 0, 400, 400);
    };

    var skyline = function (spriteProperties) {
        SpriteLibrary.gothamSkyline({
            ctx: spriteProperties.ctx,
            percentTilt: spriteProperties.percentTilt,
            percentPan: spriteProperties.percentPan
        });
    };

    var swingingBatman = function (spriteProperties) {
        SpriteLibrary.swingingBatman({
          ctx: spriteProperties.ctx,
          swing: spriteProperties.swing,
          ropeLength: spriteProperties.ropeLength
        });
    };

    var legoBatman = function (spriteProperties) {
        SpriteLibrary.legoBatman({
            ctx: spriteProperties.ctx,
            leftArmRotation: spriteProperties.leftArmRotation,
            rightArmRotation: spriteProperties.rightArmRotation,
            leftLegStep: spriteProperties.leftLegStep,
            rightLegStep: spriteProperties.rightLegStep,
            capeWidth: spriteProperties.capeWidth,
            capeLength: spriteProperties.capeLength
        });
    };

    var alleyway = function (spriteProperties) {
        SpriteLibrary.alleyway({
            ctx: spriteProperties.ctx
        });
    };

    

    

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    var sprites = [

        {
            draw: skyline,
            keyframes: [
                {
                    frame: 0,
                    sx: .7,
                    sy: .7,
                    tx: -290,
                    ty: 450,
                    spriteSpecification: {
                        percentPan: 100,
                        percentTilt: 75
                    },
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 100,
                    sx: .7,
                    sy: .7,
                    tx: -190,
                    ty: 450,
                    spriteSpecification: {
                        percentPan: 50,
                        percentTilt: 0
                    },
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 300,
                    sx: .7,
                    sy: .7,
                    tx: 10,
                    ty: 450,
                    spriteSpecification: {
                        percentPan: 0,
                        percentTilt: 0
                    },
                    ease: KeyframeTweener.quadEaseOut
                }
            ]    
        }, 

        {
            draw: swingingBatman,
            keyframes: [
                {
                    frame: 195,
                    sx: .1,
                    sy: .1,
                    tx: -10,
                    ty: 50,
                    rotate: 90,
                    spriteSpecification: {
                        ropeLength: 10
                    },
                    ease: KeyframeTweener.quadEaseIn
                },

                {
                    frame: 250,
                    sx: .1,
                    sy: .1,
                    tx: -10,
                    ty: 100,
                    rotate: -10,
                    spriteSpecification: {
                        ropeLength: 2000
                    },
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 260,
                    sx: .1,
                    sy: .1,
                    tx: 50,
                    ty: 200,
                    rotate: -20,
                    spriteSpecification: {
                        ropeLength: 7000
                    },
                    ease: KeyframeTweener.quadEaseOut
                },

            ]

        },

        

        {
            draw: alleyway,
            keyframes: [

                {
                    frame: 270,
                    sx: .7,
                    sy: .7,
                    tx: 0,
                    ty: 900,
                },

                {
                    frame: 300,
                    sx: .7,
                    sy: .7,
                    tx: 0,
                    ty: 750,
                    ease: KeyframeTweener.quadEaseIn
                },

                {
                    frame: 310,
                    sx: .7,
                    sy: .7,
                    tx: 0,
                    ty: 0
                },

                {
                    frame: 410,
                    sx: .7,
                    sy: .7,
                    tx: 0,
                    ty: 0

                },

                {
                    frame: 510,
                    sx: .7,
                    sy: .7,
                    tx: 0,
                    ty: 0

                },                


            ]

        },

        {
            draw: legoBatman,
            keyframes: [

                {
                    frame: 260,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: -2000,
                    spriteSpecification: {
                        leftArmRotation: 60,
                        rightArmRotation: 60,
                        leftLegStep: .6,
                        rightLegStep: 1,
                        capeWidth: 2,
                        capeLength: -1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },
                {
                    frame: 300,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: -200,
                    spriteSpecification: {
                        leftArmRotation: 60,
                        rightArmRotation: 60,
                        leftLegStep: .6,
                        rightLegStep: 1,
                        capeWidth: 2,
                        capeLength: -1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 305,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: -100,
                    spriteSpecification: {
                        leftArmRotation: 60,
                        rightArmRotation: 60,
                        leftLegStep: .6,
                        rightLegStep: 1,
                        capeWidth: 1,
                        capeLength: -1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 310,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: 0,
                    spriteSpecification: {
                        leftArmRotation: 60,
                        rightArmRotation: 60,
                        leftLegStep: .6,
                        rightLegStep: 1,
                        capeWidth: 2,
                        capeLength: -1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 315,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: 100,
                    spriteSpecification: {
                        leftArmRotation: 60,
                        rightArmRotation: 60,
                        leftLegStep: .6,
                        rightLegStep: 1,
                        capeWidth: 1,
                        capeLength: -1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 415,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: 200,
                    spriteSpecification: {
                        leftArmRotation: 60,
                        rightArmRotation: 60,
                        leftLegStep: .6,
                        rightLegStep: 1,
                        capeWidth: 2,
                        capeLength: -1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 420,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: 300,
                    spriteSpecification: {
                        leftArmRotation: 0,
                        rightArmRotation: 0,
                        leftLegStep: 1,
                        rightLegStep: 1,
                        capeWidth: 2,
                        capeLength: 1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },


                {
                    frame: 435,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: 300,
                    spriteSpecification: {
                        leftArmRotation: 0,
                        rightArmRotation: 0,
                        leftLegStep: 1,
                        rightLegStep: 1,
                        capeWidth: 1,
                        capeLength: 1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },

            ]
        },

        {
            draw: transitionBlack,
            keyframes: [
                {
                    frame: 260,
                    sx: 5,
                    sy: 5,
                    tx: 0,
                    ty: 1000,
                    ease: KeyframeTweener.quadEaseIn
                },

                {
                    frame: 270,
                    sx: 5,
                    sy: 5,
                    tx: 0,
                    ty: -4000,
                    ease: KeyframeTweener.quadEaseIn
                }               
            ]
        },  
    ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites
    });
}());
