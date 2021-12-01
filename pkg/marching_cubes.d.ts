/* tslint:disable */
/* eslint-disable */
/**
*/
export class MarchingCubes {
  free(): void;
/**
* @returns {MarchingCubes}
*/
  static new(): MarchingCubes;
/**
* @param {Uint8Array} volume
* @param {number} dims_x
* @param {number} dims_y
* @param {number} dims_z
*/
  set_volume(volume: Uint8Array, dims_x: number, dims_y: number, dims_z: number): void;
/**
* @param {number} isovalue
* @returns {Float32Array}
*/
  marching_cubes(isovalue: number): Float32Array;
/**
* @param {number} isovalue
* @param {number} isovalue1
* @returns {Float32Array}
*/
  marching_cubes_between(isovalue: number, isovalue1: number): Float32Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_marchingcubes_free: (a: number) => void;
  readonly marchingcubes_new: () => number;
  readonly marchingcubes_set_volume: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly marchingcubes_marching_cubes: (a: number, b: number) => number;
  readonly marchingcubes_marching_cubes_between: (a: number, b: number, c: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
