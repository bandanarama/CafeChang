(function () {
    handleClientLoad();
})();

/**
 *  Load the API client library
 */
function handleClientLoad() {
    gapi.load('client', initClient);
}

/**
 *  Initialize the API client library
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        getHours();
        getInventory();
    }, function(error) {
        console.error(JSON.stringify(error, null, 2));
    });
}

function getHours() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Hours!A2:C8'
    }).then(function(response) {
        var range = response.result;

        $("#accordion").accordion({});

        populateDateTimeTab(range);
    }, function(response) {
        console.error('Error: ' + response.result.error.message);
    });
}

function getInventory() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Item Inventory!A2:D'
    }).then(function(response) {
        var range = response.result;

        addTakeoutItem(range);

        // SmartCart options
        $('#smartcart').smartCart({
            lang: {
                cartTitle: "Online Order Cart",
                checkout: 'Checkout',
                clear: 'Clear',
                subtotal: 'Subtotal:',
                cartRemove: '×',
                cartEmpty: 'Cart is Empty!<br />Please choose items for your order.'
            }
        });
    }, function(response) {
        console.error('Error: ' + response.result.error.message);
    });
}
