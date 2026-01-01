import { r as o, c as t, k as c, b as s, d as r } from "./index-8ff34837.js";
const l = { class: "w-10 h-10" },
	n = ["src"],
	m = {
		__name: "BrandLogo",
		setup(h) {
			const a = o(
				"https://raw.githubusercontent.com/frappe/healthcare/develop/healthcare/public/images/healthcare.svg"
			);
			return (
				t({
					url: "/api/method/marley_frontend.api.get_logo_image",
					method: "GET",
					makeParams: () => ({}),
					onSuccess(e) {
						e && (a.value = e);
					},
				}).fetch(),
				(e, g) => (
					c(),
					s("div", l, [
						r(
							"img",
							{
								src: a.value,
								alt: "Logo",
								class: "w-full h-full object-contain",
							},
							null,
							8,
							n
						),
					])
				)
			);
		},
	};
export { m as _ };
//# sourceMappingURL=BrandLogo-c420a0fa.js.map
