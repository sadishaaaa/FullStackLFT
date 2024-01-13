export function getUserIdFromToken(accessToken: string): number | null {
  try {
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
