var Matrix = (function () {

	var matrix = function (inputMatrix) {
		this.data = inputMatrix || [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1];
	};

	matrix.prototype.multiply = function (otherMatrix) {
		resultMatrix = [];
		for (var i = 0; i <= 12; i += 4) {
			for (var j = 0; j <= 3; j += 1) {
				resultMatrix.push(
				this.data[i] * otherMatrix.data[j]
				+ this.data[i + 1] * otherMatrix.data[j + 4] 
				+ this.data[i + 2] * otherMatrix.data[j + 8]
				+ this.data[i + 3] * otherMatrix.data[j + 12]
				);
			};
		};
		this.data = resultMatrix;
	};

	matrix.prototype.translate = function (x, y, z) {
		return [
			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1];
	};

	matrix.prototype.scale = function (x, y, z) {
		 return [
			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1];
	};

	matrix.prototype.rotate = function (angle, x, y, z) {
		var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
			sinAngle = Math.sin(angle * Math.PI / 180),
			cosAngle = Math.cos(angle * Math.PI / 180),
			resultCos = 1.0 - cosAngle,
			xSq,
			ySq,
			zSq,
			xy,
			yz,
			xz,
			xsin,
			ysin,
			zsin;

			x /= axisLength;
			y /= axisLength;
			z /= axisLength;

			xSq = x * x;
			ySq = y * y;
			zSq = z * z;
			xy = x * y;
			yz = y * z;
			xz = x * z;
			xsin = x * sinAngle;
			ysin = y * sinAngle;
			zsin = z * sinAngle;

			return [
					(xSq * resultCos) + cosAngle,
					(xy * resultCos) - zsin,
					(xz * resultCos) + ysin,
					0.0,

					(xy * resultCos) + zsin,
					(ySq * resultCos) + cosAngle,
					(yz * resultCos) - xsin,
					0.0,

					(xz * resultCos) - ysin,
					(yz * resultCos) + xsin,
					(zSq * resultCos) + cosAngle,
					0.0,

					0.0,
					0.0,
					0.0,
					1.0
				];

	};

	matrix.prototype.orthoProjection = function (left, right, below, above, foreground, background) {
		var width = right - left,
			height = above - below,
			depth = background - foreground;

		return [
				2.0 / width,
				0.0,
				0.0,
				-(right + left) / width,

				0.0,
				2.0 / height,
				0.0,
				-(above + below) / height,

				0.0,
				0.0,
				-2.0 / depth,
				-(foreground + background) / depth,

				0.0,
				0.0,
				0.0,
				1.0
			];
	};

	matrix.prototype.perspective = function (left, right, above, below, foreground, background) {
		var width = right - left,
			height = above - below,
			depth = background - foreground;

		return [
			(2.0 * foreground) / width,
			0.0,
			(left + right) / width,
			0.0,

			0.0,
			(2.0 * foreground) / height,
			(above + below) / height,
			0.0,

			0.0,
			0.0,
			-((foreground + background) / depth),
			(-2.0 * foreground * background) / depth,

			0.0,
			0.0,
			-1.0,
			0.0
		];

	};

	matrix.prototype.conversion = function () {
		resultMatrix = [];
		for (var i = 0; i < 4; i += 1) {
			resultMatrix.push(this.data[i]);
			resultMatrix.push(this.data[i + 4]);
			resultMatrix.push(this.data[i + 8]);
			resultMatrix.push(this.data[i + 12]);
		};
		return resultMatrix;
	};

	return matrix;

})();