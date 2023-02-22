const parseHeaders = (headers, newValue) => {
  newValue.forEach(({ key, value }) => {
    if (!headers.hasOwnProperty(key)) {
      headers[key] = value;
    }
  });
  return headers;
};

const staticHeaders = {
  "Content-Type": "application/json;",
  "Content-Length": "",
  Host: "api.languageweaver.com",
  Connection: "keep-alive",
};

const retrieveTextTranslation = async ({ headerInput, requestId }) => {
  const url = `https://api.languageweaver.com/v4/mt/translations/async/${requestId}/content`;
  const request = {
    method: "GET",
    headers: headerInput
      ? parseHeaders(staticHeaders, headerInput)
      : staticHeaders,
    body: {},
  };

  const response = await fetch(url, request);
  const data = await response.text();

  return { as: data };
};

export default retrieveTextTranslation;
