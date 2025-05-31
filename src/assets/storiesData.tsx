import * as images from "../assets";

const storiesData = [
  {
    username: "Your story",
    profilePic: images.profilePic,
    stories: [],
  },
  {
    username: "ananya.sharma",
    isClose: false,
    hasWatched: false,
    profilePic: images.profilePic1,
    stories: [
      { src: images.story11, time: "20s" },
      { src: images.story12, time: "55s" },
      { src: images.story13, time: "2min" },
    ],
  },
  {
    username: "rajkumar",
    isClose: false,
    hasWatched: false,
    profilePic: images.profilePic2,
    stories: [
      { src: images.story21, time: "15s" },
      { src: images.story22, time: "35s" },
      { src: images.story23, time: "1min" },
      { src: images.story24, time: "2min" },
      { src: images.story25, time: "3min" },
      { src: images.story26, time: "5min" },
    ],
  },
  {
    username: "vivek123",
    isClose: true,
    hasWatched: false,
    profilePic: images.profilePic5,
    stories: [
      { src: images.story31, time: "30s" },
      { src: images.story32, time: "2hr" },
    ],
  },
  {
    username: "isha-dwivedi",
    isClose: false,
    hasWatched: false,
    profilePic: images.profilePic3,
    stories: [
      { src: images.story41, time: "45s" },
      { src: images.story42, time: "2min" },
      { src: images.story43, time: "4min" },
      { src: images.story44, time: "6min" },
      { src: images.story45, time: "9min" },
      { src: images.story46, time: "13min" },
    ],
  },
  {
    username: "priya_gupta",
    isClose: false,
    hasWatched: false,
    profilePic: images.profilePic4,
    stories: [
      { src: images.story51, time: "10s" },
      { src: images.story52, time: "40s" },
      { src: images.story53, time: "1min" },
    ],
  },
  {
    username: "arjun.verma",
    isClose: false,
    hasWatched: false,
    profilePic: images.profilePic9,
    stories: [
      { src: images.story61, time: "25s" },
      { src: images.story62, time: "1min" },
    ],
  },
  {
    username: "meera_singh",
    isClose: false,
    hasWatched: false,
    profilePic: images.profilePic6,
    stories: [
      { src: images.story71, time: "2min" },
      { src: images.story72, time: "5min" },
      { src: images.story73, time: "10min" },
      { src: images.story74, time: "15min" },
    ],
  },
  {
    username: "rohit.chauhan",
    isClose: false,
    hasWatched: false,
    profilePic: images.profilePic8,
    stories: [{ src: images.story81, time: "30s" }],
  },
  {
    username: "aisha_khan",
    isClose: false,
    hasWatched: false,
    profilePic: images.profilePic10,
    stories: [
      { src: images.story91, time: "1hr" },
      { src: images.story92, time: "1hr" },
    ],
  },
];

export default storiesData;
