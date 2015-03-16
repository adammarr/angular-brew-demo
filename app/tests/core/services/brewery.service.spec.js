(function() {
	'use strict'

	describe('BreweryService', function() {

		var BreweryService,
			$httpBackend,
			$rootScope,
			breweryData = [{"_id": "54fbce59a6429d11b08bd555", "isActive": true, "name": "Eternis", "email": "robertahess@eternis.com", "phone": "+1 (952) 423-3868", "address": {"street": "754 Rutherford Place", "city": "Henrico", "state": "Florida", "postal": 59052 }, "about": "Cupidatat ullamco irure proident cupidatat irure magna ex. Consequat cillum velit excepteur occaecat amet aute. Eiusmod reprehenderit consectetur Lorem nostrud dolor nostrud aliqua tempor sit officia nostrud incididunt. Proident culpa duis magna magna non consequat commodo commodo ullamco non esse. In fugiat occaecat occaecat irure est veniam.\r\n", "latitude": -30.045733, "longitude": 0.394936, "tags": ["eu", "ad"] }, {"_id": "54fbce594db06693dae10360", "isActive": true, "name": "Viasia", "email": "robertahess@viasia.com", "phone": "+1 (870) 536-3582", "address": {"street": "344 Ferris Street", "city": "Chesterfield", "state": "Tennessee", "postal": 56133 }, "about": "Duis excepteur culpa cillum labore aute magna aliquip amet cillum adipisicing consectetur cupidatat. Ad eu aliquip voluptate irure duis enim. Nostrud elit do esse elit incididunt nulla sint deserunt fugiat non. Ullamco minim sint ut velit non qui proident.\r\n", "latitude": -15.784989, "longitude": 127.062936, "tags": ["aute", "mollit", "ullamco"] }, {"_id": "54fbce59a600b7a1c1cf0279", "isActive": false, "name": "Exodoc", "email": "robertahess@exodoc.com", "phone": "+1 (923) 525-3736", "address": {"street": "881 Manhattan Avenue", "city": "Richmond", "state": "Nevada", "postal": 83400 }, "about": "Elit occaecat minim mollit adipisicing ut nostrud sint duis nisi. Proident nulla non occaecat sint amet mollit. Minim qui laboris elit ad ea pariatur ipsum proident ex. Cupidatat laboris officia ipsum ipsum velit. Ex voluptate aliqua eiusmod nulla. Ex et amet sint et est nisi non sint. Lorem adipisicing mollit laboris eiusmod fugiat sit consectetur ut.\r\n", "latitude": -19.594779, "longitude": -68.728148, "tags": ["anim", "dolore", "est"] }];

		beforeEach(module('brew.core')); //our module
		beforeEach(module('stateMock')); //avoid issues with ui-router
 
 		//create fresh instances before each test (it)
  		beforeEach(inject(function (_BreweryService_, _$httpBackend_, _$rootScope_) {
    		BreweryService = _BreweryService_;
    		$httpBackend = _$httpBackend_;
    		$rootScope = _$rootScope_;
  		}));

  		//Single test definition
  		it('Brewery search and linked functions', function() {
  			var searchResult;
  			$httpBackend.expectGET('/api/breweries').respond(breweryData);

  			BreweryService.search().then(function(data) { 
  				searchResult = data;
  			});
    
    		$httpBackend.flush(); //flush http calls out

  			$rootScope.$apply(); //this with force promises to resolve, such as the search above
  			
  			//test expectations, pass/fail
  			expect(searchResult.length).toBe(3);
  			expect(searchResult.length).toBe(BreweryService.getBreweries().length);
  			expect(BreweryService.getCities().length).toBe(3);
  		});

  		it('Brewery find by ID', function() {
  			var searchResult;
  			$httpBackend.expectGET('/api/breweries/54fbce59a6429d11b08bd555').respond(breweryData[0]);

  			BreweryService.find('54fbce59a6429d11b08bd555').then(function(data) { 
  				searchResult = data;
  			});
    
    		$httpBackend.flush();

  			$rootScope.$apply();
  			
  			expect(searchResult.name).toBe('Eternis');
  		});

  		it('Brewery update', function() {
  			var searchResult,
  				updateData = angular.copy(breweryData[0]);
  			updateData.name = 'Updated';

  			$httpBackend.expectGET('/api/breweries').respond(breweryData);
  			BreweryService.search().then(function(data) { 
  				searchResult = data;
  			});
    		$httpBackend.flush();
  			$rootScope.$apply();

  			$httpBackend.expectPUT('/api/breweries/54fbce59a6429d11b08bd555').respond(updateData);
  			BreweryService.update(updateData);
    		$httpBackend.flush();
  			$rootScope.$apply();
  			
  			expect(updateData.name).toBe(BreweryService.getBreweries()[0].name);
  		});

  		it('Brewery update', function() {
  			var searchResult;

  			$httpBackend.expectGET('/api/breweries').respond(breweryData);
  			BreweryService.search().then(function(data) { 
  				searchResult = data;
  			});
    		$httpBackend.flush();
  			$rootScope.$apply();

  			$httpBackend.expectDELETE('/api/breweries/54fbce59a6429d11b08bd555').respond(searchResult[0]);
  			BreweryService.removeBrewery('54fbce59a6429d11b08bd555');
    		$httpBackend.flush();
  			$rootScope.$apply();
  			
  			expect(BreweryService.getBreweries().length).toBe(2);
  		});

	});
})();