const parseHeaders = (headers, newValue) => {
  newValue.forEach(({ key, value }) => {
    if (!headers.hasOwnProperty(key)) {
      headers[key] = value;
    }
  });
  return headers;
};

const checkStatus = async ({ headerInput, requestId }) => {
  const staticHeaders = {
    Host: "api.languageweaver.com",
  };
  const requestURL = `https://api.languageweaver.com/v4/mt/translations/async/${requestId}`;
  const statusRequest = {
    method: "GET",
    headers: headerInput
      ? parseHeaders(staticHeaders, headerInput)
      : staticHeaders,
  };

  const response = await fetch(requestURL, statusRequest);
  const data = await response.text();

  return { as: data };
};

export default checkStatus;
