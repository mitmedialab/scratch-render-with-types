export = SVGSkin;
declare class SVGSkin extends Skin {
    /**
     * Create a new SVG skin.
     * @param {!int} id - The ID for this Skin.
     * @param {!RenderWebGL} renderer - The renderer which will use this skin.
     * @constructor
     * @extends Skin
     */
    constructor(id: int, renderer: RenderWebGL);
    /** @type {RenderWebGL} */
    _renderer: RenderWebGL;
    /** @type {HTMLImageElement} */
    _svgImage: HTMLImageElement;
    /** @type {boolean} */
    _svgImageLoaded: boolean;
    /** @type {Array<number>} */
    _size: Array<number>;
    /** @type {HTMLCanvasElement} */
    _canvas: HTMLCanvasElement;
    /** @type {CanvasRenderingContext2D} */
    _context: CanvasRenderingContext2D;
    /** @type {Array<WebGLTexture>} */
    _scaledMIPs: Array<WebGLTexture>;
    /** @type {number} */
    _largestMIPScale: number;
    /**
    * Ratio of the size of the SVG and the max size of the WebGL texture
    * @type {Number}
    */
    _maxTextureScale: number;
    useNearest(scale: any, drawable: any): boolean;
    /**
     * Create a MIP for a given scale.
     * @param {number} scale - The relative size of the MIP
     * @return {SVGMIP} An object that handles creating and updating SVG textures.
     */
    createMIP(scale: number): SVGMIP;
    updateSilhouette(scale?: number[]): void;
    /**
     * Do a hard reset of the existing MIPs by deleting them.
     */
    resetMIPs(): void;
    /**
     * Set the contents of this skin to a snapshot of the provided SVG data.
     * @param {string} svgData - new SVG to use.
     * @param {Array<number>} [rotationCenter] - Optional rotation center for the SVG. If not supplied, it will be
     * calculated from the bounding box
     * @fires Skin.event:WasAltered
     */
    setSVG(svgData: string, rotationCenter?: Array<number>): void;
}
import Skin = require("./Skin");
