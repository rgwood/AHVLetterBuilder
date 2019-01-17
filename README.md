# Abundant Housing Vancouver Letter Builder

This is a fancy letter generator that we use at [Abundant Housing Vancouver](http://www.abundanthousingvancouver.com) to mobilize support for worthwhile housing projects. It's designed to 1) be very quick to use, 2) generate semi-randomized text that reads much better than a form letter. After a letter is generated and reviewed+edited by the user, it's passed [another system](https://github.com/rlisagor/ahv-council-thing) to be reviewed in Slack and then emailed.

You can [try it out in demo mode](http://www.abundanthousingvancouver.com/letter_generator?p=example1&testenv=true) (don't worry, it won't send an email).

## Technical Details

It's an Angular client-side web app and most of the configuration lives in a Google spreadsheet that is read using [tabletop.js](https://github.com/jsoma/tabletop). The UI is built using [Tailwind CSS](http://tailwindcss.com).

## Acknowledgements

Inspired by Melody Ma's [105 Keefer letter generator](https://github.com/savechinatownheritage/105keefer).

## How to run a test version

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build-prod` to build the project for production. The build artifacts will be stored in the `dist/` directory.