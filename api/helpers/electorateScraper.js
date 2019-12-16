const axios = require('axios');
const $ = require('cheerio');

let postcode = '2000';

const ferderalURL = `https://electorate.aec.gov.au/LocalitySearchResults.aspx?filter=${postcode}&filterby=Postcode`;


axios.get( ferderalURL ).then((res) => {
    const html = res.data;
    const $rows = $('table#ContentPlaceHolderBody_gridViewLocalities tr', html);
    const electorates = [];

    $rows.each( function() {
        const $cells = $('td', this);
        console.log($cells.eq(0).text())

        const electorate = {
            state: $cells.eq(0).text(),
            suburb: $cells.eq(1).text(),
            postcode: $cells.eq(2).text(),
            electorate: $cells.eq(3).text(),
        }

        electorates.push(electorate)

    })

    console.log(electorates)

})