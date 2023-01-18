export const setupUserInfoToLocalStorage = (result) => {
  localStorage.setItem("jwt", result?.jwt);
  localStorage.setItem("username", result?.user?.username);
  localStorage.setItem("ACCESS_TOKEN", result?.jwt);
  localStorage.setItem("USER", JSON.stringify(result?.user));
};

export const clearUserInfoFromLocalStorage = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("USER");
};

export const checkAuth = () => {
  let authToken = localStorage.getItem("ACCESS_TOKEN");
  if (authToken && authToken !== null && authToken !== undefined) {
    return true;
  } else {
    return false;
  }
};

export const getLoggedInUser = () => {
  let user = JSON.parse(localStorage.getItem("USER"));
  return user;
};
