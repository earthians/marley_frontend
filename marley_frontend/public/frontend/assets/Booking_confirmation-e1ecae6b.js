import {
	r as l,
	u as q,
	H as D,
	c as V,
	o as G,
	b as p,
	d as n,
	e as i,
	f as a,
	t as c,
	h as U,
	g as d,
	j as K,
	i as x,
	F as E,
	C as M,
	k as m,
	l as C,
	q as L,
	x as O,
	n as Y,
} from "./index-8ff34837.js";
import { _ as W } from "./Breadcrumbs.vue_vue_type_script_setup_true_lang-0e046fb8.js";
import { L as J } from "./LanguageSelector-1a79c90c.js";
import { F as Q } from "./Footer-f4f657d5.js";
import { _ as X } from "./BrandLogo-c420a0fa.js";
import "./Dropdown-007bc2e8.js";
const Z = "/assets/marley_frontend/frontend/assets/bookingconfirm-ad48f9af.jpg",
	ee = { class: "flex h-screen items-center justify-center bg-gray-100" },
	te = { class: "absolute top-4 left-4" },
	ae = {
		class: "relative flex flex-col items-center justify-center space-y-6 p-4 bg-white rounded-lg shadow-lg border border-gray-300 w-[800px] min-h-[600px] max-h-[600px]",
	},
	oe = { class: "absolute top-4 left-4" },
	ne = { key: 0 },
	le = { class: "text-center text-md" },
	ie = { key: 1 },
	se = { class: "text-center text-md" },
	re = { class: "flex space-x-4 py-4" },
	me = { key: 0 },
	ue = { class: "space-y-2" },
	pe = ["onClick"],
	ce = { class: "text-sm text-gray-600" },
	de = { key: 1 },
	Ce = {
		__name: "Booking_confirmation",
		setup(ge) {
			const k = {
					en: {
						checkIn: "Check In",
						book: "Book an Appointment",
						have_appointment:
							"You already have appointment, want to checkin?",
						no_appointment:
							"You have no appointments today, want to book one?",
					},
					ar: {
						checkIn: "حجز موعد آخر",
						book: "حجز موعد",
						have_appointment: "لديك حجز بالفعل، هل تريد تسجيل الدخول؟",
						no_appointment: "ليس لديك مواعيد اليوم، هل تريد حجز موعد؟",
					},
					ml: {
						checkIn: "ചെക്ക് - ഇൻ",
						book: "ഒരു അപ്പോയിൻ്റ്മെൻ്റ് ബുക്ക് ചെയ്യുക",
						have_appointment:
							"നിങ്ങൾക്ക് ഇതിനകം ഒരു ബുക്കിംഗ് ഉണ്ട്, ചെക്ക് ഇൻ ചെയ്യണോ?",
						no_appointment:
							"നിങ്ങൾക്ക് ഇന്ന് അപ്പോയിൻ്റ്‌മെൻ്റുകളൊന്നുമില്ല, ഒരെണ്ണം ബുക്ക് ചെയ്യണോ?",
					},
				},
				u = l("en"),
				I = q(),
				T = D();
			let S = l(localStorage.getItem("patient_id") || null),
				r = T.query.appointment || null,
				g = l(!1),
				_ = l(!1),
				f = l(""),
				v = l(""),
				A = l(!0),
				B = l(""),
				s = l(!1),
				y = l([]),
				h = l(null),
				w = l("");
			V({
				url: "/api/method/marley_frontend.api.get_logo_image",
				method: "GET",
				makeParams() {
					return {};
				},
				onSuccess(t) {
					t
						? (w.value = t)
						: (w.value =
								"https://raw.githubusercontent.com/frappe/healthcare/develop/healthcare/public/images/healthcare.svg");
				},
			}).fetch(),
				G(() => {
					const t = localStorage.getItem("selectedLanguage");
					t && (u.value = t);
				});
			const P = t => {
				(u.value = t), localStorage.setItem("selectedLanguage", t);
			};
			function z() {
				I.push({ name: "Appointment" });
			}
			let $ = V({
				url: "/api/method/marley_frontend.api.check_appointment",
				method: "GET",
				makeParams() {
					return { patient_id: S.value, appointment_id: r || null };
				},
				onSuccess(t) {
					t.message
						? ((f = `${t.message}`), (v = "Message"), (g.value = !0))
						: t.alert
						? ((f = t.alert), (v = "Alert"), (_.value = !0))
						: t.route &&
						  ((A = !1),
						  (B = t.practitioner),
						  (f = t.payment_message),
						  (v = "Complete Payment"),
						  (g.value = !0));
				},
				onError(t) {
					(f = `APIError: ${t.message}`), (v = "Error"), (_.value = !0);
				},
			});
			function N() {
				S &&
					V({
						url: "/api/method/marley_frontend.api.get_all_appointments",
						method: "GET",
						makeParams() {
							return { patient_id: S.value };
						},
						onSuccess(e) {
							e && e.appointment_list
								? ((y.value = e.appointment_list), (s.value = !0))
								: e &&
								  e.appointment &&
								  ((r = e.appointment),
								  localStorage.setItem("booking_date", e.date),
								  $.fetch());
						},
					}).fetch();
			}
			const j = t => {
					h.value = t;
				},
				F = () => {
					if (h.value) {
						let t = y.value.find(e => e.name === h.value);
						t &&
							(localStorage.setItem("booking_date", t.appointment_date),
							(r = h.value),
							$.fetch()),
							(s.value = !1);
					}
				};
			function H() {
				A
					? (localStorage.clear(), I.push({ name: "Home" }))
					: I.push({
							name: "Payment",
							query: { practitioner: B, appointment: r },
					  });
			}
			return (t, e) => {
				const b = M("Button");
				return (
					m(),
					p(
						E,
						null,
						[
							n("div", ee, [
								n("div", te, [i(X)]),
								i(
									J,
									{ selectedLanguage: u.value, onChangeLanguage: P },
									null,
									8,
									["selectedLanguage"]
								),
								n("div", ae, [
									n("div", oe, [
										i(
											a(W),
											{
												items: [
													{
														label: "Home",
														route: { name: "Home" },
													},
													{
														label: "Confirm Booking",
														route:
															"/Booking_confirmation?appointment=" +
															a(r),
													},
												],
											},
											null,
											8,
											["items"]
										),
									]),
									e[4] ||
										(e[4] = n(
											"img",
											{ src: Z, alt: "Welcome Image" },
											null,
											-1
										)),
									a(r)
										? (m(),
										  p("div", ne, [
												n(
													"p",
													le,
													c(k[u.value].have_appointment),
													1
												),
										  ]))
										: (m(),
										  p("div", ie, [
												n(
													"p",
													se,
													c(k[u.value].no_appointment),
													1
												),
										  ])),
									n("div", re, [
										a(r)
											? (m(),
											  U(
													b,
													{
														key: 0,
														onClick: N,
														class: "px-4 py-2 transition-all",
														variant: "subtle",
														ref_for: !0,
														theme: "gray",
														size: "lg",
													},
													{
														default: d(() => [
															C(c(k[u.value].checkIn), 1),
														]),
														_: 1,
													}
											  ))
											: K("", !0),
										i(
											b,
											{
												onClick: z,
												class: "px-4 py-2 transition-all",
												variant: "solid",
												ref_for: !0,
												theme: "gray",
												size: "lg",
											},
											{
												default: d(() => [
													C(c(k[u.value].book), 1),
												]),
												_: 1,
											}
										),
									]),
								]),
								i(Q),
							]),
							i(
								a(L),
								{
									options: {
										title: `${a(v)}`,
										message: `${a(f)}`,
										size: "xl",
										icon: { name: "check", appearance: "success" },
										actions: [
											{
												label: "OK",
												variant: "solid",
												onClick: () => {
													H();
												},
											},
										],
									},
									modelValue: a(g),
									"onUpdate:modelValue":
										e[0] ||
										(e[0] = o => (x(g) ? (g.value = o) : (g = o))),
								},
								null,
								8,
								["options", "modelValue"]
							),
							i(
								a(L),
								{
									options: {
										title: `${a(v)}`,
										message: `${a(f)}`,
										size: "xl",
										icon: {
											name: "alert-triangle",
											appearance: "warning",
										},
										actions: [{ label: "OK", variant: "solid" }],
									},
									modelValue: a(_),
									"onUpdate:modelValue":
										e[1] ||
										(e[1] = o => (x(_) ? (_.value = o) : (_ = o))),
								},
								null,
								8,
								["options", "modelValue"]
							),
							i(
								a(L),
								{
									modelValue: a(s),
									"onUpdate:modelValue":
										e[3] ||
										(e[3] = o => (x(s) ? (s.value = o) : (s = o))),
								},
								{
									"body-title": d(
										() =>
											e[5] ||
											(e[5] = [
												n(
													"h3",
													null,
													"Select your Appointment",
													-1
												),
											])
									),
									"body-content": d(() => [
										a(y).length > 0
											? (m(),
											  p("div", me, [
													n("ul", ue, [
														(m(!0),
														p(
															E,
															null,
															O(
																a(y),
																(o, R) => (
																	m(),
																	p(
																		"li",
																		{
																			key: R,
																			class: Y([
																				"p-2 border rounded-lg flex items-center space-x-4 cursor-pointer",
																				{
																					"bg-gray-200":
																						a(
																							h
																						) ===
																						o.name,
																				},
																			]),
																			onClick:
																				fe =>
																					j(
																						o.name
																					),
																		},
																		[
																			n(
																				"div",
																				null,
																				[
																					n(
																						"strong",
																						null,
																						c(
																							o.practitioner_name
																						),
																						1
																					),
																					n(
																						"p",
																						ce,
																						"ID: " +
																							c(
																								o.name
																							) +
																							" Time: " +
																							c(
																								o.appointment_time
																							),
																						1
																					),
																				]
																			),
																		],
																		10,
																		pe
																	)
																)
															),
															128
														)),
													]),
											  ]))
											: (m(),
											  p(
													"div",
													de,
													e[6] ||
														(e[6] = [
															n(
																"p",
																null,
																"No Appointments found.",
																-1
															),
														])
											  )),
									]),
									actions: d(() => [
										i(
											b,
											{
												variant: "solid",
												disabled: !a(h),
												onClick: F,
											},
											{
												default: d(
													() =>
														e[7] ||
														(e[7] = [C(" Confirm ")])
												),
												_: 1,
												__: [7],
											},
											8,
											["disabled"]
										),
										i(
											b,
											{
												class: "ml-2",
												onClick:
													e[2] ||
													(e[2] = o =>
														x(s)
															? (s.value = !1)
															: (s = !1)),
											},
											{
												default: d(
													() =>
														e[8] || (e[8] = [C(" Close ")])
												),
												_: 1,
												__: [8],
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
	};
export { Ce as default };
//# sourceMappingURL=Booking_confirmation-e1ecae6b.js.map
