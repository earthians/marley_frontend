var C = Object.defineProperty,
	O = Object.defineProperties;
var x = Object.getOwnPropertyDescriptors;
var s = Object.getOwnPropertySymbols;
var c = Object.prototype.hasOwnProperty,
	f = Object.prototype.propertyIsEnumerable;
var d = (e, t, a) =>
		t in e
			? C(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a })
			: (e[t] = a),
	m = (e, t) => {
		for (var a in t || (t = {})) c.call(t, a) && d(e, a, t[a]);
		if (s) for (var a of s(t)) f.call(t, a) && d(e, a, t[a]);
		return e;
	},
	b = (e, t) => O(e, x(t));
var v = (e, t) => {
	var a = {};
	for (var l in e) c.call(e, l) && t.indexOf(l) < 0 && (a[l] = e[l]);
	if (e != null && s)
		for (var l of s(e)) t.indexOf(l) < 0 && f.call(e, l) && (a[l] = e[l]);
	return a;
};
import {
	r as P,
	al as w,
	J as T,
	I as z,
	aE as A,
	o as B,
	z as F,
	f as I,
	aP as J,
	am as K,
} from "./index-8ff34837.js";
let g = Symbol("LabelContext");
function h() {
	let e = K(g, null);
	if (e === null) {
		let t = new Error(
			"You used a <Label /> component, but it is not inside a parent."
		);
		throw (Error.captureStackTrace && Error.captureStackTrace(t, h), t);
	}
	return e;
}
function Y({ slot: e = {}, name: t = "Label", props: a = {} } = {}) {
	let l = P([]);
	function n(r) {
		return (
			l.value.push(r),
			() => {
				let o = l.value.indexOf(r);
				o !== -1 && l.value.splice(o, 1);
			}
		);
	}
	return (
		w(g, { register: n, slot: e, name: t, props: a }),
		T(() => (l.value.length > 0 ? l.value.join(" ") : void 0))
	);
}
let $ = z({
	name: "Label",
	props: {
		as: { type: [Object, String], default: "label" },
		passive: { type: [Boolean], default: !1 },
		id: { type: String, default: null },
	},
	setup(e, { slots: t, attrs: a }) {
		var l;
		let n = (l = e.id) != null ? l : `headlessui-label-${A()}`,
			r = h();
		return (
			B(() => F(r.register(n))),
			() => {
				let { name: o = "Label", slot: j = {}, props: E = {} } = r,
					p = e,
					{ passive: L } = p,
					i = v(p, ["passive"]),
					u = b(
						m(
							{},
							Object.entries(E).reduce(
								(S, [k, y]) => Object.assign(S, { [k]: I(y) }),
								{}
							)
						),
						{ id: n }
					);
				return (
					L && (delete u.onClick, delete u.htmlFor, delete i.onClick),
					J({
						ourProps: u,
						theirProps: i,
						slot: j,
						attrs: a,
						slots: t,
						name: o,
					})
				);
			}
		);
	},
});
export { Y as E, $ as K };
//# sourceMappingURL=label-1daf495d.js.map
