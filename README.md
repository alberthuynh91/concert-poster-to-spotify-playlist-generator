# Concert Poster to Spotify Playlist Generator

![Apr-21-2023 12-18-40](https://user-images.githubusercontent.com/5342581/233717484-0daaaca6-374b-4115-9266-85af85d81b78.gif)

Create a spotify playlist from a concert poster 

## Backlog

OCR

- Improve image processing to get artist names more accurately
- Improve filtering method to get artist names more accurately from OCR text

Clean up

- Fix all `// @ts-expect-error`
- Add types for places where `any` is used. Do a global find on `: any`
- Audit depenencies / imports

Artists

- Open modal with more info on artist on hover or on click of artist icon/name

Playlist

- Use uploaded image as album cover for created Spotify playlist
- Allow user to customize name / description of playlist
- Allow user to add more than 100 tracks to a playlist at a time (currently we only select 3 songs per artist)
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
