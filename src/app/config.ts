const query: any = {};
location.search.substr(1).split("&").forEach(function(item) {
  query[item.split("=")[0]] = item.split("=")[1] && decodeURIComponent(item.split("=")[1]);
});

if (query.token) {
  localStorage.setItem('formioToken', query.token);
  localStorage.removeItem('formioAppUser');
  localStorage.removeItem('formioUser');
  window.history.pushState("", "", location.pathname + location.hash);
}

export const AppConfig = {
    apiUrl: "https://api.form.io",
    appUrl: "https://bkvvieybeanbxoh.form.io",
    simpleBillingXAuthToken: "9ea0e6da-ae2f-42b7-8564-402cf910cd30",
    tspBilling: "https://simplebilling.in:8444/tspbilling",
    customerEmailId: "metaField_720.value",
    creditCardHolderName: "0_metaField_165.value",
    creditCardNumber: "0_metaField_164.value",
    creditCardExpiry: "0_metaField_163.value",
    directDebitBankName: "0_metaField_177.value",
    directDebitAccountName: "0_metaField_175.value",
    directDebitAccountNumber: "0_metaField_179.value",
    directDebitBsb: "0_metaField_178.value",
    directDebitAccountType: "0_metaField_176.value"
};