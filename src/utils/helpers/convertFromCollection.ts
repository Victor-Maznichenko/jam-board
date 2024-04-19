import {convertFromFields} from './convertFromFields';
import {Document} from '@/api/types';

export const convertFromCollection = <T = Record<string, unknown>>(documents: Document[]) => {
  const resultArray:T[] = [];
  console.log(documents)
  documents.forEach((doc) => {
    resultArray.push(<T>convertFromFields(doc.fields))
  });

  return resultArray;
};
