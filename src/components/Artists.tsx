import { ArtistType } from '../types';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Artist = (props: ArtistType) => {
  const {
    images,
    id,
    // href,
    name,
    selected,
    // @ts-expect-error
    setArtists,
  } = props;

  if (!props.images) return null;

  const src = images[2]?.url || '';

  const handleCardClick = (selected: boolean) => {
    setArtists((prevList: any) => {
      const newList = prevList.slice();
      const index = newList.findIndex((item: any) => item.id === id);
      newList[index].selected = !selected;
      return newList;
    });
  };

  return (
    <Button
      sx={{ color: 'text.primary', width: '100%' }}
      onClick={() => handleCardClick(selected)}
    >
      <Box p={1}>
        <Avatar alt={name} src={src} />
      </Box>
      <Box
        p={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <span>{name}</span>
        <span>
          <Checkbox
            {...label}
            name={id}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={selected}
            color="success"
          />
        </span>
      </Box>
    </Button>
  );
};

const Artists = (props: any) => {
  const { artists, handleSelectAll, handleUnselectAll, setArtists } = props;
  if (artists === null) return null;
  return (
    <>
      <Box>
        <h1>Artists</h1>
        <Box sx={{ textAlign: 'right' }}>
          <Button variant="text" onClick={handleSelectAll} color="success">
            Select All
          </Button>
          <Button variant="text" onClick={handleUnselectAll} color="success">
            Unselect All
          </Button>
        </Box>
      </Box>
      <Box mb={4} sx={{ flexGrow: 1 }}>
        <Grid container columns={{ xs: 1, sm: 12, md: 12 }}>
          {artists.map((artist: ArtistType, index: number) => {
            return (
              <Grid item xs={1} sm={6} md={6} key={index}>
                <Artist
                  key={artist.id}
                  {...artist}
                  // @ts-expect-error
                  setArtists={setArtists}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Artists;
