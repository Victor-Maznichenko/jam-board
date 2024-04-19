import {DocFields} from '@/api/types';

export const convertFromFields = <T = Record<string, unknown>>(docFields: DocFields) => {
  const fieldsBody: Record<string, unknown> = {};

  for (const key in docFields) {
    fieldsBody[key] = Object.values(docFields[key])[0];
  }

  return fieldsBody as T;
};
