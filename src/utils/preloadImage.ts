export function preloadImages(srcs: string[]) {
  srcs.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
