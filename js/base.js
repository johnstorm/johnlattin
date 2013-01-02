
if (window.jl === undefined) jl = {};

function johnlattin($scope) {
	console.log("roar face", jl.utils);

	var utils = jl.utils;
	var toDashes = utils.toDashes;
	var toName = utils.toName;
	var toCamelCase = utils.toCamelCase;

	var lookupURL = function(place) {
		place = place.toLowerCase().replace(/\./g, '');
		console.log("place = " + place);
		switch (place) {
			case 'html': return 'http://en.wikipedia.org/wiki/HTML';
			case 'javascript': return 'http://en.wikipedia.org/wiki/Javascript';
			case 'spinejs': return 'http://spinejs.com/';
			case 'jquery': return 'http://jquery.com/';
			case 'angularjs': return 'http://angularjs.org/';
			case 'less': return 'http://lesscss.org/';
			case 'handlebarsjs': return 'http://handlebarsjs.com/';
		}
		return '';
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

		projects[index++] = $.extend({
			href: '#' + toDashes(key),
			name: toName(key)
		}, val);
	});
	projects.sort(function(a, b) {
		if (a.href < b.href) return -1;
		if (b.href < a.href) return 1;
		return 0;
	});
	$scope.projects = projects;

	var onHashChange = function() {
		var hash = location.hash;
		if (hash) hash = toCamelCase(hash.substring(1));
		
		$scope.project = projs[hash];
		console.log("hash changed to " + hash);

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
	}
};
