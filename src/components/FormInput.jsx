function FormInput(props) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          className="block w-full px-2 rounded-md border-0 py-1.5 font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:outline-none sm:text-sm sm:leading-6"
          {...props}
        />
      </div>
    </div>
  );
}


export default FormInput;