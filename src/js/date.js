var pad = function(num) { return ('00'+num).slice(-2) };

Date.prototype.getSqlDate = function(time) {

	time = typeof time === 'undefined' ? false:true;

	let date = this.getFullYear()         + '-' +
	pad(this.getMonth() + 1)  + '-' +
	pad(this.getDate());
	
	if (time) {
		date += ' '+
			pad(this.getHours())      + ':' +
			pad(this.getMinutes())    + ':' +
			pad(this.getSeconds());
	}

	return date;
};