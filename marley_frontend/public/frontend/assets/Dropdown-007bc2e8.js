var ht = Object.defineProperty,
	bt = Object.defineProperties;
var wt = Object.getOwnPropertyDescriptors;
var Le = Object.getOwnPropertySymbols;
var Ct = Object.prototype.hasOwnProperty,
	kt = Object.prototype.propertyIsEnumerable;
var Ke = (e, n, t) =>
		n in e
			? ht(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t })
			: (e[n] = t),
	x = (e, n) => {
		for (var t in n || (n = {})) Ct.call(n, t) && Ke(e, t, n[t]);
		if (Le) for (var t of Le(n)) kt.call(n, t) && Ke(e, t, n[t]);
		return e;
	},
	se = (e, n) => bt(e, wt(n));
var D = (e, n, t) =>
	new Promise((r, s) => {
		var i = a => {
				try {
					c(t.next(a));
				} catch (m) {
					s(m);
				}
			},
			d = a => {
				try {
					c(t.throw(a));
				} catch (m) {
					s(m);
				}
			},
			c = a => (a.done ? r(a.value) : Promise.resolve(a.value).then(i, d));
		c((t = t.apply(e, n)).next());
	});
import {
	a9 as Qe,
	r as S,
	J as N,
	aa as Et,
	I as B,
	ab as M,
	S as Ot,
	ac as Z,
	ad as Ie,
	ae as U,
	k as b,
	h as C,
	g as w,
	D as _,
	f as u,
	af as te,
	y as pe,
	ag as Ze,
	z as Te,
	ah as St,
	ai as et,
	aj as Ne,
	ak as Se,
	al as Bt,
	am as _t,
	Y as Ue,
	an as Ve,
	O as Pt,
	ao as me,
	ap as ne,
	e as A,
	aq as X,
	ar as It,
	o as tt,
	as as nt,
	at as Tt,
	au as Ft,
	av as At,
	aw as Dt,
	A as R,
	ax as q,
	N as Be,
	P as L,
	ay as ot,
	Q as z,
	az as Mt,
	aA as ye,
	aB as $t,
	i as at,
	aC as Rt,
	aD as xt,
	u as Lt,
	m as Kt,
	l as be,
	t as Y,
	n as I,
	b as V,
	x as ie,
	j as J,
	F as le,
	B as Q,
	d as ue,
	$ as de,
	_ as Nt,
} from "./index-8ff34837.js";
function Fe(e) {
	const n = Qe({ dir: S("ltr") });
	return N(() => {
		var t;
		return (
			(e == null ? void 0 : e.value) ||
			((t = n.dir) == null ? void 0 : t.value) ||
			"ltr"
		);
	});
}
const Ut = ["INPUT", "TEXTAREA"];
function Vt(e, n, t, r = {}) {
	if (!n || (r.enableIgnoredElement && Ut.includes(n.nodeName))) return null;
	const {
			arrowKeyOptions: s = "both",
			attributeName: i = "[data-reka-collection-item]",
			itemsArray: d = [],
			loop: c = !0,
			dir: a = "ltr",
			preventScroll: m = !0,
			focus: f = !1,
		} = r,
		[l, o, p, h, v, g] = [
			e.key === "ArrowRight",
			e.key === "ArrowLeft",
			e.key === "ArrowUp",
			e.key === "ArrowDown",
			e.key === "Home",
			e.key === "End",
		],
		k = p || h,
		O = l || o;
	if (
		!v &&
		!g &&
		((!k && !O) || (s === "vertical" && O) || (s === "horizontal" && k))
	)
		return null;
	const T = t ? Array.from(t.querySelectorAll(i)) : d;
	if (!T.length) return null;
	m && e.preventDefault();
	let F = null;
	return (
		O || k
			? (F = rt(T, n, { goForward: k ? h : a === "ltr" ? l : o, loop: c }))
			: v
			? (F = T.at(0) || null)
			: g && (F = T.at(-1) || null),
		f && (F == null || F.focus()),
		F
	);
}
function rt(e, n, t, r = e.length) {
	if (--r === 0) return null;
	const s = e.indexOf(n),
		i = t.goForward ? s + 1 : s - 1;
	if (!t.loop && (i < 0 || i >= e.length)) return null;
	const d = (i + e.length) % e.length,
		c = e[d];
	return c
		? c.hasAttribute("disabled") && c.getAttribute("disabled") !== "false"
			? rt(e, c, t, r)
			: c
		: null;
}
function $() {
	let e = document.activeElement;
	if (e == null) return null;
	for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; )
		e = e.shadowRoot.activeElement;
	return e;
}
const jt = "menu.itemSelect",
	_e = ["Enter", " "],
	Wt = ["ArrowDown", "PageUp", "Home"],
	st = ["ArrowUp", "PageDown", "End"],
	zt = [...Wt, ...st],
	Gt = { ltr: [..._e, "ArrowRight"], rtl: [..._e, "ArrowLeft"] },
	Yt = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] };
function it(e) {
	return e ? "open" : "closed";
}
function Ht(e) {
	const n = $();
	for (const t of e) if (t === n || (t.focus(), $() !== n)) return;
}
function Xt(e, n) {
	const { x: t, y: r } = e;
	let s = !1;
	for (let i = 0, d = n.length - 1; i < n.length; d = i++) {
		const c = n[i].x,
			a = n[i].y,
			m = n[d].x,
			f = n[d].y;
		a > r != f > r && t < ((m - c) * (r - a)) / (f - a) + c && (s = !s);
	}
	return s;
}
function qt(e, n) {
	if (!n) return !1;
	const t = { x: e.clientX, y: e.clientY };
	return Xt(t, n);
}
function ee(e) {
	return e.pointerType === "mouse";
}
const Jt = Et(() => S([]));
function Qt() {
	const e = Jt();
	return {
		add(n) {
			const t = e.value[0];
			n !== t && (t == null || t.pause()),
				(e.value = je(e.value, n)),
				e.value.unshift(n);
		},
		remove(n) {
			var t;
			(e.value = je(e.value, n)), (t = e.value[0]) == null || t.resume();
		},
	};
}
function je(e, n) {
	const t = [...e],
		r = t.indexOf(n);
	return r !== -1 && t.splice(r, 1), t;
}
function Zt(e) {
	return e.filter(n => n.tagName !== "A");
}
const we = "focusScope.autoFocusOnMount",
	Ce = "focusScope.autoFocusOnUnmount",
	We = { bubbles: !1, cancelable: !0 };
function en(e, { select: n = !1 } = {}) {
	const t = $();
	for (const r of e) if ((j(r, { select: n }), $() !== t)) return !0;
}
function tn(e) {
	const n = lt(e),
		t = ze(n, e),
		r = ze(n.reverse(), e);
	return [t, r];
}
function lt(e) {
	const n = [],
		t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
			acceptNode: r => {
				const s = r.tagName === "INPUT" && r.type === "hidden";
				return r.disabled || r.hidden || s
					? NodeFilter.FILTER_SKIP
					: r.tabIndex >= 0
					? NodeFilter.FILTER_ACCEPT
					: NodeFilter.FILTER_SKIP;
			},
		});
	for (; t.nextNode(); ) n.push(t.currentNode);
	return n;
}
function ze(e, n) {
	for (const t of e) if (!nn(t, { upTo: n })) return t;
}
function nn(e, { upTo: n }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e; ) {
		if (n !== void 0 && e === n) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function on(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function j(e, { select: n = !1 } = {}) {
	if (e && e.focus) {
		const t = $();
		e.focus({ preventScroll: !0 }), e !== t && on(e) && n && e.select();
	}
}
const an = B({
	__name: "FocusScope",
	props: {
		loop: { type: Boolean, default: !1 },
		trapped: { type: Boolean, default: !1 },
		asChild: { type: Boolean },
		as: {},
	},
	emits: ["mountAutoFocus", "unmountAutoFocus"],
	setup(e, { emit: n }) {
		const t = e,
			r = n,
			{ currentRef: s, currentElement: i } = M(),
			d = S(null),
			c = Qt(),
			a = Ot({
				paused: !1,
				pause() {
					this.paused = !0;
				},
				resume() {
					this.paused = !1;
				},
			});
		Z(f => {
			if (!Ie) return;
			const l = i.value;
			if (!t.trapped) return;
			function o(g) {
				if (a.paused || !l) return;
				const k = g.target;
				l.contains(k) ? (d.value = k) : j(d.value, { select: !0 });
			}
			function p(g) {
				if (a.paused || !l) return;
				const k = g.relatedTarget;
				k !== null && (l.contains(k) || j(d.value, { select: !0 }));
			}
			function h(g) {
				l.contains(d.value) || j(l);
			}
			document.addEventListener("focusin", o),
				document.addEventListener("focusout", p);
			const v = new MutationObserver(h);
			l && v.observe(l, { childList: !0, subtree: !0 }),
				f(() => {
					document.removeEventListener("focusin", o),
						document.removeEventListener("focusout", p),
						v.disconnect();
				});
		}),
			Z(f =>
				D(this, null, function* () {
					const l = i.value;
					if ((yield U(), !l)) return;
					c.add(a);
					const o = $();
					if (!l.contains(o)) {
						const h = new CustomEvent(we, We);
						l.addEventListener(we, v => r("mountAutoFocus", v)),
							l.dispatchEvent(h),
							h.defaultPrevented ||
								(en(Zt(lt(l)), { select: !0 }), $() === o && j(l));
					}
					f(() => {
						l.removeEventListener(we, g => r("mountAutoFocus", g));
						const h = new CustomEvent(Ce, We),
							v = g => {
								r("unmountAutoFocus", g);
							};
						l.addEventListener(Ce, v),
							l.dispatchEvent(h),
							setTimeout(() => {
								h.defaultPrevented ||
									j(o != null ? o : document.body, { select: !0 }),
									l.removeEventListener(Ce, v),
									c.remove(a);
							}, 0);
					});
				})
			);
		function m(f) {
			if ((!t.loop && !t.trapped) || a.paused) return;
			const l = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey,
				o = $();
			if (l && o) {
				const p = f.currentTarget,
					[h, v] = tn(p);
				h && v
					? !f.shiftKey && o === v
						? (f.preventDefault(), t.loop && j(h, { select: !0 }))
						: f.shiftKey &&
						  o === h &&
						  (f.preventDefault(), t.loop && j(v, { select: !0 }))
					: o === p && f.preventDefault();
			}
		}
		return (f, l) => (
			b(),
			C(
				u(te),
				{
					ref_key: "currentRef",
					ref: s,
					tabindex: "-1",
					"as-child": f.asChild,
					as: f.as,
					onKeydown: m,
				},
				{ default: w(() => [_(f.$slots, "default")]), _: 3 },
				8,
				["as-child", "as"]
			)
		);
	},
});
var rn = function (e) {
		if (typeof document == "undefined") return null;
		var n = Array.isArray(e) ? e[0] : e;
		return n.ownerDocument.body;
	},
	H = new WeakMap(),
	ce = new WeakMap(),
	fe = {},
	ke = 0,
	ut = function (e) {
		return e && (e.host || ut(e.parentNode));
	},
	sn = function (e, n) {
		return n
			.map(function (t) {
				if (e.contains(t)) return t;
				var r = ut(t);
				return r && e.contains(r)
					? r
					: (console.error(
							"aria-hidden",
							t,
							"in not contained inside",
							e,
							". Doing nothing"
					  ),
					  null);
			})
			.filter(function (t) {
				return !!t;
			});
	},
	ln = function (e, n, t, r) {
		var s = sn(n, Array.isArray(e) ? e : [e]);
		fe[t] || (fe[t] = new WeakMap());
		var i = fe[t],
			d = [],
			c = new Set(),
			a = new Set(s),
			m = function (l) {
				!l || c.has(l) || (c.add(l), m(l.parentNode));
			};
		s.forEach(m);
		var f = function (l) {
			!l ||
				a.has(l) ||
				Array.prototype.forEach.call(l.children, function (o) {
					if (c.has(o)) f(o);
					else
						try {
							var p = o.getAttribute(r),
								h = p !== null && p !== "false",
								v = (H.get(o) || 0) + 1,
								g = (i.get(o) || 0) + 1;
							H.set(o, v),
								i.set(o, g),
								d.push(o),
								v === 1 && h && ce.set(o, !0),
								g === 1 && o.setAttribute(t, "true"),
								h || o.setAttribute(r, "true");
						} catch (k) {
							console.error("aria-hidden: cannot operate on ", o, k);
						}
				});
		};
		return (
			f(n),
			c.clear(),
			ke++,
			function () {
				d.forEach(function (l) {
					var o = H.get(l) - 1,
						p = i.get(l) - 1;
					H.set(l, o),
						i.set(l, p),
						o || (ce.has(l) || l.removeAttribute(r), ce.delete(l)),
						p || l.removeAttribute(t);
				}),
					ke--,
					ke ||
						((H = new WeakMap()),
						(H = new WeakMap()),
						(ce = new WeakMap()),
						(fe = {}));
			}
		);
	},
	un = function (e, n, t) {
		t === void 0 && (t = "data-aria-hidden");
		var r = Array.from(Array.isArray(e) ? e : [e]),
			s = n || rn(e);
		return s
			? (r.push.apply(r, Array.from(s.querySelectorAll("[aria-live], script"))),
			  ln(r, s, t, "aria-hidden"))
			: function () {
					return null;
			  };
	};
function dn(e) {
	let n;
	pe(
		() => Ze(e),
		t => {
			t ? (n = un(t)) : n && n();
		}
	),
		Te(() => {
			n && n();
		});
}
function Ee(e) {
	if (e === null || typeof e != "object") return !1;
	const n = Object.getPrototypeOf(e);
	return (n !== null &&
		n !== Object.prototype &&
		Object.getPrototypeOf(n) !== null) ||
		Symbol.iterator in e
		? !1
		: Symbol.toStringTag in e
		? Object.prototype.toString.call(e) === "[object Module]"
		: !0;
}
function Pe(e, n, t = ".", r) {
	if (!Ee(n)) return Pe(e, {}, t, r);
	const s = Object.assign({}, n);
	for (const i in e) {
		if (i === "__proto__" || i === "constructor") continue;
		const d = e[i];
		d != null &&
			((r && r(s, i, d, t)) ||
				(Array.isArray(d) && Array.isArray(s[i])
					? (s[i] = [...d, ...s[i]])
					: Ee(d) && Ee(s[i])
					? (s[i] = Pe(d, s[i], (t ? `${t}.` : "") + i.toString(), r))
					: (s[i] = d)));
	}
	return s;
}
function cn(e) {
	return (...n) => n.reduce((t, r) => Pe(t, r, "", e), {});
}
const fn = cn(),
	pn = et(() => {
		const e = S(new Map()),
			n = S(),
			t = N(() => {
				for (const d of e.value.values()) if (d) return !0;
				return !1;
			}),
			r = Qe({ scrollBody: S(!0) });
		let s = null;
		const i = () => {
			var d;
			(document.body.style.paddingRight = ""),
				(document.body.style.marginRight = ""),
				(document.body.style.pointerEvents = ""),
				document.documentElement.style.removeProperty("--scrollbar-width"),
				(document.body.style.overflow = (d = n.value) != null ? d : ""),
				Ne && (s == null || s()),
				(n.value = void 0);
		};
		return (
			pe(
				t,
				(d, c) => {
					var l;
					if (!Ie) return;
					if (!d) {
						c && i();
						return;
					}
					n.value === void 0 && (n.value = document.body.style.overflow);
					const a = window.innerWidth - document.documentElement.clientWidth,
						m = { padding: a, margin: 0 },
						f =
							(l = r.scrollBody) != null && l.value
								? typeof r.scrollBody.value == "object"
									? fn(
											{
												padding:
													r.scrollBody.value.padding === !0
														? a
														: r.scrollBody.value.padding,
												margin:
													r.scrollBody.value.margin === !0
														? a
														: r.scrollBody.value.margin,
											},
											m
									  )
									: m
								: { padding: 0, margin: 0 };
					a > 0 &&
						((document.body.style.paddingRight =
							typeof f.padding == "number"
								? `${f.padding}px`
								: String(f.padding)),
						(document.body.style.marginRight =
							typeof f.margin == "number"
								? `${f.margin}px`
								: String(f.margin)),
						document.documentElement.style.setProperty(
							"--scrollbar-width",
							`${a}px`
						),
						(document.body.style.overflow = "hidden")),
						Ne &&
							(s = Se(document, "touchmove", o => yn(o), {
								passive: !1,
							})),
						U(() => {
							(document.body.style.pointerEvents = "none"),
								(document.body.style.overflow = "hidden");
						});
				},
				{ immediate: !0, flush: "sync" }
			),
			e
		);
	});
function mn(e) {
	const n = Math.random().toString(36).substring(2, 7),
		t = pn();
	t.value.set(n, e != null ? e : !1);
	const r = N({
		get: () => {
			var s;
			return (s = t.value.get(n)) != null ? s : !1;
		},
		set: s => t.value.set(n, s),
	});
	return (
		St(() => {
			t.value.delete(n);
		}),
		r
	);
}
function dt(e) {
	const n = window.getComputedStyle(e);
	if (
		n.overflowX === "scroll" ||
		n.overflowY === "scroll" ||
		(n.overflowX === "auto" && e.clientWidth < e.scrollWidth) ||
		(n.overflowY === "auto" && e.clientHeight < e.scrollHeight)
	)
		return !0;
	{
		const t = e.parentNode;
		return !(t instanceof Element) || t.tagName === "BODY" ? !1 : dt(t);
	}
}
function yn(e) {
	const n = e || window.event,
		t = n.target;
	return t instanceof Element && dt(t)
		? !1
		: n.touches.length > 1
		? !0
		: (n.preventDefault && n.cancelable && n.preventDefault(), !1);
}
function Ge() {
	const e = S(),
		n = N(() => {
			var t, r;
			return ["#text", "#comment"].includes(
				(t = e.value) == null ? void 0 : t.$el.nodeName
			)
				? (r = e.value) == null
					? void 0
					: r.$el.nextElementSibling
				: Ze(e);
		});
	return { primitiveElement: e, currentElement: n };
}
const Ye = "data-reka-collection-item";
function ct(e = {}) {
	const { key: n = "", isProvider: t = !1 } = e,
		r = `${n}CollectionProvider`;
	let s;
	if (t) {
		const f = S(new Map());
		(s = { collectionRef: S(), itemMap: f }), Bt(r, s);
	} else s = _t(r);
	const i = (f = !1) => {
			const l = s.collectionRef.value;
			if (!l) return [];
			const o = Array.from(l.querySelectorAll(`[${Ye}]`)),
				h = Array.from(s.itemMap.value.values()).sort(
					(v, g) => o.indexOf(v.ref) - o.indexOf(g.ref)
				);
			return f ? h : h.filter(v => v.ref.dataset.disabled !== "");
		},
		d = B({
			name: "CollectionSlot",
			setup(f, { slots: l }) {
				const { primitiveElement: o, currentElement: p } = Ge();
				return (
					pe(p, () => {
						s.collectionRef.value = p.value;
					}),
					() => Ue(Ve, { ref: o }, l)
				);
			},
		}),
		c = B({
			name: "CollectionItem",
			inheritAttrs: !1,
			props: { value: { validator: () => !0 } },
			setup(f, { slots: l, attrs: o }) {
				const { primitiveElement: p, currentElement: h } = Ge();
				return (
					Z(v => {
						if (h.value) {
							const g = Pt(h.value);
							s.itemMap.value.set(g, { ref: h.value, value: f.value }),
								v(() => s.itemMap.value.delete(g));
						}
					}),
					() => Ue(Ve, se(x({}, o), { [Ye]: "", ref: p }), l)
				);
			},
		}),
		a = N(() => Array.from(s.itemMap.value.values())),
		m = N(() => s.itemMap.value.size);
	return {
		getItems: i,
		reactiveItems: a,
		itemMapSize: m,
		CollectionSlot: d,
		CollectionItem: c,
	};
}
const gn = "rovingFocusGroup.onEntryFocus",
	vn = { bubbles: !1, cancelable: !0 };
function hn(e, n = !1) {
	const t = $();
	for (const r of e)
		if (r === t || (r.focus({ preventScroll: n }), $() !== t)) return;
}
const [qn, bn] = X("RovingFocusGroup"),
	wn = B({
		__name: "RovingFocusGroup",
		props: {
			orientation: { default: void 0 },
			dir: {},
			loop: { type: Boolean, default: !1 },
			currentTabStopId: {},
			defaultCurrentTabStopId: {},
			preventScrollOnEntryFocus: { type: Boolean, default: !1 },
			asChild: { type: Boolean },
			as: {},
		},
		emits: ["entryFocus", "update:currentTabStopId"],
		setup(e, { expose: n, emit: t }) {
			const r = e,
				s = t,
				{ loop: i, orientation: d, dir: c } = me(r),
				a = Fe(c),
				m = ne(r, "currentTabStopId", s, {
					defaultValue: r.defaultCurrentTabStopId,
					passive: r.currentTabStopId === void 0,
				}),
				f = S(!1),
				l = S(!1),
				o = S(0),
				{ getItems: p, CollectionSlot: h } = ct({ isProvider: !0 });
			function v(k) {
				const O = !l.value;
				if (k.currentTarget && k.target === k.currentTarget && O && !f.value) {
					const T = new CustomEvent(gn, vn);
					if (
						(k.currentTarget.dispatchEvent(T),
						s("entryFocus", T),
						!T.defaultPrevented)
					) {
						const F = p()
								.map(K => K.ref)
								.filter(K => K.dataset.disabled !== ""),
							ae = F.find(K => K.getAttribute("data-active") === ""),
							ge = F.find(K => K.id === m.value),
							ve = [ae, ge, ...F].filter(Boolean);
						hn(ve, r.preventScrollOnEntryFocus);
					}
				}
				l.value = !1;
			}
			function g() {
				setTimeout(() => {
					l.value = !1;
				}, 1);
			}
			return (
				n({ getItems: p }),
				bn({
					loop: i,
					dir: a,
					orientation: d,
					currentTabStopId: m,
					onItemFocus: k => {
						m.value = k;
					},
					onItemShiftTab: () => {
						f.value = !0;
					},
					onFocusableItemAdd: () => {
						o.value++;
					},
					onFocusableItemRemove: () => {
						o.value--;
					},
				}),
				(k, O) => (
					b(),
					C(u(h), null, {
						default: w(() => [
							A(
								u(te),
								{
									tabindex: f.value || o.value === 0 ? -1 : 0,
									"data-orientation": u(d),
									as: k.as,
									"as-child": k.asChild,
									dir: u(a),
									style: { outline: "none" },
									onMousedown: O[0] || (O[0] = T => (l.value = !0)),
									onMouseup: g,
									onFocus: v,
									onBlur: O[1] || (O[1] = T => (f.value = !1)),
								},
								{ default: w(() => [_(k.$slots, "default")]), _: 3 },
								8,
								[
									"tabindex",
									"data-orientation",
									"as",
									"as-child",
									"dir",
								]
							),
						]),
						_: 3,
					})
				)
			);
		},
	});
function Cn(e) {
	const n = It("", 1e3);
	return {
		search: n,
		handleTypeaheadSearch: (s, i) => {
			n.value = n.value + s;
			{
				const d = $(),
					c = i.map(o => {
						var p, h, v, g;
						return se(x({}, o), {
							textValue:
								(g =
									(v =
										(p = o.value) == null ? void 0 : p.textValue) !=
									null
										? v
										: (h = o.ref.textContent) == null
										? void 0
										: h.trim()) != null
									? g
									: "",
						});
					}),
					a = c.find(o => o.ref === d),
					m = c.map(o => o.textValue),
					f = En(m, n.value, a == null ? void 0 : a.textValue),
					l = c.find(o => o.textValue === f);
				return l && l.ref.focus(), l == null ? void 0 : l.ref;
			}
		},
		resetTypeahead: () => {
			n.value = "";
		},
	};
}
function kn(e, n) {
	return e.map((t, r) => e[(n + r) % e.length]);
}
function En(e, n, t) {
	const s = n.length > 1 && Array.from(n).every(m => m === n[0]) ? n[0] : n,
		i = t ? e.indexOf(t) : -1;
	let d = kn(e, Math.max(i, 0));
	s.length === 1 && (d = d.filter(m => m !== t));
	const a = d.find(m => m.toLowerCase().startsWith(s.toLowerCase()));
	return a !== t ? a : void 0;
}
function On() {
	const e = S(!1);
	return (
		tt(() => {
			Se(
				"keydown",
				() => {
					e.value = !0;
				},
				{ capture: !0, passive: !0 }
			),
				Se(
					["pointerdown", "pointermove"],
					() => {
						e.value = !1;
					},
					{ capture: !0, passive: !0 }
				);
		}),
		e
	);
}
const Sn = et(On),
	[G, ft] = X(["MenuRoot", "MenuSub"], "MenuContext"),
	[oe, Bn] = X("MenuRoot"),
	_n = B({
		__name: "MenuRoot",
		props: {
			open: { type: Boolean, default: !1 },
			dir: {},
			modal: { type: Boolean, default: !0 },
		},
		emits: ["update:open"],
		setup(e, { emit: n }) {
			const t = e,
				r = n,
				{ modal: s, dir: i } = me(t),
				d = Fe(i),
				c = ne(t, "open", r),
				a = S(),
				m = Sn();
			return (
				ft({
					open: c,
					onOpenChange: f => {
						c.value = f;
					},
					content: a,
					onContentChange: f => {
						a.value = f;
					},
				}),
				Bn({
					onClose: () => {
						c.value = !1;
					},
					isUsingKeyboardRef: m,
					dir: d,
					modal: s,
				}),
				(f, l) => (
					b(),
					C(u(nt), null, { default: w(() => [_(f.$slots, "default")]), _: 3 })
				)
			);
		},
	});
let Oe = 0;
function Pn() {
	Z(e => {
		var t, r;
		if (!Ie) return;
		const n = document.querySelectorAll("[data-reka-focus-guard]");
		document.body.insertAdjacentElement(
			"afterbegin",
			(t = n[0]) != null ? t : He()
		),
			document.body.insertAdjacentElement(
				"beforeend",
				(r = n[1]) != null ? r : He()
			),
			Oe++,
			e(() => {
				Oe === 1 &&
					document
						.querySelectorAll("[data-reka-focus-guard]")
						.forEach(s => s.remove()),
					Oe--;
			});
	});
}
function He() {
	const e = document.createElement("span");
	return (
		e.setAttribute("data-reka-focus-guard", ""),
		(e.tabIndex = 0),
		(e.style.outline = "none"),
		(e.style.opacity = "0"),
		(e.style.position = "fixed"),
		(e.style.pointerEvents = "none"),
		e
	);
}
const [Ae, In] = X("MenuContent"),
	De = B({
		__name: "MenuContentImpl",
		props: Tt(
			{
				loop: { type: Boolean },
				disableOutsidePointerEvents: { type: Boolean },
				disableOutsideScroll: { type: Boolean },
				trapFocus: { type: Boolean },
				side: {},
				sideOffset: {},
				align: {},
				alignOffset: {},
				avoidCollisions: { type: Boolean },
				collisionBoundary: {},
				collisionPadding: {},
				arrowPadding: {},
				sticky: {},
				hideWhenDetached: { type: Boolean },
				positionStrategy: {},
				updatePositionStrategy: {},
				disableUpdateOnLayoutShift: { type: Boolean },
				prioritizePosition: { type: Boolean },
				reference: {},
				asChild: { type: Boolean },
				as: {},
			},
			x({}, Ft)
		),
		emits: [
			"escapeKeyDown",
			"pointerDownOutside",
			"focusOutside",
			"interactOutside",
			"entryFocus",
			"openAutoFocus",
			"closeAutoFocus",
			"dismiss",
		],
		setup(e, { emit: n }) {
			const t = e,
				r = n,
				s = G(),
				i = oe(),
				{ trapFocus: d, disableOutsidePointerEvents: c, loop: a } = me(t);
			Pn(), mn(c.value);
			const m = S(""),
				f = S(0),
				l = S(0),
				o = S(null),
				p = S("right"),
				h = S(0),
				v = S(null),
				g = S(),
				{ forwardRef: k, currentElement: O } = M(),
				{ handleTypeaheadSearch: T } = Cn();
			pe(O, y => {
				s.onContentChange(y);
			}),
				Te(() => {
					window.clearTimeout(f.value);
				});
			function F(y) {
				var P, W;
				return (
					p.value === ((P = o.value) == null ? void 0 : P.side) &&
					qt(y, (W = o.value) == null ? void 0 : W.area)
				);
			}
			function ae(y) {
				return D(this, null, function* () {
					var E;
					r("openAutoFocus", y),
						!y.defaultPrevented &&
							(y.preventDefault(),
							(E = O.value) == null || E.focus({ preventScroll: !0 }));
				});
			}
			function ge(y) {
				var Re, xe;
				if (y.defaultPrevented) return;
				const P =
						y.target.closest("[data-reka-menu-content]") ===
						y.currentTarget,
					W = y.ctrlKey || y.altKey || y.metaKey,
					he = y.key.length === 1,
					re = Vt(y, $(), O.value, {
						loop: a.value,
						arrowKeyOptions: "vertical",
						dir: i == null ? void 0 : i.dir.value,
						focus: !0,
						attributeName:
							"[data-reka-collection-item]:not([data-disabled])",
					});
				if (re) return re == null ? void 0 : re.focus();
				if (y.code === "Space") return;
				const Me =
					(xe = (Re = g.value) == null ? void 0 : Re.getItems()) != null
						? xe
						: [];
				if (
					(P &&
						(y.key === "Tab" && y.preventDefault(),
						!W && he && T(y.key, Me)),
					y.target !== O.value || !zt.includes(y.key))
				)
					return;
				y.preventDefault();
				const $e = [...Me.map(vt => vt.ref)];
				st.includes(y.key) && $e.reverse(), Ht($e);
			}
			function ve(y) {
				var E, P;
				((P =
					(E = y == null ? void 0 : y.currentTarget) == null
						? void 0
						: E.contains) != null &&
					P.call(E, y.target)) ||
					(window.clearTimeout(f.value), (m.value = ""));
			}
			function K(y) {
				var W;
				if (!ee(y)) return;
				const E = y.target,
					P = h.value !== y.clientX;
				if (
					(W = y == null ? void 0 : y.currentTarget) != null &&
					W.contains(E) &&
					P
				) {
					const he = y.clientX > h.value ? "right" : "left";
					(p.value = he), (h.value = y.clientX);
				}
			}
			return (
				In({
					onItemEnter: y => !!F(y),
					onItemLeave: y => {
						var E;
						F(y) || ((E = O.value) == null || E.focus(), (v.value = null));
					},
					onTriggerLeave: y => !!F(y),
					searchRef: m,
					pointerGraceTimerRef: l,
					onPointerGraceIntentChange: y => {
						o.value = y;
					},
				}),
				(y, E) => (
					b(),
					C(
						u(an),
						{
							"as-child": "",
							trapped: u(d),
							onMountAutoFocus: ae,
							onUnmountAutoFocus:
								E[7] || (E[7] = P => r("closeAutoFocus", P)),
						},
						{
							default: w(() => [
								A(
									u(At),
									{
										"as-child": "",
										"disable-outside-pointer-events": u(c),
										onEscapeKeyDown:
											E[2] || (E[2] = P => r("escapeKeyDown", P)),
										onPointerDownOutside:
											E[3] ||
											(E[3] = P => r("pointerDownOutside", P)),
										onFocusOutside:
											E[4] || (E[4] = P => r("focusOutside", P)),
										onInteractOutside:
											E[5] ||
											(E[5] = P => r("interactOutside", P)),
										onDismiss: E[6] || (E[6] = P => r("dismiss")),
									},
									{
										default: w(() => [
											A(
												u(wn),
												{
													ref_key: "rovingFocusGroupRef",
													ref: g,
													"current-tab-stop-id": v.value,
													"onUpdate:currentTabStopId":
														E[0] ||
														(E[0] = P => (v.value = P)),
													"as-child": "",
													orientation: "vertical",
													dir: u(i).dir.value,
													loop: u(a),
													onEntryFocus:
														E[1] ||
														(E[1] = P => {
															r("entryFocus", P),
																u(i).isUsingKeyboardRef
																	.value ||
																	P.preventDefault();
														}),
												},
												{
													default: w(() => [
														A(
															u(Dt),
															{
																ref: u(k),
																role: "menu",
																as: y.as,
																"as-child": y.asChild,
																"aria-orientation":
																	"vertical",
																"data-reka-menu-content":
																	"",
																"data-state": u(it)(
																	u(s).open.value
																),
																dir: u(i).dir.value,
																side: y.side,
																"side-offset":
																	y.sideOffset,
																align: y.align,
																"align-offset":
																	y.alignOffset,
																"avoid-collisions":
																	y.avoidCollisions,
																"collision-boundary":
																	y.collisionBoundary,
																"collision-padding":
																	y.collisionPadding,
																"arrow-padding":
																	y.arrowPadding,
																"prioritize-position":
																	y.prioritizePosition,
																"position-strategy":
																	y.positionStrategy,
																"update-position-strategy":
																	y.updatePositionStrategy,
																sticky: y.sticky,
																"hide-when-detached":
																	y.hideWhenDetached,
																reference: y.reference,
																onKeydown: ge,
																onBlur: ve,
																onPointermove: K,
															},
															{
																default: w(() => [
																	_(
																		y.$slots,
																		"default"
																	),
																]),
																_: 3,
															},
															8,
															[
																"as",
																"as-child",
																"data-state",
																"dir",
																"side",
																"side-offset",
																"align",
																"align-offset",
																"avoid-collisions",
																"collision-boundary",
																"collision-padding",
																"arrow-padding",
																"prioritize-position",
																"position-strategy",
																"update-position-strategy",
																"sticky",
																"hide-when-detached",
																"reference",
															]
														),
													]),
													_: 3,
												},
												8,
												["current-tab-stop-id", "dir", "loop"]
											),
										]),
										_: 3,
									},
									8,
									["disable-outside-pointer-events"]
								),
							]),
							_: 3,
						},
						8,
						["trapped"]
					)
				)
			);
		},
	}),
	pt = B({
		inheritAttrs: !1,
		__name: "MenuItemImpl",
		props: {
			disabled: { type: Boolean },
			textValue: {},
			asChild: { type: Boolean },
			as: {},
		},
		setup(e) {
			const n = e,
				t = Ae(),
				{ forwardRef: r } = M(),
				{ CollectionItem: s } = ct(),
				i = S(!1);
			function d(a) {
				return D(this, null, function* () {
					if (!a.defaultPrevented && ee(a)) {
						if (n.disabled) t.onItemLeave(a);
						else if (!t.onItemEnter(a)) {
							const f = a.currentTarget;
							f == null || f.focus({ preventScroll: !0 });
						}
					}
				});
			}
			function c(a) {
				return D(this, null, function* () {
					yield U(), !a.defaultPrevented && ee(a) && t.onItemLeave(a);
				});
			}
			return (a, m) => (
				b(),
				C(
					u(s),
					{ value: { textValue: a.textValue } },
					{
						default: w(() => [
							A(
								u(te),
								R(
									{ ref: u(r), role: "menuitem", tabindex: "-1" },
									a.$attrs,
									{
										as: a.as,
										"as-child": a.asChild,
										"aria-disabled": a.disabled || void 0,
										"data-disabled": a.disabled ? "" : void 0,
										"data-highlighted": i.value ? "" : void 0,
										onPointermove: d,
										onPointerleave: c,
										onFocus:
											m[0] ||
											(m[0] = f =>
												D(this, null, function* () {
													yield U(),
														!(
															f.defaultPrevented ||
															a.disabled
														) && (i.value = !0);
												})),
										onBlur:
											m[1] ||
											(m[1] = f =>
												D(this, null, function* () {
													yield U(),
														!f.defaultPrevented &&
															(i.value = !1);
												})),
									}
								),
								{ default: w(() => [_(a.$slots, "default")]), _: 3 },
								16,
								[
									"as",
									"as-child",
									"aria-disabled",
									"data-disabled",
									"data-highlighted",
								]
							),
						]),
						_: 3,
					},
					8,
					["value"]
				)
			);
		},
	}),
	Tn = B({
		__name: "MenuItem",
		props: {
			disabled: { type: Boolean },
			textValue: {},
			asChild: { type: Boolean },
			as: {},
		},
		emits: ["select"],
		setup(e, { emit: n }) {
			const t = e,
				r = n,
				{ forwardRef: s, currentElement: i } = M(),
				d = oe(),
				c = Ae(),
				a = S(!1);
			function m() {
				return D(this, null, function* () {
					const f = i.value;
					if (!t.disabled && f) {
						const l = new CustomEvent(jt, { bubbles: !0, cancelable: !0 });
						r("select", l),
							yield U(),
							l.defaultPrevented ? (a.value = !1) : d.onClose();
					}
				});
			}
			return (f, l) => (
				b(),
				C(
					pt,
					R(t, {
						ref: u(s),
						onClick: m,
						onPointerdown:
							l[0] ||
							(l[0] = () => {
								a.value = !0;
							}),
						onPointerup:
							l[1] ||
							(l[1] = o =>
								D(this, null, function* () {
									var p;
									yield U(),
										!o.defaultPrevented &&
											(a.value ||
												(p = o.currentTarget) == null ||
												p.click());
								})),
						onKeydown:
							l[2] ||
							(l[2] = o =>
								D(this, null, function* () {
									const p = u(c).searchRef.value !== "";
									f.disabled ||
										(p && o.key === " ") ||
										(u(_e).includes(o.key) &&
											(o.currentTarget.click(),
											o.preventDefault()));
								})),
					}),
					{ default: w(() => [_(f.$slots, "default")]), _: 3 },
					16
				)
			);
		},
	}),
	Fn = B({
		__name: "MenuRootContentModal",
		props: {
			loop: { type: Boolean },
			side: {},
			sideOffset: {},
			align: {},
			alignOffset: {},
			avoidCollisions: { type: Boolean },
			collisionBoundary: {},
			collisionPadding: {},
			arrowPadding: {},
			sticky: {},
			hideWhenDetached: { type: Boolean },
			positionStrategy: {},
			updatePositionStrategy: {},
			disableUpdateOnLayoutShift: { type: Boolean },
			prioritizePosition: { type: Boolean },
			reference: {},
			asChild: { type: Boolean },
			as: {},
		},
		emits: [
			"escapeKeyDown",
			"pointerDownOutside",
			"focusOutside",
			"interactOutside",
			"entryFocus",
			"openAutoFocus",
			"closeAutoFocus",
		],
		setup(e, { emit: n }) {
			const t = e,
				r = n,
				s = q(t, r),
				i = G(),
				{ forwardRef: d, currentElement: c } = M();
			return (
				dn(c),
				(a, m) => (
					b(),
					C(
						De,
						R(u(s), {
							ref: u(d),
							"trap-focus": u(i).open.value,
							"disable-outside-pointer-events": u(i).open.value,
							"disable-outside-scroll": !0,
							onDismiss: m[0] || (m[0] = f => u(i).onOpenChange(!1)),
							onFocusOutside:
								m[1] ||
								(m[1] = Be(f => r("focusOutside", f), ["prevent"])),
						}),
						{ default: w(() => [_(a.$slots, "default")]), _: 3 },
						16,
						["trap-focus", "disable-outside-pointer-events"]
					)
				)
			);
		},
	}),
	An = B({
		__name: "MenuRootContentNonModal",
		props: {
			loop: { type: Boolean },
			side: {},
			sideOffset: {},
			align: {},
			alignOffset: {},
			avoidCollisions: { type: Boolean },
			collisionBoundary: {},
			collisionPadding: {},
			arrowPadding: {},
			sticky: {},
			hideWhenDetached: { type: Boolean },
			positionStrategy: {},
			updatePositionStrategy: {},
			disableUpdateOnLayoutShift: { type: Boolean },
			prioritizePosition: { type: Boolean },
			reference: {},
			asChild: { type: Boolean },
			as: {},
		},
		emits: [
			"escapeKeyDown",
			"pointerDownOutside",
			"focusOutside",
			"interactOutside",
			"entryFocus",
			"openAutoFocus",
			"closeAutoFocus",
		],
		setup(e, { emit: n }) {
			const s = q(e, n),
				i = G();
			return (d, c) => (
				b(),
				C(
					De,
					R(u(s), {
						"trap-focus": !1,
						"disable-outside-pointer-events": !1,
						"disable-outside-scroll": !1,
						onDismiss: c[0] || (c[0] = a => u(i).onOpenChange(!1)),
					}),
					{ default: w(() => [_(d.$slots, "default")]), _: 3 },
					16
				)
			);
		},
	}),
	Dn = B({
		__name: "MenuContent",
		props: {
			forceMount: { type: Boolean },
			loop: { type: Boolean },
			side: {},
			sideOffset: {},
			align: {},
			alignOffset: {},
			avoidCollisions: { type: Boolean },
			collisionBoundary: {},
			collisionPadding: {},
			arrowPadding: {},
			sticky: {},
			hideWhenDetached: { type: Boolean },
			positionStrategy: {},
			updatePositionStrategy: {},
			disableUpdateOnLayoutShift: { type: Boolean },
			prioritizePosition: { type: Boolean },
			reference: {},
			asChild: { type: Boolean },
			as: {},
		},
		emits: [
			"escapeKeyDown",
			"pointerDownOutside",
			"focusOutside",
			"interactOutside",
			"entryFocus",
			"openAutoFocus",
			"closeAutoFocus",
		],
		setup(e, { emit: n }) {
			const s = q(e, n),
				i = G(),
				d = oe();
			return (c, a) => (
				b(),
				C(
					u(ot),
					{ present: c.forceMount || u(i).open.value },
					{
						default: w(() => [
							u(d).modal.value
								? (b(),
								  C(
										Fn,
										L(R({ key: 0 }, x(x({}, c.$attrs), u(s)))),
										{
											default: w(() => [_(c.$slots, "default")]),
											_: 3,
										},
										16
								  ))
								: (b(),
								  C(
										An,
										L(R({ key: 1 }, x(x({}, c.$attrs), u(s)))),
										{
											default: w(() => [_(c.$slots, "default")]),
											_: 3,
										},
										16
								  )),
						]),
						_: 3,
					},
					8,
					["present"]
				)
			);
		},
	}),
	Mn = B({
		__name: "MenuLabel",
		props: { asChild: { type: Boolean }, as: { default: "div" } },
		setup(e) {
			const n = e;
			return (t, r) => (
				b(),
				C(
					u(te),
					L(z(n)),
					{ default: w(() => [_(t.$slots, "default")]), _: 3 },
					16
				)
			);
		},
	}),
	$n = B({
		__name: "MenuPortal",
		props: {
			to: {},
			disabled: { type: Boolean },
			defer: { type: Boolean },
			forceMount: { type: Boolean },
		},
		setup(e) {
			const n = e;
			return (t, r) => (
				b(),
				C(
					u(Mt),
					L(z(n)),
					{ default: w(() => [_(t.$slots, "default")]), _: 3 },
					16
				)
			);
		},
	}),
	[mt, Rn] = X("MenuSub"),
	xn = B({
		__name: "MenuSub",
		props: { open: { type: Boolean, default: void 0 } },
		emits: ["update:open"],
		setup(e, { emit: n }) {
			const t = e,
				s = ne(t, "open", n, { defaultValue: !1, passive: t.open === void 0 }),
				i = G(),
				d = S(),
				c = S();
			return (
				Z(a => {
					(i == null ? void 0 : i.open.value) === !1 && (s.value = !1),
						a(() => (s.value = !1));
				}),
				ft({
					open: s,
					onOpenChange: a => {
						s.value = a;
					},
					content: c,
					onContentChange: a => {
						c.value = a;
					},
				}),
				Rn({
					triggerId: "",
					contentId: "",
					trigger: d,
					onTriggerChange: a => {
						d.value = a;
					},
				}),
				(a, m) => (
					b(),
					C(u(nt), null, { default: w(() => [_(a.$slots, "default")]), _: 3 })
				)
			);
		},
	}),
	Ln = B({
		__name: "MenuSubContent",
		props: {
			forceMount: { type: Boolean },
			loop: { type: Boolean },
			sideOffset: {},
			alignOffset: {},
			avoidCollisions: { type: Boolean },
			collisionBoundary: {},
			collisionPadding: {},
			arrowPadding: {},
			sticky: {},
			hideWhenDetached: { type: Boolean },
			positionStrategy: {},
			updatePositionStrategy: {},
			disableUpdateOnLayoutShift: { type: Boolean },
			prioritizePosition: { type: Boolean, default: !0 },
			reference: {},
			asChild: { type: Boolean },
			as: {},
		},
		emits: [
			"escapeKeyDown",
			"pointerDownOutside",
			"focusOutside",
			"interactOutside",
			"entryFocus",
			"openAutoFocus",
			"closeAutoFocus",
		],
		setup(e, { emit: n }) {
			const s = q(e, n),
				i = G(),
				d = oe(),
				c = mt(),
				{ forwardRef: a, currentElement: m } = M();
			return (
				c.contentId || (c.contentId = ye(void 0, "reka-menu-sub-content")),
				(f, l) => (
					b(),
					C(
						u(ot),
						{ present: f.forceMount || u(i).open.value },
						{
							default: w(() => [
								A(
									De,
									R(u(s), {
										id: u(c).contentId,
										ref: u(a),
										"aria-labelledby": u(c).triggerId,
										align: "start",
										side:
											u(d).dir.value === "rtl" ? "left" : "right",
										"disable-outside-pointer-events": !1,
										"disable-outside-scroll": !1,
										"trap-focus": !1,
										onOpenAutoFocus:
											l[0] ||
											(l[0] = Be(
												o => {
													var p;
													u(d).isUsingKeyboardRef.value &&
														((p = u(m)) == null ||
															p.focus());
												},
												["prevent"]
											)),
										onCloseAutoFocus:
											l[1] || (l[1] = Be(() => {}, ["prevent"])),
										onFocusOutside:
											l[2] ||
											(l[2] = o => {
												o.defaultPrevented ||
													(o.target !== u(c).trigger.value &&
														u(i).onOpenChange(!1));
											}),
										onEscapeKeyDown:
											l[3] ||
											(l[3] = o => {
												u(d).onClose(), o.preventDefault();
											}),
										onKeydown:
											l[4] ||
											(l[4] = o => {
												var v, g;
												const p =
														(v = o.currentTarget) == null
															? void 0
															: v.contains(o.target),
													h = u(Yt)[u(d).dir.value].includes(
														o.key
													);
												p &&
													h &&
													(u(i).onOpenChange(!1),
													(g = u(c).trigger.value) == null ||
														g.focus(),
													o.preventDefault());
											}),
									}),
									{
										default: w(() => [_(f.$slots, "default")]),
										_: 3,
									},
									16,
									["id", "aria-labelledby", "side"]
								),
							]),
							_: 3,
						},
						8,
						["present"]
					)
				)
			);
		},
	}),
	yt = B({
		__name: "MenuAnchor",
		props: { reference: {}, asChild: { type: Boolean }, as: {} },
		setup(e) {
			const n = e;
			return (t, r) => (
				b(),
				C(
					u($t),
					L(z(n)),
					{ default: w(() => [_(t.$slots, "default")]), _: 3 },
					16
				)
			);
		},
	}),
	Kn = B({
		__name: "MenuSubTrigger",
		props: {
			disabled: { type: Boolean },
			textValue: {},
			asChild: { type: Boolean },
			as: {},
		},
		setup(e) {
			const n = e,
				t = G(),
				r = oe(),
				s = mt(),
				i = Ae(),
				d = S(null);
			s.triggerId || (s.triggerId = ye(void 0, "reka-menu-sub-trigger"));
			function c() {
				d.value && window.clearTimeout(d.value), (d.value = null);
			}
			Te(() => {
				c();
			});
			function a(l) {
				!ee(l) ||
					i.onItemEnter(l) ||
					(!n.disabled &&
						!t.open.value &&
						!d.value &&
						(i.onPointerGraceIntentChange(null),
						(d.value = window.setTimeout(() => {
							t.onOpenChange(!0), c();
						}, 100))));
			}
			function m(l) {
				return D(this, null, function* () {
					var p, h;
					if (!ee(l)) return;
					c();
					const o =
						(p = t.content.value) == null
							? void 0
							: p.getBoundingClientRect();
					if (o != null && o.width) {
						const v =
								(h = t.content.value) == null ? void 0 : h.dataset.side,
							g = v === "right",
							k = g ? -5 : 5,
							O = o[g ? "left" : "right"],
							T = o[g ? "right" : "left"];
						i.onPointerGraceIntentChange({
							area: [
								{ x: l.clientX + k, y: l.clientY },
								{ x: O, y: o.top },
								{ x: T, y: o.top },
								{ x: T, y: o.bottom },
								{ x: O, y: o.bottom },
							],
							side: v,
						}),
							window.clearTimeout(i.pointerGraceTimerRef.value),
							(i.pointerGraceTimerRef.value = window.setTimeout(
								() => i.onPointerGraceIntentChange(null),
								300
							));
					} else {
						if (i.onTriggerLeave(l)) return;
						i.onPointerGraceIntentChange(null);
					}
				});
			}
			function f(l) {
				return D(this, null, function* () {
					var p;
					const o = i.searchRef.value !== "";
					n.disabled ||
						(o && l.key === " ") ||
						(Gt[r.dir.value].includes(l.key) &&
							(t.onOpenChange(!0),
							yield U(),
							(p = t.content.value) == null || p.focus(),
							l.preventDefault()));
				});
			}
			return (l, o) => (
				b(),
				C(
					yt,
					{ "as-child": "" },
					{
						default: w(() => [
							A(
								pt,
								R(n, {
									id: u(s).triggerId,
									ref: p => {
										var h;
										(h = u(s)) == null ||
											h.onTriggerChange(
												p == null ? void 0 : p.$el
											);
									},
									"aria-haspopup": "menu",
									"aria-expanded": u(t).open.value,
									"aria-controls": u(s).contentId,
									"data-state": u(it)(u(t).open.value),
									onClick:
										o[0] ||
										(o[0] = p =>
											D(this, null, function* () {
												n.disabled ||
													p.defaultPrevented ||
													(p.currentTarget.focus(),
													u(t).open.value ||
														u(t).onOpenChange(!0));
											})),
									onPointermove: a,
									onPointerleave: m,
									onKeydown: f,
								}),
								{ default: w(() => [_(l.$slots, "default")]), _: 3 },
								16,
								["id", "aria-expanded", "aria-controls", "data-state"]
							),
						]),
						_: 3,
					}
				)
			);
		},
	}),
	[gt, Nn] = X("DropdownMenuRoot"),
	Un = B({
		__name: "DropdownMenuRoot",
		props: {
			defaultOpen: { type: Boolean },
			open: { type: Boolean, default: void 0 },
			dir: {},
			modal: { type: Boolean, default: !0 },
		},
		emits: ["update:open"],
		setup(e, { emit: n }) {
			const t = e,
				r = n;
			M();
			const s = ne(t, "open", r, {
					defaultValue: t.defaultOpen,
					passive: t.open === void 0,
				}),
				i = S(),
				{ modal: d, dir: c } = me(t),
				a = Fe(c);
			return (
				Nn({
					open: s,
					onOpenChange: m => {
						s.value = m;
					},
					onOpenToggle: () => {
						s.value = !s.value;
					},
					triggerId: "",
					triggerElement: i,
					contentId: "",
					modal: d,
					dir: a,
				}),
				(m, f) => (
					b(),
					C(
						u(_n),
						{
							open: u(s),
							"onUpdate:open":
								f[0] || (f[0] = l => (at(s) ? (s.value = l) : null)),
							dir: u(a),
							modal: u(d),
						},
						{
							default: w(() => [_(m.$slots, "default", { open: u(s) })]),
							_: 3,
						},
						8,
						["open", "dir", "modal"]
					)
				)
			);
		},
	}),
	Vn = B({
		__name: "DropdownMenuContent",
		props: {
			forceMount: { type: Boolean },
			loop: { type: Boolean },
			side: {},
			sideOffset: {},
			align: {},
			alignOffset: {},
			avoidCollisions: { type: Boolean },
			collisionBoundary: {},
			collisionPadding: {},
			arrowPadding: {},
			sticky: {},
			hideWhenDetached: { type: Boolean },
			positionStrategy: {},
			updatePositionStrategy: {},
			disableUpdateOnLayoutShift: { type: Boolean },
			prioritizePosition: { type: Boolean },
			reference: {},
			asChild: { type: Boolean },
			as: {},
		},
		emits: [
			"escapeKeyDown",
			"pointerDownOutside",
			"focusOutside",
			"interactOutside",
			"closeAutoFocus",
		],
		setup(e, { emit: n }) {
			const s = q(e, n);
			M();
			const i = gt(),
				d = S(!1);
			function c(a) {
				a.defaultPrevented ||
					(d.value ||
						setTimeout(() => {
							var m;
							(m = i.triggerElement.value) == null || m.focus();
						}, 0),
					(d.value = !1),
					a.preventDefault());
			}
			return (
				i.contentId || (i.contentId = ye(void 0, "reka-dropdown-menu-content")),
				(a, m) => {
					var f;
					return (
						b(),
						C(
							u(Dn),
							R(u(s), {
								id: u(i).contentId,
								"aria-labelledby":
									(f = u(i)) == null ? void 0 : f.triggerId,
								style: {
									"--reka-dropdown-menu-content-transform-origin":
										"var(--reka-popper-transform-origin)",
									"--reka-dropdown-menu-content-available-width":
										"var(--reka-popper-available-width)",
									"--reka-dropdown-menu-content-available-height":
										"var(--reka-popper-available-height)",
									"--reka-dropdown-menu-trigger-width":
										"var(--reka-popper-anchor-width)",
									"--reka-dropdown-menu-trigger-height":
										"var(--reka-popper-anchor-height)",
								},
								onCloseAutoFocus: c,
								onInteractOutside:
									m[0] ||
									(m[0] = l => {
										var v;
										if (l.defaultPrevented) return;
										const o = l.detail.originalEvent,
											p = o.button === 0 && o.ctrlKey === !0,
											h = o.button === 2 || p;
										(!u(i).modal.value || h) && (d.value = !0),
											(v = u(i).triggerElement.value) != null &&
												v.contains(l.target) &&
												l.preventDefault();
									}),
							}),
							{ default: w(() => [_(a.$slots, "default")]), _: 3 },
							16,
							["id", "aria-labelledby"]
						)
					);
				}
			);
		},
	}),
	Xe = B({
		__name: "DropdownMenuItem",
		props: {
			disabled: { type: Boolean },
			textValue: {},
			asChild: { type: Boolean },
			as: {},
		},
		emits: ["select"],
		setup(e, { emit: n }) {
			const t = e,
				s = Rt(n);
			return (
				M(),
				(i, d) => (
					b(),
					C(
						u(Tn),
						L(z(x(x({}, t), u(s)))),
						{ default: w(() => [_(i.$slots, "default")]), _: 3 },
						16
					)
				)
			);
		},
	}),
	qe = B({
		__name: "DropdownMenuLabel",
		props: { asChild: { type: Boolean }, as: {} },
		setup(e) {
			const n = e;
			return (
				M(),
				(t, r) => (
					b(),
					C(
						u(Mn),
						L(z(n)),
						{ default: w(() => [_(t.$slots, "default")]), _: 3 },
						16
					)
				)
			);
		},
	}),
	Je = B({
		__name: "DropdownMenuPortal",
		props: {
			to: {},
			disabled: { type: Boolean },
			defer: { type: Boolean },
			forceMount: { type: Boolean },
		},
		setup(e) {
			const n = e;
			return (t, r) => (
				b(),
				C(
					u($n),
					L(z(n)),
					{ default: w(() => [_(t.$slots, "default")]), _: 3 },
					16
				)
			);
		},
	}),
	jn = B({
		__name: "DropdownMenuSub",
		props: {
			defaultOpen: { type: Boolean },
			open: { type: Boolean, default: void 0 },
		},
		emits: ["update:open"],
		setup(e, { emit: n }) {
			var i;
			const t = e,
				s = ne(t, "open", n, {
					passive: t.open === void 0,
					defaultValue: (i = t.defaultOpen) != null ? i : !1,
				});
			return (
				M(),
				(d, c) => (
					b(),
					C(
						u(xn),
						{
							open: u(s),
							"onUpdate:open":
								c[0] || (c[0] = a => (at(s) ? (s.value = a) : null)),
						},
						{
							default: w(() => [_(d.$slots, "default", { open: u(s) })]),
							_: 3,
						},
						8,
						["open"]
					)
				)
			);
		},
	}),
	Wn = B({
		__name: "DropdownMenuSubContent",
		props: {
			forceMount: { type: Boolean },
			loop: { type: Boolean },
			sideOffset: {},
			alignOffset: {},
			avoidCollisions: { type: Boolean },
			collisionBoundary: {},
			collisionPadding: {},
			arrowPadding: {},
			sticky: {},
			hideWhenDetached: { type: Boolean },
			positionStrategy: {},
			updatePositionStrategy: {},
			disableUpdateOnLayoutShift: { type: Boolean },
			prioritizePosition: { type: Boolean },
			reference: {},
			asChild: { type: Boolean },
			as: {},
		},
		emits: [
			"escapeKeyDown",
			"pointerDownOutside",
			"focusOutside",
			"interactOutside",
			"entryFocus",
			"openAutoFocus",
			"closeAutoFocus",
		],
		setup(e, { emit: n }) {
			const s = q(e, n);
			return (
				M(),
				(i, d) => (
					b(),
					C(
						u(Ln),
						R(u(s), {
							style: {
								"--reka-dropdown-menu-content-transform-origin":
									"var(--reka-popper-transform-origin)",
								"--reka-dropdown-menu-content-available-width":
									"var(--reka-popper-available-width)",
								"--reka-dropdown-menu-content-available-height":
									"var(--reka-popper-available-height)",
								"--reka-dropdown-menu-trigger-width":
									"var(--reka-popper-anchor-width)",
								"--reka-dropdown-menu-trigger-height":
									"var(--reka-popper-anchor-height)",
							},
						}),
						{ default: w(() => [_(i.$slots, "default")]), _: 3 },
						16
					)
				)
			);
		},
	}),
	zn = B({
		__name: "DropdownMenuSubTrigger",
		props: {
			disabled: { type: Boolean },
			textValue: {},
			asChild: { type: Boolean },
			as: {},
		},
		setup(e) {
			const n = e;
			return (
				M(),
				(t, r) => (
					b(),
					C(
						u(Kn),
						L(z(n)),
						{ default: w(() => [_(t.$slots, "default")]), _: 3 },
						16
					)
				)
			);
		},
	}),
	Gn = B({
		__name: "DropdownMenuTrigger",
		props: {
			disabled: { type: Boolean },
			asChild: { type: Boolean },
			as: { default: "button" },
		},
		setup(e) {
			const n = e,
				t = gt(),
				{ forwardRef: r, currentElement: s } = M();
			return (
				tt(() => {
					t.triggerElement = s;
				}),
				t.triggerId || (t.triggerId = ye(void 0, "reka-dropdown-menu-trigger")),
				(i, d) => (
					b(),
					C(
						u(yt),
						{ "as-child": "" },
						{
							default: w(() => [
								A(
									u(te),
									{
										id: u(t).triggerId,
										ref: u(r),
										type: i.as === "button" ? "button" : void 0,
										"as-child": n.asChild,
										as: i.as,
										"aria-haspopup": "menu",
										"aria-expanded": u(t).open.value,
										"aria-controls": u(t).open.value
											? u(t).contentId
											: void 0,
										"data-disabled": i.disabled ? "" : void 0,
										disabled: i.disabled,
										"data-state": u(t).open.value
											? "open"
											: "closed",
										onClick:
											d[0] ||
											(d[0] = c =>
												D(this, null, function* () {
													var a;
													!i.disabled &&
														c.button === 0 &&
														c.ctrlKey === !1 &&
														((a = u(t)) == null ||
															a.onOpenToggle(),
														yield U(),
														u(t).open.value &&
															c.preventDefault());
												})),
										onKeydown:
											d[1] ||
											(d[1] = xt(
												c => {
													i.disabled ||
														(["Enter", " "].includes(
															c.key
														) && u(t).onOpenToggle(),
														c.key === "ArrowDown" &&
															u(t).onOpenChange(!0),
														[
															"Enter",
															" ",
															"ArrowDown",
														].includes(c.key) &&
															c.preventDefault());
												},
												["enter", "space", "arrow-down"]
											)),
									},
									{
										default: w(() => [_(i.$slots, "default")]),
										_: 3,
									},
									8,
									[
										"id",
										"type",
										"as-child",
										"as",
										"aria-expanded",
										"aria-controls",
										"data-disabled",
										"disabled",
										"data-state",
									]
								),
							]),
							_: 3,
						}
					)
				)
			);
		},
	}),
	Yn = B({
		__name: "Dropdown",
		props: {
			button: {},
			options: { default: () => [] },
			placement: { default: "left" },
		},
		setup(e) {
			const n = Lt(),
				t = e,
				r = o => {
					o.route ? n.push(o.route) : o.onClick && o.onClick();
				},
				s = o => ({
					label: o.label,
					icon: o.icon,
					component: o.component,
					onClick: () => r(o),
					submenu: o.submenu,
				}),
				i = o => {
					let p = [],
						h = null,
						v = 0;
					for (let g of o)
						if (g != null) {
							if ("group" in g) {
								h && (p.push(h), (h = null));
								let k = se(x({ key: v }, g), { items: c(g.items) });
								p.push(k);
							} else
								h ||
									(h = {
										key: v,
										group: "",
										hideLabel: !0,
										items: [],
									}),
									h.items.push(...c([g]));
							v++;
						}
					return h && p.push(h), p;
				},
				d = o => i(o),
				c = o =>
					(o || [])
						.filter(Boolean)
						.filter(p => (p.condition ? p.condition() : !0))
						.map(p => s(p)),
				a = {
					dropdownContent:
						"min-w-40 divide-y divide-outline-gray-modals rounded-lg bg-surface-modal shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-content",
					groupContainer: "p-1.5",
					groupLabel:
						"flex h-7 items-center px-2 text-sm font-medium text-ink-gray-6",
					itemLabel: "whitespace-nowrap text-ink-gray-7",
					itemIcon: "mr-2 h-4 w-4 flex-shrink-0 text-ink-gray-6",
					chevronIcon: "ml-auto h-4 w-4 flex-shrink-0 text-ink-gray-6",
					itemButton:
						"group flex h-7 w-full items-center rounded px-2 text-base text-ink-gray-6 focus:bg-surface-gray-3 focus:outline-none data-[highlighted]:bg-surface-gray-3",
					submenuTrigger:
						"group flex h-7 w-full items-center rounded px-2 text-base text-ink-gray-6 focus:bg-surface-gray-3 focus:outline-none data-[highlighted]:bg-surface-gray-3 data-[state=open]:bg-surface-gray-3",
				},
				m = N(() => i(t.options)),
				f = N(() => "bottom"),
				l = N(() =>
					t.placement === "left"
						? "start"
						: t.placement === "right"
						? "end"
						: t.placement === "center"
						? "center"
						: "start"
				);
			return (o, p) => (
				b(),
				C(u(Un), null, {
					default: w(({ open: h }) => [
						A(
							u(Gn),
							{ "as-child": "" },
							{
								default: w(() => [
									o.$slots.default
										? _(
												o.$slots,
												"default",
												L(R({ key: 0 }, { open: h })),
												void 0,
												!0
										  )
										: (b(),
										  C(
												u(Kt),
												R({ key: 1, active: !1 }, o.button),
												{
													default: w(() => {
														var v;
														return [
															be(
																Y(
																	o.button
																		? ((v =
																				o.button) ==
																		  null
																				? void 0
																				: v.label) ||
																				null
																		: "Options"
																),
																1
															),
														];
													}),
													_: 1,
												},
												16
										  )),
								]),
								_: 2,
							},
							1024
						),
						A(u(Je), null, {
							default: w(() => [
								A(
									u(Vn),
									{
										class: I([
											a.dropdownContent,
											{
												"origin-top-left":
													o.placement == "left",
												"origin-top-right":
													o.placement == "right",
												"origin-top": o.placement == "center",
											},
										]),
										side: f.value,
										align: l.value,
										"side-offset": 4,
									},
									{
										default: w(() => [
											(b(!0),
											V(
												le,
												null,
												ie(
													m.value,
													v => (
														b(),
														V(
															"div",
															{
																key: v.key,
																class: I(
																	a.groupContainer
																),
															},
															[
																v.group && !v.hideLabel
																	? (b(),
																	  C(
																			u(qe),
																			{
																				key: 0,
																				class: I(
																					a.groupLabel
																				),
																			},
																			{
																				default:
																					w(
																						() => [
																							be(
																								Y(
																									v.group
																								),
																								1
																							),
																						]
																					),
																				_: 2,
																			},
																			1032,
																			["class"]
																	  ))
																	: J("", !0),
																(b(!0),
																V(
																	le,
																	null,
																	ie(
																		v.items,
																		g => (
																			b(),
																			C(
																				u(Xe),
																				{
																					key: g.label,
																					"as-child":
																						"",
																					onSelect:
																						g.onClick,
																				},
																				{
																					default:
																						w(
																							() => [
																								g.component
																									? (b(),
																									  C(
																											Q(
																												g.component
																											),
																											{
																												key: 0,
																												active: !1,
																											}
																									  ))
																									: g.submenu
																									? (b(),
																									  C(
																											u(
																												jn
																											),
																											{
																												key: 1,
																											},
																											{
																												default:
																													w(
																														() => [
																															A(
																																u(
																																	zn
																																),
																																{
																																	"as-child":
																																		"",
																																},
																																{
																																	default:
																																		w(
																																			() => [
																																				ue(
																																					"button",
																																					{
																																						class: I(
																																							a.submenuTrigger
																																						),
																																					},
																																					[
																																						g.icon &&
																																						typeof g.icon ==
																																							"string"
																																							? (b(),
																																							  C(
																																									de,
																																									{
																																										key: 0,
																																										name: g.icon,
																																										class: I(
																																											a.itemIcon
																																										),
																																										"aria-hidden":
																																											"true",
																																									},
																																									null,
																																									8,
																																									[
																																										"name",
																																										"class",
																																									]
																																							  ))
																																							: g.icon
																																							? (b(),
																																							  C(
																																									Q(
																																										g.icon
																																									),
																																									{
																																										key: 1,
																																										class: I(
																																											a.itemIcon
																																										),
																																									},
																																									null,
																																									8,
																																									[
																																										"class",
																																									]
																																							  ))
																																							: J(
																																									"",
																																									!0
																																							  ),
																																						ue(
																																							"span",
																																							{
																																								class: I(
																																									a.itemLabel
																																								),
																																							},
																																							Y(
																																								g.label
																																							),
																																							3
																																						),
																																						A(
																																							de,
																																							{
																																								name: "chevron-right",
																																								class: I(
																																									a.chevronIcon
																																								),
																																								"aria-hidden":
																																									"true",
																																							},
																																							null,
																																							8,
																																							[
																																								"class",
																																							]
																																						),
																																					],
																																					2
																																				),
																																			]
																																		),
																																	_: 2,
																																},
																																1024
																															),
																															A(
																																u(
																																	Je
																																),
																																null,
																																{
																																	default:
																																		w(
																																			() => [
																																				A(
																																					u(
																																						Wn
																																					),
																																					{
																																						class: I(
																																							a.dropdownContent
																																						),
																																						"side-offset": 4,
																																					},
																																					{
																																						default:
																																							w(
																																								() => [
																																									(b(
																																										!0
																																									),
																																									V(
																																										le,
																																										null,
																																										ie(
																																											d(
																																												g.submenu
																																											),
																																											k => (
																																												b(),
																																												V(
																																													"div",
																																													{
																																														key: k.key,
																																														class: I(
																																															a.groupContainer
																																														),
																																													},
																																													[
																																														k.group &&
																																														!k.hideLabel
																																															? (b(),
																																															  C(
																																																	u(
																																																		qe
																																																	),
																																																	{
																																																		key: 0,
																																																		class: I(
																																																			a.groupLabel
																																																		),
																																																	},
																																																	{
																																																		default:
																																																			w(
																																																				() => [
																																																					be(
																																																						Y(
																																																							k.group
																																																						),
																																																						1
																																																					),
																																																				]
																																																			),
																																																		_: 2,
																																																	},
																																																	1032,
																																																	[
																																																		"class",
																																																	]
																																															  ))
																																															: J(
																																																	"",
																																																	!0
																																															  ),
																																														(b(
																																															!0
																																														),
																																														V(
																																															le,
																																															null,
																																															ie(
																																																k.items,
																																																O => (
																																																	b(),
																																																	C(
																																																		u(
																																																			Xe
																																																		),
																																																		{
																																																			key: O.label,
																																																			"as-child":
																																																				"",
																																																			onSelect:
																																																				() =>
																																																					r(
																																																						O
																																																					),
																																																		},
																																																		{
																																																			default:
																																																				w(
																																																					() => [
																																																						O.component
																																																							? (b(),
																																																							  C(
																																																									Q(
																																																										O.component
																																																									),
																																																									{
																																																										key: 0,
																																																										active: !1,
																																																									}
																																																							  ))
																																																							: (b(),
																																																							  V(
																																																									"button",
																																																									{
																																																										key: 1,
																																																										class: I(
																																																											a.itemButton
																																																										),
																																																									},
																																																									[
																																																										O.icon &&
																																																										typeof O.icon ==
																																																											"string"
																																																											? (b(),
																																																											  C(
																																																													de,
																																																													{
																																																														key: 0,
																																																														name: O.icon,
																																																														class: I(
																																																															a.itemIcon
																																																														),
																																																														"aria-hidden":
																																																															"true",
																																																													},
																																																													null,
																																																													8,
																																																													[
																																																														"name",
																																																														"class",
																																																													]
																																																											  ))
																																																											: O.icon
																																																											? (b(),
																																																											  C(
																																																													Q(
																																																														O.icon
																																																													),
																																																													{
																																																														key: 1,
																																																														class: I(
																																																															a.itemIcon
																																																														),
																																																													},
																																																													null,
																																																													8,
																																																													[
																																																														"class",
																																																													]
																																																											  ))
																																																											: J(
																																																													"",
																																																													!0
																																																											  ),
																																																										ue(
																																																											"span",
																																																											{
																																																												class: I(
																																																													a.itemLabel
																																																												),
																																																											},
																																																											Y(
																																																												O.label
																																																											),
																																																											3
																																																										),
																																																									],
																																																									2
																																																							  )),
																																																					]
																																																				),
																																																			_: 2,
																																																		},
																																																		1032,
																																																		[
																																																			"onSelect",
																																																		]
																																																	)
																																																)
																																															),
																																															128
																																														)),
																																													],
																																													2
																																												)
																																											)
																																										),
																																										128
																																									)),
																																								]
																																							),
																																						_: 2,
																																					},
																																					1032,
																																					[
																																						"class",
																																					]
																																				),
																																			]
																																		),
																																	_: 2,
																																},
																																1024
																															),
																														]
																													),
																												_: 2,
																											},
																											1024
																									  ))
																									: (b(),
																									  V(
																											"button",
																											{
																												key: 2,
																												class: I(
																													a.itemButton
																												),
																											},
																											[
																												g.icon &&
																												typeof g.icon ==
																													"string"
																													? (b(),
																													  C(
																															de,
																															{
																																key: 0,
																																name: g.icon,
																																class: I(
																																	a.itemIcon
																																),
																																"aria-hidden":
																																	"true",
																															},
																															null,
																															8,
																															[
																																"name",
																																"class",
																															]
																													  ))
																													: g.icon
																													? (b(),
																													  C(
																															Q(
																																g.icon
																															),
																															{
																																key: 1,
																																class: I(
																																	a.itemIcon
																																),
																															},
																															null,
																															8,
																															[
																																"class",
																															]
																													  ))
																													: J(
																															"",
																															!0
																													  ),
																												ue(
																													"span",
																													{
																														class: I(
																															a.itemLabel
																														),
																													},
																													Y(
																														g.label
																													),
																													3
																												),
																											],
																											2
																									  )),
																							]
																						),
																					_: 2,
																				},
																				1032,
																				[
																					"onSelect",
																				]
																			)
																		)
																	),
																	128
																)),
															],
															2
														)
													)
												),
												128
											)),
										]),
										_: 1,
									},
									8,
									["class", "side", "align"]
								),
							]),
							_: 1,
						}),
					]),
					_: 3,
				})
			);
		},
	}),
	Jn = Nt(Yn, [["__scopeId", "data-v-0787846c"]]);
export { Jn as D };
//# sourceMappingURL=Dropdown-007bc2e8.js.map
