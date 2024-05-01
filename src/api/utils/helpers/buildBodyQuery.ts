import {
  CompositeFilter,
  FilterParam,
  GetDocsQueryParams,
  OperatorFilter,
} from '@/api/requests/firebase/types';

import {convertToFields} from './convertToFields';

type BuildBodyQueryParams = GetDocsQueryParams;

const buildFieldFilter = ({param}: {param: FilterParam}) => ({
  fieldFilter: {
    field: {
      fieldPath: param.field,
    },
    op: param.op,
    ...convertToFields({value: param.value}),
  },
});

const buildCompositeFilter = ({op = OperatorFilter.AND, params}: CompositeFilter) => {
  const filters = params.map((param) => buildFieldFilter({param}));
  return {
    compositeFilter: {op, filters},
  };
};

export const buildBodyQuery = ({collectionId, filter}: BuildBodyQueryParams) => {
  if (!filter.params.length) return {};
  if (filter.params.length === 1) {
    return {
      structuredQuery: {
        from: [
          {
            collectionId,
            allDescendants: true,
          },
        ],
        where: buildFieldFilter({param: filter.params[0]}),
      },
    };
  }

  return {
    structuredQuery: {
      from: [
        {
          collectionId,
          allDescendants: true,
        },
      ],
      where: buildCompositeFilter({op: filter.op, params: filter.params}),
    },
  };
};
