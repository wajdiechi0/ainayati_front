import axios from "axios";

export async function sendResetLink(email) {
  let result = await axios
    .post("http://127.0.0.1:8000/api/password/create", {
      email: email,
    })
    .then((response) => response.data);
  return {
    type: "sendReset",
    payload: result.code === "0" ? true : false,
  };
}

export async function resetPassword(email, password, c_password, token) {
  let result = await axios
    .post("http://127.0.0.1:8000/api/password/reset/", {
      email: email,
      password: password,
      password_confirmation: c_password,
      token: token,
    })
    .then((response) => response.data);
  return {
    type: "resetPassword",
    payload: result,
  };
}

export async function login(email, password) {
  let result = await axios
    .post("http://127.0.0.1:8000/api/loginUser", {
      email: email,
      password: password,
    })
    .then((response) => response.data);
  return {
    type: "login",
    payload: result,
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
          gender: gender,
        })
        .then((response) => response.data);
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
          gender: gender,
        })
        .then((response) => response.data);
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
          gender: gender,
        })
        .then((response) => response.data);
      break;
    default:
  }
  return {
    type: "register",
    payload: result,
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
        new_password,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "changePassword",
    payload: result,
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
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "updateProfile",
    payload: result,
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
        description,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "updateProfile",
    payload: result,
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
        description,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "updateProfile",
    payload: result,
  };
}

export async function updateAdminProfile(id, name, email, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/updateProfile",
      {
        id,
        name,
        email,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "updateProfile",
    payload: result,
  };
}

export async function fetchAdminList(token) {
  let result = await axios
    .get("http://127.0.0.1:8000/api/adminList", {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "adminList",
    payload: result,
  };
}

export async function fetchDoctorList(token) {
  let result;
  if (JSON.parse(localStorage.getItem("user")).type === "patient") {
    result = await axios
      .get(
        "http://127.0.0.1:8000/api/patientDoctorList?id_patient=" +
          JSON.parse(localStorage.getItem("user")).id,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      )
      .then((response) => response.data);
  } else if (JSON.parse(localStorage.getItem("user")).type === "nurse") {
    result = await axios
      .get(
        "http://127.0.0.1:8000/api/nurseDoctorList?id_nurse=" +
          JSON.parse(localStorage.getItem("user")).id,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      )
      .then((response) => response.data);
  } else {
    result = await axios
      .get("http://127.0.0.1:8000/api/doctorList", {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => response.data);
  }
  return {
    type: "doctorList",
    payload: result,
  };
}

export async function fetchNurseList(token) {
  let result;
  if (JSON.parse(localStorage.getItem("user")).type === "doctor") {
    result = await axios
      .get(
        "http://127.0.0.1:8000/api/doctorNurseList?id_doctor=" +
          JSON.parse(localStorage.getItem("user")).id,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      )
      .then((response) => response.data);
  } else {
    result = await axios
      .get("http://127.0.0.1:8000/api/nurseList", {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => response.data);
  }
  return {
    type: "nurseList",
    payload: result,
  };
}

export async function fetchPatientList(token) {
  let result;
  if (JSON.parse(localStorage.getItem("user")).type === "doctor") {
    result = await axios
      .get(
        "http://127.0.0.1:8000/api/doctorPatientList?id_doctor=" +
          JSON.parse(localStorage.getItem("user")).id,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      )
      .then((response) => response.data);
  } else if (JSON.parse(localStorage.getItem("user")).type === "nurse") {
    result = await axios
      .get(
        "http://127.0.0.1:8000/api/nursePatientList?id_nurse=" +
          JSON.parse(localStorage.getItem("user")).id,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      )
      .then((response) => response.data);
  } else {
    result = await axios
      .get("http://127.0.0.1:8000/api/patientList", {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => response.data);
  }
  return {
    type: "patientList",
    payload: result,
  };
}

export async function removeUser(id, token) {
  let result = await axios
    .delete("http://127.0.0.1:8000/api/removeUser?id=" + id, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "removeUser",
    payload: result,
  };
}
export async function removeAffectDoctorPatient(idDoctor, idPatient, token) {
  let result = await axios
    .delete(
      "http://127.0.0.1:8000/api/removeAffect?id_doctor=" +
        idDoctor +
        "&id_patient=" +
        idPatient,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "removeUser",
    payload: result,
  };
}
export async function removeAffectDoctorNurse(idDoctor, idNurse, token) {
  let result = await axios
    .delete(
      "http://127.0.0.1:8000/api/removeAffectDoctorNurse?id_doctor=" +
        idDoctor +
        "&id_nurse=" +
        idNurse,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "removeUser",
    payload: result,
  };
}

export async function addNewUser(newProfile, type, doctorID, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/register" +
        type.charAt(0).toUpperCase() +
        type.slice(1),
      newProfile,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  if (
    JSON.parse(localStorage.getItem("user")).type === "doctor" &&
    type === "patient"
  ) {
    let affectResult = await axios.post(
      "http://127.0.0.1:8000/api/affectDoctorPatient",
      {
        id_doctor: JSON.parse(localStorage.getItem("user")).id,
        id_patient: result.data.id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    );
  }
  if (
    JSON.parse(localStorage.getItem("user")).type === "nurse" &&
    doctorID !== ""
  ) {
    let affectResult = await axios.post(
      "http://127.0.0.1:8000/api/affectDoctorPatient",
      {
        id_doctor: doctorID,
        id_patient: result.data.id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    );
  }
  return {
    type: "addNewUser",
    payload: result,
  };
}
export async function editUserProfile(editedProfile, token) {
  let result = await axios
    .post("http://127.0.0.1:8000/api/updateProfile", editedProfile, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "updateProfile",
    payload: result,
  };
}
export async function getUserDetails(id, token) {
  let result = await axios
    .get("http://127.0.0.1:8000/api/getProfileInfo?id=" + id, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "getUserDetails",
    payload: result,
  };
}

export async function fetchDoctorListBySpecialty(specialty, token) {
  let result = await axios
    .get(
      "http://127.0.0.1:8000/api/fetchDoctorListBySpecialty?specialty=" +
        specialty,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "doctorListBySpecialty",
    payload: result,
  };
}

export async function affectDoctorPatient(id_patient, id_doctor, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/affectDoctorPatient",
      {
        id_doctor,
        id_patient,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "AffectRequest",
    payload: result,
  };
}
export async function sendAppointmentRequest(id_doctor, id_patient, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/sendAppointmentRequest",
      {
        id_doctor,
        id_patient,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "sendAppointmentRequest",
    payload: result,
  };
}
export async function sendAffectRequest(id_doctor, id_patient, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/sendAffectRequest",
      {
        id_doctor,
        id_patient,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "sendAffectRequest",
    payload: result,
  };
}
export async function fetchAffectRequests(id_doctor, token) {
  let result = await axios
    .get(
      "http://127.0.0.1:8000/api/fetchAffectRequests?id_doctor=" + id_doctor,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "fetchAffectRequests",
    payload: result,
  };
}

export async function fetchAppointmentRequests(id, token) {
  let result;
  if (JSON.parse(localStorage.getItem("user")).type == "doctor") {
    result = await axios
      .get(
        "http://127.0.0.1:8000/api/fetchAppointmentRequests?id_doctor=" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      )
      .then((response) => response.data);
  } else {
    result = await axios
      .get(
        "http://127.0.0.1:8000/api/fetchNurseAppointmentRequests?id_nurse=" +
          id,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      )
      .then((response) => response.data);
  }
  return {
    type: "fetchAppointmentRequests",
    payload: result,
  };
}
export async function acceptAffectRequest(id_patient, id_doctor, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/acceptAffectRequest",
      {
        id_doctor,
        id_patient,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "acceptAffectRequest",
    payload: result,
  };
}
export async function denyAffectRequest(id_patient, id_doctor, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/denyAffectRequest",
      {
        id_doctor,
        id_patient,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "denyAffectRequest",
    payload: result,
  };
}

export async function denyAppointmentRequest(id_patient, id_doctor, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/denyAppointmentRequest",
      {
        id_doctor,
        id_patient,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "denyAppointmentRequest",
    payload: result,
  };
}

export async function removeAppointmentRequest(id_patient, id_doctor, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/denyAppointmentRequest",
      {
        id_doctor,
        id_patient,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "removeAppointmentRequest",
    payload: result,
  };
}
export async function affectDoctorNurse(id_nurse, id_doctor, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/affectDoctorNurse",
      {
        id_doctor,
        id_nurse,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "affectRequest",
    payload: result,
  };
}
export async function sendAffectRequestDoctorNurse(id_doctor, id_nurse, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/sendAffectRequestDoctorNurse",
      {
        id_doctor,
        id_nurse,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "sendAffectRequest",
    payload: result,
  };
}
export async function fetchAffectRequestsDoctorNurse(id_doctor, token) {
  let result = await axios
    .get(
      "http://127.0.0.1:8000/api/fetchAffectRequestsDoctorNurse?id_doctor=" +
        id_doctor,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "fetchAffectRequests",
    payload: result,
  };
}
export async function acceptAffectRequestDoctorNurse(
  id_nurse,
  id_doctor,
  token
) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/acceptAffectRequestDoctorNurse",
      {
        id_doctor,
        id_nurse,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "acceptAffectRequest",
    payload: result,
  };
}
export async function denyAffectRequestDoctorNurse(id_nurse, id_doctor, token) {
  let result = await axios
    .post(
      "http://127.0.0.1:8000/api/denyAffectRequestDoctorNurse",
      {
        id_doctor,
        id_nurse,
        token: token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "denyAffectRequest",
    payload: result,
  };
}
export async function blockchainHistory() {
  let result = await axios
    .get("http://localhost:3002/api/system/historian")
    .then((response) => response.data);

  return {
    type: "blockchainHistory",
    payload: result,
  };
}
export async function fetchDoctorsBlockchainTransactions() {
  let result = await axios
    .get("http://localhost:3002/api/ArrangeAppointment")
    .then((response) => response.data);

  return {
    type: "doctorsTx",
    payload: result,
  };
}

export async function fetchDoctorAppointments(idDoctor) {
  let result = await axios
    .get("http://localhost:3002/api/AppointmentAsset", {
      params: {
        filter:
          '{"where": {"doctor":"resource:org.acme.ainayati.Doctor#' +
          idDoctor +
          '"}}',
      },
    })
    .then((response) => response.data);
  return {
    type: "appointmentList",
    payload: result,
  };
}

export async function fetchPatientAppointments(idPatient) {
  let result = await axios
    .get("http://localhost:3002/api/AppointmentAsset", {
      params: {
        filter:
          '{"where": {"patient":"resource:org.acme.ainayati.Patient#' +
          idPatient +
          '"}}',
      },
    })
    .then((response) => response.data);

  return {
    type: "appointmentList",
    payload: result,
  };
}
export async function fetchNurseAppointments(patients) {
  let result = [];
  for (let i = 0; i < patients.length; i++) {
    let val = await axios
      .get("http://localhost:3002/api/AppointmentAsset", {
        params: {
          filter:
            '{"where": {"and":[{"patient":"resource:org.acme.ainayati.Patient#' +
            patients[i].id +
            '"},{"doctor":"resource:org.acme.ainayati.Doctor#' +
            patients[i].id_doctor +
            '"}]}}',
        },
      })
      .then((response) => response.data);
    result = result.concat(val);
  }
  return {
    type: "appointmentList",
    payload: result,
  };
}
export async function checkAffectDoctorPatient(id_patient, id_doctor, token) {
  let result = await axios
    .post(
      "http://localhost:8000/api/checkAffectDoctorPatient",
      {
        id_patient,
        id_doctor,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);

  return result;
}

export async function checkAffectDoctorNurse(id_nurse, id_doctor, token) {
  let result = await axios
    .post(
      "http://localhost:8000/api/checkAffectDoctorNurse",
      {
        id_nurse,
        id_doctor,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);

  return result;
}

export async function fetchPatientActivities(patient_email, token) {
  let result = await axios
    .get(
      "http://localhost:8000/api/fetchPatientActivities?email=" + patient_email,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);
  return {
    type: "activities",
    payload: result,
  };
}
export async function doctorRegistrationsPerMonth(token) {
  let result = await axios
    .get("http://localhost:8000/api/registrationsPerMonth?type=" + 3, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "doctorRegistrationsPerMonth",
    payload: result,
  };
}
export async function nurseRegistrationsPerMonth(token) {
  let result = await axios
    .get("http://localhost:8000/api/registrationsPerMonth?type=" + 4, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "nurseRegistrationsPerMonth",
    payload: result,
  };
}
export async function patientRegistrationsPerMonth(token) {
  let result = await axios
    .get("http://localhost:8000/api/registrationsPerMonth?type=" + 5, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "patientRegistrationsPerMonth",
    payload: result,
  };
}

export async function fetchPatientHeartRates(patient_email, token) {
  let result = await axios
    .get(
      "http://localhost:8000/api/fetchPatientHeartRates?email=" + patient_email,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data);

  return {
    type: "heartRates",
    payload: result,
  };
}
export async function addAppointment(idDoctor, idPatient, date, details) {
  let data = {
    $class: "org.acme.ainayati.ArrangeAppointment",
    doctor: "resource:org.acme.ainayati.Doctor#" + idDoctor,
    patient: "resource:org.acme.ainayati.Patient#" + idPatient,
    state: "false",
    details: details,
    date: date,
  };
  let result = await axios({
    method: "post",
    url: "http://localhost:3002/api/ArrangeAppointment",
    data: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response);
  return {
    type: "addAppointment",
    payload: result,
  };
}
export async function editAppointment(
  idApp,
  idDoctor,
  idPatient,
  state,
  details,
  date
) {
  let data = JSON.stringify({
    $class: "org.acme.ainayati.AppointmentAsset",
    doctor: "resource:org.acme.ainayati.Doctor#" + idDoctor,
    patient: "resource:org.acme.ainayati.Patient#" + idPatient,
    state: state,
    details: details,
    date: date,
  });
  let result = await axios.put(
    "http://localhost:3002/api/AppointmentAsset/" + idApp,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return {
    type: "editAppointment",
    payload: result,
  };
}

export async function removeAppointment(idApp) {
  let result = await axios.delete(
    "http://localhost:3002/api/AppointmentAsset/" + idApp,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return {
    type: "removeAppointment",
    payload: result,
  };
}

export async function acceptAppointmentRequest(
  idDoctor,
  idPatient,
  date,
  details
) {
  let data = {
    $class: "org.acme.ainayati.ArrangeAppointment",
    doctor: "resource:org.acme.ainayati.Doctor#" + idDoctor,
    patient: "resource:org.acme.ainayati.Patient#" + idPatient,
    state: "false",
    details: details,
    date: date,
  };
  let result = await axios({
    method: "post",
    url: "http://localhost:3002/api/ArrangeAppointment",
    data: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response);
  return {
    type: "acceptAppointmentRequest",
    payload: result,
  };
}
export async function getProfileInfo(id, token) {
  let result = await axios
    .get("http://localhost:8000/api/getProfileInfo?id=" + id, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return result;
}
export async function getProfileInfoUsingEmail(email, token) {
  let result = await axios
    .get("http://localhost:8000/api/getProfileInfoUsingEmail?email=" + email, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return result;
}
export async function getLast24HoursAdmins(token) {
  let result = await axios
    .get("http://localhost:8000/api/getLast24HoursUsers?type=" + 2, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "last24HoursAdmins",
    payload: result,
  };
}
export async function getLast24HoursDoctors(token) {
  let result = await axios
    .get("http://localhost:8000/api/getLast24HoursUsers?type=" + 3, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "last24HoursDoctors",
    payload: result,
  };
}
export async function getLast24HoursNurses(token) {
  let result = await axios
    .get("http://localhost:8000/api/getLast24HoursUsers?type=" + 4, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "last24HoursNurses",
    payload: result,
  };
}
export async function getLast24HoursPatients(token) {
  let result = await axios
    .get("http://localhost:8000/api/getLast24HoursUsers?type=" + 5, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "last24HoursPatients",
    payload: result,
  };
}
export async function arrangeAppointment(idDoctor, idPatient, token) {
  let result = await axios
    .post("http://localhost:8000/api/getLast24HoursUsers?type=" + 5, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "patientAppointments",
    payload: result,
  };
}
export async function getPatientAppointments(token) {
  let result = await axios
    .get("http://localhost:8000/api/getLast24HoursUsers?type=" + 5, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "patientAppointments",
    payload: result,
  };
}
export async function getDoctorAppointments(token) {
  let result = await axios
    .get("http://localhost:8000/api/getLast24HoursUsers?type=" + 5, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => response.data);
  return {
    type: "doctorAppointments",
    payload: result,
  };
}
