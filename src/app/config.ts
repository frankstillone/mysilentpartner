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
    creditCardHolderName: "0_metaField_95.value",
    creditCardNumber: "0_metaField_96.value",
    creditCardExpiry: "0_metaField_97.value",
    directDebitBankName: "0_metaField_103.value",
    directDebitAccountName: "0_metaField_101.value",
    directDebitAccountNumber: "0_metaField_102.value",
    directDebitBsb: "0_metaField_100.value",
    directDebitAccountType: "0_metaField_104.value"
};