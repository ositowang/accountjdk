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

export { fetchPost };
