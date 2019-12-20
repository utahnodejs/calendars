import { OpenAPIObject } from '../interfaces';
export declare const buildDocumentBase: () => Pick<OpenAPIObject, "openapi" | "info" | "servers" | "components" | "security" | "tags" | "externalDocs">;
