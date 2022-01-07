export const displayDateFormatID = (dateTimeString: string) => {
  const dateObj = new Date(dateTimeString);
  const dateLocaleString = dateObj
    .toLocaleString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });

  return dateLocaleString;
};

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