const { Command } = require("commander");
const Kun = require("./analysis/Kun");

const program = new Command();
program.version("0.0.1");

program
  .requiredOption("-s, --source  <type>", "the analysis file path")
  .option("-o, --outdir  <type>", "the out dir");

program.parse(process.argv);

const options = program.opts();

new Kun(options.source, options.outdir).analysis();
