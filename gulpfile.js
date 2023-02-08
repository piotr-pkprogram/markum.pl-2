const { src, dest } = require('gulp');
const surge = require('gulp-surge');

const moveZipFiles = () => src('./src/public/zip/*.zip').pipe(dest('.next/server/src/public/zip/'));

const deploy = () =>
  surge({
    project: './.next', // Path to your static build directory
    domain: 'markum-pl.surge.sh' // Your domain or Surge subdomain
  });

exports.moveZipFiles = moveZipFiles;
exports.deploy = deploy;
