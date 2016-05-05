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
        this.angle = shapeParameters.angle || 0;;
        this.translate = shapeParameters.translate || {x: 0, y: 0, z: 0};
        this.rotateAngle = shapeParameters.rotateAngle || 0;
        this.scale = shapeParameters.scale || {x: 1, y: 1, z: 1};
        this.normals = shapeParameters.normals || [];
        this.specularColors = shapeParameters.specularColors || null;
        this.shininess = shapeParameters.shininess || 16;
        this.specularColor = shapeParameters.specularColor || { r: 1.0, g: 1.0, b: 1.0};
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

                vertices.push([ radius * x, radius * y, radius * z ]);

                var indexPartOne = (currentLatitude * (longitudeLines + 1)) + currentLongitude;
                var indexPartTwo = indexPartOne + longitudeLines + 1;
                
                if (currentLatitude != latitudeLines && currentLongitude != longitudeLines){
                    // indices.push([ indexPartOne, indexPartTwo, indexPartOne + 1 ]);
                    // indices.push([ indexPartTwo, indexPartTwo + 1, indexPartOne + 1 ]);
                    indices.push([ indexPartOne + 1, indexPartTwo, indexPartOne ]);
                    indices.push([ indexPartOne + 1, indexPartTwo + 1, indexPartTwo ])

                }

                

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

    shape.cone = function (r) {
        indexCount = 50;
        var radius = r || 0.5;
        var coneBase = 0.5
        var vertices = [
            [ 0, -0.5, 0 ],
            // [ 0, -0.5, 0 ]
        ];

        var indices = [];

        var thetaDelta = 2 * Math.PI / indexCount;
        var currentTheta = 0.0;
        for (var i = 0; i < indexCount + 1; i += 1) {
            vertices.push([
                radius * Math.cos(currentTheta),
                coneBase,
                radius * Math.sin(currentTheta)
            ]);
            currentTheta += thetaDelta;
        }

        for (var i = 0; i < indexCount  + 1; i += 1) {
            // indices.push([ 0, (i + 1) % indexCount, (i + 3) % indexCount ]);
            indices.push([ (i + 3) % indexCount, (i + 1) % indexCount, 0 ]);
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

    shape.prototype.toNormalArray = function () {
        var result = [];

        // For each face...
        for (var i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            // We form vectors from the first and second then second and third vertices.

            var p0 = this.vertices[this.indices[i][0]];
            var p1 = this.vertices[this.indices[i][1]];
            var p2 = this.vertices[this.indices[i][2]];

            // Technically, the first value is not a vector, but v can stand for vertex
            // anyway, so...
            // console.log(p1);
            var v0 = new Vector(p0[0], p0[1], p0[2]);
            var v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
            var v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
            var normal = v1.cross(v2).unit();

            // We then use this same normal for every vertex in this face.
            for (var j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    };

    shape.prototype.toVertexNormalArray = function () {
        var result = [];

        // For each face...
        for (var i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            // For each vertex in that face...
            for (var j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                var p = this.vertices[this.indices[i][j]];
                var normal = new Vector(p[0], p[1], p[2]).unit();
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    };

    

    return shape;

}());



