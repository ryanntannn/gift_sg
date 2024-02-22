declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface String {
    /**
     * Converts a string to a corresponding HSL color value.
     *
     * @param string - The input string to convert.
     * @param saturation - The saturation value of the HSL color (default: 90).
     * @param lightness - The lightness value of the HSL color (default: 60).
     * @returns The HSL color value generated from the input string.
     */
    toColor(saturation?: number, lightness?: number): string;
  }
}

String.prototype.toColor = function (saturation = 100, lightness = 50) {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    hash = this.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
};

export {};
