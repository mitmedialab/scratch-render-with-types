export = Rectangle;
declare class Rectangle {
    /**
     * Compute the intersection of two bounding Rectangles.
     * Could be an impossible box if they don't intersect.
     * @param {Rectangle} a One rectangle
     * @param {Rectangle} b Other rectangle
     * @param {?Rectangle} result A resulting storage rectangle  (safe to pass
     *                            a or b if you want to overwrite one)
     * @returns {Rectangle} resulting rectangle
     */
    static intersect(a: Rectangle, b: Rectangle, result?: Rectangle | null): Rectangle;
    /**
     * Compute the union of two bounding Rectangles.
     * @param {Rectangle} a One rectangle
     * @param {Rectangle} b Other rectangle
     * @param {?Rectangle} result A resulting storage rectangle  (safe to pass
     *                            a or b if you want to overwrite one)
     * @returns {Rectangle} resulting rectangle
     */
    static union(a: Rectangle, b: Rectangle, result?: Rectangle | null): Rectangle;
    left: number;
    right: number;
    bottom: number;
    top: number;
    /**
     * Initialize a Rectangle from given Scratch-coordinate bounds.
     * @param {number} left Left bound of the rectangle.
     * @param {number} right Right bound of the rectangle.
     * @param {number} bottom Bottom bound of the rectangle.
     * @param {number} top Top bound of the rectangle.
     */
    initFromBounds(left: number, right: number, bottom: number, top: number): void;
    /**
     * Initialize a Rectangle to the minimum AABB around a set of points.
     * @param {Array<Array<number>>} points Array of [x, y] points.
     */
    initFromPointsAABB(points: Array<Array<number>>): void;
    /**
     * Initialize a Rectangle to a 1 unit square centered at 0 x 0 transformed
     * by a model matrix.
     * @param {Array.<number>} m A 4x4 matrix to transform the rectangle by.
     * @tutorial Rectangle-AABB-Matrix
     */
    initFromModelMatrix(m: Array<number>): void;
    /**
     * Determine if this Rectangle intersects some other.
     * Note that this is a comparison assuming the Rectangle was
     * initialized with Scratch-space bounds or points.
     * @param {!Rectangle} other Rectangle to check if intersecting.
     * @return {boolean} True if this Rectangle intersects other.
     */
    intersects(other: Rectangle): boolean;
    /**
     * Determine if this Rectangle fully contains some other.
     * Note that this is a comparison assuming the Rectangle was
     * initialized with Scratch-space bounds or points.
     * @param {!Rectangle} other Rectangle to check if fully contained.
     * @return {boolean} True if this Rectangle fully contains other.
     */
    contains(other: Rectangle): boolean;
    /**
     * Clamp a Rectangle to bounds.
     * @param {number} left Left clamp.
     * @param {number} right Right clamp.
     * @param {number} bottom Bottom clamp.
     * @param {number} top Top clamp.
     */
    clamp(left: number, right: number, bottom: number, top: number): void;
    /**
     * Push out the Rectangle to integer bounds.
     */
    snapToInt(): void;
    /**
     * Width of the Rectangle.
     * @return {number} Width of rectangle.
     */
    get width(): number;
    /**
     * Height of the Rectangle.
     * @return {number} Height of rectangle.
     */
    get height(): number;
}
