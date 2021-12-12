const { expect } = require("chai");
const NodeWalker = require("./NodeWalker");

class ArrayWalker extends NodeWalker {
  attr = "";

  walk(syntaxNode, { syntaxStack }) {
    const nodeList = syntaxNode[this.attr];
    expect(nodeList).to.be.an("array");

    for (let i = nodeList.length - 1; i > -1; i -= 1) {
      syntaxStack.push(nodeList[i]);
    }
  }
}

class BlockStatement extends ArrayWalker {
  attr = "body";
}

class VariableDeclaration extends ArrayWalker {
  attr = "declarations";
}

class ObjectExpression extends ArrayWalker {
  attr = "properties";
}

module.exports = { BlockStatement, VariableDeclaration, ObjectExpression };
