const parseHeaders = (headers, newValue) => {
  newValue.forEach(({ key, value }) => {
    if (!headers.hasOwnProperty(key)) {
      headers[key] = value;
    }
  });
  return headers;
};

const retrieveTextTranslation = async ({
  headerInput,
  requestId,
  selectedModel,
  selectedProperty,
}) => {
  const staticHeaders = {
    Host: "api.languageweaver.com",
  };
  const url = `https://api.languageweaver.com/v4/mt/translations/async/${requestId}/content`;
  const request = {
    method: "GET",
    headers: headerInput
      ? parseHeaders(staticHeaders, headerInput)
      : staticHeaders,
  };

  const response = await fetch(url, request);
  const headers = response.headers;
  const isText = headers["content-type"] == "application/json" ? true : false;
  const data = await response.text();
  if (isText) {
    return { as: data };
  } else {
    console.log("My headers: ", headers);
    const fileBuffer = await response.blob();
    console.log("my file is: ", fileBuffer);
    try {
      const fileRef = await storeFile(
        selectedModel.name,
        selectedProperty[0].name,
        {
          contentType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          extension: "docx",
          fileBuffer: fileBuffer.buffer,
          fileName: headers["content-disposition"],
        },
        { headers: {} }
      );
      return { as: fileRef };
    } catch (error) {
      console.log("The error: ", error);
      return error;
    }
  }
};

export default retrieveTextTranslation;
