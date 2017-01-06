import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
      'node_modules/bootstrap/dist/fonts/**'
  ];

  constructor() {
    super();
    this.APP_TITLE = 'Oblong';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
      // {src: 'plotly/index.js', inject: 'libs'},
      { src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs' },
      { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true }, // inject into css section
      { src: 'bootstrap/dist/css/bootstrap-theme.min.css', inject: true }, // inject into css section
      { src: 'bootstrap/dist/css/bootstrap-theme.min.css.map', inject: true }, // inject into css section
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      //{src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      {src: `node_modules/bootstrap/dist/js/bootstrap.min.js`, inject: 'libs'},
      {src: `node_modules/bootstrap/dist/css/bootstrap.min.css`, inject: true, vendor: true},
      {src: `node_modules/@swimlane/ngx-datatable/release/datatable.css`, inject: true, vendor: false},
      {src: `node_modules/@swimlane/ngx-datatable/release/material.css`, inject: true, vendor: false},
      {src: `node_modules/ng2-bs3-modal/bundles/ng2-bs3-modal.js`, inject: true, vendor:false},
    ];

    let additionalPackages: ExtendPackages[] = [
        // required for bootstrap dev build 
        {
          name:'ng2-bootstrap',
          path:'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
        },

        // required for bootstrap prod build
        {
          name:'ng2-bootstrap/*',
          path:'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
        },

        // mandatory dependency for ng2-bootstrap datepicker 
        {
          name:'moment',
          path:'node_modules/moment',
          packageMeta:{
            main: 'moment.js',
            defaultExtension: 'js'
          }
        },

        //required for angular2 jwt
        {
          name:'angular2-jwt',
          path:'node_modules/angular2-jwt/angular2-jwt.js'
        },

        //data table
        {
          name: '@swimlane/ngx-datatable',
          path:  `node_modules/@swimlane/ngx-datatable/release/index.js`,
          packageMeta: {
             main: 'release/index.js',
             defaultExtension : 'js'
          }
        },

        {
          name: '@swimlane/ngx-datatable/*',
          path:  `node_modules/@swimlane/ngx-datatable/release/index.js`,
          packageMeta: {
             main: 'release/index.js',
             defaultExtension : 'js'
          }
        },

        //modal
        {
          name: 'ng2-bs3-modal',
          path: `node_modules/ng2-bs3-modal/ng2-bs3-modal.js`
        }
      ];
    this.addPackagesBundles(additionalPackages);
    // this.addPackageBundles({
    //   name:'@angular/material',
    //   path:'node_modules/@angular/material/material.umd.js',
    //   packageMeta:{
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // });

    // Add packages (e.g. ng2-translate)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'ng2-translate',
    //   // Path to the package's bundle
    //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
    // }];
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
