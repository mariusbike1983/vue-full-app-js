function getImageUrl(path) {
    return new URL(`../assets/${path}`, import.meta.url).href;
};

export { getImageUrl }