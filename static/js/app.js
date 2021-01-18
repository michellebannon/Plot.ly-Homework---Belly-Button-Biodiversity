d3.json('samples.json').then(data => {
    var {
        names
    } = data;
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
});

showData();

function showData() {
    d3.json('samples.json').then(data => {
        var { metadata, samples } = data;

        var selection = d3.select('select').property('value');
        metadata = metadata.filter(obj => obj.id == selection)[0]
        samples = samples.filter(obj => obj.id == selection)[0]
        // created the select in the demographic area; worked with the tutor to develop this
        d3.select('.panel-body').html('');
        Object.entries(metadata).forEach(([key, val]) => {
            d3.select('.panel-body').append('h5').text(`${key}: ${val}`)
        });

        console.log(metadata.wfreq);
        var { otu_ids, sample_values, otu_labels } = samples;

        var barData = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).reverse().map(val => `OTU ${val}`),
            text: otu_labels.slice(0, 10).reverse(),
            marker: {
                color: 'blue'
            },
            type: "bar",
            orientation: "h",
        }];

        Plotly.newPlot('bar',barData)

        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            }
        }];

        Plotly.newPlot('bubble',bubbleData);

       

    });
};

function optionChanged() {
    showData();
};