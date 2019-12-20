"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
exports.exploreGlobalApiExtraModelsMetadata = (metatype) => {
    const extraModels = Reflect.getMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, metatype);
    return extraModels || [];
};
exports.exploreApiExtraModelsMetadata = (instance, prototype, method) => Reflect.getMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, method) || [];
