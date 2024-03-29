const NodeWalker = require("./NodeWalker");

class Identifier extends NodeWalker {}
class Literal extends NodeWalker {}
class MemberExpression extends NodeWalker {}
class ThisExpression extends NodeWalker {}

module.exports = {
  Identifier,
  Literal,
  MemberExpression,
  ThisExpression
};
