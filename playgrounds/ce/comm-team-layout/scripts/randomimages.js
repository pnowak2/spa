var imagesAmateur = [
    "images/random/amateur_art/01.jpg",
    "images/random/amateur_art/02.jpg",
    "images/random/amateur_art/03.jpg",
    "images/random/amateur_art/04.jpg",
    "images/random/amateur_art/05.jpg",
    "images/random/amateur_art/06.jpg",
    "images/random/amateur_art/07.jpg"
    ];



    var imagesContemporaryArt = [
    "images/random/contemporary_art/01.jpg",
    "images/random/contemporary_art/02.jpg",
    "images/random/contemporary_art/03.jpg",
    "images/random/contemporary_art/04.jpg",
    "images/random/contemporary_art/05.jpg",
    "images/random/contemporary_art/06.jpg"
    ];

    var imagesCreativeIndustry = [
    "images/random/creative_industry/01.jpg",
    "images/random/creative_industry/02.jpg",
    "images/random/creative_industry/03.jpg",
    "images/random/creative_industry/04.jpg",
    "images/random/creative_industry/05.jpg",
    "images/random/creative_industry/06.jpg",
    "images/random/creative_industry/07.jpg"
    ];

    var imagesDance = [
    "images/random/dance/01.jpg",
    "images/random/dance/02.jpg",
    "images/random/dance/03.jpg",
    "images/random/dance/04.jpg",
    "images/random/dance/05.jpg",
    "images/random/dance/06.jpg",
    "images/random/dance/07.jpg"
    ];

    var imagesDesign = [
    "images/random/design/01.jpg",
    "images/random/design/02.jpg",
    "images/random/design/03.jpg",
    "images/random/design/04.jpg",
    "images/random/design/05.jpg"
    ];

    var imagesEnvironment = [
    "images/random/environment/01.jpg",
    "images/random/environment/02.jpg",
    "images/random/environment/03.jpg",
    "images/random/environment/04.jpg",
    "images/random/environment/05.jpg",
    "images/random/environment/06.jpg",
    "images/random/environment/07.jpg"
    ];

    var imagesFolk = [
    "images/random/folk/01.jpg",
    "images/random/folk/02.jpg",
    "images/random/folk/03.jpg",
    "images/random/folk/04.jpg",
    "images/random/folk/05.jpg",
    "images/random/folk/06.jpg"
    ];

    var imagesFolk = [
    "images/random/folk/01.jpg",
    "images/random/folk/02.jpg",
    "images/random/folk/03.jpg",
    "images/random/folk/04.jpg",
    "images/random/folk/05.jpg",
    "images/random/folk/06.jpg"
    ];    

    var imagesMuseum = [
    "images/random/museum/01.jpg",
    "images/random/museum/02.jpg",
    "images/random/museum/03.jpg",
    "images/random/museum/04.jpg",
    "images/random/museum/05.jpg",
    "images/random/museum/06.jpg",
    "images/random/museum/07.jpg",
    "images/random/museum/08.jpg"   
    ];

    var imagesOpera = [
    "images/random/opera/01.jpg",
    "images/random/opera/02.jpg",
    "images/random/opera/03.jpg",
    "images/random/opera/04.jpg",
    "images/random/opera/05.jpg"
    ];              

    var imagesVisualArts = [
    "images/random/visual_arts/01.jpg",
    "images/random/visual_arts/02.jpg",
    "images/random/visual_arts/03.jpg",
    "images/random/visual_arts/04.jpg",
    "images/random/visual_arts/05.jpg"
    ];    

    var imagesFineArts = [
    "images/random/fine_arts/01.jpg",
    "images/random/fine_arts/02.jpg",
    "images/random/fine_arts/03.jpg",
    "images/random/fine_arts/04.jpg",
    "images/random/fine_arts/05.jpg",
    "images/random/fine_arts/06.jpg"
    ];


    var imagesMusic = [
    "images/random/music/01.jpg",
    "images/random/music/02.jpg",
    "images/random/music/03.jpg",
    "images/random/music/04.jpg",
    "images/random/music/05.jpg",
    "images/random/music/06.jpg",
    "images/random/music/07.jpg"
    ];                      

    function randAmateur() {
      var size = imagesAmateur.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randAmateur').src = imagesAmateur[x];
    }

    randAmateur();

    function randArchitecture() {
      var imagesArchitecture = [
      "images/random/architecture/01.jpg",
      "images/random/architecture/02.jpg",
      "images/random/architecture/03.jpg",
      "images/random/architecture/04.jpg",
      "images/random/architecture/05.jpg",
      "images/random/architecture/06.jpg",
      "images/random/architecture/07.jpg",
      "images/random/architecture/08.jpg",
      "images/random/architecture/09.jpg",
      "images/random/architecture/10.jpg",
      "images/random/architecture/11.jpg",
      "images/random/architecture/12.jpg",
      "images/random/architecture/13.jpg",
      "images/random/architecture/14.jpg",
      "images/random/architecture/15.jpg",
      "images/random/architecture/16.jpg"
      ];
      var size = imagesArchitecture.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randArchitecture').src = imagesArchitecture[x];
    }

    randArchitecture();

    function randContemporaryArt() {
      var size = imagesContemporaryArt.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randContemporaryArt').src = imagesContemporaryArt[x];
    }

    randContemporaryArt();

    function randCreativeIndustry() {
      var size = imagesCreativeIndustry.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randCreativeIndustry').src = imagesCreativeIndustry[x];
    }

    randCreativeIndustry();

    function randDance() {
      var size = imagesDance.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randDance').src = imagesDance[x];
    }

    randDance();

    function randDesign() {
      var size = imagesDesign.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randDesign').src = imagesDesign[x];
    }

    randDesign();

    function randEnvironment() {
      var size = imagesEnvironment.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randEnvironment').src = imagesEnvironment[x];
    }

    randEnvironment();

    function randFolk() {
      var size = imagesFolk.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randFolk').src = imagesFolk[x];
    }

    randFolk();

    function randMuseum() {
      var size = imagesMuseum.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randMuseum').src = imagesMuseum[x];
    }

    randMuseum();

    function randOpera() {
      var size = imagesOpera.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randOpera').src = imagesOpera[x];
    }

    randOpera();  

    function randVisualArts() {
      var size = imagesVisualArts.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randVisualArts').src = imagesVisualArts[x];
    }

    randVisualArts(); 

    function randFineArts() {
      var size = imagesFineArts.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randFineArts').src = imagesFineArts[x];
    }

    randFineArts(); 

    function randMusic() {
      var size = imagesMusic.length
      var x = Math.floor(size * Math.random())
      document.getElementById('randMusic').src = imagesMusic[x];
    }

    randMusic();    

