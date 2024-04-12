type DocFields = Record<string, Record<string, unknown>>;

export const convertFromDocFields = <T = Record<string, unknown>>(docFields: DocFields) => {
  const fieldsBody: Record<string, unknown> = {};

  for (const key in docFields) {
    fieldsBody[key] = Object.values(docFields[key])[0];
  }

  return fieldsBody as T;
};
