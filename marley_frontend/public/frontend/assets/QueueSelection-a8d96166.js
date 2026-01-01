import {
	_ as b,
	u as y,
	r as a,
	c as p,
	y as x,
	b as w,
	d as l,
	f as s,
	e as _,
	i as g,
	F as S,
	k,
	a2 as V,
	q as E,
} from "./index-8ff34837.js";
const Q = { class: "absolute top-4 left-4" },
	T = { class: "w-10 h-10" },
	F = ["src"],
	U = { class: "flex h-screen items-center justify-center bg-gray-100" },
	j = {
		class: "flex flex-col items-center justify-center space-y-8 p-8 bg-white rounded-xl shadow-xl border border-gray-300 w-[50vw] h-[50vh]",
	},
	q = { class: "p-2 w-[30vw]" },
	B = {
		__name: "QueueSelection",
		setup(N) {
			const f = y();
			let c = a([]),
				o = a([]),
				n = a(!1),
				d = a(""),
				m = a(""),
				u = a("");
			p({
				url: "/api/method/marley_frontend.api.get_logo_image",
				method: "GET",
				makeParams() {
					return {};
				},
				onSuccess(t) {
					t
						? (u.value = t)
						: (u.value =
								"https://raw.githubusercontent.com/frappe/healthcare/develop/healthcare/public/images/healthcare.svg");
				},
			}).fetch();
			const { fetch: h } = p({
				url: "/api/method/marley_frontend.api.get_units",
				method: "GET",
				onSuccess(t) {
					c.value = t;
				},
				onError: t => {
					var e;
					(d = "Fetching Units Failed"),
						(m = ((e = t.messages) == null ? void 0 : e[0]) || t),
						(n.value = !0);
				},
			});
			h();
			const r = a([]);
			x(o, () => {
				(r.value = []),
					o.value.forEach(t => {
						r.value.push(t.value);
					});
			});
			const v = () => {
				f.push({
					name: "TokenDisplay",
					query: { queues: JSON.stringify(r.value) },
				});
			};
			return (t, e) => (
				k(),
				w(
					S,
					null,
					[
						l("div", Q, [
							l("div", T, [
								l(
									"img",
									{
										src: s(u),
										alt: "Logo",
										class: "w-full h-full object-contain",
									},
									null,
									8,
									F
								),
							]),
						]),
						l("div", U, [
							l("div", j, [
								e[3] ||
									(e[3] = l(
										"h1",
										{ class: "text-3xl font-bold" },
										"Select the Queues",
										-1
									)),
								l("div", q, [
									_(
										s(V),
										{
											options: s(c),
											placeholder: "Service Units",
											multiple: !0,
											modelValue: s(o),
											"onUpdate:modelValue":
												e[0] ||
												(e[0] = i =>
													g(o) ? (o.value = i) : (o = i)),
										},
										null,
										8,
										["options", "modelValue"]
									),
								]),
								l("div", null, [
									l(
										"button",
										{
											class: "mt-4 px-6 py-3 text-gray-700 font-semibold rounded-lg !bg-[#b3bf79]",
											onClick: v,
										},
										" Submit "
									),
								]),
							]),
						]),
						e[4] ||
							(e[4] = l(
								"div",
								{
									class: "absolute bottom-4 right-4 text-gray-600 text-sm",
								},
								" Powered by Marley Healthcare ",
								-1
							)),
						_(
							s(E),
							{
								options: {
									title: `${s(d)}`,
									message: `${s(m)}`,
									size: "xl",
									icon: {
										name: "alert-triangle",
										appearance: "warning",
									},
									actions: [{ label: "OK", variant: "solid" }],
								},
								modelValue: s(n),
								"onUpdate:modelValue":
									e[1] ||
									(e[1] = i => (g(n) ? (n.value = i) : (n = i))),
								onClick: e[2] || (e[2] = i => (s(n).value = !1)),
							},
							null,
							8,
							["options", "modelValue"]
						),
					],
					64
				)
			);
		},
	},
	C = b(B, [["__scopeId", "data-v-3fa210d0"]]);
export { C as default };
//# sourceMappingURL=QueueSelection-a8d96166.js.map
