const fetchPqSim = () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const dataArr = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const arrOfObj = Object.entries(data)
        .map(([key, value]) => ({ ...value, id: key }));
      return arrOfObj.filter((curren) => curren.id !== 'USDT');
    });
  return dataArr;
};

export default fetchPqSim;
