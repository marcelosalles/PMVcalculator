 

var samplePMV = [
  {
    "Tar": 26,
    "TRM": 24.63176222,
    "Var": 0.18,
    "UR": 69.53090237,
    "clo": 0.84,
    "Met": 1.1
  },
  {
    "Tar": 28,
    "TRM": 24.63176222,
    "Var": 0.18,
    "UR": 69.53090237,
    "clo": 0.84,
    "Met": 1.21
  },
  {
    "Tar": 26,
    "TRM": 22.63176222,
    "Var": 0.18,
    "UR": 89.53090237,
    "clo": 0.84,
    "Met": 0.99
  },
  {
    "Tar": 26,
    "TRM": 24.63176222,
    "Var": 0.18,
    "UR": 79.53090237,
    "clo": 1.924,
    "Met": 2.1
  },
];
var pmvList = [];
var ppdList = [];

for(i = 0; i < samplePMV.length; i++){
    $('#ta').val(samplePMV[i].Tar);
    $('#tr').val(samplePMV[i].TRM);
    $('#vel').val(samplePMV[i].Var);
    $('#rh').val(samplePMV[i].UR);
    $('#clo').val(samplePMV[i].clo);
    $('#met').val(samplePMV[i].Met);
    update();
    var pmv = $('#pmv-res')[0].innerText;
    var ppd = $('#ppd-res')[0].innerText;
    pmvList.push(pmv);
    ppdList.push(ppd);
    /*var e = document.createElement('script'); e.setAttribute('src', 'https://nytimes.github.io/svg-crowbar/svg-crowbar.js'); e.setAttribute('class', 'svg-crowbar');
    document.body.appendChild(e);
    $( "button:contains('Download')" )[0].click();
    console.log('ok');*/
    var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

    window.URL = (window.URL || window.webkitURL);

    var body = document.body;

    var prefix = {
        xmlns: "http://www.w3.org/2000/xmlns/",
        xlink: "http://www.w3.org/1999/xlink",
        svg: "http://www.w3.org/2000/svg"
      }
    
    function getSources(doc, styles) {
    var svgInfo = [],
        svgs = doc.querySelectorAll("svg");

    styles = (styles === undefined) ? "" : styles;

    [].forEach.call(svgs, function (svg) {

      svg.setAttribute("version", "1.1");

      var defsEl = document.createElement("defs");
      svg.insertBefore(defsEl, svg.firstChild); //TODO   .insert("defs", ":first-child")
      // defsEl.setAttribute("class", "svg-crowbar");

      var styleEl = document.createElement("style")
      defsEl.appendChild(styleEl);
      styleEl.setAttribute("type", "text/css");


      // removing attributes so they aren't doubled up
      svg.removeAttribute("xmlns");
      svg.removeAttribute("xlink");

      // These are needed for the svg
      if (!svg.hasAttributeNS(prefix.xmlns, "xmlns")) {
        svg.setAttributeNS(prefix.xmlns, "xmlns", prefix.svg);
      }

      if (!svg.hasAttributeNS(prefix.xmlns, "xmlns:xlink")) {
        svg.setAttributeNS(prefix.xmlns, "xmlns:xlink", prefix.xlink);
      }

      var source = (new XMLSerializer()).serializeToString(svg).replace('</style>', '<![CDATA[' + styles + ']]></style>');
      var rect = svg.getBoundingClientRect();
      svgInfo.push({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        class: svg.getAttribute("class"),
        id: svg.getAttribute("id"),
        childElementCount: svg.childElementCount,
        source: [doctype + source]
      });
    });
    return svgInfo;
  }

  function download(source) {
    var filename = "untitled";

    if (source.id) {
      filename = source.id;
    } else if (source.class) {
      filename = source.class;
    } else if (window.document.title) {
      filename = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    }

    var url = window.URL.createObjectURL(new Blob(source.source, { "type" : "text\/xml" }));

    var a = document.createElement("a");
    body.appendChild(a);
    a.setAttribute("class", "svg-crowbar");
    a.setAttribute("download", filename + ".svg");
    a.setAttribute("href", url);
    a.style["display"] = "none";
    a.click();

    setTimeout(function() {
      window.URL.revokeObjectURL(url);
    }, 10);
  }

  function getStyles(doc) {
    var styles = "",
        styleSheets = doc.styleSheets;

    if (styleSheets) {
      for (var i = 0; i < styleSheets.length; i++) {
        processStyleSheet(styleSheets[i]);
      }
    }

    function processStyleSheet(ss) {
      if (ss.cssRules) {
        for (var i = 0; i < ss.cssRules.length; i++) {
          var rule = ss.cssRules[i];
          if (rule.type === 3) {
            // Import Rule
            processStyleSheet(rule.styleSheet);
          } else {
            // hack for illustrator crashing on descendent selectors
            if (rule.selectorText) {
              if (rule.selectorText.indexOf(">") === -1) {
                styles += "\n" + rule.cssText;
              }
            }
          }
        }
      }
    }
    return styles;
  }  
  var documents = [window.document],
        SVGSources = [];
        
  documents.forEach(function(doc) {
      var styles = getStyles(doc);
      var newSources = getSources(doc, styles);
      // because of prototype on NYT pages
      for (var i = 0; i < newSources.length; i++) {
        SVGSources.push(newSources[i]);
      };
    })
    download(SVGSources[0])
}

var data = [pmvList, ppdList];
var csvContent = "data:text/csv;charset=utf-8,";
data.forEach(function(infoArray, index){

   dataString = infoArray.join(",");
   csvContent += index < data.length ? dataString+ "\n" : dataString;

});
var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "my_data.csv");
document.body.appendChild(link); // Required for FF

link.click();
    
window.URL = (window.URL || window.webkitURL);
styles = (styles === undefined) ? "" : styles;
var source = (new XMLSerializer()).serializeToString(svg).replace('</style>', '<![CDATA[' + styles + ']]></style>');
var url = window.URL.createObjectURL(new Blob(source.source, { "type" : "text\/xml" }));

var a = document.createElement("a");
body.appendChild(a);
a.setAttribute("class", "svg-crowbar");
a.setAttribute("download", "svg-psych.svg");
a.setAttribute("href", url);
a.style["display"] = "none";
a.click();