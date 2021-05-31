## FreshSurvey

A simple survey app that records users answers and ratings

You can find the working demo at [https://marigameo.github.io/FreshSurvey/](https://marigameo.github.io/FreshSurvey/)
## Features implemented

1.  On opening the site, the use can answer questions one by one. 
2.  The user should be able to move from one screen to the other and back. 
3.  On the final question, if the user clicks on submit, they are shown a confirmation screen. 
4.  The response is sent to an API via POST call. Mocked to this service [https://mockapi.io/](https://mockapi.io/)
5.  On refreshes during a form fillup, user will be redirected to the last question he has seen with all previous answers persisted. 
6.  Once a form is submitted successfully, the state is reset and if the page is refreshed, it goes back to the home page.

## Extra addon feature:

* A small analytics dashboards to display the stats of survey in charts 
* Used chart JS 
* Error handling - implemented custom disappearing snackbar component for both success & error scenarios for better UX
## Steps to clone and run the application

* git clone https://github.com/Marigameo/FreshSurvey.git

* Open index.html in local server (if installed in vscode) / directly in your browser
## Tech & API's

* Vanilla JS, HTML5, CSS3
* Questions are loaded from a self hosted JSON payload at github pages
* Local storage to preserve user survey inputs while form manipulation
* Session cookie to keep track of active session & route to tabs on refresh
* Mock api to post survey form payload - [Mockapi.io](https://mockapi.io/)
* Hosted on github pages
## Unit tests

* No testing frameworks like jest /mocha is being used
* Simple vanilla JS utility/framework to unit test common util methods & component creation utils 
* Not much validations are involved here - as the survey app we're not restricting users to mandatory fill all the fields & most fields would be pre-filled (with some default active options)
## How to run the tests?

* Just open the test.html file in chrome browser (preferrably)/local live server (if installed)
* And, you can see the test running & results in browser console

_Note: Few negative test case validations are commented. Feel free to uncomment & test for wrong inputs_
## App Screenshosts
![screen1](https://marigameo.github.io/FreshSurvey//app-screenshots/1.png)

![screen2](https://marigameo.github.io/FreshSurvey//app-screenshots/2.png)

![screen3](https://marigameo.github.io/FreshSurvey//app-screenshots/3.png)

![screen4](https://marigameo.github.io/FreshSurvey//app-screenshots/4.png)

![screen5](https://marigameo.github.io/FreshSurvey//app-screenshots/5.png)

![screen6](https://marigameo.github.io/FreshSurvey//app-screenshots/6.png)

![backend mock api data](https://marigameo.github.io/FreshSurvey/app-screenshots/backend.png)

## Addon - Dashboard UI
![backend mock api data](https://marigameo.github.io/FreshSurvey/app-screenshots/dashboard.png)
## Contact 
### Email - mariappangameo@gmail.com

Find more projects at my [Portfolio](http://mariappan.netlify.com/)