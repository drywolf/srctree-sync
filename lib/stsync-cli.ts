
let pkg = require('../package.json');
import cli = require('commander');
import Git = require("nodegit");
import path = require("path");

cli
  .version(pkg.version)
  .option('-i, --init', 'Initialize the config file for st-sync')
  .option('-s, --save', 'Store the current SourceTree bookmarks for the current project directory')
  .option('-xr, --excludeRoot', 'Do not add the root repository to the generated bookmarks')
  .parse(process.argv);

let handleRoot = repository => 
{
  let cb = sub_mod => 
  {
    console.log('submod', sub_mod.path());
    return 0;
  };

  return Git.Submodule.foreach(repository, cb, {});
};

var repo_path = cli.args.length > 0 ? path.resolve(cli.args[0]) : null;
Git.Repository.open(repo_path || process.cwd())
  .then(handleRoot);
