
d3.json('samples.json').then(data => {
    var { names } = data;
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
});

showData();

function showData() {
    
    d3.json('samples.json').then(data => {
        var { metadata, samples} = data;
        
        var selection = d3.select('select').property('value');
        metadata = metadata.filter(obj => obj.id == selection)[0]
        samples = samples.filter(obj => obj.id == selection)[0]
        
        d3.select('.panel-body').html('');
        Object.entries(metadata).forEach(([key,val])=> {
            d3.select('.panel-body').append('h5').text(`${key}: ${val}`)
        });


        console.log(metadata);
    });
};

function optionChanged() {
    showData();
};