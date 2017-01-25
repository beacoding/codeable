! function(factory) {
    "function" == typeof define && define.amd ? define([], factory) : factory()
}(function() {
    "use strict";
    var prop, M = Math,
        N = Number,
        def = Object.defineProperty,
        mathXtra = {
            sinh: function(x) {
                if (0 === x) return x;
                var exp = M.exp(x);
                return exp / 2 - .5 / exp
            },
            cosh: function(x) {
                var exp = M.exp(x);
                return exp / 2 + .5 / exp
            },
            tanh: function(x) {
                if (0 === x) return x;
                if (0 > x) {
                    var exp = M.exp(2 * x);
                    return (exp - 1) / (exp + 1)
                }
                var exp = M.exp(-2 * x);
                return (1 - exp) / (1 + exp)
            },
            asinh: function(x) {
                return x === -(1 / 0) ? -(1 / 0) : M.log(x + M.sqrt(x * x + 1))
            },
            acosh: function(x) {
                return x >= 1 ? M.log(x + M.sqrt(x * x - 1)) : NaN
            },
            atanh: function(x) {
                return x >= -1 && 1 >= x ? M.log((1 + x) / (1 - x)) / 2 : NaN
            },
            expm1: function(x) {
                return 0 === x ? x : M.exp(x) - 1
            },
            log10: function(x) {
                return M.log(x) / M.LN10
            },
            log2: function(x) {
                return M.log(x) / M.LN2
            },
            log1p: function(x) {
                return 0 === x ? x : M.log(1 + x)
            },
            sign: function(x) {
                return isNaN(x) ? NaN : 0 > x ? -1 : x > 0 ? 1 : +x
            },
            cbrt: function(x) {
                return 0 === x ? x : 0 > x ? -M.pow(-x, 1 / 3) : M.pow(x, 1 / 3)
            },
            hypot: function(value1, value2) {
                for (var i = 0, s = 0, args = arguments; i < args.length; i++) s += args[i] * args[i];
                return M.sqrt(s)
            },
            trunc: function(x) {
                return 0 === x ? x : 0 > x ? M.ceil(x) : M.floor(x)
            },
            fround: "function" == typeof Float32Array ? function(arr) {
                return function(x) {
                    return arr[0] = x, arr[0]
                }
            }(new Float32Array(1)) : function(x) {
                return x
            },
            clz32: function(x) {
                if (x === -(1 / 0)) return 32;
                if (0 > x || (x |= 0) < 0) return 0;
                if (!x) return 32;
                for (var i = 31; x >>= 1;) i--;
                return i
            },
            imul: function(x, y) {
                return (0 | x) * (0 | y) | 0
            }
        },
        numXtra = {
            isNaN: function(x) {
                return "number" == typeof x && x !== x
            },
            isFinite: function(x) {
                return "number" == typeof x && x === x && x !== 1 / 0 && x !== -(1 / 0)
            },
            isInteger: function(x) {
                return "number" == typeof x && x !== 1 / 0 && x !== -(1 / 0) && M.floor(x) === x
            },
            isSafeInteger: function(x) {
                return "number" == typeof x && x > -9007199254740992 && 9007199254740992 > x && M.floor(x) === x
            },
            parseFloat: parseFloat,
            parseInt: parseInt
        },
        numConsts = {
            EPSILON: 2.220446049250313e-16,
            MAX_SAFE_INTEGER: 9007199254740991,
            MIN_SAFE_INTEGER: -9007199254740991
        };
    for (prop in mathXtra) "function" != typeof M[prop] && (M[prop] = mathXtra[prop]);
    for (prop in numXtra) "function" != typeof N[prop] && (N[prop] = numXtra[prop]);
    try {
        prop = {}, def(prop, 0, {});
        for (prop in numConsts) prop in N || def(N, prop, {
            value: numConsts[prop]
        })
    } catch (e) {
        for (prop in numConsts) prop in N || (N[prop] = numConsts[prop])
    }
});
var $builtinmodule = function(name) {
    function PyArray_Check(obj) {
        return obj && Sk.abstr.typeName(obj) === CLASS_NDARRAY
    }

    function get_ptr_simple(iter, coordinates) {
        var i, ret;
        for (ret = PyArray_DATA(iter.ao), i = 0; i < PyArray_NDIM(iter.ao); ++i) ret += coordinates[i] * iter.strides[i];
        return ret
    }

    function array_iter_base_init(it, ao) {
        var nd, i;
        for (nd = PyArray_NDIM(ao), it.ao = ao, it.size = PyArray_SIZE(ao), it.nd_m1 = nd - 1, it.factors = it.factors || [], it.dims_m1 = it.dims_m1 || [], it.strides = it.strides || [], it.backstrides = it.backstrides || [], it.bounds = it.bounds || [], it.limits = it.limits || [], it.limits_sizes = it.limits_sizes || [], it.factors[nd - 1] = 1, i = 0; nd > i; i++) it.dims_m1[i] = PyArray_DIMS(ao)[i] - 1, it.strides[i] = PyArray_STRIDES(ao)[i], it.backstrides[i] = it.strides[i] * it.dims_m1[i], i > 0 && (it.factors[nd - i - 1] = it.factors[nd - i] * PyArray_DIMS(ao)[nd - i]), it.bounds[i] = it.bounds[i] || [], it.bounds[i][0] = 0, it.bounds[i][1] = PyArray_DIMS(ao)[i] - 1, it.limits[i] = it.limits[i] || [], it.limits[i][0] = 0, it.limits[i][1] = PyArray_DIMS(ao)[i] - 1, it.limits_sizes[i] = it.limits[i][1] - it.limits[i][0] + 1;
        return it.translate = get_ptr_simple, PyArray_ITER_RESET(it), it
    }

    function PyArray_IterNew(obj) {
        var it, ao;
        if (!PyArray_Check(obj)) throw new Error("bad internal call");
        return ao = obj, it = Sk.abstr.iter(ao), null == it ? null : (array_iter_base_init(it, ao), it)
    }

    function PyArray_IterAllButAxis(obj, inaxis) {
        var arr, it, axis;
        if (!PyArray_Check(obj)) throw new Sk.builtin.ValueError("Numpy IterAllButAxis requires an ndarray.");
        if (arr = obj, it = PyArray_IterNew(arr), 0 == PyArray_NDIM(arr)) return it;
        if (0 > inaxis) {
            var i, minaxis = 0,
                minstride = 0;
            for (i = 0; 0 == minstride && i < PyArray_NDIM(arr);) minstride = PyArray_STRIDE(arr, i), i += 1;
            for (i = 1; i < PyArray_NDIM(arr); i++) PyArray_STRIDE(arr, i) > 0 && PyArray_STRIDE(arr, i) < minstride && (minaxis = 1, minstride = PyArray_STRIDE(arr, i));
            inaxis = minaxis
        }
        return axis = inaxis, it.contiguous = 0, 0 != it.size && (it.size /= PyArray_DIM(arr, axis)), it.dims_m1[axis] = 0, it.backstrides[axis] = 0, it
    }

    function _PyArray_ITER_NEXT1(it) {
        it.dataptr += it.strides[0], it.coordinates[0] += 1
    }

    function _PyArray_ITER_NEXT2(it) {
        it.coordinates[1] < it.dims_m1[1] ? (it.coordinates[1] += 1, it.dataptr += it.strides[1]) : (it.coordinates[1] = 0, it.coordinates[0] += 1, it.dataptr += it.strides[0] - it.backstrides[1])
    }

    function PyArray_ITER_NEXT(it) {
        if (it.index += 1, 0 == it.nd_m1) _PyArray_ITER_NEXT1(it);
        else if (1 == it.nd_m1) _PyArray_ITER_NEXT2(it);
        else {
            var __npy_i;
            for (__npy_i = it.nd_m1; __npy_i >= 0; __npy_i--) it.coordinates[__npy_i] < it.dims_m1[__npy_i] ? (it.coordinates[__npy_i] += 1, it.dataptr += it.strides[__npy_i]) : (it.coordinates[__npy_i] = 0, it.dataptr += it.backstrides[__npy_i])
        }
    }

    function PyArray_ITER_RESET(it) {
        it.index = 0, it.dataptr = 0, it.coordinates = [0, it.nd_m1 + 1]
    }

    function PyArray_DESCR(arr) {
        return arr.v.dtype
    }

    function PyArray_Scalar(data, descr, base) {
        var tmp = data[0],
            ret = descr(tmp);
        return ret
    }

    function PyArray_ToScalar(data, arr) {
        return PyArray_Scalar(data, PyArray_DESCR(arr), arr)
    }

    function PyArray_Return(mp) {
        if (null == mp) return null;
        if (!PyArray_Check(mp)) return mp;
        if (0 == PyArray_NDIM(mp)) {
            var ret = PyArray_ToScalar(PyArray_DATA(mp), mp);
            return ret
        }
        return mp
    }

    function PyArray_UNPACK_SEQUENCE(seqObj) {
        if (Sk.builtin.checkSequence(seqObj)) {
            var length = Sk.builtin.len(seqObj);
            length = Sk.ffi.remapToJs(length);
            var i, item, ret = [];
            for (i = 0; length > i; i++) item = seqObj.mp$subscript(i), ret.push(item);
            return ret
        }
        throw new Error("Internal API-CAll error occured in PyArray_UNPACK_SEQUENCE")
    }

    function PyArray_UNPACK_SHAPE(arr, shape) {
        var js_shape;
        if (Sk.builtin.checkNone(shape)) throw new Sk.builtin.ValueError("total size of new array must be unchanged");
        if (Sk.builtin.checkInt(shape)) js_shape = [Sk.ffi.remapToJs(shape)];
        else {
            if (!Sk.builtin.checkSequence(shape) || Sk.builtin.isinstance(shape, Sk.builtin.dict) != Sk.builtin.bool.false$) throw new Sk.builtin.TypeError("expected sequence object with len >= 0 or a single integer");
            js_shape = PyArray_UNPACK_SEQUENCE(shape)
        }
        var i, foundUnknownDimension = 0,
            unknownDimensionIndex = -1;
        for (i = 0; i < js_shape.length; i++) {
            if (!Sk.builtin.checkInt(js_shape[i])) throw new Sk.builtin.TypeError("an integer is required");
            js_shape[i] = Sk.ffi.remapToJs(js_shape[i]), -1 === js_shape[i] && (foundUnknownDimension += 1, unknownDimensionIndex = i)
        }
        if (foundUnknownDimension > 1) throw new Sk.builtin.ValueError("can only specify one unknown dimension");
        if (1 == foundUnknownDimension) {
            var knownDim, n_size;
            if (0 === unknownDimensionIndex) n_size = 1 === js_shape.length ? 1 : prod(js_shape.slice(1));
            else {
                var prod_shape = js_shape.slice();
                prod_shape.splice(unknownDimensionIndex, 1), n_size = prod(prod_shape)
            }
            knownDim = PyArray_SIZE(arr) / n_size, js_shape[unknownDimensionIndex] = knownDim
        }
        if (prod(js_shape) !== PyArray_SIZE(arr)) throw new Sk.builtin.ValueError("total size of new array must be unchanged");
        return js_shape
    }

    function PyArray_SIZE(arr) {
        if (PyArray_Check(arr)) return prod(arr.v.shape);
        throw new Error("Internal API-Call Error occured in PyArray_DATA.", arr)
    }

    function PyArray_DATA(arr) {
        if (PyArray_Check(arr)) return arr.v.buffer;
        throw new Error("Internal API-Call Error occured in PyArray_DATA.", arr)
    }

    function PyArray_STRIDES(arr) {
        if (PyArray_Check(arr)) return arr.v.strides;
        throw new Error("Internal API-Call Error occured in PyArray_STRIDES.", arr)
    }

    function PyArray_STRIDE(arr, n) {
        if (PyArray_Check(arr)) {
            var strides = arr.v.strides;
            return strides[n]
        }
        throw new Error("Internal API-Call Error occured in PyArray_STRIDE.", arr)
    }

    function PyArray_NDIM(arr) {
        if (PyArray_Check(arr)) return arr.v.shape.length;
        throw new Error("Internal API-Call Error occured in PyArray_NDIM.", arr)
    }

    function PyArray_DIMS(arr) {
        if (PyArray_Check(arr)) return arr.v.shape;
        throw new Error("Internal API-Call Error occured in PyArray_DIMS.", arr)
    }

    function PyArray_DIM(arr, n) {
        if (PyArray_Check(arr)) return arr.v.shape[n];
        throw new Error("Internal API-Call Error occured in PyArray_DIM.", arr)
    }

    function PyArray_NewShape(arr, shape, order) {
        if (PyArray_Check(arr)) {
            var py_shape = new Sk.builtin.tuple(shape.map(function(x) {
                    return new Sk.builtin.int_(x)
                })),
                py_order = Sk.ffi.remapToPy(order);
            return Sk.misceval.callsim(arr.reshape, arr, py_shape, py_order)
        }
        throw new Error("Internal API-Call Error occured in PyArray_NewShape.", arr)
    }

    function PyArray_FLAGS(arr) {
        if (PyArray_Check(arr)) return arr.v.flags;
        throw new Error("Internal API-Call Error occured in PyArray_NewShape.", arr)
    }

    function PyArray_Transpose(ap, permute) {
        var axis, flags, axes = [],
            permutation = [],
            reverse_permutation = [],
            ret = null;
        if (null == permute)
            for (n = PyArray_NDIM(ap), i = 0; i < n; i++) permutation[i] = n - 1 - i;
        else {
            if (n = permute.length, axes = permute, n != PyArray_NDIM(ap)) throw new Sk.builtin.ValueError("axes don't match array");
            for (i = 0; i < n; i++) reverse_permutation[i] = -1;
            for (i = 0; i < n; i++) {
                if (axis = axes[i], 0 > axis && (axis = PyArray_NDIM(ap) + axis), 0 > axis || axis >= PyArray_NDIM(ap)) throw new Sk.builtin.ValueError("invalid axis for this array");
                if (-1 != reverse_permutation[axis]) throw new Sk.builtin.ValueError("repeated axis in transpose");
                reverse_permutation[axis] = i, permutation[i] = axis
            }
        }
        for (flags = PyArray_FLAGS(ap), ret = PyArray_NewFromDescr(Sk.builtin.type(ap), PyArray_DESCR(ap), n, PyArray_DIMS(ap), null, null, flags, ap), i = 0; i < n; i++) PyArray_DIMS(ret)[i] = PyArray_DIMS(ap)[permutation[i]], PyArray_STRIDES(ret)[i] = PyArray_STRIDES(ap)[permutation[i]];
        var list = tolist(PyArray_DATA(ap), PyArray_DIMS(ret), PyArray_STRIDES(ret), 0, PyArray_DESCR(ret)),
            newArray = Sk.misceval.callsim(mod.array, list);
        return newArray
    }

    function OBJECT_dot(ip1, is1, ip2, is2, op, n, ignore) {
        var i, tmp1, tmp2, tmp3, tmp = null,
            ip1_i = 0,
            ip2_i = 0;
        for (i = 0; n > i; i++, ip1_i += is1, ip2_i += is2) {
            if (null == ip1[ip1_i] || null == ip2[ip2_i]) tmp1 = Sk.builtin.bool.false$;
            else if (tmp1 = Sk.abstr.numberBinOp(ip1[ip1_i], ip2[ip2_i], "Mult"), !tmp1) return;
            if (0 == i) tmp = tmp1;
            else {
                if (tmp2 = Sk.abstr.numberBinOp(tmp, tmp1, "Add"), !tmp2) return;
                tmp = tmp2
            }
        }
        return tmp3 = op, tmp2 = tmp3, tmp
    }

    function OBJECT_vdot(ip1, is1, ip2, is2, op, n, ignore) {
        var i, tmp0, tmp1, tmp2, tmp3, tmp = null,
            ip1_i = 0,
            ip2_i = 0;
        for (i = 0; n > i; i++, ip1_i += is1, ip2_i += is2) {
            if (null == ip1[ip1_i] || null == ip2[ip2_i]) tmp1 = Sk.builtin.bool.false$;
            else {
                if (tmp0 = Sk.misceval.callsim(ip1[ip1_i].conjugate, ip1[ip1_i]), null == tmp0) return;
                if (tmp1 = Sk.abstr.numberBinOp(tmp0, ip2[ip2_i], "Mult"), null == tmp1) return
            }
            if (0 === i) tmp = tmp1;
            else {
                if (tmp2 = Sk.abstr.numberBinOp(tmp, tmp1, "Add"), null == tmp2) return;
                tmp = tmp2
            }
        }
        tmp3 = op, tmp2 = tmp3, op[0] = tmp
    }

    function PyArray_DTypeFromObject(obj, maxdims) {
        function seqUnpacker(obj, mDims) {
            if (!Sk.builtin.checkSequence(obj)) return obj;
            var length = Sk.builtin.len(obj);
            if (Sk.builtin.asnum$(length) > 0) {
                var element = obj.mp$subscript(0);
                return mDims > 0 && Sk.builtin.checkSequence(element) ? seqUnpacker(element, mDims - 1) : element
            }
        }
        var dtype = null;
        if (null === obj) throw new Error("Internal API-Call Error occured in PyArray_ObjectType");
        null == maxdims && (maxdims = NPY_MAXDIMS);
        var element;
        if (Sk.builtin.checkNumber(obj)) element = obj;
        else if (Sk.builtin.checkSequence(obj)) {
            if (element = seqUnpacker(obj, maxdims), PyArray_Check(element)) return PyArray_DESCR(obj)
        } else if (PyArray_Check(obj)) {
            var descr = PyArray_DESCR(obj);
            if (null != descr) return descr;
            var length = Sk.builtin.len(obj);
            Sk.builtin.asnum$(length) > 0 && (element = PyArray_DATA(obj)[0])
        }
        try {
            dtype = Sk.builtin.type(element)
        } catch (e) {}
        return dtype
    }

    function Internal_DType_To_Num(dtype) {
        var name = Sk.abstr.typeName(dtype),
            num = Internal_TypeTable[name];
        return null == num ? -1 : num
    }

    function PyArray_DescrFromType(typenum) {
        switch (typenum) {
            case 3:
                return Sk.builtin.complex;
            case 2:
                return Sk.builtin.float_;
            case 1:
                return Sk.builtin.int_;
            case 0:
                return Sk.builtin.bool;
            default:
                return NPY_NOTYPE
        }
    }

    function PyArray_ObjectType(op, minimum_type) {
        var dtype;
        if (dtype = PyArray_DTypeFromObject(op, NPY_MAXDIMS), null == dtype) return NPY_DEFAULT_TYPE;
        var num = Internal_DType_To_Num(dtype);
        return num >= minimum_type ? num : minimum_type > num ? num >= 0 && 3 >= minimum_type ? minimum_type : NPY_NOTYPE : void 0
    }

    function PyArray_Cast_Obj(obj, dtype) {
        return dtype instanceof Sk.builtin.none && Sk.builtin.checkNone(obj) ? obj : Sk.misceval.callsim(dtype, obj)
    }

    function PyArray_CheckExact(obj) {
        return PyArray_Check(obj)
    }

    function PyArray_CheckAnyScalarExact(obj) {}

    function PyArray_GetPriority(obj, default_) {
        var ret, priority = NPY_PRIORITY;
        return PyArray_CheckExact(obj) ? priority : PyArray_CheckAnyScalarExact(obj) ? NPY_SCALAR_PRIORITY : (ret = Sk.builtin.getattr(obj, new Sk.builtin.str("__array_priority__"), Sk.builtin.none.none$), Sk.builtin.checkNone(ret) ? default_ : (ret = Sk.builtin["float"](ret), priority = Sk.ffi.remapToJs(ret)))
    }

    function PyArray_NewFromDescr_int(subtype, descr, nd, dims, strides, data, flags, obj, zeroed) {
        var fa, i, sd, size;
        if (descr.subarray) throw new Error("subarrays not supported");
        if (nd > NPY_MAXDIMS) throw new Sk.builtin.ValueError("number of dimensions must be within [0, " + NPY_MAXDIMS + "]");
        if (size = 1, sd = 1, 0 == sd) throw new Sk.builtin.TypeError("Empty data-type");
        for (i = 0; nd > i; i++) {
            var dim = dims[i];
            if (null != dim) {
                if (0 > dim) throw new Sk.builtin.ValueError("negative dimensions are not allowed");
                if (size = dim * size, size == Number.MAX_VALUE) throw new Sk.builtin.ValueError("array is too big.")
            }
        }
        fa = {}, fa.nd = nd, fa.dimensions = null, fa.data = null, null == data ? (fa.flags = NPY_ARRAY_DEFAULT, flags && flags && (fa.flags |= NPY_ARRAY_F_CONTIGUOUS, nd > 1 && (fa.flags &= ~NPY_ARRAY_C_CONTIGUOUS), flags = NPY_ARRAY_F_CONTIGUOUS)) : fa.flags = flags & ~NPY_ARRAY_UPDATEIFCOPY, fa.descr = descr, fa.base = null, fa.weakreflist = null, nd > 0 ? (fa.dimensions = [], fa.strides = [], dims.map(function(d) {
            fa.dimensions.push(d)
        }), null == strides ? sd = _array_fill_strides(fa.strides, dims, nd, sd, flags, fa.flags) : (strides.map(function(s) {
            fa.strides.push(s)
        }), sd *= size)) : (fa.dimensions = null, fa.strides = null, fa.flags |= NPY_ARRAY_F_CONTIGUOUS), null == data ? (0 == sd && (sd = 1), data = zeroed ? [] : [], fa.flags |= NPY_ARRAY_OWNDATA) : fa.flags &= ~NPY_ARRAY_OWNDATA, fa.data = data;
        var pyShape = new Sk.builtin.tuple((fa.dimensions || []).map(function(d) {
                return new Sk.builtin.int_(d)
            })),
            pyBuffer = new Sk.builtin.list(fa.data),
            dtype = fa.descr;
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], pyShape, dtype, pyBuffer)
    }

    function _array_fill_strides(strides, dims, nd, itemsize, infalg, objflags) {
        var i, not_cf_contig = 0,
            nod = 0;
        for (i = 0; nd > i; i++)
            if (1 != dims[i]) {
                if (nod) {
                    not_cf_contig = 1;
                    break
                }
                nod = 1
            }
        for (i = nd - 1; i >= 0; i--) strides[i] = itemsize, dims[i] ? itemsize *= dims[i] : not_cf_contig = 0, 1 == dims[i] && (strides[i] = NPY_MAX_INTP);
        return itemsize
    }

    function PyArray_NewFromDescr(subtype, descr, nd, dims, strides, data, flags, obj) {
        return PyArray_NewFromDescr_int(subtype, descr, nd, dims, strides, data, flags, obj, 0)
    }

    function PyArray_New(subtype, nd, dims, type_num, strides, data, itemsize, flags, obj) {
        var descr, _new;
        return descr = PyArray_DescrFromType(type_num), null == descr ? null : _new = PyArray_NewFromDescr(subtype, descr, nd, dims, strides, data, flags, obj)
    }

    function new_array_for_sum(ap1, ap2, out, nd, dimensions, typenum) {
        var ret, subtype, prior1, prior2;
        if (Sk.builtin.type(ap2) != Sk.builtin.type(ap1) ? (prior = PyArray_GetPriority(ap2, 0), prior = PyArray_GetPriority(ap1, 0), subtype = prior2 > prior1 ? Sk.builtin.type(ap2) : Sk.builtin.type(ap1)) : (prior1 = prior2 = 0, subtype = Sk.builtin.type(ap1)), null != out) throw new Error('new_array_for_sum does not support "out" parameter');
        return ret = PyArray_New(subtype, nd, dimensions, typenum, null, null, 0, 0, prior2 > prior1 ? ap2 : ap1)
    }

    function PyArray_FromAny(op, dtype, min_depth, max_depth, requirements, context) {
        if (null == op) throw new Error('Internal PyArray_FromAny API-Call error. "op" must not be null.');
        (null == dtype || Sk.builtin.checkNone(dtype)) && (dtype = PyArray_DTypeFromObject(op, NPY_MAXDIMS), null == dtype && (dtype = PyArray_DescrFromType(NPY_DEFAULT_TYPE)));
        var elements = [],
            state = {};
        for (state.level = 0, state.shape = [], PyArray_Check(op) ? (elements = PyArray_DATA(op), state = {}, state.level = 0, state.shape = PyArray_DIMS(op)) : unpack(op, elements, state), i = 0; i < elements.length; i++) elements[i] = PyArray_Cast_Obj(elements[i], dtype);
        var ndmin = Sk.builtin.asnum$(min_depth);
        if (ndmin >= 0 && ndmin > state.shape.length) {
            var _ndmin_array = [];
            for (i = 0; i < ndmin - state.shape.length; i++) _ndmin_array.push(1);
            state.shape = _ndmin_array.concat(state.shape)
        }
        var _shape = new Sk.builtin.tuple(state.shape.map(function(x) {
                return new Sk.builtin.int_(x)
            })),
            _buffer = new Sk.builtin.list(elements);
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], _shape, dtype, _buffer)
    }

    function convert_shape_to_string(n, vals, ending) {
        var i, ret, tmp;
        for (i = 0; n > i && vals[i] < 0; i++);
        if (i === n) return Sk.abstr.numberBinOp(new Sk.builtin.str("()%s"), new Sk.builtin.str(ending), "Mod");
        for (ret = Sk.abstr.numberBinOp(new Sk.builtin.str("(%i"), vals[i++], "Mod"); n > i; ++i) tmp = vals[i] < 0 ? new Sk.builtin.str(",newaxis") : Sk.abstr.numberBinOp(new Sk.builtin.str(",%i"), vals[i], "Mod"), ret = Sk.abstr.numberBinOp(ret, tmp, "Add");
        return tmp = 1 == i ? Sk.abstr.numberBinOp(new Sk.builtin.str(",)%s"), new Sk.builtin.str(ending), "Mod") : Sk.abstr.numberBinOp(new Sk.builtin.str(")%s"), new Sk.builtin.str(ending), "Mod"), ret = Sk.abstr.numberBinOp(ret, tmp, "Add")
    }

    function dot_alignment_error(a, i, b, j) {
        var errmsg = null,
            format = null,
            fmt_args = null,
            i_obj = null,
            j_obj = null,
            shape1 = null,
            shape2 = null,
            shape1_i = null,
            shape2_j = null;
        if (format = new Sk.builtin.str("shapes %s and %s not aligned: %d (dim %d) != %d (dim %d)"), shape1 = convert_shape_to_string(PyArray_NDIM(a), PyArray_DIMS(a), ""), shape2 = convert_shape_to_string(PyArray_NDIM(b), PyArray_DIMS(b), ""), i_obj = new Sk.builtin.int_(i), j_obj = new Sk.builtin.int_(j), shape1_i = new Sk.builtin.int_(PyArray_DIM(a, i)), shape2_j = new Sk.builtin.int_(PyArray_DIM(b, j)), format && shape1 && shape2 && i_obj && j_obj && shape1_i && shape2_j) throw fmt_args = new Sk.builtin.tuple([shape1, shape2, shape1_i, i_obj, shape2_j, j_obj]), errmsg = Sk.abstr.numberBinOp(format, fmt_args, "Mod"), null != errmsg ? new Sk.builtin.ValueError(errmsg) : new Sk.builtin.ValueError("shapes are not aligned")
    }

    function MatrixProdcut2(op1, op2, out) {
        var ap1, ap2, i, j, l, typenum, nd, axis, matchDim, is1, is2, os, op, dot, ret = null,
            dimensions = new Array,
            typec = null;
        if (typenum = PyArray_ObjectType(op1, 0), typenum = PyArray_ObjectType(op2, typenum), typec = PyArray_DescrFromType(typenum), null === typec) throw new Sk.builtin.ValueError("Cannot find a common data type.");
        if (ap1 = PyArray_FromAny(op1, typec, 0, 0, "NPY_ARRAY_ALINGED", null), ap2 = PyArray_FromAny(op2, typec, 0, 0, "NPY_ARRAY_ALINGED", null), 0 == PyArray_NDIM(ap1) || 0 == PyArray_NDIM(ap2)) return ret = 0 == PyArray_NDIM(ap1) ? ap1 : ap2, ret = ret.nb$multiply.call(ap1, ap2);
        if (l = PyArray_DIMS(ap1)[PyArray_NDIM(ap1) - 1], matchDim = PyArray_NDIM(ap2) > 1 ? PyArray_NDIM(ap2) - 2 : 0, PyArray_DIMS(ap2)[matchDim] != l && dot_alignment_error(ap1, PyArray_NDIM(ap1) - 1, ap2, matchDim), nd = PyArray_NDIM(ap1) + PyArray_NDIM(ap2) - 2, nd > NPY_MAXDIMS) throw new Sk.builtin.ValueError("dot: too many dimensions in result");
        for (j = 0, i = 0; i < PyArray_NDIM(ap1) - 1; i++) dimensions[j++] = PyArray_DIMS(ap1)[i];
        for (i = 0; i < PyArray_NDIM(ap2) - 2; i++) dimensions[j++] = PyArray_DIMS(ap2)[i];
        switch (PyArray_NDIM(ap2) > 1 && (dimensions[j++] = PyArray_DIMS(ap2)[PyArray_NDIM(ap2) - 1]), is1 = PyArray_STRIDES(ap1)[PyArray_NDIM(ap1) - 1], is2 = PyArray_STRIDES(ap2)[matchDim], ret = new_array_for_sum(ap1, ap2, out, nd, dimensions, typenum), typenum) {
            case 0:
            case 1:
            case 2:
            case 3:
                dot = OBJECT_dot;
                break;
            default:
                throw new Sk.builtin.ValueError("dot not available for this type")
        }
        if (op = PyArray_DATA(ret), os = 1, axis = PyArray_NDIM(ap1) - 1, it1 = PyArray_IterAllButAxis(ap1, axis), null == it1) return null;
        if (it2 = PyArray_IterAllButAxis(ap2, matchDim), null == it2) return null;
        for (var it1DeRefDataPtr, it2DeRefDataPtr, op_i = 0; it1.index < it1.size;) {
            for (it1DeRefDataPtr = PyArray_DATA(it1.ao).slice(it1.dataptr); it2.index < it2.size;) it2DeRefDataPtr = PyArray_DATA(it2.ao).slice(it2.dataptr), op[op_i] = dot(it1DeRefDataPtr, is1, it2DeRefDataPtr, is2, null, l, ret), op_i += os, PyArray_ITER_NEXT(it2);
            PyArray_ITER_NEXT(it1), PyArray_ITER_RESET(it2)
        }
        return ret
    }

    function PyTypeNum_ISFLEXIBLE(type) {
        return !1
    }

    function PyTypeNum_ISEXTENDED(type) {
        return PyTypeNum_ISFLEXIBLE
    }

    function dump_data(strPtr, nPtr, max_n, data, nd, dimensions, strides, self) {
        var i, N, op = (PyArray_DESCR(self), null),
            sp = null,
            ret = 0;
        if (0 === nd) op = data[0], sp = Sk.builtin.repr(op), N = sp.v.length, nPtr.n += N, strPtr.str += sp.v;
        else {
            for (strPtr.str += "[", nPtr.n += 1, i = 0; i < dimensions[0]; i++) {
                var newData = data.slice(strides[0] * i),
                    newDimensions = dimensions.slice(1),
                    newStrides = strides.slice(1);
                dump_data(strPtr, nPtr, max_n, newData, nd - 1, newDimensions, newStrides, self), i < dimensions[0] - 1 && (strPtr.str += ",", strPtr.str += " ", nPtr.n += 2)
            }
            strPtr.str += "]", nPtr.n += 1
        }
        return ret
    }

    function array_repr_builtin(self, repr) {
        var ret, string, format, fmt_args, n = 0,
            max_n = 0,
            nPtr = {
                n: n
            },
            strPtr = {
                str: ""
            };
        return dump_data(strPtr, nPtr, max_n, PyArray_DATA(self), PyArray_NDIM(self), PyArray_DIMS(self), PyArray_STRIDES(self), self), string = new Sk.builtin.str(strPtr.str), repr ? (PyTypeNum_ISEXTENDED(self) ? (format = new Sk.builtin.str("array(%s, '%s')"), fmt_args = new Sk.builtin.tuple([string, PyArray_DESCR(self)]), ret = Sk.abstr.numberBinOp(format, fmt_args, "Mod")) : (format = new Sk.builtin.str("array(%s, '%s')"), fmt_args = new Sk.builtin.tuple([string, PyArray_DESCR(self)]), ret = Sk.abstr.numberBinOp(format, fmt_args, "Mod")), ret) : string
    }

    function remapToJs_shallow(obj, shallow) {
        var _shallow = shallow || !0;
        if (obj instanceof Sk.builtin.list) {
            if (_shallow) return obj.v;
            for (var ret = [], i = 0; i < obj.v.length; ++i) ret.push(Sk.ffi.remapToJs(obj.v[i]));
            return ret
        }
        return obj instanceof Sk.builtin.float_ ? Sk.builtin.asnum$nofloat(obj) : Sk.ffi.remapToJs(obj)
    }

    function unpack(py_obj, buffer, state) {
        if (PyArray_Check(py_obj) && (py_obj = Sk.misceval.callsim(py_obj.tolist, py_obj)), py_obj instanceof Sk.builtin.list || py_obj instanceof Sk.builtin.tuple) {
            var py_items = remapToJs_shallow(py_obj);
            state.level += 1, state.level > state.shape.length && state.shape.push(py_items.length);
            var i, len = py_items.length;
            for (i = 0; len > i; i++) unpack(py_items[i], buffer, state);
            state.level -= 1
        } else buffer.push(py_obj)
    }

    function computeStrides(shape) {
        var strides = shape.slice(0);
        strides.reverse();
        for (var temp, prod = 1, i = 0, len = strides.length; len > i; i++) temp = strides[i], strides[i] = prod, prod *= temp;
        return strides.reverse()
    }

    function computeOffset(strides, index) {
        for (var offset = 0, k = 0, len = strides.length; len > k; k++) offset += strides[k] * index[k];
        return offset
    }

    function prod(numbers) {
        var i, size = 1;
        for (i = 0; i < numbers.length; i++) size *= numbers[i];
        return size
    }

    function tolistrecursive(buffer, shape, strides, startdim, dtype) {
        var i, n, stride, arr, item;
        if (startdim >= shape.length) return buffer[0];
        for (n = shape[startdim], stride = strides[startdim], arr = [], i = 0; n > i; i++) item = tolistrecursive(buffer, shape, strides, startdim + 1, dtype), arr.push(item), buffer = buffer.slice(stride);
        return new Sk.builtin.list(arr)
    }

    function tolist(buffer, shape, strides, dtype) {
        var buffer_copy = buffer.slice(0);
        return tolistrecursive(buffer_copy, shape, strides, 0, dtype)
    }

    function callTrigonometricFunc(x, op) {
        var res, num;
        if ((x instanceof Sk.builtin.list || x instanceof Sk.builtin.tuple) && (x = Sk.misceval.callsim(mod.array, x)), PyArray_Check(x)) {
            var _buffer = PyArray_DATA(x).map(function(value) {
                    return num = Sk.builtin.asnum$(value), res = op.call(null, num), new Sk.builtin.float_(res)
                }),
                shape = new Sk.builtin.tuple(PyArray_DIMS(x).map(function(d) {
                    return new Sk.builtin.int_(d)
                }));
            return buffer = new Sk.builtin.list(_buffer), Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(x), buffer)
        }
        if (Sk.builtin.checkNumber(x)) return num = Sk.builtin.asnum$(x), res = op.call(null, num), new Sk.builtin.float_(res);
        throw new Sk.builtin.TypeError('Unsupported argument type for "x"')
    }

    function compareLogical(binOp, x1, x2, out) {
        var ret, shape, a1 = PyArray_FromAny(x1),
            a2 = PyArray_FromAny(x2),
            data1 = PyArray_DATA(a1),
            data2 = PyArray_DATA(a2),
            buf = [];
        if (!(PyArray_Check(x1) || Sk.builtin.checkSequence(x1) || PyArray_Check(x2) || Sk.builtin.checkSequence(x2))) return Sk.builtin.bool(Sk.misceval.richCompareBool(x1, x2, binOp));
        if (PyArray_SIZE(a1) !== PyArray_SIZE(a2))
            if (1 === PyArray_SIZE(a1)) {
                var i, val = data1[0];
                for (i = 1; i < PyArray_SIZE(a2); i++) data1.push(val);
                shape = PyArray_DIMS(a2)
            } else {
                if (1 !== PyArray_SIZE(a2)) throw new Sk.builtin.ValueError("operands could not be broadcast together with shapes");
                var i, val = data2[0];
                for (i = 1; i < PyArray_SIZE(a1); i++) data2.push(val);
                shape = PyArray_DIMS(a1)
            }
        else shape = PyArray_DIMS(a1);
        if (void 0 != out && !Sk.builtin.checkNone(out)) throw new ValueError('"out" parameter not supported');
        for (i = 0; i < data1.length; i++) buf.push(Sk.builtin.bool(Sk.misceval.richCompareBool(data1[i], data2[i], binOp)));
        return ret = PyArray_FromAny(new Sk.builtin.list(buf)), ret = PyArray_NewShape(ret, shape, null), PyArray_Return(ret)
    }
    var CLASS_NDARRAY = "numpy.ndarray",
        NPY_MAX_INT = Number.MAX_SAFE_INTEGER,
        NPY_MAX_INTP = NPY_MAX_INT,
        NPY_MAXDIMS = 32,
        NPY_PRIORITY = 0,
        NPY_SCALAR_PRIORITY = -1e6,
        NPY_ARRAY_C_CONTIGUOUS = 1,
        NPY_ARRAY_F_CONTIGUOUS = 2,
        NPY_ARRAY_OWNDATA = 4,
        NPY_ARRAY_ALIGNED = 256,
        NPY_ARRAY_WRITEABLE = 1024,
        NPY_ARRAY_BEHAVED = NPY_ARRAY_ALIGNED | NPY_ARRAY_WRITEABLE,
        NPY_ARRAY_CARRAY = NPY_ARRAY_C_CONTIGUOUS | NPY_ARRAY_BEHAVED,
        NPY_ARRAY_DEFAULT = NPY_ARRAY_CARRAY,
        NPY_ARRAY_UPDATEIFCOPY = 4096,
        numpy = function() {
            this.math = Math
        };
    numpy.prototype.arange = function(start, stop, step) {
        void 0 === step && (step = 1), start *= 1, stop *= 1, step *= 1;
        for (var res = [], i = start; stop > i; i += step) res.push(i);
        return res
    };
    var NPY_NOTYPE = null,
        NPY_DEFAULT_TYPE = 2,
        Internal_TypeTable = {
            complex: 3,
            complex_: 3,
            complex64: 3,
            "float": 2,
            float_: 2,
            float64: 2,
            "int": 1,
            int_: 1,
            int64: 1,
            bool: 0,
            bool_: 0
        },
        PyArray_StrFunction = null,
        np = new numpy,
        mod = {};
    mod.__doc__ = new Sk.builtin.str("\nNumPy\n=====\n\nProvides\n  1. An array object of arbitrary homogeneous items\n  2. Fast mathematical operations over arrays\n  3. Linear Algebra, Fourier Transforms, Random Number Generation\n\nHow to use the documentation\n----------------------------\nDocumentation is available in two forms: docstrings provided\nwith the code, and a loose standing reference guide, available from\n`the NumPy homepage <http://www.scipy.org>`_.\n\nWe recommend exploring the docstrings using\n`IPython <http://ipython.scipy.org>`_, an advanced Python shell with\nTAB-completion and introspection capabilities.  See below for further\ninstructions.\n\nThe docstring examples assume that `numpy` has been imported as `np`::\n\n  >>> import numpy as np\n\nCode snippets are indicated by three greater-than signs::\n\n  >>> x = 42\n  >>> x = x + 1\n\nUse the built-in ``help`` function to view a function's docstring::\n\n  >>> help(np.sort)\n  ... # doctest: +SKIP\n\nFor some objects, ``np.info(obj)`` may provide additional help.  This is\nparticularly true if you see the line \"Help on ufunc object:\" at the top\nof the help() page.  Ufuncs are implemented in C, not Python, for speed.\nThe native Python help() does not know how to view their help, but our\nnp.info() function does.\n\nTo search for documents containing a keyword, do::\n\n  >>> np.lookfor('keyword')\n  ... # doctest: +SKIP\n\nGeneral-purpose documents like a glossary and help on the basic concepts\nof numpy are available under the ``doc`` sub-module::\n\n  >>> from numpy import doc\n  >>> help(doc)\n  ... # doctest: +SKIP\n\nAvailable subpackages\n---------------------\ndoc\n    Topical documentation on broadcasting, indexing, etc.\nlib\n    Basic functions used by several sub-packages.\nrandom\n    Core Random Tools\nlinalg\n    Core Linear Algebra Tools\nfft\n    Core FFT routines\npolynomial\n    Polynomial tools\ntesting\n    Numpy testing tools\nf2py\n    Fortran to Python Interface Generator.\ndistutils\n    Enhancements to distutils with support for\n    Fortran compilers support and more.\n\nUtilities\n---------\ntest\n    Run numpy unittests\nshow_config\n    Show numpy build configuration\ndual\n    Overwrite certain functions with high-performance Scipy tools\nmatlib\n    Make everything matrices.\n__version__\n    Numpy version string\n\nViewing documentation using IPython\n-----------------------------------\nStart IPython with the NumPy profile (``ipython -p numpy``), which will\nimport `numpy` under the alias `np`.  Then, use the ``cpaste`` command to\npaste examples into the shell.  To see which functions are available in\n`numpy`, type ``np.<TAB>`` (where ``<TAB>`` refers to the TAB key), or use\n``np.*cos*?<ENTER>`` (where ``<ENTER>`` refers to the ENTER key) to narrow\ndown the list.  To view the docstring for a function, use\n``np.cos?<ENTER>`` (to view the docstring) and ``np.cos??<ENTER>`` (to view\nthe source code).\n\nCopies vs. in-place operation\n-----------------------------\nMost of the functions in `numpy` return a copy of the array argument\n(e.g., `np.sort`).  In-place versions of these functions are often\navailable as array methods, i.e. ``x = np.array([1,2,3]); x.sort()``.\nExceptions to this rule are documented.\n\n");
    var ndarray_f = function($gbl, $loc) {
        function makeNumericBinaryOpLhs(operation) {
            return function(self, other) {
                var lhs, rhs, buffer, _buffer, shape, i;
                if (PyArray_Check(other))
                    for (lhs = PyArray_DATA(self), rhs = PyArray_DATA(other), _buffer = [], i = 0, len = lhs.length; i < len; i++) _buffer[i] = Sk.abstr.binary_op_(lhs[i], rhs[i], operation);
                else
                    for (lhs = PyArray_DATA(self), _buffer = [], i = 0, len = lhs.length; i < len; i++) _buffer[i] = Sk.abstr.numberBinOp(lhs[i], other, operation);
                return shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function(x) {
                    return new Sk.builtin.int_(x)
                })), buffer = new Sk.builtin.list(_buffer), Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self), buffer)
            }
        }

        function makeNumericBinaryOpInplace(operation) {
            return function(self, other) {
                var lhs, rhs, i;
                if (PyArray_Check(other))
                    for (lhs = PyArray_DATA(self), rhs = PyArray_DATA(other), i = 0, len = lhs.length; i < len; i++) lhs[i] = Sk.abstr.binary_op_(lhs[i], rhs[i], operation);
                else
                    for (lhs = PyArray_DATA(self), i = 0, len = lhs.length; i < len; i++) lhs[i] = Sk.abstr.numberBinOp(lhs[i], other, operation);
                return self
            }
        }

        function makeNumericBinaryOpRhs(operation) {
            return function(self, other) {
                for (var rhsBuffer = PyArray_DATA(self), _buffer = [], i = 0, len = rhsBuffer.length; len > i; i++) _buffer[i] = Sk.abstr.numberBinOp(other, rhsBuffer[i], operation);
                var shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function(x) {
                    return new Sk.builtin.int_(x)
                }));
                return buffer = new Sk.builtin.list(_buffer), Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self), buffer)
            }
        }

        function makeUnaryOp(operation) {
            return function(self) {
                var _buffer = PyArray_DATA(self).map(function(value) {
                        return Sk.abstr.numberUnaryOp(value, operation)
                    }),
                    shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function(x) {
                        return new Sk.builtin.int_(x)
                    }));
                return buffer = new Sk.builtin.list(_buffer), Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self), buffer)
            }
        }
        $loc.__init__ = new Sk.builtin.func(function(self, shape, dtype, buffer, offset, strides, order) {
            var ndarrayJs = {};
            ndarrayJs.shape = Sk.ffi.remapToJs(shape), ndarrayJs.strides = computeStrides(ndarrayJs.shape), ndarrayJs.dtype = dtype || Sk.builtin.none.none$, ndarrayJs.flags = 0, buffer && buffer instanceof Sk.builtin.list && (ndarrayJs.buffer = buffer.v), self.v = ndarrayJs, self.tp$name = CLASS_NDARRAY
        }), $loc._internalGenericGetAttr = Sk.builtin.object.prototype.GenericSetAttr, $loc.__getattr__ = new Sk.builtin.func(function(self, name) {
            if (null != name && (Sk.builtin.checkString(name) || "string" == typeof name)) {
                var _name = name;
                switch (Sk.builtin.checkString(name) && (_name = Sk.ffi.remapToJs(name)), _name) {
                    case "ndmin":
                        return new Sk.builtin.int_(PyArray_NDIM(self));
                    case "dtype":
                        return self.v.dtype;
                    case "shape":
                        return new Sk.builtin.tuple(PyArray_DIMS(self).map(function(x) {
                            return new Sk.builtin.int_(x)
                        }));
                    case "strides":
                        return new Sk.builtin.tuple(PyArray_STRIDES(self).map(function(x) {
                            return new Sk.builtin.int_(x)
                        }));
                    case "size":
                        return new Sk.builtin.int_(PyArray_SIZE(self));
                    case "data":
                        return new Sk.builtin.list(PyArray_DATA(self));
                    case "T":
                        return PyArray_NDIM(self) < 2 ? self : Sk.misceval.callsim(self.transpose, self)
                }
            }
            return Sk.misceval.callsim(self.__getattribute__, self, name)
        }), $loc.__setattr__ = new Sk.builtin.func(function(self, name, value) {
            if (null != name && (Sk.builtin.checkString(name) || "string" == typeof name)) {
                var _name = name;
                switch (Sk.builtin.checkString(name) && (_name = Sk.ffi.remapToJs(name)), _name) {
                    case "shape":
                        var js_shape = PyArray_UNPACK_SHAPE(self, value);
                        return self.v.strides = computeStrides(js_shape), void(self.v.shape = js_shape)
                }
            }
            throw new Sk.builtin.AttributeError("'ndarray' object attribute '" + name + "' is readonly")
        }), $loc.tolist = new Sk.builtin.func(function(self) {
            var ndarrayJs = Sk.ffi.remapToJs(self),
                list = tolist(ndarrayJs.buffer, ndarrayJs.shape, ndarrayJs.strides, ndarrayJs.dtype);
            return list
        }), $loc.reshape = new Sk.builtin.func(function(self, shape, order) {
            Sk.builtin.pyCheckArgs("reshape", arguments, 2, 3);
            var js_shape = PyArray_UNPACK_SHAPE(self, shape),
                py_shape = Sk.ffi.remapToPy(js_shape);
            return Sk.misceval.callsim(mod[CLASS_NDARRAY], py_shape, PyArray_DESCR(self), new Sk.builtin.list(PyArray_DATA(self)));
        }), $loc.copy = new Sk.builtin.func(function(self, order) {
            Sk.builtin.pyCheckArgs("copy", arguments, 1, 2);
            var buffer = (Sk.ffi.remapToJs(self), PyArray_DATA(self).map(function(x) {
                    return x
                })),
                shape = new Sk.builtin.tuplePy(PyArray_DIMS(self).map(function(x) {
                    return new Sk.builtin.int_(x)
                }));
            return Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self), new Sk.builtin.list(buffer))
        }), $loc.fill = new Sk.builtin.func(function(self, value) {
            Sk.builtin.pyCheckArgs("fill", arguments, 2, 2);
            var i, ndarrayJs = Sk.ffi.remapToJs(self);
            ndarrayJs.buffer.map(function(x) {
                return x
            });
            for (i = 0; i < ndarrayJs.buffer.length; i++) ndarrayJs.dtype && (ndarrayJs.buffer[i] = Sk.misceval.callsim(ndarrayJs.dtype, value))
        }), $loc.__getslice__ = new Sk.builtin.func(function(self, start, stop) {
            Sk.builtin.pyCheckArgs("[]", arguments, 2, 3);
            var _index, _buffer, buffer_internal, _shape, i, _start, _stop, ndarrayJs = Sk.ffi.remapToJs(self);
            if (Sk.builtin.checkInt(start) || Sk.builtin.checkInt(stop) || Sk.builtin.checkNone(stop) || void 0 === stop) throw new Sk.builtin.ValueError('Index "' + _index + '" must be int');
            if (_start = Sk.ffi.remapToJs(start), _stop = void 0 === stop || Sk.builtin.checkNone(stop) ? ndarrayJs.buffer.length : Sk.ffi.remapToJs(start), 0 > _start || 0 > _stop) throw new Sk.builtin.IndexError("Use of negative indices is not supported.");
            for (buffer_internal = [], _index = 0, i = _start; _stop > i; i += 1) buffer_internal[_index++] = ndarrayJs.buffer[i];
            return _buffer = new Sk.builtin.list(buffer_internal), _shape = new Sk.builtin.tuple([buffer_internal.length].map(function(x) {
                return new Sk.builtin.int_(x)
            })), Sk.misceval.callsim(mod[CLASS_NDARRAY], _shape, void 0, _buffer)
        }), $loc.__setslice__ = new Sk.builtin.func(function(self, start, stop, value) {
            Sk.builtin.pyCheckArgs("[]", arguments, 3, 2);
            var i, _start, _stop, ndarrayJs = Sk.ffi.remapToJs(self);
            if (Sk.builtin.checkInt(start) || Sk.builtin.checkInt(stop) || Sk.builtin.checkNone(stop) || void 0 === stop) throw new Sk.builtin.ValueError('Index "' + index + '" must be int');
            if (_start = Sk.ffi.remapToJs(start), _stop = void 0 === stop || Sk.builtin.checkNone(stop) ? ndarrayJs.buffer.length : Sk.ffi.remapToJs(start), 0 > _start || 0 > _stop) throw new Sk.builtin.IndexError("Use of negative indices is not supported.");
            for (i = _start; _stop > i; i += 1) ndarrayJs.buffer[computeOffset(ndarrayJs.strides, i)] = value
        }), $loc.__getitem__ = new Sk.builtin.func(function(self, index) {
            Sk.builtin.pyCheckArgs("[]", arguments, 2, 2);
            var _index, _buffer, buffer_internal, _stride, _shape, i, ndarrayJs = Sk.ffi.remapToJs(self);
            if (Sk.builtin.checkInt(index)) {
                var offset = Sk.ffi.remapToJs(index);
                if (ndarrayJs.shape.length > 1) {
                    for (_stride = ndarrayJs.strides[0], buffer_internal = [], _index = 0, i = offset * _stride, ubound = (offset + 1) * _stride; i < ubound; i++) buffer_internal[_index++] = ndarrayJs.buffer[i];
                    return _buffer = new Sk.builtin.list(buffer_internal), _shape = new Sk.builtin.tuple(Array.prototype.slice.call(ndarrayJs.shape, 1).map(function(x) {
                        return new Sk.builtin.int_(x)
                    })), Sk.misceval.callsim(mod[CLASS_NDARRAY], _shape, void 0, _buffer)
                }
                if (offset >= 0 && offset < ndarrayJs.buffer.length) return ndarrayJs.buffer[offset];
                throw new Sk.builtin.IndexError("array index out of range")
            }
            if (index instanceof Sk.builtin.tuple) {
                var keyJs = Sk.ffi.remapToJs(index);
                if (index.length != PyArray_DIMS(self).length) throw new Sk.builtin.ValueError("Tuple must contain values for all dimensions");
                return ndarrayJs.buffer[computeOffset(ndarrayJs.strides, keyJs)]
            }
            if (index instanceof Sk.builtin.slice) {
                var length = Sk.builtin.len(self);
                return buffer_internal = [], length = Sk.ffi.remapToJs(length), index.sssiter$(length, function(i, wrt) {
                    i >= 0 && length > i && buffer_internal.push(PyArray_DATA(self)[i])
                }), _buffer = new Sk.builtin.list(buffer_internal), _shape = new Sk.builtin.tuple([buffer_internal.length].map(function(x) {
                    return new Sk.builtin.int_(x)
                })), Sk.misceval.callsim(mod[CLASS_NDARRAY], _shape, void 0, _buffer)
            }
            throw new Sk.builtin.ValueError('Index "' + index + '" must be int, slice or tuple')
        }), $loc.__setitem__ = new Sk.builtin.func(function(self, index, value) {
            var ndarrayJs = Sk.ffi.remapToJs(self);
            if (Sk.builtin.pyCheckArgs("[]", arguments, 3, 3), Sk.builtin.checkInt(index)) {
                var _offset = Sk.ffi.remapToJs(index);
                if (ndarrayJs.shape.length > 1) {
                    var i, _value = Sk.ffi.remapToJs(value),
                        _stride = ndarrayJs.strides[0],
                        _index = 0,
                        _ubound = (_offset + 1) * _stride;
                    for (i = _offset * _stride; _ubound > i; i++) ndarrayJs.buffer[i] = _value.buffer[_index++]
                } else {
                    if (!(_offset >= 0 && _offset < ndarrayJs.buffer.length)) throw new Sk.builtin.IndexError("array index out of range");
                    ndarrayJs.buffer[_offset] = value
                }
            } else {
                if (!(index instanceof Sk.builtin.tuple)) throw new Sk.builtin.TypeError('argument "index" must be int or tuple');
                _key = Sk.ffi.remapToJs(index), ndarrayJs.buffer[computeOffset(ndarrayJs.strides, _key)] = value
            }
        }), $loc.__len__ = new Sk.builtin.func(function(self) {
            var ndarrayJs = Sk.ffi.remapToJs(self);
            return new Sk.builtin.int_(ndarrayJs.shape[0])
        }), $loc.__iter__ = new Sk.builtin.func(function(self) {
            var ndarrayJs = Sk.ffi.remapToJs(self),
                ret = {
                    tp$iter: function() {
                        return ret
                    },
                    $obj: ndarrayJs,
                    $index: 0,
                    tp$iternext: function() {
                        return ret.$index >= ret.$obj.buffer.length ? void 0 : ret.$obj.buffer[ret.$index++]
                    }
                };
            return ret
        }), $loc.__str__ = new Sk.builtin.func(function(self) {
            return null == PyArray_StrFunction ? Sk.misceval.callsim(self.__repr__, self) : PyArray_StrFunction.call(null, self)
        }), $loc.__repr__ = new Sk.builtin.func(function(self) {
            return array_repr_builtin(self, 1)
        }), $loc.__add__ = new Sk.builtin.func(makeNumericBinaryOpLhs("Add")), $loc.__radd__ = new Sk.builtin.func(makeNumericBinaryOpRhs("Add")), $loc.__iadd__ = new Sk.builtin.func(makeNumericBinaryOpInplace("Add")), $loc.__sub__ = new Sk.builtin.func(makeNumericBinaryOpLhs("Sub")), $loc.__rsub__ = new Sk.builtin.func(makeNumericBinaryOpRhs("Sub")), $loc.__isub__ = new Sk.builtin.func(makeNumericBinaryOpInplace("Sub")), $loc.__mul__ = new Sk.builtin.func(makeNumericBinaryOpLhs("Mult")), $loc.__rmul__ = new Sk.builtin.func(makeNumericBinaryOpRhs("Mult")), $loc.__imul__ = new Sk.builtin.func(makeNumericBinaryOpInplace("Mult")), $loc.__div__ = new Sk.builtin.func(makeNumericBinaryOpLhs("Div")), $loc.__rdiv__ = new Sk.builtin.func(makeNumericBinaryOpRhs("Div")), $loc.__idiv__ = new Sk.builtin.func(makeNumericBinaryOpInplace("Div")), $loc.__floordiv__ = new Sk.builtin.func(makeNumericBinaryOpLhs("FloorDiv")), $loc.__rfloordiv__ = new Sk.builtin.func(makeNumericBinaryOpRhs("FloorDiv")), $loc.__ifloordiv__ = new Sk.builtin.func(makeNumericBinaryOpInplace("FloorDiv")), $loc.__mod__ = new Sk.builtin.func(makeNumericBinaryOpLhs("Mod")), $loc.__rmod__ = new Sk.builtin.func(makeNumericBinaryOpRhs("Mod")), $loc.__imod__ = new Sk.builtin.func(makeNumericBinaryOpInplace("Mod")), $loc.__xor__ = new Sk.builtin.func(makeNumericBinaryOpLhs("BitXor")), $loc.__rxor__ = new Sk.builtin.func(makeNumericBinaryOpRhs("BitXor")), $loc.__ixor__ = new Sk.builtin.func(makeNumericBinaryOpInplace("BitXor")), $loc.__lshift__ = new Sk.builtin.func(makeNumericBinaryOpLhs("LShift")), $loc.__rlshift__ = new Sk.builtin.func(makeNumericBinaryOpRhs("LShift")), $loc.__ilshift__ = new Sk.builtin.func(makeNumericBinaryOpInplace("LShift")), $loc.__rshift__ = new Sk.builtin.func(makeNumericBinaryOpLhs("RShift")), $loc.__rrshift__ = new Sk.builtin.func(makeNumericBinaryOpRhs("RShift")), $loc.__irshift__ = new Sk.builtin.func(makeNumericBinaryOpInplace("RShift")), $loc.__pos__ = new Sk.builtin.func(makeUnaryOp("UAdd")), $loc.__neg__ = new Sk.builtin.func(makeUnaryOp("USub")), $loc.__eq__ = new Sk.builtin.func(function(self, other) {
            return Sk.misceval.callsim(mod.equal, self, other)
        }), $loc.__ne__ = new Sk.builtin.func(function(self, other) {
            return Sk.misceval.callsim(mod.not_equal, self, other)
        }), $loc.__lt__ = new Sk.builtin.func(function(self, other) {
            return Sk.misceval.callsim(mod.less, self, other)
        }), $loc.__le__ = new Sk.builtin.func(function(self, other) {
            return Sk.misceval.callsim(mod.less_equal, self, other)
        }), $loc.__gt__ = new Sk.builtin.func(function(self, other) {
            return Sk.misceval.callsim(mod.greater, self, other)
        }), $loc.__ge__ = new Sk.builtin.func(function(self, other) {
            return Sk.misceval.callsim(mod.greater_equal, self, other)
        }), $loc.__pow__ = new Sk.builtin.func(function(self, other) {
            Sk.builtin.pyCheckArgs("__pow__", arguments, 2, 2);
            var _buffer = PyArray_DATA(self).map(function(value) {
                    return Sk.builtin.pow(value, other)
                }),
                shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function(x) {
                    return new Sk.builtin.int_(x)
                }));
            return buffer = new Sk.builtin.list(_buffer), Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self), buffer)
        }), $loc.dot = new Sk.builtin.func(function(self, other) {
            var ret;
            return ret = Sk.misceval.callsim(mod.dot, self, other)
        }), $loc.__abs__ = new Sk.builtin.func(function(self) {
            Sk.builtin.pyCheckArgs("__abs__", arguments, 1, 1);
            var _buffer = PyArray_DATA(self).map(function(value) {
                    return Sk.builtin.abs(value)
                }),
                shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function(x) {
                    return new Sk.builtin.int_(x)
                }));
            return buffer = new Sk.builtin.list(_buffer), Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self), buffer)
        }), $loc.transpose = new Sk.builtin.func(function(self, args) {
            var ret, shape = Sk.builtin.none.none$,
                n = arguments.length - 1,
                permute = [];
            return args = Array.prototype.slice.call(arguments, 1), n > 1 ? shape = args : 1 === n && (shape = args[0]), Sk.builtin.checkNone(shape) ? ret = PyArray_Transpose(self, null) : (permute = Sk.ffi.remapToJs(shape), ret = PyArray_Transpose(self, permute)), ret
        }), $loc.any = new Sk.builtin.func(function(self, axis, out) {
            return Sk.misceval.callsim(mod.any, self, axis, out)
        }), $loc.all = new Sk.builtin.func(function(self, axis, out) {
            return Sk.misceval.callsim(mod.all, self, axis, out)
        })
    };
    mod[CLASS_NDARRAY] = Sk.misceval.buildClass(mod, ndarray_f, CLASS_NDARRAY, []), mod.pi = Sk.builtin.float_(np.math ? np.math.PI : Math.PI), mod.e = Sk.builtin.float_(np.math ? np.math.E : Math.E);
    var sin_f = function(x, out) {
        return Sk.builtin.pyCheckArgs("sin", arguments, 1, 2), callTrigonometricFunc(x, np.math ? np.math.sin : Math.sin)
    };
    sin_f.co_varnames = ["x", "out"], sin_f.$defaults = [0, new Sk.builtin.list([])], mod.sin = new Sk.builtin.func(sin_f);
    var sinh_f = function(x, out) {
        if (Sk.builtin.pyCheckArgs("sinh", arguments, 1, 2), !np.math) throw new Sk.builtin.OperationError("sinh requires math polyfill");
        return callTrigonometricFunc(x, np.math.sinh)
    };
    sinh_f.co_varnames = ["x", "out"], sinh_f.$defaults = [0, new Sk.builtin.list([])], mod.sinh = new Sk.builtin.func(sinh_f);
    var arcsin_f = function(x, out) {
        return Sk.builtin.pyCheckArgs("arcsin", arguments, 1, 2), callTrigonometricFunc(x, np.math ? np.math.asin : Math.asin)
    };
    arcsin_f.co_varnames = ["x", "out"], arcsin_f.$defaults = [0, new Sk.builtin.list([])], mod.arcsin = new Sk.builtin.func(arcsin_f);
    var cos_f = function(x, out) {
        return Sk.builtin.pyCheckArgs("cos", arguments, 1, 2), callTrigonometricFunc(x, np.math ? np.math.cos : Math.cos)
    };
    cos_f.co_varnames = ["x", "out"], cos_f.$defaults = [0, new Sk.builtin.list([])], mod.cos = new Sk.builtin.func(cos_f);
    var cosh_f = function(x, out) {
        if (Sk.builtin.pyCheckArgs("cosh", arguments, 1, 2), !np.math) throw new Sk.builtin.OperationError("cosh requires math polyfill");
        return callTrigonometricFunc(x, np.math.cosh)
    };
    cosh_f.co_varnames = ["x", "out"], cosh_f.$defaults = [0, new Sk.builtin.list([])], mod.cosh = new Sk.builtin.func(cosh_f);
    var arccos_f = function(x, out) {
        return Sk.builtin.pyCheckArgs("arccos", arguments, 1, 2), callTrigonometricFunc(x, np.math ? np.math.acos : Math.acos)
    };
    arccos_f.co_varnames = ["x", "out"], arccos_f.$defaults = [0, new Sk.builtin.list([])], mod.arccos = new Sk.builtin.func(arccos_f);
    var arctan_f = function(x, out) {
        return Sk.builtin.pyCheckArgs("arctan", arguments, 1, 2), callTrigonometricFunc(x, np.math ? np.math.atan : Math.atan)
    };
    arctan_f.co_varnames = ["x", "out"], arctan_f.$defaults = [0, new Sk.builtin.list([])], mod.arctan = new Sk.builtin.func(arctan_f);
    var tan_f = function(x, out) {
        return Sk.builtin.pyCheckArgs("tan", arguments, 1, 2), callTrigonometricFunc(x, np.math ? np.math.tan : Math.tan)
    };
    tan_f.co_varnames = ["x", "out"], tan_f.$defaults = [0, new Sk.builtin.list([])], mod.tan = new Sk.builtin.func(tan_f);
    var tanh_f = function(x, out) {
        if (Sk.builtin.pyCheckArgs("tanh", arguments, 1, 2), !np.math) throw new Sk.builtin.OperationError("tanh requires math polyfill");
        return callTrigonometricFunc(x, np.math.tanh)
    };
    tanh_f.co_varnames = ["x", "out"], tanh_f.$defaults = [0, new Sk.builtin.list([])], mod.tanh = new Sk.builtin.func(tanh_f);
    var exp_f = function(x, out) {
        return Sk.builtin.pyCheckArgs("exp", arguments, 1, 2), callTrigonometricFunc(x, np.math ? np.math.exp : Math.exp)
    };
    exp_f.co_varnames = ["x", "out"], exp_f.$defaults = [0, new Sk.builtin.list([])], mod.exp = new Sk.builtin.func(exp_f);
    var sqrt_f = function(x, out) {
        return Sk.builtin.pyCheckArgs("sqrt", arguments, 1, 2), callTrigonometricFunc(x, np.math ? np.math.sqrt : Math.sqrt)
    };
    sqrt_f.co_varnames = ["x", "out"], sqrt_f.$defaults = [0, new Sk.builtin.list([])], mod.sqrt = new Sk.builtin.func(sqrt_f);
    var linspace_f = function(start, stop, num, endpoint, retstep) {
        Sk.builtin.pyCheckArgs("linspace", arguments, 3, 5), Sk.builtin.pyCheckType("start", "number", Sk.builtin.checkNumber(start)), Sk.builtin.pyCheckType("stop", "number", Sk.builtin.checkNumber(stop)), void 0 === num && (num = 50);
        var endpoint_bool, num_num = Sk.builtin.asnum$(num);
        void 0 === endpoint ? endpoint_bool = !0 : endpoint.constructor === Sk.builtin.bool && (endpoint_bool = endpoint.v);
        var retstep_bool;
        void 0 === retstep ? retstep_bool = !1 : retstep.constructor === Sk.builtin.bool && (retstep_bool = retstep.v);
        var samples, step;
        if (start_num = 1 * Sk.builtin.asnum$(start), stop_num = 1 * Sk.builtin.asnum$(stop), 0 >= num_num) samples = [];
        else {
            var samples_array;
            endpoint_bool ? 1 == num_num ? samples = [start_num] : (step = (stop_num - start_num) / (num_num - 1), samples_array = np.arange(0, num_num), samples = samples_array.map(function(v) {
                return v * step + start_num
            }), samples[samples.length - 1] = stop_num) : (step = (stop_num - start_num) / num_num, samples_array = np.arange(0, num_num), samples = samples_array.map(function(v) {
                return v * step + start_num
            }))
        }
        var dtype = Sk.builtin.float_;
        for (i = 0; i < samples.length; i++) samples[i] = Sk.misceval.callsim(dtype, samples[i]);
        var buffer = Sk.builtin.list(samples),
            shape = new Sk.builtin.tuple([samples.length]),
            ndarray = Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, dtype, buffer);
        return retstep_bool === !0 ? new Sk.builtin.tuple([ndarray, step]) : ndarray
    };
    linspace_f.co_varnames = ["start", "stop", "num", "endpoint", "retstep"], linspace_f.$defaults = [0, 0, 50, !0, !1], mod.linspace = new Sk.builtin.func(linspace_f);
    var arange_f = function(start, stop, step, dtype) {
        Sk.builtin.pyCheckArgs("arange", arguments, 1, 4), Sk.builtin.pyCheckType("start", "number", Sk.builtin.checkNumber(start));
        var start_num, stop_num, step_num;
        void 0 === stop && void 0 === step ? (start_num = Sk.builtin.asnum$(0), stop_num = Sk.builtin.asnum$(start), step_num = Sk.builtin.asnum$(1)) : void 0 === step ? (start_num = Sk.builtin.asnum$(start), stop_num = Sk.builtin.asnum$(stop), step_num = Sk.builtin.asnum$(1)) : (start_num = Sk.builtin.asnum$(start), stop_num = Sk.builtin.asnum$(stop), step_num = Sk.builtin.asnum$(step)), dtype && dtype != Sk.builtin.none.none$ || (dtype = Sk.builtin.checkInt(start) ? Sk.builtin.int_ : Sk.builtin.float_);
        var arange_buffer = np.arange(start_num, stop_num, step_num);
        if (dtype && Sk.builtin.checkClass(dtype))
            for (i = 0; i < arange_buffer.length; i++) arange_buffer[i] = Sk.misceval.callsim(dtype, arange_buffer[i]);
        buffer = Sk.builtin.list(arange_buffer);
        var shape = new Sk.builtin.tuple([arange_buffer.length]);
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, dtype, buffer)
    };
    arange_f.co_varnames = ["start", "stop", "step", "dtype"], arange_f.$defaults = [0, 1, 1, Sk.builtin.none.none$], mod.arange = new Sk.builtin.func(arange_f);
    var array_f = function(object, dtype, copy, order, subok, ndmin) {
        if (Sk.builtin.pyCheckArgs("array", arguments, 1, 6), void 0 === object) throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(object) + "' object is undefined");
        if (null != ndmin && Sk.builtin.checkInt(ndmin) === !1) throw new Sk.builtin.TypeError('Parameter "ndmin" must be of type "int"');
        var py_ndarray = PyArray_FromAny(object, dtype, ndmin);
        return py_ndarray
    };
    array_f.co_varnames = ["object", "dtype", "copy", "order", "subok", "ndmin"], array_f.$defaults = [null, Sk.builtin.none.none$, !0, new Sk.builtin.str("C"), !1, new Sk.builtin.int_(0)], mod.array = new Sk.builtin.func(array_f);
    var asanyarray_f = function(a, dtype, order) {
        return Sk.misceval.callsim(mod.array, dtype, Sk.builtin.bool.false$, order)
    };
    mod.asanyarray = new Sk.builtin.func(asanyarray_f), asanyarray_f.co_varnames = ["a", "dtype", "order"], asanyarray_f.$defaults = [null, Sk.builtin.none.none$, Sk.builtin.none.none$];
    var zeros_f = function(shape, dtype, order) {
        if (Sk.builtin.pyCheckArgs("zeros", arguments, 1, 3), !Sk.builtin.checkSequence(shape) && !Sk.builtin.checkInt(shape)) throw new Sk.builtin.TypeError('argument "shape" must int or sequence of ints');
        if (dtype instanceof Sk.builtin.list) throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(dtype) + "' is not supported for dtype.");
        var _zero = new Sk.builtin.float_(0);
        return Sk.misceval.callsim(mod.full, shape, _zero, dtype, order)
    };
    zeros_f.co_varnames = ["shape", "dtype", "order"], zeros_f.$defaults = [new Sk.builtin.tuple([]), Sk.builtin.none.none$, new Sk.builtin.str("C")], mod.zeros = new Sk.builtin.func(zeros_f);
    var full_f = function(shape, fill_value, dtype, order) {
        if (Sk.builtin.pyCheckArgs("full", arguments, 2, 4), !Sk.builtin.checkSequence(shape) && !Sk.builtin.checkInt(shape)) throw new Sk.builtin.TypeError('argument "shape" must int or sequence of ints');
        if (dtype instanceof Sk.builtin.list) throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(dtype) + "' is currently not supported for dtype.");
        var _tup, _shape = Sk.ffi.remapToJs(shape);
        Sk.builtin.checkInt(shape) && (_tup = [], _tup.push(_shape), _shape = _tup);
        var i, _size = prod(_shape),
            _buffer = [],
            _fill_value = fill_value;
        for (i = 0; _size > i; i++) _buffer[i] = _fill_value;
        if (!dtype && Sk.builtin.checkNumber(fill_value) && (dtype = Sk.builtin.float_), Sk.builtin.checkClass(dtype))
            for (i = 0; i < _buffer.length; i++) _buffer[i] !== Sk.builtin.none.none$ && (_buffer[i] = Sk.misceval.callsim(dtype, _buffer[i]));
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], new Sk.builtin.list(_shape), dtype, new Sk.builtin.list(_buffer))
    };
    full_f.co_varnames = ["shape", "fill_value", "dtype", "order"], full_f.$defaults = [new Sk.builtin.tuple([]), Sk.builtin.none.none$, Sk.builtin.none.none$, new Sk.builtin.str("C")], mod.full = new Sk.builtin.func(full_f);
    var abs_f = function(x) {
        Sk.builtin.pyCheckArgs("abs", arguments, 1, 1);
        var ret;
        return ret = 1 == PyArray_Check(x) ? Sk.misceval.callsim(x.__abs__, x) : Sk.builtin.abs(x)
    };
    mod.abs = new Sk.builtin.func(abs_f), mod.absolute = mod.abs;
    var mean_f = function(x, axis, dtype, out, keepdims) {
        Sk.builtin.pyCheckArgs("mean", arguments, 1, 1);
        var mean, _buffer, length, sum = new Sk.builtin.float_(0),
            i = 0;
        if (null != axis || !Sk.builtin.checkNone(axis)) throw new Sk.builtin.NotImplementedError("the 'axis' parameter is currently not supported");
        if (null != out || !Sk.builtin.checkNone(out)) throw new Sk.builtin.NotImplementedError("the 'out' parameter is currently not supported");
        if (null != keepdims || keepdims != Sk.builtin.bool.false$) throw new Sk.builtin.NotImplementedError("the 'keepdims' parameter is currently not supported");
        if (1 == PyArray_Check(x)) {
            for (_buffer = PyArray_DATA(x), length = Sk.builtin.len(x), i = 0; i < length.v; i++) sum = Sk.abstr.numberBinOp(sum, _buffer[i], "Add");
            mean = Sk.abstr.numberBinOp(sum, length, "Div")
        } else mean = x;
        return null == dtype || Sk.builtin.checkNone(dtype) || (mean = Sk.misceval.callsim(dtype, mean)), mean
    };
    mean_f.co_varnames = ["a", "axis", "dtype", "out", "keepdims"], mean_f.$defaults = [null, Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$], mod.mean = new Sk.builtin.func(mean_f);
    var ones_f = function(shape, dtype, order) {
        if (Sk.builtin.pyCheckArgs("ones", arguments, 1, 3), !Sk.builtin.checkSequence(shape) && !Sk.builtin.checkInt(shape)) throw new Sk.builtin.TypeError('argument "shape" must int or sequence of ints');
        if (dtype instanceof Sk.builtin.list) throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(dtype) + "' is not supported for dtype.");
        var _one = new Sk.builtin.float_(1);
        return Sk.misceval.callsim(mod.full, shape, _one, dtype, order)
    };
    ones_f.co_varnames = ["shape", "dtype", "order"], ones_f.$defaults = [new Sk.builtin.tuple([]), Sk.builtin.none.none$, new Sk.builtin.str("C")], mod.ones = new Sk.builtin.func(ones_f);
    var empty_f = function(shape, dtype, order) {
        if (Sk.builtin.pyCheckArgs("empty", arguments, 1, 3), !Sk.builtin.checkSequence(shape) && !Sk.builtin.checkInt(shape)) throw new Sk.builtin.TypeError('argument "shape" must int or sequence of ints');
        if (dtype instanceof Sk.builtin.list) throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(dtype) + "' is not supported for dtype.");
        var _empty = Sk.builtin.none.none$;
        return Sk.misceval.callsim(mod.full, shape, _empty, dtype, order)
    };
    empty_f.co_varnames = ["shape", "dtype", "order"], empty_f.$defaults = [new Sk.builtin.tuple([]), Sk.builtin.none.none$, new Sk.builtin.str("C")], mod.empty = new Sk.builtin.func(empty_f);
    var dot_f = function(a, b, o) {
        Sk.builtin.pyCheckArgs("dot", arguments, 2, 3);
        var o, ret;
        if (Sk.builtin.checkNone(o) && (o = null), null != o && !PyArray_Check(o)) throw new Sk.builtin.TypeError("'out' must be an array");
        return ret = MatrixProdcut2(a, b, o), PyArray_Return(ret)
    };
    dot_f.co_varnames = ["a", "b", "out"], dot_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.none.none$], mod.dot = new Sk.builtin.func(dot_f);
    var vdot_f = function(a, b) {
        var typenum, ip1, ip2, op, type, vdot, op1 = a,
            op2 = b,
            newdims = [-1, 1],
            ap1 = null,
            ap2 = null,
            ret = null;
        if (typenum = PyArray_ObjectType(op1, 0), typenum = PyArray_ObjectType(op2, typenum), type = PyArray_DescrFromType(typenum), ap1 = PyArray_FromAny(op1, type, 0, 0, 0, null), null == ap1) return null;
        if (op1 = PyArray_NewShape(ap1, newdims, "NPY_CORDER"), null != op1) {
            if (ap1 = op1, ap2 = PyArray_FromAny(op2, type, 0, 0, 0, null), null == ap2) return null;
            if (op2 = PyArray_NewShape(ap2, newdims, "NPY_CORDER"), null != op2) {
                if (ap2 = op2, PyArray_DIM(ap2, 0) != PyArray_DIM(ap1, 0)) throw new Sk.builtin.ValueError("vectors have different lengths");
                var shape = new Sk.builtin.tuple([0].map(function(x) {
                    return new Sk.builtin.int_(x)
                }));
                switch (ret = Sk.misceval.callsim(mod.zeros, shape, type), n = PyArray_DIM(ap1, 0), stride1 = PyArray_STRIDE(ap1, 0), stride2 = PyArray_STRIDE(ap2, 0), ip1 = PyArray_DATA(ap1), ip2 = PyArray_DATA(ap2), op = PyArray_DATA(ret), typenum) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        vdot = OBJECT_vdot;
                        break;
                    default:
                        throw new Sk.builtin.ValueError("function not available for this data type")
                }
                return vdot.call(null, ip1, stride1, ip2, stride2, op, n, null), PyArray_Return(ret)
            }
        }
    };
    mod.vdot = new Sk.builtin.func(vdot_f);
    var any_f = function(a, axis, out, keepdims) {
        Sk.builtin.pyCheckArgs("any", arguments, 1, 4, !1);
        var i, b, arr = PyArray_FromAny(a),
            data = PyArray_DATA(arr);
        if (void 0 != axis && !Sk.builtin.checkNone(axis)) throw new ValueError('"axis" parameter not supported');
        if (void 0 != out && !Sk.builtin.checkNone(out)) throw new ValueError('"out" parameter not supported');
        for (i = 0; i < data.length; i++)
            if (b = Sk.builtin.bool(data[i]), b == Sk.builtin.bool.true$) return Sk.builtin.bool.true$;
        return Sk.builtin.bool.false$
    };
    any_f.co_varnames = ["a", "axis", "out", "keepdims"], any_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$], mod.any = new Sk.builtin.func(any_f);
    var all_f = function(a, axis, out, keepdims) {
        Sk.builtin.pyCheckArgs("all", arguments, 1, 4, !1);
        var i, b, arr = PyArray_FromAny(a),
            data = PyArray_DATA(arr);
        if (void 0 != axis && !Sk.builtin.checkNone(axis)) throw new ValueError('"axis" parameter not supported');
        if (void 0 != out && !Sk.builtin.checkNone(out)) throw new ValueError('"out" parameter not supported');
        for (i = 0; i < data.length; i++)
            if (b = Sk.builtin.bool(data[i]), b == Sk.builtin.bool.false$) return Sk.builtin.bool.false$;
        return Sk.builtin.bool.true$
    };
    all_f.co_varnames = ["a", "axis", "out", "keepdims"], all_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$], mod.all = new Sk.builtin.func(all_f);
    var less_f = function(x1, x2, out) {
        return Sk.builtin.pyCheckArgs("less", arguments, 2, 3, !1), compareLogical("Lt", x1, x2, out)
    };
    less_f.co_varnames = ["a", "axis", "out", "keepdims"], less_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$], mod.less = new Sk.builtin.func(less_f);
    var less_equal_f = function(x1, x2, out) {
        return Sk.builtin.pyCheckArgs("less_equal", arguments, 2, 3, !1), compareLogical("LtE", x1, x2, out)
    };
    less_equal_f.co_varnames = ["a", "axis", "out", "keepdims"], less_equal_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$], mod.less_equal = new Sk.builtin.func(less_equal_f);
    var greater_f = function(x1, x2, out) {
        return Sk.builtin.pyCheckArgs("greater", arguments, 2, 3, !1), compareLogical("Gt", x1, x2, out)
    };
    greater_f.co_varnames = ["a", "axis", "out", "keepdims"], greater_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$], mod.greater = new Sk.builtin.func(greater_f);
    var greater_equal_f = function(x1, x2, out) {
        return Sk.builtin.pyCheckArgs("greater_equal", arguments, 2, 3, !1), compareLogical("GtE", x1, x2, out)
    };
    greater_equal_f.co_varnames = ["a", "axis", "out", "keepdims"], greater_equal_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$], mod.greater_equal = new Sk.builtin.func(greater_equal_f);
    var equal_f = function(x1, x2, out) {
        return Sk.builtin.pyCheckArgs("equal", arguments, 2, 3, !1), compareLogical("Eq", x1, x2, out)
    };
    equal_f.co_varnames = ["a", "axis", "out", "keepdims"], equal_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$], mod.equal = new Sk.builtin.func(equal_f);
    var not_equal_f = function(x1, x2, out) {
        return Sk.builtin.pyCheckArgs("not_equal", arguments, 2, 3, !1), compareLogical("NotEq", x1, x2, out)
    };
    return not_equal_f.co_varnames = ["a", "axis", "out", "keepdims"], not_equal_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$], mod.not_equal = new Sk.builtin.func(not_equal_f), mod.identity = new Sk.builtin.func(function(n, dtype) {
        Sk.builtin.pyCheckArgs("identity", arguments, 1, 2, !1), n = new Sk.builtin.int_(n);
        var b;
        b = Sk.misceval.callsim(mod.zeros, new Sk.builtin.tuple([n, n]), dtype);
        var i, j, length = Sk.ffi.remapToJs(n),
            value = PyArray_DESCR(b)(1);
        for (i = 0, j = 0; length > i; i++, j++) PyArray_DATA(b)[computeOffset(PyArray_STRIDES(b), [i, j])] = value;
        return b
    }), mod.eye = new Sk.builtin.func(function(N, M, k, dtype) {
        throw new Sk.builtin.NotImplementedError("eye is not yet implemented")
    }), mod.ones_like = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("ones_like is not yet implemented")
    }), mod.empty_like = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("empty_like is not yet implemented")
    }), mod.ones_like = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("ones_like is not yet implemented")
    }), mod.arctan2 = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("arctan2 is not yet implemented")
    }), mod.asarray = new Sk.builtin.func(array_f), mod
};