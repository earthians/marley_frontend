import {
	b3 as O,
	r as W,
	J as _,
	I as z,
	o as E,
	k as y,
	h as J,
	g as b,
	d as v,
	b as x,
	t as Y,
	j as R,
	e as p,
	b0 as T,
	D as U,
	A as q,
	f as s,
	b1 as A,
	$ as B,
	m as $,
	x as P,
	F as S,
	n as L,
	R as G,
	a$ as H,
} from "./index-8ff34837.js";
function f(...e) {
	return new Date(...e);
}
function M(e) {
	return !e || e.toString() === "Invalid Date"
		? ""
		: O(e)
				.set("hour", 0)
				.set("minute", 0)
				.set("second", 0)
				.set("millisecond", 0)
				.format("YYYY-MM-DD");
}
function I(e, n) {
	let a = 1;
	n < 0 && ((a = -1), (n = Math.abs(n)));
	const r = [];
	for (; n; ) (e = f(e.getFullYear(), e.getMonth(), e.getDate() + a)), r.push(e), n--;
	return a === -1 ? r.reverse() : r;
}
function K(e, n) {
	const r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e];
	return e === 1 && Q(n) ? 29 : r;
}
function Q(e) {
	return e % 400 === 0 ? !0 : e % 100 === 0 ? !1 : e % 4 === 0;
}
function X() {
	const e = W(0),
		n = W(0),
		a = _(() => f()),
		r = _(() => {
			if (!(e.value && n.value)) return [];
			const l = n.value - 1,
				d = e.value,
				g = f(d, l, 1),
				i = f(d, l + 1, 0),
				k = g.getDay(),
				w = 6 - i.getDay(),
				t = I(g, -k),
				h = I(i, w),
				c = K(l, d),
				o = I(g, c - 1);
			let u = [...t, g, ...o, ...h];
			if (u.length < 42) {
				const m = u.at(-1);
				if (m) {
					const N = I(m, 42 - u.length);
					u = u.concat(...N);
				}
			}
			return u;
		}),
		V = _(() => {
			const l = [],
				d = r.value.slice();
			for (; d.length; ) {
				const g = d.splice(0, 7);
				l.push(g);
			}
			return l;
		}),
		D = _(() => {
			if (!(e.value && n.value)) return "";
			const l = f(e.value, n.value - 1, 1);
			return `${l.toLocaleString("en-US", {
				month: "long",
			})}, ${l.getFullYear()}`;
		});
	function j() {
		C(-1);
	}
	function F() {
		C(1);
	}
	function C(l) {
		(n.value = n.value + l),
			n.value < 1 && ((n.value = 12), (e.value = e.value - 1)),
			n.value > 12 && ((n.value = 1), (e.value = e.value + 1));
	}
	return {
		currentYear: e,
		currentMonth: n,
		today: a,
		dates: r,
		datesAsWeeks: V,
		formattedMonth: D,
		prevMonth: j,
		nextMonth: F,
		changeMonth: C,
	};
}
const Z = { class: "flex flex-col space-y-1.5" },
	ee = { key: 0, class: "block text-xs text-ink-gray-5" },
	te = { class: "flex items-center p-1 text-ink-gray-4" },
	ne = { class: "flex-1 text-center text-base font-medium text-ink-gray-6" },
	se = { class: "flex items-center justify-center gap-1 p-1" },
	ae = { class: "flex flex-col items-center justify-center p-1 text-ink-gray-8" },
	le = { class: "flex items-center text-xs uppercase" },
	re = ["onClick"],
	oe = { class: "flex justify-end p-1" },
	ce = z({
		__name: "DatePicker",
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
		setup(e, { emit: n }) {
			const a = e,
				r = n,
				{
					currentYear: V,
					currentMonth: D,
					today: j,
					datesAsWeeks: F,
					formattedMonth: C,
					prevMonth: l,
					nextMonth: d,
				} = X(),
				g = _(() => {
					var h, c, o;
					let t = "mt-2";
					return (
						(h = a.placement) != null && h.startsWith("top")
							? (t = "mb-2")
							: (c = a.placement) != null && c.startsWith("left")
							? (t = "mr-2")
							: (o = a.placement) != null &&
							  o.startsWith("right") &&
							  (t = "ml-2"),
						t
					);
				}),
				i = _(() => (a.value ? a.value : a.modelValue));
			function k(t, h = !1) {
				(t = h ? H(t) : t), r("change", M(t)), r("update:modelValue", M(t));
			}
			function w() {
				let t = i.value ? f(i.value) : f();
				t.toString() === "Invalid Date" && (t = f()),
					(V.value = t.getFullYear()),
					(D.value = t.getMonth() + 1);
			}
			return (
				E(() => w()),
				(t, h) => (
					y(),
					J(
						s(G),
						{
							onOpen: w,
							class: "flex w-full [&>div:first-child]:w-full",
							placement: t.placement,
						},
						{
							target: b(({ togglePopover: c }) => [
								v("div", Z, [
									a.label
										? (y(), x("label", ee, Y(a.label), 1))
										: R("", !0),
									p(
										s(A),
										q(
											{
												readonly: "",
												type: "text",
												placeholder: t.placeholder,
												value:
													i.value && t.formatter
														? t.formatter(i.value)
														: i.value,
												onFocus: o => (t.readonly ? null : c()),
												class: ["w-full", t.inputClass],
											},
											t.$attrs
										),
										T({ _: 2 }, [
											t.$slots.prefix
												? {
														name: "prefix",
														fn: b(() => [
															U(t.$slots, "prefix"),
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
							body: b(({ togglePopover: c }) => [
								v(
									"div",
									{
										class: L([
											"w-fit select-none text-base text-ink-gray-9 divide-y divide-outline-gray-modals rounded-lg bg-surface-modal shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none",
											g.value,
										]),
									},
									[
										v("div", te, [
											p(
												s($),
												{
													variant: "ghost",
													class: "h-7 w-7",
													onClick: s(l),
												},
												{
													default: b(() => [
														p(B, {
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
											v("div", ne, Y(s(C)), 1),
											p(
												s($),
												{
													variant: "ghost",
													class: "h-7 w-7",
													onClick: s(d),
												},
												{
													default: b(() => [
														p(B, {
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
										v("div", se, [
											p(
												s(A),
												{
													class: "text-sm",
													type: "text",
													value: i.value,
													onChange:
														h[0] ||
														(h[0] = o =>
															k(s(f)(o.target.value))),
												},
												null,
												8,
												["value"]
											),
											p(
												s($),
												{
													label: "Today",
													class: "text-sm",
													onClick: () => {
														k(s(f)(), !0), c();
													},
												},
												null,
												8,
												["onClick"]
											),
										]),
										v("div", ae, [
											v("div", le, [
												(y(),
												x(
													S,
													null,
													P(
														[
															"s",
															"m",
															"t",
															"w",
															"t",
															"f",
															"s",
														],
														(o, u) =>
															v(
																"div",
																{
																	class: "flex h-6 w-8 items-center justify-center text-center",
																	key: u,
																},
																Y(o),
																1
															)
													),
													64
												)),
											]),
											(y(!0),
											x(
												S,
												null,
												P(
													s(F),
													(o, u) => (
														y(),
														x(
															"div",
															{
																class: "flex items-center",
																key: u,
															},
															[
																(y(!0),
																x(
																	S,
																	null,
																	P(
																		o,
																		m => (
																			y(),
																			x(
																				"div",
																				{
																					key: s(
																						M
																					)(
																						m
																					),
																					class: L(
																						[
																							"flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-surface-gray-2",
																							{
																								"text-ink-gray-3":
																									m.getMonth() !==
																									s(
																										D
																									) -
																										1,
																								"font-extrabold text-ink-gray-9":
																									s(
																										M
																									)(
																										m
																									) ===
																									s(
																										M
																									)(
																										s(
																											j
																										)
																									),
																								"bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6":
																									s(
																										M
																									)(
																										m
																									) ===
																									i.value,
																							},
																						]
																					),
																					onClick:
																						() => {
																							k(
																								m
																							),
																								c();
																						},
																				},
																				Y(
																					m.getDate()
																				),
																				11,
																				re
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
										v("div", oe, [
											p(
												s($),
												{
													label: "Clear",
													class: "text-sm",
													onClick: () => {
														k(""), c();
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
	});
export { ce as _, f as g, X as u };
//# sourceMappingURL=DatePicker.vue_vue_type_script_setup_true_lang-9ccf8b49.js.map
