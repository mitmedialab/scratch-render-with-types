export = Drawable;
declare class Drawable {
    /**
     * Calculate a color to represent the given ID number. At least one component of
     * the resulting color will be non-zero if the ID is not RenderConstants.ID_NONE.
     * @param {int} id The ID to convert.
     * @returns {Array<number>} An array of [r,g,b,a], each component in the range [0,1].
     */
    static color4fFromID(id: int): Array<number>;
    /**
     * Calculate the ID number represented by the given color. If all components of
     * the color are zero, the result will be RenderConstants.ID_NONE; otherwise the result
     * will be a valid ID.
     * @param {int} r The red value of the color, in the range [0,255].
     * @param {int} g The green value of the color, in the range [0,255].
     * @param {int} b The blue value of the color, in the range [0,255].
     * @returns {int} The ID represented by that color.
     */
    static color3bToID(r: int, g: int, b: int): int;
    /**
     * Sample a color from a drawable's texture.
     * The caller is responsible for ensuring this drawable's inverse matrix & its skin's silhouette are up-to-date.
     * @see updateCPURenderAttributes
     * @param {twgl.v3} vec The scratch space [x,y] vector
     * @param {Drawable} drawable The drawable to sample the texture from
     * @param {Uint8ClampedArray} dst The "color4b" representation of the texture at point.
     * @param {number} [effectMask] A bitmask for which effects to use. Optional.
     * @returns {Uint8ClampedArray} The dst object filled with the color4b
     */
    static sampleColor4b(vec: twgl.v3, drawable: Drawable, dst: Uint8ClampedArray, effectMask?: number): Uint8ClampedArray;
    /**
     * An object which can be drawn by the renderer.
     * @todo double-buffer all rendering state (position, skin, effects, etc.)
     * @param {!int} id - This Drawable's unique ID.
     * @constructor
     */
    constructor(id: int);
    /** @type {!int} */
    _id: int;
    /**
     * The uniforms to be used by the vertex and pixel shaders.
     * Some of these are used by other parts of the renderer as well.
     * @type {Object.<string,*>}
     * @private
     */
    private _uniforms;
    _position: any;
    _scale: any;
    _direction: number;
    _transformDirty: boolean;
    _rotationMatrix: any;
    _rotationTransformDirty: boolean;
    _rotationAdjusted: any;
    _rotationCenterDirty: boolean;
    _skinScale: any;
    _skinScaleDirty: boolean;
    _inverseMatrix: any;
    _inverseTransformDirty: boolean;
    _visible: boolean;
    /** A bitmask identifying which effects are currently in use.
     * @readonly
     * @type {int} */
    readonly enabledEffects: int;
    /** @todo move convex hull functionality, maybe bounds functionality overall, to Skin classes */
    _convexHullPoints: number[][];
    _convexHullDirty: boolean;
    _transformedHullPoints: any[];
    _transformedHullDirty: boolean;
    /**
     * Respond to an internal change in the current Skin.
     * @private
     */
    private _skinWasAltered;
    isTouching: (vec: twgl.v3) => boolean;
    /**
     * Dispose of this Drawable. Do not use it after calling this method.
     */
    dispose(): void;
    /**
     * @param {Skin} newSkin - A new Skin for this Drawable.
     */
    set skin(arg: Skin);
    /**
     * @returns {Skin} the current skin for this Drawable.
     */
    get skin(): Skin;
    /**
     * Mark this Drawable's transform as dirty.
     * It will be recalculated next time it's needed.
     */
    setTransformDirty(): void;
    /**
     * @returns {number} The ID for this Drawable.
     */
    get id(): number;
    _skin: any;
    /**
     * @returns {Array<number>} the current scaling percentages applied to this Drawable. [100,100] is normal size.
     */
    get scale(): number[];
    /**
     * @returns {object.<string, *>} the shader uniforms to be used when rendering this Drawable.
     */
    getUniforms(): object<string, any>;
    /**
     * @returns {boolean} whether this Drawable is visible.
     */
    getVisible(): boolean;
    /**
     * Update the position if it is different. Marks the transform as dirty.
     * @param {Array.<number>} position A new position.
     */
    updatePosition(position: Array<number>): void;
    /**
     * Update the direction if it is different. Marks the transform as dirty.
     * @param {number} direction A new direction.
     */
    updateDirection(direction: number): void;
    /**
     * Update the scale if it is different. Marks the transform as dirty.
     * @param {Array.<number>} scale A new scale.
     */
    updateScale(scale: Array<number>): void;
    /**
     * Update visibility if it is different. Marks the convex hull as dirty.
     * @param {boolean} visible A new visibility state.
     */
    updateVisible(visible: boolean): void;
    /**
     * Update an effect. Marks the convex hull as dirty if the effect changes shape.
     * @param {string} effectName The name of the effect.
     * @param {number} rawValue A new effect value.
     */
    updateEffect(effectName: string, rawValue: number): void;
    /**
     * Update the position, direction, scale, or effect properties of this Drawable.
     * @deprecated Use specific update* methods instead.
     * @param {object.<string,*>} properties The new property values to set.
     */
    updateProperties(properties: object<string, any>): void;
    /**
     * Calculate the transform to use when rendering this Drawable.
     * @private
     */
    private _calculateTransform;
    /**
     * Whether the Drawable needs convex hull points provided by the renderer.
     * @return {boolean} True when no convex hull known, or it's dirty.
     */
    needsConvexHullPoints(): boolean;
    /**
     * Set the convex hull to be dirty.
     * Do this whenever the Drawable's shape has possibly changed.
     */
    setConvexHullDirty(): void;
    /**
     * Set the convex hull points for the Drawable.
     * @param {Array<Array<number>>} points Convex hull points, as [[x, y], ...]
     */
    setConvexHullPoints(points: Array<Array<number>>): void;
    /**
     * @function
     * @name isTouching
     * Check if the world position touches the skin.
     * The caller is responsible for ensuring this drawable's inverse matrix & its skin's silhouette are up-to-date.
     * @see updateCPURenderAttributes
     * @param {twgl.v3} vec World coordinate vector.
     * @return {boolean} True if the world position touches the skin.
     */
    _isTouchingNever(vec: twgl.v3): boolean;
    _isTouchingNearest(vec: any): boolean;
    _isTouchingLinear(vec: any): boolean;
    /**
     * Get the precise bounds for a Drawable.
     * This function applies the transform matrix to the known convex hull,
     * and then finds the minimum box along the axes.
     * Before calling this, ensure the renderer has updated convex hull points.
     * @param {?Rectangle} result optional destination for bounds calculation
     * @return {!Rectangle} Bounds for a tight box around the Drawable.
     */
    getBounds(result: Rectangle | null): Rectangle;
    /**
     * Get the precise bounds for the upper 8px slice of the Drawable.
     * Used for calculating where to position a text bubble.
     * Before calling this, ensure the renderer has updated convex hull points.
     * @param {?Rectangle} result optional destination for bounds calculation
     * @return {!Rectangle} Bounds for a tight box around a slice of the Drawable.
     */
    getBoundsForBubble(result: Rectangle | null): Rectangle;
    /**
     * Get the rough axis-aligned bounding box for the Drawable.
     * Calculated by transforming the skin's bounds.
     * Note that this is less precise than the box returned by `getBounds`,
     * which is tightly snapped to account for a Drawable's transparent regions.
     * `getAABB` returns a much less accurate bounding box, but will be much
     * faster to calculate so may be desired for quick checks/optimizations.
     * @param {?Rectangle} result optional destination for bounds calculation
     * @return {!Rectangle} Rough axis-aligned bounding box for Drawable.
     */
    getAABB(result: Rectangle | null): Rectangle;
    /**
     * Return the best Drawable bounds possible without performing graphics queries.
     * I.e., returns the tight bounding box when the convex hull points are already
     * known, but otherwise return the rough AABB of the Drawable.
     * @param {?Rectangle} result optional destination for bounds calculation
     * @return {!Rectangle} Bounds for the Drawable.
     */
    getFastBounds(result: Rectangle | null): Rectangle;
    /**
     * Transform all the convex hull points by the current Drawable's
     * transform. This allows us to skip recalculating the convex hull
     * for many Drawable updates, including translation, rotation, scaling.
     * @return {!Array.<!Array.number>} Array of glPoints which are Array<x, y>
     * @private
     */
    private _getTransformedHullPoints;
    /**
     * Update the transform matrix and calculate it's inverse for collision
     * and local texture position purposes.
     */
    updateMatrix(): void;
    /**
     * Update everything necessary to render this drawable on the CPU.
     */
    updateCPURenderAttributes(): void;
}
import Skin = require("./Skin");
import Rectangle = require("./Rectangle");
