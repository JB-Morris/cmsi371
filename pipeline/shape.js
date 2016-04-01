var Shape = (function () {

	// window.shape = window.shape || {};

	shape = function (shapeParameters) {
		this.x = shapeParameters.x || 0;
		this.y = shapeParameters.y || 0;
		this.z = shapeParameters.z || 0;
		this.vertices = shapeParameters.vertices || [];
		this.indices = shapeParameters.indices || [];
		this.children = shapeParameters.children || [];
        this.color = shapeParameters.color || { r: 0.0, g: 0.0, b: 0.0};
        this.colors = shapeParameters.colors || null;
        this.mode = shapeParameters.mode || null;
        this.axis = shapeParameters.axis || {x: 1.0, y: 1.0, z: 1.0};
        this.angle = shapeParameters.angle || 0;
        this.translateX = shapeParameters.translateX || 0;
        this.translateY = shapeParameters.translateY || 0;
        this.translateZ = shapeParameters.translateZ || 0;
        this.rotateAngle = shapeParameters.rotateAngle || 0;
        this.rotateX = shapeParameters.rotateAngleX || 1;
        this.rotateY = shapeParameters.rotateAngleY || 1;
        this.rotateZ = shapeParameters.rotateAngleZ || 1;
        this.scaleX = shapeParameters.scaleX || 1;
        this.scaleY = shapeParameters.scaleY || 1;
        this.scaleZ = shapeParameters.scaleZ || 1;
	};


	shape.icosahedron = function () {
		var X = 0.525731112119133606;
    	var Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };

	};


	shape.cube = function () {
		return {
            vertices: [
                [ 0.5, 0.5, 0.5 ],
                [ 0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, 0.5 ],
                [ 0.5, -0.5, 0.5 ],
                [ 0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, 0.5 ]
            ],

            indices: [
                [ 0, 1, 3 ],
                [ 2, 3, 1 ],
                [ 0, 3, 4 ],
                [ 7, 4, 3 ],
                [ 0, 4, 1 ],
                [ 5, 1, 4 ],
                [ 1, 5, 6 ],
                [ 2, 1, 6 ],
                [ 2, 7, 3 ],
                [ 6, 7, 2 ],
                [ 4, 7, 6 ],
                [ 5, 4, 6 ]
            ]
        };
	};

	shape.sphere = function () {
        var latitudeLines = 24;
        var longitudeLines = 24;
        var radius = .5;
        var vertices = [];
        var indices = [];

        for (var currentLatitude = 0; currentLatitude <= latitudeLines; currentLatitude++) {
            var theta = currentLatitude * Math.PI / latitudeLines;
            var sinTheta = Math.sin(theta); 
            var cosTheta = Math.cos(theta);

            for (var currentLongitude = 0; currentLongitude <= longitudeLines; currentLongitude++) {
                var phi = currentLongitude * 2 * Math.PI / longitudeLines;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;

                vertices.push([ radius * x, radius* y, radius * z ]);

                var indexPartOne = (currentLatitude * (longitudeLines + 1)) + currentLongitude;
                var indexPartTwo = indexPartOne + longitudeLines + 1;
                
                indices.push([ indexPartOne, indexPartTwo, indexPartOne + 1 ]);
                indices.push([ indexPartTwo, indexPartTwo + 1, indexPartOne + 1]);

            }
        }

        return {
            vertices: vertices,
            indices: indices
        };


	}

    // shape.cylinder = function () {
    //     var latitudeLines = 24;
    //     var longitudeLines = 24;
    //     var radius = .5;
    //     var vertices = [];
    //     var indices = [];

    //     for (var currentLatitude = 0; currentLatitude <= latitudeLines; currentLatitude++) {
    //         var theta = currentLatitude * Math.PI / latitudeLines;
    //         var sinTheta = Math.sin(theta);
    //         var cosTheta = Math.cos(theta);

    //         var x = sinTheta;
    //         var y = cosTheta;
    //         var z = sinTheta;

    //         vertices.push([ radius * x, radius * y, radius * z ]);

    //         var indexPartOne = (currentLatitude * (longitudeLines + 1) + 0.5);
    //         var indexPartTwo = indexPartOne + longitudeLines + 1;

    //         indices.push([ indexPartOne, indexPartTwo, indexPartOne + 1 ]);
    //         indices.push([ indexPartTwo, indexPartTwo + 1, indexPartOne + 1]);


    //     }

    //     return {
    //         vertices: vertices,
    //         indices: indices
    //     };
    // }

    shape.cone = function () {
        indexCount = 50;
        var radius = 0.5;
        var coneBase = -0.5
        var vertices = [
            [ 0, 0.5, 0 ],
            // [ 0, -0.5, 0 ]
        ];

        var indices = [];

        var thetaDelta = 2 * Math.PI / indexCount;
        var currentTheta = 0.0;
        for (var i = 0; i < indexCount; i += 1) {
            vertices.push([
                radius * Math.cos(currentTheta),
                coneBase,
                radius * Math.sin(currentTheta)
            ]);
            currentTheta += thetaDelta;
        }

        for (var i = 0; i < indexCount; i += 1) {
            indices.push([ 0, (i + 1) % indexCount, (i + 3) % indexCount ]);
        }
        
        // for (var i = 2; i < indexCount; i += 1) {
        //     indices.push([1, i + 1, i + 2]);
        // }

        return {
            vertices: vertices,
            indices: indices
        }
    }

    shape.pyramid = function () {
        return {
            vertices: [
                [ -0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, 0.5 ],
                [ 0.5, -0.5, 0.5 ],
                [ 0.5, -0.5, -0.5 ],
                [ 0.0, 0.5, 0.0 ]
            ],

            indices: [
                [ 0, 1, 2 ],
                [ 2, 3, 0 ],
                [ 2, 3, 4 ],
                [ 1, 2, 4 ],
                [ 0, 1, 4 ],
                [ 0, 3, 4 ]
            ]
        }
    },

    

	shape.prototype.toRawTriangleArray = function () {
        var result = [];

        for (var i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    this.vertices[
                        this.indices[i][j]
                    ]
                );
            }
        }

        return result;
    };

    shape.prototype.toRawLineArray = function () {
        var result = [];

        for (var i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    this.vertices[
                        this.indices[i][j]
                    ],

                    this.vertices[
                        this.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    };

    return shape;

}());



