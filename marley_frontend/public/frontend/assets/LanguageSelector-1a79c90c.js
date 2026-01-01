import { _ as o, k as g, b as i, d as a, N as r, n as l } from "./index-8ff34837.js";
const d = { props: { selectedLanguage: { type: String, required: !0 } } },
	c = { class: "absolute top-4 right-4 flex space-x-4" };
function u(t, e, n, f, m, p) {
	return (
		g(),
		i("div", c, [
			a(
				"a",
				{
					href: "#",
					onClick:
						e[0] ||
						(e[0] = r(s => t.$emit("change-language", "en"), ["prevent"])),
					class: l([
						n.selectedLanguage === "en"
							? "font-bold text-[black]"
							: "text-[gray]",
						"hover:underline",
					]),
				},
				" English ",
				2
			),
			a(
				"a",
				{
					href: "#",
					onClick:
						e[1] ||
						(e[1] = r(s => t.$emit("change-language", "ar"), ["prevent"])),
					class: l([
						n.selectedLanguage === "ar"
							? "font-bold text-[black]"
							: "text-[gray]",
						"hover:underline",
					]),
				},
				" العربية ",
				2
			),
			a(
				"a",
				{
					href: "#",
					onClick:
						e[2] ||
						(e[2] = r(s => t.$emit("change-language", "ml"), ["prevent"])),
					class: l([
						n.selectedLanguage === "ml"
							? "font-bold text-[black]"
							: "text-[gray]",
						"hover:underline",
					]),
				},
				" മലയാളം ",
				2
			),
		])
	);
}
const k = o(d, [["render", u]]);
export { k as L };
//# sourceMappingURL=LanguageSelector-1a79c90c.js.map
