import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { checkType, sendRequest } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

// function to check if the input is a valid email or a 10 digit number

export default function Login() {
  const [isOtpSent, setIsOtpSent] = useState(false);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-5 text-center">
            <h1 className="text-2xl font-semibold text-center ">Sign in</h1>
            <div>
              or{" "}
              <Link href="/signup" className="underline">
                register
              </Link>
            </div>
          </div>
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {isOtpSent ? (
              <EnterOtpForm setIsOtpSent={setIsOtpSent} />
            ) : (
              <SendOtpForm setIsOtpSent={setIsOtpSent} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function EnterOtpForm({ setIsOtpSent = () => {}, isPage = false }) {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  // change /verify otp to api endpoint to verify otp
  const { trigger: verifyOtp, isMutating } = useSWRMutation(
    "/verify-otp",
    sendRequest,
    {
      onSuccess: () => router.push("/dashboard"),
    }
  );

  function onSubmitHandler(e) {
    e.preventDefault();
    verifyOtp({ otp: inputValue });
  }

  function handleBack() {
    if (isPage) {
      return router.push("/");
    }
    setIsOtpSent(false);
  }
  return (
    <form className="space-y-6" onSubmit={onSubmitHandler}>
      <FormInput
        label="Enter OTP"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <div className="space-y-2">
        <Button>{isMutating ? "Verifying OTP..." : "Verify OTP"}</Button>
        <Button type="button" onClick={handleBack} variant="outline">
          Back
        </Button>
      </div>
    </form>
  );
}

function SendOtpForm({ setIsOtpSent }) {
  const [inputValue, setInputValue] = useState("");

  // change /send-otp to url to send otp request
  const { trigger: sendOtp, isMutating } = useSWRMutation(
    "/send-otp",
    sendRequest,
    {
      onSuccess: () => setIsOtpSent(true),
    }
  );

  function onSubmitHandler(e) {
    e.preventDefault();
    const hasNumberEmail = checkType(inputValue);
    if (!hasNumberEmail)
      return alert("Please enter a valid email or phone number");
    sendOtp({ [hasNumberEmail]: inputValue });
  }
  return (
    <form className="space-y-6" onSubmit={onSubmitHandler}>
      <FormInput
        label="Email/Phone"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <div>
        <Button>{isMutating ? "Sending OTP..." : "Send OTP"}</Button>
      </div>
    </form>
  );
}
