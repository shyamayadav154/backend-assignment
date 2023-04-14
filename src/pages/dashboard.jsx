import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { sendRequest } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDebounce } from "react-use";
import useSWRMutation from "swr/mutation";

function Dashboard() {
  const router = useRouter();
  return (
    <section>
      <header className="flex justify-between py-2.5 px-2 border-b">
        <h1 className="text-xl font-semibold ">Dashboard</h1>
        <div>
          <Button onClick={() => router.push("/login")}>Log out</Button>
        </div>
      </header>
      <article className="w-[600px] mx-auto mt-10">
        <SearchInputForm />
      </article>
    </section>
  );
}

// const results = [
//   {
//     id: 1,
//     name: "John Doe",
//   },
//   {
//     id: 2,
//     name: "Delhi",
//   },
// ];

function SearchInputForm() {
  const [inputValue, setInputValue] = useState("");
  function onSubmitHandler(e) {
    e.preventDefault();
  }
// change /search to api endpoint to search
  const { trigger: search, data } = useSWRMutation("/search", sendRequest, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useDebounce(
    () => {
      search({ search: inputValue });
    },
    200,
    [inputValue]
  );

  const results = data?.data || [];

  return (
    <>
      <h3 className="text-xl font-medium">Search</h3>

      <form onSubmit={onSubmitHandler} className="flex relative flex-col ">
        <FormInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {results.length > 0 && <ShowResults results={results} />}
      </form>
    </>
  );
}

function ShowResults({ results }) {
  return (
    <div className="absolute mt-12   inset-x-0 overflow-y-auto h-72 rounded shadow-lg">
      {results.map((result) => (
        <Link
          className="py-1.5 block font-medium hover:bg-gray-50 cursor-pointer px-2"
          key={result.id}
          href={`/data/${result.id}`}
        >
          {result.name}
        </Link>
      ))}
    </div>
  );
}

export default Dashboard;
