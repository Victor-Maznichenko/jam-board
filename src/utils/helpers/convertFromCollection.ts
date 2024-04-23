import {convertFromFields} from './convertFromFields';
import {Document} from '@/api/types';

export const convertFromCollection = <T = Record<string, unknown>>(documents: Document[]) => {
  const resultArray:T[] = [];
  documents.forEach((doc) => {
    if(!doc.fields) return;
    resultArray.push(<T>convertFromFields(doc.fields))
  });

  return resultArray;
};
