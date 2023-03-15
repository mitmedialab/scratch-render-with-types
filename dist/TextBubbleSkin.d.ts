export = TextBubbleSkin;
declare class TextBubbleSkin extends Skin {
    /**
     * Create a new text bubble skin.
     * @param {!int} id - The ID for this Skin.
     * @param {!RenderWebGL} renderer - The renderer which will use this skin.
     * @constructor
     * @extends Skin
     */
    constructor(id: int, renderer: RenderWebGL);
    /** @type {RenderWebGL} */
    _renderer: RenderWebGL;
    /** @type {HTMLCanvasElement} */
    _canvas: HTMLCanvasElement;
    /** @type {Array<number>} */
    _size: Array<number>;
    /** @type {number} */
    _renderedScale: number;
    /** @type {Array<string>} */
    _lines: Array<string>;
    /** @type {object} */
    _textAreaSize: object;
    /** @type {string} */
    _bubbleType: string;
    /** @type {boolean} */
    _pointsLeft: boolean;
    /** @type {boolean} */
    _textDirty: boolean;
    /** @type {boolean} */
    _textureDirty: boolean;
    measurementProvider: CanvasMeasurementProvider;
    textWrapper: TextWrapper;
    /**
     * Set parameters for this text bubble.
     * @param {!string} type - either "say" or "think".
     * @param {!string} text - the text for the bubble.
     * @param {!boolean} pointsLeft - which side the bubble is pointing.
     */
    setTextBubble(type: string, text: string, pointsLeft: boolean): void;
    _text: string;
    /**
     * Re-style the canvas after resizing it. This is necessary to ensure proper text measurement.
     */
    _restyleCanvas(): void;
    /**
     * Update the array of wrapped lines and the text dimensions.
     */
    _reflowLines(): void;
    /**
     * Render this text bubble at a certain scale, using the current parameters, to the canvas.
     * @param {number} scale The scale to render the bubble at
     */
    _renderTextBubble(scale: number): void;
    updateSilhouette(scale?: number[]): void;
}
import Skin = require("./Skin");
import CanvasMeasurementProvider = require("./util/canvas-measurement-provider");
import TextWrapper = require("./util/text-wrapper");
