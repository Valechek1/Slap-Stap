const HOST = "https://dfc4-89-208-20-134.ngrok.io";
const API_KEY = "bd06a8223a71d916a111c9dc6b6eb29a";

export const startAuth = async (phone) => {
  const response = await fetch(`${HOST}/authorisation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
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

export const getWeatherAPI = async () => {
  const api_URL = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${API_KEY}`
  );
  const data = await api_URL.json();
  console.log(data);
  return data;
};
