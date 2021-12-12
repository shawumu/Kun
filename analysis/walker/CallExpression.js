const { expect } = require("chai");
const NodeWalker = require("./collection/NodeWalker");

class CallExpression extends NodeWalker {
  walk(syntaxNode, { syntaxStack }) {
    const argList = syntaxNode.arguments;
    expect(argList).to.be.an("array");

    for (let i = argList.length - 1; i > -1; i -= 1) {
      syntaxStack.push(argList[i]);
    }
    expect(syntaxNode.callee).to.not.be.undefined;
    syntaxStack.push(syntaxNode.callee);
  }
}

module.exports = CallExpression;
