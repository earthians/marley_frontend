import { r, o as l, ac as s, aK as u } from "./index-8ff34837.js";
function o(t, n) {
	if (t) return t;
	let e = n != null ? n : "button";
	if (typeof e == "string" && e.toLowerCase() === "button") return "button";
}
function i(t, n) {
	let e = r(o(t.value.type, t.value.as));
	return (
		l(() => {
			e.value = o(t.value.type, t.value.as);
		}),
		s(() => {
			var a;
			e.value ||
				(u(n) &&
					u(n) instanceof HTMLButtonElement &&
					!((a = u(n)) != null && a.hasAttribute("type")) &&
					(e.value = "button"));
		}),
		e
	);
}
export { i as s };
//# sourceMappingURL=use-resolve-button-type-f09d071e.js.map
