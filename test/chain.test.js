const chai = require("chai");
			request = require("request");

const Sorax = require('../lib/application');

const app = new Sorax();

describe("Chain", function () {

	let server = null;

	describe("Requests", function () {

		it("Checking the performance of one middleware with correct request", function (done) {

			app.use(function (req, res, next) {
				res.statusCode = 200;
				res.write("success");
				res.end();
			});

			server = app.listen(80, function () {

				request("http://localhost:80", {method: "GET"}, function (err, res, body) {
					if (err) {
						throw new Error(err);
					}

					chai.expect(body).to.equal("success", "Request returned invalid response text");
					done();
				});

			});

		});

		afterEach((done) => {
			app.middleware = [];
			server.close(done);
		});

	});

});
