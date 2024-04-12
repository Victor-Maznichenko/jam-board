export const convertToDocFields = <T = Record<string, unknown>>(body: T) => {
  const fieldsBody: Record<string, unknown> = {};

  for (const key in body) {
    fieldsBody[key] = {[`${typeof body[key]}Value`]: body[key]};
  }

  return fieldsBody;
};
