
const FormatCurrency = (number) => {
  // console.log(number)
  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);

  return currency;
};

export default ({ app }, inject) => {
  inject("format", FormatCurrency);
};