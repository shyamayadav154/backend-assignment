function Button({ children, variant = "primary", ...otherProps }) {
  return (
    <button
      className={`flex w-full justify-center rounded-md ${
        variant === "primary"
          ? "bg-indigo-600 hover:bg-indigo-500"
          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
      } px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
