export = ShaderManager;
declare class ShaderManager {
    /**
     * @param {WebGLRenderingContext} gl WebGL rendering context to create shaders for
     * @constructor
     */
    constructor(gl: WebGLRenderingContext);
    _gl: WebGLRenderingContext;
    /**
     * The cache of all shaders compiled so far, filled on demand.
     * @type {Object<ShaderManager.DRAW_MODE, Array<ProgramInfo>>}
     * @private
     */
    private _shaderCache;
    /**
     * Fetch the shader for a particular set of active effects.
     * Build the shader if necessary.
     * @param {ShaderManager.DRAW_MODE} drawMode Draw normally, silhouette, etc.
     * @param {int} effectBits Bitmask representing the enabled effects.
     * @returns {ProgramInfo} The shader's program info.
     */
    getShader(drawMode: ShaderManager.DRAW_MODE, effectBits: int): ProgramInfo;
    /**
     * Build the shader for a particular set of active effects.
     * @param {ShaderManager.DRAW_MODE} drawMode Draw normally, silhouette, etc.
     * @param {int} effectBits Bitmask representing the enabled effects.
     * @returns {ProgramInfo} The new shader's program info.
     * @private
     */
    private _buildShader;
}
declare namespace ShaderManager {
    namespace EFFECT_INFO {
        namespace color {
            const uniformName: string;
            const mask: number;
            function converter(x: any): number;
            const shapeChanges: boolean;
        }
        namespace fisheye {
            const uniformName_1: string;
            export { uniformName_1 as uniformName };
            const mask_1: number;
            export { mask_1 as mask };
            export function converter_1(x: any): number;
            export { converter_1 as converter };
            const shapeChanges_1: boolean;
            export { shapeChanges_1 as shapeChanges };
        }
        namespace whirl {
            const uniformName_2: string;
            export { uniformName_2 as uniformName };
            const mask_2: number;
            export { mask_2 as mask };
            export function converter_2(x: any): number;
            export { converter_2 as converter };
            const shapeChanges_2: boolean;
            export { shapeChanges_2 as shapeChanges };
        }
        namespace pixelate {
            const uniformName_3: string;
            export { uniformName_3 as uniformName };
            const mask_3: number;
            export { mask_3 as mask };
            export function converter_3(x: any): number;
            export { converter_3 as converter };
            const shapeChanges_3: boolean;
            export { shapeChanges_3 as shapeChanges };
        }
        namespace mosaic {
            const uniformName_4: string;
            export { uniformName_4 as uniformName };
            const mask_4: number;
            export { mask_4 as mask };
            export function converter_4(x: any): number;
            export { converter_4 as converter };
            const shapeChanges_4: boolean;
            export { shapeChanges_4 as shapeChanges };
        }
        namespace brightness {
            const uniformName_5: string;
            export { uniformName_5 as uniformName };
            const mask_5: number;
            export { mask_5 as mask };
            export function converter_5(x: any): number;
            export { converter_5 as converter };
            const shapeChanges_5: boolean;
            export { shapeChanges_5 as shapeChanges };
        }
        namespace ghost {
            const uniformName_6: string;
            export { uniformName_6 as uniformName };
            const mask_6: number;
            export { mask_6 as mask };
            export function converter_6(x: any): number;
            export { converter_6 as converter };
            const shapeChanges_6: boolean;
            export { shapeChanges_6 as shapeChanges };
        }
    }
    /**
     * Mapping of each effect name to info about that effect.
     */
    type EFFECT_INFO = ShaderManager.Effect;
    const EFFECTS: any[];
    namespace DRAW_MODE {
        const _default: string;
        export { _default as default };
        export const straightAlpha: string;
        export const silhouette: string;
        export const colorMask: string;
        export const line: string;
        export const background: string;
    }
    /**
     * The available draw modes.
     */
    type DRAW_MODE = string;
    type Effect = {
        /**
         * - The bit in 'effectBits' representing the effect.
         */
        mask: int;
        /**
         * - A conversion function which takes a Scratch value (generally in the range
         * 0..100 or -100..100) and maps it to a value useful to the shader. This
         * mapping may not be reversible.
         */
        converter: Function;
        /**
         * - Whether the effect could change the drawn shape.
         */
        shapeChanges: boolean;
    };
}
