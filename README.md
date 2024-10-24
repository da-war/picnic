# React Native Project

## Overview

This project is built using **React Native CLI**, aiming to align with Picnic's tech stack as per the job description. The chosen libraries and architecture provide a robust, scalable, and testable environment for developing modern mobile applications.

## Dependencies

- **@react-navigation/native & @react-navigation/native-stack**: I used these for smooth navigations between the Home and Detail Screen
- **@reduxjs/toolkit & react-redux**: For the best way to manage state of the app (single source of truth)
- **redux-observable & rxjs**: These libs are more scalable handling of async operations and side effects using reactive programming with observables.
- **redux-thunk**: Enables simpler, straightforward async actions in Redux without introducing too much complexity.
- **axios & axios-mock-adapter**: For making HTTP requests to external APIs with ease, and mocking those requests for testing purposes.
- **react-native-fast-image**: For the best performance used this as well as on Picnic Github it's forked which means it's used by Picnic so that is also a reason.
- **react-native-gesture-handler & react-native-screens**: Improves touch gestures and enhances performance in navigation transitions and interactions.
- **react-native-safe-area-context**: Ensures that the app correctly handles safe area boundaries on all devices.
- **react-native-vector-icons**: For Icons used in the HomeScreen.

## Testing

- **Jest**: A robust JavaScript testing framework, perfect for unit and integration tests.
- **@testing-library/react-native**: Focuses on testing the behavior of the app's components from a user's perspective, making sure they work as expected.

## Project Architecture

The architecture follows a modular and scalable approach, with clear separation of concerns:

- **Components**: Reusable UI elements across different screens.
- **Screens**: Handles the logic and layout for each view or page in the app.
- **Services**: Contains API calls and business logic.
- **Redux**: Manages the app's global state, organized into slices for modularity.
- **Constants**: Stores reusable constants like colors, fonts, and API endpoints.
- **Utils**: For utility functions for reusability and clean code

## Folder Structure

```
src/
    components/
    screens/
    services/
    redux/
    constants/
    navigation/
    utils/
__tests__

App.tsx
index.js
```

This structure ensures easy maintenance and scalability as the app grows.

We can further use it as **Domain Base**, **Event-Driven** and can use with **monorepo** if more apps are being developed.

For the easy conversions of this architecture I used proper **PATH ALIAS** configured in tsconfig.json and babel.config.js.












# Picnic Recruitment Task

Please read the following instructions carefully and make sure that you fulfil
all requirements listed.

## Overview

This is a React Native programming assignment we've created specifically for our
recruitment process.
You were given a link to GitHub, which when you visited that link,
created a private fork of this repository. Only you and developers at Picnic
can see the code you push to this repository.

High-level instructions:

1. Read and follow the task specified below.
2. Make a local clone of this repository on your machine, and do your work on a
   branch other than `master`. Do not make any changes to the `master` branch.
3. Push your changes as frequently as you like to `origin/your-branch-name`,
   and create a pull request to merge your changes back into the `master`
   branch. Don't merge your pull request. Once you're finished with the
   assignment, we will do a code review of your pull request.
4. When you're finished, [create and add][github-labels] the label `done` to
   your pull request. This will notify us that your code is ready to be
   reviewed. Please do **NOT** publish your solution on a publicly available
   location (such as a public GitHub repository, your personal website, _et
   cetera_).

This process closely mimics our actual development and review cycle. We hope
you enjoy it!

## Task

We would like you to write code that will cover the functionality listed below and provide us with the source as well as the output of a React Native app that consists of two screens:

![Wireframe][wireframe-image]

### Screen 1:

Screen 1 has the following two functionalities:

1. Displaying a random GIF:
   - Upon opening the app, it should connect to the Giphy random API and display a random GIF as displayed in **Fig 1**.
   - The random GIF displayed on this screen should be animated.
   - Every 10 seconds a new random GIF should replace the previous loaded one. This should continue as long as the user has no search results displayed.
   - **Screen 1** should also display the GIF title, link and an age restriction badge.
2. Search Bar:
   - Upon clicking the search bar, we start a live search after characters have been entered. This means that once the user has typed two characters, the search API should be called and not wait until the user pressed search.
   - The returning results should be displayed as shown in **Fig 2**. The GIFs’ in the search results do not have to be animated and the list doesn’t have to include infinite scrolling.
   - Tapping one of the list items should navigate the user to **Screen 2**.
   - This screen should be able to retain its state, in case the user navigates back to it from **Screen 2**.
   - On canceling the search, the screen should go back to displaying the random GIF.

### Screen 2:

Screen 2 only has the following functionality:

1. Displaying the GIF that was tapped:
   - On **Screen 2** the tapped GIF should be displayed animated along with the title, link and age restriction badge as displayed in **Fig 3**.
   - Upon tapping the back button, the user should be taken back to **Screen 1**.

### Useful information:

- API Documentation: https://developers.giphy.com/docs/
- Use the following API Key: `BluxFAOfAHEf9xg0PdiHD1fqlEAEdlSu`

### Extras:

- It is **not** allowed to use the GIPHY SDK.
- It is allowed to use any other third party libraries you seem fit, but please attach a brief description of why you’ve selected it.
- The app should be written in either Javascript or Typescript.
- Please also provide a brief description of the overall app architecture and the reasoning behind picking it over any other possible alternative.

### Grading Criteria:

You will be assessed on the following criteria:

- Architecture and approach
- Execution
- Testability
- Code readability and style
- Usage of git

_Thanks in advance for your time and interest in Picnic!_

[wireframe-image]: https://imgur.com/Kja1rsy.png
[github-labels]: https://help.github.com/articles/about-labels
