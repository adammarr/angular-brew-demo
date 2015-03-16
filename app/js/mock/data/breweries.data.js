(function() {
    'use strict';

    angular
        .module('brewE2E')
        .factory('breweryData', breweryData);

    /* @ngInject */
    function breweryData() {
        var service = {
            getBreweries: getBreweries,
            getBrewery: getBrewery,
            removeBrewery: removeBrewery,
            updateBrewery: updateBrewery
        };

        var breweries = [
			  {
			    "_id": "54fbce59a6429d11b08bd555",
			    "isActive": true,
			    "name": "Eternis",
			    "email": "robertahess@eternis.com",
			    "phone": "+1 (952) 423-3868",
			    "address": {
			      "street": "754 Rutherford Place",
			      "city": "Henrico",
			      "state": "Florida",
			      "postal": 59052
			    },
			    "about": "Cupidatat ullamco irure proident cupidatat irure magna ex. Consequat cillum velit excepteur occaecat amet aute. Eiusmod reprehenderit consectetur Lorem nostrud dolor nostrud aliqua tempor sit officia nostrud incididunt. Proident culpa duis magna magna non consequat commodo commodo ullamco non esse. In fugiat occaecat occaecat irure est veniam.\r\n",
			    "latitude": -30.045733,
			    "longitude": 0.394936,
			    "tags": [
			      "eu",
			      "ad"
			    ]
			  },
			  {
			    "_id": "54fbce594db06693dae10360",
			    "isActive": true,
			    "name": "Viasia",
			    "email": "robertahess@viasia.com",
			    "phone": "+1 (870) 536-3582",
			    "address": {
			      "street": "344 Ferris Street",
			      "city": "Chesterfield",
			      "state": "Tennessee",
			      "postal": 56133
			    },
			    "about": "Duis excepteur culpa cillum labore aute magna aliquip amet cillum adipisicing consectetur cupidatat. Ad eu aliquip voluptate irure duis enim. Nostrud elit do esse elit incididunt nulla sint deserunt fugiat non. Ullamco minim sint ut velit non qui proident.\r\n",
			    "latitude": -15.784989,
			    "longitude": 127.062936,
			    "tags": [
			      "aute",
			      "mollit",
			      "ullamco"
			    ]
			  },
			  {
			    "_id": "54fbce59a600b7a1c1cf0279",
			    "isActive": false,
			    "name": "Exodoc",
			    "email": "robertahess@exodoc.com",
			    "phone": "+1 (923) 525-3736",
			    "address": {
			      "street": "881 Manhattan Avenue",
			      "city": "Richmond",
			      "state": "Nevada",
			      "postal": 83400
			    },
			    "about": "Elit occaecat minim mollit adipisicing ut nostrud sint duis nisi. Proident nulla non occaecat sint amet mollit. Minim qui laboris elit ad ea pariatur ipsum proident ex. Cupidatat laboris officia ipsum ipsum velit. Ex voluptate aliqua eiusmod nulla. Ex et amet sint et est nisi non sint. Lorem adipisicing mollit laboris eiusmod fugiat sit consectetur ut.\r\n",
			    "latitude": -19.594779,
			    "longitude": -68.728148,
			    "tags": [
			      "anim",
			      "dolore",
			      "est"
			    ]
			  },
			  {
			    "_id": "54fbce59307382c2b7b78732",
			    "isActive": false,
			    "name": "Elemantra",
			    "email": "robertahess@elemantra.com",
			    "phone": "+1 (914) 458-2625",
			    "address": {
			      "street": "733 Amherst Street",
			      "city": "Chesterfield",
			      "state": "Ohio",
			      "postal": 51629
			    },
			    "about": "Dolore elit voluptate adipisicing esse ex proident. Enim reprehenderit ea Lorem sint consequat ipsum cillum aliqua ipsum cupidatat ad. Pariatur officia duis culpa do dolore esse laboris magna fugiat deserunt ad. Labore aliqua cillum ipsum occaecat veniam culpa esse aliqua incididunt id tempor. Aliquip consectetur officia cupidatat nulla laborum duis cupidatat officia mollit minim laborum est consectetur cupidatat. Magna eiusmod irure id ullamco ullamco est qui sunt minim ea dolor enim Lorem ex.\r\n",
			    "latitude": 20.408767,
			    "longitude": -96.913784,
			    "tags": [
			      "et"
			    ]
			  },
			  {
			    "_id": "54fbce59725e161e4460d9d6",
			    "isActive": true,
			    "name": "Medmex",
			    "email": "robertahess@medmex.com",
			    "phone": "+1 (966) 545-3365",
			    "address": {
			      "street": "580 Falmouth Street",
			      "city": "Chesterfield",
			      "state": "Minnesota",
			      "postal": 20050
			    },
			    "about": "Magna qui aliquip proident occaecat incididunt reprehenderit mollit pariatur adipisicing. Exercitation enim quis ex magna ea nisi nulla voluptate fugiat quis sunt sint. Id elit aliquip aute do est sint laborum nostrud. Veniam proident ullamco ipsum laboris nostrud aliquip exercitation elit. Elit quis ut cupidatat excepteur irure adipisicing deserunt ipsum irure est pariatur.\r\n",
			    "latitude": -39.591738,
			    "longitude": -29.269488,
			    "tags": [
			      "Lorem",
			      "Lorem",
			      "fugiat"
			    ]
			  },
			  {
			    "_id": "54fbce59ad2b39b89c2a875d",
			    "isActive": false,
			    "name": "Terascape",
			    "email": "robertahess@terascape.com",
			    "phone": "+1 (827) 593-2122",
			    "address": {
			      "street": "689 Eagle Street",
			      "city": "Chesterfield",
			      "state": "Hawaii",
			      "postal": 92661
			    },
			    "about": "Sunt ut labore duis voluptate qui et pariatur. Veniam quis pariatur officia do in ea do minim laboris. Consectetur labore nisi pariatur officia cillum voluptate irure deserunt amet voluptate laboris dolor do. Ex cillum id culpa commodo pariatur velit minim aliqua occaecat eu magna minim. Laborum officia cillum id id exercitation enim ullamco sit sint.\r\n",
			    "latitude": -77.740961,
			    "longitude": -151.948986,
			    "tags": [
			      "eu",
			      "culpa",
			      "elit"
			    ]
			  },
			  {
			    "_id": "54fbce5980c381e87575e0dd",
			    "isActive": true,
			    "name": "Fishland",
			    "email": "robertahess@fishland.com",
			    "phone": "+1 (906) 590-2744",
			    "address": {
			      "street": "562 Dahlgreen Place",
			      "city": "Henrico",
			      "state": "Texas",
			      "postal": 72227
			    },
			    "about": "Velit ex non labore nostrud exercitation duis non eu occaecat sunt id eiusmod magna. Ipsum magna reprehenderit id esse occaecat magna. Do dolor do occaecat occaecat minim pariatur esse mollit consequat elit sit ex. Amet quis Lorem enim aliqua dolor est aute amet laborum culpa. Magna do velit non occaecat incididunt Lorem pariatur adipisicing aute est ex qui ut velit. Labore pariatur dolor pariatur excepteur Lorem. Et duis anim ad proident nostrud id ad reprehenderit sint elit quis proident.\r\n",
			    "latitude": 0.598858,
			    "longitude": -110.043785,
			    "tags": [
			      "reprehenderit",
			      "fugiat",
			      "nostrud"
			    ]
			  },
			  {
			    "_id": "54fbce59fd2e79363cc5ed15",
			    "isActive": true,
			    "name": "Snips",
			    "email": "robertahess@snips.com",
			    "phone": "+1 (952) 427-2104",
			    "address": {
			      "street": "917 Bedell Lane",
			      "city": "Henrico",
			      "state": "Pennsylvania",
			      "postal": 61265
			    },
			    "about": "Excepteur incididunt aute duis exercitation ea nisi elit. Ullamco voluptate reprehenderit enim voluptate. Ipsum veniam magna eu enim nisi sint consectetur. Amet pariatur nulla nostrud aliqua proident culpa elit. Lorem aute non mollit culpa commodo incididunt sint duis nostrud magna id irure elit occaecat.\r\n",
			    "latitude": 38.139142,
			    "longitude": -12.734151,
			    "tags": [
			      "nulla"
			    ]
			  },
			  {
			    "_id": "54fbce5996cb2dcf1f6e4ab2",
			    "isActive": true,
			    "name": "Motovate",
			    "email": "robertahess@motovate.com",
			    "phone": "+1 (880) 505-3485",
			    "address": {
			      "street": "292 Hope Street",
			      "city": "Richmond",
			      "state": "New Mexico",
			      "postal": 12529
			    },
			    "about": "Commodo anim amet occaecat cillum dolore voluptate. Veniam aliquip magna pariatur est officia in nulla deserunt. Non cupidatat voluptate anim pariatur eiusmod veniam Lorem sit. Et Lorem in dolore sint incididunt do. Labore reprehenderit nostrud ullamco minim excepteur dolor.\r\n",
			    "latitude": 74.026384,
			    "longitude": 177.786643,
			    "tags": [
			      "pariatur",
			      "non"
			    ]
			  },
			  {
			    "_id": "54fbce59879c73d9f849e7b6",
			    "isActive": true,
			    "name": "Gleamink",
			    "email": "robertahess@gleamink.com",
			    "phone": "+1 (803) 514-2071",
			    "address": {
			      "street": "530 Euclid Avenue",
			      "city": "Richmond",
			      "state": "Missouri",
			      "postal": 35771
			    },
			    "about": "Velit aliquip qui elit nulla est anim cupidatat. Incididunt aliquip est ad in Lorem sit adipisicing et ut eiusmod dolore consectetur. Sunt sint eiusmod in exercitation tempor minim ullamco sint. Eiusmod veniam incididunt do elit fugiat commodo enim fugiat incididunt cillum. Est esse commodo consectetur aliquip Lorem fugiat officia voluptate occaecat. Elit sint commodo ex ex ea dolore culpa amet Lorem occaecat nostrud. Ad do anim officia proident mollit culpa exercitation non consequat esse.\r\n",
			    "latitude": -70.108937,
			    "longitude": -4.304746,
			    "tags": [
			      "tempor",
			      "officia"
			    ]
			  },
			  {
			    "_id": "54fbce593fce3626453133cc",
			    "isActive": true,
			    "name": "Zilch",
			    "email": "robertahess@zilch.com",
			    "phone": "+1 (923) 504-3075",
			    "address": {
			      "street": "959 Hinsdale Street",
			      "city": "Richmond",
			      "state": "Maryland",
			      "postal": 17196
			    },
			    "about": "Officia sint eu culpa qui pariatur excepteur qui laboris minim consequat reprehenderit. Veniam qui anim commodo deserunt duis elit laborum esse. Deserunt aliquip velit ea veniam. Id velit labore magna incididunt est duis dolore ullamco cupidatat quis amet ad sit id.\r\n",
			    "latitude": 37.036868,
			    "longitude": 107.653879,
			    "tags": [
			      "aliqua",
			      "duis"
			    ]
			  },
			  {
			    "_id": "54fbce59b8592ca4dca90796",
			    "isActive": false,
			    "name": "Vixo",
			    "email": "robertahess@vixo.com",
			    "phone": "+1 (841) 405-3459",
			    "address": {
			      "street": "910 Maple Avenue",
			      "city": "Richmond",
			      "state": "Alaska",
			      "postal": 95444
			    },
			    "about": "Sint officia est nostrud minim do nulla ut deserunt commodo nulla laborum. Ex occaecat qui labore qui irure reprehenderit Lorem culpa proident elit in. Proident dolor esse aliqua elit quis est deserunt et irure exercitation Lorem minim nulla. Veniam irure pariatur eiusmod cillum sunt do veniam ullamco culpa non excepteur. Ad ut aute pariatur duis incididunt sit exercitation et quis adipisicing. Reprehenderit do adipisicing quis occaecat aliqua dolore culpa proident irure est mollit excepteur cupidatat deserunt. Sit cillum elit dolore occaecat tempor qui.\r\n",
			    "latitude": -69.348283,
			    "longitude": 115.859283,
			    "tags": [
			      "non",
			      "et"
			    ]
			  },
			  {
			    "_id": "54fbce595dbe01313578b864",
			    "isActive": true,
			    "name": "Pheast",
			    "email": "robertahess@pheast.com",
			    "phone": "+1 (892) 441-3778",
			    "address": {
			      "street": "629 Lawn Court",
			      "city": "Richmond",
			      "state": "Rhode Island",
			      "postal": 36587
			    },
			    "about": "Adipisicing incididunt aute est duis do minim aliqua. Commodo do fugiat ad Lorem proident Lorem incididunt consectetur. Id in do culpa ut ex qui nulla dolore voluptate exercitation qui reprehenderit anim irure. Incididunt reprehenderit aliquip eu cillum et. Aliqua in voluptate sit nisi adipisicing quis fugiat aliqua reprehenderit tempor.\r\n",
			    "latitude": 17.267854,
			    "longitude": 145.254274,
			    "tags": [
			      "nisi",
			      "dolor",
			      "nostrud"
			    ]
			  },
			  {
			    "_id": "54fbce59f5a0c271bc13a58e",
			    "isActive": false,
			    "name": "Comtent",
			    "email": "robertahess@comtent.com",
			    "phone": "+1 (996) 513-2993",
			    "address": {
			      "street": "757 Ford Street",
			      "city": "Chesterfield",
			      "state": "Montana",
			      "postal": 36539
			    },
			    "about": "Eiusmod est exercitation proident pariatur excepteur ullamco adipisicing ex voluptate exercitation. Fugiat consequat ea cupidatat sint occaecat sunt do. Sint officia ut fugiat magna officia reprehenderit elit labore. Id fugiat cillum pariatur sint nostrud cillum est. Culpa excepteur ex consectetur in velit consequat consequat proident. Ullamco dolore proident quis eiusmod excepteur do.\r\n",
			    "latitude": 81.727572,
			    "longitude": -30.500893,
			    "tags": [
			      "fugiat",
			      "proident"
			    ]
			  },
			  {
			    "_id": "54fbce59beeb107aefea107a",
			    "isActive": true,
			    "name": "Exoswitch",
			    "email": "robertahess@exoswitch.com",
			    "phone": "+1 (871) 521-3960",
			    "address": {
			      "street": "336 Miller Avenue",
			      "city": "Richmond",
			      "state": "Kentucky",
			      "postal": 91332
			    },
			    "about": "Qui consectetur occaecat tempor culpa duis et id velit. Et do mollit et nostrud ea velit amet sit magna non. Amet deserunt duis in aute culpa dolor sunt magna officia officia eu est laboris. Sit ipsum et velit culpa reprehenderit aliquip voluptate deserunt. Ad ad reprehenderit veniam mollit amet tempor. Laboris excepteur esse sint proident veniam ut eiusmod duis id dolor adipisicing laborum id.\r\n",
			    "latitude": -31.284996,
			    "longitude": -75.560318,
			    "tags": [
			      "sit",
			      "aute"
			    ]
			  },
			  {
			    "_id": "54fbce596fb59a0c3f265f9b",
			    "isActive": false,
			    "name": "Tsunamia",
			    "email": "robertahess@tsunamia.com",
			    "phone": "+1 (964) 520-2409",
			    "address": {
			      "street": "432 Tech Place",
			      "city": "Henrico",
			      "state": "District Of Columbia",
			      "postal": 26326
			    },
			    "about": "Ex dolore fugiat commodo minim in occaecat ad esse ex. Aliquip proident excepteur officia adipisicing. Aliqua eiusmod velit minim sit magna anim ex magna fugiat esse reprehenderit. Id et ullamco aute occaecat magna est occaecat in aliqua enim occaecat laboris consequat veniam.\r\n",
			    "latitude": 63.15322,
			    "longitude": -176.585708,
			    "tags": [
			      "dolor"
			    ]
			  },
			  {
			    "_id": "54fbce59dab4ec91308d2281",
			    "isActive": false,
			    "name": "Plutorque",
			    "email": "robertahess@plutorque.com",
			    "phone": "+1 (875) 529-3618",
			    "address": {
			      "street": "842 Everit Street",
			      "city": "Henrico",
			      "state": "American Samoa",
			      "postal": 35349
			    },
			    "about": "Nulla ad dolore culpa ipsum ullamco nisi magna ipsum ipsum adipisicing laborum incididunt qui qui. Aliqua ut adipisicing irure sint ea incididunt ut elit deserunt sit nostrud. Dolore duis pariatur dolore pariatur veniam. Aliquip cupidatat fugiat do proident commodo irure enim irure amet. Exercitation mollit veniam sit ea nostrud adipisicing sunt sint voluptate mollit adipisicing exercitation.\r\n",
			    "latitude": -22.720304,
			    "longitude": -147.513818,
			    "tags": [
			      "mollit",
			      "amet",
			      "Lorem"
			    ]
			  },
			  {
			    "_id": "54fbce59cb386a6c26125a60",
			    "isActive": true,
			    "name": "Cytrak",
			    "email": "robertahess@cytrak.com",
			    "phone": "+1 (861) 495-3766",
			    "address": {
			      "street": "540 Hale Avenue",
			      "city": "Henrico",
			      "state": "Massachusetts",
			      "postal": 15915
			    },
			    "about": "Sunt incididunt sint sunt ut irure. Nulla enim deserunt mollit officia. Do consectetur consectetur ut cillum quis esse. Tempor excepteur culpa labore sunt Lorem id consequat irure velit. Sint ut proident nisi in cupidatat. Consequat voluptate dolor nulla ex eiusmod velit sint ea in do ad.\r\n",
			    "latitude": -76.945876,
			    "longitude": -52.50967,
			    "tags": [
			      "reprehenderit",
			      "aliqua",
			      "enim"
			    ]
			  },
			  {
			    "_id": "54fbce59da5530b0e20447dc",
			    "isActive": false,
			    "name": "Brainquil",
			    "email": "robertahess@brainquil.com",
			    "phone": "+1 (860) 455-3189",
			    "address": {
			      "street": "858 Stewart Street",
			      "city": "Henrico",
			      "state": "Puerto Rico",
			      "postal": 53491
			    },
			    "about": "Ipsum sit laborum consequat aliqua fugiat non esse voluptate excepteur mollit non consequat mollit. Et occaecat duis Lorem deserunt culpa quis amet esse ullamco consequat excepteur commodo exercitation. Officia tempor qui consequat sint velit quis. Excepteur qui est cupidatat aliquip proident. Exercitation quis ea ut sit voluptate quis duis et exercitation proident.\r\n",
			    "latitude": 1.858609,
			    "longitude": -108.796592,
			    "tags": [
			      "sunt"
			    ]
			  },
			  {
			    "_id": "54fbce59332da9fc42794806",
			    "isActive": false,
			    "name": "Zedalis",
			    "email": "robertahess@zedalis.com",
			    "phone": "+1 (839) 581-3620",
			    "address": {
			      "street": "663 Stuyvesant Avenue",
			      "city": "Richmond",
			      "state": "Arkansas",
			      "postal": 24573
			    },
			    "about": "Nulla enim ullamco excepteur occaecat veniam ullamco elit laborum mollit minim culpa. Amet dolore non enim qui consequat est et magna aliquip aute ea ea voluptate nulla. Ipsum fugiat deserunt anim amet nulla laborum et aliqua culpa ad occaecat esse. Qui labore id do velit. Enim excepteur mollit sunt culpa.\r\n",
			    "latitude": -12.018138,
			    "longitude": -128.910502,
			    "tags": [
			      "consequat",
			      "aliquip",
			      "non"
			    ]
			  }
			];

        return service;

        ////////////////

        function getBreweries() {
        	return breweries;
        }

        function getBrewery(id) {
        	for(var i = 0; i < breweries.length; i++) {
        		if(breweries[i]._id === id) {
        			return breweries[i];
        		}
        	}
        }

        function removeBrewery(_id) {
        	var removeIdx;
        	angular.forEach(breweries, function(value, idx) {
        		if(value._id === _id) {
        			removeIdx = idx;
        		}
        	});
        	if(removeIdx || removeIdx === 0) {
        		breweries.splice(removeIdx, 1);
        	}
        }

        function updateBrewery(_id, breweryStr) {
        	angular.forEach(breweries, function(value, idx) {
                if(value._id === _id) {
                    breweries[idx] = angular.fromJson(breweryStr);
                }
            });
        }
    }
})();