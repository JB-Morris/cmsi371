/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl; // The WebGL context.

    // This variable stores 3D model information.
    var objectsToDraw;

    // The shader program to use.
    var shaderProgram;

    // Utility variable indicating whether some fatal has occurred.
    var abort = false;

    // Important state variables.
    var animationActive = false;
    var currentRotation = 0.0;
    var currentInterval;
    var modelViewMatrix;
    var projectionMatrix;

    var translateMatrix;
    var scaleMatrix;
    var orthoProjection;
    var perspectiveMatrix;
    var rotateMatrix;

    var vertexPosition;
    var vertexColor;

    // An individual "draw object" function.
    var drawObject;

    // The big "draw scene" function.
    var drawScene;

    // State and function for performing animation.
    var previousTimestamp;
    var advanceScene;

    // Reusable loop variables.
    var i;
    var maxi;
    var j;
    var maxj;

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.  Note how each object may come with a
    // rotation axis now.
    objectsToDraw = [
        // We move our original triangles a bit to accommodate a new addition
        // to the scene (yes, a translation will also do the trick, if it
        // where implemented in this program).

        // new Shape({
        //     color: { r: 1.0, g: 0.0, b: 0.0},
        //     specularColor: { r: 1.0, g: 1.0, b: 1.0},
        //     shininess: 16,
        //     vertices: new Shape(Shape.icosahedron()).toRawTriangleArray(),
        //     normals: new Shape(Shape.icosahedron()).toNormalArray(),
        //     mode: gl.TRIANGLES,
        //     translate: {x: 0.0, y: 0.0, z: 0.0},
        //     axis: {x: 0.0, y: 1.0,z: 1.0},
        //     rotateAngle: 0,
        //     scale: {x: 1, y: 1, z: 1},
        //     children: [new Shape({
        //         color: { r: 0.5, g: 0.5, b: 0.5},
        //         shininess: 16,
        //         specularColor: { r: 1.0, g: 1.0, b: 1.0},
        //         vertices: new Shape(Shape.cube()).toRawTriangleArray(),
        //         normals: new Shape(Shape.cube()).toNormalArray(),
        //         mode: gl.TRIANGLES,
        //         translate: {x: -3.0, y: 0.0, z: 0.0},
        //         axis: {x: 1.0, y: 1.0,z: 1.0},
        //         rotateAngle: 45,
        //         scale: {x: 1, y: 1, z: 1}

        //     })]

        // }),


        // new Shape({
        //     translate: {x: 0, y: 0, z: -10},
        //     axis: {x: 1.0, y: 1.0, z: 1.0},
        //     // rotateAngle: 0,
        //     scale: {x: 2.0, y: 2.0, z: 2.0},
        //     color: { r: 1.0, g: 0.0, b: 0.0},
        //     specularColor: { r: 1.0, g: 1.0, b: 1.0},
        //     shininess: 16,
        //     vertices: new Shape(Shape.icosahedron()).toRawTriangleArray(),
        //     normals: new Shape(Shape.icosahedron()).toNormalArray(),
        //     mode: gl.TRIANGLES,
        // }),

        new Shape({
            translate: {x: 0.0, y: 0.0, z: -10},
            axis: {x: 1.0, y: 1.0, z: 1.0},
            color: { r: 0.0, g: 0.5, b: 0.0 },
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            vertices: new Shape(Shape.cube()).toRawTriangleArray(),
            normals: new Shape(Shape.cube()).toNormalArray(),
            mode: gl.TRIANGLES,
            scale: {x: 1.0, y: 1.0, z: 1.0},
            children: [new Shape({
                translate: {x: 3, y: 0, z: 0},
                axis: {x: 1.0, y: 1.0, z: 1.0},
                rotateAngle: 0,
                color: { r: 1.0, g: 0.0, b: 0.0},
                vertices: new Shape(Shape.sphere()).toRawTriangleArray(),
                normals: new Shape(Shape.sphere()).toNormalArray(),
                mode: gl.TRIANGLES,
                children: [new Shape({
                    translate: {x: 0, y: 2, z: 0},
                    axis: {x: 1.0, y: 1.0, z: 1.0},
                    rotateAngle: 0,
                    color: { r: 1.0, g: 1.0, b: 0.0 },
                    vertices: new Shape(Shape.icosahedron()).toRawTriangleArray(),
                    normals: new Shape(Shape.icosahedron()).toNormalArray(),
                    mode: gl.TRIANGLES,
                    children: [new Shape({
                        translate: {x: -2, y: -1, z: 0},
                        axis: {x: 1.0, y: 1.0, z: 1.0},
                        rotateAngle: 0,
                        color: { r: 1.0, g: 0.0, b: 1.0 },
                        vertices: new Shape(Shape.cone()).toRawTriangleArray(),
                        normals: new Shape(Shape.cone()).toNormalArray(),
                        mode: gl.TRIANGLES,
                        shininess: 16
                    })]
                })]
            })]
        }),

        // new Shape({
        //     color: { r: 0.5, g: 0.5, b: 0.5},
        //     shininess: 16,
        //     specularColor: { r: 1.0, g: 1.0, b: 1.0},
        //     vertices: new Shape(Shape.cube()).toRawTriangleArray(),
        //     normals: new Shape(Shape.cube()).toNormalArray(),
        //     mode: gl.TRIANGLES,
        //     translate: {x: 0.0, y: 0.0, z: -10.0},
        //     axis: {x: 1.0, y: 1.0,z: 1.0},
        //     rotateAngle: 45,
        //     scale: {x: 1, y: 1, z: 1},

        // })

    ];

    // Pass the vertices to WebGL.
    var draw = function (objectsToDraw) {

        for (var i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {

            // console.log(objectsToDraw[i].vertices);
            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].vertices);

            if (!objectsToDraw[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                objectsToDraw[i].colors = [];
                for (var j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                        objectsToDraw[i].color.r,
                        objectsToDraw[i].color.g,
                        objectsToDraw[i].color.b
                    );
                }
            }
            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].colors);


                // Same trick with specular colors.
            if (!objectsToDraw[i].specularColors) {
                // Future refactor: helper function to convert a single value or
                // array into an array of copies of itself.
                objectsToDraw[i].specularColors = [];
                for (var j = 0, maxj = objectsToDraw[i].vertices.length / 3; j < maxj; j += 1) {
                    objectsToDraw[i].specularColors = objectsToDraw[i].specularColors.concat(
                        objectsToDraw[i].specularColor.r,
                        objectsToDraw[i].specularColor.g,
                        objectsToDraw[i].specularColor.b
                    );
                }
            }

            objectsToDraw[i].specularBuffer = GLSLUtilities.initVertexBuffer(gl, objectsToDraw[i].specularColors);

             // One more buffer: normals.
            objectsToDraw[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl, objectsToDraw[i].normals);



            if ((objectsToDraw[i].children.length > 0)) {
                draw(objectsToDraw[i].children);
            }
        }
    };

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    // vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    // gl.enableVertexAttribArray(vertexColor);
    var vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    var vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    var normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);


    // Finally, we come to the typical setup for transformation matrices:
    // model-view and projection, managed separately.
    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    
    translateMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
    scaleMatrix = gl.getUniformLocation(shaderProgram, "scaleMatrix");
    rotateMatrix = gl.getUniformLocation(shaderProgram, "rotateMatrix");

    orthoProjection = gl.getUniformLocation(shaderProgram, "orthoProjection");
    perspectiveMatrix = gl.getUniformLocation(shaderProgram, "perspectiveMatrix");

    // Note the additional variables.
    var lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    var lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    var lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    var shininess = gl.getUniformLocation(shaderProgram, "shininess");

    
    // gl.uniformMatrix4fv(scaleMatrix, gl.FALSE, new Float32Array(new Matrix().scale(1, 1, 1).conversion()));
    // gl.uniformMatrix4fv(translateMatrix, gl.FALSE, new Float32Array(new Matrix().translate(0, 0, 0).conversion()));
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Matrix().perspective(-4, 4, 2, -2, 5, 2000).conversion());
    

    /*
     * Displays an individual object, including a transformation that now varies
     * for each object drawn.
     */
    var addRotation = 0;
    drawObject = function (object, parentMatrix) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
        gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

        // Set the shininess.
        gl.uniform1f(shininess, object.shininess);

        var myMatrix = multiplyMatricies(object);
        
        if (parentMatrix) {
            myMatrix = parentMatrix.multiply(myMatrix);
        }else {
            if (!addRotation){
                addRotation = object.rotateAngle;
            }
            object.rotateAngle = currentRotation + addRotation;
        }

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(myMatrix.conversion()));
        // gl.uniformMatrix4fv(rotateMatrix, gl.FALSE, new Float32Array(new Matrix().rotate(object.rotateAngle, object.axis.x, object.axis.y, object.axis.z).conversion()));




        // Set the varying normal vectors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        if ((object.children.length > 0)) {
            for (var i = 0; i < object.children.length; i += 1) {
                drawObject(object.children[i], myMatrix);
            }
        }
    };

    multiplyMatricies = function (object) {
        return new Matrix().translate(object.translate.x, object.translate.y, object.translate.z).multiply(
            new Matrix().rotate(object.rotateAngle, object.axis.x, object.axis.y, object.axis.z)).multiply(
            new Matrix().scale(object.scale.x, object.scale.y, object.scale.z)) || new Matrix();
    };


    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // gl.uniformMatrix4fv(rotateMatrix, gl.FALSE, new Matrix().rotate(currentRotation, 1.0, 1.0, 1.0).conversion());

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            // if (objectsToDraw[i].children) {
            //     drawObject(objectsToDraw[i].children)
            // }

            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    draw(objectsToDraw);

    // Because our canvas element will not change size (in this program),
    // we can set up the projection matrix once, and leave it at that.
    // Note how this finally allows us to "see" a greater coordinate range.
    // We keep the vertical range fixed, but change the horizontal range
    // according to the aspect ratio of the canvas.  We can also expand
    // the z range now.


    // gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(new Matrix().orthoProjection(
    //     -2 * (canvas.width / canvas.height),
    //     2 * (canvas.width / canvas.height),
    //     -2,
    //     2,
    //     -10,
    //     10
    // ).conversion()));

    // Animation initialization/support.
    previousTimestamp = null;
    advanceScene = function (timestamp) {
        // Check if the user has turned things off.
        if (!animationActive) {
            return;
        }

        // Initialize the timestamp.
        if (!previousTimestamp) {
            previousTimestamp = timestamp;
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // Check if it's time to advance.
        var progress = timestamp - previousTimestamp;
        if (progress < 30) {
            // Do nothing if it's too soon.
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // All clear.
        currentRotation += 0.033 * progress;        
        drawScene();
        if (currentRotation >= 360.0) {
            currentRotation -= 360.0;
        }

        // Request the next frame.
        previousTimestamp = timestamp;
        window.requestAnimationFrame(advanceScene);
    };

    gl.uniform4fv(lightPosition, [500.0, 500.0, 100.0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightSpecular, [1.0, 1.0, 1.0]);



    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        animationActive = !animationActive;
        if (animationActive) {
            previousTimestamp = null;
            window.requestAnimationFrame(advanceScene);
        }
    });

}(document.getElementById("matrices-webgl")));
