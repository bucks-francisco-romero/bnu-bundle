require('log-timestamp');

var exec = require('child_process').exec;
var args = process.argv.slice(2);

if (args.length < 2) {
  console.error('\x1b[31m', 'Please provide paths to the input and the output file');
} else {
  exec(`npx esbuild ${args[0]} --bundle --outfile=${args[1]}`, (err) => {
    if (err) {
      return console.error('\x1b[31m', err);
    }

    console.log('\x1b[32m', `JavaScript built to file ${args[1]}`);
  });
}
