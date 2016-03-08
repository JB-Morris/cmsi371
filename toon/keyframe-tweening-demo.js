/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas");

    // First, a selection of "drawing functions" from which we
    // can choose.  Their common trait: they all accept a single
    // renderingContext argument.
    var square = function (renderingContext) {
        renderingContext.fillStyle = "blue";
        renderingContext.fillRect(-20, -20, 40, 40);
    };

    var circle = function (renderingContext) {
        renderingContext.strokeStyle = "red";
        renderingContext.beginPath();
        renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
        renderingContext.stroke();
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
    }

    var legoBatman = function (spriteProperties) {
        SpriteLibrary.legoBatman({
            ctx: spriteProperties.ctx,
            leftArmRotation: spriteProperties.leftArmRotation,
            rightArmRotation: spriteProperties.rightArmRotation,
            leftLegStep: spriteProperties.leftLegStep,
            rightLegStep: spriteProperties.rightLegStep,
            capeWidth: spriteProperties.capeWidth,
            capeLength: spriteProperties.capeLength
        })
    }


    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    var sprites = [
        // {
        //     draw: square,
        //     keyframes: [
        //         {
        //             frame: 0,
        //             tx: 20,
        //             ty: 20,
        //             ease: KeyframeTweener.linear
        //         },

        //         {
        //             frame: 30,
        //             tx: 100,
        //             ty: 50,
        //             ease: KeyframeTweener.quadEaseInOut
        //         },

        //         // The last keyframe does not need an easing function.
        //         {
        //             frame: 80,
        //             tx: 80,
        //             ty: 500,
        //             rotate: 60 // Keyframe.rotate uses degrees.
        //         }
        //     ]
        // },

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
                
                // {
                //     frame: 175,
                //     sx: .1,
                //     sy: .1,
                //     tx: 50,
                //     ty: 200,
                //     rotate: -10,
                //     spriteSpecification: {
                //         ropeLength: 10000
                //     },
                //     ease: KeyframeTweener.quadEaseInOut
                // }

                
            ]

        },

        {
            draw: legoBatman,
            keyframes: [
                {
                    frame: 300,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: 800,
                    spriteSpecification: {
                        // leftArmRotation: 0,
                        // rightArmRotation: 0,
                        // leftLegStep: 0,
                        // rightLegStep: 0,
                        capeWidth: 1,
                        capeLength: 1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 310,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: 400,
                    spriteSpecification: {
                        // leftArmRotation: 0,
                        // rightArmRotation: 0,
                        // leftLegStep: 0,
                        // rightLegStep: 0,
                        capeWidth: 3,
                        capeLength: 1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 320,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: 200,
                    spriteSpecification: {
                        // leftArmRotation: 0,
                        // rightArmRotation: 0,
                        // leftLegStep: 0,
                        // rightLegStep: 0,
                        capeWidth: 1,
                        capeLength: 1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 400,
                    sx: .1,
                    sy: .1,
                    tx: 500,
                    ty: 200,
                    spriteSpecification: {
                        // leftArmRotation: 0,
                        // rightArmRotation: 0,
                        // leftLegStep: 0,
                        // rightLegStep: 0,
                        capeWidth: 3,
                        capeLength: 1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                },

            ]
        }  

        // {
        //     draw: circle,
        //     keyframes: [
        //         {
        //             frame: 50,
        //             tx: 300,
        //             ty: 600,
        //             sx: 0.5,
        //             sy: 0.5,
        //             ease: KeyframeTweener.quadEaseOut
        //         },

        //         {
        //             frame: 100,
        //             tx: 300,
        //             ty: 0,
        //             sx: 3,
        //             sy: 0.25,
        //             ease: KeyframeTweener.quadEaseOut
        //         },

        //         {
        //             frame: 150,
        //             tx: 300,
        //             ty: 600,
        //             sx: 0.5,
        //             sy: 0.5
        //         }
        //     ]
        // },
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
