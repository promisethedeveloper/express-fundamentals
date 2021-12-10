class ExpressError extends Error {
	constructor(msg, status) {
		super();
		this.msg = msg;
		this.status = status;
		// stack is defined on every error instance
		console.log(this.stack);
	}
}

module.exports = ExpressError;
