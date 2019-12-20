"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function mergeAndUniq(a = [], b = []) {
    return lodash_1.uniq(lodash_1.merge(a, b));
}
exports.mergeAndUniq = mergeAndUniq;
