// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

	const _ = require("lodash");
	const re = e => new RegExp(e, "i");
	const t = v => (() => v);
	const TEXT_FIELDS = ["text"];
	function criteria(key, operator, value) {
		if(operator === '$eq' && TEXT_FIELDS.includes(key)) operator = "$regex";
		if(Array.isArray(value)) {
			if(operator === "$regex") value = value.map(re);
			operator = "$in";
		}
		
		if(operator === "$regex") {
			value = re(value);
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
    {"name": "Key", "symbols": [{"literal":"a"}], "postprocess": t("skill_agility")},
    {"name": "Key", "symbols": [{"literal":"c"}], "postprocess": t("skill_combat")},
    {"name": "Key", "symbols": [{"literal":"p"}], "postprocess": t("pack_code")},
    {"name": "Key", "symbols": [{"literal":"w"}], "postprocess": t("skill_willpower")},
    {"name": "Key", "symbols": [{"literal":"x"}], "postprocess": t("text")},
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
    {"name": "Number", "symbols": ["Number$ebnf$1"], "postprocess": ([d]) => parseInt(d.join(""), 10)},
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
