const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (date_string) => {
  const d = new Date(date_string);

  let year = d.getFullYear();
  let month = monthNames[d.getMonth()];
  let day = d.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  var formattedDate = day + "-" + month + "-" + year;

  return formattedDate;
};

export const formatDateTime = (date_string) => {
  var ts = new Date(date_string);

  var year = ts.getFullYear();
  const month = monthNames[ts.getMonth()];
  var day = ts.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  var formattedDate = day + "-" + month + "-" + year;

  var H = +ts.getHours();
  var h = H % 12 || 12;
  h = h < 10 ? "0" + h : h;
  var ampm = H < 12 ? " AM" : " PM";
  var m = +ts.getMinutes();
  m = m < 10 ? "0" + m : m;
  ts = h + ":" + m + ampm;

  return formattedDate + " " + ts;
};

export const containSpecialCharacter = (input, excludeNumber = false) => {
  if (!excludeNumber) {
    if (/[`!@#$%^&*()+=[\]{};':"\\|,.<>?~1234567890]/.test(input)) {
      return true;
    }
  } else {
    if (/[`!@#$%^&*()+=[\]{};':"\\|,.<>?~]/.test(input)) {
      return true;
    }
  }
  return false;
};

export const containSpecialCharacterForFile = (
  input,
  excludeNumber = false
) => {
  if (!excludeNumber) {
    if (/[`!@#$%^&*+=[\]{};':"\\|,<>?~1234567890]/.test(input)) {
      return true;
    }
  } else {
    if (/[`!@#$%^&*+=[\]{};':"\\|,<>?~]/.test(input)) {
      return true;
    }
  }
  return false;
};

export const exceptNumber = ["e", "E", "+", "-"];

export const YYYYMMDD = (date_string) => {
  const d = new Date(date_string);

  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
};

export const DDMMYYYY = (date_string) => {
  const d = new Date(date_string);

  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var formattedDate = day + "-" + month + "-" + year;

  return formattedDate;
};

export const GLOBAL_DISABLE_AUTO_CLOSE_TOAST = {
  autoClose: false,
  closeOnClick: false,
  draggable: false,
};

export const sanitizeData = (input) => {
  const newData = {};
  Object.keys(input || {}).forEach((item) => {
    const val = input[item];
    if (typeof val === "boolean") {
      newData[item] = val;
    } else if (typeof val === "number") {
      newData[item] = val;
    } else {
      if (val) {
        if (typeof val === "object") {
          if (Object.keys(val).length > 0) {
            newData[item] = val;
          }
        } else {
          newData[item] = val;
        }
      }
    }
  });
  return newData;
};
