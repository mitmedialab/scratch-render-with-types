export = Silhouette;
declare class Silhouette {
    /**
     * Get the canvas element reused by Silhouettes to update their data with.
     * @private
     * @return {CanvasElement} A canvas to draw bitmap data to.
     */
    private static _updateCanvas;
    /**
     * The width of the data representing the current skin data.
     * @type {number}
     */
    _width: number;
    /**
     * The height of the data representing the current skin date.
     * @type {number}
     */
    _height: number;
    /**
     * The data representing a skin's silhouette shape.
     * @type {Uint8ClampedArray}
     */
    _colorData: Uint8ClampedArray;
    _getColor: ({ _width: width, _height: height, _colorData: data }: Silhouette, x: number, y: number, dst: Uint8ClampedArray) => Uint8ClampedArray;
    /**
     * Sample a color from the silhouette at a given local position using
     * "nearest neighbor"
     * @param {twgl.v3} vec [x,y] texture space (0-1)
     * @param {Uint8ClampedArray} dst The memory buffer to store the value in. (4 bytes)
     * @returns {Uint8ClampedArray} dst
     */
    colorAtNearest(vec: twgl.v3, dst: Uint8ClampedArray): Uint8ClampedArray;
    /**
     * Sample a color from the silhouette at a given local position using
     * "linear interpolation"
     * @param {twgl.v3} vec [x,y] texture space (0-1)
     * @param {Uint8ClampedArray} dst The memory buffer to store the value in. (4 bytes)
     * @returns {Uint8ClampedArray} dst
     */
    colorAtLinear(vec: twgl.v3, dst: Uint8ClampedArray): Uint8ClampedArray;
    /**
     * Update this silhouette with the bitmapData for a skin.
     * @param {ImageData|HTMLCanvasElement|HTMLImageElement} bitmapData An image, canvas or other element that the skin
     * @param {boolean} isPremultiplied True if the source bitmap data comes premultiplied (e.g. from readPixels).
     * rendering can be queried from.
     */
    update(bitmapData: ImageData | HTMLCanvasElement | HTMLImageElement, isPremultiplied?: boolean): void;
    /**
     * Test if texture coordinate touches the silhouette using nearest neighbor.
     * @param {twgl.v3} vec A texture coordinate.
     * @return {boolean} If the nearest pixel has an alpha value.
     */
    isTouchingNearest(vec: twgl.v3): boolean;
    /**
     * Test to see if any of the 4 pixels used in the linear interpolate touch
     * the silhouette.
     * @param {twgl.v3} vec A texture coordinate.
     * @return {boolean} Any of the pixels have some alpha.
     */
    isTouchingLinear(vec: twgl.v3): boolean;
}
