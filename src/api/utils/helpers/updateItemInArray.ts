interface Item {
  id: string;
}

export const updateItemInArray = <T extends Item>(newItem: T, array: T[]) => {
  const updatedArray = array.map((item) => {
    if (item.id === newItem.id) {
      return {...item, ...newItem};
    }
    return item;
  });

  return updatedArray;
};
