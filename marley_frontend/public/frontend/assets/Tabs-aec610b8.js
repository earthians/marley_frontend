var pe = Object.defineProperty;
var V = Object.getOwnPropertySymbols;
var Z = Object.prototype.hasOwnProperty,
	ee = Object.prototype.propertyIsEnumerable;
var X = (e, a, t) =>
		a in e
			? pe(e, a, { enumerable: !0, configurable: !0, writable: !0, value: t })
			: (e[a] = t),
	j = (e, a) => {
		for (var t in a || (a = {})) Z.call(a, t) && X(e, t, a[t]);
		if (V) for (var t of V(a)) ee.call(a, t) && X(e, t, a[t]);
		return e;
	};
var W = (e, a) => {
	var t = {};
	for (var r in e) Z.call(e, r) && a.indexOf(r) < 0 && (t[r] = e[r]);
	if (e != null && V)
		for (var r of V(e)) a.indexOf(r) < 0 && ee.call(e, r) && (t[r] = e[r]);
	return t;
};
import {
	I as B,
	r as T,
	Y as G,
	aO as be,
	aM as ue,
	J as x,
	aI as C,
	al as K,
	o as L,
	y as oe,
	ac as xe,
	aK as b,
	aP as N,
	aQ as me,
	F as Q,
	aX as z,
	aE as ie,
	z as de,
	am as R,
	aY as ae,
	aR as P,
	aV as q,
	aZ as ye,
	aS as ge,
	aT as E,
	aU as $,
	ae as te,
	k,
	h as F,
	g as O,
	b as ve,
	x as ce,
	f as w,
	D,
	A as Y,
	d as le,
	n as H,
	B as he,
	j as Ie,
	l as Te,
	t as Pe,
	a0 as $e,
	a1 as we,
	e as re,
	P as ne,
	Q as se,
} from "./index-8ff34837.js";
import { s as Se } from "./use-resolve-button-type-f09d071e.js";
let ke = B({
	props: { onFocus: { type: Function, required: !0 } },
	setup(e) {
		let a = T(!0);
		return () =>
			a.value
				? G(ue, {
						as: "button",
						type: "button",
						features: be.Focusable,
						onFocus(t) {
							t.preventDefault();
							let r,
								v = 50;
							function o() {
								var l;
								if (v-- <= 0) {
									r && cancelAnimationFrame(r);
									return;
								}
								if ((l = e.onFocus) != null && l.call(e)) {
									(a.value = !1), cancelAnimationFrame(r);
									return;
								}
								r = requestAnimationFrame(o);
							}
							r = requestAnimationFrame(o);
						},
				  })
				: null;
	},
});
var _e = (e => (
		(e[(e.Forwards = 0)] = "Forwards"), (e[(e.Backwards = 1)] = "Backwards"), e
	))(_e || {}),
	Oe = (e => (
		(e[(e.Less = -1)] = "Less"),
		(e[(e.Equal = 0)] = "Equal"),
		(e[(e.Greater = 1)] = "Greater"),
		e
	))(Oe || {});
let fe = Symbol("TabsContext");
function M(e) {
	let a = R(fe, null);
	if (a === null) {
		let t = new Error(`<${e} /> is missing a parent <TabGroup /> component.`);
		throw (Error.captureStackTrace && Error.captureStackTrace(t, M), t);
	}
	return a;
}
let J = Symbol("TabsSSRContext"),
	Ae = B({
		name: "TabGroup",
		emits: { change: e => !0 },
		props: {
			as: { type: [Object, String], default: "template" },
			selectedIndex: { type: [Number], default: null },
			defaultIndex: { type: [Number], default: 0 },
			vertical: { type: [Boolean], default: !1 },
			manual: { type: [Boolean], default: !1 },
		},
		inheritAttrs: !1,
		setup(e, { slots: a, attrs: t, emit: r }) {
			var v;
			let o = T((v = e.selectedIndex) != null ? v : e.defaultIndex),
				l = T([]),
				n = T([]),
				f = x(() => e.selectedIndex !== null),
				y = x(() => (f.value ? e.selectedIndex : o.value));
			function g(u) {
				var d;
				let c = C(i.tabs.value, b),
					s = C(i.panels.value, b),
					p = c.filter(h => {
						var I;
						return !((I = b(h)) != null && I.hasAttribute("disabled"));
					});
				if (u < 0 || u > c.length - 1) {
					let h = z(o.value === null ? 0 : Math.sign(u - o.value), {
							[-1]: () => 1,
							0: () =>
								z(Math.sign(u), {
									[-1]: () => 0,
									0: () => 0,
									1: () => 1,
								}),
							1: () => 0,
						}),
						I = z(h, {
							0: () => c.indexOf(p[0]),
							1: () => c.indexOf(p[p.length - 1]),
						});
					I !== -1 && (o.value = I), (i.tabs.value = c), (i.panels.value = s);
				} else {
					let h = c.slice(0, u),
						I = [...c.slice(u), ...h].find(U => p.includes(U));
					if (!I) return;
					let S = (d = c.indexOf(I)) != null ? d : i.selectedIndex.value;
					S === -1 && (S = i.selectedIndex.value),
						(o.value = S),
						(i.tabs.value = c),
						(i.panels.value = s);
				}
			}
			let i = {
				selectedIndex: x(() => {
					var u, d;
					return (d = (u = o.value) != null ? u : e.defaultIndex) != null
						? d
						: null;
				}),
				orientation: x(() => (e.vertical ? "vertical" : "horizontal")),
				activation: x(() => (e.manual ? "manual" : "auto")),
				tabs: l,
				panels: n,
				setSelectedIndex(u) {
					y.value !== u && r("change", u), f.value || g(u);
				},
				registerTab(u) {
					var d;
					if (l.value.includes(u)) return;
					let c = l.value[o.value];
					if ((l.value.push(u), (l.value = C(l.value, b)), !f.value)) {
						let s = (d = l.value.indexOf(c)) != null ? d : o.value;
						s !== -1 && (o.value = s);
					}
				},
				unregisterTab(u) {
					let d = l.value.indexOf(u);
					d !== -1 && l.value.splice(d, 1);
				},
				registerPanel(u) {
					n.value.includes(u) || (n.value.push(u), (n.value = C(n.value, b)));
				},
				unregisterPanel(u) {
					let d = n.value.indexOf(u);
					d !== -1 && n.value.splice(d, 1);
				},
			};
			K(fe, i);
			let m = T({ tabs: [], panels: [] }),
				A = T(!1);
			L(() => {
				A.value = !0;
			}),
				K(
					J,
					x(() => (A.value ? null : m.value))
				);
			let _ = x(() => e.selectedIndex);
			return (
				L(() => {
					oe(
						[_],
						() => {
							var u;
							return g(
								(u = e.selectedIndex) != null ? u : e.defaultIndex
							);
						},
						{ immediate: !0 }
					);
				}),
				xe(() => {
					if (!f.value || y.value == null || i.tabs.value.length <= 0) return;
					let u = C(i.tabs.value, b);
					u.some((d, c) => b(i.tabs.value[c]) !== b(d)) &&
						i.setSelectedIndex(
							u.findIndex(d => b(d) === b(i.tabs.value[y.value]))
						);
				}),
				() => {
					let u = { selectedIndex: o.value };
					return G(Q, [
						l.value.length <= 0 &&
							G(ke, {
								onFocus: () => {
									for (let d of l.value) {
										let c = b(d);
										if ((c == null ? void 0 : c.tabIndex) === 0)
											return c.focus(), !0;
									}
									return !1;
								},
							}),
						N({
							theirProps: j(
								j({}, t),
								me(e, [
									"selectedIndex",
									"defaultIndex",
									"manual",
									"vertical",
									"onChange",
								])
							),
							ourProps: {},
							slot: u,
							slots: a,
							attrs: t,
							name: "TabGroup",
						}),
					]);
				}
			);
		},
	}),
	Ee = B({
		name: "TabList",
		props: { as: { type: [Object, String], default: "div" } },
		setup(e, { attrs: a, slots: t }) {
			let r = M("TabList");
			return () => {
				let v = { selectedIndex: r.selectedIndex.value },
					o = { role: "tablist", "aria-orientation": r.orientation.value };
				return N({
					ourProps: o,
					theirProps: e,
					slot: v,
					attrs: a,
					slots: t,
					name: "TabList",
				});
			};
		},
	}),
	Fe = B({
		name: "Tab",
		props: {
			as: { type: [Object, String], default: "button" },
			disabled: { type: [Boolean], default: !1 },
			id: { type: String, default: null },
		},
		setup(e, { attrs: a, slots: t, expose: r }) {
			var v;
			let o = (v = e.id) != null ? v : `headlessui-tabs-tab-${ie()}`,
				l = M("Tab"),
				n = T(null);
			r({ el: n, $el: n }),
				L(() => l.registerTab(n)),
				de(() => l.unregisterTab(n));
			let f = R(J),
				y = x(() => {
					if (f.value) {
						let s = f.value.tabs.indexOf(o);
						return s === -1 ? f.value.tabs.push(o) - 1 : s;
					}
					return -1;
				}),
				g = x(() => {
					let s = l.tabs.value.indexOf(n);
					return s === -1 ? y.value : s;
				}),
				i = x(() => g.value === l.selectedIndex.value);
			function m(s) {
				var p;
				let h = s();
				if (h === q.Success && l.activation.value === "auto") {
					let I = (p = ge(n)) == null ? void 0 : p.activeElement,
						S = l.tabs.value.findIndex(U => b(U) === I);
					S !== -1 && l.setSelectedIndex(S);
				}
				return h;
			}
			function A(s) {
				let p = l.tabs.value.map(h => b(h)).filter(Boolean);
				if (s.key === P.Space || s.key === P.Enter) {
					s.preventDefault(),
						s.stopPropagation(),
						l.setSelectedIndex(g.value);
					return;
				}
				switch (s.key) {
					case P.Home:
					case P.PageUp:
						return (
							s.preventDefault(),
							s.stopPropagation(),
							m(() => E(p, $.First))
						);
					case P.End:
					case P.PageDown:
						return (
							s.preventDefault(),
							s.stopPropagation(),
							m(() => E(p, $.Last))
						);
				}
				if (
					m(() =>
						z(l.orientation.value, {
							vertical() {
								return s.key === P.ArrowUp
									? E(p, $.Previous | $.WrapAround)
									: s.key === P.ArrowDown
									? E(p, $.Next | $.WrapAround)
									: q.Error;
							},
							horizontal() {
								return s.key === P.ArrowLeft
									? E(p, $.Previous | $.WrapAround)
									: s.key === P.ArrowRight
									? E(p, $.Next | $.WrapAround)
									: q.Error;
							},
						})
					) === q.Success
				)
					return s.preventDefault();
			}
			let _ = T(!1);
			function u() {
				var s;
				_.value ||
					((_.value = !0),
					!e.disabled &&
						((s = b(n)) == null || s.focus({ preventScroll: !0 }),
						l.setSelectedIndex(g.value),
						ye(() => {
							_.value = !1;
						})));
			}
			function d(s) {
				s.preventDefault();
			}
			let c = Se(
				x(() => ({ as: e.as, type: a.type })),
				n
			);
			return () => {
				var s, p;
				let h = {
						selected: i.value,
						disabled: (s = e.disabled) != null ? s : !1,
					},
					I = W(e, []),
					S = {
						ref: n,
						onKeydown: A,
						onMousedown: d,
						onClick: u,
						id: o,
						role: "tab",
						type: c.value,
						"aria-controls":
							(p = b(l.panels.value[g.value])) == null ? void 0 : p.id,
						"aria-selected": i.value,
						tabIndex: i.value ? 0 : -1,
						disabled: e.disabled ? !0 : void 0,
					};
				return N({
					ourProps: S,
					theirProps: I,
					slot: h,
					attrs: a,
					slots: t,
					name: "Tab",
				});
			};
		},
	}),
	Be = B({
		name: "TabPanels",
		props: { as: { type: [Object, String], default: "div" } },
		setup(e, { slots: a, attrs: t }) {
			let r = M("TabPanels");
			return () => {
				let v = { selectedIndex: r.selectedIndex.value };
				return N({
					theirProps: e,
					ourProps: {},
					slot: v,
					attrs: t,
					slots: a,
					name: "TabPanels",
				});
			};
		},
	}),
	Ce = B({
		name: "TabPanel",
		props: {
			as: { type: [Object, String], default: "div" },
			static: { type: Boolean, default: !1 },
			unmount: { type: Boolean, default: !0 },
			id: { type: String, default: null },
			tabIndex: { type: Number, default: 0 },
		},
		setup(e, { attrs: a, slots: t, expose: r }) {
			var v;
			let o = (v = e.id) != null ? v : `headlessui-tabs-panel-${ie()}`,
				l = M("TabPanel"),
				n = T(null);
			r({ el: n, $el: n }),
				L(() => l.registerPanel(n)),
				de(() => l.unregisterPanel(n));
			let f = R(J),
				y = x(() => {
					if (f.value) {
						let m = f.value.panels.indexOf(o);
						return m === -1 ? f.value.panels.push(o) - 1 : m;
					}
					return -1;
				}),
				g = x(() => {
					let m = l.panels.value.indexOf(n);
					return m === -1 ? y.value : m;
				}),
				i = x(() => g.value === l.selectedIndex.value);
			return () => {
				var m;
				let A = { selected: i.value },
					c = e,
					{ tabIndex: _ } = c,
					u = W(c, ["tabIndex"]),
					d = {
						ref: n,
						id: o,
						role: "tabpanel",
						"aria-labelledby":
							(m = b(l.tabs.value[g.value])) == null ? void 0 : m.id,
						tabIndex: i.value ? _ : -1,
					};
				return !i.value && e.unmount && !e.static
					? G(ue, j({ as: "span", "aria-hidden": !0 }, d))
					: N({
							ourProps: d,
							theirProps: u,
							slot: A,
							attrs: a,
							slots: t,
							features: ae.Static | ae.RenderStrategy,
							visible: i.value,
							name: "TabPanel",
					  });
			};
		},
	});
const De = {
		__name: "TabList",
		setup(e) {
			const a = R("tab"),
				t = T([]),
				r = T(null),
				v = x(() => {
					var n;
					return (n = a.value.tabs.value) == null ? void 0 : n.length;
				}),
				o = T("");
			function l(n) {
				n >= v.value && (n = v.value - 1);
				const f = t.value[n].el;
				a.value.vertical.value
					? ((r.value.style.height = `${f.offsetHeight}px`),
					  (r.value.style.top = `${f.offsetTop}px`))
					: ((r.value.style.width = `${f.offsetWidth}px`),
					  (r.value.style.left = `${f.offsetLeft}px`));
			}
			return (
				oe(
					() => a.value.tabIndex.value,
					n => {
						n >= v.value && (a.value.tabIndex.value = v.value - 1),
							(o.value = "transition-all duration-300 ease-in-out"),
							te(() => l(n));
					}
				),
				L(() => {
					te(() => l(a.value.tabIndex.value)),
						setTimeout(() => l(a.value.tabIndex.value), 100);
				}),
				(n, f) => (
					k(),
					F(
						w(Ee),
						{
							class: H([
								"relative flex",
								w(a).vertical
									? "flex-col border-r overflow-y-auto"
									: "gap-7.5 border-b overflow-x-auto items-center px-5",
							]),
						},
						{
							default: O(() => [
								(k(!0),
								ve(
									Q,
									null,
									ce(
										w(a).tabs,
										(y, g) => (
											k(),
											F(
												w(Fe),
												{
													ref_for: !0,
													ref_key: "tabRef",
													ref: t,
													as: "template",
													key: g,
													class: "focus:outline-none focus:transition-none",
												},
												{
													default: O(({ selected: i }) => [
														D(
															n.$slots,
															"default",
															Y(
																{ ref_for: !0 },
																{ tab: y, selected: i }
															),
															() => [
																le(
																	"button",
																	{
																		class: H([
																			"flex items-center gap-1.5 text-base text-ink-gray-5 duration-300 ease-in-out hover:text-ink-gray-9",
																			[
																				i
																					? "text-ink-gray-9"
																					: "",
																				w(a)
																					.vertical
																					? "py-2.5 px-4 border-r border-transparent hover:border-outline-gray-3"
																					: "py-3 border-b border-transparent hover:border-outline-gray-3",
																			],
																		]),
																	},
																	[
																		y.icon
																			? (k(),
																			  F(
																					he(
																						y.icon
																					),
																					{
																						key: 0,
																						class: "size-4",
																					}
																			  ))
																			: Ie(
																					"",
																					!0
																			  ),
																		Te(
																			" " +
																				Pe(
																					y.label
																				),
																			1
																		),
																	],
																	2
																),
															]
														),
													]),
													_: 2,
												},
												1024
											)
										)
									),
									128
								)),
								le(
									"div",
									{
										ref_key: "indicator",
										ref: r,
										class: H([
											"tab-indicator absolute bg-surface-gray-7",
											[
												w(a).vertical
													? "right-0 w-px"
													: "bottom-0 h-px",
												o.value,
											],
										]),
									},
									null,
									2
								),
							]),
							_: 3,
						},
						8,
						["class"]
					)
				)
			);
		},
	},
	Le = {
		__name: "TabPanel",
		setup(e) {
			const a = R("tab");
			return (t, r) => (
				k(),
				F(
					w(Be),
					{ class: "flex flex-1 overflow-hidden" },
					{
						default: O(() => [
							(k(!0),
							ve(
								Q,
								null,
								ce(
									w(a).tabs,
									(v, o) => (
										k(),
										F(
											w(Ce),
											{
												class: "flex flex-1 flex-col overflow-y-auto focus:outline-none",
												key: o,
											},
											{
												default: O(() => [
													D(
														t.$slots,
														"default",
														Y({ ref_for: !0 }, { tab: v })
													),
												]),
												_: 2,
											},
											1024
										)
									)
								),
								128
							)),
						]),
						_: 3,
					}
				)
			);
		},
	},
	Ve = {
		__name: "Tabs",
		props: $e(
			{
				as: { type: String, default: "template" },
				tabs: { type: Array, required: !0 },
				vertical: { type: Boolean, default: !1 },
			},
			{ modelValue: {}, modelModifiers: {} }
		),
		emits: ["update:modelValue"],
		setup(e) {
			const a = e,
				t = we(e, "modelValue");
			return (
				K(
					"tab",
					x(() => ({ tabIndex: t, tabs: a.tabs, vertical: a.vertical }))
				),
				(r, v) => (
					k(),
					F(
						w(Ae),
						Y(
							e.as !== "template"
								? {
										as: e.as,
										class: [
											"flex flex-1 overflow-hidden",
											e.vertical ? "" : "flex-col ",
										],
								  }
								: {},
							{
								defaultIndex: t.value,
								selectedIndex: t.value,
								onChange: v[0] || (v[0] = o => (t.value = o)),
							}
						),
						{
							default: O(() => [
								D(r.$slots, "default", {}, () => [
									re(De, null, {
										default: O(({ tab: o, selected: l }) => [
											D(
												r.$slots,
												"tab-item",
												ne(se({ tab: o, selected: l }))
											),
										]),
										_: 3,
									}),
									re(Le, null, {
										default: O(({ tab: o }) => [
											D(
												r.$slots,
												"tab-panel",
												ne(se({ tab: o }))
											),
										]),
										_: 3,
									}),
								]),
							]),
							_: 3,
						},
						16,
						["defaultIndex", "selectedIndex"]
					)
				)
			);
		},
	};
export { Ve as _ };
//# sourceMappingURL=Tabs-aec610b8.js.map
