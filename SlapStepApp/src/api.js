const HOST = "https://nice-shrimp-54.loca.lt";

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

  throw new Error("Unauthorized");
};
