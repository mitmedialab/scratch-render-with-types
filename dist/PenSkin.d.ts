export = PenSkin;
declare class PenSkin extends Skin {
    /**
     * Create a Skin which implements a Scratch pen layer.
     * @param {int} id - The unique ID for this Skin.
     * @param {RenderWebGL} renderer - The renderer which will use this Skin.
     * @extends Skin
     * @listens RenderWebGL#event:NativeSizeChanged
     */
    constructor(id: int, renderer: RenderWebGL);
    /**
     * @private
     * @type {RenderWebGL}
     */
    private _renderer;
    /** @type {Array<number>} */
    _size: Array<number>;
    /** @type {WebGLFramebuffer} */
    _framebuffer: WebGLFramebuffer;
    /** @type {boolean} */
    _silhouetteDirty: boolean;
    /** @type {Uint8Array} */
    _silhouettePixels: Uint8Array;
    /** @type {ImageData} */
    _silhouetteImageData: ImageData;
    /** @type {object} */
    _lineOnBufferDrawRegionId: object;
    /** @type {object} */
    _usePenBufferDrawRegionId: object;
    /** @type {twgl.BufferInfo} */
    _lineBufferInfo: twgl.BufferInfo;
    /** @type {twgl.ProgramInfo} */
    _lineShader: twgl.ProgramInfo;
    /**
     * React to a change in the renderer's native size.
     * @param {object} event - The change event.
     */
    onNativeSizeChanged(event: object): void;
    useNearest(scale: any): boolean;
    /**
     * Clear the pen layer.
     */
    clear(): void;
    /**
     * Draw a point on the pen layer.
     * @param {PenAttributes} penAttributes - how the point should be drawn.
     * @param {number} x - the X coordinate of the point to draw.
     * @param {number} y - the Y coordinate of the point to draw.
     */
    drawPoint(penAttributes: PenAttributes, x: number, y: number): void;
    /**
     * Draw a line on the pen layer.
     * @param {PenAttributes} penAttributes - how the line should be drawn.
     * @param {number} x0 - the X coordinate of the beginning of the line.
     * @param {number} y0 - the Y coordinate of the beginning of the line.
     * @param {number} x1 - the X coordinate of the end of the line.
     * @param {number} y1 - the Y coordinate of the end of the line.
     */
    drawLine(penAttributes: PenAttributes, x0: number, y0: number, x1: number, y1: number): void;
    /**
     * Prepare to draw lines in the _lineOnBufferDrawRegionId region.
     */
    _enterDrawLineOnBuffer(): void;
    /**
     * Return to a base state from _lineOnBufferDrawRegionId.
     */
    _exitDrawLineOnBuffer(): void;
    /**
     * Prepare to do things with this PenSkin's framebuffer
     */
    _enterUsePenBuffer(): void;
    /**
     * Return to a base state
     */
    _exitUsePenBuffer(): void;
    /**
     * Draw a line on the framebuffer.
     * Note that the point coordinates are in the following coordinate space:
     * +y is down, (0, 0) is the center, and the coords range from (-width / 2, -height / 2) to (height / 2, width / 2).
     * @param {PenAttributes} penAttributes - how the line should be drawn.
     * @param {number} x0 - the X coordinate of the beginning of the line.
     * @param {number} y0 - the Y coordinate of the beginning of the line.
     * @param {number} x1 - the X coordinate of the end of the line.
     * @param {number} y1 - the Y coordinate of the end of the line.
     */
    _drawLineOnBuffer(penAttributes: PenAttributes, x0: number, y0: number, x1: number, y1: number): void;
    /**
     * Set the size of the pen canvas.
     * @param {Array<int>} canvasSize - the new width and height for the canvas.
     * @private
     */
    private _setCanvasSize;
}
declare namespace PenSkin {
    export { PenSkin };
}
import Skin = require("./Skin");
/**
 * #PenAttributes
 */
type PenSkin = {
    /**
     * - The size (diameter) of the pen.
     */
    diameter?: number;
    /**
     * - The pen color as an array of [r,g,b,a], each component in the range [0,1].
     */
    color4f?: Array<number>;
};
