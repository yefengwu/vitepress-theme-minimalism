const fallbackCity = "110101";

export async function getCityCodeByLocation(lng: number, lat: number): Promise<string> {
	try {
		const res = await fetch(`https://frank-zone-3ev18q5xw100-1371197123.eo-edgefunctions1.com`);
		const data = await res.json();
		return data.regeocode?.addressComponent?.adcode || fallbackCity;
	} catch (err) {
		console.error("获取城市编码失败", err);
		return fallbackCity;
	}
}

export async function getWeatherByCity() {
	try {
		const res = await fetch(`https://frank-zone-3ev18q5xw100-1371197123.eo-edgefunctions1.com/`);
		const data = await res.json();

		if (data.status == 0 && data.result?.realtime?.length > 0) {
            const info = data.result.realtime[0];
			return `${info.city}${info.district} ${info.infos.weather} ${info.infos.temperature}℃ 湿度 ${info.infos.humidity}%`;
		} else {
			return "天气获取失败";
		}
	} catch (err) {
		console.error("天气请求异常", err);
		return "天气请求异常";
	}
}

// getWeatherByCity().then(console.log);