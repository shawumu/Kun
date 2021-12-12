const acorn = require("acorn");
const escodegen = require("escodegen");
const fs = require("fs");

const StackWalker = require("./walker/StackWalker");

class Kun {
  constructor(source, outdir) {
    this.source = source;
    this.outdir = outdir;
  }

  analysis() {
    const syntaxTree = this.getSystaxTree();
    const stackWalker = new StackWalker([]);
    stackWalker.bfs(syntaxTree);
    this.write(syntaxTree);
  }

  getSystaxTree() {
    const comments = [];
    const tokens = [];
    const fileContent = fs.readFileSync(this.source, "utf-8");
    const syntaxTree = acorn.parse(fileContent, {
      locations: true,
      ranges: true,
      onComment: comments,
      onToken: tokens
    });
    return syntaxTree;
  }

  write(syntaxTree) {
    if (this.outdir) {
      const fileContent = escodegen.generate(syntaxTree, { comment: true });
      fs.writeFileSync(this.outdir, fileContent);
    }
  }
}

module.exports = Kun;
