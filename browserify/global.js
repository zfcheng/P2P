'use strict';
console.log('========',global);
global._ = require('lodash');
global.request = require('superagent');
global.request = require('promisingagent');
global.$ = global.jQuery = require('jquery');
global.moment = require('moment');
global.Ractive = require('ractive');