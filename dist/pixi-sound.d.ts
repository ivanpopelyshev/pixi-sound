/// <reference types="pixi.js" />
declare module PIXI.sound {
    class Filter {
        destination: AudioNode;
        source: AudioNode;
        constructor(destination: AudioNode, source?: AudioNode);
        connect(destination: AudioNode): void;
        disconnect(): void;
        destroy(): void;
    }
}
declare module PIXI.sound {
    class Filterable {
        private _input;
        private _output;
        private _filters;
        constructor(input: AudioNode, output: AudioNode);
        readonly destination: AudioNode;
        filters: Filter[];
        destroy(): void;
    }
}
declare module PIXI.sound {
    interface Options {
        autoPlay?: boolean;
        preaload?: boolean;
        singleInstance?: boolean;
        volume?: number;
        speed?: number;
        complete?: CompleteCallback;
        loaded?: LoadedCallback;
        preload?: boolean;
        loop?: boolean;
        url?: string;
        source?: ArrayBuffer | HTMLAudioElement;
        sprites?: {
            [id: string]: SoundSpriteData;
        };
    }
    interface PlayOptions {
        start?: number;
        end?: number;
        speed?: number;
        loop?: boolean;
        volume?: number;
        sprite?: string;
        muted?: boolean;
        complete?: CompleteCallback;
        loaded?: LoadedCallback;
    }
    type LoadedCallback = (err: Error, sound?: Sound, instance?: IMediaInstance) => void;
    type CompleteCallback = (sound: Sound) => void;
    class Sound {
        private static _pool;
        isLoaded: boolean;
        isPlaying: boolean;
        autoPlay: boolean;
        singleInstance: boolean;
        preload: boolean;
        url: string;
        options: Options;
        media: IMedia;
        private _instances;
        private _sprites;
        private _autoPlayOptions;
        private _volume;
        private _paused;
        private _muted;
        private _loop;
        private _speed;
        static from(source: string | Options | ArrayBuffer | HTMLAudioElement): Sound;
        constructor(media: IMedia, options: Options);
        readonly context: IMediaContext;
        pause(): Sound;
        resume(): Sound;
        paused: boolean;
        speed: number;
        filters: Filter[];
        addSprites(alias: string, data: SoundSpriteData): SoundSprite;
        addSprites(sprites: {
            [id: string]: SoundSpriteData;
        }): SoundSprites;
        destroy(): void;
        removeSprites(alias?: string): Sound;
        readonly isPlayable: boolean;
        stop(): Sound;
        play(alias: string, callback?: CompleteCallback): IMediaInstance | Promise<IMediaInstance>;
        play(source?: string | PlayOptions | CompleteCallback, callback?: CompleteCallback): IMediaInstance | Promise<IMediaInstance>;
        refresh(): void;
        refreshPaused(): void;
        volume: number;
        muted: boolean;
        loop: boolean;
        private _preload(callback?);
        readonly instances: IMediaInstance[];
        readonly sprites: SoundSprites;
        readonly duration: number;
        autoPlayStart(): IMediaInstance;
        private _removeInstances();
        private _onComplete(instance);
        private _createInstance();
        private _poolInstance(instance);
    }
}
declare module PIXI.sound {
    type SoundMap = {
        [id: string]: Options | string | ArrayBuffer | HTMLAudioElement;
    };
    class SoundLibrary {
        static instance: SoundLibrary;
        private _useLegacy;
        private _context;
        private _webAudioContext;
        private _htmlAudioContext;
        private _sounds;
        constructor();
        readonly context: IMediaContext;
        static init(): SoundLibrary;
        global(): void;
        filtersAll: Filter[];
        readonly supported: boolean;
        add(alias: string, options: Options | string | ArrayBuffer | HTMLAudioElement | Sound): Sound;
        add(map: SoundMap, globalOptions?: Options): {
            [id: string]: Sound;
        };
        private _getOptions(source, overrides?);
        useLegacy: boolean;
        remove(alias: string): SoundLibrary;
        volumeAll: number;
        speedAll: number;
        togglePauseAll(): boolean;
        pauseAll(): SoundLibrary;
        resumeAll(): SoundLibrary;
        toggleMuteAll(): boolean;
        muteAll(): SoundLibrary;
        unmuteAll(): SoundLibrary;
        removeAll(): SoundLibrary;
        stopAll(): SoundLibrary;
        exists(alias: string, assert?: boolean): boolean;
        find(alias: string): Sound;
        play(alias: string, options?: PlayOptions | CompleteCallback | string): IMediaInstance | Promise<IMediaInstance>;
        stop(alias: string): Sound;
        pause(alias: string): Sound;
        resume(alias: string): Sound;
        volume(alias: string, volume?: number): number;
        speed(alias: string, speed?: number): number;
        duration(alias: string): number;
        destroy(): void;
    }
}
declare module PIXI.sound {
    const sound: SoundLibrary;
}
declare module PIXI.sound.filters {
    class DistortionFilter extends Filter {
        private _distortion;
        private _amount;
        constructor(amount?: number);
        amount: number;
        destroy(): void;
    }
}
declare module PIXI.sound.filters {
    class EqualizerFilter extends Filter {
        static F32: number;
        static F64: number;
        static F125: number;
        static F250: number;
        static F500: number;
        static F1K: number;
        static F2K: number;
        static F4K: number;
        static F8K: number;
        static F16K: number;
        bands: BiquadFilterNode[];
        bandsMap: {
            [id: number]: BiquadFilterNode;
        };
        constructor(f32?: number, f64?: number, f125?: number, f250?: number, f500?: number, f1k?: number, f2k?: number, f4k?: number, f8k?: number, f16k?: number);
        setGain(frequency: number, gain?: number): void;
        getGain(frequency: number): number;
        f32: number;
        f64: number;
        f125: number;
        f250: number;
        f500: number;
        f1k: number;
        f2k: number;
        f4k: number;
        f8k: number;
        f16k: number;
        reset(): void;
        destroy(): void;
    }
}
declare module PIXI.sound.filters {
    class MonoFilter extends Filter {
        private _merger;
        constructor();
        destroy(): void;
    }
}
declare module PIXI.sound.filters {
    class ReverbFilter extends Filter {
        private _convolver;
        private _seconds;
        private _decay;
        private _reverse;
        constructor(seconds?: number, decay?: number, reverse?: boolean);
        private _clamp(value, min, max);
        seconds: number;
        decay: number;
        reverse: boolean;
        private _rebuild();
        destroy(): void;
    }
}
declare module PIXI.sound.filters {
    class StereoFilter extends Filter {
        private _stereo;
        private _panner;
        private _pan;
        constructor(pan?: number);
        pan: number;
        destroy(): void;
    }
}
declare module PIXI.sound.filters {
    class TelephoneFilter extends Filter {
        constructor();
    }
}
declare module PIXI.sound.htmlaudio {
    class HTMLAudioContext extends PIXI.utils.EventEmitter implements IMediaContext {
        speed: number;
        muted: boolean;
        volume: number;
        paused: boolean;
        constructor();
        refresh(): void;
        refreshPaused(): void;
        filters: Filter[];
        readonly audioContext: AudioContext;
        toggleMute(): boolean;
        togglePause(): boolean;
        destroy(): void;
    }
}
declare module PIXI.sound.htmlaudio {
    class HTMLAudioInstance extends PIXI.utils.EventEmitter implements IMediaInstance {
        static PADDING: number;
        id: number;
        private _source;
        private _media;
        private _end;
        private _paused;
        private _muted;
        private _pausedReal;
        private _duration;
        private _start;
        private _playing;
        private _volume;
        private _speed;
        private _loop;
        constructor(parent: HTMLAudioMedia);
        readonly progress: number;
        paused: boolean;
        private _onPlay();
        private _onPause();
        init(media: HTMLAudioMedia): void;
        private _internalStop();
        stop(): void;
        speed: number;
        volume: number;
        loop: boolean;
        muted: boolean;
        refresh(): void;
        refreshPaused(): void;
        play(options: PlayOptions): void;
        private _onUpdate();
        private _onComplete();
        destroy(): void;
        toString(): string;
    }
}
declare module PIXI.sound.htmlaudio {
    class HTMLAudioMedia extends PIXI.utils.EventEmitter implements IMedia {
        parent: Sound;
        private _source;
        init(parent: Sound): void;
        create(): HTMLAudioInstance;
        readonly isPlayable: boolean;
        readonly duration: number;
        readonly context: HTMLAudioContext;
        filters: Filter[];
        destroy(): void;
        readonly source: HTMLAudioElement;
        load(callback?: LoadedCallback): void;
    }
}
declare module PIXI.sound {
    interface IMedia {
        filters: Filter[];
        readonly context: IMediaContext;
        readonly duration: number;
        readonly isPlayable: boolean;
        create(): IMediaInstance;
        init(sound: Sound): void;
        load(callback?: LoadedCallback): void;
        destroy(): void;
    }
}
declare module PIXI.sound {
    interface IMediaContext {
        muted: boolean;
        volume: number;
        speed: number;
        paused: boolean;
        filters: Filter[];
        toggleMute(): boolean;
        togglePause(): boolean;
        refresh(): void;
        destroy(): void;
        audioContext: AudioContext;
    }
}
declare module PIXI.sound {
    interface IMediaInstance {
        id: number;
        progress: number;
        paused: boolean;
        volume: number;
        speed: number;
        loop: boolean;
        muted: boolean;
        stop(): void;
        refresh(): void;
        refreshPaused(): void;
        init(parent: IMedia): void;
        play(options: PlayOptions): void;
        destroy(): void;
        toString(): string;
        once(event: string, fn: Function, context?: any): PIXI.utils.EventEmitter;
    }
}
declare module PIXI.sound.loaders {
    class LoaderMiddleware {
        static _sound: SoundLibrary;
        static install(sound: SoundLibrary): void;
        static legacy: boolean;
        private static resolve(resource, next);
        private static plugin(resource, next);
    }
}
declare module PIXI.sound {
    interface SoundSpriteData {
        start: number;
        end: number;
        speed?: number;
    }
    type SoundSprites = {
        [id: string]: SoundSprite;
    };
    class SoundSprite {
        parent: Sound;
        start: number;
        end: number;
        speed: number;
        duration: number;
        constructor(parent: Sound, options: SoundSpriteData);
        play(complete?: CompleteCallback): IMediaInstance | Promise<IMediaInstance>;
        destroy(): void;
    }
}
declare module PIXI.sound {
    interface RenderOptions {
        width?: number;
        height?: number;
        fill?: string | CanvasPattern | CanvasGradient;
    }
    type ExtensionMap = {
        [key: string]: boolean;
    };
    class SoundUtils {
        private static PLAY_ID;
        private static FORMAT_PATTERN;
        static extensions: string[];
        static supported: ExtensionMap;
        static resolveUrl(source: string | PIXI.loaders.Resource): string;
        static sineTone(hertz?: number, seconds?: number): Sound;
        static render(sound: Sound, options?: RenderOptions): PIXI.BaseTexture;
        static playOnce(url: string, callback?: (err?: Error) => void): string;
    }
    const utils: typeof SoundUtils;
}
declare module PIXI.sound.webaudio {
    class WebAudioContext extends Filterable implements IMediaContext {
        compressor: DynamicsCompressorNode;
        analyser: AnalyserNode;
        speed: number;
        muted: boolean;
        volume: number;
        events: PIXI.utils.EventEmitter;
        private _ctx;
        private _offlineCtx;
        private _paused;
        private _unlocked;
        constructor();
        private _unlock();
        playEmptySound(): void;
        static readonly AudioContext: typeof AudioContext;
        static readonly OfflineAudioContext: typeof OfflineAudioContext;
        destroy(): void;
        readonly audioContext: AudioContext;
        readonly offlineContext: OfflineAudioContext;
        paused: boolean;
        refresh(): void;
        refreshPaused(): void;
        toggleMute(): boolean;
        togglePause(): boolean;
        decode(arrayBuffer: ArrayBuffer, callback: (err?: Error, buffer?: AudioBuffer) => void): void;
    }
}
declare module PIXI.sound.webaudio {
    class WebAudioInstance extends PIXI.utils.EventEmitter implements IMediaInstance {
        id: number;
        private _media;
        private _paused;
        private _muted;
        private _pausedReal;
        private _volume;
        private _lastUpdate;
        private _elapsed;
        private _speed;
        private _end;
        private _loop;
        private _gain;
        private _duration;
        private _progress;
        private _updateListener;
        private _source;
        constructor(media: WebAudioMedia);
        stop(): void;
        speed: number;
        volume: number;
        muted: boolean;
        loop: boolean;
        refresh(): void;
        refreshPaused(): void;
        play(options: PlayOptions): void;
        private _toSec(time?);
        private _enabled;
        readonly progress: number;
        paused: boolean;
        destroy(): void;
        toString(): string;
        private _now();
        private _update(force?);
        init(media: WebAudioMedia): void;
        private _internalStop();
        private _onComplete();
    }
}
declare module PIXI.sound.webaudio {
    class WebAudioMedia implements IMedia {
        parent: Sound;
        source: ArrayBuffer;
        private _nodes;
        private _source;
        init(parent: Sound): void;
        destroy(): void;
        create(): WebAudioInstance;
        readonly context: WebAudioContext;
        readonly isPlayable: boolean;
        filters: Filter[];
        readonly duration: number;
        buffer: AudioBuffer;
        readonly nodes: WebAudioNodes;
        load(callback?: LoadedCallback): void;
        private _loadUrl(callback?);
        private _decode(arrayBuffer, callback?);
    }
}
declare module PIXI.sound.webaudio {
    interface SourceClone {
        source: AudioBufferSourceNode;
        gain: GainNode;
    }
    class WebAudioNodes extends Filterable {
        static BUFFER_SIZE: number;
        bufferSource: AudioBufferSourceNode;
        script: ScriptProcessorNode;
        gain: GainNode;
        analyser: AnalyserNode;
        context: WebAudioContext;
        constructor(context: WebAudioContext);
        destroy(): void;
        cloneBufferSource(): SourceClone;
    }
}
