export const getAllChars = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/characters`);
    const data = response;

    return data;
  } catch (e) {
    console.error(e);
  }
};
