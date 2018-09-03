/*
 * In the end, we would like to import this entire /controllers module with a single import statement. To enable that,
 * we define this index.ts file, where we collectively expose all these modules. So, if you add a new controller, make
 * sure to add an analogous export statement for it below.
 */
export * from './welcome.controller'; // export the WelcomeController
export * from './weather.controller'; // export the WeatherController