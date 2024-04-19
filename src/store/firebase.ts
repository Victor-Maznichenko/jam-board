import {createEffect, merge} from 'effector';

import {createDocById, createEntity, deleteEntity, getEntity, updateEntity} from '@/api/requests/firebase';
import {FirebaseError} from '@/api/types';

// Effects
export const createDocByIdFx = createEffect<typeof createDocById, FirebaseError>(createDocById);
export const createEntityFx = createEffect<typeof createEntity, FirebaseError>(createEntity);
export const updateEntityFx = createEffect<typeof updateEntity, FirebaseError>(updateEntity);
export const deleteEntityFx = createEffect<typeof deleteEntity, FirebaseError>(deleteEntity);
export const getEntityFx = createEffect<typeof getEntity, FirebaseError>(getEntity);

// Events
export const baseRequestFailed = merge([
  createDocByIdFx.failData,
  updateEntityFx.failData,
  deleteEntityFx.failData,
  createEntityFx.failData,
  getEntityFx.failData,
]);
