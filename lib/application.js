"use strict";

const http = require("http"),
			chain = require("./chain");

  /**
    * Options
    * @param {Object} [options] Application options
    * @param {String} [options.env='development'] Environment
    * @return {Application}
    */

let Application = function (options = {}) {

	if (this == undefined) {
		throw new SyntaxError("The function must be called like constructor");
	}

	this.middleware = [];
	this.env = options.env || process.env.NODE_ENV || "development";

	/**
	 * Method to start an application
	 * @param  {...any} arguments from net.Server.listen methods
	 * @return {net.Server}
	 */
	this.listen = function (...args) {
		return http.createServer(this.callback()).listen(...args);
	};

	/**
	 * Add new middleware without routing
	 * @param {Function}
	 * @return {Application}
	 */
	this.use = function (func) {
		if (typeof func !== "function") throw new TypeError("Middleware bust me an async function or common function");

		this.middleware.push(func);

		return this;
	};

	this.callback = function () {
		let handler = chain(this.middleware);

		return handler();
	};

};

module.exports = Application;
