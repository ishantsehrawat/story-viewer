export interface IUserStory {
  username: string;
  isClose?: boolean;
  hasWatched?: boolean;
  profilePic: string;
  stories?: Array<{
    src: string;
    time: string;
  }>;
}
