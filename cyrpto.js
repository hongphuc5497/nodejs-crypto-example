const crypto = require('crypto');

const ALGO = 'aes-256-ctr';
const SECRET = crypto.randomBytes(16).toString('hex');

const encrypt = (str) => {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(ALGO, SECRET, iv);
	const enc = Buffer.concat([cipher.update(str), cipher.final()]);

	return {
		iv: iv.toString('hex'),
		content: enc.toString('hex'),
	};
};

const decrypt = ({ iv, content }) => {
	const decipher = crypto.createDecipheriv(ALGO, SECRET, Buffer.from(iv, 'hex'));
	const dec = Buffer.concat([
		decipher.update(Buffer.from(content, 'hex')),
		decipher.final(),
	]);

	return dec.toString();
};
