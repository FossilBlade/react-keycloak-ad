import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import Keycloak from 'keycloak-js'
import reportWebVitals from './reportWebVitals';

//keycloak init options
let initOptions = {
  url: 'https://lemur-0.cloud-iam.com/auth/', realm: 'react-ad', clientId: 'react-app', onLoad: 'login-required'
}


let keycloak = new Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {

  if (!auth) {
      window.location.reload();
  } else {
      console.info("Authenticated");
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  //React Render
  root.render(
    <React.StrictMode>
      <App first={keycloak.idTokenParsed.given_name} last={keycloak.idTokenParsed.family_name}/>
    </React.StrictMode>
  );
  console.log(keycloak)
  localStorage.setItem("react-token", keycloak.token);
  localStorage.setItem("react-refresh-token", keycloak.refreshToken);

  setTimeout(() => {
      keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
              console.debug('Token refreshed' + refreshed);
          } else {
              console.warn('Token not refreshed, valid for '
                  + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
          }
      }).catch((e) => {
          console.error('Failed to refresh token',e);
      });


  }, 60000)

}).catch((e) => {
  console.error("Authenticated Failed",e);
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
