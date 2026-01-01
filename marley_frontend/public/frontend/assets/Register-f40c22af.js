var se = (Y, g, V) =>
	new Promise((z, q) => {
		var U = d => {
				try {
					H(V.next(d));
				} catch (R) {
					q(R);
				}
			},
			x = d => {
				try {
					H(V.throw(d));
				} catch (R) {
					q(R);
				}
			},
			H = d => (d.done ? z(d.value) : Promise.resolve(d.value).then(U, x));
		H((V = V.apply(Y, g)).next());
	});
import {
	_ as ge,
	k as u,
	b as k,
	d as s,
	r as o,
	u as _e,
	c as Z,
	y as ie,
	z as be,
	e as r,
	f as e,
	t as oe,
	h as m,
	j as n,
	g as w,
	i as v,
	A as he,
	B as ye,
	C as J,
	s as c,
	p as f,
	D as Q,
	q as re,
	E as Ve,
	G as xe,
} from "./index-8ff34837.js";
import { _ as Ce } from "./Breadcrumbs.vue_vue_type_script_setup_true_lang-0e046fb8.js";
import { _ as we } from "./DatePicker.vue_vue_type_script_setup_true_lang-9ccf8b49.js";
import { D as ke } from "./Dropdown-007bc2e8.js";
import { L as ze } from "./LanguageSelector-1a79c90c.js";
import { F as qe } from "./Footer-f4f657d5.js";
import { _ as Ue } from "./BrandLogo-c420a0fa.js";
const Le = {},
	Se = {
		width: "20",
		height: "21",
		viewBox: "0 0 20 21",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
	};
function Te(Y, g) {
	return (
		u(),
		k(
			"svg",
			Se,
			g[0] ||
				(g[0] = [
					s(
						"path",
						{
							"fill-rule": "evenodd",
							"clip-rule": "evenodd",
							d: "M8.5 3.53906C8.02786 3.53906 7.58328 3.76135 7.3 4.13906L6.325 5.43906C6.04172 5.81677 5.59714 6.03906 5.125 6.03906H3.25C2.42157 6.03906 1.75 6.71064 1.75 7.53906V16.0391C1.75 16.8675 2.42157 17.5391 3.25 17.5391H16.75C17.5784 17.5391 18.25 16.8675 18.25 16.0391V7.53906C18.25 6.71064 17.5784 6.03906 16.75 6.03906H14.875C14.4029 6.03906 13.9583 5.81677 13.675 5.43906L12.7 4.13906C12.4167 3.76135 11.9721 3.53906 11.5 3.53906H8.5ZM6.5 3.53906C6.97214 2.90955 7.71311 2.53906 8.5 2.53906H11.5C12.2869 2.53906 13.0279 2.90955 13.5 3.53906L14.475 4.83906C14.5694 4.96497 14.7176 5.03906 14.875 5.03906H16.75C18.1307 5.03906 19.25 6.15835 19.25 7.53906V16.0391C19.25 17.4198 18.1307 18.5391 16.75 18.5391H3.25C1.86929 18.5391 0.75 17.4198 0.75 16.0391V7.53906C0.75 6.15835 1.86929 5.03906 3.25 5.03906H5.125C5.28238 5.03906 5.43057 4.96497 5.525 4.83906L6.5 3.53906ZM10 13.9141C11.5188 13.9141 12.75 12.6828 12.75 11.1641C12.75 9.64528 11.5188 8.41406 10 8.41406C8.48122 8.41406 7.25 9.64528 7.25 11.1641C7.25 12.6828 8.48122 13.9141 10 13.9141ZM10 14.9141C12.0711 14.9141 13.75 13.2351 13.75 11.1641C13.75 9.09299 12.0711 7.41406 10 7.41406C7.92893 7.41406 6.25 9.09299 6.25 11.1641C6.25 13.2351 7.92893 14.9141 10 14.9141ZM16.25 8.66406C16.5952 8.66406 16.875 8.38424 16.875 8.03906C16.875 7.69388 16.5952 7.41406 16.25 7.41406C15.9048 7.41406 15.625 7.69388 15.625 8.03906C15.625 8.38424 15.9048 8.66406 16.25 8.66406Z",
							fill: "currentColor",
						},
						null,
						-1
					),
				])
		)
	);
}
const De = ge(Le, [["render", Te]]),
	Ie = { class: "flex h-screen items-center justify-center bg-gray-100" },
	Pe = { class: "absolute top-4 left-4" },
	Ne = {
		class: "relative flex flex-col items-center justify-center space-y-4 p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-300 w-full min-w-md sm:max-w-lg md:max-w-2xl h-auto",
	},
	je = { class: "absolute top-4 left-4" },
	Me = { class: "font-bold text-lg text-center" },
	Be = { class: "grid grid-cols-3 gap-2" },
	Ee = { class: "p-1" },
	He = { class: "p-1" },
	Re = { class: "border-b" },
	Oe = { class: "flex flex-col items-center justify-center gap-4 p-5" },
	Ae = { class: "flex" },
	$e = { class: "flex-1 flex items-center justify-center" },
	Fe = ["src"],
	Ge = { class: "flex flex-col justify-center items-center gap-4 ml-4" },
	Ze = { class: "flex items-center truncate" },
	Ye = { class: "flex items-center truncate" },
	Ke = { class: "flex items-center truncate" },
	We = { class: "flex gap-4 items-center" },
	Je = { class: "group relative h-20 w-20" },
	Qe = {
		class: "z-1 absolute bottom-0 left-0 right-0 flex h-14 cursor-pointer items-center justify-center rounded-b-full bg-black bg-opacity-40 pt-5 opacity-0 duration-300 ease-in-out group-hover:opacity-100",
		style: {
			"-webkit-clip-path": "inset(22px 0 0 0)",
			"clip-path": "inset(22px 0 0 0)",
		},
	},
	Xe = { class: "p-1" },
	el = { class: "p-1" },
	ll = { class: "p-1" },
	al = { class: "p-1" },
	tl = { class: "p-1" },
	sl = { class: "p-1" },
	il = { key: 0, class: "p-1" },
	ol = { key: 1, class: "p-1" },
	rl = { class: "p-1" },
	ul = { class: "p-1" },
	nl = { class: "p-1" },
	dl = { class: "p-1" },
	ml = { class: "p-1" },
	cl = { class: "pt-6" },
	vl = { class: "flex justify-center mt-4" },
	fl = ["disabled"],
	pl = {
		key: 0,
		class: "absolute w-5 h-5 animate-spin text-white",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		viewBox: "0 0 24 24",
	},
	gl = { key: 1 },
	zl = {
		__name: "Register",
		setup(Y) {
			const g = o(""),
				V = o(""),
				z = o(""),
				q = o(""),
				U = o("");
			let x = o(null),
				H = o([]),
				d = o({ label: "India", value: "India" }),
				R = o([]);
			const ue = _e(),
				O = o(localStorage.getItem("patient_phone") || "");
			let L = o(!1),
				X = o(""),
				S = o(""),
				K = o(""),
				C = o(null),
				T = o(""),
				D = o(""),
				I = o(""),
				P = o(""),
				N = o(""),
				j = o(""),
				A = o(null),
				t = o({}),
				_ = o(""),
				ne = o(""),
				M = o(0),
				B = o(!1),
				ee = o("");
			Z({
				url: "/api/method/marley_frontend.api.get_logo_image",
				method: "GET",
				makeParams() {
					return {};
				},
				onSuccess(i) {
					i
						? (ee.value = i)
						: (ee.value =
								"https://raw.githubusercontent.com/frappe/healthcare/develop/healthcare/public/images/healthcare.svg");
				},
			}).fetch();
			const b = o(null),
				E = o(null),
				h = o(null);
			function le() {
				(h.value = null), (B.value = !0);
			}
			const ae = () =>
					se(this, null, function* () {
						try {
							const i = yield navigator.mediaDevices.getUserMedia({
								video: !0,
							});
							b.value && (b.value.srcObject = i);
						} catch (i) {
							console.error("Error starting camera:", i);
						}
					}),
				de = () => {
					const i = E.value.getContext("2d");
					(E.value.width = b.value.videoWidth),
						(E.value.height = b.value.videoHeight),
						i.drawImage(b.value, 0, 0, E.value.width, E.value.height),
						(h.value = E.value.toDataURL("image/png")),
						b.value.srcObject.getTracks().forEach(l => l.stop());
				};
			ie(B, i => {
				i && ae();
			}),
				ie(A, i => {
					if (i) {
						const l = new Date();
						let $ = l.getFullYear() - i - 1;
						const F = new Date($, l.getMonth(), l.getDate());
						C.value = F.toISOString().split("T")[0];
					}
				}),
				be(() => {
					b.value &&
						b.value.srcObject &&
						b.value.srcObject.getTracks().forEach(i => i.stop());
				});
			function me() {
				(h.value = null), ae();
			}
			function ce() {
				(_.value = h.value), (B.value = !1);
			}
			let G = Z({
				url: "/api/method/marley_frontend.api.patient_registration",
				method: "POST",
				makeParams() {
					return {
						first_name: g.value,
						last_name: V.value,
						email: z.value,
						gender: x.value,
						mobile: O.value,
						country: d.value ? d.value.value : "",
						aadhaar_number: q.value || "",
						passport_number: U.value || "",
						dob: C.value || "",
						marital: T.value || "",
						address1: D.value || "",
						city: I.value || "",
						state: N.value || "",
						address2: P.value || "",
						zip: j.value || "",
						file: _.value || null,
						invite_user: (M == null ? void 0 : M.value) || null,
					};
				},
				onSuccess(i) {
					i &&
						(localStorage.setItem("patient_name", `${g.value} ${V.value}`),
						localStorage.setItem("patient_phone", `${O.value}`),
						localStorage.setItem("patient_id", i.patient_id),
						(_.value = null),
						ue.push({ name: "Appointment" }));
				},
				onError(i) {
					var l;
					i.message.includes("UniqueValidationError")
						? (q.value &&
								(S =
									"Patient Registration failed. Aadhaar Number Duplication"),
						  U.value &&
								(S =
									"Patient Registration failed. Passport Number Duplication"))
						: ((S = ((l = i.messages) == null ? void 0 : l[0]) || i),
						  (X = "Patient Creation Failed"),
						  (K = `Dialog: ${S}.
 ${i.message}`),
						  te.submit()),
						(L.value = !0);
				},
			});
			const { fetch: ve } = Z({
				url: "/api/method/marley_frontend.api.get_gender",
				method: "GET",
				onSuccess(i) {
					(H.value = i.genders.map(l => ({
						label: l.label,
						value: l.value,
					}))),
						(R.value = i.countries.map(l => ({
							label: l.label,
							value: l.value,
						})));
				},
				onError(i) {
					(S = "Unable to fetch from get_gender API. Contact System Manager"),
						(L.value = !0),
						(K = `Dialog: ${S}
${i.message}`),
						te.submit();
				},
			});
			ve();
			let p = o(localStorage.getItem("selectedLanguage") || "en"),
				y = {
					register: {
						en: "Register Yourself",
						ar: "سجل نفسك",
						ml: "സ്വയം രജിസ്റ്റർ ചെയ്യുക",
					},
					firstName: {
						en: "First Name",
						ar: "الاسم الأول",
						ml: "പ്രഥമ നാമം",
					},
					lastName: { en: "Last Name", ar: "اسم العائلة", ml: "അവസാന നാമം" },
					email: { en: "Email", ar: "البريد الإلكتروني", ml: "ഇമെയിൽ" },
					mobile: { en: "Mobile", ar: "موبايل", ml: "മൊബൈല്" },
					selectGender: {
						en: "Select Gender",
						ar: "اختر الجنس",
						ml: "ലിംഗം തിരഞ്ഞെടുക്കുക",
					},
					submit: { en: "Submit", ar: "إرسال", ml: "സബ്മിറ്റ് ചെയ്യുക" },
					nation: { en: "Nationality", ar: "دولة", ml: "രാജ്യം" },
					aadhaar_number: {
						en: "Aadhaar Number",
						ar: "رقم آدار",
						ml: "ആധാർ നമ്പർ",
					},
					passport_number: {
						en: "Passport Number",
						ar: "رقم جواز السفر",
						ml: "പാസ്പോർട്ട് നമ്പർ",
					},
				},
				te = Z({
					url: "/api/method/marley_frontend.api.new_error_log",
					method: "POST",
					makeParams() {
						return {
							error_message: K,
							error_title: "Kiosk Screen: Register",
						};
					},
				});
			function fe() {
				(t.value = {}),
					!g.value ||
					!x.value ||
					!C.value ||
					!O.value ||
					!T.value ||
					!z.value ||
					!d.value ||
					!D.value ||
					!P.value ||
					!I.value ||
					!N.value ||
					!j
						? (g.value || (t.value.firstname = "This field is required."),
						  x.value || (t.value.gender = "This field is required."),
						  C.value || (t.value.dob = "This field is required."),
						  O.value || (t.value.mobile = "This field is required."),
						  T.value ||
								(t.value.marital_status = "This field is required."),
						  z.value || (t.value.email = "This field is required."),
						  d.value
								? d.value != "India" &&
								  (U.value ||
										(t.value.passport_number =
											"This field is required."))
								: (t.value.country = "This field is required."),
						  D.value || (t.value.addressLine1 = "This field is required."),
						  P.value || (t.value.addressLine2 = "This field is required."),
						  I.value || (t.value.city = "This field is required."),
						  N.value || (t.value.state = "This field is required."),
						  j.value || (t.value.zip = "This field is required."))
						: G.submit();
			}
			const pe = i => {
				(p.value = i), localStorage.setItem("selectedLanguage", i);
			};
			return (i, l) => {
				const $ = J("FeatherIcon"),
					F = J("Tooltip"),
					W = J("Button");
				return (
					u(),
					k("div", Ie, [
						s("div", Pe, [r(Ue)]),
						r(
							ze,
							{ selectedLanguage: e(p), onChangeLanguage: pe },
							null,
							8,
							["selectedLanguage"]
						),
						s("div", Ne, [
							s("div", je, [
								r(e(Ce), {
									items: [
										{ label: "Home", route: { name: "Home" } },
										{ label: "Register", route: "/Register" },
									],
								}),
							]),
							s("h1", Me, oe(e(y).register[e(p)]), 1),
							s("div", Be, [
								s("div", Ee, [
									r(
										e(c),
										{
											type: "text",
											ref_for: !0,
											size: "sm",
											variant: "subtle",
											label: e(y).firstName[e(p)],
											required: !0,
											disabled: !1,
											modelValue: g.value,
											"onUpdate:modelValue":
												l[0] || (l[0] = a => (g.value = a)),
											class: "w-full",
										},
										null,
										8,
										["label", "modelValue"]
									),
									e(t).firstname
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).firstname },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", He, [
									r(
										e(c),
										{
											type: "text",
											ref_for: !0,
											size: "sm",
											variant: "subtle",
											label: e(y).lastName[e(p)],
											disabled: !1,
											modelValue: V.value,
											"onUpdate:modelValue":
												l[1] || (l[1] = a => (V.value = a)),
											class: "w-full",
										},
										null,
										8,
										["label", "modelValue"]
									),
								]),
								s("div", Re, [
									s("div", Oe, [
										r(
											e(re),
											{
												modelValue: e(B),
												"onUpdate:modelValue":
													l[2] ||
													(l[2] = a =>
														v(B) ? (B.value = a) : (B = a)),
												options: {
													title: "Upload Your Photo",
													size: "4xl",
												},
											},
											{
												"body-content": w(() => [
													s("div", Ae, [
														s("div", $e, [
															h.value
																? n("", !0)
																: (u(),
																  k(
																		"video",
																		{
																			key: 0,
																			ref_key:
																				"video",
																			ref: b,
																			autoplay:
																				"",
																		},
																		null,
																		512
																  )),
															s(
																"canvas",
																{
																	ref_key: "canvas",
																	ref: E,
																	style: {
																		display: "none",
																	},
																},
																null,
																512
															),
															h.value
																? (u(),
																  k(
																		"img",
																		{
																			key: 1,
																			src: h.value,
																		},
																		null,
																		8,
																		Fe
																  ))
																: n("", !0),
														]),
														s("div", Ge, [
															h.value
																? n("", !0)
																: (u(),
																  m(
																		W,
																		{
																			key: 0,
																			ref_for: !0,
																			theme: "gray",
																			size: "xl",
																			label: "take_photo",
																			disabled:
																				!1,
																			onClick: de,
																		},
																		{
																			default: w(
																				() => [
																					s(
																						"div",
																						Ze,
																						[
																							r(
																								F,
																								{
																									text: "Capture Photo",
																									placement:
																										"top",
																								},
																								{
																									default:
																										w(
																											() => [
																												Q(
																													i.$slots,
																													"icon",
																													{},
																													() => [
																														r(
																															$,
																															{
																																name: "camera",
																																class: "size-7 text-ink-gray-7",
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
																			_: 3,
																		}
																  )),
															h.value
																? (u(),
																  m(
																		W,
																		{
																			key: 1,
																			ref_for: !0,
																			theme: "gray",
																			size: "xl",
																			label: "confirm_photo",
																			disabled:
																				!1,
																			onClick: ce,
																		},
																		{
																			default: w(
																				() => [
																					s(
																						"div",
																						Ye,
																						[
																							r(
																								F,
																								{
																									text: "Confirm",
																									placement:
																										"top",
																								},
																								{
																									default:
																										w(
																											() => [
																												Q(
																													i.$slots,
																													"icon",
																													{},
																													() => [
																														r(
																															$,
																															{
																																name: "check",
																																class: "size-7 text-ink-gray-7",
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
																			_: 3,
																		}
																  ))
																: n("", !0),
															h.value
																? (u(),
																  m(
																		W,
																		{
																			key: 2,
																			ref_for: !0,
																			theme: "gray",
																			size: "xl",
																			label: "retake_photo",
																			disabled:
																				!1,
																			onClick: me,
																		},
																		{
																			default: w(
																				() => [
																					s(
																						"div",
																						Ke,
																						[
																							r(
																								F,
																								{
																									text: "Change Photo",
																									placement:
																										"top",
																								},
																								{
																									default:
																										w(
																											() => [
																												Q(
																													i.$slots,
																													"icon",
																													{},
																													() => [
																														r(
																															$,
																															{
																																name: "refresh-cw",
																																class: "size-7 text-ink-gray-7",
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
																			_: 3,
																		}
																  ))
																: n("", !0),
														]),
													]),
												]),
												_: 3,
											},
											8,
											["modelValue"]
										),
										s("div", We, [
											s("div", Je, [
												r(
													e(Ve),
													{
														size: "6xl",
														class: "h-20 w-20",
														label: "User",
														image: e(_) || e(ne).value,
													},
													null,
													8,
													["image"]
												),
												(u(),
												m(
													ye(e(_) ? e(ke) : "div"),
													he(
														e(_)
															? {
																	options: [
																		{
																			icon: "upload",
																			label: e(_)
																				? "Change image"
																				: "Upload image",
																			onClick:
																				() =>
																					le(),
																		},
																		{
																			icon: "trash-2",
																			label: "Remove image",
																			onClick:
																				() => {
																					v(_)
																						? (_.value =
																								null)
																						: (_ =
																								null);
																				},
																		},
																	],
															  }
															: { onClick: () => le() },
														{
															class: "!absolute bottom-0 left-0 right-0",
														}
													),
													{
														default: w(() => [
															s("div", Qe, [
																r(De, {
																	class: "h-6 w-6 cursor-pointer text-white",
																}),
															]),
														]),
														_: 1,
													},
													16
												)),
											]),
										]),
									]),
								]),
								s("div", Xe, [
									r(
										e(c),
										{
											type: "select",
											options: e(H),
											size: "sm",
											variant: "subtle",
											label: e(y).selectGender[e(p)],
											required: !0,
											disabled: !1,
											modelValue: e(x),
											"onUpdate:modelValue":
												l[3] ||
												(l[3] = a =>
													v(x) ? (x.value = a) : (x = a)),
											class: "w-full",
										},
										null,
										8,
										["options", "label", "modelValue"]
									),
									e(t).gender
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).gender },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", el, [
									r(
										e(c),
										{
											type: "number",
											modelValue: e(A),
											"onUpdate:modelValue":
												l[4] ||
												(l[4] = a =>
													v(A) ? (A.value = a) : (A = a)),
											label: "Age",
										},
										null,
										8,
										["modelValue"]
									),
								]),
								s("div", null, [
									r(
										e(we),
										{
											modelValue: e(C),
											"onUpdate:modelValue":
												l[5] ||
												(l[5] = a =>
													v(C) ? (C.value = a) : (C = a)),
											variant: "subtle",
											placeholder: "Date of Birth",
											disabled: !1,
											required: !0,
											label: "Date of Birth",
										},
										null,
										8,
										["modelValue"]
									),
									e(t).dob
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).dob },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", ll, [
									r(
										e(c),
										{
											type: "text",
											ref_for: !0,
											size: "sm",
											variant: "subtle",
											label: e(y).mobile[e(p)],
											required: !0,
											disabled: !1,
											modelValue: O.value,
											"onUpdate:modelValue":
												l[6] || (l[6] = a => (O.value = a)),
											class: "w-full",
										},
										null,
										8,
										["label", "modelValue"]
									),
									e(t).mobile
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).mobile },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", al, [
									r(
										e(c),
										{
											type: "select",
											options: [
												"Single",
												"Married",
												"Divorced",
												"Widow",
											],
											modelValue: e(T),
											"onUpdate:modelValue":
												l[7] ||
												(l[7] = a =>
													v(T) ? (T.value = a) : (T = a)),
											label: "Marital Status",
											size: "sm",
											disabled: !1,
											required: !0,
											class: "w-full",
										},
										null,
										8,
										["modelValue"]
									),
									e(t).marital_status
										? (u(),
										  m(
												e(f),
												{
													key: 0,
													message: e(t).marital_status,
												},
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", tl, [
									r(
										e(c),
										{
											type: "email",
											ref_for: !0,
											size: "sm",
											variant: "subtle",
											label: e(y).email[e(p)],
											disabled: !1,
											modelValue: z.value,
											"onUpdate:modelValue":
												l[8] || (l[8] = a => (z.value = a)),
											required: !0,
											class: "w-full",
										},
										null,
										8,
										["label", "modelValue"]
									),
									e(t).email
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).email },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", sl, [
									r(
										e(c),
										{
											type: "autocomplete",
											options: e(R),
											size: "sm",
											variant: "subtle",
											label: e(y).nation[e(p)],
											disabled: !1,
											required: !0,
											modelValue: e(d),
											"onUpdate:modelValue":
												l[9] ||
												(l[9] = a =>
													v(d) ? (d.value = a) : (d = a)),
											class: "w-full",
										},
										null,
										8,
										["options", "label", "modelValue"]
									),
									e(t).country
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).country },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								e(d).value === "India"
									? (u(),
									  k("div", il, [
											r(
												e(c),
												{
													type: "text",
													ref_for: !0,
													size: "sm",
													variant: "subtle",
													label: e(y).aadhaar_number[e(p)],
													disabled: !1,
													modelValue: q.value,
													"onUpdate:modelValue":
														l[10] ||
														(l[10] = a => (q.value = a)),
													class: "w-full",
												},
												null,
												8,
												["label", "modelValue"]
											),
									  ]))
									: (u(),
									  k("div", ol, [
											r(
												e(c),
												{
													type: "text",
													ref_for: !0,
													size: "sm",
													variant: "subtle",
													label: e(y).passport_number[e(p)],
													required: !0,
													disabled: !1,
													modelValue: U.value,
													"onUpdate:modelValue":
														l[11] ||
														(l[11] = a => (U.value = a)),
													class: "w-full",
												},
												null,
												8,
												["label", "modelValue"]
											),
											e(t).passport_number
												? (u(),
												  m(
														e(f),
														{
															key: 0,
															message:
																e(t).passport_number,
														},
														null,
														8,
														["message"]
												  ))
												: n("", !0),
									  ])),
								s("div", rl, [
									r(
										e(c),
										{
											label: "Address Line 1",
											modelValue: e(D),
											"onUpdate:modelValue":
												l[12] ||
												(l[12] = a =>
													v(D) ? (D.value = a) : (D = a)),
											type: "text",
											size: "sm",
											variant: "subtle",
											disabled: !1,
											required: !0,
											class: "w-full",
										},
										null,
										8,
										["modelValue"]
									),
									e(t).addressLine1
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).addressLine1 },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", ul, [
									r(
										e(c),
										{
											label: "Address Line 2",
											modelValue: e(P),
											"onUpdate:modelValue":
												l[13] ||
												(l[13] = a =>
													v(P) ? (P.value = a) : (P = a)),
											type: "text",
											size: "sm",
											variant: "subtle",
											disabled: !1,
											required: !0,
											class: "w-full",
										},
										null,
										8,
										["modelValue"]
									),
									e(t).addressLine2
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).addressLine2 },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", nl, [
									r(
										e(c),
										{
											label: "City/District",
											modelValue: e(I),
											"onUpdate:modelValue":
												l[14] ||
												(l[14] = a =>
													v(I) ? (I.value = a) : (I = a)),
											type: "text",
											size: "sm",
											variant: "subtle",
											disabled: !1,
											required: !0,
											class: "w-full",
										},
										null,
										8,
										["modelValue"]
									),
									e(t).city
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).city },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", dl, [
									r(
										e(c),
										{
											label: "State/Province",
											modelValue: e(N),
											"onUpdate:modelValue":
												l[15] ||
												(l[15] = a =>
													v(N) ? (N.value = a) : (N = a)),
											type: "text",
											size: "sm",
											variant: "subtle",
											disabled: !1,
											required: !0,
											class: "w-full",
										},
										null,
										8,
										["modelValue"]
									),
									e(t).state
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).state },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", ml, [
									r(
										e(c),
										{
											label: "ZIP Code",
											modelValue: e(j),
											"onUpdate:modelValue":
												l[16] ||
												(l[16] = a =>
													v(j) ? (j.value = a) : (j = a)),
											type: "text",
											size: "sm",
											variant: "subtle",
											disabled: !1,
											required: !0,
											class: "w-full",
										},
										null,
										8,
										["modelValue"]
									),
									e(t).zip
										? (u(),
										  m(
												e(f),
												{ key: 0, message: e(t).zip },
												null,
												8,
												["message"]
										  ))
										: n("", !0),
								]),
								s("div", cl, [
									r(
										e(xe),
										{
											size: "sm",
											value: !0,
											modelValue: e(M),
											"onUpdate:modelValue":
												l[17] ||
												(l[17] = a =>
													v(M) ? (M.value = a) : (M = a)),
											label: "Invite as a User",
										},
										null,
										8,
										["modelValue"]
									),
								]),
							]),
							s("div", vl, [
								s(
									"button",
									{
										onClick: fe,
										disabled: e(G).loading,
										class: "px-4 py-2 bg-black text-white rounded-lg sm:w-auto flex items-center justify-center relative focus:ring-2 focus:ring-[#b3bf79]",
										style: {
											"min-width": "100px",
											"min-height": "45px",
										},
									},
									[
										e(G).loading
											? (u(),
											  k(
													"svg",
													pl,
													l[20] ||
														(l[20] = [
															s(
																"circle",
																{
																	class: "opacity-25",
																	cx: "12",
																	cy: "12",
																	r: "10",
																	stroke: "currentColor",
																	"stroke-width": "4",
																},
																null,
																-1
															),
															s(
																"path",
																{
																	class: "opacity-75",
																	fill: "currentColor",
																	d: "M4 12a8 8 0 018-8v8H4z",
																},
																null,
																-1
															),
														])
											  ))
											: n("", !0),
										e(G).loading
											? n("", !0)
											: (u(),
											  k("span", gl, oe(e(y).submit[e(p)]), 1)),
									],
									8,
									fl
								),
							]),
						]),
						r(qe),
						r(
							e(re),
							{
								options: {
									title: e(X) || "Message",
									message:
										`${e(S)}` || "Error in Fetching Appointments",
									size: "xl",
									icon: {
										name: "alert-triangle",
										appearance: "warning",
									},
									actions: [{ label: "OK", variant: "solid" }],
								},
								modelValue: e(L),
								"onUpdate:modelValue":
									l[18] ||
									(l[18] = a => (v(L) ? (L.value = a) : (L = a))),
								onClick: l[19] || (l[19] = a => (e(L).value = !1)),
							},
							null,
							8,
							["options", "modelValue"]
						),
					])
				);
			};
		},
	};
export { zl as default };
//# sourceMappingURL=Register-f40c22af.js.map
