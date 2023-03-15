export = Skin;
declare class Skin extends EventEmitter {
    /**
     * Create a Skin, which stores and/or generates textures for use in rendering.
     * @param {int} id - The unique ID for this Skin.
     * @constructor
     */
    constructor(id: int);
    /** @type {int} */
    _id: int;
    /** @type {Vec3} */
    _rotationCenter: Vec3;
    /** @type {WebGLTexture} */
    _texture: WebGLTexture;
    /**
     * The uniforms to be used by the vertex and pixel shaders.
     * Some of these are used by other parts of the renderer as well.
     * @type {Object.<string,*>}
     * @private
     */
    private _uniforms;
    /**
     * A silhouette to store touching data, skins are responsible for keeping it up to date.
     * @private
     */
    private _silhouette;
    /**
     * Dispose of this object. Do not use it after calling this method.
     */
    dispose(): void;
    /**
     * @return {int} the unique ID for this Skin.
     */
    get id(): int;
    /**
     * @returns {Vec3} the origin, in object space, about which this Skin should rotate.
     */
    get rotationCenter(): Vec3;
    /**
     * @abstract
     * @return {Array<number>} the "native" size, in texels, of this skin.
     */
    get size(): number[];
    /**
     * Should this skin's texture be filtered with nearest-neighbor or linear interpolation at the given scale?
     * @param {?Array<Number>} scale The screen-space X and Y scaling factors at which this skin's texture will be
     * displayed, as percentages (100 means 1 "native size" unit is 1 screen pixel; 200 means 2 screen pixels, etc).
     * @param {Drawable} drawable The drawable that this skin's texture will be applied to.
     * @return {boolean} True if this skin's texture, as returned by {@link getTexture}, should be filtered with
     * nearest-neighbor interpolation.
     */
    useNearest(scale: Array<number> | null, drawable: Drawable): boolean;
    /**
     * Get the center of the current bounding box
     * @return {Array<number>} the center of the current bounding box
     */
    calculateRotationCenter(): Array<number>;
    /**
     * @abstract
     * @param {Array<number>} scale - The scaling factors to be used.
     * @return {WebGLTexture} The GL texture representation of this skin when drawing at the given size.
     */
    getTexture(scale: Array<number>): WebGLTexture;
    /**
     * Get the bounds of the drawable for determining its fenced position.
     * @param {Array<number>} drawable - The Drawable instance this skin is using.
     * @param {?Rectangle} result - Optional destination for bounds calculation.
     * @return {!Rectangle} The drawable's bounds. For compatibility with Scratch 2, we always use getAABB.
     */
    getFenceBounds(drawable: Array<number>, result: Rectangle): Rectangle;
    /**
     * Update and returns the uniforms for this skin.
     * @param {Array<number>} scale - The scaling factors to be used.
     * @returns {object.<string, *>} the shader uniforms to be used when rendering with this Skin.
     */
    getUniforms(scale: Array<number>): object<string, any>;
    /**
     * If the skin defers silhouette operations until the last possible minute,
     * this will be called before isTouching uses the silhouette.
     * @abstract
     */
    updateSilhouette(): void;
    /**
     * Set this skin's texture to the given image.
     * @param {ImageData|HTMLCanvasElement} textureData - The canvas or image data to set the texture to.
     */
    _setTexture(textureData: ImageData | HTMLCanvasElement): void;
    /**
     * Set the contents of this skin to an empty skin.
     * @fires Skin.event:WasAltered
     */
    setEmptyImageData(): void;
    _emptyImageData: ImageData;
    _emptyImageTexture: any;
    /**
     * Does this point touch an opaque or translucent point on this skin?
     * Nearest Neighbor version
     * The caller is responsible for ensuring this skin's silhouette is up-to-date.
     * @see updateSilhouette
     * @see Drawable.updateCPURenderAttributes
     * @param {twgl.v3} vec A texture coordinate.
     * @return {boolean} Did it touch?
     */
    isTouchingNearest(vec: twgl.v3): boolean;
    /**
     * Does this point touch an opaque or translucent point on this skin?
     * Linear Interpolation version
     * The caller is responsible for ensuring this skin's silhouette is up-to-date.
     * @see updateSilhouette
     * @see Drawable.updateCPURenderAttributes
     * @param {twgl.v3} vec A texture coordinate.
     * @return {boolean} Did it touch?
     */
    isTouchingLinear(vec: twgl.v3): boolean;
}
declare namespace Skin {
    namespace Events {
        const WasAltered: string;
    }
    /**
     * These are the events which can be emitted by instances of this class.
     */
    type Events = string;
}
import EventEmitter = require("events");
