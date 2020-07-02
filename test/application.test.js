const assert = require("assert");

const Sorax = require("../lib/application");

describe("Application", function () {

	describe("check-env property", function () {

		it("default env will be 'development'", function () {

			let app = new Sorax();

			assert.equal(app.env, "development", "'app.env' don't equal 'development'");
		});

		it("check property setter to 'production'", function () {

			let app = new Sorax({
				env: "production"
			});

			assert.equal(app.env, "production", "'env' don't equal 'production'");
		});

		it("check property setter from 'NODE_ENV'", function () {

			process.env.NODE_ENV = "production";

			let app = new Sorax();

			assert.equal(app.env, "production", "'env' don't equal 'production'");
		});

	});

	describe("use()", function () {

		it ("add middleware with correct type", function () {

			let app = new Sorax();

			app.use(function (req, res) {});

			assert.equal(app.middleware.length, 1, "Middleware count is more than 1");
		});


		let argumentsTypes = ["String", 1, true, [], Object.create(null)];

		for (let i = 0; argumentsTypes.length > i; i += 1) {

			it (`add inccorect argument with type'${Object.prototype.toString.call(argumentsTypes[i]).slice(8, -1).toLowerCase()}'`, function () {

				let app = new Sorax();

				try {
					app.use(argumentsTypes[i]);
				} catch (error) {
					assert.equal(error.name, "TypeError", "Function argument is correct");
				}

			});

		}

	});

	describe("listen()", function () {

		let app = new Sorax(),
				server = null;

		it("Server is successful listening", function (done) {
			server = app.listen(80, done);
		});

		after(function (done) {
			server.close(done);
		});

	});

});
