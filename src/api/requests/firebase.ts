import {convertToFields} from '@/utils/helpers';

import {CreateDocByIdParams, RequestParams} from '../types';
import {baseFetch} from '../utils/fetches';

// Запрос для создания документа с указанным id Firebase
export const createDocById = ({path, id}: CreateDocByIdParams) =>
  baseFetch.post({
    path: `documents${path}`,
    params: {
      documentId: id,
    },
  });

// Запрос для создания документа/коллекции Firebase
export const createEntity = ({path}: Pick<RequestParams, 'path'>) =>
  baseFetch.post({
    path: `documents${path}`,
  });

// Запрос для обновления документа/коллекции Firebase
export const updateEntity = ({path, body}: Pick<RequestParams, 'path' | 'body'>) =>
  baseFetch.patch({
    path: `documents${path}`,
    body: {
      fields: convertToFields(body),
    },
  });

// Запрос для получения документа/коллекции Firebase
export const getEntity = async ({path}: Pick<RequestParams, 'path'>) =>
  baseFetch.get({
    path: `documents${path}`,
  });

// Запрос для удаления документа/коллекции Firebase
export const deleteEntity = ({path}: Pick<RequestParams, 'path'>) =>
  baseFetch.delete({
    path: `documents${path}`,
  });
