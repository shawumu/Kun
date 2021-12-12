const { expect } = require("chai");
const NodeWalker = require("./collection/NodeWalker");
const Program = require("./Program");

const CallExpression = require("./CallExpression");

const {
  BinaryExpression,
  AssignmentExpression
} = require("./collection/SideWalker");
const {
  BlockStatement,
  VariableDeclaration,
  ObjectExpression
} = require("./collection/ArrayWalker");
const {
  Identifier,
  Literal,
  MemberExpression
} = require("./collection/EmptyWorker");

const {
  FunctionExpression,
  FunctionDeclaration,
  ReturnStatement,
  VariableDeclarator,
  Property
} = require("./collection/AttributeWaler");

class StackWalker extends NodeWalker {
  constructor(plugins) {
    super();
    this.syntaxStack = [];
    this.handlerMap = {
      Program: new Program(),
      FunctionDeclaration: new FunctionDeclaration(),
      BlockStatement: new BlockStatement(),
      ReturnStatement: new ReturnStatement(),
      FunctionExpression: new FunctionExpression(),
      CallExpression: new CallExpression(),
      Identifier: new Identifier(),
      Literal: new Literal(),
      MemberExpression: new MemberExpression(),
      VariableDeclaration: new VariableDeclaration(),
      VariableDeclarator: new VariableDeclarator(),
      AssignmentExpression: new AssignmentExpression(),
      ObjectExpression: new ObjectExpression(),
      Property: new Property(),
      BinaryExpression: new BinaryExpression()
    };
    this.addPlugins(plugins);
  }

  addPlugins(plugins) {
    this.pluginContext = {};
    this.plugins = [];
    plugins.forEach((plugin) => {
      this.plugins.push(plugin);
      this.pluginContexts[plugin.name] = plugin.context;
    });
  }

  bfs(syntaxTree) {
    this.pushStack(syntaxTree);
    while (this.syntaxStack.length > 0) {
      const syntaxNode = this.syntaxStack.pop();
      this.walkSingleNode(syntaxNode);
    }
  }

  pushStack(syntaxTree) {
    this.evtCenter.emit("stack.push.before", syntaxTree);
    this.syntaxStack.push(syntaxTree);
    this.evtCenter.emit("stack.push.after", syntaxTree);
  }

  walkSingleNode(syntaxNode) {
    const handler = this.handlerMap[syntaxNode.type];
    expect(handler, `handler : ${syntaxNode.type}`).to.not.be.undefined;
    this.evtCenter.emit("node.walk.before", syntaxNode);
    handler.walk(syntaxNode, { syntaxStack: this.syntaxStack });
    this.evtCenter.emit("node.walk.after", syntaxNode);
  }
}

module.exports = StackWalker;
