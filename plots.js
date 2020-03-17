
const url = "https://api.spacexdata.com/v2/launchpads";

//d3.json(url).then(receivedData => console.log(receivedData));

/*d3.json("samples.json").then(function(data){
    console.log(data);
});*/

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
  buildBubbleCharts(newSample);
  buildGaugeCharts(newSample);
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

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", data);
  });
}

function buildBubbleCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var topTensamples = result.sample_values.slice(0,10).reverse();
    
    var topTenOTU  = result.otu_ids.slice(0,10).reverse();
    var topTenLabel = result.otu_labels.slice(0,10).reverse();

    topTenOTU = topTenOTU.map(item =>  ('OTU ' + item.toString()));
    
    

    var trace1 = {
      x: result.otu_ids,
      y: result.sample_values,
      mode: 'markers',
      marker: {
        color: result.otu_ids,
        //opacity: [1, 0.8, 0.6, 0.4],
        text: result.otu_labels,
        size: result.sample_values
      }
    };
    
    var data = [trace1];
    
    var layout = {
      //title: 'Marker Size and Color',
      //showlegend: false,
      xaxis: {
        title :'OTU ID'
      }/*,
      height: 600,
      width: 600*/
    };
    
    Plotly.newPlot('bubble', data, layout);
  });
}

function buildGaugeCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var topTensamples = result.sample_values.slice(0,10).reverse();
    
    var topTenOTU  = result.otu_ids.slice(0,10).reverse();
    var topTenLabel = result.otu_labels.slice(0,10).reverse();

    topTenOTU = topTenOTU.map(item =>  ('OTU ' + item.toString()));
    
    

    var data = [
      {
        type: "indicator",
        mode: "gauge+number+delta",
        value: 420,
        title: { text: "Speed", font: { size: 24 } },
        delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
        gauge: {
          axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 250], color: "cyan" },
            { range: [250, 400], color: "royalblue" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 490
          }
        }
      }
    ];
    
    var layout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };
        
    Plotly.newPlot('gauge', data, layout);
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
  })
  optionChanged("940");  
}
  
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
