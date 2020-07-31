const URL = 'https://fucaiapi.yiruit.com/yiru/rds/';
const PicURL = 'http://fucai.yiruit.com';
const cachetime = 30;
//判断是否登录
//url_keyvalue格式：ID=123&UserName=abc
function isLogin(obj, zhuantiao) {
	var userState = getstate();
	if (!!userState.ID) {
		return true;
	} else {
		if (zhuantiao) {
			uni.reLaunch({
				url: "/pages/login/userLogin"
			});
		}
		return false;
	}
}

function logout(_bool) {
	// uni.clearStorageSync();
	if (!_bool) {
		uni.reLaunch({
			url: "/pages/login/userLogin"
		});
	}
}

function getHeadImg(_url, _sex) {
	if (!!_url) {
		return _url.substr(0, 4) == "http" ? _url : PicURL + _url;
	}
	if (_sex == 1) {
		return "/static/on-boy.jpg";
	} else {
		return "/static/on-girl.jpg";
	}
}

function request(par) {
	//console.log(JSON.stringify(par.data));
	// return new Promise((resolve, reject) => {
		if (par.cache) {
			var _value = uni.getStorageSync(par.cache.key);
			if (_value) {
				var _valuejson = JSON.parse(_value);
				if (TimeDifference(new Date(_valuejson.addtime), new Date()) < (par.cache.time ? par.cache.time : cachetime)) {
					uni.hideLoading();
					//console.log("缓存数据");
					return par.success(_valuejson.data);
				}
			}
		}
		wx.showLoading({
			title: "数据加载中...",
			mask: true,
		});
		uni.request({
			url: URL + par.path,
			data: postdata(par.data || ""),
			method: par.method ? par.method : 'POST',
			dataType: 'json',
			success: (res) => {
				if (!par.isloading) {
					// uni.hideLoading();
				}
				// uni.hideLoading();
				if (res.data.code == 200 || res.data.code == 400) {
					if (par.cache) {
						uni.setStorageSync(par.cache.key, JSON.stringify({
							data: res.data.data,
							addtime: new Date()
						}));
					}
					return par.success(res.data);
					// resolve(par.success(res.data.data))
				}
				if (res.data.code == 410) {
					logout(true);
					// uni.hideLoading();
					uni.reLaunch({
						url: "/pages/login/userLogin"
					});
				} else {
					if (!par.fail) {
						uni.showToast({
							icon: 'none',
							title: res.data.info
						});
						//console.log(JSON.stringify(par));
					} else {
						return par.fail(res.data);
						// reject(res.data)
					}
				}
			},
			fail: (e) => {
				// uni.hideLoading();
				uni.showToast({
					icon: 'none',
					title: '网络异常,请稍后重试'
				});
				
			},
			complete() {
				uni.hideLoading();
			}
		});
	// })
}

function requestFile(par) {
	var up = uni.uploadFile({
		url: URL + par.path,
		filePath: par.file,
		name: 'upload',
		formData: postdata(par.data),
		success: function (res) {
			console.log(JSON.stringify(res));
			uni.hideLoading();
			if (res.statusCode == 200) {
				var arr = JSON.parse(res.data);
				if (arr.code == 200) {
					return par.success(arr.data);
				}
				if (arr.code == 410) {
					setstate({});
					uni.reLaunch({
						url: "/pages/login/userLogin"
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: arr.info
					});
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: '请求错误，请稍后再试'
				});
			}
		},
		fail: (e) => {
			uni.hideLoading();
			uni.showToast({
				icon: 'none',
				title: '网络异常,请稍后重试'
			});
		}
	});
	if (par.Progress) {
		up.onProgressUpdate(function (res) {
			return par.Progress(res);
		});
	}
}
//2各日期相差分钟数
function TimeDifference(k, j) {
	return (j.getTime() - k.getTime()) / 1000 / 60; //时间差的毫秒数
};
//统计封装的请求数据
function postdata(data) {
	var pos = {};
	pos.loginMark = getloginMark();
	pos.token = getstate().token;
	if (isJsonFormat(data)) {
		pos.data = JSON.stringify(data || {});
	} else {
		pos.data = data;
	}
	//pos.data = JSON.stringify(data);
	return pos;
};

function isJsonFormat(str) {
	var obj = str;
	var xy = Object.prototype.toString.call(obj);
	if (xy == "[object Object]" || xy == "[object Array]") {
		return true;
	} else {
		return false;
	}
};
//获取会员缓存的信息
function getstate() {
	var state = uni.getStorageSync('fucaistate') || "{}";
	return JSON.parse(state);
}
//设置会员缓存信息
function setstate(state) {
	uni.setStorageSync('fucaistate', JSON.stringify(state));
}

function checkPhone(phone) {
	phone = phone || '';
	var reg = /^0?(13|15|18|16|14|17|19)[0-9]{9}$/;
	return (reg.test(phone));
};

function checkNumber(Number) {
	if (Number === "" || Number == null) {
		return false;
	}
	if (!isNaN(Number)) {
		return true;
	}
	return false;
};
//小程序端自动生成设备识别码
function customuuid() {
	var len = 29;
	var radix = 16; //基数
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [],
		i;
	radix = radix || chars.length;
	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return 'MP_' + uuid.join('');
}
//获取设备识别码
function getloginMark() {
	//uni.removeStorageSync('loginMark');
	var mark = uni.getStorageSync('loginMark');
	if (!mark) {
		mark = customuuid();
		uni.setStorageSync('loginMark', mark);
	}
	return mark;
}


export default {
	URL,
	isLogin,
	logout,
	getloginMark,
	request,
	requestFile,
	setstate,
	getstate,
	checkPhone,
	checkNumber,
	PicURL,
	getHeadImg
}
