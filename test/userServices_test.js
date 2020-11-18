const expect = require("chai").expect;
const db = require("../services/database");

// import userServices
const UserServices = require("../services/UserServices");

const userServices = new UserServices(db);

let email = "test@test.com";
let password = "password";

describe("userServices.js Tests:", () => {
  //create user
  describe("userServices.createUser() Test:", () => {
    before(async () => {});
    it("should return true", async () => {
      result = await userServices.createUser({ email, password });
      expect(result).to.equal(true);
      // userServices.createUser({ email, password }).then((result) => {
      //   expect(result).to.equal(true);
      // });
    });
    after(async () => {
      db.run("DELETE FROM users WHERE email=?", [email], (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    });
  });

  //create user then authenticate
  describe("userServices.createUser() then authenticat:", () => {
    before(async () => {});
    it("should return true", async () => {
      result = await userServices.createUser({ email, password });
      if (result) {
        const authRes = await userServices.authenticateUser({
          email,
          password,
        });
        expect(authRes).to.equal(true);
      } else {
      }
    });
    after(async () => {
      db.run("DELETE FROM users WHERE email=?", [email], (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    });
  });

  describe("userServices.isUserExist() Test:", () => {
    before(() => {
      db.run(
        "INSERT INTO users(email, password) VALUES(?,?)",
        [email, password],
        (err) => {
          if (err) {
            console.log(err.message);
          }
        }
      );
    });
    it("should return true", async () => {
      result = await userServices.isUserExists(email);
      expect(result).to.equal(true);
    });

    it("should return false", async () => {
      result = await userServices.isUserExists("testtest@test.in");
      expect(result).to.equal(false);
    });
    after(() => {
      db.run("DELETE FROM users WHERE email=?", [email], (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    });
  });

  describe("userServices.authenticateUser() Test", () => {
    before(() => {
      db.run(
        "INSERT INTO users(email, password) VALUES(?,?)",
        [email, password],
        (err) => {
          if (err) {
            console.log(err.message);
          }
        }
      );
    });
    it("should return true", async () => {
      const result = await userServices.authenticateUser({ email, password });
      expect(result).to.equal(true);
    });

    it("should return false", async () => {
      const result = await userServices.authenticateUser({
        email: "testtest@test.com",
        password: "1234",
      });
      expect(result).to.equal(false);
    });
    after(() => {
      db.run("DELETE FROM users WHERE email=?", [email], (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    });
  });

  describe("userServices.validateEmail() Test", () => {
    it("should return true", () => {
      const result = userServices.validateEmail("t1@test.com");
      expect(result).to.equal(true);
    });
    it("should return false", () => {
      const result = userServices.validateEmail("t1test.com");
      expect(result).to.equal(false);
    });
  });

  describe("userServices.validatePassword() Test", () => {
    it("should equal true", () => {
      const result = userServices.validatePassword("1234");
      expect(result).to.equal(true);
    });

    it("should equal false", () => {
      const result = userServices.validatePassword("123");
      expect(result).to.equal(false);
    });
  });
});
