const fetchPost = (url, paramsConfig) => {
  return fetch(url, {
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencode',
    },
    credentials: 'include',
    params: paramsConfig,
  }).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  });
};

const fetchJSON = (url, params) => {
  return fetch(url, {
    method: 'GET',
    headers: {},
    credentials: 'include',
    params: params,
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
};
export { fetchPost, fetchJSON };
