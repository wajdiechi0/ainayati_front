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

export async function changePassword(
  id,
  current_password,
  new_password,
  confirm_password,
  token
) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/updatePassword",
      {
        id,
        current_password,
        confirm_password,
        new_password
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      }
    )
    .then(response => response.data);
  return {
    type: "changePassword",
    payload: result
  };
}

export async function updateDoctorProfile(
  id,
  name,
  email,
  birthdate,
  home_address,
  work_address,
  specialty,
  description,
  token
) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/updateProfile",
      {
        id,
        name,
        email,
        birthdate,
        home_address,
        work_address,
        specialty,
        description,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      }
    )
    .then(response => response.data);
  console.log(result);
  return {
    type: "updateProfile",
    payload: result
  };
}

export async function updateNurseProfile(
  id,
  name,
  email,
  birthdate,
  home_address,
  work_address,
  description,
  token
) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/updateProfile",
      {
        id,
        name,
        email,
        birthdate,
        home_address,
        work_address,
        description
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      }
    )
    .then(response => response.data);
  return {
    type: "updateProfile",
    payload: result
  };
}

export async function updatePatientProfile(
  id,
  name,
  email,
  birthdate,
  home_address,
  weight,
  height,
  description,
  token
) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/updateProfile",
      {
        id,
        name,
        email,
        birthdate,
        home_address,
        weight,
        height,
        description
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      }
    )
    .then(response => response.data);
  return {
    type: "updateProfile",
    payload: result
  };
}

export async function updateAdminProfile(id, name, email, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/updateProfile",
      {
        id,
        name,
        email
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      }
    )
    .then(response => response.data);
  return {
    type: "updateProfile",
    payload: result
  };
}

export async function fetchAdminList(token) {
  let result = await axios
    .get("http://127.0.0.1:8000/api/adminList", {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    })
    .then(response => response.data);
  return {
    type: "adminList",
    payload: result
  };
}

export async function fetchDoctorList(token) {
  let result = await axios
    .get("http://127.0.0.1:8000/api/doctorList", {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    })
    .then(response => response.data);
  return {
    type: "doctorList",
    payload: result
  };
}

export async function fetchNurseList(token) {
  let result = await axios
    .get("http://127.0.0.1:8000/api/nurseList", {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    })
    .then(response => response.data);
  return {
    type: "nurseList",
    payload: result
  };
}

export async function fetchPatientList(token) {
  let result = await axios
    .get("http://127.0.0.1:8000/api/patientList", {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    })
    .then(response => response.data);
  return {
    type: "patientList",
    payload: result
  };
}

export async function removeUser(id, token) {
  let result = await axios
    .delete("http://127.0.0.1:8000/api/removeUser?id=" + id, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    })
    .then(response => response.data);
  console.log(result);
  return {
    type: "removeUser",
    payload: result
  };
}

export async function addNewDoctor(
  name,
  email,
  password,
  c_password,
  birthdate,
  home_address,
  work_address,
  specialty,
  gender,
  token
) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/registerDoctor",
      {
        name,
        email,
        password,
        c_password,
        birthdate,
        home_address,
        work_address,
        specialty,
        gender
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      }
    )
    .then(response => response.data);
  console.log(result);
  return {
    type: "addNewDoctor",
    payload: result
  };
}


export async function addNewUser(
  newProfile,
  type,
  token
) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/register"+type.charAt(0).toUpperCase()+type.slice(1),
      newProfile,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      }
    )
    .then(response => response.data);
  console.log(result);
  return {
    type: "addNewDoctor",
    payload: result
  };
}
export async function editUserProfile(
  editedProfile,
  token
) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/updateProfile",
      editedProfile,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      }
    )
    .then(response => response.data);
  return {
    type: "updateProfile",
    payload: result
  };
}
export async function getUserDetails(id, token) {
  let result = await axios
    .get("http://127.0.0.1:8000/api/getProfileInfo?id=" + id, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    })
    .then(response => response.data);
  return {
    type: "getUserDetails",
    payload: result
  };
}