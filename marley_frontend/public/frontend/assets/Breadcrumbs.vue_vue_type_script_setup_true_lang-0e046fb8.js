var E = Object.defineProperty,
	L = Object.defineProperties;
var N = Object.getOwnPropertyDescriptors;
var w = Object.getOwnPropertySymbols;
var S = Object.prototype.hasOwnProperty,
	V = Object.prototype.propertyIsEnumerable;
var y = (s, e, n) =>
		e in s
			? E(s, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
			: (s[e] = n),
	m = (s, e) => {
		for (var n in e || (e = {})) S.call(e, n) && y(s, n, e[n]);
		if (w) for (var n of w(e)) V.call(e, n) && y(s, n, e[n]);
		return s;
	},
	C = (s, e) => L(s, N(e));
import {
	I as j,
	u as z,
	M as F,
	J as f,
	C as I,
	k as r,
	b as i,
	F as x,
	e as b,
	g,
	f as _,
	m as J,
	d as l,
	j as B,
	x as M,
	h as R,
	D as c,
	t as $,
	n as D,
} from "./index-8ff34837.js";
import { D as W } from "./Dropdown-007bc2e8.js";
const q = { class: "flex min-w-0 items-center" },
	A = {
		class: "flex min-w-0 items-center overflow-hidden text-ellipsis whitespace-nowrap",
	},
	G = ["onClick"],
	H = { key: 2, class: "mx-0.5 text-base text-ink-gray-4", "aria-hidden": "true" },
	Q = j({
		__name: "Breadcrumbs",
		props: { items: {} },
		setup(s) {
			const e = s,
				n = z(),
				{ width: v } = F(),
				d = f(() => (e.items || []).filter(Boolean)),
				h = f(() =>
					v.value > 640
						? []
						: d.value.slice(0, -2).map(o => {
								let p = () => {
									o.onClick && o.onClick(),
										o.route && n.push(o.route);
								};
								return C(m({}, o), {
									icon: null,
									label: o.label,
									onClick: p,
								});
						  })
				),
				u = f(() => (v.value > 640 ? d.value : d.value.slice(-2)));
			return (a, o) => {
				const p = I("router-link");
				return (
					r(),
					i("div", q, [
						h.value.length
							? (r(),
							  i(
									x,
									{ key: 0 },
									[
										b(
											_(W),
											{ class: "h-7", options: h.value },
											{
												default: g(() => [
													b(
														_(J),
														{ variant: "ghost" },
														{
															icon: g(
																() =>
																	o[0] ||
																	(o[0] = [
																		l(
																			"svg",
																			{
																				class: "w-4 text-ink-gray-5",
																				xmlns: "http://www.w3.org/2000/svg",
																				width: "24",
																				height: "24",
																				viewBox:
																					"0 0 24 24",
																				fill: "none",
																				stroke: "currentColor",
																				"stroke-width":
																					"2",
																				"stroke-linecap":
																					"round",
																				"stroke-linejoin":
																					"round",
																			},
																			[
																				l(
																					"circle",
																					{
																						cx: "12",
																						cy: "12",
																						r: "1",
																					}
																				),
																				l(
																					"circle",
																					{
																						cx: "19",
																						cy: "12",
																						r: "1",
																					}
																				),
																				l(
																					"circle",
																					{
																						cx: "5",
																						cy: "12",
																						r: "1",
																					}
																				),
																			],
																			-1
																		),
																	])
															),
															_: 1,
														}
													),
												]),
												_: 1,
											},
											8,
											["options"]
										),
										o[1] ||
											(o[1] = l(
												"span",
												{
													class: "ml-1 mr-0.5 text-base text-ink-gray-4",
													"aria-hidden": "true",
												},
												" / ",
												-1
											)),
									],
									64
							  ))
							: B("", !0),
						l("div", A, [
							(r(!0),
							i(
								x,
								null,
								M(
									u.value,
									(t, k) => (
										r(),
										i(
											x,
											{ key: t.label },
											[
												t.route
													? (r(),
													  R(
															p,
															{
																key: 0,
																to: t.route,
																onClick: T =>
																	t.onClick
																		? t.onClick()
																		: null,
																class: D([
																	"flex items-center rounded px-0.5 py-1 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3",
																	[
																		k ==
																		u.value.length -
																			1
																			? "text-ink-gray-9"
																			: "text-ink-gray-5 hover:text-ink-gray-7",
																	],
																]),
															},
															{
																default: g(() => [
																	c(
																		a.$slots,
																		"prefix",
																		{ item: t }
																	),
																	l(
																		"span",
																		null,
																		$(t.label),
																		1
																	),
																	c(
																		a.$slots,
																		"suffix",
																		{ item: t }
																	),
																]),
																_: 2,
															},
															1032,
															["to", "onClick", "class"]
													  ))
													: (r(),
													  i(
															"button",
															{
																key: 1,
																onClick: T =>
																	t.onClick
																		? t.onClick()
																		: null,
																class: D([
																	"flex items-center rounded px-0.5 py-1 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3",
																	[
																		k ==
																		u.value.length -
																			1
																			? "text-ink-gray-9"
																			: "text-ink-gray-5 hover:text-ink-gray-7",
																	],
																]),
															},
															[
																c(a.$slots, "prefix", {
																	item: t,
																}),
																l(
																	"span",
																	null,
																	$(t.label),
																	1
																),
																c(a.$slots, "suffix", {
																	item: t,
																}),
															],
															10,
															G
													  )),
												k != u.value.length - 1
													? (r(), i("span", H, " / "))
													: B("", !0),
											],
											64
										)
									)
								),
								128
							)),
						]),
					])
				);
			};
		},
	});
export { Q as _ };
//# sourceMappingURL=Breadcrumbs.vue_vue_type_script_setup_true_lang-0e046fb8.js.map
