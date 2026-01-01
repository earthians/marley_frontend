var W = (J, I, i) =>
	new Promise((f, r) => {
		var _ = p => {
				try {
					B(i.next(p));
				} catch (q) {
					r(q);
				}
			},
			z = p => {
				try {
					B(i.throw(p));
				} catch (q) {
					r(q);
				}
			},
			B = p => (p.done ? f(p.value) : Promise.resolve(p.value).then(_, z));
		B((i = i.apply(J, I)).next());
	});
import {
	u as _e,
	r as l,
	c as g,
	o as ge,
	a as ve,
	y as Y,
	b as N,
	d,
	e as v,
	f as e,
	n as H,
	t as O,
	i as n,
	F as ae,
	x as he,
	h as le,
	g as be,
	j as oe,
	C as ye,
	k as S,
	s as re,
	l as xe,
	q as ke,
} from "./index-8ff34837.js";
import { _ as we } from "./Breadcrumbs.vue_vue_type_script_setup_true_lang-0e046fb8.js";
import { _ as Se } from "./DatePicker.vue_vue_type_script_setup_true_lang-9ccf8b49.js";
import { L as Ue } from "./LanguageSelector-1a79c90c.js";
import { F as Ee } from "./Footer-f4f657d5.js";
import { _ as Le } from "./BrandLogo-c420a0fa.js";
import { _ as Pe } from "./CompleteProfileDialog-89cc2eac.js";
import "./Dropdown-007bc2e8.js";
const Ce = { class: "relative min-h-screen bg-gray-100" },
	Ve = { class: "absolute top-4 left-4" },
	De = {
		class: "h-screen bg-gray-100 flex items-center justify-center overflow-hidden",
	},
	Ae = { class: "absolute top-4 left-4" },
	Te = { class: "text-xl font-bold text-center py-4" },
	$e = { class: "text-3xl font-bold text-center mb-8" },
	Ne = { class: "space-y-6 sm:space-y-4 px-2 py-15 sm:px-6" },
	ze = {
		key: 0,
		class: H(
			"bg-white p-6 rounded-2xl shadow-xl border border-gray-300 flex flex-col justify-center w-full min-w-[400px] max-w-[800px] mx-auto h-[600px]"
		),
	},
	Be = { class: "text-3xl font-bold text-center mb-4 pb-10" },
	qe = { key: 0, class: "flex justify-center items-center h-48" },
	Oe = {
		key: 1,
		class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-y-auto max-h-[400px] pr-1",
	},
	Ie = { key: 2, class: "text-gray-500 font-semibold text-lg text-center" },
	je = { class: "flex justify-center pt-10" },
	Ze = {
		__name: "Appointment",
		setup(J) {
			const I = _e();
			let i = l(localStorage.getItem("selectedLanguage") || "en"),
				f = {
					newAppointment: {
						en: "New Appointment",
						ar: "موعد جديد",
						ml: "പുതിയ അപോയിന്റ്മെന്റ്",
					},
					selectDepartment: {
						en: "Select Department",
						ar: "اختر القسم",
						ml: "ഡിപ്പാർട്ട്‌മെന്റ് തിരഞ്ഞെടുക്കുക",
					},
					selectPractitioner: {
						en: "Select Practitioner",
						ar: "اختر الممارس",
						ml: "പ്രാക്ടിഷണർ തിരഞ്ഞെടുക്കുക",
					},
					pickDate: {
						en: "Pick a Date",
						ar: "اختر التاريخ",
						ml: "തീയതി തിരഞ്ഞെടുക്കുക",
					},
					checkAvailability: {
						en: "Check Availability",
						ar: "تحقق من التوفر",
						ml: "ലഭ്യത പരിശോധിക്കുക",
					},
					choose_a_slot: {
						en: "Choose a Slot",
						ar: "اختر موعداً",
						ml: "സ്ലോട്ട് തിരഞ്ഞടയ്ക്കുക",
					},
					no_available_slots: {
						en: "No available slots for the selected date.",
						ar: "لا توجد مواعيد متاحة في التاريخ المحدد.",
						ml: "തിരഞ്ഞെടുത്ത തീയതിയിൽ പ്രാപ്യമായ സ്ലോട്ടുകൾ ഇല്ല.",
					},
					confirm_booking: {
						en: "Confirm Booking",
						ar: "تأكيد الحجز",
						ml: "ബുക്കിംഗ് സ്ഥിരീകരിക്കുക",
					},
				},
				r = l({ label: "", value: "" }),
				_ = l({ label: "", value: "" }),
				z = l([]),
				B = l(null),
				p = l([]),
				q = l(localStorage.getItem("patient_name") || ""),
				R = l(localStorage.getItem("patient_id") || ""),
				m = l(new Date().toLocaleDateString("en-CA")),
				u = l(!1),
				L = l(!1),
				s = l(""),
				Q = l(null),
				h = l(""),
				P = l(""),
				C = l(""),
				V = l(""),
				D = l(""),
				b = l(""),
				y = l(null),
				x = l(""),
				A = l(""),
				k = l(""),
				w = l(""),
				T = l(""),
				X = l([]),
				U = l({}),
				j = l([]),
				F = l(null),
				se = l(!1),
				E = l(!1),
				Z = l("");
			g({
				url: "/api/method/marley_frontend.api.get_logo_image",
				method: "GET",
				makeParams() {
					return {};
				},
				onSuccess(t) {
					t
						? (Z.value = t)
						: (Z.value =
								"https://raw.githubusercontent.com/frappe/healthcare/develop/healthcare/public/images/healthcare.svg");
				},
			}).fetch();
			const ee = new Date();
			ee.setHours(0, 0, 0, 0);
			const G = l(!1);
			function K() {
				G.value = window.innerHeight > window.innerWidth;
			}
			ge(() => {
				K(), window.addEventListener("resize", K);
			}),
				ve(() => {
					window.removeEventListener("resize", K);
				}),
				Y(m, t => {
					t &&
						new Date(t) < ee &&
						((m.value = null),
						(s = "Past dates are not allowed. Please select a valid date."),
						(u.value = !0)),
						M();
				}),
				Y(r, t => {
					t || (j.value = []), M();
				});
			const { fetch: te } = g({
				url: "/api/method/marley_frontend.api.get_departments",
				method: "GET",
				onSuccess(t) {
					console.log(t),
						(z.value = t.practitioners),
						(p.value = t.departments),
						(B.value = t.defAppType);
				},
				onError: t => {
					(s = "Failed to load data. Please contact the System Manager."),
						(u.value = !0),
						(h = `Dialog: ${s}
Error:${t.message}`),
						$.submit();
				},
			});
			te(),
				Y(_, t => {
					t != null ? ((_.value = t || null), ne.fetch()) : te();
				});
			let ne = g({
					url: "/api/method/marley_frontend.api.get_practitioners",
					method: "GET",
					makeParams() {
						var t;
						return {
							department:
								((t = _.value) == null ? void 0 : t.value) || null,
						};
					},
					onSuccess(t) {
						z.value = t.practitioners;
					},
					onError(t) {
						(s =
							"Failed to load practitioners department-wise. Please contact the System Manager."),
							(u.value = !0),
							(h = `Dialog: ${s}
Error:${t.message}`),
							$.submit();
					},
				}),
				$ = g({
					url: "/api/method/marley_frontend.api.new_error_log",
					method: "POST",
					makeParams() {
						return {
							error_message: h,
							error_title: "Kiosk Screen: Appointment",
						};
					},
				});
			g({
				url: "/api/method/marley_frontend.api.check_patient_details",
				method: "GET",
				makeParams() {
					return { patient_id: R.value };
				},
				onSuccess(t) {
					t == "complete"
						? M()
						: ((P.value = t.first_name || ""),
						  (C.value = t.last_name || ""),
						  (V.value = t.mobile || ""),
						  (D.value = t.gender || ""),
						  (y.value = t.dob || null),
						  (x.value = t.address1 || ""),
						  (A.value = t.address2 || ""),
						  (k.value = t.city || ""),
						  (w.value = t.state || ""),
						  (T.value = t.zip || ""),
						  (b.value = t.marital || ""),
						  ie.fetch(),
						  (L.value = !0));
				},
				onError(t) {
					(s = `API Error: ${t.message}`),
						(u.value = !0),
						(h = `Dialog: ${s}
Error:${t.message}`),
						$.submit();
				},
			});
			let ie = g({
					url: "/api/method/marley_frontend.api.get_gender",
					method: "GET",
					onSuccess(t) {
						X.value = t.genders.map(o => ({
							label: o.label,
							value: o.value,
						}));
					},
					onError(t) {
						(s =
							"Unable to fetch from get_gender API. Contact System Manager"),
							(u.value = !0),
							(h = `Dialog: ${s}
${t.message}`),
							$.submit();
					},
				}),
				me = g({
					url: "/api/method/marley_frontend.api.update_patient",
					method: "POST",
					makeParams() {
						return {
							patient_id: R.value,
							firstname: P.value,
							lastname: C.value,
							mobile: V.value,
							gender: D.value,
							dob: y.value,
							address1: x.value,
							address2: A.value,
							city: k.value,
							state: w.value,
							zip: T.value,
							marital: b.value,
						};
					},
					onError(t) {
						(s = "API Error"),
							(u.value = !0),
							(h = `Dialog: ${s}
Error:${t.message}`),
							$.submit();
					},
				});
			const ue = () => {
					(U.value = {}),
						!b.value || !y.value || !x.value || !k.value || !w.value
							? (x.value ||
									(U.value.form_addressLine1 =
										"This field is required."),
							  k.value ||
									(U.value.form_city = "This field is required."),
							  w.value ||
									(U.value.form_state = "This field is required."),
							  b.value ||
									(U.value.form_marital = "This field is required."),
							  y.value || (U.value.form_dob = "This field is required."))
							: ((L.value = !1), me.submit(), M());
				},
				M = () =>
					W(this, null, function* () {
						var o;
						const t = g({
							url: "/api/method/marley_frontend.api.get_slots",
							method: "GET",
							params: {
								date: m.value,
								practitioner:
									((o = r.value) == null ? void 0 : o.value) || null,
							},
							onSuccess(c) {
								(se.value = !0), (j.value = c.slots || []);
							},
							onError(c) {
								(s = "Failed to fetch slots. Contact System Manager"),
									(u.value = !0),
									(h = h =
										`Dialog: ${s}
Error:${c.message}`),
									$.submit();
							},
						});
						try {
							(E.value = !0), m.value && r.value && (yield t.submit());
						} catch (c) {
							console.error("Error fetching slots:", c);
						} finally {
							E.value = !1;
						}
					}),
				de = t => {
					F.value = t;
				},
				ce = () =>
					W(this, null, function* () {
						const t = g({
							url: "/api/method/marley_frontend.api.patient_appointment",
							method: "POST",
							makeParams() {
								var o;
								return {
									practitioner:
										((o = r.value) == null ? void 0 : o.value) ||
										null,
									patient: R.value,
									date: m.value,
									slot: F.value,
								};
							},
							onSuccess(o) {
								var c;
								localStorage.setItem("booking_date", m.value),
									o.is_billable && o.payment_required
										? I.push({
												name: "Payment",
												query: {
													practitioner:
														((c = r.value) == null
															? void 0
															: c.value) || null,
													appointment: o.appointment || "",
												},
										  })
										: I.push({ name: "BookingSuccess", query: {} });
							},
						});
						try {
							(E.value = !0), yield t.submit();
						} catch (o) {
							o.message.includes("OverlapError")
								? ((s = "You have another booking at this slot"),
								  (Q = "Already Booked"),
								  (u.value = !0))
								: ((s = "APIError: Contact System Manager"),
								  (u.value = !0));
						} finally {
							E.value = !1;
						}
					}),
				fe = t => {
					(i.value = t), localStorage.setItem("selectedLanguage", t);
				};
			return (t, o) => {
				const c = ye("Button");
				return (
					S(),
					N(
						ae,
						null,
						[
							d("div", Ce, [
								d("div", Ve, [v(Le)]),
								v(
									Ue,
									{ selectedLanguage: e(i), onChangeLanguage: fe },
									null,
									8,
									["selectedLanguage"]
								),
								d("div", De, [
									d(
										"div",
										{
											class: H([
												"w-[80%] h-[80vh] flex gap-4 items-center justify-center",
												{
													"flex-col":
														G.value ||
														!(e(r).value && e(m)),
													"flex-row":
														e(r).value && e(m) && !G.value,
												},
											]),
										},
										[
											d(
												"div",
												{
													class: H([
														"relative bg-white p-6 rounded-2xl shadow-xl border border-gray-300 flex flex-col justify-center w-full max-w-[800px] mx-auto",
														e(r).value && e(m) && !G.value
															? "w-1/2 max-h-auto min-h-[600px]"
															: "min-h-[600px]",
													]),
												},
												[
													d("div", Ae, [
														v(e(we), {
															items: [
																{
																	label: "Home",
																	route: {
																		name: "Home",
																	},
																},
																{
																	label: "Confirm Booking",
																	route: "/Booking_confirmation",
																},
																{
																	label: "Book Appointment",
																	route: "/Appointment",
																},
															],
															class: "flex flex-wrap items-center text-sm text-gray-600 space-x-1 sm:space-x-2 overflow-x-auto whitespace-nowrap",
														}),
													]),
													d(
														"div",
														Te,
														" Hello " + O(e(q)) + "! ",
														1
													),
													d(
														"h1",
														$e,
														O(e(f).newAppointment[e(i)]),
														1
													),
													d("div", Ne, [
														v(
															e(re),
															{
																type: "autocomplete",
																options: e(p),
																modelValue: e(_),
																"onUpdate:modelValue":
																	o[0] ||
																	(o[0] = a =>
																		n(_)
																			? (_.value =
																					a)
																			: (_ = a)),
																label: e(f)
																	.selectDepartment[
																	e(i)
																],
																size: "md",
															},
															null,
															8,
															[
																"options",
																"modelValue",
																"label",
															]
														),
														v(
															e(re),
															{
																type: "autocomplete",
																options: e(z),
																modelValue: e(r),
																"onUpdate:modelValue":
																	o[1] ||
																	(o[1] = a =>
																		n(r)
																			? (r.value =
																					a)
																			: (r = a)),
																label: e(f)
																	.selectPractitioner[
																	e(i)
																],
																required: !0,
																size: "md",
															},
															null,
															8,
															[
																"options",
																"modelValue",
																"label",
															]
														),
														v(
															e(Se),
															{
																modelValue: e(m),
																"onUpdate:modelValue":
																	o[2] ||
																	(o[2] = a =>
																		n(m)
																			? (m.value =
																					a)
																			: (m = a)),
																variant: "subtle",
																placeholder:
																	e(f).pickDate[e(i)],
																disabled: !1,
																required: !0,
																label: e(f).pickDate[
																	e(i)
																],
															},
															null,
															8,
															[
																"modelValue",
																"placeholder",
																"label",
															]
														),
													]),
												],
												2
											),
											e(r).value && e(m)
												? (S(),
												  N("div", ze, [
														d(
															"h2",
															Be,
															O(e(f).choose_a_slot[e(i)]),
															1
														),
														e(E)
															? (S(),
															  N(
																	"div",
																	qe,
																	o[6] ||
																		(o[6] = [
																			d(
																				"div",
																				{
																					class: "spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full",
																					style: {
																						"border-top-color":
																							"black",
																					},
																					role: "status",
																				},
																				[
																					d(
																						"span",
																						{
																							class: "sr-only",
																						},
																						"Loading..."
																					),
																				],
																				-1
																			),
																		])
															  ))
															: e(j).length
															? (S(),
															  N("div", Oe, [
																	(S(!0),
																	N(
																		ae,
																		null,
																		he(
																			e(j),
																			(a, pe) => (
																				S(),
																				le(
																					c,
																					{
																						key: pe,
																						label: a,
																						class: H(
																							[
																								e(
																									F
																								) ===
																								a
																									? "!bg-gray-800 !text-white"
																									: "bg-gray-300 hover:!bg-gray-800 hover:!text-white",
																								"text-gray-700 font-semibold rounded-lg",
																							]
																						),
																						onClick:
																							Ge =>
																								de(
																									a
																								),
																					},
																					null,
																					8,
																					[
																						"label",
																						"class",
																						"onClick",
																					]
																				)
																			)
																		),
																		128
																	)),
															  ]))
															: (S(),
															  N(
																	"p",
																	Ie,
																	O(
																		e(f)
																			.no_available_slots[
																			e(i)
																		]
																	),
																	1
															  )),
														d("div", je, [
															e(F)
																? (S(),
																  le(
																		c,
																		{
																			key: 0,
																			loading:
																				e(E),
																			disabled:
																				e(E),
																			onClick: ce,
																			variant:
																				"solid",
																			ref_for: !0,
																			theme: "gray",
																			size: "lg",
																		},
																		{
																			default: be(
																				() => [
																					xe(
																						O(
																							e(
																								f
																							)
																								.confirm_booking[
																								e(
																									i
																								)
																							]
																						),
																						1
																					),
																				]
																			),
																			_: 1,
																		},
																		8,
																		[
																			"loading",
																			"disabled",
																		]
																  ))
																: oe("", !0),
														]),
												  ]))
												: oe("", !0),
										],
										2
									),
								]),
								v(Ee),
							]),
							v(
								e(ke),
								{
									options: {
										title: e(Q) || "Error",
										message: `${e(s)}`,
										size: "xl",
										icon: {
											name: "alert-triangle",
											appearance: "warning",
										},
										actions: [{ label: "OK", variant: "solid" }],
									},
									modelValue: e(u),
									"onUpdate:modelValue":
										o[3] ||
										(o[3] = a => (n(u) ? (u.value = a) : (u = a))),
									onClick: o[4] || (o[4] = a => (e(u).value = !1)),
								},
								null,
								8,
								["options", "modelValue"]
							),
							v(
								Pe,
								{
									modelValue: e(L),
									"onUpdate:modelValue":
										o[5] ||
										(o[5] = a => (n(L) ? (L.value = a) : (L = a))),
									form_firstName: e(P),
									"onUpdate:form_firstName": a =>
										n(P) ? (P.value = a) : (P = a),
									form_lastName: e(C),
									"onUpdate:form_lastName": a =>
										n(C) ? (C.value = a) : (C = a),
									form_gender: e(D),
									"onUpdate:form_gender": a =>
										n(D) ? (D.value = a) : (D = a),
									form_dob: e(y),
									"onUpdate:form_dob": a =>
										n(y) ? (y.value = a) : (y = a),
									form_marital: e(b),
									"onUpdate:form_marital": a =>
										n(b) ? (b.value = a) : (b = a),
									form_mobile: e(V),
									"onUpdate:form_mobile": a =>
										n(V) ? (V.value = a) : (V = a),
									form_addressLine1: e(x),
									"onUpdate:form_addressLine1": a =>
										n(x) ? (x.value = a) : (x = a),
									form_addressLine2: e(A),
									"onUpdate:form_addressLine2": a =>
										n(A) ? (A.value = a) : (A = a),
									form_city: e(k),
									"onUpdate:form_city": a =>
										n(k) ? (k.value = a) : (k = a),
									form_state: e(w),
									"onUpdate:form_state": a =>
										n(w) ? (w.value = a) : (w = a),
									form_zip: e(T),
									"onUpdate:form_zip": a =>
										n(T) ? (T.value = a) : (T = a),
									errors: e(U),
									genderOptions: e(X),
									onConfirm: ue,
								},
								null,
								8,
								[
									"modelValue",
									"form_firstName",
									"onUpdate:form_firstName",
									"form_lastName",
									"onUpdate:form_lastName",
									"form_gender",
									"onUpdate:form_gender",
									"form_dob",
									"onUpdate:form_dob",
									"form_marital",
									"onUpdate:form_marital",
									"form_mobile",
									"onUpdate:form_mobile",
									"form_addressLine1",
									"onUpdate:form_addressLine1",
									"form_addressLine2",
									"onUpdate:form_addressLine2",
									"form_city",
									"onUpdate:form_city",
									"form_state",
									"onUpdate:form_state",
									"form_zip",
									"onUpdate:form_zip",
									"errors",
									"genderOptions",
								]
							),
						],
						64
					)
				);
			};
		},
	};
export { Ze as default };
//# sourceMappingURL=Appointment-b1d48af0.js.map
