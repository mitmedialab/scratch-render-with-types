export = RenderWebGL;
declare class RenderWebGL extends EventEmitter {
    /**
     * Check if this environment appears to support this renderer before attempting to create an instance.
     * Catching an exception from the constructor is also a valid way to test for (lack of) support.
     * @param {canvas} [optCanvas] - An optional canvas to use for the test. Otherwise a temporary canvas will be used.
     * @returns {boolean} - True if this environment appears to support this renderer, false otherwise.
     */
    static isSupported(optCanvas?: canvas): boolean;
    /**
     * Ask TWGL to create a rendering context with the attributes used by this renderer.
     * @param {canvas} canvas - attach the context to this canvas.
     * @returns {WebGLRenderingContext} - a TWGL rendering context (backed by either WebGL 1.0 or 2.0).
     * @private
     */
    private static _getContext;
    /**
     * Sample a "final" color from an array of drawables at a given scratch space.
     * Will blend any alpha values with the drawables "below" it.
     * @param {twgl.v3} vec Scratch Vector Space to sample
     * @param {Array<Drawables>} drawables A list of drawables with the "top most"
     *              drawable at index 0
     * @param {Uint8ClampedArray} dst The color3b space to store the answer in.
     * @return {Uint8ClampedArray} The dst vector with everything blended down.
     */
    static sampleColor3b(vec: twgl.v3, drawables: Array<Drawables>, dst: Uint8ClampedArray): Uint8ClampedArray;
    /**
     * Create a renderer for drawing Scratch sprites to a canvas using WebGL.
     * Coordinates will default to Scratch 2.0 values if unspecified.
     * The stage's "native" size will be calculated from the these coordinates.
     * For example, the defaults result in a native size of 480x360.
     * Queries such as "touching color?" will always execute at the native size.
     * @see RenderWebGL#setStageSize
     * @see RenderWebGL#resize
     * @param {canvas} canvas The canvas to draw onto.
     * @param {int} [xLeft=-240] The x-coordinate of the left edge.
     * @param {int} [xRight=240] The x-coordinate of the right edge.
     * @param {int} [yBottom=-180] The y-coordinate of the bottom edge.
     * @param {int} [yTop=180] The y-coordinate of the top edge.
     * @constructor
     * @listens RenderWebGL#event:NativeSizeChanged
     */
    constructor(canvas: any, xLeft?: int, xRight?: int, yBottom?: int, yTop?: int);
    _gl: WebGLRenderingContext;
    /** @type {RenderWebGL.UseGpuModes} */
    _useGpuMode: RenderWebGL.UseGpuModes;
    /** @type {Drawable[]} */
    _allDrawables: Drawable[];
    /** @type {Skin[]} */
    _allSkins: Skin[];
    /** @type {Array<int>} */
    _drawList: Array<int>;
    /** @type {Array<String>} */
    _groupOrdering: Array<string>;
    /**
     * @typedef LayerGroup
     * @property {int} groupIndex The relative position of this layer group in the group ordering
     * @property {int} drawListOffset The absolute position of this layer group in the draw list
     * This number gets updated as drawables get added to or deleted from the draw list.
     */
    /** @type {Object.<string, LayerGroup>} */
    _layerGroups: {
        [x: string]: {
            /**
             * The relative position of this layer group in the group ordering
             */
            groupIndex: int;
            /**
             * The absolute position of this layer group in the draw list
             * This number gets updated as drawables get added to or deleted from the draw list.
             */
            drawListOffset: int;
        };
    };
    /** @type {int} */
    _nextDrawableId: int;
    /** @type {int} */
    _nextSkinId: int;
    /** @type {module:twgl/m4.Mat4} */
    _projection: any;
    /** @type {ShaderManager} */
    _shaderManager: ShaderManager;
    /** @type {HTMLCanvasElement} */
    _tempCanvas: HTMLCanvasElement;
    /** @type {any} */
    _regionId: any;
    /** @type {function} */
    _exitRegion: Function;
    /** @type {object} */
    _backgroundDrawRegionId: object;
    /** @type {Array.<snapshotCallback>} */
    _snapshotCallbacks: Array<snapshotCallback>;
    /** @type {Array<number>} */
    _backgroundColor4f: Array<number>;
    /** @type {Uint8ClampedArray} */
    _backgroundColor3b: Uint8ClampedArray;
    /**
     * @returns {WebGLRenderingContext} the WebGL rendering context associated with this renderer.
     */
    get gl(): WebGLRenderingContext;
    /**
     * @returns {HTMLCanvasElement} the canvas of the WebGL rendering context associated with this renderer.
     */
    get canvas(): HTMLCanvasElement;
    /**
     * Set the physical size of the stage in device-independent pixels.
     * This will be multiplied by the device's pixel ratio on high-DPI displays.
     * @param {int} pixelsWide The desired width in device-independent pixels.
     * @param {int} pixelsTall The desired height in device-independent pixels.
     */
    resize(pixelsWide: int, pixelsTall: int): void;
    /**
     * Set the background color for the stage. The stage will be cleared with this
     * color each frame.
     * @param {number} red The red component for the background.
     * @param {number} green The green component for the background.
     * @param {number} blue The blue component for the background.
     */
    setBackgroundColor(red: number, green: number, blue: number): void;
    /**
     * Tell the renderer to draw various debug information to the provided canvas
     * during certain operations.
     * @param {canvas} canvas The canvas to use for debug output.
     */
    setDebugCanvas(canvas: any): void;
    _debugCanvas: any;
    /**
     * Control the use of the GPU or CPU paths in `isTouchingColor`.
     * @param {RenderWebGL.UseGpuModes} useGpuMode - automatically decide, force CPU, or force GPU.
     */
    setUseGpuMode(useGpuMode: RenderWebGL.UseGpuModes): void;
    /**
     * Set logical size of the stage in Scratch units.
     * @param {int} xLeft The left edge's x-coordinate. Scratch 2 uses -240.
     * @param {int} xRight The right edge's x-coordinate. Scratch 2 uses 240.
     * @param {int} yBottom The bottom edge's y-coordinate. Scratch 2 uses -180.
     * @param {int} yTop The top edge's y-coordinate. Scratch 2 uses 180.
     */
    setStageSize(xLeft: int, xRight: int, yBottom: int, yTop: int): void;
    _xLeft: int;
    _xRight: int;
    _yBottom: int;
    _yTop: int;
    /**
     * @return {Array<int>} the "native" size of the stage, which is used for pen, query renders, etc.
     */
    getNativeSize(): Array<int>;
    /**
     * Set the "native" size of the stage, which is used for pen, query renders, etc.
     * @param {int} width - the new width to set.
     * @param {int} height - the new height to set.
     * @private
     * @fires RenderWebGL#event:NativeSizeChanged
     */
    private _setNativeSize;
    _nativeSize: any[];
    /**
     * Create a new bitmap skin from a snapshot of the provided bitmap data.
     * @param {ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} bitmapData - new contents for this skin.
     * @param {!int} [costumeResolution=1] - The resolution to use for this bitmap.
     * @param {?Array<number>} [rotationCenter] Optional: rotation center of the skin. If not supplied, the center of
     * the skin will be used.
     * @returns {!int} the ID for the new skin.
     */
    createBitmapSkin(bitmapData: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, costumeResolution?: int, rotationCenter?: Array<number> | null): int;
    /**
     * Create a new SVG skin.
     * @param {!string} svgData - new SVG to use.
     * @param {?Array<number>} rotationCenter Optional: rotation center of the skin. If not supplied, the center of the
     * skin will be used
     * @returns {!int} the ID for the new skin.
     */
    createSVGSkin(svgData: string, rotationCenter: Array<number> | null): int;
    /**
     * Create a new PenSkin - a skin which implements a Scratch pen layer.
     * @returns {!int} the ID for the new skin.
     */
    createPenSkin(): int;
    /**
     * Create a new SVG skin using the text bubble svg creator. The rotation center
     * is always placed at the top left.
     * @param {!string} type - either "say" or "think".
     * @param {!string} text - the text for the bubble.
     * @param {!boolean} pointsLeft - which side the bubble is pointing.
     * @returns {!int} the ID for the new skin.
     */
    createTextSkin(type: string, text: string, pointsLeft: boolean): int;
    /**
     * Update an existing SVG skin, or create an SVG skin if the previous skin was not SVG.
     * @param {!int} skinId the ID for the skin to change.
     * @param {!string} svgData - new SVG to use.
     * @param {?Array<number>} rotationCenter Optional: rotation center of the skin. If not supplied, the center of the
     * skin will be used
     */
    updateSVGSkin(skinId: int, svgData: string, rotationCenter: Array<number> | null): void;
    /**
     * Update an existing bitmap skin, or create a bitmap skin if the previous skin was not bitmap.
     * @param {!int} skinId the ID for the skin to change.
     * @param {!ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imgData - new contents for this skin.
     * @param {!number} bitmapResolution - the resolution scale for a bitmap costume.
     * @param {?Array<number>} rotationCenter Optional: rotation center of the skin. If not supplied, the center of the
     * skin will be used
     */
    updateBitmapSkin(skinId: int, imgData: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, bitmapResolution: number, rotationCenter: Array<number> | null): void;
    _reskin(skinId: any, newSkin: any): void;
    /**
     * Update a skin using the text bubble svg creator.
     * @param {!int} skinId the ID for the skin to change.
     * @param {!string} type - either "say" or "think".
     * @param {!string} text - the text for the bubble.
     * @param {!boolean} pointsLeft - which side the bubble is pointing.
     */
    updateTextSkin(skinId: int, type: string, text: string, pointsLeft: boolean): void;
    /**
     * Destroy an existing skin. Do not use the skin or its ID after calling this.
     * @param {!int} skinId - The ID of the skin to destroy.
     */
    destroySkin(skinId: int): void;
    /**
     * Create a new Drawable and add it to the scene.
     * @param {string} group Layer group to add the drawable to
     * @returns {int} The ID of the new Drawable.
     */
    createDrawable(group: string): int;
    /**
     * Set the layer group ordering for the renderer.
     * @param {Array<string>} groupOrdering The ordered array of layer group
     * names
     */
    setLayerGroupOrdering(groupOrdering: Array<string>): void;
    _addToDrawList(drawableID: any, group: any): void;
    _updateOffsets(updateType: any, currentGroupOrderingIndex: any): void;
    get _visibleDrawList(): int[];
    _endIndexForKnownLayerGroup(layerGroup: any): any;
    /**
     * Destroy a Drawable, removing it from the scene.
     * @param {int} drawableID The ID of the Drawable to remove.
     * @param {string} group Group name that the drawable belongs to
     */
    destroyDrawable(drawableID: int, group: string): void;
    /**
     * Returns the position of the given drawableID in the draw list. This is
     * the absolute position irrespective of layer group.
     * @param {number} drawableID The drawable ID to find.
     * @return {number} The postion of the given drawable ID.
     */
    getDrawableOrder(drawableID: number): number;
    /**
     * Set a drawable's order in the drawable list (effectively, z/layer).
     * Can be used to move drawables to absolute positions in the list,
     * or relative to their current positions.
     * "go back N layers": setDrawableOrder(id, -N, true, 1); (assuming stage at 0).
     * "go to back": setDrawableOrder(id, 1); (assuming stage at 0).
     * "go to front": setDrawableOrder(id, Infinity);
     * @param {int} drawableID ID of Drawable to reorder.
     * @param {number} order New absolute order or relative order adjusment.
     * @param {string=} group Name of layer group drawable belongs to.
     * Reordering will not take place if drawable cannot be found within the bounds
     * of the layer group.
     * @param {boolean=} optIsRelative If set, `order` refers to a relative change.
     * @param {number=} optMin If set, order constrained to be at least `optMin`.
     * @return {?number} New order if changed, or null.
     */
    setDrawableOrder(drawableID: int, order: number, group?: string | undefined, optIsRelative?: boolean | undefined, optMin?: number | undefined): number | null;
    /**
     * Draw all current drawables and present the frame on the canvas.
     */
    draw(): void;
    /**
     * Get the precise bounds for a Drawable.
     * @param {int} drawableID ID of Drawable to get bounds for.
     * @return {object} Bounds for a tight box around the Drawable.
     */
    getBounds(drawableID: int): object;
    /**
     * Get the precise bounds for a Drawable around the top slice.
     * Used for positioning speech bubbles more closely to the sprite.
     * @param {int} drawableID ID of Drawable to get bubble bounds for.
     * @return {object} Bounds for a tight box around the Drawable top slice.
     */
    getBoundsForBubble(drawableID: int): object;
    /**
     * Get the current skin (costume) size of a Drawable.
     * @param {int} drawableID The ID of the Drawable to measure.
     * @return {Array<number>} Skin size, width and height.
     */
    getCurrentSkinSize(drawableID: int): Array<number>;
    /**
     * Get the size of a skin by ID.
     * @param {int} skinID The ID of the Skin to measure.
     * @return {Array<number>} Skin size, width and height.
     */
    getSkinSize(skinID: int): Array<number>;
    /**
     * Get the rotation center of a skin by ID.
     * @param {int} skinID The ID of the Skin
     * @return {Array<number>} The rotationCenterX and rotationCenterY
     */
    getSkinRotationCenter(skinID: int): Array<number>;
    /**
     * Check if a particular Drawable is touching a particular color.
     * Unlike touching drawable, if the "tester" is invisble, we will still test.
     * @param {int} drawableID The ID of the Drawable to check.
     * @param {Array<int>} color3b Test if the Drawable is touching this color.
     * @param {Array<int>} [mask3b] Optionally mask the check to this part of Drawable.
     * @returns {boolean} True iff the Drawable is touching the color.
     */
    isTouchingColor(drawableID: int, color3b: Array<int>, mask3b?: Array<int>): boolean;
    _getMaxPixelsForCPU(): number;
    _enterDrawBackground(): void;
    _exitDrawBackground(): void;
    _isTouchingColorGpuStart(drawableID: any, candidateIDs: any, bounds: any, color3b: any, mask3b: any): void;
    _isTouchingColorGpuFin(bounds: any, color3b: any, stop: any): boolean;
    /**
     * Check if a particular Drawable is touching any in a set of Drawables.
     * @param {int} drawableID The ID of the Drawable to check.
     * @param {?Array<int>} candidateIDs The Drawable IDs to check, otherwise all visible drawables in the renderer
     * @returns {boolean} True if the Drawable is touching one of candidateIDs.
     */
    isTouchingDrawables(drawableID: int, candidateIDs?: Array<int> | null): boolean;
    /**
     * Convert a client based x/y position on the canvas to a Scratch 3 world space
     * Rectangle.  This creates recangles with a radius to cover selecting multiple
     * scratch pixels with touch / small render areas.
     *
     * @param {int} centerX The client x coordinate of the picking location.
     * @param {int} centerY The client y coordinate of the picking location.
     * @param {int} [width] The client width of the touch event (optional).
     * @param {int} [height] The client width of the touch event (optional).
     * @returns {Rectangle} Scratch world space rectangle, iterate bottom <= top,
     *                      left <= right.
     */
    clientSpaceToScratchBounds(centerX: int, centerY: int, width?: int, height?: int): Rectangle;
    /**
     * Determine if the drawable is touching a client based x/y.  Helper method for sensing
     * touching mouse-pointer.  Ignores visibility.
     *
     * @param {int} drawableID The ID of the drawable to check.
     * @param {int} centerX The client x coordinate of the picking location.
     * @param {int} centerY The client y coordinate of the picking location.
     * @param {int} [touchWidth] The client width of the touch event (optional).
     * @param {int} [touchHeight] The client height of the touch event (optional).
     * @returns {boolean} If the drawable has any pixels that would draw in the touch area
     */
    drawableTouching(drawableID: int, centerX: int, centerY: int, touchWidth?: int, touchHeight?: int): boolean;
    /**
     * Detect which sprite, if any, is at the given location.
     * This function will pick all drawables that are visible, unless specific
     * candidate drawable IDs are provided.  Used for determining what is clicked
     * or dragged.  Will not select hidden / ghosted sprites.
     *
     * @param {int} centerX The client x coordinate of the picking location.
     * @param {int} centerY The client y coordinate of the picking location.
     * @param {int} [touchWidth] The client width of the touch event (optional).
     * @param {int} [touchHeight] The client height of the touch event (optional).
     * @param {Array<int>} [candidateIDs] The Drawable IDs to pick from, otherwise all visible drawables.
     * @returns {int} The ID of the topmost Drawable under the picking location, or
     * RenderConstants.ID_NONE if there is no Drawable at that location.
     */
    pick(centerX: int, centerY: int, touchWidth?: int, touchHeight?: int, candidateIDs?: Array<int>): int;
    /**
     * @typedef DrawableExtraction
     * @property {ImageData} data Raw pixel data for the drawable
     * @property {number} x The x coordinate of the drawable's bounding box's top-left corner, in 'CSS pixels'
     * @property {number} y The y coordinate of the drawable's bounding box's top-left corner, in 'CSS pixels'
     * @property {number} width The drawable's bounding box width, in 'CSS pixels'
     * @property {number} height The drawable's bounding box height, in 'CSS pixels'
     */
    /**
     * Return a drawable's pixel data and bounds in screen space.
     * @param {int} drawableID The ID of the drawable to get pixel data for
     * @return {DrawableExtraction} Data about the picked drawable
     */
    extractDrawableScreenSpace(drawableID: int): {
        /**
         * Raw pixel data for the drawable
         */
        data: ImageData;
        /**
         * The x coordinate of the drawable's bounding box's top-left corner, in 'CSS pixels'
         */
        x: number;
        /**
         * The y coordinate of the drawable's bounding box's top-left corner, in 'CSS pixels'
         */
        y: number;
        /**
         * The drawable's bounding box width, in 'CSS pixels'
         */
        width: number;
        /**
         * The drawable's bounding box height, in 'CSS pixels'
         */
        height: number;
    };
    /**
     * @typedef ColorExtraction
     * @property {Uint8Array} data Raw pixel data for the drawable
     * @property {int} width Drawable bounding box width
     * @property {int} height Drawable bounding box height
     * @property {object} color Color object with RGBA properties at picked location
     */
    /**
     * Return drawable pixel data and color at a given position
     * @param {int} x The client x coordinate of the picking location.
     * @param {int} y The client y coordinate of the picking location.
     * @param {int} radius The client radius to extract pixels with.
     * @return {?ColorExtraction} Data about the picked color
     */
    extractColor(x: int, y: int, radius: int): {
        /**
         * Raw pixel data for the drawable
         */
        data: Uint8Array;
        /**
         * Drawable bounding box width
         */
        width: int;
        /**
         * Drawable bounding box height
         */
        height: int;
        /**
         * Color object with RGBA properties at picked location
         */
        color: object;
    };
    /**
     * Get the candidate bounding box for a touching query.
     * @param {int} drawableID ID for drawable of query.
     * @return {?Rectangle} Rectangle bounds for touching query, or null.
     */
    _touchingBounds(drawableID: int): Rectangle | null;
    /**
     * Filter a list of candidates for a touching query into only those that
     * could possibly intersect the given bounds.
     * @param {int} drawableID - ID for drawable of query.
     * @param {Array<int>} candidateIDs - Candidates for touching query.
     * @return {?Array< {id, drawable, intersection} >} Filtered candidates with useful data.
     */
    _candidatesTouching(drawableID: int, candidateIDs: Array<int>): Array<{
        id;
        drawable;
        intersection;
    }> | null;
    /**
     * Helper to get the union bounds from a set of candidates returned from the above method
     * @private
     * @param {Array<object>} candidates info from _candidatesTouching
     * @return {Rectangle} the outer bounding box union
     */
    private _candidatesBounds;
    /**
     * Update a drawable's skin.
     * @param {number} drawableID The drawable's id.
     * @param {number} skinId The skin to update to.
     */
    updateDrawableSkinId(drawableID: number, skinId: number): void;
    /**
     * Update a drawable's position.
     * @param {number} drawableID The drawable's id.
     * @param {Array.<number>} position The new position.
     */
    updateDrawablePosition(drawableID: number, position: Array<number>): void;
    /**
     * Update a drawable's direction.
     * @param {number} drawableID The drawable's id.
     * @param {number} direction A new direction.
     */
    updateDrawableDirection(drawableID: number, direction: number): void;
    /**
     * Update a drawable's scale.
     * @param {number} drawableID The drawable's id.
     * @param {Array.<number>} scale A new scale.
     */
    updateDrawableScale(drawableID: number, scale: Array<number>): void;
    /**
     * Update a drawable's direction and scale together.
     * @param {number} drawableID The drawable's id.
     * @param {number} direction A new direction.
     * @param {Array.<number>} scale A new scale.
     */
    updateDrawableDirectionScale(drawableID: number, direction: number, scale: Array<number>): void;
    /**
     * Update a drawable's visibility.
     * @param {number} drawableID The drawable's id.
     * @param {boolean} visible Will the drawable be visible?
     */
    updateDrawableVisible(drawableID: number, visible: boolean): void;
    /**
     * Update a drawable's visual effect.
     * @param {number} drawableID The drawable's id.
     * @param {string} effectName The effect to change.
     * @param {number} value A new effect value.
     */
    updateDrawableEffect(drawableID: number, effectName: string, value: number): void;
    /**
     * Update the position, direction, scale, or effect properties of this Drawable.
     * @deprecated Use specific updateDrawable* methods instead.
     * @param {int} drawableID The ID of the Drawable to update.
     * @param {object.<string,*>} properties The new property values to set.
     */
    updateDrawableProperties(drawableID: int, properties: object<string, any>): void;
/**
 * Update the position object's x & y members to keep the drawable fenced in view.
 * @param {int} drawableID - The ID of the Drawable to update.
 * @param {Array.<number, number>} position to be fenced - An array of type [x, y]
 * @return {Array.<number, number>} The fenced position as an array [x, y]
 */
getFencedPositionOfDrawable(drawableID: int, position: Array<number, number>): Array<number, number>;
/**
 * Clear a pen layer.
 * @param {int} penSkinID - the unique ID of a Pen Skin.
 */
penClear(penSkinID: int): void;
/**
 * Draw a point on a pen layer.
 * @param {int} penSkinID - the unique ID of a Pen Skin.
 * @param {PenAttributes} penAttributes - how the point should be drawn.
 * @param {number} x - the X coordinate of the point to draw.
 * @param {number} y - the Y coordinate of the point to draw.
 */
penPoint(penSkinID: int, penAttributes: PenAttributes, x: number, y: number): void;
/**
 * Draw a line on a pen layer.
 * @param {int} penSkinID - the unique ID of a Pen Skin.
 * @param {PenAttributes} penAttributes - how the line should be drawn.
 * @param {number} x0 - the X coordinate of the beginning of the line.
 * @param {number} y0 - the Y coordinate of the beginning of the line.
 * @param {number} x1 - the X coordinate of the end of the line.
 * @param {number} y1 - the Y coordinate of the end of the line.
 */
penLine(penSkinID: int, penAttributes: PenAttributes, x0: number, y0: number, x1: number, y1: number): void;
/**
 * Stamp a Drawable onto a pen layer.
 * @param {int} penSkinID - the unique ID of a Pen Skin.
 * @param {int} stampID - the unique ID of the Drawable to use as the stamp.
 */
penStamp(penSkinID: int, stampID: int): void;
    /**
     * Build geometry (vertex and index) buffers.
     * @private
     */
    private _createGeometry;
_bufferInfo: any;
    /**
     * Respond to a change in the "native" rendering size. The native size is used by buffers which are fixed in size
     * regardless of the size of the main render target. This includes the buffers used for queries such as picking and
     * color-touching. The fixed size allows (more) consistent behavior across devices and presentation modes.
     * @param {object} event - The change event.
     * @private
     */
    private onNativeSizeChanged;
_pickBufferInfo: any;
_queryBufferInfo: any;
/**
 * Enter a draw region.
 *
 * A draw region is where multiple draw operations are performed with the
 * same GL state. WebGL performs poorly when it changes state like blend
 * mode. Marking a collection of state values as a "region" the renderer
 * can skip superfluous extra state calls when it is already in that
 * region. Since one region may be entered from within another a exit
 * handle can also be registered that is called when a new region is about
 * to be entered to restore a common inbetween state.
 *
 * @param {any} regionId - id of the region to enter
 * @param {function} enter - handle to call when first entering a region
 * @param {function} exit - handle to call when leaving a region
 */
enterDrawRegion(regionId: any, enter ?: Function, exit ?: Function): void;
/**
 * Forcefully exit the current region returning to a common inbetween GL
 * state.
 */
_doExitDrawRegion(): void;
    /**
     * Draw a set of Drawables, by drawable ID
     * @param {Array<int>} drawables The Drawable IDs to draw, possibly this._drawList.
     * @param {ShaderManager.DRAW_MODE} drawMode Draw normally, silhouette, etc.
     * @param {module:twgl/m4.Mat4} projection The projection matrix to use.
     * @param {object} [opts] Options for drawing
     * @param {idFilterFunc} opts.filter An optional filter function.
     * @param {object.<string,*>} opts.extraUniforms Extra uniforms for the shaders.
     * @param {int} opts.effectMask Bitmask for effects to allow
     * @param {boolean} opts.ignoreVisibility Draw all, despite visibility (e.g. stamping, touching color)
     * @param {int} opts.framebufferWidth The width of the framebuffer being drawn onto. Defaults to "native" width
     * @param {int} opts.framebufferHeight The height of the framebuffer being drawn onto. Defaults to "native" height
     * @private
     */
    private _drawThese;
/**
 * Get the convex hull points for a particular Drawable.
 * To do this, calculate it based on the drawable's Silhouette.
 * @param {int} drawableID The Drawable IDs calculate convex hull for.
 * @return {Array<Array<number>>} points Convex hull points, as [[x, y], ...]
 */
_getConvexHullPointsForDrawable(drawableID: int): Array<Array<number>>;
/**
 * @callback RenderWebGL#snapshotCallback
 * @param {string} dataURI Data URI of the snapshot of the renderer
 */
/**
 * @param {snapshotCallback} callback Function called in the next frame with the snapshot data
 */
requestSnapshot(callback: snapshotCallback): void;
canHazPixels: (drawableID: int) => {
    /**
     * Raw pixel data for the drawable
     */
    data: ImageData;
    /**
     * The x coordinate of the drawable's bounding box's top-left corner, in 'CSS pixels'
     */
    x: number;
    /**
     * The y coordinate of the drawable's bounding box's top-left corner, in 'CSS pixels'
     */
    y: number;
    /**
     * The drawable's bounding box width, in 'CSS pixels'
     */
    width: number;
    /**
     * The drawable's bounding box height, in 'CSS pixels'
     */
    height: number;
};
}
declare namespace RenderWebGL {
    export { UseGpuModes, RenderWebGL };
}
import EventEmitter = require("events");
import Drawable = require("./Drawable");
import ShaderManager = require("./ShaderManager");
import Rectangle = require("./Rectangle");
declare namespace UseGpuModes {
    const Automatic: string;
    const ForceGPU: string;
    const ForceCPU: string;
}
/**
 * Values for setUseGPU()
 */
type UseGpuModes = string;
/**
 * #idFilterFunc
 */
type RenderWebGL = (drawableID: int) => bool;

