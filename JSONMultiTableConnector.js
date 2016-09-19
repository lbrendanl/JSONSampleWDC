(function() {
    var myConnector = tableau.makeConnector();
    
    myConnector.getSchema = function(schemaCallback) {
        // In this sample, we read our schema definition from a local JSON file.
        $.getJSON("./JSONMultiTableData.json", function(schemaJson) {
            $.getJSON("./StandardConnections.json", function(connectionsJson) {
                schemaCallback(schemaJson, connectionsJson);
            });
        });
    };

    myConnector.getData = function(table, doneCallback) {
        var apiURL = 'http://jsonplaceholder.typicode.com/' + table.tableInfo.id;
        tableau.reportProgress("Fetching data from the " + table.alias + " table.");
        $.ajax(apiURL, {
            method: 'GET'
        }).then(function(data) {
            tableau.reportProgress("Appending " + table.alias + " data to extract.");
            table.appendRows(data);
            doneCallback();
        });
    };

     setupConnector = function() {
        tableau.connectionName = "JSON Multiple Table Connector";
        tableau.submit();
     };

    tableau.registerConnector(myConnector);

    $(document).ready(function() {
        $("#submitButton").click(function() { // This event fires when a button is clicked
            setupConnector();
        });
        $('#inputForm').submit(function(event) {
            event.preventDefault();
            setupConnector();
        });
    });
})();
