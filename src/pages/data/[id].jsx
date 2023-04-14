import { useRouter } from "next/router";
import React from "react";
import { useSWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());


function DetailPage() {
  const router = useRouter();
// Replace the endpoint with the api endpoint to get data
  const { data, error, isLoading } = useSWRConfig(
    "REPLACE_WITH_API_ENDPOINT_TO_GET_DATA",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  console.log(router.query.id);
  return <main className="grid place-content-center h-screen">Data:{JSON.stringify(data)}</main>;
}

export default DetailPage;
