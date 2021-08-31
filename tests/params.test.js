const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const api = require("../dist/api.js");
const { expect } = chai;
chai.use(chaiAsPromised);


describe("Parameter type checking", () => {
  describe("Test beastData", () => {
    it("should be rejected if non-numbers are passed", () => {
      const promise = api.beastData("A");
      return expect(promise).to.eventually.be.rejected;
    });
    it("should be fulfilled if a valid ID is passed", () => {
      const promise = api.beastData(1);
      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe("Test beastiaryNames", () => {
    it("should be rejected if two numbers are passed", () => {
      const promise = api.beastiaryNames(12);
      return expect(promise).to.eventually.be.rejected;
    });
    it("should be rejected if two characters are passed", () => {
      const promise = api.beastiaryNames("ab");
      return expect(promise).to.eventually.be.rejected;
    });
    it("should be rejected if a numeric-type is passed", () => {
      const promise = api.beastiaryNames(1);
      return expect(promise).to.eventually.be.rejected;
    });
  });

  describe("Test slayerBeasts", () => {
    it("should be rejected if non-numbers are passed", () => {
      const promise = api.slayerBeasts("A");
      return expect(promise).to.eventually.be.rejected;
    });
  });
});