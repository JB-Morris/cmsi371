(function(){

	// window.Shape = window.Shape || {};

	Shape = function (shapeParameters) {
		this.x = shapeParameters.x || 0;
		this.y = shapeParameters.y || 0;
		this.z = shapeParameters.z || 0;
		this.vertices = shapeParameters.vertices || [];
		this.indices = shapeParameters.indices || [];
		this.children = shapeParameters.children || [];
	};


	Shape.icosahedron = function () {
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


	Shape.cube = function () {
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

	Shape.sphere = function () {
        

	}

    Shape.pyramid = function () {
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
    }

    Shape.hemisphere = function () {
        // First determine the radius at the pole.
        var radius = .5

        var latitudeRadius = radius * Math.cos(Math.PI / 4),
            vertices = [];

        // Vertices consist of the center, surrounded by select points around
        // the pole radius.
        vertices.push([0, radius, 0]);

        // Iterate around the y-axis.
        var latitudeY = radius * Math.cos(Math.PI / 4);
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 8) {
            vertices.push([
                latitudeRadius * Math.cos(theta),
                latitudeY,
                latitudeRadius * Math.sin(theta)
            ]);
        }


        latitudeRadius = radius * - Math.cos(Math.PI / 4);
        vertices.push([0, - radius, 0]);

        // Iterate around the y-axis.
        latitudeY = radius * - Math.cos(Math.PI / 4);
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 8) {
            vertices.push([
                latitudeRadius * Math.cos(theta),
                latitudeY,
                latitudeRadius * Math.sin(theta)
            ]);
        }

        //Iterate around the equator.
        latitudeRadius = radius * Math.cos(0);
        latitudeY = radius * Math.sin(0);
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 8) {
            vertices.push([
                latitudeRadius * Math.cos(theta),
                latitudeY,
                latitudeRadius * Math.sin(theta)
            ]);
        }

        latitudeRadius = radius * - Math.cos(0);
        latitudeY = radius * - Math.sin(0);
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 8) {
            vertices.push([
                latitudeRadius * Math.cos(theta),
                latitudeY,
                latitudeRadius * Math.sin(theta)
            ]);
        }

        // Form the triangles.
        var indices = [];
        for (var i = 1; i <= 16; i += 1) {
            indices.push([ 0, i, (i < 16) ? (i + 1) : 1 ]);
        }

        for (var i = 18; i <= 33; i += 1) {
            indices.push([ 17, i, (i < 33) ? (i + 1) : 18 ]);
        }

        for (var i = 1; i <= 16; i += 1) {
            indices.push([ i, i + 16 + 17, (i < 16) ? i + 16 + 17 + 1 : 16 + 17 + 1]);
            indices.push([ i, (i < 16) ? i + 16 + 17 + 1 : i + 17 + 1, (i < 16) ? i + 1 : 1]);
        }

        for (var i = 18; i <= 33; i += 1) {
            indices.push([ i + 16 + 16,(i < 33) ? i : 18,(i < 33) ? i + 1 : i + 16 + 1]);
            indices.push([ i + 16 + 16 , (i < 33) ? i + 1 : i, (i < 33) ? i + 16 + 16 + 1: 18]);
        }


        return {
            vertices: vertices,
            indices: indices
        };
    },

	Shape.prototype.toRawTriangleArray = function () {
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

    Shape.prototype.toRawLineArray = function () {
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


}());



