// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  liveTrackingUrl: "https://employee-tracking.petalpurple.in/livetracking/",
  locationTrackingUrl: "https://employee-tracking.petalpurple.in/locationtracking/",
  infrastructureUrl: "https://employee-tracking.petalpurple.in/infrastructure/",
  //  apiUrl:"http://192.168.1.17:8080/employee/",
  apiUrl: "http://192.168.1.6:8016/paramount/",
  // apiUrl: "https://phs.petalyellow.com:8016/paramount/",
  mqttConfig: {
    hostname: "device.petalpurple.com",
    port: 8083,
    path: "/mqtt",
    protocol: "ws",
    username: "PetalSchWssUser",
    password: "PetalSchwSS@20#19!"
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
