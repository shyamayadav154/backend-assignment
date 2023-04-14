import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { sendRequest } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWRMutation from 'swr/mutation'

const genderOptions = ["Select", "Male", "Female"];

function SignUp() {
  const [formValues, setFormValues] = useState({});
  const router = useRouter('/login')
// change /signup to api endpoint to signup
  const {trigger:signUpRequest} = useSWRMutation('/signup', sendRequest, {
    onSuccess: () => router.push('/login')
    })

  function onChangeHandler(e) {
    const { name, value } = e.target;

    console.log({
      name,
      value,
    });
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    console.log(formValues);
    signUpRequest(formValues)
  }
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">   <div className="py-5 text-center">
            <h1 className="text-2xl font-semibold text-center ">Sign up</h1>
            <div>
              or <Link href="/login" className="underline">login</Link>
            </div>
          </div>
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form
            onChange={onChangeHandler}
            className="space-y-6"
            onSubmit={onSubmitHandler}
          >
            <FormInput name="first_name" label="First Name" />
            <FormInput name="last_name" label="Last Name" />
            <Select label="Gender" name="gender" options={genderOptions} />
            <FormInput label="Email" name="email" />
            <FormInput label="Phone Number" name="phone" />
            <div>
              <Button>Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Select({ options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {props.label}
      </label>
      <select
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...props}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default SignUp;
