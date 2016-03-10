/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */


document.getElementById("theme").addEventListener("onload", function () {
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

    var nightSky = function (spriteProperties) {
        SpriteLibrary.skyBackdrop({
            ctx: spriteProperties.ctx
        });
    };

    var dondi = function (spriteProperties) {
        SpriteLibrary.dondi({
            ctx: spriteProperties.ctx,
            open: spriteProperties.open,
            quiver: spriteProperties.quiver
        });
    };

    var cena = function (spriteProperties) {
        SpriteLibrary.cena({
            ctx: spriteProperties.ctx,
            spin: spriteProperties.spin
        });
    };

    var cenaPunch = function (spriteProperties) {
        SpriteLibrary.cenaPunch({
            ctx: spriteProperties.ctx,
        });
    };

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    var sprites = [

        {
            draw: nightSky,
            keyframes: [
                {
                    frame: 0,
                    sx: 1,
                    sy: 1,
                    tx: 0,
                    ty: 0,
                },

                {
                    frame: 1000,
                    sx: 1,
                    sy: 1,
                    tx: 0,
                    ty: 0,
                }                 
            ]
        },

        {
            draw: skyline,
            keyframes: [
                {
                    frame: 1,
                    sx: .7,
                    sy: .7,
                    tx: -290,
                    ty: 450,
                    spriteSpecification:{
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
                    frame: 265,
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
                }

            ]

        },
    

        {
            draw: alleyway,
            keyframes: [

                {
                    frame: 270,
                    sx: 1.5,
                    sy: 1.5,
                    tx: -500,
                    ty: 900,
                },

                {
                    frame: 300,
                    sx: 1.5,
                    sy: 1.5,
                    tx: -500,
                    ty: 750,
                    ease: KeyframeTweener.quadEaseIn
                },

                {
                    frame: 315,
                    sx: 1.5,
                    sy: 1.5,
                    tx: -500,
                    ty: 0
                },

                {
                    frame: 415,
                    sx: 1.5,
                    sy: 1.5,
                    tx: -500,
                    ty: -725

                },

                {
                    frame: 420,
                    sx: 1.5,
                    sy: 1.5,
                    tx: -500,
                    ty: -730

                }, 

                {
                    frame: 520,
                    sx: 1.5,
                    sy: 1.5,
                    tx: -500,
                    ty: -730

                }             
            ]
        },

        {
            draw: legoBatman,
            keyframes: [

                {
                    frame: 260,
                    sx: .08,
                    sy: .08,
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
                    sx: .08,
                    sy: .08,
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
                    sx: .08,
                    sy: .08,
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
                    sx: .08,
                    sy: .08,
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
                    sx: .08,
                    sy: .08,
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
                    sx: .08,
                    sy: .08,
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
                    sx: .08,
                    sy: .08,
                    tx: 500,
                    ty: 400,
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
                    sx: .08,
                    sy: .08,
                    tx: 500,
                    ty: 400,
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

                {
                    frame: 535,
                    sx: .08,
                    sy: .08,
                    tx: 500,
                    ty: 400,
                    spriteSpecification: {
                        leftArmRotation: 0,
                        rightArmRotation: 0,
                        leftLegStep: 1,
                        rightLegStep: 1,
                        capeWidth: 1,
                        capeLength: 1
                    },
                    ease: KeyframeTweener.quadEaseInOut
                }

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

        {
            draw: cena,
            keyframes: [

                {
                    frame: 445 + 0,
                    sx: 1,
                    sy: 1,
                    tx: 500,
                    ty: -200,
                    spriteSpecification: {
                        spin: 0
                    }
                },
                {
                    frame: 445 + 50,
                    sx: 1,
                    sy: 1,
                    tx: 500,
                    ty: 800,
                    spriteSpecification: {
                        spin: 2000
                    } 

                }
            ]
        },

        {
            draw: cena,
            keyframes: [

                {
                    frame: 445 + 10,
                    sx: 1,
                    sy: 1,
                    tx: 200,
                    ty: -200,
                    spriteSpecification: {
                        spin: 445 + 0
                    }
                },
                {
                    frame: 445 + 75,
                    sx: 1,
                    sy: 1,
                    tx: 200,
                    ty: 800,
                    spriteSpecification: {
                        spin: 2000
                    } 

                }
            ]
        },

        {
            draw: cena,
            keyframes: [

                {
                    frame: 445 + 30,
                    sx: 1,
                    sy: 1,
                    tx: 900,
                    ty: -200,
                    spriteSpecification: {
                        spin: 0
                    }
                },
                {
                    frame: 445 + 60,
                    sx: 1,
                    sy: 1,
                    tx: 900,
                    ty: 800,
                    spriteSpecification: {
                        spin: 1700
                    } 

                }
            ]
        },

        {
            draw: cena,
            keyframes: [

                {
                    frame: 445 + 30,
                    sx: 1,
                    sy: 1,
                    tx: 200,
                    ty: -200,
                    spriteSpecification: {
                        spin: 0
                    }
                },
                {
                    frame: 445 + 60,
                    sx: 1,
                    sy: 1,
                    tx: 200,
                    ty: 800,
                    spriteSpecification: {
                        spin: 1700
                    } 

                }
            ]
        },

        {
            draw: cena,
            keyframes: [

                {
                    frame: 445 + 40,
                    sx: 1,
                    sy: 1,
                    tx: 400,
                    ty: -200,
                    spriteSpecification: {
                        spin: 0
                    }
                },
                {
                    frame: 445 + 70,
                    sx: 1,
                    sy: 1,
                    tx: 400,
                    ty: 800,
                    spriteSpecification: {
                        spin: 1700
                    } 

                }
            ]
        },

        {
            draw: cenaPunch,
            keyframes: [
                {
                    frame: 445 - 10,
                    sx: .2,
                    sy: .2,
                    tx: 450,
                    ty: 700
                },

                {
                    frame: 445 - 0,
                    sx: .2,
                    sy: .2,
                    tx: 450,
                    ty: 600
                },

                {
                    frame: 445 + 50,
                    sx: .2,
                    sy: .2,
                    tx: 450,
                    ty: 600,
                    ease: KeyframeTweener.quinticEaseOut
                }, 

                {
                    frame: 445 + 55,
                    sx: .4,
                    sy: .4,
                    tx: 400,
                    ty: 425,
                    ease: KeyframeTweener.quinticEaseOut
                },

                {
                    frame: 445 + 100,
                    sx: .4,
                    sy: .4,
                    tx: 400,
                    ty: 425,
                    ease: KeyframeTweener.quinticEaseOut
                },               
            ]
        },

        {
            draw: dondi,
            keyframes: [
                
                {
                    frame: 445 -10,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 700,
                    spriteSpecification: {
                        open: 0,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },


                {
                    frame: 445 + 0,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 0,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },
                {
                    frame: 445 + 10,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 0,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },

                {
                    frame: 445 + 13,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 20,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },
                {
                    frame: 445 + 15,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 0,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },
                {
                    frame: 445 + 18,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 20,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },
                {
                    frame: 445 + 20,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 0,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },

                {
                    frame: 445 + 23,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 20,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },

                {
                    frame: 445 + 25,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 0,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },

                {
                    frame: 445 + 27,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 20,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },

                {
                    frame: 445 + 30,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 0,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },

                {
                    frame: 445 + 35,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 20,
                        quiver: 100
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },

                {
                    frame: 445 + 40,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 0,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },
                {
                    frame: 445 + 45,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 20,
                        quiver: 100
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },

                {
                    frame: 445 + 50,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 0,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },
                {
                    frame: 445 + 70,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 500,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },

                {
                    frame: 445 + 100,
                    sx: 5,
                    sy: 5,
                    tx: 200,
                    ty: 200,
                    spriteSpecification: {
                        open: 500,
                        quiver: 0
                    },
                    ease: KeyframeTweener.quinticEaseOut
                },

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
