const assert = require("assert"),
			http = require("http"),
			request = require("request");

const chain = require("../lib/chain");

describe("Chain", function () {

	describe("Function argument check", function () {

		let middleware = [];

		it("Argument type 'array' checking", function () {

			try {
				chain(middleware);
			} catch (error) {
				assert.ifError(error);
			}

		});

		it("Argument inccorect type checking", function () {

			try {
				chain({});
			} catch (error) {
				assert.equal(error.name, "TypeError", "Middleware is an array");
			}

		});

		it("Argument elements type checking", function () {

			middleware.push(function () {});

			try {
				chain(middleware);
			} catch (error) {
				assert.ifError(error);
			}

		});

		it("Argument inccorect elements type checking", function () {

			middleware.push(2);

			try {
				chain(middleware);
			} catch (error) {
				assert.equal(error.name, "TypeError","Middleware elements mustn't be a function");
			}

		});

		afterEach(function () {
			middleware = [];
		});

	});

});
