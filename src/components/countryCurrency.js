const countries = [
  { countryName: "Andorra", currency: "EUR", symbol: "€", iso_code: "AD" },
  {
    countryName: "United Arab Emirates",
    currency: "AED",
    symbol: "د.إ",
    dateFormat: "dd/MM/yyyy",
    iso_code: "AE",
  },
  { countryName: "Afghanistan", currency: "AFN", symbol: "Af", iso_code: "AF" },
  {
    countryName: "Antigua and Barbuda",
    currency: "XCD",
    symbol: "XCD",
    iso_code: "AG",
  },
  { countryName: "Anguilla", currency: "XCD", symbol: "XCD", iso_code: "AI" },
  {
    countryName: "Albania",
    currency: "ALL",
    symbol: "ALL",
    dateFormat: "yyyy-MM-dd",
    iso_code: "AL",
  },
  { countryName: "Armenia", currency: "AMD", symbol: "AMD", iso_code: "AM" },
  { countryName: "Angola", currency: "AOA", symbol: "AOA", iso_code: "AO" },
  {
    countryName: "Argentina",
    currency: "ARS",
    symbol: "AR$",
    dateFormat: "dd/MM/yyyy",
    iso_code: "AR",
  },
  {
    countryName: "American Samoa",
    currency: "USD",
    symbol: "$",
    iso_code: "AS",
  },
  {
    countryName: "Austria",
    currency: "EUR",
    symbol: "€",
    dateFormat: "dd.MM.yyyy",
    iso_code: "AT",
  },
  {
    countryName: "Australia",
    currency: "AUD",
    symbol: "AU$",
    dateFormat: "d/MM/yyyy",
    iso_code: "AU",
  },
  { countryName: "Aruba", currency: "AWG", symbol: "AWG", iso_code: "AW" },
  {
    countryName: "Aland Islands",
    currency: "EUR",
    symbol: "€",
    iso_code: "AX",
  },
  {
    countryName: "Azerbaijan",
    currency: "AZN",
    symbol: "man.",
    iso_code: "AZ",
  },
  {
    countryName: "Bosnia and Herzegovina",
    currency: "BAM",
    symbol: "KM",
    dateFormat: "yyyy-MM-dd",
    iso_code: "BA",
  },
  { countryName: "Barbados", currency: "BBD", symbol: "BBD", iso_code: "BB" },
  { countryName: "Bangladesh", currency: "BDT", symbol: "Tk", iso_code: "BD" },
  {
    countryName: "Belgium",
    currency: "EUR",
    symbol: "€",
    dateFormat: "d/MM/yyyy",
    iso_code: "BE",
  },
  {
    countryName: "Burkina Faso",
    currency: "XOF",
    symbol: "CFA",
    iso_code: "BF",
  },
  {
    countryName: "Bulgaria",
    currency: "BGN",
    symbol: "BGN",
    dateFormat: "yyyy-M-d",
    iso_code: "BG",
  },
  {
    countryName: "Bahrain",
    currency: "BHD",
    symbol: "BD",
    dateFormat: "dd/MM/yyyy",
    iso_code: "BH",
  },
  { countryName: "Burundi", currency: "BIF", symbol: "FBu", iso_code: "BI" },
  { countryName: "Benin", currency: "XOF", symbol: "CFA", iso_code: "BJ" },
  {
    countryName: "Saint Barthelemy",
    currency: "EUR",
    symbol: "€",
    iso_code: "BL",
  },
  { countryName: "Bermuda", currency: "BMD", symbol: "BMD", iso_code: "BM" },
  { countryName: "Brunei", currency: "BND", symbol: "BN$", iso_code: "BN" },
  {
    countryName: "Bolivia",
    currency: "BOB",
    symbol: "Bs",
    dateFormat: "dd-MM-yyyy",
    iso_code: "BO",
  },
  {
    countryName: "Bonaire, Saint Eustatius and Saba ",
    currency: "USD",
    symbol: "$",
    iso_code: "BQ",
  },
  {
    countryName: "Brazil",
    currency: "BRL",
    symbol: "R$",
    dateFormat: "dd/MM/yyyy",
    iso_code: "BR",
  },
  { countryName: "Bahamas", currency: "BSD", symbol: "BSD", iso_code: "BS" },
  { countryName: "Bhutan", currency: "BTN", symbol: "BTN", iso_code: "BT" },
  {
    countryName: "Bouvet Island",
    currency: "NOK",
    symbol: "Nkr",
    iso_code: "BV",
  },
  { countryName: "Botswana", currency: "BWP", symbol: "BWP", iso_code: "BW" },
  {
    countryName: "Belarus",
    currency: "BYN",
    symbol: "BYN",
    dateFormat: "d.M.yyyy",
    iso_code: "BY",
  },
  { countryName: "Belize", currency: "BZD", symbol: "BZ$", iso_code: "BZ" },
  {
    countryName: "Canada",
    currency: "CAD",
    symbol: "CA$",
    dateFormat: "dd/MM/yyyy",
    iso_code: "CA",
  },
  {
    countryName: "Cocos Islands",
    currency: "AUD",
    symbol: "AU$",
    iso_code: "CC",
  },
  {
    countryName: "Democratic Republic of the Congo",
    currency: "CDF",
    symbol: "CDF",
    iso_code: "CD",
  },
  {
    countryName: "Central African Republic",
    currency: "XAF",
    symbol: "FCFA",
    iso_code: "CF",
  },
  {
    countryName: "Republic of the Congo",
    currency: "XAF",
    symbol: "FCFA",
    iso_code: "CG",
  },
  {
    countryName: "Switzerland",
    currency: "CHF",
    symbol: "CHF",
    dateFormat: "dd.MM.yyyy",
    iso_code: "CH",
  },
  {
    countryName: "Ivory Coast",
    currency: "XOF",
    symbol: "CFA",
    iso_code: "CI",
  },
  {
    countryName: "Cook Islands",
    currency: "NZD",
    symbol: "NZ$",
    iso_code: "CK",
  },
  {
    countryName: "Chile",
    currency: "CLP",
    symbol: "CL$",
    dateFormat: "dd-MM-yyyy",
    iso_code: "CL",
  },
  { countryName: "Cameroon", currency: "XAF", symbol: "FCFA", iso_code: "CM" },
  {
    countryName: "China",
    currency: "CNY",
    symbol: "CN¥",
    dateFormat: "yyyy-M-d",
    iso_code: "CN",
  },
  {
    countryName: "Colombia",
    currency: "COP",
    symbol: "CO$",
    dateFormat: "d/MM/yyyy",
    iso_code: "CO",
  },
  {
    countryName: "Costa Rica",
    currency: "CRC",
    symbol: "₡",
    dateFormat: "dd/MM/yyyy",
    iso_code: "CR",
  },
  { countryName: "Cuba", currency: "CUP", symbol: "CUP", iso_code: "CU" },
  { countryName: "Cape Verde", currency: "CVE", symbol: "CV$", iso_code: "CV" },
  { countryName: "Curacao", currency: "ANG", symbol: "ANG", iso_code: "CW" },
  {
    countryName: "Christmas Island",
    currency: "AUD",
    symbol: "AU$",
    iso_code: "CX",
  },
  {
    countryName: "Cyprus",
    currency: "EUR",
    symbol: "€",
    dateFormat: "dd/MM/yyyy",
    iso_code: "CY",
  },
  {
    countryName: "Czech Republic",
    currency: "CZK",
    symbol: "Kč",
    dateFormat: "d.M.yyyy",
    iso_code: "CZ",
  },
  {
    countryName: "Germany",
    currency: "EUR",
    symbol: "€",
    dateFormat: "dd.MM.yyyy",
    iso_code: "DE",
  },
  { countryName: "Djibouti", currency: "DJF", symbol: "Fdj", iso_code: "DJ" },
  {
    countryName: "Denmark",
    currency: "DKK",
    symbol: "Dkr",
    dateFormat: "dd-MM-yyyy",
    iso_code: "DK",
  },
  { countryName: "Dominica", currency: "XCD", symbol: "XCD", iso_code: "DM" },
  {
    countryName: "Dominican Republic",
    currency: "DOP",
    symbol: "RD$",
    dateFormat: "MM/dd/yyyy",
    iso_code: "DO",
  },
  {
    countryName: "Algeria",
    currency: "DZD",
    symbol: "DA",
    dateFormat: "dd/MM/yyyy",
    iso_code: "DZ",
  },
  {
    countryName: "Ecuador",
    currency: "USD",
    symbol: "$",
    dateFormat: "dd/MM/yyyy",
    iso_code: "EC",
  },
  {
    countryName: "Estonia",
    currency: "EUR",
    symbol: "€",
    dateFormat: "d.MM.yyyy",
    iso_code: "EE",
  },
  {
    countryName: "Egypt",
    currency: "EGP",
    symbol: "EGP",
    dateFormat: "dd/MM/yyyy",
    iso_code: "EG",
  },
  {
    countryName: "Western Sahara",
    currency: "MAD",
    symbol: "MAD",
    iso_code: "EH",
  },
  { countryName: "Eritrea", currency: "ERN", symbol: "Nfk", iso_code: "ER" },
  {
    countryName: "Spain",
    currency: "EUR",
    symbol: "€",
    dateFormat: "dd/MM/yyyy",
    iso_code: "ES",
  },
  { countryName: "Ethiopia", currency: "ETB", symbol: "Br", iso_code: "ET" },
  {
    countryName: "Finland",
    currency: "EUR",
    symbol: "€",
    dateFormat: "d.M.yyyy",
    iso_code: "FI",
  },
  { countryName: "Fiji", currency: "FJD", symbol: "FJD", iso_code: "FJ" },
  {
    countryName: "Falkland Islands",
    currency: "FKP",
    symbol: "FKP",
    iso_code: "FK",
  },
  { countryName: "Micronesia", currency: "USD", symbol: "$", iso_code: "FM" },
  {
    countryName: "Faroe Islands",
    currency: "DKK",
    symbol: "Dkr",
    iso_code: "FO",
  },
  {
    countryName: "France",
    currency: "EUR",
    symbol: "€",
    dateFormat: "dd/MM/yyyy",
    iso_code: "FR",
  },
  { countryName: "Gabon", currency: "XAF", symbol: "FCFA", iso_code: "GA" },
  {
    countryName: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    dateFormat: "dd/MM/yyyy",
    iso_code: "GB",
  },
  { countryName: "Grenada", currency: "XCD", symbol: "XCD", iso_code: "GD" },
  { countryName: "Georgia", currency: "GEL", symbol: "GEL", iso_code: "GE" },
  {
    countryName: "French Guiana",
    currency: "EUR",
    symbol: "€",
    iso_code: "GF",
  },
  { countryName: "Guernsey", currency: "GBP", symbol: "£", iso_code: "GG" },
  { countryName: "Ghana", currency: "GHS", symbol: "GH₵", iso_code: "GH" },
  { countryName: "Gibraltar", currency: "GIP", symbol: "GIP", iso_code: "GI" },
  { countryName: "Greenland", currency: "DKK", symbol: "Dkr", iso_code: "GL" },
  { countryName: "Gambia", currency: "GMD", symbol: "GMD", iso_code: "GM" },
  { countryName: "Guinea", currency: "GNF", symbol: "FG", iso_code: "GN" },
  { countryName: "Guadeloupe", currency: "EUR", symbol: "€", iso_code: "GP" },
  {
    countryName: "Equatorial Guinea",
    currency: "XAF",
    symbol: "FCFA",
    iso_code: "GQ",
  },
  {
    countryName: "Greece",
    currency: "EUR",
    symbol: "€",
    dateFormat: "d/M/yyyy",
    iso_code: "GR",
  },
  {
    countryName: "South Georgia and the South Sandwich Islands",
    currency: "GBP",
    symbol: "£",
    iso_code: "GS",
  },
  {
    countryName: "Guatemala",
    currency: "GTQ",
    symbol: "GTQ",
    dateFormat: "d/MM/yyyy",
    iso_code: "GT",
  },
  { countryName: "Guam", currency: "USD", symbol: "$", iso_code: "GU" },
  {
    countryName: "Guinea-Bissau",
    currency: "XOF",
    symbol: "CFA",
    iso_code: "GW",
  },
  { countryName: "Guyana", currency: "GYD", symbol: "GYD", iso_code: "GY" },
  {
    countryName: "Hong Kong",
    currency: "HKD",
    symbol: "HK$",
    dateFormat: "yyyy年M月d日",
    iso_code: "HK",
  },
  {
    countryName: "Heard Island and McDonald Islands",
    currency: "AUD",
    symbol: "AU$",
    iso_code: "HM",
  },
  {
    countryName: "Honduras",
    currency: "HNL",
    symbol: "HNL",
    dateFormat: "MM-dd-yyyy",
    iso_code: "HN",
  },
  {
    countryName: "Croatia",
    currency: "HRK",
    symbol: "kn",
    dateFormat: "dd.MM.yyyy.",
    iso_code: "HR",
  },
  { countryName: "Haiti", currency: "HTG", symbol: "HTG", iso_code: "HT" },
  {
    countryName: "Hungary",
    currency: "HUF",
    symbol: "Ft",
    dateFormat: "yyyy.MM.dd.",
    iso_code: "HU",
  },
  {
    countryName: "Indonesia",
    currency: "IDR",
    symbol: "Rp",
    dateFormat: "dd/MM/yyyy",
    iso_code: "ID",
  },
  {
    countryName: "Ireland",
    currency: "EUR",
    symbol: "€",
    dateFormat: "dd/MM/yyyy",
    iso_code: "IE",
  },
  {
    countryName: "Israel",
    currency: "ILS",
    symbol: "₪",
    dateFormat: "dd/MM/yyyy",
    iso_code: "IL",
  },
  { countryName: "Isle of Man", currency: "GBP", symbol: "£", iso_code: "IM" },
  {
    countryName: "India",
    currency: "INR",
    symbol: "Rs",
    dateFormat: "d/M/yyyy",
    iso_code: "IN",
  },
  {
    countryName: "British Indian Ocean Territory",
    currency: "USD",
    symbol: "$",
    iso_code: "IO",
  },
  {
    countryName: "Iraq",
    currency: "IQD",
    symbol: "IQD",
    dateFormat: "dd/MM/yyyy",
    iso_code: "IQ",
  },
  { countryName: "Iran", currency: "IRR", symbol: "IRR", iso_code: "IR" },
  {
    countryName: "Iceland",
    currency: "ISK",
    symbol: "Ikr",
    dateFormat: "d.M.yyyy",
    iso_code: "IS",
  },
  {
    countryName: "Italy",
    currency: "EUR",
    symbol: "€",
    dateFormat: "dd/MM/yyyy",
    iso_code: "IT",
  },
  { countryName: "Jersey", currency: "GBP", symbol: "£", iso_code: "JE" },
  { countryName: "Jamaica", currency: "JMD", symbol: "J$", iso_code: "JM" },
  {
    countryName: "Jordan",
    currency: "JOD",
    symbol: "JD",
    dateFormat: "dd/MM/yyyy",
    iso_code: "JO",
  },
  {
    countryName: "Japan",
    currency: "JPY",
    symbol: "¥",
    dateFormat: "H24.MM.dd",
    iso_code: "JP",
  },
  { countryName: "Kenya", currency: "KES", symbol: "Ksh", iso_code: "KE" },
  { countryName: "Kyrgyzstan", currency: "KGS", symbol: "KGS", iso_code: "KG" },
  { countryName: "Cambodia", currency: "KHR", symbol: "KHR", iso_code: "KH" },
  { countryName: "Kiribati", currency: "AUD", symbol: "AU$", iso_code: "KI" },
  { countryName: "Comoros", currency: "KMF", symbol: "CF", iso_code: "KM" },
  {
    countryName: "Saint Kitts and Nevis",
    currency: "XCD",
    symbol: "XCD",
    iso_code: "KN",
  },
  {
    countryName: "North Korea",
    currency: "KPW",
    symbol: "KPW",
    iso_code: "KP",
  },
  {
    countryName: "South Korea",
    currency: "KRW",
    symbol: "₩",
    dateFormat: "yyyy. M. d",
    iso_code: "KR",
  },
  {
    countryName: "Kuwait",
    currency: "KWD",
    symbol: "KD",
    dateFormat: "dd/MM/yyyy",
    iso_code: "KW",
  },
  {
    countryName: "Cayman Islands",
    currency: "KYD",
    symbol: "KYD",
    iso_code: "KY",
  },
  { countryName: "Kazakhstan", currency: "KZT", symbol: "KZT", iso_code: "KZ" },
  { countryName: "Laos", currency: "LAK", symbol: "LAK", iso_code: "LA" },
  {
    countryName: "Lebanon",
    currency: "LBP",
    symbol: "LB£",
    dateFormat: "dd/MM/yyyy",
    iso_code: "LB",
  },
  {
    countryName: "Saint Lucia",
    currency: "XCD",
    symbol: "XCD",
    iso_code: "LC",
  },
  {
    countryName: "Liechtenstein",
    currency: "CHF",
    symbol: "CHF",
    iso_code: "LI",
  },
  { countryName: "Sri Lanka", currency: "LKR", symbol: "SLRs", iso_code: "LK" },
  { countryName: "Liberia", currency: "LRD", symbol: "LRD", iso_code: "LR" },
  { countryName: "Lesotho", currency: "LSL", symbol: "LSL", iso_code: "LS" },
  {
    countryName: "Lithuania",
    currency: "EUR",
    symbol: "€",
    dateFormat: "yyyy.M.d",
    iso_code: "LT",
  },
  {
    countryName: "Luxembourg",
    currency: "EUR",
    symbol: "€",
    dateFormat: "dd.MM.yyyy",
    iso_code: "LU",
  },
  {
    countryName: "Latvia",
    currency: "EUR",
    symbol: "€",
    dateFormat: "yyyy.d.M",
    iso_code: "LV",
  },
  {
    countryName: "Libya",
    currency: "LYD",
    symbol: "LD",
    dateFormat: "dd/MM/yyyy",
    iso_code: "LY",
  },
  {
    countryName: "Morocco",
    currency: "MAD",
    symbol: "MAD",
    dateFormat: "dd/MM/yyyy",
    iso_code: "MA",
  },
  { countryName: "Monaco", currency: "EUR", symbol: "€", iso_code: "MC" },
  { countryName: "Moldova", currency: "MDL", symbol: "MDL", iso_code: "MD" },
  {
    countryName: "Montenegro",
    currency: "EUR",
    symbol: "€",
    dateFormat: "d.M.yyyy.",
    iso_code: "ME",
  },
  { countryName: "Saint Martin", currency: "EUR", symbol: "€", iso_code: "MF" },
  { countryName: "Madagascar", currency: "MGA", symbol: "MGA", iso_code: "MG" },
  {
    countryName: "Marshall Islands",
    currency: "USD",
    symbol: "$",
    iso_code: "MH",
  },
  {
    countryName: "Macedonia",
    currency: "MKD",
    symbol: "MKD",
    dateFormat: "d.M.yyyy",
    iso_code: "MK",
  },
  { countryName: "Mali", currency: "XOF", symbol: "CFA", iso_code: "ML" },
  { countryName: "Myanmar", currency: "MMK", symbol: "MMK", iso_code: "MM" },
  { countryName: "Mongolia", currency: "MNT", symbol: "MNT", iso_code: "MN" },
  { countryName: "Macao", currency: "MOP", symbol: "MOP$", iso_code: "MO" },
  {
    countryName: "Northern Mariana Islands",
    currency: "USD",
    symbol: "$",
    iso_code: "MP",
  },
  { countryName: "Martinique", currency: "EUR", symbol: "€", iso_code: "MQ" },
  { countryName: "Mauritania", currency: "MRU", symbol: "MRU", iso_code: "MR" },
  { countryName: "Montserrat", currency: "XCD", symbol: "XCD", iso_code: "MS" },
  {
    countryName: "Malta",
    currency: "EUR",
    symbol: "€",
    dateFormat: "dd/MM/yyyy",
    iso_code: "MT",
  },
  { countryName: "Mauritius", currency: "MUR", symbol: "MURs", iso_code: "MU" },
  { countryName: "Maldives", currency: "MVR", symbol: "MVR", iso_code: "MV" },
  { countryName: "Malawi", currency: "MWK", symbol: "MWK", iso_code: "MW" },
  {
    countryName: "Mexico",
    currency: "MXN",
    symbol: "MX$",
    dateFormat: "d/MM/yyyy",
    iso_code: "MX",
  },
  {
    countryName: "Malaysia",
    currency: "MYR",
    symbol: "RM",
    dateFormat: "dd/MM/yyyy",
    iso_code: "MY",
  },
  { countryName: "Mozambique", currency: "MZN", symbol: "MTn", iso_code: "MZ" },
  { countryName: "Namibia", currency: "NAD", symbol: "N$", iso_code: "NA" },
  {
    countryName: "New Caledonia",
    currency: "XPF",
    symbol: "XPF",
    iso_code: "NC",
  },
  { countryName: "Niger", currency: "XOF", symbol: "CFA", iso_code: "NE" },
  {
    countryName: "Norfolk Island",
    currency: "AUD",
    symbol: "AU$",
    iso_code: "NF",
  },
  { countryName: "Nigeria", currency: "NGN", symbol: "₦", iso_code: "NG" },
  {
    countryName: "Nicaragua",
    currency: "NIO",
    symbol: "C$",
    dateFormat: "MM-dd-yyyy",
    iso_code: "NI",
  },
  {
    countryName: "Netherlands",
    currency: "EUR",
    symbol: "€",
    dateFormat: "d-M-yyyy",
    iso_code: "NL",
  },
  {
    countryName: "Norway",
    currency: "NOK",
    symbol: "Nkr",
    dateFormat: "dd.MM.yyyy",
    iso_code: "NO",
  },
  { countryName: "Nepal", currency: "NPR", symbol: "NPRs", iso_code: "NP" },
  { countryName: "Nauru", currency: "AUD", symbol: "AU$", iso_code: "NR" },
  { countryName: "Niue", currency: "NZD", symbol: "NZ$", iso_code: "NU" },
  {
    countryName: "New Zealand",
    currency: "NZD",
    symbol: "NZ$",
    dateFormat: "d/MM/yyyy",
    iso_code: "NZ",
  },
  {
    countryName: "Oman",
    currency: "OMR",
    symbol: "OMR",
    dateFormat: "dd/MM/yyyy",
    iso_code: "OM",
  },
  {
    countryName: "Panama",
    currency: "PAB",
    symbol: "B/.",
    dateFormat: "MM/dd/yyyy",
    iso_code: "PA",
  },
  {
    countryName: "Peru",
    currency: "PEN",
    symbol: "S/.",
    dateFormat: "dd/MM/yyyy",
    iso_code: "PE",
  },
  {
    countryName: "French Polynesia",
    currency: "XPF",
    symbol: "XPF",
    iso_code: "PF",
  },
  {
    countryName: "Papua New Guinea",
    currency: "PGK",
    symbol: "PGK",
    iso_code: "PG",
  },
  {
    countryName: "Philippines",
    currency: "PHP",
    symbol: "₱",
    dateFormat: "M/d/yyyy",
    iso_code: "PH",
  },
  { countryName: "Pakistan", currency: "PKR", symbol: "PKRs", iso_code: "PK" },
  {
    countryName: "Poland",
    currency: "PLN",
    symbol: "zł",
    dateFormat: "dd.MM.yyyy",
    iso_code: "PL",
  },
  {
    countryName: "Saint Pierre and Miquelon",
    currency: "EUR",
    symbol: "€",
    iso_code: "PM",
  },
  { countryName: "Pitcairn", currency: "NZD", symbol: "NZ$", iso_code: "PN" },
  {
    countryName: "Puerto Rico",
    currency: "USD",
    symbol: "$",
    dateFormat: "MM-dd-yyyy",
    iso_code: "PR",
  },
  {
    countryName: "Palestinian Territory",
    currency: "ILS",
    symbol: "₪",
    iso_code: "PS",
  },
  {
    countryName: "Portugal",
    currency: "EUR",
    symbol: "€",
    dateFormat: "dd-MM-yyyy",
    iso_code: "PT",
  },
  { countryName: "Palau", currency: "USD", symbol: "$", iso_code: "PW" },
  {
    countryName: "Paraguay",
    currency: "PYG",
    symbol: "₲",
    dateFormat: "dd/MM/yyyy",
    iso_code: "PY",
  },
  {
    countryName: "Qatar",
    currency: "QAR",
    symbol: "QR",
    dateFormat: "dd/MM/yyyy",
    iso_code: "QA",
  },
  { countryName: "Reunion", currency: "EUR", symbol: "€", iso_code: "RE" },
  {
    countryName: "Romania",
    currency: "RON",
    symbol: "RON",
    dateFormat: "dd.MM.yyyy",
    iso_code: "RO",
  },
  {
    countryName: "Serbia",
    currency: "RSD",
    symbol: "din.",
    dateFormat: "d.M.yyyy.",
    iso_code: "RS",
  },
  {
    countryName: "Russia",
    currency: "RUB",
    symbol: "RUB",
    dateFormat: "dd.MM.yyyy",
    iso_code: "RU",
  },
  { countryName: "Rwanda", currency: "RWF", symbol: "RWF", iso_code: "RW" },
  {
    countryName: "Saudi Arabia",
    currency: "SAR",
    symbol: "SR",
    dateFormat: "dd/MM/yyyy",
    iso_code: "SA",
  },
  {
    countryName: "Solomon Islands",
    currency: "SBD",
    symbol: "SBD",
    iso_code: "SB",
  },
  { countryName: "Seychelles", currency: "SCR", symbol: "SCR", iso_code: "SC" },
  {
    countryName: "Sudan",
    currency: "SDG",
    symbol: "SDG",
    dateFormat: "dd/MM/yyyy",
    iso_code: "SD",
  },
  {
    countryName: "Sweden",
    currency: "SEK",
    symbol: "Skr",
    dateFormat: "yyyy-MM-dd",
    iso_code: "SE",
  },
  {
    countryName: "Singapore",
    currency: "SGD",
    symbol: "S$",
    dateFormat: "M/d/yyyy",
    iso_code: "SG",
  },
  {
    countryName: "Saint Helena",
    currency: "SHP",
    symbol: "SHP",
    iso_code: "SH",
  },
  {
    countryName: "Slovenia",
    currency: "EUR",
    symbol: "€",
    dateFormat: "d.M.yyyy",
    iso_code: "SI",
  },
  {
    countryName: "Svalbard and Jan Mayen",
    currency: "NOK",
    symbol: "Nkr",
    iso_code: "SJ",
  },
  {
    countryName: "Slovakia",
    currency: "EUR",
    symbol: "€",
    dateFormat: "d.M.yyyy",
    iso_code: "SK",
  },
  {
    countryName: "Sierra Leone",
    currency: "SLL",
    symbol: "SLL",
    iso_code: "SL",
  },
  { countryName: "San Marino", currency: "EUR", symbol: "€", iso_code: "SM" },
  { countryName: "Senegal", currency: "XOF", symbol: "CFA", iso_code: "SN" },
  { countryName: "Somalia", currency: "SOS", symbol: "Ssh", iso_code: "SO" },
  { countryName: "Suriname", currency: "SRD", symbol: "SRD", iso_code: "SR" },
  {
    countryName: "South Sudan",
    currency: "SSP",
    symbol: "SSP",
    iso_code: "SS",
  },
  {
    countryName: "Sao Tome and Principe",
    currency: "STD",
    symbol: "STD",
    iso_code: "ST",
  },
  {
    countryName: "El Salvador",
    currency: "USD",
    symbol: "$",
    dateFormat: "MM-dd-yyyy",
    iso_code: "SV",
  },
  {
    countryName: "Sint Maarten",
    currency: "ANG",
    symbol: "ANG",
    iso_code: "SX",
  },
  {
    countryName: "Syria",
    currency: "SYP",
    symbol: "SY£",
    dateFormat: "dd/MM/yyyy",
    iso_code: "SY",
  },
  { countryName: "Swaziland", currency: "SZL", symbol: "SZL", iso_code: "SZ" },
  {
    countryName: "Turks and Caicos Islands",
    currency: "USD",
    symbol: "$",
    iso_code: "TC",
  },
  { countryName: "Chad", currency: "XAF", symbol: "FCFA", iso_code: "TD" },
  {
    countryName: "French Southern Territories",
    currency: "EUR",
    symbol: "€",
    iso_code: "TF",
  },
  { countryName: "Togo", currency: "XOF", symbol: "CFA", iso_code: "TG" },
  {
    countryName: "Thailand",
    currency: "THB",
    symbol: "฿",
    dateFormat: "๓/๖/๒๕๕๕",
    iso_code: "TH",
  },
  { countryName: "Tajikistan", currency: "TJS", symbol: "TJS", iso_code: "TJ" },
  { countryName: "Tokelau", currency: "NZD", symbol: "NZ$", iso_code: "TK" },
  { countryName: "East Timor", currency: "USD", symbol: "$", iso_code: "TL" },
  {
    countryName: "Turkmenistan",
    currency: "TMT",
    symbol: "TMT",
    iso_code: "TM",
  },
  {
    countryName: "Tunisia",
    currency: "TND",
    symbol: "DT",
    dateFormat: "dd/MM/yyyy",
    iso_code: "TN",
  },
  { countryName: "Tonga", currency: "TOP", symbol: "T$", iso_code: "TO" },
  {
    countryName: "Turkey",
    currency: "TRY",
    symbol: "TL",
    dateFormat: "dd.MM.yyyy",
    iso_code: "TR",
  },
  {
    countryName: "Trinidad and Tobago",
    currency: "TTD",
    symbol: "TT$",
    iso_code: "TT",
  },
  { countryName: "Tuvalu", currency: "AUD", symbol: "AU$", iso_code: "TV" },
  {
    countryName: "Taiwan",
    currency: "TWD",
    symbol: "NT$",
    dateFormat: "yyyy/M/d",
    iso_code: "TW",
  },
  { countryName: "Tanzania", currency: "TZS", symbol: "TSh", iso_code: "TZ" },
  {
    countryName: "Ukraine",
    currency: "UAH",
    symbol: "₴",
    dateFormat: "dd.MM.yyyy",
    iso_code: "UA",
  },
  { countryName: "Uganda", currency: "UGX", symbol: "USh", iso_code: "UG" },
  {
    countryName: "United States Minor Outlying Islands",
    currency: "USD",
    symbol: "$",
    iso_code: "UM",
  },
  {
    countryName: "United States",
    currency: "USD",
    symbol: "$",
    dateFormat: "M/d/yyyy",
    iso_code: "US",
  },
  {
    countryName: "Uruguay",
    currency: "UYU",
    symbol: "$U",
    dateFormat: "dd/MM/yyyy",
    iso_code: "UY",
  },
  { countryName: "Uzbekistan", currency: "UZS", symbol: "UZS", iso_code: "UZ" },
  { countryName: "Vatican", currency: "EUR", symbol: "€", iso_code: "VA" },
  {
    countryName: "Saint Vincent and the Grenadines",
    currency: "XCD",
    symbol: "XCD",
    iso_code: "VC",
  },
  {
    countryName: "Venezuela",
    currency: "VEF",
    symbol: "Bs.F.",
    dateFormat: "dd/MM/yyyy",
    iso_code: "VE",
  },
  {
    countryName: "British Virgin Islands",
    currency: "USD",
    symbol: "$",
    iso_code: "VG",
  },
  {
    countryName: "U.S. Virgin Islands",
    currency: "USD",
    symbol: "$",
    iso_code: "VI",
  },
  {
    countryName: "Vietnam",
    currency: "VND",
    symbol: "₫",
    dateFormat: "dd/MM/yyyy",
    iso_code: "VN",
  },
  { countryName: "Vanuatu", currency: "VUV", symbol: "VUV", iso_code: "VU" },
  {
    countryName: "Wallis and Futuna",
    currency: "XPF",
    symbol: "XPF",
    iso_code: "WF",
  },
  { countryName: "Samoa", currency: "WST", symbol: "WST", iso_code: "WS" },
  { countryName: "Kosovo", currency: "EUR", symbol: "€", iso_code: "XK" },
  {
    countryName: "Yemen",
    currency: "YER",
    symbol: "YR",
    dateFormat: "dd/MM/yyyy",
    iso_code: "YE",
  },
  { countryName: "Mayotte", currency: "EUR", symbol: "€", iso_code: "YT" },
  {
    countryName: "South Africa",
    currency: "ZAR",
    symbol: "R",
    dateFormat: "yyyy/MM/dd",
    iso_code: "ZA",
  },
  { countryName: "Zambia", currency: "ZMW", symbol: "ZK", iso_code: "ZM" },
  { countryName: "Zimbabwe", currency: "ZWL", symbol: "ZWL", iso_code: "ZW" },
];
export default countries;
