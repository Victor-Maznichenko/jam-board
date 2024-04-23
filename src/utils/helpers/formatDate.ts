export const formatDate = (strDate: string) => {
  const date = new Date(strDate);
  return date.toLocaleString('ru', {day: 'numeric', month: 'long'});
};
