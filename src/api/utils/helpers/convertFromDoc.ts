export const convertFromDoc = <T = Record<string, unknown>>(doc: Api.Document) => {
  const data: Record<string, unknown> = {};

  for (const key in doc.fields) {
    data[key] = Object.values(doc.fields[key])[0];
  }

  return data as T;
};
