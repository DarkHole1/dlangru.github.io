document.addEventListener("DOMContentLoaded", function() {

	var tgl = document.getElementById("menu-toggle");
	tgl.addEventListener("click", function(e) {
		e.target.parentNode.classList.toggle("-shown");
		e.preventDefault();
	});

	[].forEach.call(document.querySelectorAll(".NavMenu>.list>li>a"), function (a) {
		a.addEventListener("click", function(e) {
			tgl.parentNode.classList.remove("-shown");
		});
	});

	var sourcecode = document.getElementById("sourcecode");
	var samples = [
//01
'<span class="key">void</span> main()\n\
{\n\
  <span class="key">import</span> std.exception, std.stdio, std.process;\n\
\n\
  <span class="key">auto</span> result = ["whoami"].execute;\n\
  enforce(result.status == 0);\n\
  result.output.write;\n\
}\n',

//02
'<span class="key">import</span> std.algorithm, std.conv, std.functional,\n\
       std.math, std.regex, std.stdio;\n\
\n\
<span class="key">alias</span> round = pipe!(to!<span class="key">real</span>, std.math.round, to!<span class="key">string</span>);\n\
<span class="key">static</span> reFloatingPoint = ctRegex!<span class="string">`[0-9]+\.[0-9]+`</span>;\n\
\n\
<span class="key">void</span> main()\n\
{\n\
  <span class="comment">// Replace anything that looks like a real\n\
  // number with the rounded equivalent.</span>\n\
  stdin\n\
    .byLine\n\
    .map!(l => l.replaceAll!(c => c.hit.round)\n\
                            (reFloatingPoint))\n\
    .each!writeln;\n\
}',

//03
'<span class="key">import</span> std.stdio, std.array, std.algorithm;\n\
\n\
<span class="key">void</span> main()\n\
{\n\
  stdin\n\
    .byLineCopy\n\
    .array\n\
    .sort!((a, b) => a > b) <span class="comment">// descending order</span>\n\
    .each!writeln;\n\
}',

//04
'<span class="key">void</span> main()\n\
{\n\
  <span class="key">import</span> std.range, std.stdio;\n\
  \n\
  <span class="key">auto</span> sum = 0.0;\n\
  <span class="key">auto</span> count = stdin.byLine\n\
    .tee!(l => sum += l.length).walkLength;\n\
    \n\
  writeln(<span class="string">"Average line length: "</span>,\n\
    count ? sum / count : 0);\n\
}'
];
	sourcecode.innerHTML = samples[Math.floor(Math.random() * samples.length)];

	document.getElementById("ide-btn").addEventListener("click", function(e) {
		e.preventDefault();
		var src = "https://run.dlang.io/?source="+encodeURIComponent(sourcecode.innerText);
		console.log(src);
		window.open(src, "_blank");
	});

	smoothscroll(".-smooth", {offset: -60});
});
