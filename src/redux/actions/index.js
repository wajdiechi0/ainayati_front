import axios from "axios";

export async function sendResetLink(email) {
  let result = await axios
    .post("http://127.0.0.1:8000/api/password/create", {
      email: email
    })
    .then(response => response.data);
  return {
    type: "sendReset",
    payload: result.code === "0" ? true : false
  };
}

export async function resetPassword(email, password, c_password, token) {
  let result = await axios
    .post("http://127.0.0.1:8000/api/password/reset/", {
      email: email,
      password: password,
      password_confirmation: c_password,
      token: token
    })
    .then(response => response.data);
    return {
    type: "resetPassword",
    payload: result
  };
}

export async function login(email, password) {
  let result = await axios
    .post("http://127.0.0.1:8000/api/loginUser", {
      email: email,
      password: password
    })
    .then(response => response.data);
  return {
    type: "login",
    payload: result
  };
}

export async function register(
  email,
  password,
  c_password,
  name,
  h_address,
  birthdate,
  gender,
  type
) {
  let result = {};
  switch (type) {
    case "Doctor":
      result = await axios
        .post("http://127.0.0.1:8000/api/registerDoctor", {
          email: email,
          password: password,
          c_password: c_password,
          name: name,
          home_address: h_address,
          birthdate: birthdate,
          gender: gender
        })
        .then(response => response.data);
      break;
    case "Nurse":
      result = await axios
        .post("http://127.0.0.1:8000/api/registerNurse", {
          email: email,
          password: password,
          c_password: c_password,
          name: name,
          home_address: h_address,
          birthdate: birthdate,
          gender: gender
        })
        .then(response => response.data);
      break;
    case "Patient":
      result = await axios
        .post("http://127.0.0.1:8000/api/registerPatient", {
          email: email,
          password: password,
          c_password: c_password,
          name: name,
          home_address: h_address,
          birthdate: birthdate,
          gender: gender
        })
        .then(response => response.data);
      break;
    default:
  }
  console.log(result);
  return {
    type: "register",
    payload: result
  };
}
