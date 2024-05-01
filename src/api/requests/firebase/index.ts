import {baseFetch} from '@/api/utils/fetches';
import {buildBodyQuery, convertToFields} from '@/api/utils/helpers';

import {
  CreateDocByIdParams,
  DeleteEntityParams,
  GetDocsQueryParams,
  GetEntityParams,
  WriteEntityParams,
} from './types';

// Запрос для создания документа с указанным id Firebase
export const createDocById = ({path, id}: CreateDocByIdParams) =>
  baseFetch.post({
    path: `documents${path}`,
    params: {
      documentId: id,
    },
  });

// Запрос для записи документа/коллекции Firebase
export const writeEntity = ({path, body = {}}: WriteEntityParams) =>
  baseFetch.patch({
    path: `documents${path}`,
    body: {
      fields: convertToFields(body),
    },
  });

// Запрос для получения документа/коллекции Firebase
export const getEntity = async ({path}: GetEntityParams) =>
  baseFetch.get({
    path: `documents${path}`,
  });

// Запрос для удаления документа/коллекции Firebase
export const deleteEntity = ({path}: DeleteEntityParams) =>
  baseFetch.delete({
    path: `documents${path}`,
  });

export const getDocsQuery = ({collectionId, filter}: GetDocsQueryParams) =>
  baseFetch.post({
    path: 'documents:runQuery',
    body: buildBodyQuery({collectionId, filter}),
  });
