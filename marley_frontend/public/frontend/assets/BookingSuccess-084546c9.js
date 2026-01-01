import {
	u as P,
	H as j,
	r as o,
	c as V,
	o as N,
	b as A,
	d as l,
	e as s,
	f as t,
	t as d,
	g as k,
	j as v,
	h as L,
	i as w,
	C as R,
	k as f,
	l as b,
	q as T,
} from "./index-8ff34837.js";
import { _ as q } from "./Breadcrumbs.vue_vue_type_script_setup_true_lang-0e046fb8.js";
import { L as O } from "./LanguageSelector-1a79c90c.js";
import { F } from "./Footer-f4f657d5.js";
import { _ as G } from "./BrandLogo-c420a0fa.js";
import "./Dropdown-007bc2e8.js";
const K = "/assets/marley_frontend/frontend/assets/Success-61ea19c5.png",
	U = { class: "flex h-screen items-center justify-center bg-gray-100" },
	J = { class: "absolute top-4 left-4" },
	Q = {
		class: "relative flex flex-col items-center justify-center space-y-6 p-10 bg-white rounded-xl shadow-xl border border-gray-300 w-[800px] min-h-[600px] max-h-[600px]",
	},
	W = { class: "absolute top-4 left-4" },
	X = { class: "text-2xl font-bold text-center" },
	Y = { class: "text-sm text-gray-600 text-center" },
	Z = { key: 0, class: "flex space-x-2" },
	ee = { class: "flex space-x-2" },
	ce = {
		__name: "BookingSuccess",
		setup(te) {
			const m = P(),
				$ = j(),
				p = {
					en: {
						appointmentBooked: "Appointment Booked",
						appointmentBookedMessage:
							"The Appointment has been successfully booked.",
						checkIn: "Check In",
						leave: "I'm Done",
						book: "Book another Appointment",
					},
					ar: {
						appointmentBooked: "تم حجز الموعد",
						appointmentBookedMessage: "تم حجز الموعد بنجاح.",
						checkIn: "حجز موعد آخر",
						leave: "مغادرة",
						book: "حجز موعد آخر",
					},
					ml: {
						appointmentBooked: "അപ്പോയിന്റ് ബുക്ക് ചെയ്തു",
						appointmentBookedMessage:
							"അപ്പോയിന്റ് വിജയകരമായി ബുക്ക് ചെയ്യപ്പെട്ടു.",
						checkIn: "ചെക്ക് - ഇൻ",
						leave: "തിരിച്ച് പോവുക",
						book: "മറ്റൊരു അപ്പോയിൻ്റ്മെൻ്റ് ബുക്ക് ചെയ്യുക",
					},
				},
				n = o(localStorage.getItem("selectedLanguage") || "en");
			let x = o(localStorage.getItem("patient_id") || ""),
				r = o(!1),
				i = o(!1),
				c = o(""),
				u = o(""),
				y = o(!0),
				B = o(""),
				S = o(""),
				_ = $.query.from_checkin || null,
				I = o(!1),
				C = o("");
			V({
				url: "/api/method/marley_frontend.api.get_logo_image",
				method: "GET",
				makeParams() {
					return {};
				},
				onSuccess(a) {
					a
						? (C.value = a)
						: (C.value =
								"https://raw.githubusercontent.com/frappe/healthcare/develop/healthcare/public/images/healthcare.svg");
				},
			}).fetch(),
				N(() => {
					const a = new Date().toISOString().split("T")[0];
					localStorage.getItem("booking_date") === a && (I.value = !0);
				});
			const E = a => {
				(n.value = a), localStorage.setItem("selectedLanguage", a);
			};
			function H() {
				localStorage.clear(), m.push({ name: "Home" });
			}
			function M() {
				m.push("Appointment");
			}
			function z() {
				x.value &&
					V({
						url: "/api/method/marley_frontend.api.check_appointment",
						method: "GET",
						makeParams() {
							return { patient_id: x.value };
						},
						onSuccess(e) {
							localStorage.clear("booking_date"),
								e.message
									? ((c = `${e.message}`),
									  (u = "Message"),
									  (r.value = !0))
									: e.alert
									? ((c = e.alert), (u = "Alert"), (i.value = !0))
									: e.route &&
									  ((y = !1),
									  (B = e.practitioner),
									  (S = e.appointment),
									  (c = e.payment_message),
									  (u = "Complete Payment"),
									  (r.value = !0));
						},
						onError(e) {
							(c = `APIError: ${e.message}`),
								(u = "Error"),
								(i.value = !0);
						},
					}).fetch();
			}
			function D() {
				y
					? (localStorage.clear(),
					  _ ? m.push({ name: "Checkin" }) : m.push({ name: "Home" }))
					: m.push({
							name: "Payment",
							query: { practitioner: B, appointment: S },
					  });
			}
			return (a, e) => {
				const h = R("Button");
				return (
					f(),
					A("div", U, [
						l("div", J, [s(G)]),
						s(
							O,
							{ selectedLanguage: n.value, onChangeLanguage: E },
							null,
							8,
							["selectedLanguage"]
						),
						l("div", Q, [
							l("div", W, [
								s(t(q), {
									items: [
										{ label: "Home", route: { name: "Home" } },
										{
											label: "Book Appointment",
											route: "/Appointment",
										},
										{ label: "Success", route: "/BookingSuccess" },
									],
								}),
							]),
							e[2] ||
								(e[2] = l(
									"img",
									{
										src: K,
										alt: "Success Icon",
										class: "h-24 w-24 object-contain",
									},
									null,
									-1
								)),
							l("p", X, d(p[n.value].appointmentBooked), 1),
							l("p", Y, d(p[n.value].appointmentBookedMessage), 1),
							t(_)
								? v("", !0)
								: (f(),
								  A("div", Z, [
										s(
											h,
											{
												onClick: M,
												variant: "solid",
												ref_for: !0,
												theme: "gray",
												size: "lg",
											},
											{
												default: k(() => [
													b(d(p[n.value].book), 1),
												]),
												_: 1,
											}
										),
								  ])),
							l("div", ee, [
								t(I)
									? (f(),
									  L(
											h,
											{
												key: 0,
												onClick: z,
												variant: "subtle",
												ref_for: !0,
												theme: "gray",
												size: "lg",
											},
											{
												default: k(() => [
													b(d(p[n.value].checkIn), 1),
												]),
												_: 1,
											}
									  ))
									: v("", !0),
								t(_)
									? v("", !0)
									: (f(),
									  L(
											h,
											{
												key: 1,
												onClick: H,
												variant: "subtle",
												ref_for: !0,
												theme: "gray",
												size: "lg",
											},
											{
												default: k(() => [
													b(d(p[n.value].leave), 1),
												]),
												_: 1,
											}
									  )),
							]),
						]),
						s(F),
						s(
							t(T),
							{
								options: {
									title: `${t(u)}`,
									message: `${t(c)}`,
									size: "xl",
									icon: { name: "check", appearance: "success" },
									actions: [
										{
											label: "OK",
											variant: "solid",
											onClick: () => {
												D();
											},
										},
									],
								},
								modelValue: t(r),
								"onUpdate:modelValue":
									e[0] ||
									(e[0] = g => (w(r) ? (r.value = g) : (r = g))),
							},
							null,
							8,
							["options", "modelValue"]
						),
						s(
							t(T),
							{
								options: {
									title: `${t(u)}`,
									message: `${t(c)}`,
									size: "xl",
									icon: {
										name: "alert-triangle",
										appearance: "warning",
									},
									actions: [{ label: "OK", variant: "solid" }],
								},
								modelValue: t(i),
								"onUpdate:modelValue":
									e[1] ||
									(e[1] = g => (w(i) ? (i.value = g) : (i = g))),
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
export { ce as default };
//# sourceMappingURL=BookingSuccess-084546c9.js.map
