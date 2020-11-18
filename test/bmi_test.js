const expect = require("chai").expect;
const bmi = require("../services/bmi");

describe("bmi.js tests", () => {
  describe("bmi() Test", () => {
    it("should return Underweight", () => {
      const result = bmi.getBMI(100, 70);
      expect(result).to.equal("Luckly, You are Underweight");
    });
    it("should return Normal", () => {
      const result = bmi.getBMI(160, 70);
      expect(result).to.equal("Congrats, Your weight is Normal Now");
    });
    it("should return Overweight", () => {
      const result = bmi.getBMI(200, 70);
      expect(result).to.equal("Oops, You are already Overweight");
    });
    it("should return Obese", () => {
      const result = bmi.getBMI(250, 70);
      expect(result).to.equal("OMG, You are already Obese. Health Alert");
    });
  });
});
