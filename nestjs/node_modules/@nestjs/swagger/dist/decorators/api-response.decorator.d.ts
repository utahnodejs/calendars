import { Type } from '@nestjs/common';
import { ResponseObject, SchemaObject } from '../interfaces/open-api-spec.interface';
export interface ApiResponseMetadata extends Omit<ResponseObject, 'description'> {
    status?: number | 'default';
    type?: Type<unknown> | Function | [Function] | string;
    isArray?: boolean;
    description?: string;
}
export interface ApiResponseSchemaHost extends Omit<ResponseObject, 'description'> {
    schema: SchemaObject;
    status?: number;
    description?: string;
}
export declare type ApiResponseOptions = ApiResponseMetadata | ApiResponseSchemaHost;
export declare function ApiResponse(options: ApiResponseOptions): any;
export declare const ApiOkResponse: (options?: ApiResponseOptions) => any;
export declare const ApiCreatedResponse: (options?: ApiResponseOptions) => any;
export declare const ApiAcceptedResponse: (options?: ApiResponseOptions) => any;
export declare const ApiNoContentResponse: (options?: ApiResponseOptions) => any;
export declare const ApiMovedPermanentlyResponse: (options?: ApiResponseOptions) => any;
export declare const ApiBadRequestResponse: (options?: ApiResponseOptions) => any;
export declare const ApiUnauthorizedResponse: (options?: ApiResponseOptions) => any;
export declare const ApiTooManyRequestsResponse: (options?: ApiResponseOptions) => any;
export declare const ApiNotFoundResponse: (options?: ApiResponseOptions) => any;
export declare const ApiInternalServerErrorResponse: (options?: ApiResponseOptions) => any;
export declare const ApiBadGatewayResponse: (options?: ApiResponseOptions) => any;
export declare const ApiConflictResponse: (options?: ApiResponseOptions) => any;
export declare const ApiForbiddenResponse: (options?: ApiResponseOptions) => any;
export declare const ApiGatewayTimeoutResponse: (options?: ApiResponseOptions) => any;
export declare const ApiGoneResponse: (options?: ApiResponseOptions) => any;
export declare const ApiMethodNotAllowedResponse: (options?: ApiResponseOptions) => any;
export declare const ApiNotAcceptableResponse: (options?: ApiResponseOptions) => any;
export declare const ApiNotImplementedResponse: (options?: ApiResponseOptions) => any;
export declare const ApiPayloadTooLargeResponse: (options?: ApiResponseOptions) => any;
export declare const ApiRequestTimeoutResponse: (options?: ApiResponseOptions) => any;
export declare const ApiServiceUnavailableResponse: (options?: ApiResponseOptions) => any;
export declare const ApiUnprocessableEntityResponse: (options?: ApiResponseOptions) => any;
export declare const ApiUnsupportedMediaTypeResponse: (options?: ApiResponseOptions) => any;
export declare const ApiDefaultResponse: (options?: ApiResponseOptions) => any;
