async function login(username, password) {
  const res = await postLogin(username, password);
  const resJson = await res.json();
  
  if (res.ok) {
    storeToken(resJson.jwt);
  }
  return resJson;
}

async function postLogin(username, password) {
  const response = await fetch("http://localhost:5500/api/user/log-in", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      username,
      password,
    }),
  });
  return response;
}



function storeToken(token) {
  localStorage.setItem("accessToken", token);
}

function getToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Client token not found");
  return token;
}
async function logout() {
  deleteToken();
}

function deleteToken() {
  localStorage.removeItem("accessToken");
}

async function refreshToken() {
  const response = await fetch("http://localhost:5500/api/user/refresh-token");
  const { jwt } = await response.json();
  storeToken(jwt);
}

export { login };
