const setIds = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].id = i;
  }
  return arr;
};

export default setIds;
