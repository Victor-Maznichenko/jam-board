// import {createEffect, createStore, sample} from 'effector';

// import {Project} from '@/api/types';

// import {getFx} from './firebase';

// // Stores
// export const $project = createStore<null | Project>(null);

// // Effects
// export const getProjectFx = createEffect(async (id: string) => await getFx(`/projects/${id}`));

// // Samples
// sample({
//   clock: getProjectFx.doneData,
//   target: $currentProject,
// });
