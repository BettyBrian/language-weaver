const parseHeaders = (headers, newValue) => {
  newValue.forEach(({ key, value }) => {
    if (!headers.hasOwnProperty(key)) {
      headers[key] = value;
    }
  });
  return headers;
};

const generateUrl = (url, protocol) => {
  let theUrl = `${protocol}://${url}`;
  return theUrl;
};

const translateDocument = async ({
  url,
  method,
  headerInput,
  textFile,
  sourceLang,
  targetLang,
  inputFormat,
  protocol,
}) => {
  const fetchUrl = generateUrl(url, protocol);
  const staticHeaders = {
    "Content-Type": "application/json",
    Host: "api.languageweaver.com",
  };
  const request = {
    method,
    headers: headerInput
      ? parseHeaders(staticHeaders, headerInput)
      : staticHeaders,
    body: JSON.stringify({
      input: [textFile],
      sourceLanguageId: sourceLang,
      targetLanguageId: targetLang,
      submissionType: "text",
      model: "generic",
      inputFormat: inputFormat,
      dictionaries: [],
    }),
  };

  const response = await fetch(fetchUrl, request);
  const data = await response.text();

  return { as: data };
};

export default translateDocument;
