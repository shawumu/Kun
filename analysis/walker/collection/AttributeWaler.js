const { expect } = require("chai");
const NodeWalker = require("./NodeWalker");

class AttributeWaler extends NodeWalker {
  attr = "";

  walk(syntaxNode, { syntaxStack }) {
    const attr = syntaxNode[this.attr];
    expect(attr).to.not.be.undefined;
    syntaxStack.push(attr);
  }
}

class FunctionDeclaration extends AttributeWaler {
  attr = "body";
}
class FunctionExpression extends AttributeWaler {
  attr = "body";
}
class ReturnStatement extends AttributeWaler {
  attr = "argument";
}
class VariableDeclarator extends AttributeWaler {
  attr = "init";
}
class Property extends AttributeWaler {
  attr = "value";
}

class UnaryExpression extends AttributeWaler {
  attr = "argument";
}

class ExpressionStatement extends AttributeWaler {
  attr = "expression";
}

module.exports = {
  FunctionDeclaration,
  FunctionExpression,
  ReturnStatement,
  VariableDeclarator,
  UnaryExpression,
  ExpressionStatement,
  Property
};
