"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stripLastSlash(path) {
    return path && path[path.length - 1] === '/'
        ? path.slice(0, path.length - 1)
        : path;
}
exports.stripLastSlash = stripLastSlash;
