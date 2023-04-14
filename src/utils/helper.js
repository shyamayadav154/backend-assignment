export function checkType(str) {
  if (/^\d{10}$/.test(str)) {
    // string is a number
    return "number";
  } else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
    // string is an email
    return "email";
  } else {
    // string is neither a number nor an email
    return null;
  }
}

export async function sendRequest(url, args) {
  console.log({
    url,
    arguments: args,
  });
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  }).then((res) => res.json());
}
