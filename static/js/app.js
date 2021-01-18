
d3.json('samples.json').then(data => {
    var { names } = data;
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
});

showData();

function showData() {
    
    // Use the D3 library to read in `samples.json`
    d3.json('samples.json').then(data => {
        var { metadata, samples} = data;
        // select the values of the metadata;worked with tutor to develop this
        var selection = d3.select('select').property('value');
        metadata = metadata.filter(obj => obj.id == selection)[0]
        samples = samples.filter(obj => obj.id == selection)[0]
        // created the select in the demographic area; worked with the tutor to develop this
        d3.select('.panel-body').html('');
        Object.entries(metadata).forEach(([key,val])=> {
            d3.select('.panel-body').append('h5').text(`${key}: ${val}`)
        });
    
    //get top 10 OTU ID's for plot
        var OTU_top = (sampledate.samples[0].otu_ids.slice(0, 10)).reverse();
       
    //get the OTU ide's for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log('OTU IDS: ${OTU_id}')
    
    // get the top 10 labels for the plot
    var labels =  sampledata.samples[0].otu_labels.slice(0,10);
    console.log(`OTU_labels: ${labels}`)
    var trace = {
        x: sampleValues,
        y: OTU_id,
        text: labels,
        marker: {
        color: 'blue'},
        type:"bar",
        orientation: "h",
    };
// create data variable
var data = [trace];
        // console.log(metadata);
    });
};

function optionChanged() {
    showData();
};