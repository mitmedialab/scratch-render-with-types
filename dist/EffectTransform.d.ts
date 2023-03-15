export = EffectTransform;
declare class EffectTransform {
    /**
     * Transform a color in-place given the drawable's effect uniforms.  Will apply
     * Ghost and Color and Brightness effects.
     * @param {Drawable} drawable The drawable to get uniforms from.
     * @param {Uint8ClampedArray} inOutColor The color to transform.
     * @param {number} [effectMask] A bitmask for which effects to use. Optional.
     * @returns {Uint8ClampedArray} dst filled with the transformed color
     */
    static transformColor(drawable: Drawable, inOutColor: Uint8ClampedArray, effectMask?: number): Uint8ClampedArray;
    /**
     * Transform a texture coordinate to one that would be select after applying shader effects.
     * @param {Drawable} drawable The drawable whose effects to emulate.
     * @param {twgl.v3} vec The texture coordinate to transform.
     * @param {twgl.v3} dst A place to store the output coordinate.
     * @return {twgl.v3} dst - The coordinate after being transform by effects.
     */
    static transformPoint(drawable: Drawable, vec: twgl.v3, dst: twgl.v3): twgl.v3;
}
