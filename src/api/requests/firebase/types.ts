export interface CreateDocByIdParams {
  path: string;
  id: string;
}

export type WriteEntityParams = Pick<Api.RequestParams, 'path' | 'body'>;

export type GetEntityParams = Pick<Api.RequestParams, 'path'>;

export type DeleteEntityParams = Pick<Api.RequestParams, 'path'>;

export interface GetDocsQueryParams {
  filter: CompositeFilter;
  collectionId: string;
}

export interface FilterParam {
  field: string;
  op: OperatorParam;
  value: unknown;
}

export interface CompositeFilter {
  op?: OperatorFilter;
  params: FilterParam[];
}

export enum OperatorFilter {
  OPERATOR_UNSPECIFIED = 'OPERATOR_UNSPECIFIED',
  AND = 'AND',
  OR = 'OR',
}

export enum OperatorParam {
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  OPERATOR_UNSPECIFIED = 'OPERATOR_UNSPECIFIED',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  ARRAY_CONTAINS_ANY = 'ARRAY_CONTAINS_ANY',
  ARRAY_CONTAINS = 'ARRAY_CONTAINS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  NOT_EQUAL = 'NOT_EQUAL',
  NOT_IN = 'NOT_IN',
  EQUAL = 'EQUAL',
  IN = 'IN',
}
