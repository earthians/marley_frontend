var it = Object.defineProperty;
var De = Object.getOwnPropertySymbols;
var Be = Object.prototype.hasOwnProperty,
	Ie = Object.prototype.propertyIsEnumerable;
var Fe = (c, x, r) =>
		x in c
			? it(c, x, { enumerable: !0, configurable: !0, writable: !0, value: r })
			: (c[x] = r),
	Te = (c, x) => {
		for (var r in x || (x = {})) Be.call(x, r) && Fe(c, r, x[r]);
		if (De) for (var r of De(x)) Ie.call(x, r) && Fe(c, r, x[r]);
		return c;
	};
var Oe = (c, x) => {
	var r = {};
	for (var g in c) Be.call(c, g) && x.indexOf(g) < 0 && (r[g] = c[g]);
	if (c != null && De)
		for (var g of De(c)) x.indexOf(g) < 0 && Ie.call(c, g) && (r[g] = c[g]);
	return r;
};
import {
	I as ze,
	r as d,
	J as F,
	aF as ut,
	al as rt,
	aP as Ne,
	aE as dt,
	am as mt,
	aG as pt,
	aK as ct,
	o as He,
	y as W,
	Y as Le,
	aM as ft,
	aN as vt,
	aO as _t,
	aQ as gt,
	F as he,
	a_ as bt,
	aR as Ge,
	aW as yt,
	a$ as Re,
	k as f,
	h as D,
	g as m,
	d as a,
	b as M,
	t as y,
	j as w,
	e as i,
	b0 as ht,
	D as oe,
	A as xt,
	f as e,
	b1 as we,
	$ as Ye,
	m as A,
	x as Ce,
	n as J,
	R as Vt,
	b2 as kt,
	b3 as wt,
	_ as Ke,
	l as P,
	aD as Ct,
	N as St,
	c as ae,
	i as v,
	C as Dt,
	a2 as Ee,
	s as T,
	Z as ce,
	q as ye,
	p as se,
} from "./index-8ff34837.js";
import {
	u as zt,
	g as _e,
	_ as $t,
} from "./DatePicker.vue_vue_type_script_setup_true_lang-9ccf8b49.js";
import { s as Ut } from "./use-resolve-button-type-f09d071e.js";
import { E as Tt, K as Et } from "./label-1daf495d.js";
let We = Symbol("GroupContext"),
	Pt = ze({
		name: "SwitchGroup",
		props: { as: { type: [Object, String], default: "template" } },
		setup(c, { slots: x, attrs: r }) {
			let g = d(null),
				B = Tt({
					name: "SwitchLabel",
					props: {
						htmlFor: F(() => {
							var j;
							return (j = g.value) == null ? void 0 : j.id;
						}),
						onClick(j) {
							g.value &&
								(j.currentTarget.tagName === "LABEL" &&
									j.preventDefault(),
								g.value.click(),
								g.value.focus({ preventScroll: !0 }));
						},
					},
				}),
				L = ut({ name: "SwitchDescription" });
			return (
				rt(We, { switchRef: g, labelledby: B, describedby: L }),
				() =>
					Ne({
						theirProps: c,
						ourProps: {},
						slot: {},
						slots: x,
						attrs: r,
						name: "SwitchGroup",
					})
			);
		},
	}),
	At = ze({
		name: "Switch",
		emits: { "update:modelValue": c => !0 },
		props: {
			as: { type: [Object, String], default: "button" },
			modelValue: { type: Boolean, default: void 0 },
			defaultChecked: { type: Boolean, optional: !0 },
			form: { type: String, optional: !0 },
			name: { type: String, optional: !0 },
			value: { type: String, optional: !0 },
			id: { type: String, default: null },
			disabled: { type: Boolean, default: !1 },
			tabIndex: { type: Number, default: 0 },
		},
		inheritAttrs: !1,
		setup(c, { emit: x, attrs: r, slots: g, expose: B }) {
			var L;
			let j = (L = c.id) != null ? L : `headlessui-switch-${dt()}`,
				I = mt(We, null),
				[G, Q] = pt(
					F(() => c.modelValue),
					n => x("update:modelValue", n),
					F(() => c.defaultChecked)
				);
			function Z() {
				Q(!G.value);
			}
			let k = d(null),
				_ = I === null ? k : I.switchRef,
				z = Ut(
					F(() => ({ as: c.as, type: r.type })),
					_
				);
			B({ el: _, $el: _ });
			function U(n) {
				n.preventDefault(), Z();
			}
			function $(n) {
				n.key === Ge.Space
					? (n.preventDefault(), Z())
					: n.key === Ge.Enter && yt(n.currentTarget);
			}
			function ne(n) {
				n.preventDefault();
			}
			let o = F(() => {
				var n, V;
				return (V = (n = ct(_)) == null ? void 0 : n.closest) == null
					? void 0
					: V.call(n, "form");
			});
			return (
				He(() => {
					W(
						[o],
						() => {
							if (!o.value || c.defaultChecked === void 0) return;
							function n() {
								Q(c.defaultChecked);
							}
							return (
								o.value.addEventListener("reset", n),
								() => {
									var V;
									(V = o.value) == null ||
										V.removeEventListener("reset", n);
								}
							);
						},
						{ immediate: !0 }
					);
				}),
				() => {
					let h = c,
						{ name: n, value: V, form: O, tabIndex: E } = h,
						u = Oe(h, ["name", "value", "form", "tabIndex"]),
						C = { checked: G.value },
						b = {
							id: j,
							ref: _,
							role: "switch",
							type: z.value,
							tabIndex: E === -1 ? 0 : E,
							"aria-checked": G.value,
							"aria-labelledby": I == null ? void 0 : I.labelledby.value,
							"aria-describedby":
								I == null ? void 0 : I.describedby.value,
							onClick: U,
							onKeyup: $,
							onKeypress: ne,
						};
					return Le(he, [
						n != null && G.value != null
							? Le(
									ft,
									vt({
										features: _t.Hidden,
										as: "input",
										type: "checkbox",
										hidden: !0,
										readOnly: !0,
										checked: G.value,
										form: O,
										disabled: u.disabled,
										name: n,
										value: V,
									})
							  )
							: null,
						Ne({
							ourProps: b,
							theirProps: Te(
								Te({}, r),
								gt(u, ["modelValue", "defaultChecked"])
							),
							slot: C,
							attrs: r,
							slots: g,
							name: "Switch",
						}),
					]);
				}
			);
		},
	}),
	Mt = Et,
	jt = bt;
const Ft = { class: "flex flex-col space-y-1.5" },
	Bt = { key: 0, class: "block text-xs text-ink-gray-5" },
	It = { class: "flex items-center p-1 text-ink-gray-4" },
	Ot = { class: "flex-1 text-center text-base font-medium text-ink-gray-6" },
	Lt = { class: "flex items-center justify-center gap-1 p-1" },
	Gt = { class: "flex flex-col items-center justify-center p-1 text-ink-gray-8" },
	Rt = { class: "flex items-center text-xs uppercase" },
	Yt = ["onClick"],
	qt = { class: "flex items-center justify-around gap-2 p-1" },
	Nt = { class: "flex flex-col items-center justify-center" },
	Ht = { class: "slider flex min-h-4 items-center justify-center" },
	Kt = { class: "slider flex min-h-4 items-center justify-center" },
	Wt = { class: "slider flex min-h-4 items-center justify-center" },
	Jt = { class: "flex justify-end p-1" },
	Qt = ze({
		__name: "DateTimePicker",
		props: {
			value: {},
			modelValue: {},
			placeholder: {},
			formatter: { type: Function },
			readonly: { type: Boolean },
			inputClass: {},
			placement: {},
			label: {},
		},
		emits: ["update:modelValue", "change"],
		setup(c, { emit: x }) {
			const r = c,
				g = x,
				{
					currentYear: B,
					currentMonth: L,
					today: j,
					datesAsWeeks: I,
					formattedMonth: G,
					prevMonth: Q,
					nextMonth: Z,
				} = zt(),
				k = F(() => {
					var C, b, h;
					let u = "mt-2";
					return (
						(C = r.placement) != null && C.startsWith("top")
							? (u = "mb-2")
							: (b = r.placement) != null && b.startsWith("left")
							? (u = "mr-2")
							: (h = r.placement) != null &&
							  h.startsWith("right") &&
							  (u = "ml-2"),
						u
					);
				}),
				_ = d(0),
				z = d(0),
				U = d(0),
				$ = F(() => {
					let u = r.value ? r.value : r.modelValue;
					return u ? Re(u).format("YYYY-MM-DD HH:mm:ss") : "";
				});
			function ne() {
				let u = $.value ? _e($.value) : _e();
				o(u);
			}
			function o(u, C = !1) {
				C &&
					((u = Re(u)),
					(_.value = u.hour()),
					(z.value = u.minute()),
					(U.value = u.second()));
				let b = u ? kt(n(u)).format("YYYY-MM-DD HH:mm:ss") : "";
				g("change", b), g("update:modelValue", b);
			}
			function n(u) {
				return !u || u.toString() === "Invalid Date"
					? ""
					: wt(u)
							.set("hour", _.value)
							.set("minute", z.value)
							.set("second", U.value)
							.format("YYYY-MM-DD HH:mm:ss");
			}
			function V(u) {
				return u.toString().padStart(2, "0");
			}
			function O(u) {
				(u = _e(u)),
					(_.value = u.getHours()),
					(z.value = u.getMinutes()),
					(U.value = u.getSeconds()),
					o(u);
			}
			function E() {
				let u = $.value ? _e($.value) : _e();
				u.toString() === "Invalid Date" && (u = _e()),
					(B.value = u.getFullYear()),
					(L.value = u.getMonth() + 1),
					(_.value = u.getHours()),
					(z.value = u.getMinutes()),
					(U.value = u.getSeconds());
			}
			return (
				He(() => E()),
				(u, C) => (
					f(),
					D(
						e(Vt),
						{
							onOpen: E,
							class: "flex w-full [&>div:first-child]:w-full",
							placement: u.placement,
						},
						{
							target: m(({ togglePopover: b }) => [
								a("div", Ft, [
									r.label
										? (f(), M("label", Bt, y(r.label), 1))
										: w("", !0),
									i(
										e(we),
										xt(
											{
												readonly: "",
												type: "text",
												placeholder: u.placeholder,
												value:
													$.value && u.formatter
														? u.formatter($.value)
														: $.value,
												onFocus: h => (u.readonly ? null : b()),
												class: ["w-full", u.inputClass],
											},
											u.$attrs
										),
										ht({ _: 2 }, [
											u.$slots.prefix
												? {
														name: "prefix",
														fn: m(() => [
															oe(
																u.$slots,
																"prefix",
																{},
																void 0,
																!0
															),
														]),
														key: "0",
												  }
												: void 0,
										]),
										1040,
										["placeholder", "value", "onFocus", "class"]
									),
								]),
							]),
							body: m(({ togglePopover: b }) => [
								a(
									"div",
									{
										class: J([
											"w-fit select-none text-base text-ink-gray-9 divide-y divide-outline-gray-modals rounded-lg bg-surface-modal shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none",
											k.value,
										]),
									},
									[
										a("div", It, [
											i(
												e(A),
												{
													variant: "ghost",
													class: "h-7 w-7",
													onClick: e(Q),
												},
												{
													default: m(() => [
														i(Ye, {
															"stroke-width": 2,
															name: "chevron-left",
															class: "h-4 w-4",
														}),
													]),
													_: 1,
												},
												8,
												["onClick"]
											),
											a("div", Ot, y(e(G)), 1),
											i(
												e(A),
												{
													variant: "ghost",
													class: "h-7 w-7",
													onClick: e(Z),
												},
												{
													default: m(() => [
														i(Ye, {
															"stroke-width": 2,
															name: "chevron-right",
															class: "h-4 w-4",
														}),
													]),
													_: 1,
												},
												8,
												["onClick"]
											),
										]),
										a("div", Lt, [
											i(
												e(we),
												{
													class: "text-sm",
													type: "text",
													value: $.value,
													onChange: h => {
														O(h.target.value), b();
													},
												},
												null,
												8,
												["value", "onChange"]
											),
											i(
												e(A),
												{
													label: "Now",
													class: "text-sm",
													onClick: () => {
														o(e(_e)(), !0), b();
													},
												},
												null,
												8,
												["onClick"]
											),
										]),
										a("div", Gt, [
											a("div", Rt, [
												(f(),
												M(
													he,
													null,
													Ce(
														[
															"s",
															"m",
															"t",
															"w",
															"t",
															"f",
															"s",
														],
														(h, q) =>
															a(
																"div",
																{
																	class: "flex h-6 w-8 items-center justify-center text-center",
																	key: q,
																},
																y(h),
																1
															)
													),
													64
												)),
											]),
											(f(!0),
											M(
												he,
												null,
												Ce(
													e(I),
													(h, q) => (
														f(),
														M(
															"div",
															{
																class: "flex items-center",
																key: q,
															},
															[
																(f(!0),
																M(
																	he,
																	null,
																	Ce(
																		h,
																		S => (
																			f(),
																			M(
																				"div",
																				{
																					key: n(
																						S
																					),
																					class: J(
																						[
																							"flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-surface-gray-2",
																							{
																								"text-ink-gray-3":
																									S.getMonth() !==
																									e(
																										L
																									) -
																										1,
																								"font-extrabold text-ink-gray-9":
																									n(
																										S
																									) ===
																									n(
																										e(
																											j
																										)
																									),
																								"bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6":
																									n(
																										S
																									) ===
																									$.value,
																							},
																						]
																					),
																					onClick:
																						() => {
																							o(
																								S
																							),
																								b();
																						},
																				},
																				y(
																					S.getDate()
																				),
																				11,
																				Yt
																			)
																		)
																	),
																	128
																)),
															]
														)
													)
												),
												128
											)),
										]),
										a("div", qt, [
											a(
												"div",
												null,
												y(V(_.value)) +
													" : " +
													y(V(z.value)) +
													" : " +
													y(V(U.value)),
												1
											),
											a("div", Nt, [
												a("div", Ht, [
													i(
														e(we),
														{
															modelValue: _.value,
															"onUpdate:modelValue":
																C[0] ||
																(C[0] = h =>
																	(_.value = h)),
															name: "hours",
															type: "range",
															min: "0",
															max: "23",
															step: "1",
															onChange: () => {
																ne(), b();
															},
														},
														null,
														8,
														["modelValue", "onChange"]
													),
												]),
												a("div", Kt, [
													i(
														e(we),
														{
															modelValue: z.value,
															"onUpdate:modelValue":
																C[1] ||
																(C[1] = h =>
																	(z.value = h)),
															name: "minutes",
															type: "range",
															min: "0",
															max: "59",
															step: "1",
															onChange: () => {
																ne(), b();
															},
														},
														null,
														8,
														["modelValue", "onChange"]
													),
												]),
												a("div", Wt, [
													i(
														e(we),
														{
															modelValue: U.value,
															"onUpdate:modelValue":
																C[2] ||
																(C[2] = h =>
																	(U.value = h)),
															name: "seconds",
															type: "range",
															min: "0",
															max: "59",
															step: "1",
															onChange: () => {
																ne(), b();
															},
														},
														null,
														8,
														["modelValue", "onChange"]
													),
												]),
											]),
										]),
										a("div", Jt, [
											i(
												e(A),
												{
													label: "Clear",
													class: "text-sm",
													onClick: () => {
														o(""), b();
													},
												},
												null,
												8,
												["onClick"]
											),
										]),
									],
									2
								),
							]),
							_: 3,
						},
						8,
						["placement"]
					)
				)
			);
		},
	}),
	qe = Ke(Qt, [["__scopeId", "data-v-60059218"]]),
	Zt = ze({
		__name: "Switch",
		props: {
			size: { default: "sm" },
			label: { default: "" },
			description: { default: "" },
			disabled: { type: Boolean, default: !1 },
			modelValue: { type: [Boolean, Number, String] },
		},
		emits: ["change", "update:modelValue"],
		setup(c, { emit: x }) {
			const r = c,
				g = x,
				B = F(() => (r.label && r.description ? 2 : r.label ? 1 : 0)),
				L = F(() => [
					"relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-100 ease-in-out items-center",
					"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3",
					"disabled:cursor-not-allowed disabled:bg-surface-gray-3",
					r.modelValue
						? "bg-surface-gray-7 enabled:hover:bg-surface-gray-6 active:bg-surface-gray-5 group-hover:enabled:bg-surface-gray-6"
						: "bg-surface-gray-4 enabled:hover:bg-gray-400 active:bg-gray-500 group-hover:enabled:bg-gray-400",
					r.size === "md" ? "h-5 w-8 border-[3px]" : "h-4 w-[26px] border-2",
				]),
				j = F(() => [
					"pointer-events-none inline-block transform rounded-full bg-surface-white shadow ring-0 transition duration-100 ease-in-out",
					r.size === "md" ? "h-3.5 w-3.5" : "h-3 w-3",
					r.size === "md"
						? r.modelValue
							? "translate-x-3 rtl:-translate-x-3"
							: "translate-x-0"
						: r.modelValue
						? "translate-x-2.5 rtl:-translate-x-2.5"
						: "translate-x-0",
				]),
				I = F(() => [
					"font-medium leading-normal",
					r.disabled && B.value === 1 ? "text-ink-gray-4" : "text-ink-gray-8",
					r.size === "md" ? "text-lg" : "text-base",
				]),
				G = F(() => ["max-w-xs text-p-base text-ink-gray-7"]),
				Q = F(() => {
					const k = ["flex justify-between"];
					return (
						B.value === 1
							? (k.push(
									"group items-center space-x-3 cursor-pointer rounded focus-visible:bg-surface-gray-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3"
							  ),
							  k.push(
									r.disabled
										? "cursor-not-allowed"
										: "hover:bg-surface-gray-3 active:bg-surface-gray-4"
							  ),
							  k.push(r.size === "md" ? "px-3 py-1.5" : "px-2.5 py-1.5"))
							: B.value === 2 &&
							  (k.push("items-start"),
							  k.push(r.size === "md" ? "space-x-3.5" : "space-x-2.5")),
						k
					);
				}),
				Z = F(() => ["flex flex-col space-y-0.5"]);
			return (k, _) => (
				f(),
				D(
					e(Pt),
					{
						as: "div",
						tabindex: B.value == 1 ? 0 : -1,
						onKeyup:
							_[1] ||
							(_[1] = Ct(
								St(
									z => g("update:modelValue", !k.modelValue),
									["self"]
								),
								["space"]
							)),
						class: J(Q.value),
					},
					{
						default: m(() => [
							a(
								"span",
								{ class: J(Z.value) },
								[
									r.label
										? (f(),
										  D(
												e(Mt),
												{
													key: 0,
													as: "span",
													class: J(I.value),
												},
												{
													default: m(() => [
														P(y(r.label), 1),
													]),
													_: 1,
												},
												8,
												["class"]
										  ))
										: w("", !0),
									r.description
										? (f(),
										  D(
												e(jt),
												{
													key: 1,
													as: "span",
													class: J(G.value),
												},
												{
													default: m(() => [
														P(y(r.description), 1),
													]),
													_: 1,
												},
												8,
												["class"]
										  ))
										: w("", !0),
								],
								2
							),
							i(
								e(At),
								{
									disabled: r.disabled,
									"model-value": !!k.modelValue,
									class: J(L.value),
									"onUpdate:modelValue":
										_[0] ||
										(_[0] = z =>
											g("update:modelValue", !k.modelValue)),
								},
								{
									default: m(() => [
										a(
											"span",
											{
												"aria-hidden": "true",
												class: J(j.value),
											},
											null,
											2
										),
									]),
									_: 1,
								},
								8,
								["disabled", "model-value", "class"]
							),
						]),
						_: 1,
					},
					8,
					["tabindex", "class"]
				)
			);
		},
	});
const Xt = { class: "bg-gray-50 relative w-full h-screen" },
	el = { class: "flex p-4 items-center bg-white border-b border-gray-300" },
	tl = { class: "px-4" },
	ll = { class: "w-10 h-10" },
	al = ["src"],
	sl = { class: "p-4 w-1/4" },
	ol = { class: "p-3 w-1/4" },
	nl = { class: "p-3 w-1/4" },
	il = { class: "p-3 w-1/4" },
	ul = { class: "w-1/5" },
	rl = { class: "p-1" },
	dl = { class: "flex items-center truncate" },
	ml = { class: "bg-gray-100 min-h-screen flex" },
	pl = { class: "w-3/4 p-6" },
	cl = { class: "font-semibold text-lg mb-3" },
	fl = { class: "grid grid-cols-6 gap-3" },
	vl = ["onClick"],
	_l = { class: "w-1/4 bg-white p-6 shadow-lg rounded-lg" },
	gl = { key: 0 },
	bl = { class: "flex justify-left mt-5 py-1 gap-2" },
	yl = {
		key: 0,
		class: "px-3 py-1 text-xs font-bold rounded-md bg-red-200 text-red-700",
	},
	hl = { class: "mt-3 font-semibold text-lg" },
	xl = { class: "text-gray-600 mt-1" },
	Vl = { key: 0 },
	kl = { class: "text-gray-600 mt-1" },
	wl = { class: "text-gray-600 mt-1" },
	Cl = { class: "text-gray-600 mt-1" },
	Sl = { class: "text-gray-600 mt-1" },
	Dl = { class: "text-gray-600 mt-1" },
	zl = { class: "text-gray-600 mt-1" },
	$l = { class: "text-gray-600 mt-1" },
	Ul = { class: "text-gray-600 mt-1" },
	Tl = { class: "text-gray-600 mt-1" },
	El = { class: "text-gray-600 mt-1" },
	Pl = { class: "mt-5 py-8 px-3" },
	Al = { class: "flex justify-center mt-5 px-3 gap-2" },
	Ml = { class: "flex items-center truncate" },
	jl = { class: "flex items-center truncate" },
	Fl = { class: "flex items-center truncate" },
	Bl = { class: "flex items-center truncate" },
	Il = { class: "flex items-center truncate" },
	Ol = { class: "flex items-center truncate" },
	Ll = { class: "flex items-center truncate" },
	Gl = { key: 1, class: "text-gray-500 text-center mt-10" },
	Rl = { class: "mb-4" },
	Yl = { class: "grid grid-cols-3 gap-2" },
	ql = { class: "py-1 w-full" },
	Nl = { class: "py-1 w-full" },
	Hl = { class: "py-1 w-full" },
	Kl = { class: "py-1 w-full" },
	Wl = { class: "py-1 w-full" },
	Jl = { class: "py-1 w-full" },
	Ql = { class: "py-1 w-full" },
	Zl = { class: "grid grid-cols-3 gap-2 py-4" },
	Xl = { class: "py-1 w-full" },
	ea = { class: "py-1 w-full" },
	ta = { class: "mb-4" },
	la = { class: "flex gap-2 mb-4" },
	aa = { class: "grid grid-cols-3 gap-2" },
	sa = { class: "py-1 w-full" },
	oa = { class: "py-1 w-full" },
	na = { class: "py-1 w-full" },
	ia = { class: "py-1 w-full" },
	ua = { class: "grid grid-cols-3 gap-2 py-4" },
	ra = { class: "py-1 w-full" },
	da = { class: "py-1 w-full" },
	ma = { class: "mb-4" },
	pa = { class: "grid grid-cols-2 gap-2" },
	ca = { class: "py-1 w-full" },
	fa = { class: "py-1 w-full" },
	va = { class: "py-1 w-full" },
	_a = {
		methods: {
			formatDatetime(c) {
				return c
					? new Date(c)
							.toLocaleString("en-GB", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
								hour: "2-digit",
								minute: "2-digit",
								hour12: !0,
							})
							.replace(",", "")
					: "";
			},
			formatDate(c) {
				return c
					? new Date(c)
							.toLocaleString("en-GB", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
							})
							.replace(",", "")
					: "";
			},
		},
	},
	ga = Object.assign(_a, {
		__name: "bed_management",
		setup(c) {
			let x = d([]),
				r = d([]),
				g = d([]),
				B = d([]),
				L = d([]),
				j = d([]),
				I = d([]),
				G = d([]),
				Q = d([]),
				Z = d([]),
				k = d(""),
				_ = d(""),
				z = d(""),
				U = d(""),
				$ = d(new Date().toISOString().split("T")[0]),
				ne = d([]),
				o = d({}),
				n = d({}),
				V = d(new Date().toLocaleString("sv-SE").replace("T", " ")),
				O = d(""),
				E = d(""),
				u = d(""),
				C = d(""),
				b = d(""),
				h = d(""),
				q = d(""),
				S = d(0),
				xe = d(""),
				ie = d(""),
				ue = d(""),
				re = d({}),
				X = d({}),
				de = d(""),
				fe = d(!1),
				Ve = d(""),
				ke = d(""),
				ve = d(new Date().toLocaleString("sv-SE").replace("T", " ")),
				ee = d(!1),
				ge = d(!1),
				be = d(!1),
				te = d(!1),
				me = d(!1),
				N = d(""),
				H = d(""),
				$e = d(""),
				pe = d(!1),
				Ue = d(!1),
				R = d(!1);
			ae({
				url: "/api/method/marley_frontend.api.get_logo_image",
				method: "GET",
				makeParams() {
					return {};
				},
				onSuccess(s) {
					s
						? ($e.value = s)
						: ($e.value =
								"https://raw.githubusercontent.com/frappe/healthcare/develop/healthcare/public/images/healthcare.svg");
				},
			}).fetch();
			let Pe = ae({
				url: "/api/method/marley_frontend.bed_management.get_filter_options",
				method: "GET",
				makeParams() {
					var s;
					return {
						room_type_filter:
							((s = _.value) == null ? void 0 : s.value) || null,
					};
				},
				onSuccess(s) {
					s &&
						((r.value = s.type_options),
						(x.value = s.service_unit_options),
						(g.value = s.patient_options),
						(B.value = s.allocate_patient_options),
						(L.value = s.consultant_options),
						(j.value = s.consultant_options),
						(G.value = s.allocate_rooms_options),
						(Z.value = s.room_status_options));
				},
				onError: s => {
					var t;
					(H = ((t = s.messages) == null ? void 0 : t[0]) || s),
						(N = "Filter Data Fetching Failed"),
						(ee.value = !0);
				},
			});
			Pe.fetch();
			let K = ae({
				url: "/api/method/marley_frontend.bed_management.get_room_details",
				method: "GET",
				makeParams() {
					var s, t, p;
					return {
						room_type_filter:
							((s = _.value) == null ? void 0 : s.value) || null,
						bed_filter: ((t = k.value) == null ? void 0 : t.value) || null,
						date_filter: $.value || null,
						patient_filter:
							((p = z.value) == null ? void 0 : p.value) || null,
						status_filter: U.value || null,
					};
				},
				onSuccess(s) {
					ne.value = s || [];
				},
				onError(s) {
					(H = s), (N = "Rooms Fetching Failed"), (ee.value = !0);
				},
			});
			K.fetch(),
				W(k, () => {
					K.fetch();
				}),
				W(_, () => {
					Pe.fetch(), K.fetch();
				}),
				W(U, () => {
					K.fetch();
				}),
				W(z, () => {
					K.fetch();
				}),
				W($, () => {
					(o.value = {}), K.fetch();
				}),
				W(E, s => {
					s && ((O.value = s.value), Me(s.value));
				}),
				W(re, s => {
					Je(s);
				}),
				W(S, s => {
					s &&
						V.value &&
						Ae(
							V.value,
							s,
							o.value.admission_ordered_for,
							o.value.ip_record,
							o.value.ip_status
						);
				}),
				W(V, s => {
					s &&
						S.value &&
						Ae(
							s,
							S.value,
							o.value.admission_ordered_for,
							o.value.ip_record,
							o.value.ip_status
						);
				});
			function Ae(s, t, p, l, le) {
				if (t && s && le == "Admission Scheduled") {
					const Y = new Date(s);
					Y.setDate(Y.getDate() + Number(t));
					const je = new Date(p);
					o.value.admission_ordered_for && je < Y
						? ((n.value.allocation_error = `Length of stay overlaps with IP Record ${l} ordered for Date: ${p}`),
						  (Ue.value = !0))
						: ((n.value.allocation_error = ""), (Ue.value = !1));
				}
			}
			function Je(s) {
				ae({
					url: "/api/method/marley_frontend.bed_management.get_filter_room",
					method: "GET",
					makeParams() {
						return { room_type: (s == null ? void 0 : s.value) || null };
					},
					onSuccess(p) {
						p && (Q.value = p);
					},
					onError: p => {
						var l;
						(H = ((l = p.messages) == null ? void 0 : l[0]) || p),
							(N = "Rooms Fetching Failed"),
							(ee.value = !0);
					},
				}).fetch();
			}
			function Qe() {
				(k.value = null),
					(_.value = null),
					(U.value = null),
					(z.value = null),
					($.value = null),
					(o.value = {});
			}
			function Ze(s) {
				(o.value = s),
					(Ve.value = o.value.patient_name),
					(ke.value = o.value.healthcare_service_unit_name),
					(n.value.admit_error = "");
			}
			function Xe(s) {
				Me(),
					(q.value = null),
					(E.value = null),
					(O.value = null),
					(u.value = null),
					(C.value = null),
					(S.value = 0),
					(b.value = s.service_unit_type),
					(h.value = {
						label: s.healthcare_service_unit_name,
						value: s.name,
					}),
					(ge.value = !0);
			}
			let et = ae({
				url: "/api/method/marley_frontend.bed_management.admit_patient",
				method: "GET",
				makeParams() {
					var s, t, p;
					return {
						ip_record:
							((s = o.value) == null ? void 0 : s.ip_record) || null,
						service_unit: ((t = o.value) == null ? void 0 : t.name) || null,
						check_in: (ve == null ? void 0 : ve.value) || null,
						expected_discharge:
							((p = o.value) == null ? void 0 : p.expected_discharge) ||
							null,
					};
				},
				onSuccess(s) {
					(R.value = !1),
						K.fetch(),
						(o.value = {}),
						(n.value.admit_error = ""),
						(me.value = !1),
						(H = "Patient Admitted Successfully"),
						(N = "Admitted successfully"),
						(te.value = !0);
				},
				onError(s) {
					var t;
					(R.value = !1),
						(n.value.admit_error =
							((t = s.messages) == null ? void 0 : t[0]) || s);
				},
			});
			function Se(s, t) {
				ae({
					url: "/api/method/marley_frontend.bed_management.change_status",
					method: "GET",
					makeParams() {
						return { status: t, room: s.name, ip_status: s.ip_status };
					},
					onSuccess(l) {
						l &&
							((o.value = {}),
							K.reload(),
							(H = "Room status changed to " + t),
							(N = "Room status changed successfully"),
							(te.value = !0));
					},
					onError: l => {
						var le;
						(H = ((le = l.messages) == null ? void 0 : le[0]) || l),
							(N = "Status change failed"),
							(ee.value = !0);
					},
				}).fetch();
			}
			function Me(s) {
				ae({
					url: "/api/method/marley_frontend.bed_management.get_encounter_options",
					method: "GET",
					makeParams() {
						return { patient: s || null };
					},
					onSuccess(p) {
						p && ((n.value.allocation_error = ""), (I.value = p));
					},
					onError: p => {
						var l;
						n.value.allocation_error =
							((l = p.messages) == null ? void 0 : l[0]) || p;
					},
				}).fetch();
			}
			function tt() {
				let s = ae({
					url: "/api/method/marley_frontend.bed_management.order_admission",
					method: "GET",
					makeParams() {
						var t, p, l, le;
						return {
							patient: (O == null ? void 0 : O.value) || null,
							encounter:
								((t = q.value) == null ? void 0 : t.value) || null,
							primary_consultant:
								((p = u.value) == null ? void 0 : p.value) || null,
							secondary_consultant:
								((l = C.value) == null ? void 0 : l.value) || null,
							bed_type: (b == null ? void 0 : b.value) || null,
							bed: ((le = h.value) == null ? void 0 : le.value) || null,
							admission_date: (V == null ? void 0 : V.value) || null,
							expected_length_of_stay:
								(S == null ? void 0 : S.value) || 0,
						};
					},
					onSuccess(t) {
						t &&
							((n.value.allocation_error = ""),
							t &&
								((ge.value = !1),
								(o.value = {}),
								K.reload(),
								(H = `Admission schedulled for patient ${E.value.label}. Inpatient Record No: ${t}`),
								(N = "Admission Schedulled"),
								(te.value = !0)));
					},
					onError: t => {
						var p;
						n.value.allocation_error =
							((p = t.messages) == null ? void 0 : p[0]) || t;
					},
				});
				E.value
					? (n.value.allocate_patient = "")
					: (n.value.allocate_patient = "This field is required"),
					V.value
						? (n.value.allocate_admission_date = "")
						: (n.value.allocate_admission_date = "This field is required"),
					u.value
						? (n.value.allocate_primary_consultant = "")
						: (n.value.allocate_primary_consultant =
								"This field is required"),
					!S.value > 0
						? (n.value.allocate_expected_length_of_stay =
								"This field is required")
						: (n.value.allocate_expected_length_of_stay = ""),
					!(!E.value || !V.value || !u.value || !S.value > 0) && s.fetch();
			}
			function lt() {
				let s = ae({
					url: "/api/method/marley_frontend.bed_management.order_bed_transfer",
					method: "GET",
					makeParams() {
						var t;
						return {
							patient: (ie == null ? void 0 : ie.value) || null,
							ipd: (de == null ? void 0 : de.value) || null,
							leave_from: (ue == null ? void 0 : ue.value) || null,
							transfer_to:
								((t = X.value) == null ? void 0 : t.value) || null,
							for_procedure: (fe == null ? void 0 : fe.value) || null,
						};
					},
					onSuccess(t) {
						(R.value = !1),
							t &&
								((n.value.transfer_error = ""),
								t &&
									((be.value = !1),
									(o.value = {}),
									K.reload(),
									(H = `Patient has transferred to ${X.value.label}`),
									(N = "Patient Transfer Successfull"),
									(te.value = !0)));
					},
					onError: t => {
						var p;
						(R.value = !1),
							(n.value.transfer_error =
								((p = t.messages) == null ? void 0 : p[0]) || t);
					},
				});
				re.value
					? (n.value.transfer_bed_type = "")
					: (n.value.transfer_bed_type = "This field is required"),
					X.value
						? (n.value.transfer_bed = "")
						: (n.value.transfer_bed = "This field is required"),
					!(!re.value || !X.value) && ((R.value = !0), s.fetch());
			}
			function at(s) {
				(be.value = !0),
					(xe.value = s.patient_name),
					(ie.value = s.patient),
					(ue.value = s.name),
					(de.value = s.ip_record),
					(re.value = null),
					(X.value = null);
			}
			function st() {
				pe.value = !0;
			}
			function ot() {
				window.location.href = "/app";
			}
			function nt(s) {
				window.location.href = "/app/inpatient-record/" + s;
			}
			return (s, t) => {
				const p = Dt("FeatherIcon");
				return (
					f(),
					M("div", Xt, [
						a("div", el, [
							a("div", tl, [
								a("div", ll, [
									a(
										"img",
										{
											src: e($e),
											alt: "Logo",
											class: "w-full h-full object-contain",
											onClick: t[0] || (t[0] = l => st()),
										},
										null,
										8,
										al
									),
								]),
							]),
							a("div", sl, [
								i(
									e(Ee),
									{
										options: e(r),
										placeholder: "Room Type",
										modelValue: e(_),
										"onUpdate:modelValue":
											t[1] ||
											(t[1] = l =>
												v(_) ? (_.value = l) : (_ = l)),
										size: "sm",
									},
									{
										prefix: m(() => t[45] || (t[45] = [])),
										"item-prefix": m(
											({ option: l }) => t[46] || (t[46] = [])
										),
										_: 1,
									},
									8,
									["options", "modelValue"]
								),
							]),
							a("div", ol, [
								i(
									e(Ee),
									{
										options: e(x),
										placeholder: "Bed",
										modelValue: e(k),
										"onUpdate:modelValue":
											t[2] ||
											(t[2] = l =>
												v(k) ? (k.value = l) : (k = l)),
										size: "sm",
									},
									{
										prefix: m(() => t[47] || (t[47] = [])),
										"item-prefix": m(
											({ option: l }) => t[48] || (t[48] = [])
										),
										_: 1,
									},
									8,
									["options", "modelValue"]
								),
							]),
							a("div", nl, [
								i(
									e(Ee),
									{
										options: e(g),
										placeholder: "Patient",
										modelValue: e(z),
										"onUpdate:modelValue":
											t[3] ||
											(t[3] = l =>
												v(z) ? (z.value = l) : (z = l)),
										size: "sm",
									},
									{
										prefix: m(() => t[49] || (t[49] = [])),
										"item-prefix": m(
											({ option: l }) => t[50] || (t[50] = [])
										),
										_: 1,
									},
									8,
									["options", "modelValue"]
								),
							]),
							a("div", il, [
								i(
									e(T),
									{
										type: "select",
										options: e(Z),
										placeholder: "Room Status",
										modelValue: e(U),
										"onUpdate:modelValue":
											t[4] ||
											(t[4] = l =>
												v(U) ? (U.value = l) : (U = l)),
										size: "sm",
									},
									null,
									8,
									["options", "modelValue"]
								),
							]),
							a("div", ul, [
								i(
									e($t),
									{
										modelValue: e($),
										"onUpdate:modelValue":
											t[5] ||
											(t[5] = l =>
												v($) ? ($.value = l) : ($ = l)),
										variant: "subtle",
										placeholder: "Date",
										disabled: !1,
									},
									null,
									8,
									["modelValue"]
								),
							]),
							a("div", rl, [
								i(
									e(A),
									{
										ref_for: !0,
										theme: "gray",
										label: "Clear Filters",
										disabled: !1,
										onClick: t[6] || (t[6] = l => Qe()),
									},
									{
										default: m(() => [
											a("div", dl, [
												i(
													e(ce),
													{
														text: "Clear Filter",
														placement: "top",
													},
													{
														default: m(() => [
															oe(
																s.$slots,
																"icon",
																{},
																() => [
																	i(p, {
																		name: "x",
																		class: "size-4 text-ink-gray-7",
																	}),
																],
																!0
															),
														]),
														_: 3,
													}
												),
											]),
										]),
										_: 3,
									}
								),
							]),
						]),
						a("div", ml, [
							a("div", pl, [
								(f(!0),
								M(
									he,
									null,
									Ce(
										e(ne),
										(l, le) => (
											f(),
											M("div", { key: le, class: "mb-6" }, [
												a("h2", cl, y(l.room_type_details), 1),
												a("div", fl, [
													(f(!0),
													M(
														he,
														null,
														Ce(
															l.rooms,
															Y => (
																f(),
																M(
																	"button",
																	{
																		key: Y.name,
																		class: J([
																			"p-3 rounded-md text-center text-sm font-semibold transition-all",
																			{
																				"bg-red-200":
																					Y.room_status ===
																					"Occupied",
																				"bg-green-200":
																					Y.room_status ===
																					"Vacant",
																				"!bg-gray-700 text-white":
																					Y.name ===
																					e(o)
																						.name,
																				"bg-blue-500 text-white":
																					Y.room_status ===
																					"Cleaning",
																				"bg-violet-700 text-white":
																					Y.room_status ===
																					"Under Maintenance",
																			},
																		]),
																		onClick: je =>
																			Ze(Y),
																	},
																	y(
																		Y.healthcare_service_unit_name
																	),
																	11,
																	vl
																)
															)
														),
														128
													)),
												]),
											])
										)
									),
									128
								)),
							]),
							a("div", _l, [
								e(o).name
									? (f(),
									  M("div", gl, [
											a("div", bl, [
												a(
													"span",
													{
														class: J([
															"px-3 py-1 text-xs font-bold rounded-md",
															{
																"bg-green-200 text-green-700":
																	e(o).room_status ===
																	"Vacant",
																"bg-red-200 text-red-700":
																	e(o).room_status ===
																	"Occupied",
																"bg-blue-200 text-gray-700":
																	e(o).room_status ===
																	"Cleaning",
																"bg-violet-700 text-white":
																	e(o).room_status ===
																	"Under Maintenance",
															},
														]),
													},
													y(e(o).room_status.toUpperCase()),
													3
												),
												[
													"Admission Scheduled",
													"Admitted",
												].includes(e(o).ip_status) &&
												e(o).room_status === "Cleaning"
													? (f(),
													  M(
															"span",
															yl,
															y(
																e(
																	o
																).ip_status.toUpperCase()
															),
															1
													  ))
													: w("", !0),
											]),
											a(
												"h3",
												hl,
												y(e(o).healthcare_service_unit_name),
												1
											),
											a(
												"p",
												xl,
												"₹" +
													y(e(o).rate) +
													" / " +
													y(e(o).uom),
												1
											),
											e(o).room_status == "Occupied" ||
											[
												"Admission Scheduled",
												"Admitted",
											].includes(e(o).ip_status)
												? (f(),
												  M("div", Vl, [
														t[62] ||
															(t[62] = a(
																"h3",
																{
																	class: "mt-3 font-semibold text-lg py-2",
																},
																" Occupancy Details ",
																-1
															)),
														a("p", kl, [
															t[51] ||
																(t[51] = a(
																	"b",
																	null,
																	"Patient:",
																	-1
																)),
															P(
																" " +
																	y(
																		e(o)
																			.patient_name
																	),
																1
															),
														]),
														a("p", wl, [
															t[52] ||
																(t[52] = a(
																	"b",
																	null,
																	"Encounter:",
																	-1
																)),
															P(
																" " +
																	y(
																		e(o)
																			.admission_encounter
																	),
																1
															),
														]),
														a("p", Cl, [
															t[53] ||
																(t[53] = a(
																	"b",
																	null,
																	"Practitioner:",
																	-1
																)),
															P(
																" " +
																	y(
																		e(o)
																			.practitioner_name
																	),
																1
															),
														]),
														a("p", Sl, [
															t[54] ||
																(t[54] = a(
																	"b",
																	null,
																	"IPD:",
																	-1
																)),
															t[55] || (t[55] = P()),
															a(
																"button",
																{
																	onClick:
																		t[7] ||
																		(t[7] = l =>
																			nt(
																				e(o)
																					.ip_record
																			)),
																},
																y(e(o).ip_record),
																1
															),
														]),
														a("p", Dl, [
															t[56] ||
																(t[56] = a(
																	"b",
																	null,
																	"IP Status:",
																	-1
																)),
															P(
																" " + y(e(o).ip_status),
																1
															),
														]),
														a("p", zl, [
															t[57] ||
																(t[57] = a(
																	"b",
																	null,
																	"Checked In Time:",
																	-1
																)),
															P(
																" " +
																	y(
																		s.formatDatetime(
																			e(o)
																				.check_in
																		)
																	),
																1
															),
														]),
														a("p", $l, [
															t[58] ||
																(t[58] = a(
																	"b",
																	null,
																	"Admission Ordered For:",
																	-1
																)),
															P(
																" " +
																	y(
																		s.formatDate(
																			e(o)
																				.admission_ordered_for
																		)
																	),
																1
															),
														]),
														a("p", Ul, [
															t[59] ||
																(t[59] = a(
																	"b",
																	null,
																	"Expected Discharge:",
																	-1
																)),
															P(
																" " +
																	y(
																		s.formatDate(
																			e(o)
																				.expected_discharge
																		)
																	),
																1
															),
														]),
														a("p", Tl, [
															t[60] ||
																(t[60] = a(
																	"b",
																	null,
																	"Admitted On:",
																	-1
																)),
															P(
																" " +
																	y(
																		s.formatDatetime(
																			e(o)
																				.admitted_datetime
																		)
																	),
																1
															),
														]),
														a("p", El, [
															t[61] ||
																(t[61] = a(
																	"b",
																	null,
																	"Discharged On:",
																	-1
																)),
															P(
																" " +
																	y(
																		s.formatDatetime(
																			e(o)
																				.discharge_datetime
																		)
																	),
																1
															),
														]),
												  ]))
												: w("", !0),
											a("div", Pl, [
												t[63] ||
													(t[63] = a(
														"h3",
														{
															class: "flex justify-center mt-3 font-semibold text-lg",
														},
														"Actions",
														-1
													)),
												a("div", Al, [
													e(o).room_status == "Vacant"
														? (f(),
														  D(
																e(A),
																{
																	key: 0,
																	variant: "outline",
																	ref_for: !0,
																	theme: "gray",
																	size: "xl",
																	label: "Schedule Admission",
																	disabled:
																		e(o)
																			.disable_schedule,
																	onClick:
																		t[8] ||
																		(t[8] = l =>
																			Xe(e(o))),
																	class: "px-4 py-8 rounded-md",
																},
																{
																	default: m(() => [
																		a("div", Ml, [
																			i(
																				e(ce),
																				{
																					text: "Schedule Admission",
																					placement:
																						"top",
																				},
																				{
																					default:
																						m(
																							() => [
																								oe(
																									s.$slots,
																									"icon",
																									{},
																									() => [
																										i(
																											p,
																											{
																												name: "plus",
																												class: "size-10 text-ink-gray-7",
																											}
																										),
																									],
																									!0
																								),
																							]
																						),
																					_: 3,
																				}
																			),
																		]),
																	]),
																	_: 3,
																},
																8,
																["disabled"]
														  ))
														: w("", !0),
													e(o).ip_status ==
													"Admission Scheduled"
														? (f(),
														  D(
																e(A),
																{
																	key: 1,
																	variant: "outline",
																	ref_for: !0,
																	theme: "gray",
																	size: "xl",
																	label: "Admit",
																	disabled:
																		e(o)
																			.disable_schedule,
																	onClick:
																		t[9] ||
																		(t[9] = l =>
																			v(me)
																				? (me.value =
																						!0)
																				: (me =
																						!0)),
																	class: "px-4 py-8 rounded-md",
																},
																{
																	default: m(() => [
																		a("div", jl, [
																			i(
																				e(ce),
																				{
																					text: "Admit",
																					placement:
																						"top",
																				},
																				{
																					default:
																						m(
																							() => [
																								oe(
																									s.$slots,
																									"icon",
																									{},
																									() => [
																										i(
																											p,
																											{
																												name: "user-plus",
																												class: "size-10 text-ink-gray-7",
																											}
																										),
																									],
																									!0
																								),
																							]
																						),
																					_: 3,
																				}
																			),
																		]),
																	]),
																	_: 3,
																},
																8,
																["disabled"]
														  ))
														: w("", !0),
													e(o).room_status ==
													"Under Maintenance"
														? (f(),
														  D(
																e(A),
																{
																	key: 2,
																	variant: "outline",
																	ref_for: !0,
																	theme: "gray",
																	size: "xl",
																	label: "Set as Vacant",
																	disabled: !1,
																	onClick:
																		t[10] ||
																		(t[10] = l =>
																			Se(
																				e(o),
																				"Vacant"
																			)),
																	class: "px-4 py-8 rounded-md",
																},
																{
																	default: m(() => [
																		a("div", Fl, [
																			i(
																				e(ce),
																				{
																					text: "Set as Vacant",
																					placement:
																						"top",
																				},
																				{
																					default:
																						m(
																							() => [
																								oe(
																									s.$slots,
																									"icon",
																									{},
																									() => [
																										i(
																											p,
																											{
																												name: "check",
																												class: "size-10 text-ink-gray-7",
																											}
																										),
																									],
																									!0
																								),
																							]
																						),
																					_: 3,
																				}
																			),
																		]),
																	]),
																	_: 3,
																}
														  ))
														: w("", !0),
													e(o).room_status == "Occupied" &&
													e(o).ip_status == "Admitted"
														? (f(),
														  D(
																e(A),
																{
																	key: 3,
																	variant: "outline",
																	ref_for: !0,
																	theme: "gray",
																	size: "xl",
																	label: "Transfer",
																	disabled: !1,
																	onClick:
																		t[11] ||
																		(t[11] = l =>
																			at(e(o))),
																	class: "px-4 py-8 rounded-md",
																},
																{
																	default: m(() => [
																		a("div", Bl, [
																			i(
																				e(ce),
																				{
																					text: "Transfer",
																					placement:
																						"top",
																				},
																				{
																					default:
																						m(
																							() => [
																								oe(
																									s.$slots,
																									"icon",
																									{},
																									() => [
																										i(
																											p,
																											{
																												name: "repeat",
																												class: "size-10 text-ink-gray-7",
																											}
																										),
																									],
																									!0
																								),
																							]
																						),
																					_: 3,
																				}
																			),
																		]),
																	]),
																	_: 3,
																}
														  ))
														: w("", !0),
													e(o).room_status == "Vacant"
														? (f(),
														  D(
																e(A),
																{
																	key: 4,
																	variant: "outline",
																	ref_for: !0,
																	theme: "gray",
																	size: "xl",
																	label: "Under Maintenance",
																	disabled: !1,
																	onClick:
																		t[12] ||
																		(t[12] = l =>
																			Se(
																				e(o),
																				"Under Maintenance"
																			)),
																	class: "px-4 py-8 rounded-md",
																},
																{
																	default: m(() => [
																		a("div", Il, [
																			i(
																				e(ce),
																				{
																					text: "Set as Under Maintenance",
																					placement:
																						"top",
																				},
																				{
																					default:
																						m(
																							() => [
																								oe(
																									s.$slots,
																									"icon",
																									{},
																									() => [
																										i(
																											p,
																											{
																												name: "alert-triangle",
																												class: "size-10 text-ink-gray-7",
																											}
																										),
																									],
																									!0
																								),
																							]
																						),
																					_: 3,
																				}
																			),
																		]),
																	]),
																	_: 3,
																}
														  ))
														: w("", !0),
													[
														"Under Maintenance",
														"Occupied",
														"Vacant",
													].includes(e(o).room_status)
														? (f(),
														  D(
																e(A),
																{
																	key: 5,
																	variant: "outline",
																	ref_for: !0,
																	theme: "gray",
																	size: "xl",
																	label: "Cleaning",
																	disabled: !1,
																	onClick:
																		t[13] ||
																		(t[13] = l =>
																			Se(
																				e(o),
																				"Cleaning"
																			)),
																	class: "px-4 py-8 rounded-md",
																},
																{
																	default: m(() => [
																		a("div", Ol, [
																			i(
																				e(ce),
																				{
																					text: "Set as Cleaning",
																					placement:
																						"top",
																				},
																				{
																					default:
																						m(
																							() => [
																								oe(
																									s.$slots,
																									"icon",
																									{},
																									() => [
																										i(
																											p,
																											{
																												name: "zap",
																												class: "size-10 text-ink-gray-7",
																											}
																										),
																									],
																									!0
																								),
																							]
																						),
																					_: 3,
																				}
																			),
																		]),
																	]),
																	_: 3,
																}
														  ))
														: w("", !0),
													e(o).room_status == "Cleaning"
														? (f(),
														  D(
																e(A),
																{
																	key: 6,
																	variant: "outline",
																	ref_for: !0,
																	theme: "gray",
																	size: "xl",
																	label: "Cleaning Completed",
																	disabled: !1,
																	onClick:
																		t[14] ||
																		(t[14] = l =>
																			Se(
																				e(o),
																				"Cleaning Completed"
																			)),
																	class: "px-4 py-8 rounded-md",
																},
																{
																	default: m(() => [
																		a("div", Ll, [
																			i(
																				e(ce),
																				{
																					text: "Cleaning Completed",
																					placement:
																						"top",
																				},
																				{
																					default:
																						m(
																							() => [
																								oe(
																									s.$slots,
																									"icon",
																									{},
																									() => [
																										i(
																											p,
																											{
																												name: "check",
																												class: "size-10 text-ink-gray-7",
																											}
																										),
																									],
																									!0
																								),
																							]
																						),
																					_: 3,
																				}
																			),
																		]),
																	]),
																	_: 3,
																}
														  ))
														: w("", !0),
												]),
											]),
									  ]))
									: (f(), M("div", Gl, "Select a bed")),
							]),
						]),
						i(
							e(ye),
							{
								options: {
									title: `${e(N)}`,
									message: `${e(H)}`,
									size: "xl",
									icon: {
										name: "alert-triangle",
										appearance: "warning",
									},
									actions: [{ label: "OK", variant: "solid" }],
								},
								modelValue: e(ee),
								"onUpdate:modelValue":
									t[15] ||
									(t[15] = l => (v(ee) ? (ee.value = l) : (ee = l))),
								onClick: t[16] || (t[16] = l => (e(ee).value = !1)),
							},
							null,
							8,
							["options", "modelValue"]
						),
						i(
							e(ye),
							{
								options: {
									title: `${e(N)}`,
									message: `${e(H)}`,
									size: "xl",
									icon: { name: "check", appearance: "success" },
									actions: [{ label: "OK", variant: "solid" }],
								},
								modelValue: e(te),
								"onUpdate:modelValue":
									t[17] ||
									(t[17] = l => (v(te) ? (te.value = l) : (te = l))),
								onClick: t[18] || (t[18] = l => (e(te).value = !1)),
							},
							null,
							8,
							["options", "modelValue"]
						),
						i(
							e(ye),
							{
								modelValue: e(ge),
								"onUpdate:modelValue":
									t[29] ||
									(t[29] = l => (v(ge) ? (ge.value = l) : (ge = l))),
								options: { size: "2xl" },
							},
							{
								"body-title": m(
									() =>
										t[64] ||
										(t[64] = [
											a(
												"h3",
												{ class: "font-bold" },
												"Allocate Bed",
												-1
											),
										])
								),
								"body-content": m(() => [
									a("div", Rl, [
										a("div", Yl, [
											a("div", ql, [
												i(
													e(T),
													{
														type: "autocomplete",
														options: e(B),
														label: "Patient",
														modelValue: e(E),
														"onUpdate:modelValue":
															t[19] ||
															(t[19] = l =>
																v(E)
																	? (E.value = l)
																	: (E = l)),
														size: "sm",
														variant: "subtle",
														disabled: !1,
														required: !0,
													},
													null,
													8,
													["options", "modelValue"]
												),
												e(n).allocate_patient
													? (f(),
													  D(
															e(se),
															{
																key: 0,
																message:
																	e(n)
																		.allocate_patient,
															},
															null,
															8,
															["message"]
													  ))
													: w("", !0),
											]),
											a("div", Nl, [
												i(
													e(T),
													{
														type: "text",
														label: "Patient ID",
														modelValue: e(O),
														"onUpdate:modelValue":
															t[20] ||
															(t[20] = l =>
																v(O)
																	? (O.value = l)
																	: (O = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
													},
													null,
													8,
													["modelValue"]
												),
											]),
											a("div", Hl, [
												i(
													e(T),
													{
														type: "autocomplete",
														options: e(I),
														label: "Encounter",
														modelValue: e(q),
														"onUpdate:modelValue":
															t[21] ||
															(t[21] = l =>
																v(q)
																	? (q.value = l)
																	: (q = l)),
														size: "sm",
														variant: "subtle",
														disabled: !1,
													},
													null,
													8,
													["options", "modelValue"]
												),
											]),
											a("div", Kl, [
												i(
													e(qe),
													{
														modelValue: e(V),
														"onUpdate:modelValue":
															t[22] ||
															(t[22] = l =>
																v(V)
																	? (V.value = l)
																	: (V = l)),
														variant: "subtle",
														placeholder: "Admission Date",
														label: "Admission Date",
														disabled: !1,
														required: !0,
													},
													null,
													8,
													["modelValue"]
												),
												e(n).allocate_admission_date
													? (f(),
													  D(
															e(se),
															{
																key: 0,
																message:
																	e(n)
																		.allocate_admission_date,
															},
															null,
															8,
															["message"]
													  ))
													: w("", !0),
											]),
											a("div", Wl, [
												i(
													e(T),
													{
														type: "autocomplete",
														options: e(L),
														label: "Primary Consultant",
														modelValue: e(u),
														"onUpdate:modelValue":
															t[23] ||
															(t[23] = l =>
																v(u)
																	? (u.value = l)
																	: (u = l)),
														size: "sm",
														variant: "subtle",
														disabled: !1,
														required: !0,
													},
													null,
													8,
													["options", "modelValue"]
												),
												e(n).allocate_primary_consultant
													? (f(),
													  D(
															e(se),
															{
																key: 0,
																message:
																	e(n)
																		.allocate_primary_consultant,
															},
															null,
															8,
															["message"]
													  ))
													: w("", !0),
											]),
											a("div", Jl, [
												i(
													e(T),
													{
														type: "autocomplete",
														options: e(j),
														label: "Secondary Consultant",
														modelValue: e(C),
														"onUpdate:modelValue":
															t[24] ||
															(t[24] = l =>
																v(C)
																	? (C.value = l)
																	: (C = l)),
														size: "sm",
														variant: "subtle",
														disabled: !1,
														required: !1,
													},
													null,
													8,
													["options", "modelValue"]
												),
											]),
											a("div", Ql, [
												i(
													e(T),
													{
														type: "text",
														label: "Expected Length of Stay",
														modelValue: e(S),
														"onUpdate:modelValue":
															t[25] ||
															(t[25] = l =>
																v(S)
																	? (S.value = l)
																	: (S = l)),
														size: "sm",
														variant: "subtle",
														disabled: !1,
														required: !0,
													},
													null,
													8,
													["modelValue"]
												),
												e(n).allocate_expected_length_of_stay
													? (f(),
													  D(
															e(se),
															{
																key: 0,
																message:
																	e(n)
																		.allocate_expected_length_of_stay,
															},
															null,
															8,
															["message"]
													  ))
													: w("", !0),
											]),
										]),
										a("div", Zl, [
											a("div", Xl, [
												i(
													e(T),
													{
														type: "text",
														label: "Bed Type",
														modelValue: e(b),
														"onUpdate:modelValue":
															t[26] ||
															(t[26] = l =>
																v(b)
																	? (b.value = l)
																	: (b = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
													},
													null,
													8,
													["modelValue"]
												),
											]),
											a("div", ea, [
												i(
													e(T),
													{
														type: "autocomplete",
														options: e(G),
														label: "Bed",
														modelValue: e(h),
														"onUpdate:modelValue":
															t[27] ||
															(t[27] = l =>
																v(h)
																	? (h.value = l)
																	: (h = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
													},
													null,
													8,
													["options", "modelValue"]
												),
											]),
										]),
									]),
									a("div", null, [
										e(n).allocation_error
											? (f(),
											  D(
													e(se),
													{
														key: 0,
														message: e(n).allocation_error,
													},
													null,
													8,
													["message"]
											  ))
											: w("", !0),
									]),
								]),
								actions: m(() => [
									i(
										e(A),
										{
											variant: "solid",
											onClick: t[28] || (t[28] = l => tt()),
											disabled: e(Ue),
										},
										{
											default: m(
												() =>
													t[65] ||
													(t[65] = [P("Order Admission")])
											),
											_: 1,
											__: [65],
										},
										8,
										["disabled"]
									),
								]),
								_: 1,
							},
							8,
							["modelValue"]
						),
						i(
							e(ye),
							{
								modelValue: e(be),
								"onUpdate:modelValue":
									t[38] ||
									(t[38] = l => (v(be) ? (be.value = l) : (be = l))),
								options: { size: "2xl" },
							},
							{
								"body-title": m(
									() =>
										t[66] ||
										(t[66] = [
											a(
												"h3",
												{ class: "font-bold" },
												"Transfer Bed",
												-1
											),
										])
								),
								"body-content": m(() => [
									a("div", ta, [
										a("div", la, [
											i(
												e(Zt),
												{
													label: "For Procedure",
													disabled: !1,
													modelValue: e(fe),
													"onUpdate:modelValue":
														t[30] ||
														(t[30] = l =>
															v(fe)
																? (fe.value = l)
																: (fe = l)),
												},
												null,
												8,
												["modelValue"]
											),
										]),
										a("div", aa, [
											a("div", sa, [
												i(
													e(T),
													{
														type: "text",
														label: "Patient",
														modelValue: e(xe),
														"onUpdate:modelValue":
															t[31] ||
															(t[31] = l =>
																v(xe)
																	? (xe.value = l)
																	: (xe = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
													},
													null,
													8,
													["modelValue"]
												),
											]),
											a("div", oa, [
												i(
													e(T),
													{
														type: "text",
														label: "Patient ID",
														modelValue: e(ie),
														"onUpdate:modelValue":
															t[32] ||
															(t[32] = l =>
																v(ie)
																	? (ie.value = l)
																	: (ie = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
													},
													null,
													8,
													["modelValue"]
												),
											]),
											a("div", na, [
												i(
													e(T),
													{
														type: "text",
														label: "IPD No",
														modelValue: e(de),
														"onUpdate:modelValue":
															t[33] ||
															(t[33] = l =>
																v(de)
																	? (de.value = l)
																	: (de = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
													},
													null,
													8,
													["modelValue"]
												),
											]),
											a("div", ia, [
												i(
													e(T),
													{
														type: "text",
														label: "Leave From",
														modelValue: e(ue),
														"onUpdate:modelValue":
															t[34] ||
															(t[34] = l =>
																v(ue)
																	? (ue.value = l)
																	: (ue = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
													},
													null,
													8,
													["modelValue"]
												),
											]),
										]),
										a("div", ua, [
											a("div", ra, [
												i(
													e(T),
													{
														type: "autocomplete",
														options: e(r),
														label: "Transfer Bed Type",
														modelValue: e(re),
														"onUpdate:modelValue":
															t[35] ||
															(t[35] = l =>
																v(re)
																	? (re.value = l)
																	: (re = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
														required: !0,
													},
													null,
													8,
													["options", "modelValue"]
												),
												e(n).transfer_bed_type
													? (f(),
													  D(
															e(se),
															{
																key: 0,
																message:
																	e(n)
																		.transfer_bed_type,
															},
															null,
															8,
															["message"]
													  ))
													: w("", !0),
											]),
											a("div", da, [
												i(
													e(T),
													{
														type: "autocomplete",
														options: e(Q),
														label: "Transfer To",
														modelValue: e(X),
														"onUpdate:modelValue":
															t[36] ||
															(t[36] = l =>
																v(X)
																	? (X.value = l)
																	: (X = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
														required: !0,
													},
													null,
													8,
													["options", "modelValue"]
												),
												e(n).transfer_bed
													? (f(),
													  D(
															e(se),
															{
																key: 0,
																message:
																	e(n).transfer_bed,
															},
															null,
															8,
															["message"]
													  ))
													: w("", !0),
											]),
										]),
									]),
									a("div", null, [
										e(n).transfer_error
											? (f(),
											  D(
													e(se),
													{
														key: 0,
														message: e(n).transfer_error,
													},
													null,
													8,
													["message"]
											  ))
											: w("", !0),
									]),
								]),
								actions: m(() => [
									i(
										e(A),
										{
											loading: e(R),
											disabled: e(R),
											variant: "solid",
											onClick: t[37] || (t[37] = l => lt()),
										},
										{
											default: m(
												() =>
													t[67] ||
													(t[67] = [P("Transfer Patient")])
											),
											_: 1,
											__: [67],
										},
										8,
										["loading", "disabled"]
									),
								]),
								_: 1,
							},
							8,
							["modelValue"]
						),
						i(
							e(ye),
							{
								modelValue: e(me),
								"onUpdate:modelValue":
									t[43] ||
									(t[43] = l => (v(me) ? (me.value = l) : (me = l))),
								options: {
									size: "2xl",
									icon: {
										name: "alert-triangle",
										appearance: "warning",
									},
								},
							},
							{
								"body-title": m(
									() =>
										t[68] ||
										(t[68] = [
											a(
												"h3",
												{ class: "font-bold" },
												"Confirm",
												-1
											),
										])
								),
								"body-content": m(() => [
									a("div", ma, [
										t[69] ||
											(t[69] = a(
												"div",
												{ class: "flex gap-2 mb-4" },
												[
													a(
														"p",
														null,
														"Are you sure you want to admit this patient?"
													),
												],
												-1
											)),
										a("div", pa, [
											a("div", ca, [
												i(
													e(T),
													{
														type: "text",
														label: "Patient",
														modelValue: e(Ve),
														"onUpdate:modelValue":
															t[39] ||
															(t[39] = l =>
																v(Ve)
																	? (Ve.value = l)
																	: (Ve = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
													},
													null,
													8,
													["modelValue"]
												),
											]),
											a("div", fa, [
												i(
													e(T),
													{
														type: "text",
														label: "Room",
														modelValue: e(ke),
														"onUpdate:modelValue":
															t[40] ||
															(t[40] = l =>
																v(ke)
																	? (ke.value = l)
																	: (ke = l)),
														size: "sm",
														variant: "subtle",
														disabled: !0,
													},
													null,
													8,
													["modelValue"]
												),
											]),
											a("div", va, [
												i(
													e(qe),
													{
														modelValue: e(ve),
														"onUpdate:modelValue":
															t[41] ||
															(t[41] = l =>
																v(ve)
																	? (ve.value = l)
																	: (ve = l)),
														variant: "subtle",
														placeholder: "Checkin",
														disabled: !1,
														label: "Checkin",
													},
													null,
													8,
													["modelValue"]
												),
											]),
										]),
									]),
									a("div", null, [
										e(n).admit_error
											? (f(),
											  D(
													e(se),
													{
														key: 0,
														message: e(n).admit_error,
													},
													null,
													8,
													["message"]
											  ))
											: w("", !0),
									]),
								]),
								actions: m(() => [
									i(
										e(A),
										{
											loading: e(R),
											disabled: e(R),
											variant: "solid",
											onClick:
												t[42] ||
												(t[42] = l => (
													e(et).submit(),
													v(R) ? (R.value = !0) : (R = !0)
												)),
										},
										{
											default: m(
												() => t[70] || (t[70] = [P("Confirm")])
											),
											_: 1,
											__: [70],
										},
										8,
										["loading", "disabled"]
									),
								]),
								_: 1,
							},
							8,
							["modelValue"]
						),
						i(
							e(ye),
							{
								options: {
									title: "Confirm",
									message: "Click confirm to go to Home page",
									size: "xl",
									icon: {
										name: "alert-triangle",
										appearance: "warning",
									},
									actions: [
										{
											label: "Confirm",
											variant: "solid",
											onClick: () => ot(),
										},
										{
											label: "Cancel",
											onClick: () =>
												v(pe) ? (pe.value = !1) : (pe = !1),
										},
									],
								},
								modelValue: e(pe),
								"onUpdate:modelValue":
									t[44] ||
									(t[44] = l => (v(pe) ? (pe.value = l) : (pe = l))),
							},
							null,
							8,
							["options", "modelValue"]
						),
					])
				);
			};
		},
	}),
	wa = Ke(ga, [["__scopeId", "data-v-4a1ab48a"]]);
export { wa as default };
//# sourceMappingURL=bed_management-7656981e.js.map
