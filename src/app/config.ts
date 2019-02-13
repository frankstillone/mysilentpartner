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
    adminRoleId: '57e0b699ac09f57b00dc24cd',
    customerRoleId: '5c1a20915be2dc43dd2c310e',
    operatorRoleId: '5c1a1e9fa67271cd4efac874',
    employeeRoleId: '5c1a1ff0a672718497fac88d'
};
