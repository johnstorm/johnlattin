
if (window.jl === undefined) jl = {};

function johnlattin($scope) {
	console.log("roar face", jl.utils);

	var utils = jl.utils;
	var toDashes = utils.toDashes;
	var toName = utils.toName;
	var toCamelCase = utils.toCamelCase;
	var loadStringArray = utils.loadStringArray;

	var lookupTable = {};
	lookupTable['html'] = 'http://en.wikipedia.org/wiki/HTML';
	lookupTable['javascript'] = 'http://en.wikipedia.org/wiki/Javascript';
	lookupTable['spinejs'] = 'http://spinejs.com/';
	lookupTable['jquery'] = 'http://jquery.com/';
	lookupTable['angularjs'] = 'http://angularjs.org/';
	lookupTable['less'] = 'http://lesscss.org/';
	lookupTable['handlebarsjs'] = 'http://handlebarsjs.com/';
	lookupTable['objective-c'] = 'http://en.wikipedia.org/wiki/Objective-C';
	lookupTable['c'] = 'http://en.wikipedia.org/wiki/C_(programming_language)';
	lookupTable['c++'] = 'http://en.wikipedia.org/wiki/C%2B%2B';
	lookupTable['opengl es 11'] = 'http://www.khronos.org/opengles/sdk/1.1/docs/man/';

	var lookupURL = function(place) {
		place = place.toLowerCase().replace(/\./g, '');
		place = lookupTable[place];
		return place ? place : '';
	};

	var projs = jl.projects;
	var projects = [];
	var index = 0;
	$.each(projs, function(key, val) {
		var lang = val.lang;
		if (lang) {
			var langList = [];
			var langName;
			for (var langIndex = 0, langCount = lang.length; langIndex < langCount; ++langIndex) {
				langName = lang[langIndex];
				langList[langIndex] = { name: langName, url: lookupURL(langName) };
			}
			val.lang = langList;
		}

		val.description = loadStringArray('./txt/' + key.toLowerCase() + '.txt');

		projects[index++] = $.extend({
			href: '#' + toDashes(key),
			name: toName(key)
		}, val);
	});

	/*projects.sort(function(a, b) {
		if (a.href < b.href) return -1;
		if (b.href < a.href) return 1;
		return 0;
	});*/

	$scope.projects = projects;
	console.log("projects = ", $.extend({}, projects));

	var onHashChange = function() {
		var hash = location.hash;
		if (hash) hash = toCamelCase(hash.substring(1));
		
		console.log("[" + hash + "] projs = ", projs);
		$scope.project = projs[hash];
		console.log("hash changed to " + hash, $scope.project);

		var showProject = hash && hash !== 'about' && hash !== 'resume';
		$scope.showAbout = hash === 'about' || !hash;
		$scope.showResume = hash === 'resume';
		$scope.showEmptyProject = showProject && $scope.project === undefined;
		$scope.showProject = showProject && $scope.project !== undefined

		$scope.hash = hash;
		if (!$scope.$$phase) $scope.$apply(function () { });
	};

	$(window).hashchange(onHashChange);
	onHashChange();
}

jl.utils = {
	toCamelCase: function (value) {
		value = jl.utils.toUnderscores('' + value).split('_');
		var str = value[0];
		for (var index = 1, count = value.length, val = undefined; index < count; ++index) {
			val = value[index];
			str += val.substr(0, 1).toUpperCase() + val.substr(1, val.length);
		}
		return str;
	},
	toUnderscores: function (value) {
		return jl.utils.toDashes(value).replace(/\-/g, '_');
	},
	toDashes: function (value) {
		value = ('' + value);
		if (value.length <= 1) {
			return value.toLowerCase();
		}
		value = value.substr(0, 1).toLowerCase() + value.substr(1, value.length);
		return value.replace(/[A-Z]/g, function (match) {
			return '-' + match.toLowerCase();
		});
	},
	toName: function (value) {
		value = jl.utils.toUnderscores('' + value).split('_');
		for (var index = 0, count = value.length; index < count; ++index) {
			value[index] = value[index].substring(0, 1).toUpperCase() + value[index].substring(1);
		}
		return value.join(' ');
	},
	loadStringArray: function (file) {
		var array = [];
		$.ajax({
			url: file,
			type: "GET",
			dataType: "text",
			async: false,
			cache: true,
			success: function (data) {
				var derterm = 'now_|_later';
				data = data.replace(/\r\n|\r|\n/g, derterm).split(derterm);
				for (var index = 0, count = data.length, val = ""; index < count; ++index) {
					val = data[index];
					if (val) {
						array.push(val);
					}
				}
			},
			error: function (xhr, status, exception) {
				throw new Error("File '" + text + "' was not found. Status: '" + status + "', exception: '" + exception + "'");
			}
		});

		return array;
	}
};
