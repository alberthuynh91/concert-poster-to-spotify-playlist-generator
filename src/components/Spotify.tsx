import React, { useState, useEffect } from 'react';
import Artists from './Artists';
import { useSession } from 'next-auth/react';
import { ArtistType } from '../types';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
  createPlaylistForUser,
  addTracksToPlaylist,
  getTopTracksForArtist,
} from '@/utils';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Spotify = (props: any) => {
  const { artistListObject, setArtistListObject, isLoading, setIsLoading } =
    props;
  const { data: session } = useSession();
  const [tracks, setTracks] = useState([]);
  const [trackUris, setTrackUris] = useState([]);
  const [playlistId, setPlaylistId] = useState('');
  const [open, setOpen] = React.useState(false);
  const isCreateDisabled = trackUris.length === 0;

  const handleCreate = async () => {
    // @ts-expect-error
    const userId = session?.token?.sub;
    const playlistId = await createPlaylistForUser(userId);
    // TODO: Find a way to add more than 100 tracks to a playlist
    await addTracksToPlaylist(playlistId, trackUris);
    setOpen(true);
  };

  const handleSelectAll = () => {
    setArtistListObject((prevList: any) => {
      const updated = prevList.slice().map((item: any) => {
        item.selected = true;
        return item;
      });
      return updated;
    });
  };

  const handleUnselectAll = () => {
    setArtistListObject((prevList: any) => {
      const updated = prevList.slice().map((item: any) => {
        item.selected = false;
        return item;
      });
      return updated;
    });
  };

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    async function getTopTracksForSelectedArtists() {
      const filteredList = artistListObject.filter(
        (artist: any) => artist.selected === true
      );
      const promises = filteredList.map((artist: ArtistType) =>
        getTopTracksForArtist(artist.id)
      );
      const topTracks = await Promise.all(promises);
      // TODO: Find work around to allow more than 100 songs to be added to a playlist
      const flattenedList: any = topTracks.flat().splice(0, 100);
      console.log(
        `Got back top tracks for all selected artists: `,
        flattenedList
      );
      setTracks(flattenedList);
      const trackUris = flattenedList.map((track: any) => track.uri);
      setTrackUris(trackUris);
    }
    getTopTracksForSelectedArtists();
  }, [artistListObject]);

  if (artistListObject.length === 0) return null;

  return (
    <>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully create new playlist! Open your Spotify app or view it{' '}
          <a
            target="_blank"
            href="https://open.spotify.com/playlist/1DEpVnMMxPHL60LwxCeaHg"
          >
            here
          </a>
        </Alert>
      </Snackbar>
      {!isLoading && (
        <>
          <Artists
            artists={artistListObject}
            handleSelectAll={handleSelectAll}
            handleUnselectAll={handleUnselectAll}
            setArtistListObject={setArtistListObject}
          />
          <Button
            className="create-btn"
            variant="contained"
            color="success"
            onClick={handleCreate}
            disabled={isCreateDisabled}
          >
            Create new playlist with selected artists
          </Button>
        </>
      )}
    </>
  );
};

export default Spotify;
