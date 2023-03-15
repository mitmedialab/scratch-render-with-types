/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://lolengine.net/blog/2013/01/13/fast-rgb-to-hsv.
 * Assumes r, g, and b are in the range [0, 255] and
 * returns h, s, and v in the range [0, 1].
 *
 * @param   {Array<number>} rgb   The RGB color value
 * @param   {number}        rgb.r The red color value
 * @param   {number}        rgb.g The green color value
 * @param   {number}        rgb.b The blue color value
 * @param   {Array<number>} dst   The array to store the HSV values in
 * @return  {Array<number>}       The `dst` array passed in
 */
export function rgbToHsv([r, g, b]: Array<number>, dst: Array<number>): Array<number>;
/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from https://gist.github.com/mjackson/5311256.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {Array<number>}                hsv The HSV color value
 * @param   {number}                       hsv.h     The hue
 * @param   {number}                       hsv.s     The saturation
 * @param   {number}                       hsv.v     The value
 * @param   {Uint8Array|Uint8ClampedArray} dst The array to store the RGB values in
 * @return  {Uint8Array|Uint8ClampedArray}     The `dst` array passed in
 */
export function hsvToRgb([h, s, v]: Array<number>, dst: Uint8Array | Uint8ClampedArray): Uint8Array | Uint8ClampedArray;
