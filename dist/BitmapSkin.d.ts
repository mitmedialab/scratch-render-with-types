export = BitmapSkin;
declare class BitmapSkin extends Skin {
    /**
     * @param {ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} bitmapData - bitmap data to inspect.
     * @returns {Array<int>} the width and height of the bitmap data, in pixels.
     * @private
     */
    private static _getBitmapSize;
    /**
     * Create a new Bitmap Skin.
     * @extends Skin
     * @param {!int} id - The ID for this Skin.
     * @param {!RenderWebGL} renderer - The renderer which will use this skin.
     */
    constructor(id: int, renderer: RenderWebGL);
    /** @type {!int} */
    _costumeResolution: int;
    /** @type {!RenderWebGL} */
    _renderer: RenderWebGL;
    /** @type {Array<int>} */
    _textureSize: Array<int>;
    /**
     * Set the contents of this skin to a snapshot of the provided bitmap data.
     * @param {ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} bitmapData - new contents for this skin.
     * @param {int} [costumeResolution=1] - The resolution to use for this bitmap.
     * @param {Array<number>} [rotationCenter] - Optional rotation center for the bitmap. If not supplied, it will be
     * calculated from the bounding box
     * @fires Skin.event:WasAltered
     */
    setBitmap(bitmapData: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, costumeResolution?: int, rotationCenter?: Array<number>): void;
}
import Skin = require("./Skin");
