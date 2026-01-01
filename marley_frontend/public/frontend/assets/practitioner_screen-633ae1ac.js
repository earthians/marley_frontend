var We = Object.defineProperty;
var se = Object.getOwnPropertySymbols;
var be = Object.prototype.hasOwnProperty,
	ge = Object.prototype.propertyIsEnumerable;
var ye = (s, x, p) =>
		x in s
			? We(s, x, { enumerable: !0, configurable: !0, writable: !0, value: p })
			: (s[x] = p),
	pe = (s, x) => {
		for (var p in x || (x = {})) be.call(x, p) && ye(s, p, x[p]);
		if (se) for (var p of se(x)) ge.call(x, p) && ye(s, p, x[p]);
		return s;
	};
var ce = (s, x) => {
	var p = {};
	for (var k in s) be.call(s, k) && x.indexOf(k) < 0 && (p[k] = s[k]);
	if (s != null && se)
		for (var k of se(s)) x.indexOf(k) < 0 && ge.call(s, k) && (p[k] = s[k]);
	return p;
};
var ke = (s, x, p) =>
	new Promise((k, g) => {
		var S = d => {
				try {
					m(p.next(d));
				} catch (O) {
					g(O);
				}
			},
			b = d => {
				try {
					m(p.throw(d));
				} catch (O) {
					g(O);
				}
			},
			m = d => (d.done ? k(d.value) : Promise.resolve(d.value).then(S, b));
		m((p = p.apply(s, x)).next());
	});
import {
	I as Ee,
	aE as Re,
	r as h,
	aF as Se,
	aG as Je,
	J as A,
	aH as Q,
	aI as Qe,
	al as Ye,
	aJ as Ze,
	aK as re,
	o as fe,
	y as K,
	Y as Ve,
	aL as Xe,
	aM as et,
	aN as tt,
	aO as at,
	aP as Oe,
	aQ as lt,
	F as le,
	z as nt,
	am as Pe,
	aR as ee,
	aS as me,
	aT as Ce,
	aU as oe,
	aV as Te,
	aW as st,
	_ as Ae,
	m as J,
	$ as ot,
	C as te,
	k as y,
	h as q,
	g as c,
	d as n,
	b as $,
	x as ve,
	e as o,
	A as it,
	w as rt,
	l as ie,
	t as R,
	L as ut,
	D as Y,
	j as E,
	a0 as dt,
	a1 as pt,
	c as W,
	f as e,
	i as G,
	s as B,
	Z as L,
	a3 as ct,
	a4 as mt,
	a5 as _t,
	a6 as vt,
	a7 as ft,
	E as ht,
	n as xt,
	a8 as yt,
	q as _e,
	p as $e,
} from "./index-8ff34837.js";
import { _ as bt } from "./DatePicker.vue_vue_type_script_setup_true_lang-9ccf8b49.js";
import { _ as gt } from "./Tabs-aec610b8.js";
import { E as we, K as kt } from "./label-1daf495d.js";
import "./use-resolve-button-type-f09d071e.js";
function Vt(s, x) {
	return s === x;
}
let Ge = Symbol("RadioGroupContext");
function Fe(s) {
	let x = Pe(Ge, null);
	if (x === null) {
		let p = new Error(`<${s} /> is missing a parent <RadioGroup /> component.`);
		throw (Error.captureStackTrace && Error.captureStackTrace(p, Fe), p);
	}
	return x;
}
let Ct = Ee({
	name: "RadioGroup",
	emits: { "update:modelValue": s => !0 },
	props: {
		as: { type: [Object, String], default: "div" },
		disabled: { type: [Boolean], default: !1 },
		by: { type: [String, Function], default: () => Vt },
		modelValue: { type: [Object, String, Number, Boolean], default: void 0 },
		defaultValue: { type: [Object, String, Number, Boolean], default: void 0 },
		form: { type: String, optional: !0 },
		name: { type: String, optional: !0 },
		id: { type: String, default: null },
	},
	inheritAttrs: !1,
	setup(s, { emit: x, attrs: p, slots: k, expose: g }) {
		var S;
		let b = (S = s.id) != null ? S : `headlessui-radiogroup-${Re()}`,
			m = h(null),
			d = h([]),
			O = we({ name: "RadioGroupLabel" }),
			v = Se({ name: "RadioGroupDescription" });
		g({ el: m, $el: m });
		let [V, F] = Je(
				A(() => s.modelValue),
				r => x("update:modelValue", r),
				A(() => s.defaultValue)
			),
			T = {
				options: d,
				value: V,
				disabled: A(() => s.disabled),
				firstOption: A(() => d.value.find(r => !r.propsRef.disabled)),
				containsCheckedOption: A(() =>
					d.value.some(r => T.compare(Q(r.propsRef.value), Q(s.modelValue)))
				),
				compare(r, f) {
					if (typeof s.by == "string") {
						let _ = s.by;
						return (
							(r == null ? void 0 : r[_]) === (f == null ? void 0 : f[_])
						);
					}
					return s.by(r, f);
				},
				change(r) {
					var f;
					if (s.disabled || T.compare(Q(V.value), Q(r))) return !1;
					let _ =
						(f = d.value.find(P => T.compare(Q(P.propsRef.value), Q(r)))) ==
						null
							? void 0
							: f.propsRef;
					return _ != null && _.disabled ? !1 : (F(r), !0);
				},
				registerOption(r) {
					d.value.push(r), (d.value = Qe(d.value, f => f.element));
				},
				unregisterOption(r) {
					let f = d.value.findIndex(_ => _.id === r);
					f !== -1 && d.value.splice(f, 1);
				},
			};
		Ye(Ge, T),
			Ze({
				container: A(() => re(m)),
				accept(r) {
					return r.getAttribute("role") === "radio"
						? NodeFilter.FILTER_REJECT
						: r.hasAttribute("role")
						? NodeFilter.FILTER_SKIP
						: NodeFilter.FILTER_ACCEPT;
				},
				walk(r) {
					r.setAttribute("role", "none");
				},
			});
		function U(r) {
			if (!m.value || !m.value.contains(r.target)) return;
			let f = d.value.filter(_ => _.propsRef.disabled === !1).map(_ => _.element);
			switch (r.key) {
				case ee.Enter:
					st(r.currentTarget);
					break;
				case ee.ArrowLeft:
				case ee.ArrowUp:
					if (
						(r.preventDefault(),
						r.stopPropagation(),
						Ce(f, oe.Previous | oe.WrapAround) === Te.Success)
					) {
						let _ = d.value.find(P => {
							var C;
							return (
								P.element ===
								((C = me(m)) == null ? void 0 : C.activeElement)
							);
						});
						_ && T.change(_.propsRef.value);
					}
					break;
				case ee.ArrowRight:
				case ee.ArrowDown:
					if (
						(r.preventDefault(),
						r.stopPropagation(),
						Ce(f, oe.Next | oe.WrapAround) === Te.Success)
					) {
						let _ = d.value.find(P => {
							var C;
							return (
								P.element ===
								((C = me(P.element)) == null ? void 0 : C.activeElement)
							);
						});
						_ && T.change(_.propsRef.value);
					}
					break;
				case ee.Space:
					{
						r.preventDefault(), r.stopPropagation();
						let _ = d.value.find(P => {
							var C;
							return (
								P.element ===
								((C = me(P.element)) == null ? void 0 : C.activeElement)
							);
						});
						_ && T.change(_.propsRef.value);
					}
					break;
			}
		}
		let w = A(() => {
			var r;
			return (r = re(m)) == null ? void 0 : r.closest("form");
		});
		return (
			fe(() => {
				K(
					[w],
					() => {
						if (!w.value || s.defaultValue === void 0) return;
						function r() {
							T.change(s.defaultValue);
						}
						return (
							w.value.addEventListener("reset", r),
							() => {
								var f;
								(f = w.value) == null ||
									f.removeEventListener("reset", r);
							}
						);
					},
					{ immediate: !0 }
				);
			}),
			() => {
				let D = s,
					{ disabled: r, name: f, form: _ } = D,
					P = ce(D, ["disabled", "name", "form"]),
					C = {
						ref: m,
						id: b,
						role: "radiogroup",
						"aria-labelledby": O.value,
						"aria-describedby": v.value,
						onKeydown: U,
					};
				return Ve(le, [
					...(f != null && V.value != null
						? Xe({ [f]: V.value }).map(([I, j]) =>
								Ve(
									et,
									tt({
										features: at.Hidden,
										key: I,
										as: "input",
										type: "hidden",
										hidden: !0,
										readOnly: !0,
										form: _,
										disabled: r,
										name: I,
										value: j,
									})
								)
						  )
						: []),
					Oe({
						ourProps: C,
						theirProps: pe(
							pe({}, p),
							lt(P, ["modelValue", "defaultValue", "by"])
						),
						slot: {},
						attrs: p,
						slots: k,
						name: "RadioGroup",
					}),
				]);
			}
		);
	},
});
var Tt = (s => ((s[(s.Empty = 1)] = "Empty"), (s[(s.Active = 2)] = "Active"), s))(
	Tt || {}
);
let $t = Ee({
		name: "RadioGroupOption",
		props: {
			as: { type: [Object, String], default: "div" },
			value: { type: [Object, String, Number, Boolean] },
			disabled: { type: Boolean, default: !1 },
			id: { type: String, default: null },
		},
		setup(s, { attrs: x, slots: p, expose: k }) {
			var g;
			let S = (g = s.id) != null ? g : `headlessui-radiogroup-option-${Re()}`,
				b = Fe("RadioGroupOption"),
				m = we({ name: "RadioGroupLabel" }),
				d = Se({ name: "RadioGroupDescription" }),
				O = h(null),
				v = A(() => ({ value: s.value, disabled: s.disabled })),
				V = h(1);
			k({ el: O, $el: O });
			let F = A(() => re(O));
			fe(() => b.registerOption({ id: S, element: F, propsRef: v })),
				nt(() => b.unregisterOption(S));
			let T = A(() => {
					var C;
					return ((C = b.firstOption.value) == null ? void 0 : C.id) === S;
				}),
				U = A(() => b.disabled.value || s.disabled),
				w = A(() => b.compare(Q(b.value.value), Q(s.value))),
				r = A(() =>
					U.value
						? -1
						: w.value || (!b.containsCheckedOption.value && T.value)
						? 0
						: -1
				);
			function f() {
				var C;
				b.change(s.value) && ((V.value |= 2), (C = re(O)) == null || C.focus());
			}
			function _() {
				V.value |= 2;
			}
			function P() {
				V.value &= -3;
			}
			return () => {
				let H = s,
					{ value: C, disabled: D } = H,
					I = ce(H, ["value", "disabled"]),
					j = {
						checked: w.value,
						disabled: U.value,
						active: !!(V.value & 2),
					},
					M = {
						id: S,
						ref: O,
						role: "radio",
						"aria-checked": w.value ? "true" : "false",
						"aria-labelledby": m.value,
						"aria-describedby": d.value,
						"aria-disabled": U.value ? !0 : void 0,
						tabIndex: r.value,
						onClick: U.value ? void 0 : f,
						onFocus: U.value ? void 0 : _,
						onBlur: U.value ? void 0 : P,
					};
				return Oe({
					ourProps: M,
					theirProps: I,
					slot: j,
					attrs: x,
					slots: p,
					name: "RadioGroupOption",
				});
			};
		},
	}),
	Et = kt;
const Rt = {
		name: "TabButtons",
		props: {
			buttons: { type: Array, required: !0 },
			modelValue: { type: [String, Boolean, Number] },
		},
		emits: ["update:modelValue"],
		components: {
			Button: J,
			FeatherIcon: ot,
			RadioGroup: Ct,
			RadioGroupOption: $t,
			RadioGroupLabel: Et,
		},
		computed: {
			value: {
				get() {
					return this.modelValue;
				},
				set(s) {
					this.$emit("update:modelValue", s);
				},
			},
		},
	},
	St = {
		class: "flex space-x-0.5 rounded-md bg-surface-gray-2 h-7 items-center px-[1px] text-sm",
	};
function Ot(s, x, p, k, g, S) {
	const b = te("RadioGroupLabel"),
		m = te("Button"),
		d = te("RadioGroupOption"),
		O = te("RadioGroup");
	return (
		y(),
		q(
			O,
			{
				modelValue: S.value,
				"onUpdate:modelValue": x[0] || (x[0] = v => (S.value = v)),
			},
			{
				default: c(() => [
					n("div", St, [
						(y(!0),
						$(
							le,
							null,
							ve(p.buttons, v => {
								var V;
								return (
									y(),
									q(
										d,
										{
											as: "div",
											key: v.label,
											disabled: v.disabled,
											value: (V = v.value) != null ? V : v.label,
										},
										{
											default: c(({ active: F, checked: T }) => [
												o(
													m,
													it(
														{ onClick: v.onClick },
														{ ref_for: !0 },
														v,
														{
															class: [
																"!h-6.5",
																[
																	F
																		? "ring-outline-gray-2 focus-visible:ring"
																		: "",
																	T &&
																		"!bg-surface-white",
																	v.disabled
																		? ""
																		: T
																		? " text-ink-gray-9 shadow"
																		: "text-ink-gray-7",
																],
															],
														}
													),
													{
														default: c(() => [
															rt(
																o(
																	b,
																	{
																		as: "span",
																		class: "flex h-4 items-center",
																	},
																	{
																		default: c(
																			() => [
																				ie(
																					R(
																						v.label
																					),
																					1
																				),
																			]
																		),
																		_: 2,
																	},
																	1536
																),
																[
																	[
																		ut,
																		v.label &&
																			!v.hideLabel,
																	],
																]
															),
														]),
														_: 2,
													},
													1040,
													["onClick", "class"]
												),
											]),
											_: 2,
										},
										1032,
										["disabled", "value"]
									)
								);
							}),
							128
						)),
					]),
				]),
				_: 1,
			},
			8,
			["modelValue"]
		)
	);
}
const Pt = Ae(Rt, [["render", Ot]]),
	At = { class: "flex justify-between gap-2" },
	wt = { class: "flex items-center" },
	Gt = { key: 1, class: "mx-3 h-[80%] border-l" },
	Ft = { class: "flex items-center gap-1 text-base text-ink-gray-5" },
	zt = {
		__name: "ListFooter",
		props: {
			modelValue: { type: Number, default: 20 },
			options: {
				type: Object,
				default: () => ({
					rowCount: 0,
					totalCount: 0,
					pageLengthOptions: [20, 50, 100],
				}),
			},
		},
		emits: ["update:modelValue", "loadMore"],
		setup(s, { emit: x }) {
			const p = s,
				k = x,
				g = A({ get: () => p.modelValue, set: m => k("update:modelValue", m) }),
				S = h(p.options.pageLengthOptions || [20, 50, 100]),
				b = A(
					() =>
						p.options.rowCount &&
						p.options.totalCount &&
						p.options.rowCount < p.options.totalCount
				);
			return (m, d) => {
				const O = te("Button");
				return (
					y(),
					$("div", At, [
						Y(m.$slots, "default", {}, () => [
							Y(m.$slots, "left", {}, () => [
								o(
									Pt,
									{
										modelValue: g.value,
										"onUpdate:modelValue":
											d[0] || (d[0] = v => (g.value = v)),
										buttons: S.value.map(v => ({
											label: v,
											value: v,
										})),
									},
									null,
									8,
									["modelValue", "buttons"]
								),
							]),
							Y(m.$slots, "right", {}, () => [
								n("div", wt, [
									b.value
										? (y(),
										  q(O, {
												key: 0,
												label: "Load More",
												onClick:
													d[1] || (d[1] = v => k("loadMore")),
										  }))
										: E("", !0),
									b.value ? (y(), $("div", Gt)) : E("", !0),
									n("div", Ft, [
										n("div", null, R(s.options.rowCount || "0"), 1),
										d[2] || (d[2] = n("div", null, "of", -1)),
										n(
											"div",
											null,
											R(s.options.totalCount || "0"),
											1
										),
									]),
								]),
							]),
						]),
					])
				);
			};
		},
	};
const Lt = { class: "bg-gray-50 relative w-full h-screen" },
	Ut = { class: "flex items-center bg-white border-b border-gray-300 p-4 space-x-4" },
	Nt = { class: "px-4" },
	Bt = { class: "w-10 h-10" },
	Dt = ["src"],
	It = { class: "w-1/5" },
	Mt = { class: "w-1/5" },
	jt = { class: "w-1/5" },
	Kt = { class: "w-1/5" },
	qt = { class: "w-1/5" },
	Ht = { class: "w-1/5" },
	Wt = { class: "w-1/5" },
	Jt = { class: "p-1" },
	Qt = { class: "flex items-center truncate" },
	Yt = { class: "bg-white p-4 rounded-lg relative w-full" },
	Zt = { key: 0 },
	Xt = { key: 1 },
	ea = { key: 0 },
	ta = { key: 1 },
	aa = { class: "px-1 py-1 text-center place-content-center text-md" },
	la = { class: "space-x-2" },
	na = { key: 0, class: "px-1 py-1 text-xss place-content-center !text-red-600" },
	sa = { key: 2 },
	oa = { class: "px-1 py-1 text-center place-content-center text-sm" },
	ia = { key: 3 },
	ra = { class: "flex-1 px-1 py-1 text-center flex space-x-1" },
	ua = { class: "flex items-center" },
	da = { class: "px-1 text-center text-base" },
	pa = { key: 0, class: "flex-1 px-1 py-1 text-center flex space-x-1" },
	ca = { class: "flex items-center" },
	ma = { class: "py-1 px-1 text-center text-base" },
	_a = { key: 4 },
	va = { class: "flex-1 px-1 text-center flex space-x-1" },
	fa = { class: "flex items-center" },
	ha = { class: "py-1 px-1 text-center text-base" },
	xa = { class: "flex-1 px-1 text-center flex space-x-2" },
	ya = { class: "flex items-center" },
	ba = { class: "py-1 px-1 text-center text-base" },
	ga = { class: "flex-1 px-1 text-center flex space-x-2" },
	ka = { class: "flex items-center" },
	Va = { class: "py-1 px-1 text-center text-base" },
	Ca = { key: 5 },
	Ta = { class: "flex-1 px-1 text-center flex space-x-1" },
	$a = { class: "flex items-center" },
	Ea = { class: "py-1 px-1 text-center text-base" },
	Ra = { class: "flex-1 px-1 text-center flex space-x-1" },
	Sa = { class: "flex items-center" },
	Oa = { class: "py-1 px-1 text-center text-base" },
	Pa = { class: "flex-1 px-1 text-center flex space-x-1" },
	Aa = { class: "flex items-center" },
	wa = { class: "py-1 px-1 text-center text-base" },
	Ga = { class: "flex-1 px-1 text-center flex space-x-2" },
	Fa = { class: "flex items-center" },
	za = { class: "py-1 px-1 text-center text-base" },
	La = { key: 6 },
	Ua = { class: "flex justify-center gap-2" },
	Na = { class: "flex items-center truncate" },
	Ba = { class: "flex items-center truncate" },
	Da = { class: "flex items-center truncate" },
	Ia = { key: 7 },
	Ma = { class: "px-1 py-1 text-center place-content-center" },
	ja = {
		key: 0,
		class: "px-1 py-1 text-xss text-center !text-green-500 place-content-center",
	},
	Ka = { key: 8 },
	qa = { class: "px-1 py-1 text-sm" },
	Ha = { class: "mb-4" },
	Wa = { class: "grid grid-cols-2 gap-2 py-2" },
	Ja = { class: "py-1 w-full" },
	Qa = { class: "py-1 w-full" },
	Ya = { class: "py-1 w-full" },
	Za = { class: "py-1 w-full" },
	Xa = { class: "grid grid-cols-2 gap-2" },
	el = { class: "py-1 w-full" },
	tl = {
		__name: "practitioner_screen",
		props: { modelValue: {}, modelModifiers: {} },
		emits: dt(
			[
				"loadMore",
				"updatePageCount",
				"columnWidthUpdated",
				"applyFilter",
				"applyLikeFilter",
				"likeDoc",
			],
			["update:modelValue"]
		),
		setup(s, { emit: x }) {
			const p = h(0),
				k = h([
					{
						label: "Patient",
						key: "patient_name",
						icon: "user",
						width: "250px",
						align: "left",
					},
					{
						label: "Patient Details",
						key: "patient_details",
						icon: "archive",
						width: "220px",
						align: "left",
					},
					{
						label: "Appointment Details",
						key: "appointment_details",
						icon: "clipboard",
						width: "230px",
						align: "left",
					},
					{
						label: "Time",
						key: "appointment_time_",
						icon: "clock",
						width: "150px",
						align: "center",
					},
					{
						label: "Token No",
						key: "patient_token_number",
						icon: "log-in",
						width: "110px",
						align: "center",
					},
					{
						label: "Room",
						key: "service",
						icon: "archive",
						width: "260px",
						align: "center",
					},
					{
						label: "Status",
						key: "status",
						icon: "check-circle",
						width: "180px",
						align: "center",
					},
					{
						label: "Actions",
						key: "actions",
						icon: "chevrons-right",
						width: "240px",
						align: "center",
					},
				]),
				g = h(!1),
				S = pt(s, "modelValue");
			let b = h(""),
				m = h(""),
				d = h(null),
				O = h([]),
				v = h(null),
				V = h(""),
				F = h(""),
				T = h(""),
				U = h([]),
				w = h(""),
				r = h([]),
				f = h(""),
				_ = h(!1),
				P = h(20),
				C = h([]),
				D = h(!1),
				I = h(""),
				j = h(""),
				M = h(""),
				H = h(""),
				ae = h(""),
				he = h([]),
				Z = h({}),
				ue = A(() => [
					{ label: "In Queue (0)", name: "Open", appointments: [] },
					{ label: "Attending (0)", name: "Checked Out", appointments: [] },
					{ label: "Consulted (0)", name: "Consulted", appointments: [] },
					{ label: "All (0)", name: "All", appointments: [] },
				]);
			const xe = Pe("$socket");
			xe &&
				fe(() => {
					xe.on("update_appointment_status", i => {
						z.reload();
					});
				});
			let de = h("");
			W({
				url: "/api/method/marley_frontend.api.get_logo_image",
				method: "GET",
				makeParams() {
					return {};
				},
				onSuccess(i) {
					i
						? (de.value = i)
						: (de.value =
								"https://raw.githubusercontent.com/frappe/healthcare/develop/healthcare/public/images/healthcare.svg");
				},
			}).fetch();
			let z = W({
				url: "/api/method/marley_frontend.practitioner_screen.get_appointments",
				method: "GET",
				makeParams() {
					var i, t, u;
					return {
						token_search: (V == null ? void 0 : V.value) || null,
						patient_search:
							((i = T.value) == null ? void 0 : i.value) || null,
						mobile_search: (v == null ? void 0 : v.value) || null,
						appointment_search:
							((t = d.value) == null ? void 0 : t.value) || null,
						appointment_type:
							((u = w.value) == null ? void 0 : u.value) || null,
						sort_by: (f == null ? void 0 : f.value) || null,
						limit: (P == null ? void 0 : P.value) || null,
						date: (F == null ? void 0 : F.value) || null,
					};
				},
				onSuccess(i) {
					(O.value = i.appointment_options),
						(he.value = i.enc_type_options),
						(ue = A(() => i.formatted_data));
				},
				onError(i) {
					var t;
					(m = "Fetching Appointments Failed"),
						(b = ((t = i.messages) == null ? void 0 : t[0]) || i),
						(g.value = !0);
				},
			});
			z.fetch(),
				K(d, () => {
					z.reload();
				}),
				K(T, () => {
					z.reload();
				}),
				K(V, () => {
					z.reload();
				}),
				K(F, () => {
					z.reload();
				}),
				K(v, () => {
					z.reload();
				}),
				K(w, () => {
					z.reload();
				}),
				K(f, () => {
					z.reload();
				}),
				K(S, (i, t) => {
					i !== t && ((P.value = i), z.reload());
				});
			function ze(i) {
				(C.value = i),
					i.encounter
						? (window.location.href =
								"/app/patient-encounter/" + i.encounter)
						: ((I.value = i.patient_name),
						  (j.value = i.patient),
						  (H.value = i.name),
						  (M = ""),
						  (ae.value = i.practitioner_name),
						  (D.value = !0));
			}
			let Le = () =>
				ke(this, null, function* () {
					let i = W({
						url: "/api/method/marley_frontend.practitioner_screen.make_encounter",
						method: "POST",
						makeParams() {
							var t, u, a;
							return {
								appointment:
									((t = C.value) == null ? void 0 : t.name) || null,
								token:
									((u = C.value) == null ? void 0 : u.token) || null,
								current_unit:
									((a = C.value) == null ? void 0 : a.token_su) ||
									null,
								enc_type: M || null,
							};
						},
						onSuccess(t) {
							t &&
								(t.success
									? ((window.location.href =
											"/app/patient-encounter/" + t.encounter),
									  z.reload())
									: ((m = "Encounter Creation Failed"),
									  (b = t.message),
									  (g.value = !0)));
						},
						onError(t) {
							var u;
							(m = "Encounter Creation Failed"),
								(b = ((u = t.messages) == null ? void 0 : u[0]) || t),
								(g.value = !0);
						},
					});
					if (
						(M
							? (Z.value.enc_type = "")
							: (Z.value.enc_type = "This field is required"),
						M)
					)
						(D.value = !1), yield i.submit();
					else return;
				});
			function Ue(i) {
				window.location.href = "/app/patient/" + i.patient;
			}
			const { fetch: Ne } = W({
				url: "/api/method/marley_frontend.practitioner_screen.get_search_options",
				method: "GET",
				makeParams() {
					return { status: "Active" };
				},
				onSuccess(i) {
					(r.value = i.appointment_type_list), (U.value = i.patient_list);
				},
				onError(i) {
					var t;
					(m = "Fetching Search Options Failed"),
						(b = ((t = i.messages) == null ? void 0 : t[0]) || i),
						(g.value = !0);
				},
			});
			Ne();
			function Be(i, t, u) {
				De(u)
					.then(() => {
						Ie(u);
					})
					.catch(l => {
						var X;
						(m = "Calling Patient Failed"),
							(b = ((X = l.messages) == null ? void 0 : X[0]) || l),
							(g.value = !0);
					}),
					W({
						url: "/api/method/marley_frontend.api.trigger_call",
						method: "GET",
						makeParams() {
							return { token: i, service_unit: t };
						},
						onError(l) {
							var X;
							(m = "Calling Failed"),
								(b = ((X = l.messages) == null ? void 0 : X[0]) || l),
								(g.value = !0);
						},
					}).submit();
			}
			function De(i) {
				return new Promise((t, u) => {
					W({
						url: "/api/method/marley_frontend.practitioner_screen.check_if_called",
						method: "GET",
						makeParams() {
							return { last_called_appointment: i };
						},
						onSuccess(l) {
							l.appointment_ids &&
								l.appointment_ids.length > 0 &&
								z.reload(),
								t(l);
						},
						onError(l) {
							u(l);
						},
					}).fetch();
				});
			}
			function Ie(i) {
				W({
					url: "/api/method/marley_frontend.practitioner_screen.mark_as_called",
					method: "POST",
					makeParams() {
						return { appointment_id: i };
					},
					onSuccess(u) {
						u.error
							? ((m = "Mark Calling Failed"),
							  (b = u.error),
							  (g.value = !0))
							: z.reload();
					},
					onError(u) {
						var a;
						(m = "Mark Calling Failed"),
							(b = ((a = u.messages) == null ? void 0 : a[0]) || u),
							(g.value = !0);
					},
				}).submit();
			}
			function Me(i) {
				W({
					url: "/api/method/marley_frontend.practitioner_screen.route_to_therapy",
					method: "POST",
					makeParams() {
						return { appointment: i };
					},
					onSuccess(u) {
						u &&
							(window.location.href =
								"/app/therapy-session/" + u.session);
					},
					onError(u) {
						var a;
						(m = "Therapy Session Creation Failed"),
							(b = ((a = u.messages) == null ? void 0 : a[0]) || u),
							(g.value = !0);
					},
				}).submit();
			}
			function je() {
				_.value = !0;
			}
			function Ke() {
				window.location.href = "/app";
			}
			function qe() {
				(d.value = ""),
					(v.value = ""),
					(V.value = ""),
					(f.value = ""),
					(T.value = ""),
					(w.value = "");
			}
			return (i, t) => {
				const u = te("FeatherIcon");
				return (
					y(),
					$(
						le,
						null,
						[
							n("div", Lt, [
								n("div", Ut, [
									n("div", Nt, [
										n("div", Bt, [
											n(
												"img",
												{
													src: e(de),
													alt: "Logo",
													class: "w-full h-full object-contain",
													onClick: t[0] || (t[0] = a => je()),
												},
												null,
												8,
												Dt
											),
										]),
									]),
									n("div", It, [
										o(
											e(B),
											{
												type: "autocomplete",
												options: e(O),
												size: "sm",
												variant: "subtle",
												placeholder: "Appointments",
												disabled: !1,
												modelValue: e(d),
												"onUpdate:modelValue":
													t[1] ||
													(t[1] = a =>
														G(d) ? (d.value = a) : (d = a)),
											},
											null,
											8,
											["options", "modelValue"]
										),
									]),
									n("div", Mt, [
										o(
											e(B),
											{
												type: "autocomplete",
												options: e(U),
												size: "sm",
												placeholder: "Patient",
												disabled: !1,
												modelValue: e(T),
												"onUpdate:modelValue":
													t[2] ||
													(t[2] = a =>
														G(T) ? (T.value = a) : (T = a)),
												variant: "subtle",
											},
											null,
											8,
											["options", "modelValue"]
										),
									]),
									n("div", jt, [
										o(
											e(B),
											{
												type: "text",
												size: "sm",
												variant: "subtle",
												placeholder: "Mobile Number",
												disabled: !1,
												modelValue: e(v),
												"onUpdate:modelValue":
													t[3] ||
													(t[3] = a =>
														G(v) ? (v.value = a) : (v = a)),
											},
											null,
											8,
											["modelValue"]
										),
									]),
									n("div", Kt, [
										o(
											e(B),
											{
												type: "text",
												size: "sm",
												variant: "subtle",
												placeholder: "Token Number",
												disabled: !1,
												modelValue: e(V),
												"onUpdate:modelValue":
													t[4] ||
													(t[4] = a =>
														G(V) ? (V.value = a) : (V = a)),
											},
											null,
											8,
											["modelValue"]
										),
									]),
									n("div", qt, [
										o(
											e(bt),
											{
												modelValue: e(F),
												"onUpdate:modelValue":
													t[5] ||
													(t[5] = a =>
														G(F) ? (F.value = a) : (F = a)),
												variant: "subtle",
												placeholder: "Date",
												disabled: !1,
											},
											null,
											8,
											["modelValue"]
										),
									]),
									n("div", Ht, [
										o(
											e(B),
											{
												type: "autocomplete",
												options: e(r),
												size: "sm",
												variant: "subtle",
												placeholder: "Appointment Type",
												disabled: !1,
												modelValue: e(w),
												"onUpdate:modelValue":
													t[6] ||
													(t[6] = a =>
														G(w) ? (w.value = a) : (w = a)),
											},
											null,
											8,
											["options", "modelValue"]
										),
									]),
									n("div", Wt, [
										o(
											e(B),
											{
												type: "select",
												options: [
													{
														label: "Appointment Time",
														value: "Appointment Time",
													},
													{
														label: "Checkin Time",
														value: "Checkin Time",
													},
												],
												size: "sm",
												variant: "subtle",
												placeholder: "Sort By",
												disabled: !1,
												modelValue: e(f),
												"onUpdate:modelValue":
													t[7] ||
													(t[7] = a =>
														G(f) ? (f.value = a) : (f = a)),
											},
											null,
											8,
											["modelValue"]
										),
									]),
									n("div", Jt, [
										o(
											e(J),
											{
												ref_for: !0,
												theme: "gray",
												size: "md",
												label: "Clear Filters",
												disabled: !1,
												onClick: t[8] || (t[8] = a => qe()),
											},
											{
												default: c(() => [
													n("div", Qt, [
														o(
															e(L),
															{
																text: "Clear Filter",
																placement: "top",
															},
															{
																default: c(() => [
																	Y(
																		i.$slots,
																		"icon",
																		{},
																		() => [
																			o(u, {
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
								n("div", Yt, [
									o(
										e(gt),
										{
											modelValue: p.value,
											"onUpdate:modelValue":
												t[10] || (t[10] = a => (p.value = a)),
											tabs: e(ue),
										},
										{
											default: c(({ tab: a }) => [
												o(
													e(ct),
													{
														class: "h-[77vh]",
														columns: k.value,
														rows: e(ue).appointments,
														options: {
															selectable: !1,
															showTooltip: !0,
															resizeColumn: !0,
															emptyState: {
																title: "No Appointments",
																description:
																	"No Appointments available",
															},
															rowHeight: 110,
														},
														"row-key": "name",
													},
													{
														default: c(() => [
															o(e(mt), null, {
																default: c(() => [
																	(y(!0),
																	$(
																		le,
																		null,
																		ve(
																			k.value,
																			l => (
																				y(),
																				q(
																					e(
																						_t
																					),
																					{
																						key: l.key,
																						item: l,
																					},
																					{
																						prefix: c(
																							() => [
																								l.icon
																									? (y(),
																									  q(
																											u,
																											{
																												key: 0,
																												name: l.icon,
																												class: "h-4 w-4",
																											},
																											null,
																											8,
																											[
																												"name",
																											]
																									  ))
																									: E(
																											"",
																											!0
																									  ),
																							]
																						),
																						_: 2,
																					},
																					1032,
																					[
																						"item",
																					]
																				)
																			)
																		),
																		128
																	)),
																]),
																_: 1,
															}),
															o(
																e(vt),
																null,
																{
																	default: c(() => [
																		a.appointments &&
																		a.appointments
																			.length
																			? (y(!0),
																			  $(
																					le,
																					{
																						key: 0,
																					},
																					ve(
																						a.appointments,
																						l => (
																							y(),
																							q(
																								e(
																									yt
																								),
																								{
																									key: l.name,
																									row: l,
																								},
																								{
																									default:
																										c(
																											({
																												idx: X,
																												column: N,
																												item: He,
																											}) => [
																												o(
																													e(
																														ft
																													),
																													{
																														item: He,
																														align: N.align,
																													},
																													{
																														prefix: c(
																															() => [
																																N.key ===
																																"patient_name"
																																	? (y(),
																																	  $(
																																			"div",
																																			Zt,
																																			[
																																				l.image
																																					? (y(),
																																					  q(
																																							e(
																																								ht
																																							),
																																							{
																																								key: 0,
																																								class: "flex items-center",
																																								image: l.image,
																																								label: l.patient_name,
																																								size: "sm",
																																							},
																																							null,
																																							8,
																																							[
																																								"image",
																																								"label",
																																							]
																																					  ))
																																					: (y(),
																																					  $(
																																							"div",
																																							Xt,
																																							[
																																								o(
																																									u,
																																									{
																																										name: "user",
																																										class: "h-5 w-5",
																																									}
																																								),
																																							]
																																					  )),
																																			]
																																	  ))
																																	: E(
																																			"",
																																			!0
																																	  ),
																															]
																														),
																														default:
																															c(
																																({
																																	label: ll,
																																}) => [
																																	N.key ===
																																	"patient_name"
																																		? (y(),
																																		  $(
																																				"div",
																																				ea,
																																				[
																																					o(
																																						e(
																																							J
																																						),
																																						{
																																							class: "text-sm text-left",
																																							ref_for:
																																								!0,
																																							size: "md",
																																							onClick:
																																								ne =>
																																									Ue(
																																										l
																																									),
																																						},
																																						{
																																							default:
																																								c(
																																									() => [
																																										ie(
																																											R(
																																												l.patient_name
																																											),
																																											1
																																										),
																																									]
																																								),
																																							_: 2,
																																						},
																																						1032,
																																						[
																																							"onClick",
																																						]
																																					),
																																				]
																																		  ))
																																		: E(
																																				"",
																																				!0
																																		  ),
																																	N.key ===
																																	"patient_token_number"
																																		? (y(),
																																		  $(
																																				"div",
																																				ta,
																																				[
																																					n(
																																						"div",
																																						aa,
																																						[
																																							n(
																																								"div",
																																								la,
																																								R(
																																									l.token
																																								),
																																								1
																																							),
																																							l.token_status ==
																																							"Expired"
																																								? (y(),
																																								  $(
																																										"div",
																																										na,
																																										" (" +
																																											R(
																																												l.token_status
																																											) +
																																											") ",
																																										1
																																								  ))
																																								: E(
																																										"",
																																										!0
																																								  ),
																																						]
																																					),
																																				]
																																		  ))
																																		: E(
																																				"",
																																				!0
																																		  ),
																																	N.key ===
																																	"appointment_time"
																																		? (y(),
																																		  $(
																																				"div",
																																				sa,
																																				[
																																					n(
																																						"div",
																																						oa,
																																						R(
																																							l.appointment_time
																																						),
																																						1
																																					),
																																				]
																																		  ))
																																		: E(
																																				"",
																																				!0
																																		  ),
																																	N.key ==
																																	"appointment_time_"
																																		? (y(),
																																		  $(
																																				"div",
																																				ia,
																																				[
																																					n(
																																						"div",
																																						ra,
																																						[
																																							n(
																																								"div",
																																								ua,
																																								[
																																									o(
																																										u,
																																										{
																																											name: "clock",
																																											class: "h-4 w-4",
																																										}
																																									),
																																								]
																																							),
																																							o(
																																								e(
																																									L
																																								),
																																								{
																																									text:
																																										"Appointment Time: " +
																																										l.appointment_time,
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													da,
																																													R(
																																														l.appointment_time
																																													),
																																													1
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"text",
																																								]
																																							),
																																						]
																																					),
																																					l.checkin_time
																																						? (y(),
																																						  $(
																																								"div",
																																								pa,
																																								[
																																									n(
																																										"div",
																																										ca,
																																										[
																																											o(
																																												u,
																																												{
																																													name: "log-in",
																																													class: "h-4 w-4",
																																												}
																																											),
																																										]
																																									),
																																									o(
																																										e(
																																											L
																																										),
																																										{
																																											text:
																																												"Checkin Time: " +
																																												l.checkin_time,
																																											placement:
																																												"top",
																																										},
																																										{
																																											default:
																																												c(
																																													() => [
																																														n(
																																															"div",
																																															ma,
																																															R(
																																																l.checkin_time
																																															),
																																															1
																																														),
																																													]
																																												),
																																											_: 2,
																																										},
																																										1032,
																																										[
																																											"text",
																																										]
																																									),
																																								]
																																						  ))
																																						: E(
																																								"",
																																								!0
																																						  ),
																																				]
																																		  ))
																																		: E(
																																				"",
																																				!0
																																		  ),
																																	N.key ===
																																	"appointment_details"
																																		? (y(),
																																		  $(
																																				"div",
																																				_a,
																																				[
																																					n(
																																						"div",
																																						va,
																																						[
																																							n(
																																								"div",
																																								fa,
																																								[
																																									o(
																																										u,
																																										{
																																											name: "type",
																																											class: "h-3 w-3",
																																										}
																																									),
																																								]
																																							),
																																							o(
																																								e(
																																									L
																																								),
																																								{
																																									text:
																																										"Appointment Type: " +
																																										l.appointment_type,
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													ha,
																																													R(
																																														l.appointment_type
																																													),
																																													1
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"text",
																																								]
																																							),
																																						]
																																					),
																																					n(
																																						"div",
																																						xa,
																																						[
																																							n(
																																								"div",
																																								ya,
																																								[
																																									o(
																																										u,
																																										{
																																											name: "file-text",
																																											class: "h-3 w-3",
																																										}
																																									),
																																								]
																																							),
																																							o(
																																								e(
																																									L
																																								),
																																								{
																																									text:
																																										"Appointment ID: " +
																																										l.name,
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													ba,
																																													R(
																																														l.name
																																													),
																																													1
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"text",
																																								]
																																							),
																																						]
																																					),
																																					n(
																																						"div",
																																						ga,
																																						[
																																							n(
																																								"div",
																																								ka,
																																								[
																																									o(
																																										u,
																																										{
																																											name: "user-plus",
																																											class: "h-3 w-3",
																																										}
																																									),
																																								]
																																							),
																																							o(
																																								e(
																																									L
																																								),
																																								{
																																									text:
																																										"Practitioner: " +
																																										l.practitioner +
																																										" - " +
																																										l.practitioner_name,
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													Va,
																																													R(
																																														l.practitioner_name
																																													),
																																													1
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"text",
																																								]
																																							),
																																						]
																																					),
																																				]
																																		  ))
																																		: E(
																																				"",
																																				!0
																																		  ),
																																	N.key ===
																																	"patient_details"
																																		? (y(),
																																		  $(
																																				"div",
																																				Ca,
																																				[
																																					n(
																																						"div",
																																						Ta,
																																						[
																																							n(
																																								"div",
																																								$a,
																																								[
																																									o(
																																										u,
																																										{
																																											name: "hash",
																																											class: "h-3 w-3",
																																										}
																																									),
																																								]
																																							),
																																							o(
																																								e(
																																									L
																																								),
																																								{
																																									text:
																																										"Patient ID: " +
																																										l.patient,
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													Ea,
																																													R(
																																														l.patient
																																													),
																																													1
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"text",
																																								]
																																							),
																																						]
																																					),
																																					n(
																																						"div",
																																						Ra,
																																						[
																																							n(
																																								"div",
																																								Sa,
																																								[
																																									o(
																																										u,
																																										{
																																											name: "phone",
																																											class: "h-3 w-3",
																																										}
																																									),
																																								]
																																							),
																																							o(
																																								e(
																																									L
																																								),
																																								{
																																									text:
																																										"Contact: " +
																																										l.phone,
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													Oa,
																																													R(
																																														l.phone
																																													),
																																													1
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"text",
																																								]
																																							),
																																						]
																																					),
																																					n(
																																						"div",
																																						Pa,
																																						[
																																							n(
																																								"div",
																																								Aa,
																																								[
																																									o(
																																										u,
																																										{
																																											name: "fast-forward",
																																											class: "h-3 w-3",
																																										}
																																									),
																																								]
																																							),
																																							o(
																																								e(
																																									L
																																								),
																																								{
																																									text:
																																										"Age: " +
																																										l.age,
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													wa,
																																													" Age: " +
																																														R(
																																															l.age
																																														),
																																													1
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"text",
																																								]
																																							),
																																						]
																																					),
																																					n(
																																						"div",
																																						Ga,
																																						[
																																							n(
																																								"div",
																																								Fa,
																																								[
																																									o(
																																										u,
																																										{
																																											name: "calendar",
																																											class: "h-3 w-3",
																																										}
																																									),
																																								]
																																							),
																																							o(
																																								e(
																																									L
																																								),
																																								{
																																									text:
																																										"Last Visit Date: " +
																																										(l.last_visit
																																											? l.last_visit
																																											: ""),
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													za,
																																													" Last Visit: " +
																																														R(
																																															l.last_visit
																																														),
																																													1
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"text",
																																								]
																																							),
																																						]
																																					),
																																				]
																																		  ))
																																		: E(
																																				"",
																																				!0
																																		  ),
																																	N.key ===
																																	"actions"
																																		? (y(),
																																		  $(
																																				"div",
																																				La,
																																				[
																																					n(
																																						"div",
																																						Ua,
																																						[
																																							o(
																																								e(
																																									J
																																								),
																																								{
																																									variant:
																																										"outline",
																																									ref_for:
																																										!0,
																																									theme: "gray",
																																									size: "sm",
																																									label: "Call Token",
																																									disabled:
																																										!l.can_call ||
																																										l.token_status ==
																																											"Expired",
																																									onClick:
																																										ne =>
																																											Be(
																																												l.token,
																																												l.token_su,
																																												l.name
																																											),
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													Na,
																																													[
																																														o(
																																															e(
																																																L
																																															),
																																															{
																																																text: "Call Token Number",
																																																placement:
																																																	"top",
																																															},
																																															{
																																																default:
																																																	c(
																																																		() => [
																																																			Y(
																																																				i.$slots,
																																																				"icon",
																																																				{},
																																																				() => [
																																																					o(
																																																						u,
																																																						{
																																																							name: "phone",
																																																							class: "size-4 text-ink-gray-7",
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
																																													]
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"disabled",
																																									"onClick",
																																								]
																																							),
																																							o(
																																								e(
																																									J
																																								),
																																								{
																																									variant:
																																										"outline",
																																									ref_for:
																																										!0,
																																									theme: "gray",
																																									size: "sm",
																																									label: "Go to Encounter",
																																									onClick:
																																										ne =>
																																											ze(
																																												l
																																											),
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													Ba,
																																													[
																																														o(
																																															e(
																																																L
																																															),
																																															{
																																																text: "Go to Encounter",
																																																placement:
																																																	"top",
																																															},
																																															{
																																																default:
																																																	c(
																																																		() => [
																																																			Y(
																																																				i.$slots,
																																																				"icon",
																																																				{},
																																																				() => [
																																																					o(
																																																						u,
																																																						{
																																																							name: "plus-square",
																																																							class: "size-4 text-ink-gray-7",
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
																																													]
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"onClick",
																																								]
																																							),
																																							o(
																																								e(
																																									J
																																								),
																																								{
																																									variant:
																																										"outline",
																																									ref_for:
																																										!0,
																																									theme: "gray",
																																									size: "sm",
																																									label: "Go to Therapy Session",
																																									disabled:
																																										!l.is_physio_appointment &&
																																										!l.is_physio_pract,
																																									onClick:
																																										ne =>
																																											Me(
																																												l.name
																																											),
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												n(
																																													"div",
																																													Da,
																																													[
																																														o(
																																															e(
																																																L
																																															),
																																															{
																																																text: "Go to Therapy Session",
																																																placement:
																																																	"top",
																																															},
																																															{
																																																default:
																																																	c(
																																																		() => [
																																																			Y(
																																																				i.$slots,
																																																				"icon",
																																																				{},
																																																				() => [
																																																					o(
																																																						u,
																																																						{
																																																							name: "file-plus",
																																																							class: "size-4 text-ink-gray-7",
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
																																													]
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"disabled",
																																									"onClick",
																																								]
																																							),
																																						]
																																					),
																																				]
																																		  ))
																																		: E(
																																				"",
																																				!0
																																		  ),
																																	N.key ===
																																	"status"
																																		? (y(),
																																		  $(
																																				"div",
																																				Ia,
																																				[
																																					n(
																																						"div",
																																						Ma,
																																						[
																																							o(
																																								e(
																																									J
																																								),
																																								{
																																									variant:
																																										"outline",
																																									size: "sm",
																																									label: l.status,
																																									class: xt(
																																										l.statusClass
																																									),
																																									onClick:
																																										ne =>
																																											i.statusopened(
																																												l
																																											),
																																								},
																																								{
																																									default:
																																										c(
																																											() => [
																																												ie(
																																													R(
																																														l.status
																																													),
																																													1
																																												),
																																											]
																																										),
																																									_: 2,
																																								},
																																								1032,
																																								[
																																									"label",
																																									"class",
																																									"onClick",
																																								]
																																							),
																																						]
																																					),
																																					l.token_su_name
																																						? (y(),
																																						  $(
																																								"div",
																																								ja,
																																								R(
																																									l.token_su_name
																																								),
																																								1
																																						  ))
																																						: E(
																																								"",
																																								!0
																																						  ),
																																				]
																																		  ))
																																		: E(
																																				"",
																																				!0
																																		  ),
																																	N.key ===
																																	"service"
																																		? (y(),
																																		  $(
																																				"div",
																																				Ka,
																																				[
																																					n(
																																						"div",
																																						qa,
																																						R(
																																							l.app_service_unit_name
																																						),
																																						1
																																					),
																																				]
																																		  ))
																																		: E(
																																				"",
																																				!0
																																		  ),
																																]
																															),
																														_: 2,
																													},
																													1032,
																													[
																														"item",
																														"align",
																													]
																												),
																											]
																										),
																									_: 2,
																								},
																								1032,
																								[
																									"row",
																								]
																							)
																						)
																					),
																					128
																			  ))
																			: E("", !0),
																	]),
																	_: 2,
																},
																1024
															),
														]),
														_: 2,
													},
													1032,
													["columns", "rows"]
												),
												o(
													e(zt),
													{
														class: "border-t px-3 py-2 sm:px-5",
														modelValue: S.value,
														"onUpdate:modelValue":
															t[9] ||
															(t[9] = l => (S.value = l)),
														options: {
															rowCount: a.appointments
																? a.appointments.length
																: 0,
															totalCount: a.appointments
																? a.appointments.length
																: 0,
														},
													},
													null,
													8,
													["modelValue", "options"]
												),
											]),
											_: 3,
										},
										8,
										["modelValue", "tabs"]
									),
								]),
								o(
									e(_e),
									{
										options: {
											title: e(m),
											message: e(b),
											size: "xl",
											icon: {
												name: "alert-triangle",
												appearance: "warning",
											},
											actions: [
												{ label: "OK", variant: "solid" },
											],
										},
										modelValue: g.value,
										"onUpdate:modelValue":
											t[11] || (t[11] = a => (g.value = a)),
									},
									null,
									8,
									["options", "modelValue"]
								),
								o(
									e(_e),
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
													onClick: () => Ke(),
												},
												{
													label: "Cancel",
													onClick: () =>
														G(_)
															? (_.value = !1)
															: (_ = !1),
												},
											],
										},
										modelValue: e(_),
										"onUpdate:modelValue":
											t[12] ||
											(t[12] = a =>
												G(_) ? (_.value = a) : (_ = a)),
									},
									null,
									8,
									["options", "modelValue"]
								),
							]),
							o(
								e(_e),
								{
									modelValue: e(D),
									"onUpdate:modelValue":
										t[19] ||
										(t[19] = a => (G(D) ? (D.value = a) : (D = a))),
									options: { size: "xl" },
								},
								{
									"body-title": c(
										() =>
											t[20] ||
											(t[20] = [
												n(
													"h3",
													{ class: "font-bold" },
													"Select Encounter Type",
													-1
												),
											])
									),
									"body-content": c(() => [
										n("div", Ha, [
											n("div", Wa, [
												n("div", Ja, [
													o(
														e(B),
														{
															type: "text",
															label: "Patient",
															modelValue: e(I),
															"onUpdate:modelValue":
																t[13] ||
																(t[13] = a =>
																	G(I)
																		? (I.value = a)
																		: (I = a)),
															size: "sm",
															variant: "subtle",
															disabled: !0,
														},
														null,
														8,
														["modelValue"]
													),
												]),
												n("div", Qa, [
													o(
														e(B),
														{
															type: "text",
															label: "Patient ID",
															modelValue: e(j),
															"onUpdate:modelValue":
																t[14] ||
																(t[14] = a =>
																	G(j)
																		? (j.value = a)
																		: (j = a)),
															size: "sm",
															variant: "subtle",
															disabled: !0,
														},
														null,
														8,
														["modelValue"]
													),
												]),
												n("div", Ya, [
													o(
														e(B),
														{
															type: "text",
															label: "Patient Appointment",
															modelValue: e(H),
															"onUpdate:modelValue":
																t[15] ||
																(t[15] = a =>
																	G(H)
																		? (H.value = a)
																		: (H = a)),
															size: "sm",
															variant: "subtle",
															disabled: !0,
														},
														null,
														8,
														["modelValue"]
													),
												]),
												n("div", Za, [
													o(
														e(B),
														{
															type: "text",
															label: "Practitioner",
															modelValue: e(ae),
															"onUpdate:modelValue":
																t[16] ||
																(t[16] = a =>
																	G(ae)
																		? (ae.value = a)
																		: (ae = a)),
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
											n("div", Xa, [
												n("div", el, [
													o(
														e(B),
														{
															type: "select",
															options: e(he),
															label: "Encounter Type",
															modelValue: e(M),
															"onUpdate:modelValue":
																t[17] ||
																(t[17] = a =>
																	G(M)
																		? (M.value = a)
																		: (M = a)),
															size: "sm",
															variant: "subtle",
															required: !0,
														},
														null,
														8,
														["options", "modelValue"]
													),
													e(Z).enc_type
														? (y(),
														  q(
																e($e),
																{
																	key: 0,
																	message:
																		e(Z).enc_type,
																},
																null,
																8,
																["message"]
														  ))
														: E("", !0),
												]),
											]),
										]),
										n("div", null, [
											e(Z).enc_error
												? (y(),
												  q(
														e($e),
														{
															key: 0,
															message: e(Z).enc_error,
														},
														null,
														8,
														["message"]
												  ))
												: E("", !0),
										]),
									]),
									actions: c(() => [
										o(
											e(J),
											{
												variant: "solid",
												onClick:
													t[18] || (t[18] = a => e(Le)()),
											},
											{
												default: c(
													() =>
														t[21] ||
														(t[21] = [
															ie("Create Encounter"),
														])
												),
												_: 1,
												__: [21],
											}
										),
									]),
									_: 1,
								},
								8,
								["modelValue"]
							),
						],
						64
					)
				);
			};
		},
	},
	dl = Ae(tl, [["__scopeId", "data-v-68bda1b4"]]);
export { dl as default };
//# sourceMappingURL=practitioner_screen-633ae1ac.js.map
