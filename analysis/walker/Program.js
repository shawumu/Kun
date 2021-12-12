const { expect } = require("chai");
const NodeWalker = require("./collection/NodeWalker");

class Program extends NodeWalker {
  walk(syntaxNode, { syntaxStack }) {
    const nodeList = syntaxNode.body;
    expect(nodeList).to.be.an("array");

    for (let i = nodeList.length - 1; i > -1; i -= 1) {
      syntaxStack.push(nodeList[i]);
    }
  }
}

module.exports = Program;
