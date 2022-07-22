@{%
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
%}

Terms ->
	Terms __ Term				{% ([c, ,t]) => _.merge({}, c, t) %}
	| StringList				{% ([s]) => criteria("name", "$regex", s) %}
	| Term						{% id %}
	
	
Term ->
	Key Op ValueList			{% ([k,o,v]) => criteria(k, o, v) %}
	
Key ->
	"id"						{% t("code") %}
	| "ds"						{% t("double_sided") %}
	| "ex"						{% t("exceptional") %}
	| "c"						{% t("faction_code") %}
	| "f"						{% t("flavor") %}
	| "h"						{% t("health") %}
	| "i"						{% t("illustrator") %}
	| "u"						{% t("is_unique") %}
	| "my"						{% t("myriad") %}
	| "n"						{% t("name") %}
	| "p"						{% t("pack_code") %}
	| "pe"						{% t("permanent") %}
	| "pos"						{% t("position") %}
	| "s"						{% t("sanity") %}
	| "agi"						{% t("skill_agility") %}
	| "com"						{% t("skill_combat") %}
	| "int"						{% t("skill_intellect") %}
	| "wild"					{% t("skill_wild") %}
	| "will"					{% t("skill_willpower") %}
	| "sl"						{% t("slot") %}
	| "sn"						{% t("subname") %}
	| "x"						{% t("text") %}
	| "k"						{% t("traits") %}
	| "t"						{% t("type_code") %}
	
Op ->
	":"							{% t("$eq") %}
	| "!"						{% t("$ne") %}
	| "~"						{% t("$regex") %}
	| ">"						{% t("$gt") %}
	| ">:"						{% t("$gte") %}
	| "<"						{% t("$lt") %}
	| "<:"						{% t("$lte") %}
	
ValueList ->
	ValueList "|" Value			{% ([acc, ,v]) => [acc].concat(v).flat() %}
	| Value						{% id %}
	
Value ->
	QuotedValue					{% id %}
	| Number					{% id %}
	| String					{% id %}
	
QuotedValue	->
	"'" [^']:+ "'"				{% d => d[1].join("") %}
	| "\"" [^"]:+ "\""			{% d => d[1].join("") %}
	
Number -> [\d]:+				{% ([d]) => d.join("") %}

StringList ->
	StringList __ String		{% ([l, ,s]) => l+" "+s %}
	| String					{% id %}
	
String -> [a-zA-z] [\w]:*		{% ([s,r]) => s+r.join("") %}
	
__ -> [\s]:+					{% () => null %}