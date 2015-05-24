Package.describe({
  name: "grove:react",
  version: "0.2.0",
  summary: "React for Meteor - vendor files and essential mixins",
  git: "https://github.com/grovelabs/meteor-react/"
});

// get `react` npm module
Npm.depends({
  'react':'0.13.3'
});

Package.onUse( function(api) {
  api.versionsFrom('METEOR@1.1');

  // Tracker and ReactiveVar only supported on the client
  api.use([
    'tracker',
    'reactive-var',
    'underscore'
  ], 'client');

  var reactPath = '.npm/package/node_modules/react/dist/react-with-addons';

  if (process.argv[2] === 'build') {
    // The difference between development and production
    // versions of React is more than just minification. There are also
    // warnings that are removed and optimizations in place in the
    // production version when built from source with NPM.
    // Since we can't do that we check if we're building the app
    // for production and load the pre-built version
    api.addFiles( reactPath + '.min.js');
  } else {
    api.addFiles( reactPath + '.js');
  }

  api.addFiles([
    'src/ReactiveMixin.js',
    'src/DDPMixin.js'
  ], 'client');

  api.export([
    'ReactiveMixin',
    'DDPMixin'
  ], 'client');

});
