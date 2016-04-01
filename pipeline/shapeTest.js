/*
 * Unit tests
 */

$(function() {

    test("Constructor", function() {
        var blankShape = new Shape({});
        equal(blankShape.x, 0, "X");
        equal(blankShape.y, 0, "Y");
        equal(blankShape.z, 0, "Z");
        equal(blankShape.vertices.length, 0, "Vertices");
        equal(blankShape.indices.length, 0, "Indices");
        equal(blankShape.children.length, 0, "Children");
    });


    test("Pyramid", function() {
        var pyramid = new Shape(Shape.pyramid());
        equal(pyramid.vertices[0][0], -0.5, "Vertex 0_0");
        equal(pyramid.vertices[0][1], -0.5, "Vertex 0_1");
        equal(pyramid.vertices[0][2], -0.5, "Vertex 0_2");

        equal(pyramid.vertices[4][0], 0.0, "Vertex 4_0");
        equal(pyramid.vertices[4][1], 0.5, "Vertex 4_1");
        equal(pyramid.vertices[4][2], 0.0, "Vertex 4_2");

        equal(pyramid.indices[0][0], 0, "Index 0_0");
        equal(pyramid.indices[0][1], 1, "Index 0_1");
        equal(pyramid.indices[0][2], 2, "Index 0_2");

        equal(pyramid.indices[5][0], 0, "Index 5_0");
        equal(pyramid.indices[5][1], 3, "Index 5_1");
        equal(pyramid.indices[5][2], 4, "Index 5_2");
    });

    test("Sphere", function() {
        var sphere = new Shape(Shape.sphere(2));
        equal(sphere.vertices[0][0], 0, "Vertex 0_0");
        equal(sphere.vertices[0][1], 2, "Vertex 0_1");
        equal(sphere.vertices[0][2], 0, "Vertex 0_2");

        equal(sphere.vertices[100][0], 0.3632712640026802, "Vertex 100_0");
        equal(sphere.vertices[100][1], 1.618033988749895, "Vertex 100_1");
        equal(sphere.vertices[100][2], -1.118033988749895, "Vertex 100_2");

        equal(sphere.indices[0][0], 0, "Index 0_0");
        equal(sphere.indices[0][1], 21, "Index 0_1");
        equal(sphere.indices[0][2], 1, "Index 0_2");

        equal(sphere.indices[100][0], 50, "Index 100_0");
        equal(sphere.indices[100][1], 71, "Index 100_1");
        equal(sphere.indices[100][2], 51, "Index 100_2");
    });


    test("Sphere", function() {
      equal(50, 50, "Test");
      var testS = new Shape ({
        color: {
            r: 0.3,
            g: 1.0,
            b: 1.0
        },
        vertices: new Shape(Shape.pyramid()).toRawTriangleArray(),
        mode: gl.TRIANGLES,
        axis: {
            x: 0.0,
            y: 1.0,
            z: 0.0
        },
        children: [ new Shape ({
            vertices: new Shape(Shape.diamond()).toRawTriangleArray(),
            mode: gl.TRIANGLES,
            color: {
                r: 0.3,
                g: 1.0,
                b: 1.0
            },
            axis: {
                x: 0.0,
                y: 1.0,
                z: 0.0
            }
          })]
      })
      console.log(testS);
    });


});