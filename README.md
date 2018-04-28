# Abundant Housing Vancouver Letter Builder

Surprise, it's our cool letter builder. It's an Angular 4 client-side web app and most of the configuration lives in a Google spreadsheet that is read using the tabletop.js library. It generates a letter using client input and passes it to the even cooler [AHV Council Thing](https://github.com/rlisagor/ahv-council-thing) system to be reviewed in Slack and then emailed.

You can [try it out in demo mode](http://www.abundanthousingvancouver.com/letter_generator?p=example1&testenv=true) (don't worry, it won't send an email).

Inspired by Melody Ma's [105 Keefer letter generator](https://github.com/savechinatownheritage/105keefer) (but written from scratch). Thanks, Melody!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli). 

## How to run a test version

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build-prod` to build the project for production. The build artifacts will be stored in the `dist/` directory.