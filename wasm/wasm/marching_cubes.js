
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heapNext = heap.length;

function addHeapObject (obj) {
  if (heapNext === heap.length) heap.push(heap.length + 1);
  const idx = heapNext;
  heapNext = heap[idx];

  heap[idx] = obj;
  return idx;
}

function getObject (idx) { return heap[idx]; }

function dropObject (idx) {
  if (idx < 36) return;
  heap[idx] = heapNext;
  heapNext = idx;
}

function takeObject (idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0 () {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}

function getStringFromWasm0 (ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0 (arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
/**
 */
export class MarchingCubes {
  static __wrap (ptr) {
    const obj = Object.create(MarchingCubes.prototype);
    obj.ptr = ptr;

    return obj;
  }

  free () {
    const ptr = this.ptr;
    this.ptr = 0;

    wasm.__wbg_marchingcubes_free(ptr);
  }

  /**
   * @returns {MarchingCubes}
   */
  static new () {
    var ret = wasm.marchingcubes_new();
    return MarchingCubes.__wrap(ret);
  }

  /**
   * @param {Uint8Array} volume
   * @param {number} dimsX
   * @param {number} dimsY
   * @param {number} dimsZ
   */
  setVolume (volume, dimsX, dimsY, dimsZ) {
    var ptr0 = passArray8ToWasm0(volume, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.marchingcubes_set_volume(this.ptr, ptr0, len0, dimsX, dimsY, dimsZ);
  }

  /**
   * @param {number} isovalue
   * @returns {Float32Array}
   */
  marchingCubes (isovalue) {
    var ret = wasm.marchingcubes_marching_cubes(this.ptr, isovalue);
    return takeObject(ret);
  }
}

function load (module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') !== 'application/wasm') {
          console.warn('`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n', e);
        } else {
          throw e;
        }
      }
    }

    const bytes = module.arrayBuffer();
    return WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}

function init (input) {
  if (typeof input === 'undefined') {
    // input = url.replace(/\.js$/, '_bg.wasm');
    return;
  }
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_memory = function () {
    var ret = wasm.memory;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_buffer_eb5185aa4a8e9c62 = function (arg0) {
    var ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_a31622ccc380e8b4 = function (arg0, arg1, arg2) {
    var ret = new Float32Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };

  // if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
  //   input = fetch(input);
  // }

  return new Promise((resolve) => {
    fetch(input).then(response => response.arrayBuffer()).then((response) => {
      console.log('response ==>', response);
      load(response, imports).then((wasmSource) => {
        const { instance, module } = wasmSource;
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;
        resolve(true);
      });
    });
  });
  // const { instance, module } = await load(await input, imports);
}

export default init;
