<template>
	<div class="mainArea">
		<div class="index-container">
			<div :class="['left-container', isPhone ? (showRightContainer ? 'show' : 'hide') : '']">
				<div class="left-container-top">
					<img src="/images/icon/favicon.ico" alt="" style="width: 8vw; height: auto" />
					<span class="site-main">yefengx</span>
					<span class="site-tail">.top</span>
				</div>
				<div class="nav-card left-container-middle">
					<span class="xicon" style="font-size: 16px">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 512 512"
						>
							<path
								d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
								fill="currentColor"
							></path>
						</svg>
					</span>
					<div class="text">
						<p>Hello World !</p>
						<p>一个建立于 21 世纪的小站，存活于互联网的边缘</p>
					</div>
					<span class="xicon" style="font-size: 16px">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 512 512"
						>
							<path
								d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"
								fill="currentColor"
							></path>
						</svg>
					</span>
				</div>
				<section class="left-container-bottom">
					<div
						v-for="card in linkCards"
						:href="card.link"
						style="cursor: pointer"
						@click="handleClick(card.link)"
					>
						<Icon :icon="card.icon" style="width: 36px; height: 36px" />
					</div>
				</section>
			</div>
			<div :class="['right-container', isPhone ? (!showRightContainer ? 'show' : 'hide') : '']">
				<section class="right-container-top">
					<div class="nav-card">
						<span class="hitokoto_text" style="text-align: start">{{ text }}</span>
						<span class="hitokoto_from" style="text-align: end; font-weight: bold"
							>-「&nbsp;{{ from }}&nbsp;」</span
						>
					</div>
					<div class="left-container-top phone-top">
						<span class="site-main">yefengx</span>
						<span class="site-tail">.top</span>
					</div>
					<div class="nav-card clock-card">
						<span class="date">{{ date }} {{ weekday }}</span>
						<span class="clock">{{ time }}</span>
						<span class="weather">{{ weather }}</span>
					</div>
				</section>
				<section class="site-grid">
					<div
						v-for="card in siteCards"
						:key="card.name"
						:href="card.link"
						class="nav-card nav-card-small"
						@click="handleClick(card.link)"
					>
						<Icon :icon="card.icon" style="width: 26px; height: 26px" />
						<span>{{ card.name }}</span>
					</div>
				</section>
			</div>
		</div>
		<div class="phone-switch" v-if="isPhone">
			<button @click="toggleRightContainer">
				<transition name="fade-icon" mode="out-in">
					<Icon
						:key="String(showRightContainer)"
						:icon="showRightContainer ? 'mingcute:menu-line' : 'mingcute:close-line'"
						style="width: 26px; height: 26px"
					/>
				</transition>
			</button>
		</div>
	</div>
</template>

<script lang="js" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";
import { getCityCodeByLocation, getWeatherByCity } from "../../../src/utils/getWeather";

const time = ref("");
const date = ref("");
const weekday = ref("");
const weather = ref("天气加载中");
const text = ref("加载中…");
const from = ref("加载中");
const siteCards = ref([]);
const linkCards = ref([]);
const showRightContainer = ref(true);
const isPhone = ref(false);

const weekMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

function updateTime() {
	const now = new Date();
	const y = now.getFullYear();
	const m = now.getMonth() + 1;
	const d = now.getDate();
	const w = weekMap[now.getDay()];
	const hh = String(now.getHours()).padStart(2, "0");
	const mm = String(now.getMinutes()).padStart(2, "0");
	const ss = String(now.getSeconds()).padStart(2, "0");

	date.value = `${y} 年 ${m} 月 ${d} 日`;
	weekday.value = w;
	time.value = `${hh}:${mm}:${ss}`;
}

function updateIsPhone() {
	if (typeof window !== "undefined") {
		isPhone.value = window.innerWidth <= 768;
	}
}

function toggleRightContainer() {
	showRightContainer.value = !showRightContainer.value;
}

let intervalId;

onMounted(async () => {
	// 时间更新
	updateTime();
	intervalId = setInterval(updateTime, 1000);

	// 是否为手机尺寸
	updateIsPhone();
	if (typeof window !== "undefined") {
		window.addEventListener("resize", updateIsPhone);

		// 防止 iOS 双指放大、双击缩放
		document.addEventListener("gesturestart", (e) => e.preventDefault());
		document.addEventListener("dblclick", (e) => e.preventDefault());
	}

	// 定位获取天气
	if (typeof navigator !== "undefined" && "geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { longitude, latitude } = position.coords;
				const cityCode = await getCityCodeByLocation(longitude, latitude);
				weather.value = await getWeatherByCity(cityCode);
			},
			() => {
				weather.value = "定位失败";
			},
			{ timeout: 5000 }
		);
	} else {
		weather.value = "浏览器不支持定位";
	}

	// 加载一言文本
	try {
		const reshit = await fetch("/data/hitokotoList.json");
		const list = await reshit.json();
		const random = list[Math.floor(Math.random() * list.length)];
		text.value = random.text;
		from.value = random.from;
	} catch (e) {
		text.value = "一言加载失败";
	}

	// 加载卡片数据
	try {
		const res = await fetch("/data/cards.json");
		const data = await res.json();
		siteCards.value = data.siteCards;
		linkCards.value = data.linkCards;
	} catch (e) {
		console.error("卡片数据加载失败", e);
	}
});

onBeforeUnmount(() => {
	if (typeof window !== "undefined") {
		window.removeEventListener("resize", updateIsPhone);
		document.removeEventListener("gesturestart", (e) => e.preventDefault());
		document.removeEventListener("dblclick", (e) => e.preventDefault());
	}
	clearInterval(intervalId);
});
</script>

<style lang="less" scoped>
@font-face {
	font-family: "Pacifico-Regular";
	src: url("/font/Pacifico-Regular.ttf") format("truetype");
	font-weight: normal;
	font-style: normal;
}

.show,
.hide {
	display: block;
}

.index-container {
	display: flex;
	gap: 20px;
}

.left-container {
	display: flex;
	flex: 0.8;
	gap: 3vh;
	flex-direction: column;
}

.left-container-top {
	user-select: none;
	margin-bottom: 4vh;
	display: flex;
}

.left-container-top span {
	display: block;
	margin-top: 5vh;
	font-size: 2rem;
	font-family: Pacifico-Regular;
	color: #fff;
}

.left-container-top span:nth-of-type(1) {
	font-size: 5rem;
	margin-top: 4vh;
	margin-inline-start: 1rem;
	margin-inline-end: 0.2rem;
}

.left-container-middle {
	display: flex;
	flex-direction: row !important;
	justify-content: space-between;
}

.left-container-bottom {
	display: flex;
	align-items: center;
}

.right-container {
	display: flex;
	flex-direction: column;
	gap: 20px;
	flex: 1;
}

.right-container-top {
	display: flex;
	gap: 20px;
	flex: 1;
	align-items: stretch;
}

.site-grid {
	display: grid;
	flex: 1;
	grid-template-columns: repeat(3, 1fr);
	gap: 2vh 2vw;
}

.xicon {
	width: 1em;
	height: 1em;
	display: inline-flex;
}

.xicon:nth-of-type(2) {
	align-self: flex-end;
}

.text {
	margin: 0.75rem 0rem;
	text-align: left;
	line-height: 2rem;
	transition: opacity 0.2s;
	white-space: nowrap;
}

.text p:nth-of-type(1) {
	font-family: Pacifico-Regular;
}

.nav-card {
	display: flex;
	flex-direction: column;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 12px;
	text-align: center;
	justify-content: center;
	padding: 20px;
	gap: 20px;
	user-select: none;
	flex: 1;
	backdrop-filter: blur(100px);
	-webkit-backdrop-filter: blur(10px);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
	overflow: hidden;
}

.nav-card-small {
	gap: 8px;
	flex-direction: row;
	align-items: center;
	font-size: 1.1rem;
	color: #fff;
	cursor: pointer;
	background: rgba(255, 255, 255, 0.1);
	transform-origin: center;
	transition:
		transform 0.2s ease,
		background-color 0.2s ease,
		box-shadow 0.2s ease;
}

.nav-card-small:hover,
.nav-card-small:focus,
.nav-card-small:active {
	background: rgba(255, 255, 255, 0.12) !important;
	transform: scale(1.05);
	opacity: 1;
}

.nav-card .date {
	font-size: 1.2rem;
	color: #eee;
	white-space: nowrap;
}

.nav-card .clock {
	font-size: 2.2rem;
	font-weight: 700;
	letter-spacing: 3px;
	color: #fff;
}

.mainArea {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.phone-top {
	display: none;
}

.vp-doc img {
	margin: unset;
}

.vp-doc p,
.vp-doc summary {
	margin: unset;
	line-height: unset;
}

@media (max-width: 768px) {
	.hide {
		display: none;
	}

	.right-container-top .nav-card:nth-child(1) {
		display: none;
	}

	.left-container {
		flex: 1;
		/* display: none; */
		margin-bottom: auto;
	}

	.left-container-top {
		text-align: center;
	}

	.left-container-top img {
		height: 14vh !important;
		width: auto !important;
	}

	.left-container-top span {
		margin-top: 4vh;
	}

	.left-container-top span:nth-of-type(1) {
		margin-left: auto;
		margin-right: unset;
		margin-top: 3vh;
		font-size: 3.4rem;
	}

	.left-container-bottom {
		padding: 0 4vw;
		justify-content: space-between;
		margin-bottom: 2vh;
	}

	.text {
		white-space: unset;
	}

	.VPFooter {
		display: none;
	}

	.right-container-top {
		flex-direction: column;
	}

	.clock-card {
		margin-bottom: 4vh;
	}

	.nav-card-small {
		gap: 4px;
		flex-direction: column;
		align-items: center;
		font-size: 1rem;
		color: #fff;
		cursor: pointer;
	}

	.phone-top {
		display: flex;
		justify-content: center;
		margin-bottom: 4vh;
	}

	.phone-top span:nth-of-type(1) {
		margin-left: unset;
		margin-right: unset;
		margin-top: 3vh;
	}

	.phone-switch {
		display: block;
		margin: auto;
	}

	.phone-switch button {
		display: flex;
		background-color: #2e2e2e;
		padding: 2px 12px;
		border: 1px solid #2e2e2e;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
		align-items: center;
	}

	.fade-icon-enter-active,
	.fade-icon-leave-active {
		transition: opacity 0.2s;
	}

	.fade-icon-enter-from,
	.fade-icon-leave-to {
		opacity: 0;
	}
}
</style>
