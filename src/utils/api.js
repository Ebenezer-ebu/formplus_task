const url = process.env.REACT_APP_URL;

export const getData = async () => {
  let response = await fetch(url);
  let res = await response.json();
  return res;
};
