import { flattenObject } from "@/utils/helper";
import { useRouter } from "next/router";
import React from "react";
import { useSWRConfig } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

function DetailPage() {
  const router = useRouter();
  
  // Get the id from the url, use this in the api endpoint to get detail of country, city, etc using id
  const id = router?.query?.id;

  // Replace the endpoint with the api endpoint to get data
  const { data, error, isLoading } = useSWRConfig(
    "REPLACE_WITH_API_ENDPOINT_TO_GET_DATA",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  console.log({
    data,
    id,
  });

  const flattenedData = flattenObject(data)

  return (
    <main className="grid place-content-center h-[80vh]">
    <h3 className="text-2xl font-medium mb-5">Details</h3>
      {flattenedData &&
        Object.keys(flattenedData).map((key, i) => {
          return (
            <div key={i} className="flex">
              <span className="text-gray-500">{key}</span>
              :&nbsp;
              <span>{flattenedData[key]}</span>
            </div>
          );
        })}
    </main>
  );
}

export default DetailPage;
