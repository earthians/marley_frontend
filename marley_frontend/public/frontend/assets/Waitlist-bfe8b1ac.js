import {
	O as ae,
	k as i,
	b as x,
	d as t,
	r as o,
	C as O,
	D as A,
	n as V,
	h as U,
	j as w,
	t as C,
	P as ge,
	Q as xe,
	e as a,
	g as r,
	w as Ue,
	A as Ce,
	L as ze,
	T as Be,
	_ as oe,
	c as Z,
	N as Oe,
	F as E,
	x as q,
	f as l,
	R as Ie,
	S as Le,
	U as De,
	V as $e,
	W as Pe,
	J as G,
	X as Fe,
	Y as Ne,
	i as j,
	u as je,
	H as Ee,
	B as Re,
	Z as $,
	$ as He,
	a0 as le,
	a1 as D,
	a2 as R,
	s as be,
	a3 as Ze,
	a4 as qe,
	a5 as Ge,
	a6 as We,
	a7 as Je,
	E as ye,
	m as L,
	l as ne,
	a8 as Ke,
	y as F,
} from "./index-8ff34837.js";
import { _ as we } from "./BrandLogo-c420a0fa.js";
import { D as Ye } from "./Dropdown-007bc2e8.js";
import { _ as Qe } from "./DatePicker.vue_vue_type_script_setup_true_lang-9ccf8b49.js";
import { _ as Xe } from "./Tabs-aec610b8.js";
import "./use-resolve-button-type-f09d071e.js";
const et = {
	class: "lucide lucide-layout-dashboard",
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "1.5",
	"stroke-linecap": "round",
	"stroke-linejoin": "round",
};
function tt(n, _) {
	return (
		i(),
		x(
			"svg",
			et,
			_[0] ||
				(_[0] = [
					t(
						"rect",
						{ width: "7", height: "9", x: "3", y: "3", rx: "1" },
						null,
						-1
					),
					t(
						"rect",
						{ width: "7", height: "5", x: "14", y: "3", rx: "1" },
						null,
						-1
					),
					t(
						"rect",
						{ width: "7", height: "9", x: "14", y: "12", rx: "1" },
						null,
						-1
					),
					t(
						"rect",
						{ width: "7", height: "5", x: "3", y: "16", rx: "1" },
						null,
						-1
					),
				])
		)
	);
}
const at = ae({ name: "lucide-layout-dashboard", render: tt }),
	lt = { inheritAttrs: !1 },
	nt = Object.assign(lt, {
		__name: "Section",
		props: {
			label: { type: String, default: "" },
			hideLabel: { type: Boolean, default: !1 },
			opened: { type: Boolean, default: !0 },
			collapsible: { type: Boolean, default: !0 },
			collapseIconPosition: { type: String, default: "left" },
			labelClass: { type: [String, Object, Array], default: "" },
			headerClass: { type: [String, Object, Array], default: "" },
		},
		setup(n) {
			const _ = n,
				b = o(_.hideLabel),
				v = o(_.opened);
			function c() {
				v.value = !v.value;
			}
			function h() {
				v.value = !0;
			}
			function f() {
				v.value = !1;
			}
			return (g, e) => {
				const y = O("FeatherIcon");
				return (
					i(),
					x("div", null, [
						A(
							g.$slots,
							"header",
							ge(
								xe({
									opened: v.value,
									hide: b.value,
									open: h,
									close: f,
									toggle: c,
								})
							),
							() => [
								b.value
									? w("", !0)
									: (i(),
									  x(
											"div",
											{
												key: 0,
												class: V([
													"section-header flex items-center justify-between",
													n.headerClass,
												]),
											},
											[
												t(
													"div",
													{
														class: V([
															"flex text-ink-gray-9 max-w-fit cursor-pointer items-center gap-2 text-base",
															n.labelClass,
														]),
														onClick:
															e[0] ||
															(e[0] = k =>
																n.collapsible && c()),
													},
													[
														n.collapsible &&
														n.collapseIconPosition ===
															"left"
															? (i(),
															  U(
																	y,
																	{
																		key: 0,
																		name: "chevron-right",
																		class: V([
																			"h-4 transition-all duration-300 ease-in-out",
																			{
																				"rotate-90":
																					v.value,
																			},
																		]),
																	},
																	null,
																	8,
																	["class"]
															  ))
															: w("", !0),
														t(
															"span",
															null,
															C(
																g.__(n.label) ||
																	g.__("Untitled")
															),
															1
														),
														n.collapsible &&
														n.collapseIconPosition ===
															"right"
															? (i(),
															  U(
																	y,
																	{
																		key: 1,
																		name: "chevron-right",
																		class: V([
																			"h-4 transition-all duration-300 ease-in-out",
																			{
																				"rotate-90":
																					v.value,
																			},
																		]),
																	},
																	null,
																	8,
																	["class"]
															  ))
															: w("", !0),
													],
													2
												),
												A(g.$slots, "actions"),
											],
											2
									  )),
							]
						),
						a(
							Be,
							{
								"enter-active-class": "duration-300 ease-in",
								"leave-active-class":
									"duration-300 ease-[cubic-bezier(0, 1, 0.5, 1)]",
								"enter-to-class": "max-h-[200px] overflow-hidden",
								"leave-from-class": "max-h-[200px] overflow-hidden",
								"enter-from-class": "max-h-0 overflow-hidden",
								"leave-to-class": "max-h-0 overflow-hidden",
							},
							{
								default: r(() => [
									Ue(
										t(
											"div",
											Ce({ class: "columns" }, g.$attrs),
											[
												A(
													g.$slots,
													"default",
													ge(
														xe({
															opened: v.value,
															open: h,
															close: f,
															toggle: c,
														})
													)
												),
											],
											16
										),
										[[ze, v.value]]
									),
								]),
								_: 3,
							}
						),
					])
				);
			};
		},
	}),
	st = {},
	ot = {
		fill: "none",
		height: "16",
		viewBox: "0 0 16 16",
		width: "16",
		xmlns: "http://www.w3.org/2000/svg",
	};
function it(n, _) {
	return (
		i(),
		x(
			"svg",
			ot,
			_[0] ||
				(_[0] = [
					t(
						"path",
						{
							class: "",
							"clip-rule": "evenodd",
							d: "M13.8496 4.69692L12.0062 6.54029C11.8109 6.73555 11.4944 6.73555 11.2991 6.54028L9.45572 4.69692C9.26046 4.50166 9.26046 4.18508 9.45572 3.98981L11.2991 2.14645C11.4944 1.95118 11.8109 1.95118 12.0062 2.14645L13.8496 3.98981C14.0448 4.18507 14.0448 4.50166 13.8496 4.69692ZM14.5567 3.28271C15.1425 3.86849 15.1425 4.81824 14.5567 5.40403L12.7133 7.24739C12.1275 7.83318 11.1778 7.83318 10.592 7.24739L8.74862 5.40402C8.16283 4.81824 8.16283 3.86849 8.74862 3.28271L10.592 1.43934C11.1778 0.853553 12.1275 0.853554 12.7133 1.43934L14.5567 3.28271ZM5.60691 4.34338C5.60691 5.3394 4.79948 6.14683 3.80346 6.14683C2.80743 6.14683 2 5.3394 2 4.34338C2 3.34736 2.80743 2.53992 3.80346 2.53992C4.79948 2.53992 5.60691 3.34736 5.60691 4.34338ZM6.60691 4.34338C6.60691 5.89168 5.35176 7.14683 3.80346 7.14683C2.25515 7.14683 1 5.89168 1 4.34338C1 2.79507 2.25515 1.53992 3.80346 1.53992C5.35176 1.53992 6.60691 2.79507 6.60691 4.34338ZM12.9565 10.3897H10.3495C10.0734 10.3897 9.84954 10.6136 9.84954 10.8897V13.4966C9.84954 13.7728 10.0734 13.9966 10.3495 13.9966H12.9565C13.2326 13.9966 13.4565 13.7728 13.4565 13.4966V10.8897C13.4565 10.6136 13.2326 10.3897 12.9565 10.3897ZM10.3495 9.38971C9.52112 9.38971 8.84954 10.0613 8.84954 10.8897V13.4966C8.84954 14.325 9.52111 14.9966 10.3495 14.9966H12.9565C13.7849 14.9966 14.4565 14.325 14.4565 13.4966V10.8897C14.4565 10.0613 13.7849 9.38971 12.9565 9.38971H10.3495ZM2.5 10.3897H5.10691C5.38305 10.3897 5.60691 10.6136 5.60691 10.8897V13.4966C5.60691 13.7728 5.38306 13.9966 5.10691 13.9966H2.5C2.22386 13.9966 2 13.7728 2 13.4966V10.8897C2 10.6136 2.22386 10.3897 2.5 10.3897ZM1 10.8897C1 10.0613 1.67157 9.38971 2.5 9.38971H5.10691C5.93534 9.38971 6.60691 10.0613 6.60691 10.8897V13.4966C6.60691 14.325 5.93534 14.9966 5.10691 14.9966H2.5C1.67157 14.9966 1 14.325 1 13.4966V10.8897Z",
							fill: "currentColor",
							"fill-rule": "evenodd",
						},
						null,
						-1
					),
				])
		)
	);
}
const rt = oe(st, [["render", it]]),
	dt = ["onClick"],
	ut = { class: "flex gap-2" },
	ct = { class: "whitespace-nowrap" },
	pt = {
		class: "flex w-fit mx-2 min-w-32 max-w-48 flex-col rounded-lg border border-outline-gray-2 bg-surface-white p-1.5 text-sm text-ink-gray-8 shadow-xl auto-fill-[100px]",
	},
	mt = ["href"],
	_t = ["src"],
	vt = { class: "max-w-18 w-full truncate" },
	ft = {
		__name: "Apps",
		props: { active: Boolean },
		setup(n) {
			const _ = Z({
				url: "frappe.apps.get_apps",
				cache: "apps",
				auto: !0,
				transform: b => {
					let v = [
						{
							name: "frappe",
							logo: "/assets/frappe/images/framework.png",
							title: __("Desk"),
							route: "/app",
						},
					];
					return (
						b.map(c => {
							c.name !== "healthcare" &&
								v.push({
									name: c.name,
									logo: c.logo,
									title: __(c.title),
									route: c.route,
								});
						}),
						v
					);
				},
			});
			return (b, v) => {
				const c = O("FeatherIcon");
				return (
					i(),
					U(
						l(Ie),
						{
							placement: "right-start",
							trigger: "hover",
							hoverDelay: 0.1,
							leaveDelay: 0.1,
						},
						{
							target: r(({ togglePopover: h }) => [
								t(
									"button",
									{
										class: V([
											n.active
												? "bg-surface-gray-3"
												: "text-ink-gray-6",
											"group w-full flex h-7 items-center justify-between rounded px-2 text-base hover:bg-surface-gray-2",
										]),
										onClick: Oe(f => h(), ["prevent"]),
									},
									[
										t("div", ut, [
											a(rt, { class: "size-4" }),
											t("span", ct, C(b.__("Apps")), 1),
										]),
										a(c, {
											name: "chevron-right",
											class: "size-4 text-ink-gray-5",
										}),
									],
									10,
									dt
								),
							]),
							body: r(() => [
								t("div", pt, [
									(i(!0),
									x(
										E,
										null,
										q(
											l(_).data,
											h => (
												i(),
												x(
													"a",
													{
														href: h.route,
														key: "name",
														class: "flex items-center gap-2 rounded p-1.5 hover:bg-surface-gray-2",
													},
													[
														t(
															"img",
															{
																class: "size-6",
																src: h.logo,
															},
															null,
															8,
															_t
														),
														t("span", vt, C(h.title), 1),
													],
													8,
													mt
												)
											)
										),
										128
									)),
								]),
							]),
							_: 1,
						}
					)
				);
			};
		},
	},
	H = o({}),
	Q = Le({}),
	ht = De({
		doctype: "FCRM Settings",
		name: "FCRM Settings",
		onSuccess: n => ((H.value = n), Ve().setupBrand(), n),
	});
function Ve() {
	function n() {
		var _, b, v;
		(Q.name = (_ = H.value) == null ? void 0 : _.brand_name),
			(Q.logo = (b = H.value) == null ? void 0 : b.brand_logo),
			(Q.favicon = (v = H.value) == null ? void 0 : v.favicon);
	}
	return { _settings: ht, settings: H, brand: Q, setupBrand: n };
}
o(!1);
o({});
o(!1);
o({});
const gt = o(!1);
o(!1);
const se = $e("theme", "light");
function xt() {
	const n = document.documentElement.getAttribute("data-theme");
	(se.value = n === "dark" ? "light" : "dark"),
		document.documentElement.setAttribute("data-theme", se.value);
}
const bt = { class: "text-base font-medium leading-none text-ink-gray-9 truncate" },
	yt = { class: "mt-1 text-sm leading-none text-ink-gray-7 truncate" },
	kt = {
		__name: "UserDropdown",
		props: { isCollapsed: { type: Boolean, default: !1 } },
		setup(n) {
			const { settings: _, brand: b } = Ve(),
				{ logout: v } = Pe(),
				c = G(() => Fe() || {}),
				h = G(() => {
					var k;
					if (!((k = _.value) != null && k.dropdown_items)) return [];
					let e = _.value.dropdown_items,
						y = [{ group: "Dropdown Items", hideLabel: !0, items: [] }];
					return (
						e.forEach(M => {
							M.hidden ||
								(M.type !== "Separator"
									? y[y.length - 1].items.push(f(M))
									: y.push({ group: "", hideLabel: !0, items: [] }));
						}),
						y
					);
				});
			function f(e) {
				let y = JSON.parse(JSON.stringify(e)),
					k = y.icon || "external-link";
				return (
					typeof k == "string" &&
						k.startsWith("<svg") &&
						(k = ae(Ne("div", { innerHTML: k }))),
					(y.icon = k),
					y.is_standard
						? g(y)
						: {
								icon: y.icon,
								label: __(y.label),
								onClick: () =>
									window.open(
										y.route,
										y.open_in_new_window ? "_blank" : ""
									),
						  }
				);
			}
			function g(e) {
				switch (e.name1) {
					case "app_selector":
						return { component: ae(ft) };
					case "toggle_theme":
						return {
							icon: se.value === "dark" ? "sun" : e.icon,
							label: __(e.label),
							onClick: xt,
						};
					case "about":
						return {
							icon: e.icon,
							label: __(e.label),
							onClick: () => (gt.value = !0),
						};
					case "logout":
						return {
							icon: e.icon,
							label: __(e.label),
							onClick: () => v.submit(),
						};
				}
			}
			return (e, y) => {
				const k = O("FeatherIcon");
				return (
					i(),
					U(
						l(Ye),
						Ce({ options: h.value }, e.$attrs),
						{
							default: r(({ open: M }) => [
								t(
									"button",
									{
										class: V([
											"flex h-12 items-center rounded-md py-2 duration-300 ease-in-out",
											n.isCollapsed
												? "w-auto px-0"
												: M
												? "w-52 bg-surface-white px-2 shadow-sm"
												: "w-52 px-2 hover:bg-surface-gray-3",
										]),
									},
									[
										a(
											we,
											{
												modelValue: l(b),
												"onUpdate:modelValue":
													y[0] ||
													(y[0] = P =>
														j(b) ? (b.value = P) : null),
												class: "h-8 max-w-16 flex-shrink-0",
											},
											null,
											8,
											["modelValue"]
										),
										t(
											"div",
											{
												class: V([
													"flex flex-1 flex-col text-left duration-300 ease-in-out truncate",
													n.isCollapsed
														? "ml-0 w-0 overflow-hidden opacity-0"
														: "ml-2 w-auto opacity-100",
												]),
											},
											[
												t(
													"div",
													bt,
													C(e.__(l(b).name || "CRM")),
													1
												),
												t("div", yt, C(c.value.full_name), 1),
											],
											2
										),
										t(
											"div",
											{
												class: V([
													"duration-300 ease-in-out",
													n.isCollapsed
														? "ml-0 w-0 overflow-hidden opacity-0"
														: "ml-2 w-auto opacity-100",
												]),
											},
											[
												a(k, {
													name: "chevron-down",
													class: "size-4 text-ink-gray-5",
													"aria-hidden": "true",
												}),
											],
											2
										),
									],
									2
								),
							]),
							_: 1,
						},
						16,
						["options"]
					)
				);
			};
		},
	},
	Ct = {},
	$t = {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
	};
function wt(n, _) {
	return (
		i(),
		x(
			"svg",
			$t,
			_[0] ||
				(_[0] = [
					t(
						"rect",
						{
							x: "2",
							y: "8",
							width: "12",
							height: "2",
							rx: "0.5",
							fill: "currentColor",
						},
						null,
						-1
					),
					t(
						"rect",
						{
							x: "2",
							y: "5",
							width: "1.5",
							height: "5",
							fill: "currentColor",
						},
						null,
						-1
					),
					t(
						"circle",
						{ cx: "6", cy: "6.5", r: "1", fill: "currentColor" },
						null,
						-1
					),
				])
		)
	);
}
const Vt = oe(Ct, [["render", wt]]),
	St = {},
	Mt = {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
	};
function Tt(n, _) {
	return (
		i(),
		x(
			"svg",
			Mt,
			_[0] ||
				(_[0] = [
					t(
						"path",
						{
							d: "M10.875 9.06223L3 9.06232",
							stroke: "currentColor",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
						},
						null,
						-1
					),
					t(
						"path",
						{
							d: "M6.74537 5.31699L3 9.06236L6.74527 12.8076",
							stroke: "currentColor",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
						},
						null,
						-1
					),
					t(
						"path",
						{
							d: "M14.1423 4L14.1423 14.125",
							stroke: "currentColor",
							"stroke-linecap": "round",
						},
						null,
						-1
					),
				])
		)
	);
}
const At = oe(St, [["render", Tt]]),
	Ut = { class: "flex items-center truncate" },
	zt = { class: "grid flex-shrink-0 place-items-center" },
	ke = {
		__name: "SidebarLink",
		props: {
			icon: { type: [Object, String, Function] },
			label: { type: String, default: "" },
			to: { type: [Object, String], default: "" },
			isCollapsed: { type: Boolean, default: !1 },
		},
		setup(n) {
			const _ = je(),
				b = Ee(),
				v = n;
			function c() {
				v.to &&
					(typeof v.to == "object" ? _.push(v.to) : _.push({ name: v.to }));
			}
			let h = G(() => {
				var f, g;
				return b.query.view
					? b.query.view ==
							((g = (f = v.to) == null ? void 0 : f.query) == null
								? void 0
								: g.view)
					: b.name === v.to;
			});
			return (f, g) => {
				const e = O("FeatherIcon");
				return (
					i(),
					x(
						"button",
						{
							class: V([
								"flex h-7 cursor-pointer items-center rounded text-ink-gray-7 duration-300 ease-in-out focus:outline-none focus:transition-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-outline-gray-3",
								l(h)
									? "bg-surface-selected shadow-sm"
									: "hover:bg-surface-gray-2",
							]),
							onClick: c,
						},
						[
							t(
								"div",
								{
									class: V([
										"flex w-full items-center justify-between duration-300 ease-in-out",
										n.isCollapsed ? "ml-[3px] p-1" : "px-2 py-1",
									]),
								},
								[
									t("div", Ut, [
										a(
											l($),
											{
												text: n.label,
												placement: "right",
												disabled: !n.isCollapsed,
											},
											{
												default: r(() => [
													A(f.$slots, "icon", {}, () => [
														t("span", zt, [
															typeof n.icon == "string"
																? (i(),
																  U(
																		e,
																		{
																			key: 0,
																			name: n.icon,
																			class: "size-4 text-ink-gray-7",
																		},
																		null,
																		8,
																		["name"]
																  ))
																: (i(),
																  U(Re(n.icon), {
																		key: 1,
																		class: "size-4 text-ink-gray-7",
																  })),
														]),
													]),
												]),
												_: 3,
											},
											8,
											["text", "disabled"]
										),
										a(
											l($),
											{
												text: n.label,
												placement: "right",
												disabled: n.isCollapsed,
												hoverDelay: 1.5,
											},
											{
												default: r(() => [
													t(
														"span",
														{
															class: V([
																"flex-1 flex-shrink-0 truncate text-sm duration-300 ease-in-out",
																n.isCollapsed
																	? "ml-0 w-0 overflow-hidden opacity-0"
																	: "ml-2 w-auto opacity-100",
															]),
														},
														C(n.label),
														3
													),
												]),
												_: 1,
											},
											8,
											["text", "disabled"]
										),
									]),
									A(f.$slots, "right"),
								],
								2
							),
						],
						2
					)
				);
			};
		},
	},
	Bt = { class: "flex-1 overflow-y-auto" },
	Ot = { key: 0, class: "mx-2 my-2 h-1 border-b" },
	It = ["onClick"],
	Lt = { class: "flex flex-col" },
	Dt = { class: "m-2 flex flex-col gap-1" },
	Pt = { class: "grid h-4 w-4 flex-shrink-0 place-items-center" },
	Ft = {
		__name: "AppSidebar",
		setup(n) {
			const _ = $e("isSidebarCollapsed", !1),
				b = G(() => [
					{
						name: "All Views",
						hideLabel: !0,
						opened: !0,
						views: [
							{ label: "Dashboard", icon: at, to: "Dashboard" },
							{ label: "Appointment Desk", icon: "user", to: "Waitlist" },
							{
								label: "Practitioner Screen",
								icon: "user",
								to: "practitioner_screen",
							},
							{ label: "Checkin", icon: "log-in", to: "Checkin" },
							{ label: "Bed Management", icon: Vt, to: "bed_management" },
						].filter(h => (h.condition ? h.condition() : !0)),
					},
				]);
			return (
				o(!1),
				(v, c) => (
					i(),
					x(
						"div",
						{
							class: V([
								"relative flex h-full flex-col justify-between transition-all duration-300 ease-in-out",
								l(_) ? "w-12" : "w-[220px]",
							]),
						},
						[
							t("div", null, [
								a(kt, { class: "p-2", isCollapsed: l(_) }, null, 8, [
									"isCollapsed",
								]),
							]),
							t("div", Bt, [
								(i(!0),
								x(
									E,
									null,
									q(b.value, h => {
										var f;
										return (
											i(),
											x("div", { key: h.label }, [
												!h.hideLabel &&
												l(_) &&
												(f = h.views) != null &&
												f.length
													? (i(), x("div", Ot))
													: w("", !0),
												a(
													nt,
													{
														label: h.name,
														hideLabel: h.hideLabel,
														opened: h.opened,
													},
													{
														header: r(
															({
																opened: g,
																hide: e,
																toggle: y,
															}) => [
																e
																	? w("", !0)
																	: (i(),
																	  x(
																			"div",
																			{
																				key: 0,
																				class: V(
																					[
																						"flex cursor-pointer gap-1.5 px-1 text-base font-medium text-ink-gray-5 transition-all duration-300 ease-in-out",
																						l(
																							_
																						)
																							? "ml-0 h-0 overflow-hidden opacity-0"
																							: "ml-2 mt-4 h-7 w-auto opacity-100",
																					]
																				),
																				onClick:
																					k =>
																						y(),
																			},
																			[
																				a(
																					l(
																						He
																					),
																					{
																						name: "chevron-right",
																						class: V(
																							[
																								"h-4 text-ink-gray-9 transition-all duration-300 ease-in-out",
																								{
																									"rotate-90":
																										g,
																								},
																							]
																						),
																					},
																					null,
																					8,
																					[
																						"class",
																					]
																				),
																				t(
																					"span",
																					null,
																					C(
																						v.__(
																							h.name
																						)
																					),
																					1
																				),
																			],
																			10,
																			It
																	  )),
															]
														),
														default: r(() => [
															t("nav", Lt, [
																(i(!0),
																x(
																	E,
																	null,
																	q(
																		h.views,
																		g => (
																			i(),
																			U(
																				ke,
																				{
																					icon: g.icon,
																					label: v.__(
																						g.label
																					),
																					to: g.to,
																					isCollapsed:
																						l(
																							_
																						),
																					class: "mx-2 my-0.5",
																				},
																				null,
																				8,
																				[
																					"icon",
																					"label",
																					"to",
																					"isCollapsed",
																				]
																			)
																		)
																	),
																	256
																)),
															]),
														]),
														_: 2,
													},
													1032,
													["label", "hideLabel", "opened"]
												),
											])
										);
									}),
									128
								)),
							]),
							t("div", Dt, [
								a(
									ke,
									{
										label: l(_) ? v.__("Expand") : v.__("Collapse"),
										isCollapsed: l(_),
										onClick:
											c[0] || (c[0] = h => (_.value = !l(_))),
										class: "",
									},
									{
										icon: r(() => [
											t("span", Pt, [
												a(
													At,
													{
														class: V([
															"h-4 w-4 text-ink-gray-7 duration-300 ease-in-out",
															{
																"[transform:rotateY(180deg)]":
																	l(_),
															},
														]),
													},
													null,
													8,
													["class"]
												),
											]),
										]),
										_: 1,
									},
									8,
									["label", "isCollapsed"]
								),
							]),
						],
						2
					)
				)
			);
		},
	},
	Nt = { class: "flex items-center px-4" },
	jt = {
		__name: "HeaderBar",
		setup(n) {
			return (_, b) => (i(), x("div", Nt, [a(we)]));
		},
	},
	Et = { class: "flex flex-1 space-x-4 p-4 bg-white" },
	Rt = { class: "w-1/5 py-2" },
	Ht = { class: "w-1/5 py-2" },
	Zt = ["src"],
	qt = { class: "w-1/5 py-2" },
	Gt = { class: "w-1/5 py-2" },
	Wt = { class: "w-1/5 py-2" },
	Jt = { class: "w-1/5 py-2" },
	Kt = ["src"],
	Yt = { class: "w-1/5 py-2" },
	Qt = { class: "w-1/5 py-2" },
	Xt = { class: "py-2" },
	ea = { class: "flex items-center truncate" },
	ta = {
		__name: "SearchFilters",
		props: le(
			{ searchOptions: Array },
			{
				search: {},
				searchModifiers: {},
				patient_search: {},
				patient_searchModifiers: {},
				mobile_search: {},
				mobile_searchModifiers: {},
				department: {},
				departmentModifiers: {},
				dateValue: {},
				dateValueModifiers: {},
				practitioner: {},
				practitionerModifiers: {},
				visitType: {},
				visitTypeModifiers: {},
				sort_by: {},
				sort_byModifiers: {},
			}
		),
		emits: le(
			[
				"update:search",
				"update:patient_search",
				"update:mobile_search",
				"update:department",
				"update:dateValue",
				"update:practitioner",
				"update:visitType",
				"update:sort_by",
			],
			[
				"update:search",
				"update:patient_search",
				"update:mobile_search",
				"update:department",
				"update:dateValue",
				"update:practitioner",
				"update:visitType",
				"update:sort_by",
			]
		),
		setup(n, { emit: _ }) {
			const b = D(n, "search"),
				v = D(n, "patient_search"),
				c = D(n, "mobile_search"),
				h = D(n, "department"),
				f = D(n, "dateValue"),
				g = D(n, "practitioner"),
				e = D(n, "visitType"),
				y = D(n, "sort_by");
			let k = o([]);
			const M = o([]),
				P = o([]),
				T = o([]);
			Z({
				url: "/api/method/marley_frontend.waitlist.get_patients",
				method: "GET",
				onSuccess(S) {
					k.value = S.patients;
				},
				onError(S) {
					error_dialog.value = !0;
				},
			}).fetch();
			const { fetch: W } = Z({
				url: "/api/method/marley_frontend.waitlist.get_masters",
				method: "GET",
				onSuccess(S) {
					(M.value = S.practitioners), (P.value = S.departments);
				},
				onError: S => {
					var p;
					(dialog_message = ((p = S.messages) == null ? void 0 : p[0]) || S),
						(dialog_title = "Fetching Masters Failed"),
						(error_dialog.value = !0);
				},
			});
			W(),
				Z({
					url: "/api/method/marley_frontend.waitlist.get_appointment_types",
					method: "GET",
					onSuccess(S) {
						T.value = S;
					},
				}).fetch();
			const z = _;
			function J() {
				(b.value = {}),
					(v.value = {}),
					(h.value = {}),
					(f.value = new Date().toISOString().split("T")[0]),
					(g.value = null),
					(e.value = {}),
					(y.value = "Appointment Time");
			}
			return (S, p) => {
				const K = O("FeatherIcon"),
					Y = O("Tooltip"),
					B = O("Button");
				return (
					i(),
					x("div", Et, [
						t("div", Rt, [
							a(
								l(R),
								{
									modelValue: b.value,
									"onUpdate:modelValue":
										p[0] || (p[0] = m => (b.value = m)),
									options: n.searchOptions,
									placeholder: "Appointment",
									size: "lg",
									variant: "subtle",
									"onUpdate:vModel":
										p[1] || (p[1] = m => z("update:search", m)),
								},
								null,
								8,
								["modelValue", "options"]
							),
						]),
						t("div", Ht, [
							a(
								l(R),
								{
									modelValue: v.value,
									"onUpdate:modelValue":
										p[2] || (p[2] = m => (v.value = m)),
									options: l(k),
									placeholder: "Patient",
									size: "lg",
									variant: "subtle",
									"onUpdate:vModel":
										p[3] ||
										(p[3] = m => z("update:patient_search", m)),
								},
								{
									prefix: r(() => p[17] || (p[17] = [])),
									"item-prefix": r(({ option: m }) => [
										t(
											"img",
											{
												src: m.image.toString(),
												class: "h-4 w-4 rounded-full",
											},
											null,
											8,
											Zt
										),
									]),
									_: 1,
								},
								8,
								["modelValue", "options"]
							),
						]),
						t("div", qt, [
							a(
								l(be),
								{
									type: "number",
									placeholder: "Mobile Number",
									size: "sm",
									variant: "subtle",
									modelValue: c.value,
									"onUpdate:modelValue":
										p[4] || (p[4] = m => (c.value = m)),
									"onUpdate:vModel":
										p[5] ||
										(p[5] = m => z("update:mobile_search", m)),
								},
								null,
								8,
								["modelValue"]
							),
						]),
						t("div", Gt, [
							a(
								l(R),
								{
									modelValue: h.value,
									"onUpdate:modelValue":
										p[6] || (p[6] = m => (h.value = m)),
									options: P.value,
									placeholder: "Department",
									size: "lg",
									variant: "subtle",
									"onUpdate:vModel":
										p[7] || (p[7] = m => z("update:department", m)),
								},
								null,
								8,
								["modelValue", "options"]
							),
						]),
						t("div", Wt, [
							a(
								l(Qe),
								{
									modelValue: f.value,
									"onUpdate:modelValue":
										p[8] || (p[8] = m => (f.value = m)),
									variant: "subtle",
									placeholder: "Date",
									disabled: !1,
									"onUpdate:vModel":
										p[9] || (p[9] = m => z("update:dateValue", m)),
								},
								null,
								8,
								["modelValue"]
							),
						]),
						t("div", Jt, [
							a(
								l(R),
								{
									options: M.value,
									modelValue: g.value,
									"onUpdate:modelValue":
										p[10] || (p[10] = m => (g.value = m)),
									placeholder: "Practitioners",
									multiple: !0,
									"onUpdate:vModel":
										p[11] ||
										(p[11] = m => z("update:practitioner", m)),
								},
								{
									prefix: r(() => p[18] || (p[18] = [])),
									"item-prefix": r(({ option: m }) => [
										t(
											"img",
											{
												src: m.image.toString(),
												class: "h-4 w-4 rounded-full",
											},
											null,
											8,
											Kt
										),
									]),
									_: 1,
								},
								8,
								["options", "modelValue"]
							),
						]),
						t("div", Yt, [
							a(
								l(R),
								{
									options: T.value,
									modelValue: e.value,
									"onUpdate:modelValue":
										p[12] || (p[12] = m => (e.value = m)),
									placeholder: "Visit type",
									size: "sm",
									"onUpdate:vModel":
										p[13] ||
										(p[13] = m => z("update:visitType", m)),
								},
								null,
								8,
								["options", "modelValue"]
							),
						]),
						t("div", Qt, [
							a(
								l(be),
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
									placeholder: "Sort By",
									modelValue: y.value,
									"onUpdate:modelValue":
										p[14] || (p[14] = m => (y.value = m)),
									"onUpdate:vModel":
										p[15] || (p[15] = m => z("update:sort_by", m)),
								},
								null,
								8,
								["modelValue"]
							),
						]),
						t("div", Xt, [
							a(
								B,
								{
									ref_for: !0,
									theme: "gray",
									size: "sm",
									label: "Clear Filters",
									disabled: !1,
									onClick: p[16] || (p[16] = m => J()),
								},
								{
									default: r(() => [
										t("div", ea, [
											a(
												Y,
												{
													text: "Clear Filter",
													placement: "top",
												},
												{
													default: r(() => [
														A(S.$slots, "icon", {}, () => [
															a(K, {
																name: "x",
																class: "size-4 text-ink-gray-7",
															}),
														]),
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
					])
				);
			};
		},
	},
	aa = { class: "bg-white p-4 rounded-lg relative w-full" },
	la = { key: 0 },
	na = { class: "flex-1 px-1 text-center flex space-x-1" },
	sa = { key: 1 },
	oa = { class: "flex-1 px-3 text-center flex space-x-1" },
	ia = { class: "flex items-center" },
	ra = { class: "py-1 px-1 text-center text-base" },
	da = { class: "flex-1 px-3 text-center flex space-x-1" },
	ua = { class: "flex items-center" },
	ca = { class: "py-1 px-1 text-center text-base" },
	pa = { key: 1 },
	ma = { class: "flex-1 px-1 text-center flex space-x-1" },
	_a = { key: 1 },
	va = { class: "py-1 px-1 text-center text-base" },
	fa = { class: "flex-1 px-1 text-center flex space-x-1" },
	ha = { class: "flex items-center" },
	ga = { class: "py-1 px-1 text-center text-base" },
	xa = { class: "flex-1 px-1 text-center flex space-x-2" },
	ba = { class: "flex items-center" },
	ya = { class: "py-1 px-1 text-center text-base" },
	ka = { key: 2 },
	Ca = { class: "flex-1 px-1 py-1 text-center flex space-x-1" },
	$a = { class: "flex items-center" },
	wa = { class: "px-1 text-center text-base" },
	Va = { class: "flex-1 px-1 py-1 text-center flex space-x-1" },
	Sa = { class: "flex items-center" },
	Ma = { class: "py-1 px-1 text-center text-base" },
	Ta = { key: 3 },
	Aa = { class: "px-1 py-1 text-center place-content-center" },
	Ua = { class: "space-x-2" },
	za = { key: 0, class: "px-1 py-1 text-xss place-content-center !text-red-600" },
	Ba = { key: 4 },
	Oa = { class: "px-1 py-1 text-center place-content-center" },
	Ia = { key: 0, class: "px-1 py-1 text-xs !text-green-600 place-content-center" },
	La = { class: "space-x-2" },
	Da = { key: 1, class: "px-1 py-1 text-xss !text-green-500 place-content-center" },
	Pa = { key: 2, class: "px-1 py-1 text-xss !text-red-400 place-content-center" },
	Fa = { key: 3, class: "px-1 py-1 text-xss !text-orange-400 place-content-center" },
	Na = { key: 5 },
	ja = { class: "flex-1 px-1 py-2 justify-center items-center flex space-x-1" },
	Ea = { class: "flex items-center truncate" },
	Ra = { class: "flex items-center truncate" },
	Ha = { class: "flex-1 px-1 py-2 flex justify-center items-center space-x-2" },
	Za = { class: "flex items-center truncate" },
	qa = { key: 6 },
	Ga = { key: 0, class: "sm items-center text-green-600" },
	Wa = { key: 1, class: "sm items-center text-red-600" },
	Ja = {
		__name: "WaitlistTabs",
		props: le({ appointmentTabs: Array }, { tab: {}, tabModifiers: {} }),
		emits: ["update:tab"],
		setup(n) {
			const _ = D(n, "tab");
			o("20");
			let b = o([
				{
					label: "Patient Details",
					key: "patient_details",
					icon: "user",
					width: "250px",
					align: "left",
				},
				{
					label: "Appointment Details",
					key: "appointment_details",
					icon: "user",
					width: "280px",
					align: "left",
				},
				{
					label: "Time",
					key: "appointment_time_",
					icon: "clock",
					width: "180px",
					align: "center",
				},
				{
					label: "Token No",
					key: "patient_token_number",
					icon: "log-in",
					width: "200px",
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
					width: "350px",
					align: "center",
				},
				{
					label: "Patient Balance",
					key: "patient_balance",
					icon: "dollar-sign",
					width: "150px",
					align: "center",
				},
			]);
			function v(c) {
				window.location.href = "/app/patient/" + c.patient;
			}
			return (c, h) => {
				const f = O("FeatherIcon");
				return (
					i(),
					x("div", aa, [
						a(
							l(Xe),
							{
								as: "div",
								modelValue: _.value,
								"onUpdate:modelValue":
									h[0] || (h[0] = g => (_.value = g)),
								tabs: n.appointmentTabs,
							},
							{
								"tab-panel": r(({ tab: g }) => [
									a(
										l(Ze),
										{
											class: "h-[80vh]",
											columns: l(b),
											rows:
												(g == null ? void 0 : g.appointments) ||
												[],
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
											default: r(() => [
												a(l(qe), null, {
													default: r(() => [
														(i(!0),
														x(
															E,
															null,
															q(
																l(b),
																e => (
																	i(),
																	U(
																		l(Ge),
																		{
																			key: e.key,
																			item: e,
																		},
																		{
																			prefix: r(
																				() => [
																					e.icon
																						? (i(),
																						  U(
																								f,
																								{
																									key: 0,
																									name: e.icon,
																									class: "h-4 w-4",
																								},
																								null,
																								8,
																								[
																									"name",
																								]
																						  ))
																						: w(
																								"",
																								!0
																						  ),
																				]
																			),
																			_: 2,
																		},
																		1032,
																		["item"]
																	)
																)
															),
															128
														)),
													]),
													_: 1,
												}),
												a(
													l(We),
													null,
													{
														default: r(() => [
															(g != null &&
																g.appointments,
															i(!0),
															x(
																E,
																{ key: 0 },
																q(
																	(g == null
																		? void 0
																		: g.appointments) ||
																		[],
																	e => (
																		i(),
																		U(
																			l(Ke),
																			{
																				key: e.name,
																				row: e,
																			},
																			{
																				default:
																					r(
																						({
																							idx: y,
																							column: k,
																							item: M,
																						}) => [
																							a(
																								l(
																									Je
																								),
																								{
																									item: M,
																									align: k.align,
																								},
																								{
																									default:
																										r(
																											({
																												label: P,
																											}) => [
																												k.key ==
																												"patient_details"
																													? (i(),
																													  x(
																															"div",
																															la,
																															[
																																t(
																																	"div",
																																	na,
																																	[
																																		e.image
																																			? (i(),
																																			  U(
																																					l(
																																						ye
																																					),
																																					{
																																						key: 0,
																																						class: "flex items-center",
																																						image: e.image,
																																						label: "",
																																						size: "md",
																																					},
																																					null,
																																					8,
																																					[
																																						"image",
																																					]
																																			  ))
																																			: (i(),
																																			  x(
																																					"div",
																																					sa,
																																					[
																																						a(
																																							f,
																																							{
																																								name: "user",
																																								class: "h-5 w-5",
																																							}
																																						),
																																					]
																																			  )),
																																		a(
																																			l(
																																				$
																																			),
																																			{
																																				text:
																																					"Patient: " +
																																					e.patient_name,
																																				placement:
																																					"top",
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							a(
																																								l(
																																									L
																																								),
																																								{
																																									ref_for:
																																										!0,
																																									size: "md",
																																									label: "patient_button",
																																									disabled:
																																										!1,
																																									variant:
																																										"ghost",
																																									onClick:
																																										T =>
																																											v(
																																												e
																																											),
																																								},
																																								{
																																									default:
																																										r(
																																											() => [
																																												ne(
																																													C(
																																														e.patient_name
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
																																t(
																																	"div",
																																	oa,
																																	[
																																		t(
																																			"div",
																																			ia,
																																			[
																																				a(
																																					f,
																																					{
																																						name: "hash",
																																						class: "h-3 w-3",
																																					}
																																				),
																																			]
																																		),
																																		a(
																																			l(
																																				$
																																			),
																																			{
																																				text:
																																					"Patient ID: " +
																																					e.patient_id,
																																				placement:
																																					"top",
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							t(
																																								"div",
																																								ra,
																																								C(
																																									e.patient_id
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
																																t(
																																	"div",
																																	da,
																																	[
																																		t(
																																			"div",
																																			ua,
																																			[
																																				a(
																																					f,
																																					{
																																						name: "phone",
																																						class: "h-3 w-3",
																																					}
																																				),
																																			]
																																		),
																																		a(
																																			l(
																																				$
																																			),
																																			{
																																				text:
																																					"Contact: " +
																																					e.phone,
																																				placement:
																																					"top",
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							t(
																																								"div",
																																								ca,
																																								C(
																																									e.phone
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
																													: w(
																															"",
																															!0
																													  ),
																												k.key ==
																												"appointment_details"
																													? (i(),
																													  x(
																															"div",
																															pa,
																															[
																																t(
																																	"div",
																																	ma,
																																	[
																																		e.practitioner_image
																																			? (i(),
																																			  U(
																																					l(
																																						ye
																																					),
																																					{
																																						key: 0,
																																						class: "flex items-center",
																																						image: e.practitioner_image,
																																						label: e.practitioner_name,
																																						size: "sm",
																																					},
																																					null,
																																					8,
																																					[
																																						"image",
																																						"label",
																																					]
																																			  ))
																																			: (i(),
																																			  x(
																																					"div",
																																					_a,
																																					[
																																						a(
																																							f,
																																							{
																																								name: "user",
																																								class: "h-3 w-3",
																																							}
																																						),
																																					]
																																			  )),
																																		a(
																																			l(
																																				$
																																			),
																																			{
																																				text:
																																					"Practitioner: " +
																																					e.practitioner_name,
																																				placement:
																																					"top",
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							t(
																																								"div",
																																								va,
																																								C(
																																									e.practitioner_name
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
																																t(
																																	"div",
																																	fa,
																																	[
																																		t(
																																			"div",
																																			ha,
																																			[
																																				a(
																																					f,
																																					{
																																						name: "type",
																																						class: "h-3 w-3",
																																					}
																																				),
																																			]
																																		),
																																		a(
																																			l(
																																				$
																																			),
																																			{
																																				text:
																																					"Appointment Type: " +
																																					e.appointment_type,
																																				placement:
																																					"top",
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							t(
																																								"div",
																																								ga,
																																								C(
																																									e.appointment_type
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
																																t(
																																	"div",
																																	xa,
																																	[
																																		t(
																																			"div",
																																			ba,
																																			[
																																				a(
																																					f,
																																					{
																																						name: "file-text",
																																						class: "h-3 w-3",
																																					}
																																				),
																																			]
																																		),
																																		a(
																																			l(
																																				$
																																			),
																																			{
																																				text:
																																					"Appointment ID: " +
																																					e.name,
																																				placement:
																																					"top",
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							t(
																																								"div",
																																								ya,
																																								C(
																																									e.name
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
																													: w(
																															"",
																															!0
																													  ),
																												k.key ==
																												"appointment_time_"
																													? (i(),
																													  x(
																															"div",
																															ka,
																															[
																																t(
																																	"div",
																																	Ca,
																																	[
																																		t(
																																			"div",
																																			$a,
																																			[
																																				a(
																																					f,
																																					{
																																						name: "clock",
																																						class: "h-4 w-4",
																																					}
																																				),
																																			]
																																		),
																																		a(
																																			l(
																																				$
																																			),
																																			{
																																				text:
																																					"Appointment Time: " +
																																					e.booked_time,
																																				placement:
																																					"top",
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							t(
																																								"div",
																																								wa,
																																								C(
																																									e.booked_time
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
																																t(
																																	"div",
																																	Va,
																																	[
																																		t(
																																			"div",
																																			Sa,
																																			[
																																				a(
																																					f,
																																					{
																																						name: "log-in",
																																						class: "h-4 w-4",
																																					}
																																				),
																																			]
																																		),
																																		a(
																																			l(
																																				$
																																			),
																																			{
																																				text:
																																					"Checkin Time: " +
																																					e.checkin_time,
																																				placement:
																																					"top",
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							t(
																																								"div",
																																								Ma,
																																								C(
																																									e.checkin_time ||
																																										"Not Checked In"
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
																													: w(
																															"",
																															!0
																													  ),
																												k.key ==
																												"patient_token_number"
																													? (i(),
																													  x(
																															"div",
																															Ta,
																															[
																																t(
																																	"div",
																																	Aa,
																																	[
																																		t(
																																			"div",
																																			Ua,
																																			C(
																																				e.patient_token_number
																																			),
																																			1
																																		),
																																		e.token_status ==
																																		"Expired"
																																			? (i(),
																																			  x(
																																					"div",
																																					za,
																																					" (" +
																																						C(
																																							e.token_status
																																						) +
																																						") ",
																																					1
																																			  ))
																																			: w(
																																					"",
																																					!0
																																			  ),
																																	]
																																),
																															]
																													  ))
																													: w(
																															"",
																															!0
																													  ),
																												k.key ===
																												"status"
																													? (i(),
																													  x(
																															"div",
																															Ba,
																															[
																																t(
																																	"div",
																																	Oa,
																																	[
																																		e.consulted
																																			? (i(),
																																			  x(
																																					"div",
																																					Ia,
																																					" Consulted "
																																			  ))
																																			: w(
																																					"",
																																					!0
																																			  ),
																																		t(
																																			"div",
																																			La,
																																			[
																																				a(
																																					l(
																																						L
																																					),
																																					{
																																						variant:
																																							"outline",
																																						size: "sm",
																																						label: e.status,
																																						class: V(
																																							e.statusClass
																																						),
																																						onClick:
																																							T =>
																																								c.statusopened(
																																									e
																																								),
																																					},
																																					{
																																						default:
																																							r(
																																								() => [
																																									ne(
																																										C(
																																											e.status
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
																																		e.token_su_name
																																			? (i(),
																																			  x(
																																					"div",
																																					Da,
																																					C(
																																						e.token_su_name
																																					),
																																					1
																																			  ))
																																			: w(
																																					"",
																																					!0
																																			  ),
																																		e.custom_cancel_reason
																																			? (i(),
																																			  x(
																																					"div",
																																					Pa,
																																					" Reason: " +
																																						C(
																																							e.custom_cancel_reason
																																						),
																																					1
																																			  ))
																																			: e.custom_reschedule_reason
																																			? (i(),
																																			  x(
																																					"div",
																																					Fa,
																																					" Reason: " +
																																						C(
																																							e.custom_reschedule_reason
																																						),
																																					1
																																			  ))
																																			: w(
																																					"",
																																					!0
																																			  ),
																																	]
																																),
																															]
																													  ))
																													: w(
																															"",
																															!0
																													  ),
																												k.key ===
																												"actions"
																													? (i(),
																													  x(
																															"div",
																															Na,
																															[
																																t(
																																	"div",
																																	ja,
																																	[
																																		a(
																																			l(
																																				L
																																			),
																																			{
																																				variant:
																																					"outline",
																																				ref_for:
																																					!0,
																																				theme: "gray",
																																				size: "sm",
																																				label: "vitals_button",
																																				disabled:
																																					e.has_token,
																																				onClick:
																																					T =>
																																						c.opendialogue(
																																							e
																																						),
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							t(
																																								"div",
																																								Ea,
																																								[
																																									a(
																																										l(
																																											$
																																										),
																																										{
																																											text: "Add Vitals",
																																											placement:
																																												"top",
																																										},
																																										{
																																											default:
																																												r(
																																													() => [
																																														A(
																																															c.$slots,
																																															"icon",
																																															{},
																																															() => [
																																																a(
																																																	f,
																																																	{
																																																		name: "activity",
																																																		class: "size-4 text-ink-gray-7",
																																																	}
																																																),
																																															]
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
																																		a(
																																			l(
																																				L
																																			),
																																			{
																																				variant:
																																					"outline",
																																				ref_for:
																																					!0,
																																				theme: "gray",
																																				size: "sm",
																																				label: "encounter_button",
																																				loading:
																																					!1,
																																				loadingText:
																																					null,
																																				disabled:
																																					e.has_encounter,
																																				link: null,
																																				onClick:
																																					T =>
																																						c.navigateToDoctype(
																																							e.name
																																						),
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							a(
																																								l(
																																									$
																																								),
																																								{
																																									text: "Go to Encounter",
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										r(
																																											() => [
																																												A(
																																													c.$slots,
																																													"icon",
																																													{},
																																													() => [
																																														a(
																																															f,
																																															{
																																																name: "plus-square",
																																																class: "size-4 text-ink-gray-7",
																																															}
																																														),
																																													]
																																												),
																																											]
																																										),
																																									_: 3,
																																								}
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
																																		a(
																																			l(
																																				L
																																			),
																																			{
																																				variant:
																																					"outline",
																																				ref_for:
																																					!0,
																																				theme: "gray",
																																				size: "sm",
																																				label: "payment_button",
																																				loading:
																																					!1,
																																				loadingText:
																																					null,
																																				link: null,
																																				onClick:
																																					T =>
																																						c.open_payment_dialog(
																																							e
																																						),
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							a(
																																								l(
																																									$
																																								),
																																								{
																																									text: "Consultation Payment",
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										r(
																																											() => [
																																												A(
																																													c.$slots,
																																													"icon",
																																													{},
																																													() => [
																																														a(
																																															f,
																																															{
																																																name: "credit-card",
																																																class: "size-4 text-ink-gray-7",
																																															}
																																														),
																																													]
																																												),
																																											]
																																										),
																																									_: 3,
																																								}
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
																																		a(
																																			l(
																																				L
																																			),
																																			{
																																				variant:
																																					"outline",
																																				ref_for:
																																					!0,
																																				theme: "gray",
																																				size: "sm",
																																				label: "reschedule_button",
																																				disabled:
																																					!1,
																																				onClick:
																																					T =>
																																						c.rescheduleAppointment(
																																							e
																																						),
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							a(
																																								l(
																																									$
																																								),
																																								{
																																									text: "Reschedule",
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										r(
																																											() => [
																																												a(
																																													f,
																																													{
																																														name: "calendar",
																																														class: "size-4 text-ink-gray-7",
																																													}
																																												),
																																											]
																																										),
																																									_: 1,
																																								}
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
																																		a(
																																			l(
																																				L
																																			),
																																			{
																																				variant:
																																					"outline",
																																				ref_for:
																																					!0,
																																				theme: "gray",
																																				size: "sm",
																																				label: "Print Boarding Pass",
																																				disabled:
																																					e.has_token,
																																				onClick:
																																					T =>
																																						c.print_boarding_pass(
																																							e
																																						),
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							t(
																																								"div",
																																								Ra,
																																								[
																																									a(
																																										l(
																																											$
																																										),
																																										{
																																											text: "Print Boarding Pass",
																																											placement:
																																												"top",
																																										},
																																										{
																																											default:
																																												r(
																																													() => [
																																														A(
																																															c.$slots,
																																															"icon",
																																															{},
																																															() => [
																																																a(
																																																	f,
																																																	{
																																																		name: "printer",
																																																		class: "size-4 text-ink-gray-7",
																																																	}
																																																),
																																															]
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
																																h[1] ||
																																	(h[1] =
																																		t(
																																			"hr",
																																			null,
																																			null,
																																			-1
																																		)),
																																t(
																																	"div",
																																	Ha,
																																	[
																																		a(
																																			l(
																																				L
																																			),
																																			{
																																				variant:
																																					"outline",
																																				ref_for:
																																					!0,
																																				theme: "gray",
																																				size: "sm",
																																				label: "service_pay_button",
																																				loading:
																																					!1,
																																				loadingText:
																																					null,
																																				disabled:
																																					!1,
																																				link: null,
																																				onClick:
																																					T =>
																																						c.open_healthcare_service(
																																							e
																																						),
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							a(
																																								l(
																																									$
																																								),
																																								{
																																									text: "Bill services",
																																									placement:
																																										"top",
																																								},
																																								{
																																									default:
																																										r(
																																											() => [
																																												A(
																																													c.$slots,
																																													"icon",
																																													{},
																																													() => [
																																														a(
																																															f,
																																															{
																																																name: "dollar-sign",
																																																class: "size-4 text-ink-gray-7",
																																															}
																																														),
																																													]
																																												),
																																											]
																																										),
																																									_: 3,
																																								}
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
																																		a(
																																			l(
																																				L
																																			),
																																			{
																																				variant:
																																					"outline",
																																				ref_for:
																																					!0,
																																				theme: "gray",
																																				size: "sm",
																																				label: "prescription_button",
																																				disabled:
																																					!1,
																																				onClick:
																																					T =>
																																						c.open_prescription_dialog(
																																							e
																																						),
																																			},
																																			{
																																				default:
																																					r(
																																						() => [
																																							t(
																																								"div",
																																								Za,
																																								[
																																									a(
																																										l(
																																											$
																																										),
																																										{
																																											text: "Bill Prescriptions",
																																											placement:
																																												"top",
																																										},
																																										{
																																											default:
																																												r(
																																													() => [
																																														A(
																																															c.$slots,
																																															"icon",
																																															{},
																																															() => [
																																																a(
																																																	f,
																																																	{
																																																		name: "link",
																																																		class: "size-4 text-ink-gray-7",
																																																	}
																																																),
																																															]
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
																																	]
																																),
																															]
																													  ))
																													: w(
																															"",
																															!0
																													  ),
																												k.key ==
																												"patient_balance"
																													? (i(),
																													  x(
																															"div",
																															qa,
																															[
																																a(
																																	l(
																																		$
																																	),
																																	{
																																		text:
																																			"Patient Balance: " +
																																			String(
																																				e.balance_with_currency
																																			),
																																		placement:
																																			"top",
																																	},
																																	{
																																		default:
																																			r(
																																				() => [
																																					e.balance <=
																																					0
																																						? (i(),
																																						  x(
																																								"div",
																																								Ga,
																																								C(
																																									e.balance_with_currency
																																								),
																																								1
																																						  ))
																																						: (i(),
																																						  x(
																																								"div",
																																								Wa,
																																								C(
																																									e.balance_with_currency
																																								),
																																								1
																																						  )),
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
																													: w(
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
																			["row"]
																		)
																	)
																),
																128
															)),
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
								]),
								_: 3,
							},
							8,
							["modelValue", "tabs"]
						),
					])
				);
			};
		},
	},
	Ka = { class: "bg-gray-50 w-full h-full" },
	Ya = { class: "h-full border-r bg-surface-menu-bar" },
	Qa = { class: "flex-1 flex flex-col h-full overflow-auto bg-surface-white" },
	Xa = {
		class: "bg-white flex items-center space-x-2 shadow-sm border-b border-gray-300",
	},
	el = { class: "py-2 px-4" },
	il = {
		__name: "Waitlist",
		emits: [
			"update:search",
			"patient_search",
			"mobile_search",
			"department",
			"dateValue",
			"practitioner",
			"update:visitType",
			"update:sort_by",
		],
		setup(n, { emit: _ }) {
			const b = o(""),
				v = o(""),
				c = o(""),
				h = o(""),
				f = o(""),
				g = o(""),
				e = o(""),
				y = o("");
			let k = o(""),
				M = o("");
			const P = o(0);
			let T = o(0),
				X = o(0),
				W = o(0),
				ee = o(0),
				z = o(0),
				J = o(0),
				S = o(0),
				p = o(0),
				K = o(0),
				Y = o(0),
				B = o(!1),
				m = o(!1),
				N = o(!1);
			const ie = o([]);
			let re = o([]),
				de = o([]),
				ue = o([]),
				ce = o([]),
				pe = o([]),
				me = o([]),
				_e = o([]),
				ve = o([]),
				fe = o([]),
				he = o([]);
			function Se() {
				B.value = !0;
			}
			function Me() {
				window.location.href = "/app";
			}
			let Te = G(() => [
					{ label: `All (${T.value})`, name: "All", appointments: re.value },
					{
						label: `Open (${X.value})`,
						name: "Open",
						appointments: de.value,
					},
					{
						label: `Scheduled (${W.value})`,
						name: "Scheduled",
						appointments: ue.value,
					},
					{
						label: `Confirmed (${J.value})`,
						name: "Confirmed",
						appointments: me.value,
					},
					{
						label: `Checked In (${ee.value})`,
						name: "Checked In",
						appointments: ce.value,
					},
					{
						label: `Attending (${Y.value})`,
						name: "Attending",
						appointments: he.value,
					},
					{
						label: `Checked Out (${z.value})`,
						name: "Checked Out",
						appointments: pe.value,
					},
					{
						label: `Consulted (${S.value})`,
						name: "Consulted",
						appointments: _e.value,
					},
					{
						label: `Cancelled (${p.value})`,
						name: "Cancelled",
						appointments: ve.value,
					},
					{
						label: `No Show (${K.value})`,
						name: "No Show",
						appointments: fe.value,
					},
				]),
				I = Z({
					url: "/api/method/marley_frontend.waitlist.get_appointments",
					method: "GET",
					makeParams() {
						return {
							practitioner: f.value ? JSON.stringify([...f.value]) : null,
							appointment_date: y.value,
							appointment_type: g.value ? g.value.value : null,
							search_by: b.value ? b.value.value : null,
							patient: v.value ? v.value.value : null,
							department: h.value ? h.value.value : null,
							mobile: c.value,
							sort_by: (e == null ? void 0 : e.value) || null,
						};
					},
					onSuccess(d) {
						d &&
							(console.log(d),
							(re.value = d.All),
							(ce.value = d["Checked In"]),
							(me.value = d.Confirmed),
							(he.value = d.Attending),
							(pe.value = d["Checked Out"]),
							(de.value = d.Open),
							(ue.value = d.Scheduled),
							(_e.value = d.Consulted),
							(ve.value = d.Cancelled),
							(fe.value = d["No Show"]),
							(T.value = d.All ? d.All.length : 0),
							(X.value = d.Open ? d.Open.length : 0),
							(W.value = d.Scheduled ? d.Scheduled.length : 0),
							(ee.value = d["Checked In"] ? d["Checked In"].length : 0),
							(z.value = d["Checked Out"] ? d["Checked Out"].length : 0),
							(J.value = d.Confirmed ? d.Confirmed.length : 0),
							(S.value = d.Consulted ? d.Consulted.length : 0),
							(p.value = d.Cancelled ? d.Cancelled.length : 0),
							(K.value = d["No Show"] ? d["No Show"].length : 0),
							(Y.value = d.Attending ? d.Attending.length : 0)),
							(ie.value = d.All.map(s => ({
								label: s.title,
								value: s.name,
							})));
					},
					onError(d) {
						var s;
						(k = ((s = d.messages) == null ? void 0 : s[0]) || d),
							(M = "Failed to load appointments"),
							(N.value = !0);
					},
				});
			return (
				I.fetch(),
				F(c, () => {
					I.fetch();
				}),
				F(h, () => {
					I.fetch();
				}),
				F(b, () => {
					I.fetch();
				}),
				F(v, () => {
					I.fetch();
				}),
				F(y, () => {
					I.fetch();
				}),
				F(g, () => {
					I.fetch();
				}),
				F(f, () => {
					I.fetch();
				}),
				F(e, () => {
					I.fetch();
				}),
				(d, s) => {
					const Ae = O("Button"),
						te = O("Dialog");
					return (
						i(),
						x(
							E,
							null,
							[
								t("div", Ka, [
									t("div", Ya, [a(Ft)]),
									t("div", Qa, [
										t("div", Xa, [
											a(jt, { onLogoClick: Se }),
											a(
												ta,
												{
													search: b.value,
													"onUpdate:search":
														s[0] ||
														(s[0] = u => (b.value = u)),
													patient_search: v.value,
													"onUpdate:patient_search":
														s[1] ||
														(s[1] = u => (v.value = u)),
													mobile_search: c.value,
													"onUpdate:mobile_search":
														s[2] ||
														(s[2] = u => (c.value = u)),
													department: h.value,
													"onUpdate:department":
														s[3] ||
														(s[3] = u => (h.value = u)),
													dateValue: y.value,
													"onUpdate:dateValue":
														s[4] ||
														(s[4] = u => (y.value = u)),
													practitioner: f.value,
													"onUpdate:practitioner":
														s[5] ||
														(s[5] = u => (f.value = u)),
													visitType: g.value,
													"onUpdate:visitType":
														s[6] ||
														(s[6] = u => (g.value = u)),
													sort_by: e.value,
													"onUpdate:sort_by":
														s[7] ||
														(s[7] = u => (e.value = u)),
													searchOptions: ie.value,
													"onUpdate:vModel:search":
														s[8] ||
														(s[8] = u =>
															d.$emit(
																"update:search",
																u
															)),
													"onUpdate:vModel:patient_search":
														s[9] ||
														(s[9] = u =>
															d.$emit(
																"update:patient_search",
																u
															)),
													"onUpdate:vModel:mobile_search":
														s[10] ||
														(s[10] = u =>
															d.$emit(
																"update:mobile_search",
																u
															)),
													"onUpdate:vModel:department":
														s[11] ||
														(s[11] = u =>
															d.$emit(
																"update:department",
																u
															)),
													"onUpdate:vModel:dateValue":
														s[12] ||
														(s[12] = u =>
															d.$emit(
																"update:dateValue",
																u
															)),
													"onUpdate:vModel:practitioner":
														s[13] ||
														(s[13] = u =>
															d.$emit(
																"update:practitioner",
																u
															)),
													"onUpdate:vModel:visitType":
														s[14] ||
														(s[14] = u =>
															d.$emit(
																"update:visitType",
																u
															)),
													"onUpdate:vModel:sort_by":
														s[15] ||
														(s[15] = u =>
															d.$emit(
																"update:sort_by",
																u
															)),
												},
												null,
												8,
												[
													"search",
													"patient_search",
													"mobile_search",
													"department",
													"dateValue",
													"practitioner",
													"visitType",
													"sort_by",
													"searchOptions",
												]
											),
											t("div", el, [
												a(
													Ae,
													{
														variant: "solid",
														ref_for: !0,
														theme: "gray",
														size: "md",
														label: "Book Appointment",
														disabled: !1,
														onClick:
															s[16] ||
															(s[16] = u =>
																d.appointment_creation()),
													},
													{
														default: r(
															() =>
																s[23] ||
																(s[23] = [ne(" Book ")])
														),
														_: 1,
														__: [23],
													}
												),
											]),
										]),
										a(
											Ja,
											{
												tab: P.value,
												"onUpdate:tab":
													s[17] ||
													(s[17] = u => (P.value = u)),
												"appointment-tabs": l(Te),
											},
											null,
											8,
											["tab", "appointment-tabs"]
										),
									]),
								]),
								a(
									te,
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
													onClick: () => Me(),
												},
												{
													label: "Cancel",
													onClick: () =>
														j(B)
															? (B.value = !1)
															: (B = !1),
												},
											],
										},
										modelValue: l(B),
										"onUpdate:modelValue":
											s[18] ||
											(s[18] = u =>
												j(B) ? (B.value = u) : (B = u)),
									},
									null,
									8,
									["options", "modelValue"]
								),
								a(
									te,
									{
										options: {
											title: `${l(M)}`,
											message: `${l(k)}`,
											size: "xl",
											icon: {
												name: "alert-triangle",
												appearance: "warning",
											},
											actions: [
												{ label: "OK", variant: "solid" },
											],
										},
										modelValue: l(N),
										"onUpdate:modelValue":
											s[19] ||
											(s[19] = u =>
												j(N) ? (N.value = u) : (N = u)),
										onClick:
											s[20] || (s[20] = u => (l(N).value = !1)),
									},
									null,
									8,
									["options", "modelValue"]
								),
								a(
									te,
									{
										options: {
											title: `${l(M)}`,
											message: `${l(k)}`,
											size: "xl",
											icon: {
												name: "check",
												appearance: "success",
											},
											actions: [
												{ label: "OK", variant: "solid" },
											],
										},
										modelValue: l(m),
										"onUpdate:modelValue":
											s[21] ||
											(s[21] = u =>
												j(m) ? (m.value = u) : (m = u)),
										onClick:
											s[22] ||
											(s[22] = u =>
												j(m) ? (m.value = !1) : (m = !1)),
									},
									null,
									8,
									["options", "modelValue"]
								),
							],
							64
						)
					);
				}
			);
		},
	};
export { il as default };
//# sourceMappingURL=Waitlist-bfe8b1ac.js.map
