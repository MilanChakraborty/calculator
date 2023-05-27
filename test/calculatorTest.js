
const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const { Calculator } = require("../src/calculator");
const createFakeRender = () => {
  const render = (content) => {
    render.calls = [...(render.calls || []), { content }];
  }
  return render;
}
let fakeRender;

describe("calculator", () => {
  beforeEach(() => {
    fakeRender = createFakeRender();
  })
  describe("validOperators", () => {
    it("are add and sub", () => {
      const calc = new Calculator();
      assert.deepStrictEqual(calc.validOperators, ['add', 'sub']);
    })
  })
  describe("renderBalance", () => {
    it("default balance is 0", () => {
      const calc = new Calculator();
      calc.renderBalance(fakeRender);
      assert.deepStrictEqual(fakeRender.calls[0], { content: 0 });
      assert.deepStrictEqual(fakeRender.calls.length, 1);
    });

    it("balance is picked up from the constructor", () => {
      const calc = new Calculator(1);
      calc.renderBalance(fakeRender);
      assert.deepStrictEqual(fakeRender.calls[0], { content: 1 });
      assert.deepStrictEqual(fakeRender.calls.length, 1);
    })
  })
  describe("operate", () => {
    it("add adds the given operand to the balance", () => {
      const calc = new Calculator();
      calc.operate('add', 2);
      calc.renderBalance(fakeRender);
      assert.deepStrictEqual(fakeRender.calls[0], { content: 2 });
      assert.deepStrictEqual(fakeRender.calls.length, 1);
    })
  })
})
