@{%
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
%}

Terms ->
	Terms __ Term				{% ([c, ,t]) => _.merge({}, c, t) %}
	| StringList				{% ([s]) => criteria("name", "$regex", s) %}
	| Term						{% id %}
	
	
Term ->
	Key Op ValueList			{% ([k,o,v]) => criteria(k, o, v) %}
	
Key ->
	"a"							{% t("skill_agility") %}
	| "c"						{% t("skill_combat") %}
	| "p"						{% t("pack_code") %}
	| "w"						{% t("skill_willpower") %}
	| "x"						{% t("text") %}
	
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
	
Number -> [\d]:+				{% ([d]) => parseInt(d.join(""), 10) %}

StringList ->
	StringList __ String		{% ([l, ,s]) => l+" "+s %}
	| String					{% id %}
	
String -> [a-zA-z] [\w]:*		{% ([s,r]) => s+r.join("") %}
	
__ -> [\s]:+					{% () => null %}