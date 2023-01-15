const fetchPqSim = () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const dataArr = fetch(url)
    .then((response) => response.json());
  return dataArr;
};

export default fetchPqSim;
