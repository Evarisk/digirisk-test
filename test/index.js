var nightmare = require('./core/login')(function(nightmare) {
	require('./module/group/groupment')(nightmare, function() {
		require('./module/group/groupment-configuration')(nightmare, function() {
			require('./module/group/groupment-legal-display')(nightmare, function() {
				
			});
		});
	});
});
