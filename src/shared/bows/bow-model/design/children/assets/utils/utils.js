export const checkPosition = (el) => el.getBoundingClientRect().top < window.innerHeight + window.innerHeight / 3 ? true : false;
