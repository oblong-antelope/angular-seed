import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

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
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      //{src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      {src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs'},
      // {src: 'plotly-latest.min.js', inject:'libs'},
      {src: `node_modules/bootstrap/dist/css/bootstrap.min.css`, inject: true, vendor: true},
      {src: `node_modules/angular2-data-table/release/datatable.css`, inject: true, vendor: false},
      {src: `node_modules/angular2-data-table/release/material.css`, inject: true, vendor: false},
    ];

    this.SYSTEM_CONFIG_DEV.paths['angular2-data-table'] =
      `node_modules/angular2-data-table/release/index`;

    this.SYSTEM_BUILDER_CONFIG.packages['angular2-data-table'] = {
        main: 'release/index.js',
        defaultExtension : 'js'
    };

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
