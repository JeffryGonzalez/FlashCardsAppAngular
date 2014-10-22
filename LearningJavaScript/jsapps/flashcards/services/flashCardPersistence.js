app.service("flashCardPersistence", function ($q, slugService) {
	if (!window.indexedDB) {
		alert("Your browser doesn't support IndexedDb. good luck with that.");
		return {};
	}
	var dbName = "flash-cards";
	var version = 1;
	var db;


	var sampleStacks = [
		{
			title: "JavaScript", cards: [
				{ q: "Are there classes in JavaScript?", a: "Nope" },
				{ q: "Are semicolons optional in JavaScript?", a: "Sometimes" },
				{ q: "How do you do multi-threading in JavaScript, if you really, really wanted to?", a: "You can't. Webworkers are close" },
				{ q: "Java is to JavaScript as Ham is to Hamster", a: "True" }
			]
		},
		{
			title: "Star Wars", cards: [
				{ q: "What are the little guys who collect droids on tatooine called?", a: "Jawas" },
				{ q: "True or False: Leia is actually Jabba The Hutt's sister.", a: "false" }
			]
		},
		{
			title: "State Capitals", cards: [
				{ q: "Ohio", a: "Columbus" },
				{ q: "Colorado", a: "Denver" },
				{ q: "Indiana", a: "Indianapolis" }
			]
		}

	];
	sampleStacks.forEach(function (stack) {
		stack.slug = slugService.slugify(stack.title);
	});
	initialize();

	function initialize() {
		console.info("Initializing");
		var d = $q.defer();
		openDb().then(function () {
			console.info("initializing", "dbopen");
			getAll().then(function (rows) {
				if (rows.length === 0) {
					var promises = [];
					sampleStacks.forEach(function (stack) {
						promises.push(addItem(stack));
					});
					$q.all(promises).then(d.resolve);
				} else {
					d.resolve();
				}
			});
		}, function (error) {
			console.error(error);
		});

		return d.promise;
	}

	function openDb() {
		var d = $q.defer();

		console.info("opening database.");
		var request = indexedDB.open(dbName, version);

		request.onsuccess = function (e) {
			console.log("successfully opened database");
			db = this.result;
			d.resolve();
		};
		request.onerror = function (e) {
			console.error("Database Error");
			console.dir(e);
			d.reject(e.toString());
		};

		request.onupgradeneeded = function (e) {
			db = this.result;
			console.warn("upgrading");
			if (!db.objectStoreNames.contains("stacks")) {
				var objectStore = db.createObjectStore("stacks", { autoIncrement: true });
				objectStore.createIndex("slug", "slug", { unique: true });
				objectStore.success = function () {
				    d.resolve();
				};

			}
		};
		return d.promise;
	}

	function addItem(item) {
		var d = $q.defer();
		var trans = db.transaction(["stacks"], "readwrite");
		var items = trans.objectStore("stacks");
		items.add(item);
		trans.oncomplete = function () {
			d.resolve();
		};
		return d.promise;
	}
	function getBySlug(slug) {
		var d = $q.defer();
		var objectStore = db.transaction(["stacks"], "readonly").objectStore("stacks");
		var index = objectStore.index("slug");
		var get = index.get(slug);
		get.onsuccess = function (event) {
			d.resolve(this.result);
		};
	    get.onerror = function(e) {
	        console.error("Error:", e);
	    };
		return d.promise;
	}

	function getAll() {

		var d = $q.defer();

		var items = db.transaction(["stacks"], "readonly").objectStore("stacks");
		var result = [];
		var tx = items.openCursor();
	    tx.onsuccess = function(event) {
	        console.log("getting the rows!");
	        var cursor = this.result;

	        if (cursor) {
	            result.push(cursor.value);
	            cursor.continue();
	        } else {
	            d.resolve(result);
	        }
	    };

		tx.onerror = function (e) {
			console.error(e);
			d.reject(e.toString());
		};

		return d.promise;
	}

	return {
		initialize: initialize,
		open: openDb,
		addItem: addItem,
		getAll: getAll,
		getBySlug: getBySlug
	};

});

