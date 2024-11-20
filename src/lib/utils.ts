import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(cname: any) {
  if (typeof window !== "undefined") {
    let name = cname + "=";

    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca?.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}

export const keyedOptions = [
  {
    value: "1-5 +keyed",
    label: "1-5 +keyed",
  },
  {
    value: "1-5 -keyed",
    label: "1-5 -keyed",
  },
  {
    value: "1-7 +keyed",
    label: "1-7 +keyed",
  },
  {
    value: "1-7 -keyed",
    label: "1-7 -keyed",
  },
  {
    value: "Open Response",
    label: "Open Response",
  },
  {
    value: "Yes/No/Uncertain",
    label: "Yes/No/Uncertain",
  },
  {
    value: "Increase/Same/Decrease",
    label: "Increase/Same/Decrease",
  },
  {
    value: "1-5 Omitted",
    label: "1-5 Omitted",
  },
  {
    value: "1-7 Omitted",
    label: "1-7 Omitted",
  },
  {
    value: "0-3 +keyed",
    label: "0-3 +keyed",
  },
  {
    value: "0-4 +keyed",
    label: "0-4 +keyed",
  },
  {
    value: "1-10 +keyed",
    label: "1-10 +keyed",
  },
];

export function delete_cookie(name: any) {
  if (typeof window !== "undefined") {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}

export const themeColors = [
  { color: "#053c6f", class: "blue" },
  { color: "#7b77d0", class: "purple" },
  { color: "#30a9e5", class: "lightBlue" },
  { color: "#f79b30", class: "orange" },
];

export const ethnicity = [
  { value: "Asian", label: "Asian" },
  {
    value: "American Indian or Alaskan Native",
    label: "American Indian or Alaskan Native",
  },
  { value: "Black or African American", label: "Black or African American" },
  { value: "Hispanic or Latino", label: "Hispanic or Latino" },
  {
    value: "Native Hawaiian or Other Pacific Islander",
    label: "Native Hawaiian or Other Pacific Islander",
  },
  { value: "White", label: "White" },
];

export const getQuery = (name: any) => {
  // @ts-ignore
  let url = new URL(window.location);
  let param = url.searchParams.get(name);
  return param;
};

export const getAge = (date: any) => {
  // Assuming the birthdate is in the format 'YYYY-MM-DD'
  if (date) {
    if (date.includes("-")) {
      const birthdate = new Date(date);
      const today = new Date();

      // Calculate the difference in years
      let age = today.getFullYear() - birthdate.getFullYear();

      // Adjust age based on whether the birthday has occurred this year
      if (
        today.getMonth() < birthdate.getMonth() ||
        (today.getMonth() === birthdate.getMonth() &&
          today.getDate() < birthdate.getDate())
      ) {
        age--;
      }

      return age;
    } else {
      return date;
    }
  } else {
    return "";
  }
};

export const joinIds = (
  major: any,
  minor: any,
  tier1: any,
  tier2: any,
  tier3: any
) => {
  let str =
    `${major ? major + "," : ""}` +
    `${minor ? minor + "," : ""}` +
    `${tier1.length ? tier1[0].id + "," : ""}` +
    `${tier2.length ? tier2[0].id + "," : ""}` +
    `${tier3.length ? tier3[0].id + "," : ""}`;

  if (str[str.length - 1] === ",") {
    // console.log(str.length)
    return str.slice(0, -1);
  }
};

export const countriesArr = [
  {
    value: "United States",
    label: "United States",
    key: 0,
    states: [
      {
        value: "Alabama",
        label: "Alabama",
      },
      {
        value: "Alaska",
        label: "Alaska",
      },
      {
        value: "Arizona",
        label: "Arizona",
      },
      {
        value: "Arkansas",
        label: "Arkansas",
      },
      {
        value: "California",
        label: "California",
      },
      {
        value: "Colorado",
        label: "Colorado",
      },
      {
        value: "Connecticut",
        label: "Connecticut",
      },
      {
        value: "Delaware",
        label: "Delaware",
      },
      {
        value: "Florida",
        label: "Florida",
      },
      {
        value: "Georgia",
        label: "Georgia",
      },
      {
        value: "Hawaii",
        label: "Hawaii",
      },
      {
        value: "Idaho",
        label: "Idaho",
      },
      {
        value: "Illinois",
        label: "Illinois",
      },
      {
        value: "Indiana",
        label: "Indiana",
      },
      {
        value: "Iowa",
        label: "Iowa",
      },
      {
        value: "Kansas",
        label: "Kansas",
      },
      {
        value: "Kentucky",
        label: "Kentucky",
      },
      {
        value: "Louisiana",
        label: "Louisiana",
      },
      {
        value: "Maine",
        label: "Maine",
      },
      {
        value: "Maryland",
        label: "Maryland",
      },
      {
        value: "Massachusetts",
        label: "Massachusetts",
      },
      {
        value: "Michigan",
        label: "Michigan",
      },
      {
        value: "Minnesota",
        label: "Minnesota",
      },
      {
        value: "Mississippi",
        label: "Mississippi",
      },
      {
        value: "Missouri",
        label: "Missouri",
      },
      {
        value: "Montana",
        label: "Montana",
      },
      {
        value: "Nebraska",
        label: "Nebraska",
      },
      {
        value: "Nevada",
        label: "Nevada",
      },
      {
        value: "New Hampshire",
        label: "New Hampshire",
      },
      {
        value: "New Jersey",
        label: "New Jersey",
      },
      {
        value: "New Mexico",
        label: "New Mexico",
      },
      {
        value: "New York",
        label: "New York",
      },
      {
        value: "North Carolina",
        label: "North Carolina",
      },
      {
        value: "North Dakota",
        label: "North Dakota",
      },
      {
        value: "Ohio",
        label: "Ohio",
      },
      {
        value: "Oklahoma",
        label: "Oklahoma",
      },
      {
        value: "Oregon",
        label: "Oregon",
      },
      {
        value: "Pennsylvania",
        label: "Pennsylvania",
      },
      {
        value: "Rhode Island",
        label: "Rhode Island",
      },
      {
        value: "South Carolina",
        label: "South Carolina",
      },
      {
        value: "South Dakota",
        label: "South Dakota",
      },
      {
        value: "Tennessee",
        label: "Tennessee",
      },
      {
        value: "Texas",
        label: "Texas",
      },
      {
        value: "Utah",
        label: "Utah",
      },
      {
        value: "Vermont",
        label: "Vermont",
      },
      {
        value: "Virginia",
        label: "Virginia",
      },
      {
        value: "Washington",
        label: "Washington",
      },
      {
        value: "West Virginia",
        label: "West Virginia",
      },
      {
        value: "Wisconsin",
        label: "Wisconsin",
      },
      {
        value: "Wyoming",
        label: "Wyoming",
      },
    ],
  },
  {
    value: "Canada",
    label: "Canada",
    key: 1,
    states: [
      {
        value: "Alberta",
        label: "Alberta",
      },
      {
        value: "British Columbia",
        label: "British Columbia",
      },
      {
        value: "Manitoba",
        label: "Manitoba",
      },
      {
        value: "New Brunswick",
        label: "New Brunswick",
      },
      {
        value: "Newfoundland and Labrador",
        label: "Newfoundland and Labrador",
      },
      {
        value: "Nova Scotia",
        label: "Nova Scotia",
      },
      {
        value: "Ontario",
        label: "Ontario",
      },
      {
        value: "Prince Edward Island",
        label: "Prince Edward Island",
      },
      {
        value: "Quebec",
        label: "Quebec",
      },
      {
        value: "Saskatchewan",
        label: "Saskatchewan",
      },
    ],
  },
  {
    value: "England",
    label: "England",
    key: 2,
    states: [
      {
        value: "Bedfordshire",
        label: "Bedfordshire",
      },
      {
        value: "Berkshire",
        label: "Berkshire",
      },
      {
        value: "Bristol",
        label: "Bristol",
      },
      {
        value: "Buckinghamshire",
        label: "Buckinghamshire",
      },
      {
        value: "Cambridgeshire",
        label: "Cambridgeshire",
      },
      {
        value: "Cheshire",
        label: "Cheshire",
      },
      {
        value: "City of London",
        label: "City of London",
      },
      {
        value: "Cornwall",
        label: "Cornwall",
      },
      {
        value: "Cumbria",
        label: "Cumbria",
      },
      {
        value: "Derbyshire",
        label: "Derbyshire",
      },
      {
        value: "Devon",
        label: "Devon",
      },
      {
        value: "Dorset",
        label: "Dorset",
      },
      {
        value: "Durham",
        label: "Durham",
      },
      {
        value: "East Riding of Yorkshire",
        label: "East Riding of Yorkshire",
      },
      {
        value: "East Sussex",
        label: "East Sussex",
      },
      {
        value: "Essex",
        label: "Essex",
      },
      {
        value: "Gloucestershire",
        label: "Gloucestershire",
      },
      {
        value: "Greater London",
        label: "Greater London",
      },
      {
        value: "Greater Manchester",
        label: "Greater Manchester",
      },
      {
        value: "Hampshire",
        label: "Hampshire",
      },
      {
        value: "Herefordshire",
        label: "Herefordshire",
      },
      {
        value: "Hertfordshire",
        label: "Hertfordshire",
      },
      {
        value: "Isle of Wight",
        label: "Isle of Wight",
      },
      {
        value: "Kent",
        label: "Kent",
      },
      {
        value: "Lancashire",
        label: "Lancashire",
      },
      {
        value: "Leicestershire",
        label: "Leicestershire",
      },
      {
        value: "Lincolnshire",
        label: "Lincolnshire",
      },
      {
        value: "Merseyside",
        label: "Merseyside",
      },
      {
        value: "Norfolk",
        label: "Norfolk",
      },
      {
        value: "North Yorkshire",
        label: "North Yorkshire",
      },
      {
        value: "Northamptonshire",
        label: "Northamptonshire",
      },
      {
        value: "Northumberland",
        label: "Northumberland",
      },
      {
        value: "Nottinghamshire",
        label: "Nottinghamshire",
      },
      {
        value: "Oxfordshire",
        label: "Oxfordshire",
      },
      {
        value: "Rutland",
        label: "Rutland",
      },
      {
        value: "Shropshire",
        label: "Shropshire",
      },
      {
        value: "Somerset",
        label: "Somerset",
      },
      {
        value: "South Yorkshire",
        label: "South Yorkshire",
      },
      {
        value: "Staffordshire",
        label: "Staffordshire",
      },
      {
        value: "Suffolk",
        label: "Suffolk",
      },
      {
        value: "Surrey",
        label: "Surrey",
      },
      {
        value: "Tyne and Wear",
        label: "Tyne and Wear",
      },
      {
        value: "Warwickshire",
        label: "Warwickshire",
      },
      {
        value: "West Midlands",
        label: "West Midlands",
      },
      {
        value: "West Sussex",
        label: "West Sussex",
      },
      {
        value: "West Yorkshire",
        label: "West Yorkshire",
      },
      {
        value: "Wiltshire",
        label: "Wiltshire",
      },
      {
        value: "Worcestershire",
        label: "Worcestershire",
      },
    ],
  },
  {
    value: "Scotland",
    label: "Scotland",
    key: 3,
    states: [
      {
        value: "Aberdeen City",
        label: "Aberdeen City",
      },
      {
        value: "Aberdeenshire",
        label: "Aberdeenshire",
      },
      {
        value: "Angus",
        label: "Angus",
      },
      {
        value: "Argyll and Bute",
        label: "Argyll and Bute",
      },
      {
        value: "Clackmannanshire",
        label: "Clackmannanshire",
      },
      {
        value: "Dumfries and Galloway",
        label: "Dumfries and Galloway",
      },
      {
        value: "Dundee City",
        label: "Dundee City",
      },
      {
        value: "East Ayrshire",
        label: "East Ayrshire",
      },
      {
        value: "East Dunbartonshire",
        label: "East Dunbartonshire",
      },
      {
        value: "East Lothian",
        label: "East Lothian",
      },
      {
        value: "East Renfrewshire",
        label: "East Renfrewshire",
      },
      {
        value: "Edinburgh",
        label: "Edinburgh",
      },
      {
        value: "Falkirk",
        label: "Falkirk",
      },
      {
        value: "Fife",
        label: "Fife",
      },
      {
        value: "Glasgow",
        label: "Glasgow",
      },
      {
        value: "Highland",
        label: "Highland",
      },
      {
        value: "Inverclyde",
        label: "Inverclyde",
      },
      {
        value: "Midlothian",
        label: "Midlothian",
      },
      {
        value: "Moray",
        label: "Moray",
      },
      {
        value: "Na h-Eileanan Siar",
        label: "Na h-Eileanan Siar",
      },
      {
        value: "North Ayrshire",
        label: "North Ayrshire",
      },
      {
        value: "North Lanarkshire",
        label: "North Lanarkshire",
      },
      {
        value: "Orkney Islands",
        label: "Orkney Islands",
      },
      {
        value: "Perth and Kinross",
        label: "Perth and Kinross",
      },
      {
        value: "Renfrewshire",
        label: "Renfrewshire",
      },
      {
        value: "Scottish Borders",
        label: "Scottish Borders",
      },
      {
        value: "Shetland Islands",
        label: "Shetland Islands",
      },
      {
        value: "South Ayrshire",
        label: "South Ayrshire",
      },
      {
        value: "South Lanarkshire",
        label: "South Lanarkshire",
      },
      {
        value: "Stirling",
        label: "Stirling",
      },
      {
        value: "West Dunbartonshire",
        label: "West Dunbartonshire",
      },
      {
        value: "West Lothian",
        label: "West Lothian",
      },
    ],
  },
  {
    value: "Northern Ireland",
    label: "Northern Ireland",
    key: 4,
    states: [
      {
        value: "Antrim",
        label: "Antrim",
      },
      {
        value: "Armagh",
        label: "Armagh",
      },
      {
        value: "Carlow",
        label: "Carlow",
      },
      {
        value: "Cavan",
        label: "Cavan",
      },
      {
        value: "Clare",
        label: "Clare",
      },
      {
        value: "Cork",
        label: "Cork",
      },
      {
        value: "Derry",
        label: "Derry",
      },
      {
        value: "Donegal",
        label: "Donegal",
      },
      {
        value: "Down",
        label: "Down",
      },
      {
        value: "Dublin",
        label: "Dublin",
      },
      {
        value: "Fermanagh",
        label: "Fermanagh",
      },
      {
        value: "Galway",
        label: "Galway",
      },
      {
        value: "Kerry",
        label: "Kerry",
      },
      {
        value: "Kildare",
        label: "Kildare",
      },
      {
        value: "Kilkenny",
        label: "Kilkenny",
      },
      {
        value: "Laois",
        label: "Laois",
      },
      {
        value: "Leitrim",
        label: "Leitrim",
      },
      {
        value: "Limerick",
        label: "Limerick",
      },
      {
        value: "Longford",
        label: "Longford",
      },
      {
        value: "Louth",
        label: "Louth",
      },
      {
        value: "Mayo",
        label: "Mayo",
      },
      {
        value: "Meath",
        label: "Meath",
      },
      {
        value: "Monaghan",
        label: "Monaghan",
      },
      {
        value: "Offaly",
        label: "Offaly",
      },
      {
        value: "Roscommon",
        label: "Roscommon",
      },
      {
        value: "Sligo",
        label: "Sligo",
      },
      {
        value: "Tipperary",
        label: "Tipperary",
      },
      {
        value: "Tyrone",
        label: "Tyrone",
      },
      {
        value: "Waterford",
        label: "Waterford",
      },
      {
        value: "Westmeath",
        label: "Westmeath",
      },
      {
        value: "Wexford",
        label: "Wexford",
      },
      {
        value: "Wicklow",
        label: "Wicklow",
      },
    ],
  },
  {
    value: "Wales",
    label: "Wales",
    key: 5,
    states: [
      {
        value: "Anglesey",
        label: "Anglesey",
      },
      {
        value: "Blaenau Gwent",
        label: "Blaenau Gwent",
      },
      {
        value: "Bridgend",
        label: "Bridgend",
      },
      {
        value: "Caerphilly",
        label: "Caerphilly",
      },
      {
        value: "Cardiff",
        label: "Cardiff",
      },
      {
        value: "Carmarthenshire",
        label: "Carmarthenshire",
      },
      {
        value: "Ceredigion",
        label: "Ceredigion",
      },
      {
        value: "Conwy",
        label: "Conwy",
      },
      {
        value: "Denbighshire",
        label: "Denbighshire",
      },
      {
        value: "Flintshire",
        label: "Flintshire",
      },
      {
        value: "Gwynedd",
        label: "Gwynedd",
      },
      {
        value: "Merthyr Tydfil",
        label: "Merthyr Tydfil",
      },
      {
        value: "Monmouthshire",
        label: "Monmouthshire",
      },
      {
        value: "Neath Port Talbot",
        label: "Neath Port Talbot",
      },
      {
        value: "Newport",
        label: "Newport",
      },
      {
        value: "Pembrokeshire",
        label: "Pembrokeshire",
      },
      {
        value: "Powys",
        label: "Powys",
      },
      {
        value: "Rhondda Cynon Taf",
        label: "Rhondda Cynon Taf",
      },
      {
        value: "Swansea",
        label: "Swansea",
      },
      {
        value: "Torfaen",
        label: "Torfaen",
      },
      {
        value: "Vale of Glamorgan",
        label: "Vale of Glamorgan",
      },
      {
        value: "Wrexham",
        label: "Wrexham",
      },
    ],
  },
];

export const ratingDateFormat = (ratingDate: any) => {
  var monthArr = [
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
  let month = monthArr[new Date(ratingDate).getMonth()];
  let date = new Date(ratingDate).getDate();
  let year = new Date(ratingDate).getFullYear();
  return `${month} ${date}th, ${year}`;
};

export const calculateAverage = (data: any) => {
  if (data) {
    console.log(data, "datadatadata");
    const totalAnswersPoints = 50;
    let obj = { ...data };
    delete obj.id;
    delete obj.comment;
    delete obj.created_at;
    delete obj.updated_at;
    delete obj.schoolID;

    const dataNumbers = Object.values(obj).map((value) => Number(value) || 0);
    const obtainedNumbers = dataNumbers.reduce((a, b) => a + b, 0);
    const average = (obtainedNumbers / totalAnswersPoints) * 5;
    return average;
  }
};

export const calculatePercentage = (obtained: any, total: any) => {
  let percent = 0;
  percent = (obtained / total) * 100;
  return percent;
};

export const religions = [
  {
    value: "Christian",
    label: "Christian",
  },
  {
    value: "Islam",
    label: "Islam",
  },
  {
    value: "Non Religious",
    label: "Non Religious",
  },
  {
    value: "Chinese Traditional",
    label: "Chinese Traditional",
  },
  {
    value: "Buddhism",
    label: "Buddhism",
  },
  {
    value: "African Traditional",
    label: "African Traditional",
  },
  {
    value: "Hindu",
    label: "Hindu",
  },
  {
    value: "Jewish",
    label: "Jewish",
  },
  {
    value: "Spiritual",
    label: "Spiritual",
  },
];

export const getQueryParams = (paramName: any) => {
  // @ts-ignore
  const url = new URL(window.location);
  const tab = url.searchParams.get(paramName);
  return tab;
};

export const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];
export const country = [
  {
    value: "Afghanistan",
    label: "Afghanistan",
  },
  {
    value: "Albania",
    label: "Albania",
  },
  {
    value: "Algeria",
    label: "Algeria",
  },
  {
    value: "American Samoa",
    label: "American Samoa",
  },
  {
    value: "Andorra",
    label: "Andorra",
  },
  {
    value: "Angola",
    label: "Angola",
  },
  {
    value: "Anguilla",
    label: "Anguilla",
  },
  {
    value: "Antarctica",
    label: "Antarctica",
  },
  {
    value: "Antigua and Barbuda",
    label: "Antigua and Barbuda",
  },
  {
    value: "Argentina",
    label: "Argentina",
  },
  {
    value: "Armenia",
    label: "Armenia",
  },
  {
    value: "Aruba",
    label: "Aruba",
  },
  {
    value: "Australia",
    label: "Australia",
  },
  {
    value: "Austria",
    label: "Austria",
  },
  {
    value: "Azerbaijan",
    label: "Azerbaijan",
  },
  {
    value: "Bahamas",
    label: "Bahamas",
  },
  {
    value: "Bahrain",
    label: "Bahrain",
  },
  {
    value: "Bangladesh",
    label: "Bangladesh",
  },
  {
    value: "Barbados",
    label: "Barbados",
  },
  {
    value: "Belarus",
    label: "Belarus",
  },
  {
    value: "Belgium",
    label: "Belgium",
  },
  {
    value: "Belize",
    label: "Belize",
  },
  {
    value: "Benin",
    label: "Benin",
  },
  {
    value: "Bermuda",
    label: "Bermuda",
  },
  {
    value: "Bhutan",
    label: "Bhutan",
  },
  {
    value: "Bolivia",
    label: "Bolivia",
  },
  {
    value: "Bosnia and Herzegovina",
    label: "Bosnia and Herzegovina",
  },
  {
    value: "Botswana",
    label: "Botswana",
  },
  {
    value: "Bouvet Island",
    label: "Bouvet Island",
  },
  {
    value: "Brazil",
    label: "Brazil",
  },
  {
    value: "British Indian Ocean Territory",
    label: "British Indian Ocean Territory",
  },
  {
    value: "Brunei Darussalam",
    label: "Brunei Darussalam",
  },
  {
    value: "Bulgaria",
    label: "Bulgaria",
  },
  {
    value: "Burkina Faso",
    label: "Burkina Faso",
  },
  {
    value: "Burundi",
    label: "Burundi",
  },
  {
    value: "Cambodia",
    label: "Cambodia",
  },
  {
    value: "Cameroon",
    label: "Cameroon",
  },
  {
    value: "Canada",
    label: "Canada",
  },
  {
    value: "Cape Verde",
    label: "Cape Verde",
  },
  {
    value: "Cayman Islands",
    label: "Cayman Islands",
  },
  {
    value: "Central African Republic",
    label: "Central African Republic",
  },
  {
    value: "Chad",
    label: "Chad",
  },
  {
    value: "Chile",
    label: "Chile",
  },
  {
    value: "China",
    label: "China",
  },
  {
    value: "Christmas Island",
    label: "Christmas Island",
  },
  {
    value: "Cocos (Keeling) Islands",
    label: "Cocos (Keeling) Islands",
  },
  {
    value: "Colombia",
    label: "Colombia",
  },
  {
    value: "Comoros",
    label: "Comoros",
  },
  {
    value: "Congo",
    label: "Congo",
  },
  {
    value: "Cook Islands",
    label: "Cook Islands",
  },
  {
    value: "Costa Rica",
    label: "Costa Rica",
  },
  {
    value: "Croatia (Hrvatska)",
    label: "Croatia (Hrvatska",
  },
  {
    value: "Cuba",
    label: "Cuba",
  },
  {
    value: "Cyprus",
    label: "Cyprus",
  },
  {
    value: "Czech Republic",
    label: "Czech Republic",
  },
  {
    value: "Denmark",
    label: "Denmark",
  },
  {
    value: "Djibouti",
    label: "Djibouti",
  },
  {
    value: "Dominica",
    label: "Dominica",
  },
  {
    value: "Dominican Republic",
    label: "Dominican Republic",
  },
  {
    value: "East Timor",
    label: "East Timor",
  },
  {
    value: "Ecuador",
    label: "Ecuador",
  },
  {
    value: "Egypt",
    label: "Egypt",
  },
  {
    value: "El Salvador",
    label: "El Salvador",
  },
  {
    value: "Equatorial Guinea",
    label: "Equatorial Guinea",
  },
  {
    value: "Eritrea",
    label: "Eritrea",
  },
  {
    value: "Estonia",
    label: "Estonia",
  },
  {
    value: "Ethiopia",
    label: "Ethiopia",
  },
  {
    value: "Falkland Islands (Malvinas)",
    label: "Falkland Islands (Malvinas",
  },
  {
    value: "Faroe Islands",
    label: "Faroe Islands",
  },
  {
    value: "Fiji",
    label: "Fiji",
  },
  {
    value: "Finland",
    label: "Finland",
  },
  {
    value: "France",
    label: "France",
  },
  {
    value: "France, Metropolitan",
    label: "France, Metropolitan",
  },
  {
    value: "French Guiana",
    label: "French Guiana",
  },
  {
    value: "French Polynesia",
    label: "French Polynesia",
  },
  {
    value: "French Southern Territories",
    label: "French Southern Territories",
  },
  {
    value: "Gabon",
    label: "Gabon",
  },
  {
    value: "Gambia",
    label: "Gambia",
  },
  {
    value: "Georgia",
    label: "Georgia",
  },
  {
    value: "Germany",
    label: "Germany",
  },
  {
    value: "Ghana",
    label: "Ghana",
  },
  {
    value: "Gibraltar",
    label: "Gibraltar",
  },
  {
    value: "Guernsey",
    label: "Guernsey",
  },
  {
    value: "Greece",
    label: "Greece",
  },
  {
    value: "Greenland",
    label: "Greenland",
  },
  {
    value: "Grenada",
    label: "Grenada",
  },
  {
    value: "Guadeloupe",
    label: "Guadeloupe",
  },
  {
    value: "Guam",
    label: "Guam",
  },
  {
    value: "Guatemala",
    label: "Guatemala",
  },
  {
    value: "Guinea",
    label: "Guinea",
  },
  {
    value: "Guinea-Bissau",
    label: "Guinea-Bissau",
  },
  {
    value: "Guyana",
    label: "Guyana",
  },
  {
    value: "Haiti",
    label: "Haiti",
  },
  {
    value: "Heard and Mc Donald Islands",
    label: "Heard and Mc Donald Islands",
  },
  {
    value: "Honduras",
    label: "Honduras",
  },
  {
    value: "Hong Kong",
    label: "Hong Kong",
  },
  {
    value: "Hungary",
    label: "Hungary",
  },
  {
    value: "Iceland",
    label: "Iceland",
  },
  {
    value: "India",
    label: "India",
  },
  {
    value: "Isle of Man",
    label: "Isle of Man",
  },
  {
    value: "Indonesia",
    label: "Indonesia",
  },
  {
    value: "Iran (Islamic Republic of)",
    label: "Iran (Islamic Republic of",
  },
  {
    value: "Iraq",
    label: "Iraq",
  },
  {
    value: "Ireland",
    label: "Ireland",
  },
  {
    value: "Israel",
    label: "Israel",
  },
  {
    value: "Italy",
    label: "Italy",
  },
  {
    value: "Ivory Coast",
    label: "Ivory Coast",
  },
  {
    value: "Jersey",
    label: "Jersey",
  },
  {
    value: "Jamaica",
    label: "Jamaica",
  },
  {
    value: "Japan",
    label: "Japan",
  },
  {
    value: "Jordan",
    label: "Jordan",
  },
  {
    value: "Kazakhstan",
    label: "Kazakhstan",
  },
  {
    value: "Kenya",
    label: "Kenya",
  },
  {
    value: "Kiribati",
    label: "Kiribati",
  },
  {
    value: "Korea, Democratic People's Republic of",
    label: "Korea, Democratic People's Republic of",
  },
  {
    value: "Korea, Republic of",
    label: "Korea, Republic of",
  },
  {
    value: "Kosovo",
    label: "Kosovo",
  },
  {
    value: "Kuwait",
    label: "Kuwait",
  },
  {
    value: "Kyrgyzstan",
    label: "Kyrgyzstan",
  },
  {
    value: "Lao People's Democratic Republic",
    label: "Lao People's Democratic Republic",
  },
  {
    value: "Latvia",
    label: "Latvia",
  },
  {
    value: "Lebanon",
    label: "Lebanon",
  },
  {
    value: "Lesotho",
    label: "Lesotho",
  },
  {
    value: "Liberia",
    label: "Liberia",
  },
  {
    value: "Libyan Arab Jamahiriya",
    label: "Libyan Arab Jamahiriya",
  },
  {
    value: "Liechtenstein",
    label: "Liechtenstein",
  },
  {
    value: "Lithuania",
    label: "Lithuania",
  },
  {
    value: "Luxembourg",
    label: "Luxembourg",
  },
  {
    value: "Macau",
    label: "Macau",
  },
  {
    value: "Macedonia",
    label: "Macedonia",
  },
  {
    value: "Madagascar",
    label: "Madagascar",
  },
  {
    value: "Malawi",
    label: "Malawi",
  },
  {
    value: "Malaysia",
    label: "Malaysia",
  },
  {
    value: "Maldives",
    label: "Maldives",
  },
  {
    value: "Mali",
    label: "Mali",
  },
  {
    value: "Malta",
    label: "Malta",
  },
  {
    value: "Marshall Islands",
    label: "Marshall Islands",
  },
  {
    value: "Martinique",
    label: "Martinique",
  },
  {
    value: "Mauritania",
    label: "Mauritania",
  },
  {
    value: "Mauritius",
    label: "Mauritius",
  },
  {
    value: "Mayotte",
    label: "Mayotte",
  },
  {
    value: "Mexico",
    label: "Mexico",
  },
  {
    value: "Micronesia, Federated States of",
    label: "Micronesia, Federated States of",
  },
  {
    value: "Moldova, Republic of",
    label: "Moldova, Republic of",
  },
  {
    value: "Monaco",
    label: "Monaco",
  },
  {
    value: "Mongolia",
    label: "Mongolia",
  },
  {
    value: "Montenegro",
    label: "Montenegro",
  },
  {
    value: "Montserrat",
    label: "Montserrat",
  },
  {
    value: "Morocco",
    label: "Morocco",
  },
  {
    value: "Mozambique",
    label: "Mozambique",
  },
  {
    value: "Myanmar",
    label: "Myanmar",
  },
  {
    value: "Namibia",
    label: "Namibia",
  },
  {
    value: "Nauru",
    label: "Nauru",
  },
  {
    value: "Nepal",
    label: "Nepal",
  },
  {
    value: "Netherlands",
    label: "Netherlands",
  },
  {
    value: "Netherlands Antilles",
    label: "Netherlands Antilles",
  },
  {
    value: "New Caledonia",
    label: "New Caledonia",
  },
  {
    value: "New Zealand",
    label: "New Zealand",
  },
  {
    value: "Nicaragua",
    label: "Nicaragua",
  },
  {
    value: "Niger",
    label: "Niger",
  },
  {
    value: "Nigeria",
    label: "Nigeria",
  },
  {
    value: "Niue",
    label: "Niue",
  },
  {
    value: "Norfolk Island",
    label: "Norfolk Island",
  },
  {
    value: "Northern Mariana Islands",
    label: "Northern Mariana Islands",
  },
  {
    value: "Norway",
    label: "Norway",
  },
  {
    value: "Oman",
    label: "Oman",
  },
  {
    value: "Pakistan",
    label: "Pakistan",
  },
  {
    value: "Palau",
    label: "Palau",
  },
  {
    value: "Palestine",
    label: "Palestine",
  },
  {
    value: "Panama",
    label: "Panama",
  },
  {
    value: "Papua New Guinea",
    label: "Papua New Guinea",
  },
  {
    value: "Paraguay",
    label: "Paraguay",
  },
  {
    value: "Peru",
    label: "Peru",
  },
  {
    value: "Philippines",
    label: "Philippines",
  },
  {
    value: "Pitcairn",
    label: "Pitcairn",
  },
  {
    value: "Poland",
    label: "Poland",
  },
  {
    value: "Portugal",
    label: "Portugal",
  },
  {
    value: "Puerto Rico",
    label: "Puerto Rico",
  },
  {
    value: "Qatar",
    label: "Qatar",
  },
  {
    value: "Reunion",
    label: "Reunion",
  },
  {
    value: "Romania",
    label: "Romania",
  },
  {
    value: "Russian Federation",
    label: "Russian Federation",
  },
  {
    value: "Rwanda",
    label: "Rwanda",
  },
  {
    value: "Saint Kitts and Nevis",
    label: "Saint Kitts and Nevis",
  },
  {
    value: "Saint Lucia",
    label: "Saint Lucia",
  },
  {
    value: "Saint Vincent and the Grenadines",
    label: "Saint Vincent and the Grenadines",
  },
  {
    value: "Samoa",
    label: "Samoa",
  },
  {
    value: "San Marino",
    label: "San Marino",
  },
  {
    value: "Sao Tome and Principe",
    label: "Sao Tome and Principe",
  },
  {
    value: "Saudi Arabia",
    label: "Saudi Arabia",
  },
  {
    value: "Senegal",
    label: "Senegal",
  },
  {
    value: "Serbia",
    label: "Serbia",
  },
  {
    value: "Seychelles",
    label: "Seychelles",
  },
  {
    value: "Sierra Leone",
    label: "Sierra Leone",
  },
  {
    value: "Singapore",
    label: "Singapore",
  },
  {
    value: "Slovakia",
    label: "Slovakia",
  },
  {
    value: "Slovenia",
    label: "Slovenia",
  },
  {
    value: "Solomon Islands",
    label: "Solomon Islands",
  },
  {
    value: "Somalia",
    label: "Somalia",
  },
  {
    value: "South Africa",
    label: "South Africa",
  },
  {
    value: "South Georgia South Sandwich Islands",
    label: "South Georgia South Sandwich Islands",
  },
  {
    value: "Spain",
    label: "Spain",
  },
  {
    value: "Sri Lanka",
    label: "Sri Lanka",
  },
  {
    value: "St. Helena",
    label: "St. Helena",
  },
  {
    value: "St. Pierre and Miquelon",
    label: "St. Pierre and Miquelon",
  },
  {
    value: "Sudan",
    label: "Sudan",
  },
  {
    value: "Suriname",
    label: "Suriname",
  },
  {
    value: "Svalbard and Jan Mayen Islands",
    label: "Svalbard and Jan Mayen Islands",
  },
  {
    value: "Swaziland",
    label: "Swaziland",
  },
  {
    value: "Sweden",
    label: "Sweden",
  },
  {
    value: "Switzerland",
    label: "Switzerland",
  },
  {
    value: "Syrian Arab Republic",
    label: "Syrian Arab Republic",
  },
  {
    value: "Taiwan",
    label: "Taiwan",
  },
  {
    value: "Tajikistan",
    label: "Tajikistan",
  },
  {
    value: "Tanzania, United Republic of",
    label: "Tanzania, United Republic of",
  },
  {
    value: "Thailand",
    label: "Thailand",
  },
  {
    value: "Togo",
    label: "Togo",
  },
  {
    value: "Tokelau",
    label: "Tokelau",
  },
  {
    value: "Tonga",
    label: "Tonga",
  },
  {
    value: "Trinidad and Tobago",
    label: "Trinidad and Tobago",
  },
  {
    value: "Tunisia",
    label: "Tunisia",
  },
  {
    value: "Turkey",
    label: "Turkey",
  },
  {
    value: "Turkmenistan",
    label: "Turkmenistan",
  },
  {
    value: "Turks and Caicos Islands",
    label: "Turks and Caicos Islands",
  },
  {
    value: "Tuvalu",
    label: "Tuvalu",
  },
  {
    value: "Uganda",
    label: "Uganda",
  },
  {
    value: "Ukraine",
    label: "Ukraine",
  },
  {
    value: "United Arab Emirates",
    label: "United Arab Emirates",
  },
  {
    value: "United Kingdom",
    label: "United Kingdom",
  },
  {
    value: "United States",
    label: "United States",
  },
  {
    value: "United States minor outlying islands",
    label: "United States minor outlying islands",
  },
  {
    value: "Uruguay",
    label: "Uruguay",
  },
  {
    value: "Uzbekistan",
    label: "Uzbekistan",
  },
  {
    value: "Vanuatu",
    label: "Vanuatu",
  },
  {
    value: "Vatican City State",
    label: "Vatican City State",
  },
  {
    value: "Venezuela",
    label: "Venezuela",
  },
  {
    value: "Vietnam",
    label: "Vietnam",
  },
  {
    value: "Virgin Islands (British)",
    label: "Virgin Islands (British",
  },
  {
    value: "Virgin Islands (U.S.)",
    label: "Virgin Islands (U.S",
  },
  {
    value: "Wallis and Futuna Islands",
    label: "Wallis and Futuna Islands",
  },
  {
    value: "Western Sahara",
    label: "Western Sahara",
  },
  {
    value: "Yemen",
    label: "Yemen",
  },
  {
    value: "Yugoslavia",
    label: "Yugoslavia",
  },
  {
    value: "Zaire",
    label: "Zaire",
  },
  {
    value: "Zambia",
    label: "Zambia",
  },
  {
    value: "Zimbabwe",
    label: "Zimbabwe",
  },
];

export const errorHandle = (err: any) => {
  // message.error(err.message)
  setTimeout(() => {
    if (err.status.code === 403 && err.message === "User is not authorized.") {
      delete_cookie("ungradeToken");
      delete_cookie("ungradeUser");
      window.location.href = "/login";
    }
  }, 4000);
};

export const semesterTypeArr = [
  {
    value: "semester",
    label: "Semester",
    duration: "15 weeks",
    milisecond: "9072000000",
  },
  {
    value: "quarter",
    label: "Quarter",
    duration: "10 weeks",
    milisecond: "6048000000",
  },
  {
    value: "trimester",
    label: "Trimester",
    duration: "13 weeks",
    milisecond: "7862000000",
  },
  {
    value: "summer_session",
    label: "Summer Session",
    duration: "10 weeks",
    milisecond: "6048000000",
  },
];

const getSemesterWeeks = () => { };
export const isDurationCompleted = (duration: any, startedAt: any) => {
  let startedAtMili = new Date(startedAt).getTime();
  let completedDate = startedAtMili + Number(duration);
  if (completedDate > new Date().getTime()) {
    return true;
  } else {
    return false;
  }
};
export const daysLeft = (duration: any, startedAt: any) => {
  let startedAtMili = new Date(startedAt).getTime();
  let completedDate = startedAtMili + Number(duration);
  // Current date
  const currentDate = moment();

  // Target date
  const targetDate = moment(completedDate); // Assuming the target date is December 31, 2024
  console.log(targetDate, currentDate, duration, startedAt);
  // Calculate the difference in days
  // Calculate the difference
  const daysLeft = targetDate.diff(currentDate, "days");
  const weeksLeft = targetDate.diff(currentDate, "weeks");
  const monthsLeft = targetDate.diff(currentDate, "months");

  console.log("Days left until target date:", daysLeft);
  return monthsLeft
    ? monthsLeft + ` Month${monthsLeft > 1 ? "s" : ""} Left`
    : weeksLeft
      ? weeksLeft + ` Week${weeksLeft > 1 ? "s" : ""} Left`
      : daysLeft
        ? +` day${daysLeft > 1 ? "s" : ""} Lefts`
        : null;
};

export const calculateJobEligibility = (
  onetLevel: any,
  preLevel: any,
  postLevel: any
) => {
  let ourPercent = ((postLevel || preLevel) / 10) * 100;
  let onetPercent = (onetLevel / 10) * 100;
  let eligiblityPercent =
    (ourPercent / onetPercent) * 100 > 100
      ? 100
      : (ourPercent / onetPercent) * 100;
  return eligiblityPercent ? eligiblityPercent.toFixed(2) : "00.00";
};
// Function to create an array of years, given a start and end range
export const createYearArray = (startYear: any, endYear: any) => {
  let years: number[] = [];
  for (let i: number = startYear; i <= endYear; i++) {
    years.push(i);
  }
  return years;
};

// Current year
const currentYear = new Date().getFullYear();

// Enrollment years array (let's assume past 20 years from the current year)
const enrollmentYears = createYearArray(currentYear - 20, currentYear);

// Graduation years array is dependent on the selected enrollment year
export const getGraduationYears = (enrollYear: any) => {
  return createYearArray(Number(enrollYear) + 1, Number(enrollYear) + 20);
};

export function logGroup(type: string, data: any) {
  console.groupCollapsed(type);
  console.log(data);
  console.groupEnd();
}
// export const CheckTour = ({ childrens, ...props }) => {
//   const userProfile: any = useAppSelector(
//     (state) => state?.completeProfileSlice?.userProfile
//   );
//   const dispatch = useAppDispatch()
//   useEffect(() => {
//     dispatch(getProfile());
//   }, [])
//   useEffect(() => {
//     console.log(userProfile, 'userProfileuserProfile')
//   }, [userProfile])

//   return userProfile?.tutorial?.includes('onbordingStepOne') ? (
//     {childrens}
//   ) : null
// }

export const checkTour = (userProfile, tourType) => {
  let arr = userProfile?.tutorial?.map((a, i) => {
    return a.tutorial
  })
  console.log(userProfile,'arrarrarrarr')
  return !arr?.includes(tourType)
}

// onbordingStepOne
// onbordingStepTwo
// homeTourStart
// addCourse
// courseEdit
// assessmentTour
// courseTour
// addCourseTour
// evaluationTour