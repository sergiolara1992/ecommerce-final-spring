const API_URL = "http://localhost:3000/products";

export const obtainProducts = async () => {
  try {
    const request = await (await fetch(API_URL)).json();
    return request;
  } catch (error) {
    console.error(error);
  }
};

export const getsearchmarket = async (search) => {
  try {
    const request = await (await fetch(API_URL + search)).json();

    return request;
  } catch (error) {
    console.error(error);
  }
};

export const productUpdate = async (id, newValue = {}) => {
  try {
    const propertyById = await getsearchmarket("/" + id);
    let response = await fetch(API_URL + "/" + id, {
      method: "PUT",
      body: JSON.stringify({ ...propertyById, ...newValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
