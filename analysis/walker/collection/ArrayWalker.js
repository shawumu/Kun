const { expect } = require("chai");
const NodeWalker = require("./NodeWalker");

class AttrAsListWalker extends NodeWalker {
  attr = "";

  walk(syntaxNode, { syntaxStack }) {
    const nodeList = syntaxNode[this.attr];
    expect(nodeList).to.be.an("array");

    for (let i = nodeList.length - 1; i > -1; i -= 1) {
      syntaxStack.push(nodeList[i]);
    }
  }
}

class BlockStatement extends AttrAsListWalker {
  attr = "body";
}

class VariableDeclaration extends AttrAsListWalker {
  attr = "declarations";
}

class ObjectExpression extends AttrAsListWalker {
  attr = "properties";
}

class ArrayExpression extends AttrAsListWalker {
  attr = "elements";
}

module.exports = {
  BlockStatement,
  VariableDeclaration,
  ObjectExpression,
  ArrayExpression
};
