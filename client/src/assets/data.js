import writepostimage from "./images/writepostimage.svg";
import writestoryimage from "./images/writestoryimage.svg";

// Route-links for NavBar

export const navLinks = [
  { name: "Blog", link: "/" },
  { name: "Gallerie", link: "/gallery" },
  { name: "Stories", link: "/stories" },
  { name: "Kontakt", link: "/contact" },
  { name: "Impressum", link: "/impressum" },
];

// Social-icon list for NavBar and Impressum

export const socialIconsList = [
  {
    name: "LinkedIn",
    viewBox: "0 0 448 512",
    svg: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
    link: "https://www.linkedin.com/in/david-g-9809a6217/",
    alt: "LinkedIn Profil link",
  },
  {
    name: "Github",
    viewBox: "0 0 496 512",
    svg: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
    link: "https://github.com/DaGo85",
    alt: "Github Profil Link",
  },
  {
    name: "Email",
    viewBox: "0 0 512 512",
    svg: "M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z",
    link: "mailto:davegoergens@gmail.com",
    alt: "Send email button",
  },
  {
    name: "Portfolio",
    viewBox: "0 0 384 512",
    svg: "M336 0h-288c-26.51 0-48 21.49-48 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48v-416C384 21.49 362.5 0 336 0zM192 128c35.35 0 64 28.65 64 64s-28.65 64-64 64S128 227.3 128 192S156.7 128 192 128zM288 384H96c-8.836 0-16-7.164-16-16C80 323.8 115.8 288 160 288h64c44.18 0 80 35.82 80 80C304 376.8 296.8 384 288 384z",
    link: "https://www.davidgo.ch",
    alt: "Portfolio page",
  },
];

// Data for SubTexts

export const subtexts = {
  contact: "Ich helfen dir gerne weiter, schreib mir!",
  impressum: "Rechtliche Informationen und Hinweise",
  gallery:
    '"Mach sichtbar, was vielleicht ohne dich nie wahrgenommen worden wäre." - Robert Bresson',
  home: '"Bilder, welche Du gemacht hast haben Einfluss auf die, welche du machen wirst. So ist das Leben!" – John Sexton',
  stories:
    "“Worte und Bilder kommunizieren gemeinsam viel stärker als alleine.” – William Albert Allard",
  write: "Der richtige Ort um deine Kreativität auszuleben",
  writepost: "Erstell einen neuen Blog-Eintrag",
  writestory: "Erstell eine neue Story",
  login: "Willkommen zurück!",
};

// Data for WriteCards in Write

export const write = [
  {
    id: 1,
    url: "/writepost",
    title: "Blog-Eintrag",
    text: "Füge ein Bild mit Titel und Text zum Blog hinzu.",
    icon: writepostimage,
  },
  {
    id: 2,
    url: "/writestory",
    title: "Story",
    text: "Erstell eine neue Story mit Titelbild und einem Album.",
    icon: writestoryimage,
  },
];

// Firebase base Url for storage

export const firebaseBaseUrl = process.env.REACT_APP_STORAGE_URL;

//export const firebaseBaseUrl =  "https://firebasestorage.googleapis.com/v0/b/ago-photography.appspot.com/o/";

// Backend server address

// const server = "https://ago-photography.herokuapp.com/";
const server = process.env.REACT_APP_BE_URL;

// Server side addresslist for API requests
// [0] = Gallery route (/ = post, /:id = get, delete, /photos = get )
// [1] = Gallery upload photo route (/ = post)
// [2] = Posts route (/ = get, /:id = get,  /:id = delete, /:id = put)
// [3] = Post upload photo route (/ = post)
// [4] = Singlestory photo route (/ = get, post)
// [5] = Singlestory upload photo route (/ = post)
// [6] = Singlestory route (/ = get, /:id = get, delete)

export const apiroutes = [
  {
    id: 0,
    url: `${server}api/gallery/`,
  },
  {
    id: 1,
    url: `${server}api/uploadgallery/`,
  },
  {
    id: 2,
    url: `${server}api/posts/`,
  },
  {
    id: 3,
    url: `${server}api/uploadpost/`,
  },
  {
    id: 4,
    url: `${server}api/stories/photos/`,
  },
  {
    id: 5,
    url: `${server}api/uploadstory/`,
  },
  {
    id: 6,
    url: `${server}api/stories/story/`,
  },
  {
    id: 7,
    url: `${server}api/contact/`,
  },
  {
    id: 8,
    url: `${server}api/gallery/photos/`,
  },
];
