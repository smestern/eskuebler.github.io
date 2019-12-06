let s = null;

let mdata;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}



function switchSwcFile(e) {
	s.unloadNeuron('foo', null, swc);	
	var e = document
    .getElementById("loadCell");
 const f = e.options[e.selectedIndex].value;
  if (f) {
	const r = jQuery.get(f).done(function(data) {
		/*alert( "Data Loaded: " + data );*/
		const  swc = sharkViewer.swcParser(data);
		if (Object.keys(swc).length > 0) {
        s.loadNeuron('foo',null, swc);
        s.render();
      } else {
        alert("Please upload a valid swc file.");}
	
	
	});
	/*const r = new FileReader();*/
    /*r.onload = (e2) => {
      const swcTxt = e2.target.result;
      const  swc = sharkViewer.swcParser(swcTxt);
      if (Object.keys(swc).length > 0) {
        s.loadNeuron('foo', '#ff0000', swc);
        s.render();
      } else {
        alert("Please upload a valid swc file.");
      }
    };
    r.readAsText(f);*/
	/*const  swc = sharkViewer.swcParser(swcTxt);*/

  } else {
    alert("Failed to load file");
  }
}


window.onload = () => {
document
    .getElementById("loadCell")
    .addEventListener("change", switchSwcFile, false);	
  const swc = sharkViewer.swcParser(document.getElementById("swc").text);
  mdata = JSON.parse(document.getElementById("metadata_swc").text);
  s = new sharkViewer.default({
    animated: false,
    mode: 'particle',
    dom_element: document.getElementById('container'),
    metadata: mdata,
    showAxes: 10000,
    cameraChangeCallback: (data) => { console.log(data) }
  });
  window.s = s;
  s.init();
  s.animate();
  const swc2 = sharkViewer.swcParser(document.getElementById("swc2").text);
  // s.loadNeuron('swc2', '#ff0000', swc2);
  s.loadNeuron('swc', null, swc);
  s.render();
	
};
