import { useCallback, useEffect, useState } from "react";

// async function sendHttpRequest(url, config) {
//   const response = await fetch(url, config);

//   const resData = await response.json();

//   if (!response.ok) {
//     throw new Error(
//       resData.message || "Something went wrong, failed to send request."
//     );
//   }
//   return resData;
// }

async function sendHttpRequest(url, config, bodyData) {
  const fetchConfig = {
    method: config.method || "GET",
    headers: config.headers || {},
  };

  if (fetchConfig.method !== "GET" && fetchConfig.method !== "HEAD") {
    fetchConfig.body = bodyData;
  }

  const response = await fetch(url, fetchConfig);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest(requestBody) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config, requestBody);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong.");
        console.log(error);
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method == "GET" || !config.method)) || !config)
      sendRequest();
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}
