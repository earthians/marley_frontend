var S = (w, x, c) =>
	new Promise((f, n) => {
		var d = a => {
				try {
					m(c.next(a));
				} catch (h) {
					n(h);
				}
			},
			g = a => {
				try {
					m(c.throw(a));
				} catch (h) {
					n(h);
				}
			},
			m = a => (a.done ? f(a.value) : Promise.resolve(a.value).then(d, g));
		m((c = c.apply(w, x)).next());
	});
import {
	_ as V,
	H as j,
	r as l,
	am as D,
	a as O,
	o as z,
	c as E,
	b as o,
	d as u,
	F as y,
	x as R,
	t as b,
	e as N,
	f as i,
	i as P,
	k as r,
	K as W,
	n as q,
	q as A,
} from "./index-8ff34837.js";
const G = { class: "h-screen flex" },
	K = { class: "header-card mb-4" },
	H = { class: "text-lg font-bold text-gray-700 text-center" },
	J = { class: "text-lg text-gray-700 text-center" },
	M = { class: "right-section border-l p-4 flex items-center justify-center" },
	Q = ["src"],
	X = {
		key: 1,
		class: "p-4 bg-gray-100 border rounded shadow-md text-center w-full h-full",
	},
	Y = { key: 1, class: "text-gray-500 italic" },
	Z = {
		__name: "TokenDisplay",
		setup(w) {
			const x = j(),
				c = l(JSON.parse(x.query.queues || "[]")),
				f = l({});
			let n = l(!1),
				d = l(""),
				g = l(""),
				m = l({}),
				a = l(3),
				h = l({});
			const _ = l(null);
			let F = l("");
			const v = D("$socket");
			v &&
				(v.on("update_tokens", s => {
					c.value.forEach(t => {
						T(t);
					});
				}),
				v.on("call", s => {
					let t = new SpeechSynthesisUtterance(
						`Token Number ${s.token_number} to ${s.service_unit_name}`
					);
					speechSynthesis.cancel(),
						speechSynthesis.speak(t),
						U(s.token_number, s.service_unit);
				}),
				O(() => {
					v.off("update_tokens"), v.off("call");
				})),
				z(() => {
					B(), setInterval(B, 1e4), $();
				});
			function B() {
				c.value.forEach(s => {
					T(s);
				});
			}
			const U = (s, t) => {
					f.value[t] &&
						f.value[t].forEach(e => {
							e.token_no != s && e.isBlinking != !1
								? (e.isBlinking = !1)
								: e.token_no === s &&
								  ((e.isBlinking = !0),
								  setTimeout(() => {
										e.status != "In Progress" &&
											(e.isBlinking = !1);
								  }, 1e4));
						});
				},
				T = s => {
					const { fetch: t } = E({
						url: "/api/method/marley_frontend.api.get_tokens",
						method: "GET",
						params: { service_unit: s },
						onSuccess(e) {
							const p = e.results || [];
							(a.value = e.number_of_rows || 3),
								(h.value[s] = e.service_unit_name || ""),
								(f.value[s] = p),
								(m.value[s] = e.practitioner || "");
						},
						onError: e => {
							var p;
							(d = "Fetching Tokens Failed"),
								(g = ((p = e.messages) == null ? void 0 : p[0]) || e),
								(n.value = !0);
						},
					});
					t();
				},
				$ = () => {
					E({
						url: "/api/method/marley_frontend.api.get_file",
						method: "GET",
						onSuccess(t) {
							t && (F.value = `${t}`), C();
						},
						onError: t => {
							var e;
							(d = "Fetching Advertisement File Failed"),
								(g = ((e = t.messages) == null ? void 0 : e[0]) || t),
								(n.value = !0);
						},
					}).fetch();
				},
				C = () =>
					S(this, null, function* () {
						var s;
						if (F.value)
							try {
								const t = yield fetch(F.value);
								if (
									t.headers.get("content-type").startsWith("image/")
								) {
									const e = yield t.blob();
									_.value = URL.createObjectURL(e);
								} else if (
									t.headers.get("content-type").startsWith("video/")
								) {
									const e = yield t.blob();
									_.value = URL.createObjectURL(e);
								} else {
									const e = yield t.text();
									_.value = e;
								}
							} catch (t) {
								(d = "Fetching File Content Failed"),
									(g =
										((s = t.messages) == null ? void 0 : s[0]) ||
										t),
									(n.value = !0);
							}
					}),
				I = s => s && s.startsWith("blob:");
			return (s, t) => (
				r(),
				o(
					y,
					null,
					[
						u("div", G, [
							(r(!0),
							o(
								y,
								null,
								R(
									c.value,
									(e, p) => (
										r(),
										o(
											"div",
											{
												key: p,
												class: "flex-1 border-r p-3 flex flex-col",
											},
											[
												u("div", K, [
													u("h2", H, b(i(h)[e]), 1),
													u("h2", J, b(i(m)[e]), 1),
												]),
												u(
													"ul",
													{
														class: "token-list",
														style: W({
															"--row-count": i(a),
														}),
													},
													[
														(r(!0),
														o(
															y,
															null,
															R(
																(
																	f.value[e] || []
																).slice(0, i(a)),
																(k, L) => (
																	r(),
																	o(
																		"li",
																		{
																			key: L,
																			class: q([
																				"token-item",
																				{
																					"bg-green-200":
																						k.status ===
																						"In Progress",
																					"bg-white":
																						k.status !==
																						"In Progress",
																					"blink-animation":
																						k.isBlinking,
																				},
																			]),
																		},
																		[
																			u(
																				"span",
																				null,
																				b(
																					k.token_no
																				),
																				1
																			),
																		],
																		2
																	)
																)
															),
															128
														)),
													],
													4
												),
											]
										)
									)
								),
								128
							)),
							u("div", M, [
								_.value
									? (r(),
									  o(
											y,
											{ key: 0 },
											[
												I(_.value)
													? (r(),
													  o(
															"img",
															{
																key: 0,
																src: _.value,
																alt: "File Content",
																class: "stretch-image",
															},
															null,
															8,
															Q
													  ))
													: (r(),
													  o("div", X, [
															u("p", null, b(_.value), 1),
													  ])),
											],
											64
									  ))
									: (r(), o("p", Y, "No file to display")),
							]),
						]),
						N(
							i(A),
							{
								options: {
									title: `${i(d)}`,
									message: `${i(g)}`,
									size: "xl",
									icon: {
										name: "alert-triangle",
										appearance: "warning",
									},
									actions: [{ label: "OK", variant: "solid" }],
								},
								modelValue: i(n),
								"onUpdate:modelValue":
									t[0] ||
									(t[0] = e => (P(n) ? (n.value = e) : (n = e))),
								onClick: t[1] || (t[1] = e => (i(n).value = !1)),
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
	se = V(Z, [["__scopeId", "data-v-688a84f1"]]);
export { se as default };
//# sourceMappingURL=TokenDisplay-aec08a41.js.map
