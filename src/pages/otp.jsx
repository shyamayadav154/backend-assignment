import Link from "next/link";
import { EnterOtpForm } from "./login";

function Otp() {
  return (
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
          <EnterOtpForm isPage={true} />
        </div>
      </div>
    </div>
  );
}
export default Otp;
