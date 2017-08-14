namespace pixi_sound {

	/**
	 * Global namespace provided by the PixiJS project.
	 * @namespace PIXI
	 * @see https://github.com/pixijs/pixi.js
	 */
	export const sound = SoundLibrary.init();
}

(PIXI as any).sound = pixi_sound;
