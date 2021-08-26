const HOST = "https://dull-bobcat-60.loca.lt";

export const startAuth = async (phone) => {
  console.log(phone);
  const response = await fetch(`${HOST}/authorisation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
    }),
  });

  if (response.status === 200) {
    return null;
  }

  throw new Error("Неавторизованный пользователь");
};

export const endAuth = async (phone, code) => {
  console.log(phone, code);
  const response = await fetch(`${HOST}/endAuth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      code,
    }),
  });

  if (response.status === 200) {
    return null;
  }

  throw new Error("Unsuccessful registration");
};
