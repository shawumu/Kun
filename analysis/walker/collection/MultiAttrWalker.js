const { expect } = require("chai");
const NodeWalker = require("./NodeWalker");

class MultiAttrWalker extends NodeWalker {
  attrs = [];

  requires = [];

  walk(syntaxNode, { syntaxStack }) {
    this.attrs.forEach((attrKey, index) => {
      const attr = syntaxNode[attrKey];
      const required = this.requires[index];
      if (required) {
        expect(attr).to.not.be.undefined;
        syntaxStack.push(attr);
      } else {
        attr ?? syntaxStack.push(attr);
      }
    });
  }
}

class ForStatement extends MultiAttrWalker {
  attrs = ["init", "test", "update", "body"];

  requires = [false, false, false, true];
}

class ForInStatement extends MultiAttrWalker {
  attrs = ["left", "right", "body"];

  requires = [true, true, true];
}

module.exports = { ForStatement, ForInStatement };
