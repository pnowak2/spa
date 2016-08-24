define(function(require) {
  var RSVP = require('rsvp'),
    searchResultMapper = require('./searchResult.mapper'),
    chance = require('chance');

  return {
    search: function(criteria) {
      return new RSVP.Promise(function(resolve, reject) {
        var chance = new Chance();

        resolve(searchResultMapper.map({
          "iTotalRecords": "1242",
          "iTotalDisplayRecords": "1242",
          "took": "60 ms",
          "aaData": [
            [chance.timestamp() + '', chance.sentence({words: 15}), chance.paragraph(), chance.natural({min: 2002, max: 2016}) + '', chance.country(), chance.bool() + ''],
            ["workspace:\/\/SpacesStore\/9364c9e5-9ac9-4d26-95c5-d412ffbb222c", chance.paragraph(), "The Berlinale Co-Production Market is the Berlin International Film Festival\u0092s service and networking platform for producers, financiers, broadcasters, distributors and sales agents working in int...", "2014", "DE|ES", "false"],
            ["workspace:\/\/SpacesStore\/70d7d5aa-7439-402c-b02a-50acf1b68821", "Translation of Eight Books into Macedonian Language " + criteria.currentPage, "The project encompasses translation into Macedonian language of titles by eight significant contemporary European authors, and promotion of the publications. Selected works come from various geogr...", "2014", "MK", "false"],
            ["workspace:\/\/SpacesStore\/f559cfd1-14f9-4be5-be52-67a44457d5f0", "CLOSE RELATIONS " + criteria.currentPage, "Documentary director Vitaly Mansky returns to his native Ukraine to visit his mother, aunts, uncles and cousins in Lviv, Odessa,  Crimea and Donetsk to find out what lies beneath the current confl...", "2014", "LV|EE", "false"],
            ["workspace:\/\/SpacesStore\/edce7d21-961e-448b-8b24-43a71b00fb54", "Revolting Rhymes " + criteria.currentPage, "\u0091Revolting Rhymes\u0092 are 2 x 26\u0092 CGI animated half hour specials for television based on the much loved children's book written by celebrated UK author Roald Dahl, and illustrated by Quentin Blake. ...", "2014", "UK", "false"],
            ["workspace:\/\/SpacesStore\/3c1aa416-05e2-46ef-9d90-a55861ca6fe5", "FRED AT SCHOOL " + criteria.currentPage, "FRED AT SCHOOL is a project aimed at building new audiences and raising awareness of European films among secondary school students (aged 14-16).It will take place in all EU countries, in all EU l...", "2014", "UK|IT|FR|ES|RO|DE|IS|HR", "false"],
            ["workspace:\/\/SpacesStore\/37b7cdc2-491e-474e-bf0a-36f86cb67520", "Upload cover page to hermes 14 " + criteria.currentPage, "Our interconnected world is living through major disruptions and the dying days of certain European socio-economic models. These changes require us to find creative solutions that will help our so...", "2014", "FR|BE|IS|ES|HU|IT", "false"],
            ["workspace:\/\/SpacesStore\/5fb6a3af-4e79-4329-be46-a96bee60778c", "12 End date reached " + criteria.currentPage, "Our interconnected world is living through major disruptions and the dying days of certain European socio-economic models. These changes require us to find creative solutions that will help our so...", "2014", "FR|BE|IS|ES|HU|IT", "false"],
            ["workspace:\/\/SpacesStore\/fd4fead6-0b39-42bb-8091-ac9aafba1654", "11 End date reached " + criteria.currentPage, "Our interconnected world is living through major disruptions and the dying days of certain European socio-economic models. These changes require us to find creative solutions that will help our so...", "2014", "FR|BE|IS|ES|HU|IT", "false"],
            ["workspace:\/\/SpacesStore\/f5de3505-b545-4ea2-a85a-886af3d9be5c", "10 End date reached " + criteria.currentPage, "Our interconnected world is living through major disruptions and the dying days of certain European socio-economic models. These changes require us to find creative solutions that will help our so...", "2014", "FR|BE|IS|ES|HU|IT", "false"]
          ]
        }));
      });
    }
  }
});