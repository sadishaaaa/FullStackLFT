export function getUserIdFromToken(accessToken: string): number | null {
  try {
    // atob is a function that decodes a base64-encoded string. This is used to decode the payload, revealing the JSON data.
    // Decode the token. This assumes the token is a JWT.
    const tokenData = JSON.parse(atob(accessToken.split(".")[1]));
    console.log(tokenData);

    // Assuming the user ID is stored in the token.
    return tokenData.id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
