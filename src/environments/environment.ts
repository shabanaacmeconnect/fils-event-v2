// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseurl:"https://devlabapi.filscare.com/admin/",
  // SOCKET_ENDPOINT: 'https://devlabapi.filscare.com',
  // vendorurl:'http://localhost:4202',
  baseurl: "https://dev.filsconnect.com/eventManager/",
  SOCKET_ENDPOINT: "https://dev.filsconnect.com",
  vendorurl: "http://localhost:4202",
  // baseurl:"https://filstest.stridewebstudio.com/api/",
  // SOCKET_ENDPOINT: 'https://filstest.stridewebstudio.com',
  // vendorurl:'https://filstest.stridewebstudio.com/merchant/',

  // baseurl:"https://filstest.stridewebstudio.com/api/",
  // SOCKET_ENDPOINT: 'https://filstest.stridewebstudio.com/api/',
  // baseurl:"https://bankfab.marshal-me.com/pbl/",
  defaultauth: "fackbackend",
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
