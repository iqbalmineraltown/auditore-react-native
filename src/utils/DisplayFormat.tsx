export const displayDateFormatID = (dateTimeString: string) => {
  // assuming datetime data are in UTC
  dateTimeString = dateTimeString.replace(" ", "T");

  const dateLocaleForYear = new Date(dateTimeString).toLocaleString("en-US");
  const dateLocaleSplitted = dateLocaleForYear.split(" ");
  const displayYear = dateLocaleSplitted[dateLocaleSplitted.length - 1];
  const dateLocale = new Date(dateTimeString).toLocaleDateString();
  const dateComponents = dateLocale.split("/").map((c) => parseInt(c));

  const resultDateDisplay = dateComponents[1] + " " + MonthID[dateComponents[0]] + " " + displayYear;
  return resultDateDisplay;
};

enum MonthID {
  Januari = 1, Februari = 2, Maret = 3,
  April = 4, Mei = 5, Juni = 6,
  Juli = 7, Agustus = 8, September = 9,
  Oktober = 10, November = 11, Desember = 12,
}

export const displayCurrencyFormatID = (amount: number) => {
  let amountStr = amount.toString();
  amountStr = amountStr.split(/(?=(?:...)*$)/).join(".");

  return "Rp" + amountStr;
};

export const bankNameCase = (bankName: string) => {
  if (bankName.length <= 4) {
    return bankName.toUpperCase();
  }
  return bankName.substring(0, 1).toUpperCase() + bankName.substring(1);
}