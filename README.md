# newPlaylist

This project is intended to allow for easy categorization of songs and provide 
tools to generate playlists based on those songs. Below is a list of intended
and completed features.

## Features

1. Recently played music history -- partially completed
    - Due to limitations of Spotify's api can only fetch last 50 songs
    - Song history will be maintained
    - TODO: 
        * Create hourly call that will fetch recently played history for all
        active users, practically ensuring that no songs are skipped in history

2. View Playlists -- Complete

3. Create/Edit Playlists -- partially complete
    - Can create and edit a playlist
    - Data planned to be editable:
        - Playlist Name -- Complete
        - Public Status -- Complete
        - Playlist Cover Image -- partially complete: having trouble posting to api
        - Add/Remove Playlist tracks -- TODO


4. Add/Remove Song Tags -- TODO

5. Add Song Ratings -- TODO
    - At least have dislike(exclude)

6. Playlist Generator -- TODO
    - Select Tags to include
        - Must build UI that should at least show the amount of songs you've tagged with 
        given tag
    - Select Tags to exclude

7. Implement Playback Web API -- TODO


## TODOs

1. Create hourly call
    - May want to set up seperate server / look into gulp for multi-threading

2. Add Playlist Tracks
    - Should use menu on Song Items
        - Popup on click of icon -- on
        - Should have ability to add to current playlist if there is one
        - Should be able to add to any other playlist as well
            - Should be able to use PlaylistList component for playlist selection,
            will require refactoring to allow the unclick function to be over-written
        - Should be able to see playlists song is in, and remove song from any playlist

3. Add Song Tags
    - Add as control not on changeable control panel but song display itself
        * use popup here
    - Should also be able to be done through SongItem menu
        * use same popup


4. Playlist Generator
            
5. CSS changes for larger screens - currently only really built for phones
    - Song Items:
        * should expand song item menue to be different buttons on the row

6. Update playlist to Spotify's, update spotify to playlist


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
