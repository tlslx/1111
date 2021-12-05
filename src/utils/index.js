/*
 * updated by zhangwenqi
 * -------------------------------------------------
 * 底层类库整理类
 *
 */

// http
// import './http/axios';

// prototype
import './prototype/date';
import './prototype/number';
import './prototype/string';

// helper
import validate from './helper/validate';
import cache from './helper/cache';
import dictionary from './helper/dictionary';
import util from './helper/util';
import ucpUtil from './helper/ucpUtil';

kindo.validate = validate;
kindo.cache = cache;
kindo.dictionary = dictionary;
kindo.util = util;
kindo.ucpUtil = ucpUtil;

export const $auth = require("./authUtil").default;
export const $locals = require("./localStorage").default;
export const $helper = require("./helperUtil").default;
// export const $mornAxios = require("./http/axios").default;
