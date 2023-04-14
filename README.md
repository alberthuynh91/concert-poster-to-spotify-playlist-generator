# Concert Poster to Spotify Playlist Generator

Creates a spotify playlist using the artists listed on a concert poster

## Backlog

OCR

- Improve image processing to get artist names more accurately
- Improve filtering method to get artist names more accurately from OCR text

Clean up

- Fix all `// @ts-expect-error`
- Add types for places where `any` is used. Do a global find on `: any`
- Audit depenencies / imports

Artists

- On hover of artist card, play music snippet from artist
- Open modal with more info on artist on hover or on click of artist icon/name

Playlist

- Use uploaded image as album cover for created Spotify playlist
- Allow user to customize name / description of playlist
- Allow user to add more than 100 tracks to a playlist at a time
- Add error handling for API calls

Auth

- Test Spotify AUTH with multiple user accounts 

Styling

- Add styling for mobile

## Getting Started

```
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
