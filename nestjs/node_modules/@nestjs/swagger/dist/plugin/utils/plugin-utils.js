"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const path_1 = require("path");
const ts = require("typescript");
const ast_utils_1 = require("./ast-utils");
function getDecoratorOrUndefinedByNames(names, decorators) {
    return (decorators || ts.createNodeArray()).find(item => names.includes(ast_utils_1.getDecoratorName(item)));
}
exports.getDecoratorOrUndefinedByNames = getDecoratorOrUndefinedByNames;
function getTypeReferenceAsString(type, typeChecker) {
    if (ast_utils_1.isArray(type)) {
        const arrayType = ast_utils_1.getTypeArguments(type)[0];
        const elementType = getTypeReferenceAsString(arrayType, typeChecker);
        if (!elementType) {
            return undefined;
        }
        return `[${elementType}]`;
    }
    if (ast_utils_1.isBoolean(type)) {
        return Boolean.name;
    }
    if (ast_utils_1.isNumber(type)) {
        return Number.name;
    }
    if (ast_utils_1.isString(type)) {
        return String.name;
    }
    if (isPromiseOrObservable(ast_utils_1.getText(type, typeChecker))) {
        const typeArguments = ast_utils_1.getTypeArguments(type);
        const elementType = getTypeReferenceAsString(lodash_1.head(typeArguments), typeChecker);
        if (!elementType) {
            return undefined;
        }
        return elementType;
    }
    if (type.isClass()) {
        return ast_utils_1.getText(type, typeChecker);
    }
    return undefined;
}
exports.getTypeReferenceAsString = getTypeReferenceAsString;
function isPromiseOrObservable(type) {
    return type.includes('Promise') || type.includes('Observable');
}
exports.isPromiseOrObservable = isPromiseOrObservable;
function hasPropertyKey(key, properties) {
    return properties
        .filter(item => !isDynamicallyAdded(item))
        .some(item => item.name.getText() === key);
}
exports.hasPropertyKey = hasPropertyKey;
function replaceImportPath(typeReference, fileName) {
    if (!typeReference.includes('import')) {
        return typeReference;
    }
    let importPath = /\(\"([^)]).+(\")/.exec(typeReference)[0];
    if (!importPath) {
        return undefined;
    }
    importPath = importPath.slice(2, importPath.length - 1);
    let relativePath = path_1.posix.relative(path_1.dirname(fileName), importPath);
    relativePath = relativePath[0] !== '.' ? './' + relativePath : relativePath;
    typeReference = typeReference.replace(importPath, relativePath);
    return typeReference.replace('import', 'require');
}
exports.replaceImportPath = replaceImportPath;
function isDynamicallyAdded(identifier) {
    return identifier && !identifier.parent && identifier.pos === -1;
}
exports.isDynamicallyAdded = isDynamicallyAdded;
