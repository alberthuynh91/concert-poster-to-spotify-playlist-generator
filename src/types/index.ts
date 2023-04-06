export type Image = {
  height: number;
  url: string;
  width: number;
};

export type ArtistType = {
  external_urls: {
    spotify: 'string';
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string; // artist
  uri: string; // spotify:artist:${id}
};