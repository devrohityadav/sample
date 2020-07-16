let mocha = require("mocha"),
  chai = require("chai"),
  chaiHttp = require("chai-http");

const { app } = require("../build");

chai.use(chaiHttp);

// Assertion style
chai.should();
let expect = chai.expect;

describe("Api Tests", () => {
  describe("Get /students/all", () => {
    it("Should get all student ", (done) => {
      chai
        .request(app)
        .get("/students/all")
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data").to.be.a("array");
          done();
        });
    });
  });

  describe("Get /students by id", () => {
    it("Should get a student by id", (done) => {
      const studentId = "c895d7ca-475e-49b7-86ea-2684a5619909";
      chai
        .request(app)
        .get("/students/" + studentId)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("data")
            .to.be.a("array")
            .to.have.length(0);
          done();
        });
    });

    it("Should throw error if invalid uuid", (done) => {
      const studentId = "c895d7ca";
      chai
        .request(app)
        .get("/students/" + studentId)
        .end((err, res) => {
          res.status.should.equal(500);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });
  });

  describe("POST /students", () => {
    it("Should post a student", (done) => {
      const studentId = "c895d7ca-475e-49b7-86ea-2684a5619909";

      chai
        .request(app)
        .post("/students/" + studentId)

        .field("instagram", "")
        .field("twitter", "")
        .field("facebook", "")

        .field("mother_name", "")
        .field("mother_phone", "")
        .field("mother_email", "")
        .field("father_occupation", "")

        .field("father_name", "")
        .field("father_email", "")
        .field("father_phone", "")
        .field("mother_occupation", "")

        .field("nri", false)
        .field("email", "john@doe.com")
        .field("religion", "")
        .field("nationality", "")
        .field("blood_group", "")
        .field("marital_status", "single")
        .field("annual_family_income", "")
        .field("area", "urban")
        .field("_state", "")

        .field("current_address", "")
        .field("permanent_address", "")

        .attach("bpl", null)
        .attach("img", null)
        .attach("pwd", null)

        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.be.a("object");
          res.body.data.should.have.property("id");
          done();
        });
    });

    describe("Validation tests", () => {
      it("validate Area field", (done) => {
        const studentId = "c895d7ca-475e-49b7-86ea-2684a5619909";

        chai
          .request(app)
          .post("/students/" + studentId)

          .field("instagram", "")
          .field("twitter", "")
          .field("facebook", "")

          .field("mother_name", "")
          .field("mother_phone", "")
          .field("mother_email", "")
          .field("father_occupation", "")

          .field("father_name", "")
          .field("father_email", "")
          .field("father_phone", "")
          .field("mother_occupation", "")

          .field("nri", false)
          .field("email", "john@doe.com")
          .field("religion", "")
          .field("nationality", "")
          .field("blood_group", "")
          .field("marital_status", "single")
          .field("annual_family_income", "")
          .field("area", "")
          .field("_state", "")

          .field("current_address", "")
          .field("permanent_address", "")

          .attach("bpl", null)
          .attach("img", null)
          .attach("pwd", null)

          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a("object");
            res.body.should.have.property("error");
            expect(res.body.error[0].param).to.equal("area");
            done();
          });
      });

      it("validate Email field", (done) => {
        const studentId = "c895d7ca-475e-49b7-86ea-2684a5619909";

        chai
          .request(app)
          .post("/students/" + studentId)

          .field("instagram", "")
          .field("twitter", "")
          .field("facebook", "")

          .field("mother_name", "")
          .field("mother_phone", "")
          .field("mother_email", "")
          .field("father_occupation", "")

          .field("father_name", "")
          .field("father_email", "")
          .field("father_phone", "")
          .field("mother_occupation", "")

          .field("nri", false)
          .field("email", "john")
          .field("religion", "")
          .field("nationality", "")
          .field("blood_group", "")
          .field("marital_status", "single")
          .field("annual_family_income", "")
          .field("area", "urban")
          .field("_state", "")

          .field("current_address", "")
          .field("permanent_address", "")

          .attach("bpl", null)
          .attach("img", null)
          .attach("pwd", null)

          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a("object");
            res.body.should.have.property("error");
            expect(res.body.error[0].param).to.equal("email");
            done();
          });
      });

      it("validate nri field", (done) => {
        const studentId = "c895d7ca-475e-49b7-86ea-2684a5619909";

        chai
          .request(app)
          .post("/students/" + studentId)

          .field("instagram", "")
          .field("twitter", "")
          .field("facebook", "")

          .field("mother_name", "")
          .field("mother_phone", "")
          .field("mother_email", "")
          .field("father_occupation", "")

          .field("father_name", "")
          .field("father_email", "")
          .field("father_phone", "")
          .field("mother_occupation", "")

          .field("nri", "abc")
          .field("email", "john@doe.com")
          .field("religion", "")
          .field("nationality", "")
          .field("blood_group", "")
          .field("marital_status", "single")
          .field("annual_family_income", "")
          .field("area", "urban")
          .field("_state", "")

          .field("current_address", "")
          .field("permanent_address", "")

          .attach("bpl", null)
          .attach("img", null)
          .attach("pwd", null)

          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a("object");
            res.body.should.have.property("error");
            expect(res.body.error[0].param).to.equal("nri");
            done();
          });
      });

      it("validate required fields", (done) => {
        const studentId = "c895d7ca-475e-49b7-86ea-2684a5619909";

        chai
          .request(app)
          .post("/students/" + studentId)

          .field("instagram", "")
          .field("twitter", "")
          .field("facebook", "")

          .field("mother_phone", "")
          .field("mother_email", "")
          .field("mother_occupation", "")

          .field("father_email", "")
          .field("father_phone", "")
          .field("father_occupation", "")

          .field("religion", "")

          .field("current_address", "")
          .field("permanent_address", "")

          .attach("bpl", null)
          .attach("img", null)
          .attach("pwd", null)

          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a("object");
            res.body.should.have.property("error");

            expect(res.body.error[0].param).to.equal("nri");
            expect(res.body.error[1].param).to.equal("email");
            expect(res.body.error[3].param).to.equal("_state");
            expect(res.body.error[4].param).to.equal("father_name");

            expect(res.body.error[5].param).to.equal("mother_name");
            expect(res.body.error[6].param).to.equal("blood_group");
            expect(res.body.error[7].param).to.equal("nationality");
            expect(res.body.error[8].param).to.equal("annual_family_income");

            expect(res.body.error[15].param).to.equal("area");
            expect(res.body.error[17].param).to.equal("marital_status");

            done();
          });
      });

      it("validate area field [urban | rural]", (done) => {
        const studentId = "c895d7ca-475e-49b7-86ea-2684a5619909";

        chai
          .request(app)
          .post("/students/" + studentId)

          .field("instagram", "")
          .field("twitter", "")
          .field("facebook", "")

          .field("mother_name", "")
          .field("mother_phone", "")
          .field("mother_email", "")
          .field("father_occupation", "")

          .field("father_name", "")
          .field("father_email", "")
          .field("father_phone", "")
          .field("mother_occupation", "")

          .field("nri", true)
          .field("email", "john@doe.com")
          .field("religion", "")
          .field("nationality", "")
          .field("blood_group", "")
          .field("marital_status", "single")
          .field("annual_family_income", "")
          .field("area", "abc")
          .field("_state", "")

          .field("current_address", "")
          .field("permanent_address", "")

          .attach("bpl", null)
          .attach("img", null)
          .attach("pwd", null)

          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a("object");
            res.body.should.have.property("error");
            expect(res.body.error[0].param).to.equal("area");
            done();
          });
      });

      it("validate marital_status field [single | widow | married]", (done) => {
        const studentId = "c895d7ca-475e-49b7-86ea-2684a5619909";

        chai
          .request(app)
          .post("/students/" + studentId)

          .field("instagram", "")
          .field("twitter", "")
          .field("facebook", "")

          .field("mother_name", "")
          .field("mother_phone", "")
          .field("mother_email", "")
          .field("father_occupation", "")

          .field("father_name", "")
          .field("father_email", "")
          .field("father_phone", "")
          .field("mother_occupation", "")

          .field("nri", true)
          .field("email", "john@doe.com")
          .field("religion", "")
          .field("nationality", "")
          .field("blood_group", "")
          .field("marital_status", "abc")
          .field("annual_family_income", "")
          .field("area", "rural")
          .field("_state", "")

          .field("current_address", "")
          .field("permanent_address", "")

          .attach("bpl", null)
          .attach("img", null)
          .attach("pwd", null)

          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a("object");
            res.body.should.have.property("error");
            expect(res.body.error[0].param).to.equal("marital_status");
            done();
          });
      });
    });
  });
});
