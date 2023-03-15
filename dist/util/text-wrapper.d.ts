export = TextWrapper;
/**
 * Tell this text wrapper to use a specific measurement provider.
 * @typedef {object} MeasurementProvider - the new measurement provider.
 * @property {Function} beginMeasurementSession - this will be called before a batch of measurements are made.
 *      Optionally, this function may return an object to be provided to the endMeasurementSession function.
 * @property {Function} measureText - this will be called each time a piece of text must be measured.
 * @property {Function} endMeasurementSession - this will be called after a batch of measurements is finished.
 *      It will be passed whatever value beginMeasurementSession returned, if any.
 */
/**
 * Utility to wrap text across several lines, respecting Unicode grapheme clusters and, when possible, Unicode line
 * break opportunities.
 * Reference material:
 * - Unicode Standard Annex #14: http://unicode.org/reports/tr14/
 * - Unicode Standard Annex #29: http://unicode.org/reports/tr29/
 * - "JavaScript has a Unicode problem" by Mathias Bynens: https://mathiasbynens.be/notes/javascript-unicode
 */
declare class TextWrapper {
    /**
     * Construct a text wrapper which will measure text using the specified measurement provider.
     * @param {MeasurementProvider} measurementProvider - a helper object to provide text measurement services.
     */
    constructor(measurementProvider: MeasurementProvider);
    _measurementProvider: MeasurementProvider;
    _cache: {};
    /**
     * Wrap the provided text into lines restricted to a maximum width. See Unicode Standard Annex (UAX) #14.
     * @param {number} maxWidth - the maximum allowed width of a line.
     * @param {string} text - the text to be wrapped. Will be split on whitespace.
     * @returns {Array.<string>} an array containing the wrapped lines of text.
     */
    wrapText(maxWidth: number, text: string): Array<string>;
}
declare namespace TextWrapper {
    export { MeasurementProvider };
}
/**
 * - the new measurement provider.
 */
type MeasurementProvider = {
    /**
     * - this will be called before a batch of measurements are made.
     * Optionally, this function may return an object to be provided to the endMeasurementSession function.
     */
    beginMeasurementSession: Function;
    /**
     * - this will be called each time a piece of text must be measured.
     */
    measureText: Function;
    /**
     * - this will be called after a batch of measurements is finished.
     * It will be passed whatever value beginMeasurementSession returned, if any.
     */
    endMeasurementSession: Function;
};
