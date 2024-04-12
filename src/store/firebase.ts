/* 
ВОПРОС:   Почему здесь создаются Effects?
ПРОБЛЕМА: Как обработать ошибку 401 [invalid token] Если по этим заготовкам могут делаться тысячи запросов?
РЕШЕНИЕ:  Сделать Effect обрабатывать его ошибку, а новые эффекты создавать копируя через attach. 
 */
import {createEffect, merge} from 'effector';

import {createDocRequest, getDocRequest, updateDocRequest} from '@/api/request';
import {FirebaseError} from '@/api/types';

// Effects
export const createDocFx = createEffect<typeof createDocRequest, FirebaseError>(createDocRequest);
export const updateDocFx = createEffect<typeof updateDocRequest, FirebaseError>(updateDocRequest);
export const deleteDocFx = createEffect<typeof getDocRequest, FirebaseError>(getDocRequest);
export const getDocFx = createEffect<typeof getDocRequest, FirebaseError>(getDocRequest);

// Events
export const baseRequestFailed = merge([
  createDocFx.failData,
  updateDocFx.failData,
  deleteDocFx.failData,
  getDocFx.failData,
]);
