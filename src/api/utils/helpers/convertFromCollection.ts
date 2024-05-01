import {convertFromDoc} from './convertFromDoc';

export const convertFromCollection = <T = Record<string, unknown>>(listDocs: Api.ListDocuments) => {
  const resultArray:T[] = [];
  listDocs.documents.forEach((doc) => {
    if(!doc.fields) return;
    resultArray.push(<T>convertFromDoc(doc))
  });

  return resultArray;
};
