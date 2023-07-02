const { expect } = require("chai");
const NodeWalker = require("./NodeWalker");

class ConditionWalker extends NodeWalker {
  walk(syntaxNode, { syntaxStack }) {
    expect(syntaxNode.test).to.not.be.undefined;
    syntaxStack.push(syntaxNode.test);

    expect(syntaxNode.consequent).to.not.be.undefined;
    syntaxStack.push(syntaxNode.consequent);

    if (syntaxNode.alternate) {
      syntaxStack.push(syntaxNode.alternate);
    }
  }
}

class ConditionalExpression extends ConditionWalker {}

module.exports = { ConditionalExpression };
