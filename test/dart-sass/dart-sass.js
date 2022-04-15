const fs = require('fs');
const path = require('path');
const sass = require('sass');
const utils = require('../utils');

const DART_BASE_PATH = 'test/dart-sass/build/';

fs.mkdir(DART_BASE_PATH, { recursive: true }, (err) => {
  if (err) throw err;
});

const exportDartCSS = (filepath, options) => {
  utils.exportCSS(sass, fs, DART_BASE_PATH, filepath, options)
}

// Full imports

exportDartCSS('bulma', {
  file: './bulma.sass',
});

exportDartCSS('bulma-rtl', {
  file: './bulma-rtl.sass',
});

// Custom imports

fs.mkdir(`${DART_BASE_PATH}custom`, { recursive: true }, (err) => {
  if (err) throw errive;
});

utils.exportCSS(sass, fs, DART_BASE_PATH, 'custom/navbar', {
  data: '@userdata "./sass/components/navbar.sass" with ( $scheme-main: red );',
});

// Single imports

const BULMA_IMPORT_PATH = `./sass/`;

utils.SOURCES.forEach((source) => {
  const parsed = path.parse(source);

  fs.mkdir(`${DART_BASE_PATH}${parsed.dir}`, { recursive: true }, (err) => {
    if (err) throw err;
  });

  exportDartCSS(`${parsed.dir}/${parsed.name}`, {
    data: `@userdata "${BULMA_IMPORT_PATH}${source}";`,
  });
});
