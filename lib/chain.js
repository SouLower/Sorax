 module.exports = function chain(middleware) {

	if (!Array.isArray((middleware))) {
		throw new TypeError("Middleware must be an array");
	}

	for (let elem of middleware) {
		if (typeof elem !== "function") {
			throw new TypeError("Middleware element must be a function");
		}
	}

	return function (req, res, next) {

		let index = -1;

		let dispatch = function (i) {
			if (i <= index) {
				throw new Error("Can't call next() multiple times");
			}

			index = i;
			let func = middleware[i];

			try {
				Promise.resolve(func(req, res, dispatch.bind(null, i + 1)));
			} catch (error) {
				Promise.reject(error);
			}

		}

		return dispatch(0);
	};
};
