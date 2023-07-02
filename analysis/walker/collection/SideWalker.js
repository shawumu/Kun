const { expect } = require("chai");
const NodeWalker = require("./NodeWalker");

class SideWalker extends NodeWalker {
  walk(syntaxNode, { syntaxStack }) {
    expect(syntaxNode.left).to.not.be.undefined;
    syntaxStack.push(syntaxNode.left);

    expect(syntaxNode.right).to.not.be.undefined;
    syntaxStack.push(syntaxNode.right);
  }
}

class BinaryExpression extends SideWalker {}
class AssignmentExpression extends SideWalker {}
class LogicalExpression extends SideWalker {}

module.exports = { BinaryExpression, AssignmentExpression, LogicalExpression };
