// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

	const _ = require("lodash");
	const re = e => new RegExp(e, "i");
	const t = v => (() => v);

	const CODE_FIELDS = ["code", "faction_code", "pack_code", "type_code"];
	const BOOLEAN_FIELDS = ["double_sided", "exceptional", "is_unique", "myriad", "permanent"];
	const NUMERIC_FIELDS = ["health", "position", "sanity", "skill_agility", "skill_combat", "skill_intellect", "skill_wild", "skill_willpower"];
	const TEXT_FIELDS = ["flavor", "name", "illustrator", "slot", "subname", "text", "traits"];


	function criteria(key, operator, value) {
		if(operator === '$eq' && TEXT_FIELDS.includes(key)) operator = "$regex";
		if(Array.isArray(value)) {
			if(operator === "$regex") value = value.map(re);
			operator = "$in";
		}
		
		if(operator === "$regex") {
			value = re(value);
		}

		if(BOOLEAN_FIELDS.includes(key)) {
			value = !!value;
		} else if(NUMERIC_FIELDS.includes(key)) {
			value = parseInt(value, 10);
		}
		
		return {[key]: {[operator]: value}};
	}
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "Terms", "symbols": ["Terms", "__", "Term"], "postprocess": ([c, ,t]) => _.merge({}, c, t)},
    {"name": "Terms", "symbols": ["StringList"], "postprocess": ([s]) => criteria("name", "$regex", s)},
    {"name": "Terms", "symbols": ["Term"], "postprocess": id},
    {"name": "Term", "symbols": ["Key", "Op", "ValueList"], "postprocess": ([k,o,v]) => criteria(k, o, v)},
    {"name": "Key$string$1", "symbols": [{"literal":"i"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$1"], "postprocess": t("code")},
    {"name": "Key$string$2", "symbols": [{"literal":"d"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$2"], "postprocess": t("double_sided")},
    {"name": "Key$string$3", "symbols": [{"literal":"e"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$3"], "postprocess": t("exceptional")},
    {"name": "Key", "symbols": [{"literal":"c"}], "postprocess": t("faction_code")},
    {"name": "Key", "symbols": [{"literal":"f"}], "postprocess": t("flavor")},
    {"name": "Key", "symbols": [{"literal":"h"}], "postprocess": t("health")},
    {"name": "Key", "symbols": [{"literal":"i"}], "postprocess": t("illustrator")},
    {"name": "Key", "symbols": [{"literal":"u"}], "postprocess": t("is_unique")},
    {"name": "Key$string$4", "symbols": [{"literal":"m"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$4"], "postprocess": t("myriad")},
    {"name": "Key", "symbols": [{"literal":"n"}], "postprocess": t("name")},
    {"name": "Key", "symbols": [{"literal":"p"}], "postprocess": t("pack_code")},
    {"name": "Key$string$5", "symbols": [{"literal":"p"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$5"], "postprocess": t("permanent")},
    {"name": "Key$string$6", "symbols": [{"literal":"p"}, {"literal":"o"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$6"], "postprocess": t("position")},
    {"name": "Key", "symbols": [{"literal":"s"}], "postprocess": t("sanity")},
    {"name": "Key$string$7", "symbols": [{"literal":"a"}, {"literal":"g"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$7"], "postprocess": t("skill_agility")},
    {"name": "Key$string$8", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$8"], "postprocess": t("skill_combat")},
    {"name": "Key$string$9", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$9"], "postprocess": t("skill_intellect")},
    {"name": "Key$string$10", "symbols": [{"literal":"w"}, {"literal":"i"}, {"literal":"l"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$10"], "postprocess": t("skill_wild")},
    {"name": "Key$string$11", "symbols": [{"literal":"w"}, {"literal":"i"}, {"literal":"l"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$11"], "postprocess": t("skill_willpower")},
    {"name": "Key$string$12", "symbols": [{"literal":"s"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$12"], "postprocess": t("slot")},
    {"name": "Key$string$13", "symbols": [{"literal":"s"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Key", "symbols": ["Key$string$13"], "postprocess": t("subname")},
    {"name": "Key", "symbols": [{"literal":"x"}], "postprocess": t("text")},
    {"name": "Key", "symbols": [{"literal":"k"}], "postprocess": t("traits")},
    {"name": "Key", "symbols": [{"literal":"t"}], "postprocess": t("type_code")},
    {"name": "Op", "symbols": [{"literal":":"}], "postprocess": t("$eq")},
    {"name": "Op", "symbols": [{"literal":"!"}], "postprocess": t("$ne")},
    {"name": "Op", "symbols": [{"literal":"~"}], "postprocess": t("$regex")},
    {"name": "Op", "symbols": [{"literal":">"}], "postprocess": t("$gt")},
    {"name": "Op$string$1", "symbols": [{"literal":">"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Op", "symbols": ["Op$string$1"], "postprocess": t("$gte")},
    {"name": "Op", "symbols": [{"literal":"<"}], "postprocess": t("$lt")},
    {"name": "Op$string$2", "symbols": [{"literal":"<"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Op", "symbols": ["Op$string$2"], "postprocess": t("$lte")},
    {"name": "ValueList", "symbols": ["ValueList", {"literal":"|"}, "Value"], "postprocess": ([acc, ,v]) => [acc].concat(v).flat()},
    {"name": "ValueList", "symbols": ["Value"], "postprocess": id},
    {"name": "Value", "symbols": ["QuotedValue"], "postprocess": id},
    {"name": "Value", "symbols": ["Number"], "postprocess": id},
    {"name": "Value", "symbols": ["String"], "postprocess": id},
    {"name": "QuotedValue$ebnf$1", "symbols": [/[^']/]},
    {"name": "QuotedValue$ebnf$1", "symbols": ["QuotedValue$ebnf$1", /[^']/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "QuotedValue", "symbols": [{"literal":"'"}, "QuotedValue$ebnf$1", {"literal":"'"}], "postprocess": d => d[1].join("")},
    {"name": "QuotedValue$ebnf$2", "symbols": [/[^"]/]},
    {"name": "QuotedValue$ebnf$2", "symbols": ["QuotedValue$ebnf$2", /[^"]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "QuotedValue", "symbols": [{"literal":"\""}, "QuotedValue$ebnf$2", {"literal":"\""}], "postprocess": d => d[1].join("")},
    {"name": "Number$ebnf$1", "symbols": [/[\d]/]},
    {"name": "Number$ebnf$1", "symbols": ["Number$ebnf$1", /[\d]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Number", "symbols": ["Number$ebnf$1"], "postprocess": ([d]) => d.join("")},
    {"name": "StringList", "symbols": ["StringList", "__", "String"], "postprocess": ([l, ,s]) => l+" "+s},
    {"name": "StringList", "symbols": ["String"], "postprocess": id},
    {"name": "String$ebnf$1", "symbols": []},
    {"name": "String$ebnf$1", "symbols": ["String$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "String", "symbols": [/[a-zA-z]/, "String$ebnf$1"], "postprocess": ([s,r]) => s+r.join("")},
    {"name": "__$ebnf$1", "symbols": [/[\s]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": () => null}
]
  , ParserStart: "Terms"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
