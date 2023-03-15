export = CanvasMeasurementProvider;
declare class CanvasMeasurementProvider {
    /**
     * @param {CanvasRenderingContext2D} ctx - provides a canvas rendering context
     * with 'font' set to the text style of the text to be wrapped.
     */
    constructor(ctx: CanvasRenderingContext2D);
    _ctx: CanvasRenderingContext2D;
    _cache: {};
    /**
     * Called by the TextWrapper before a batch of zero or more calls to measureText().
     */
    beginMeasurementSession(): void;
    /**
     * Called by the TextWrapper after a batch of zero or more calls to measureText().
     */
    endMeasurementSession(): void;
    /**
     * Measure a whole string as one unit.
     * @param {string} text - the text to measure.
     * @returns {number} - the length of the string.
     */
    measureText(text: string): number;
}
