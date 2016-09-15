var nightmare = require('./core/login')(function(nightmare) {
	require('./module/group/groupment')(nightmare);
});
