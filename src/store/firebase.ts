import {createEffect, merge} from 'effector';

import {
  createDocById,
  deleteEntity,
  getDocsQuery,
  getEntity,
  writeEntity,
} from '@/api/requests/firebase';

// Effects
export const createDocByIdFx = createEffect<typeof createDocById, Api.FirebaseError>(createDocById);
export const deleteEntityFx = createEffect<typeof deleteEntity, Api.FirebaseError>(deleteEntity);
export const getDocsQueryFx = createEffect<typeof getDocsQuery, Api.FirebaseError>(getDocsQuery);
export const writeEntityFx = createEffect<typeof writeEntity, Api.FirebaseError>(writeEntity);
export const getEntityFx = createEffect<typeof getEntity, Api.FirebaseError>(getEntity);

// Events
export const baseRequestFailed = merge([
  createDocByIdFx.failData,
  deleteEntityFx.failData,
  getDocsQueryFx.failData,
  writeEntityFx.failData,
  getEntityFx.failData,
]);
