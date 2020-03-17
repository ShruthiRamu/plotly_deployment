
const url = "https://api.spacexdata.com/v2/launchpads";

//d3.json(url).then(receivedData => console.log(receivedData));

/*d3.json("samples.json").then(function(data){
    console.log(data);
});*/

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("ID: " + result.id);
    PANEL.append("h6").text("ETHNICITY: "+result.ethnicity);
    PANEL.append("h6").text("GENDER: " + result.gender);
    PANEL.append("h6").text("AGE: " +result.age);
    PANEL.append("h6").text("LOCATION: " +result.location);
    PANEL.append("h6").text("BBTYPE: " +result.bbtype);
    PANEL.append("h6").text("WFREQ: " +result.wfreq);

  });
}

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    //var sorted_samples = result.sample_values.sort((a,b) => a - b).reverse();
    var topTensamples = result.sample_values.slice(0,10).reverse();
    
    var topTenOTU  = result.otu_ids.slice(0,10).reverse();
    var topTenLabel = result.otu_labels.slice(0,10).reverse();

    topTenOTU = topTenOTU.map(item =>  ('OTU ' + item.toString()));
    
    
    var trace1 = {
      x: topTensamples,
      y: topTenOTU,
      text: topTenLabel,
      type: "bar",
      orientation: "h"
    };
    // data
    var data = [trace1];

    // Apply the group bar mode to the layout
  /*var layout = {
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
  };*/

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", data);
  });
}


function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

// Sort the data array using the greekSearchResults value
/*data.sort(function(a, b) {
  return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
});

// Slice the first 10 objects for plotting
data = data.slice(0, 10);

// Reverse the array due to Plotly's defaults
data = data.reverse();

// Trace1 for the Greek Data
var trace1 = {
  x: data.map(row => row.greekSearchResults),
  y: data.map(row => row.greekName),
  text: data.map(row => row.greekName),
  name: "Greek",
  type: "bar",
  orientation: "h"
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Greek gods search results",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);*/
