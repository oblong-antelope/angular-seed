// Load our SystemJS configuration.
System.config({
  baseURL: '/base/',
  defaultJSExtensions: true,
  paths: {
    'angular2/*': 'node_modules/angular2/*.js',
    'rxjs/*': 'node_modules/rxjs/*.js',
    'angular2-data-table/*': 'node_modules/angular2-data-table/*.js'
  }
});
