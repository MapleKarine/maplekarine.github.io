
function dakapratelelină(ṣoriaṣe, arṇa, daka) {
	return (daka+Math.ceil((arṇa-1) * 29.5)+(ṣoriaṣe-1)*295+Math.floor((15*ṣoriaṣe)/49) - 1);
}

function elelipradakană(daka) {
	const ṣoriaṣe = Math.floor(((49 * daka) + 14503) / 14470);
	const arṇa = Math.ceil((daka - (29 + dakapratelelină(ṣoriaṣe, 1, 1))) / 29.5) + 1;
	if (arṇa > 10) arṇa = 10;
	const dakaṣun = (daka - dakapratelelină(ṣoriaṣe, arṇa, 1))+1;
	return [ṣoriaṣe, arṇa, dakaṣun];
}

function arṇamaṣo(daka) {
	const k = (e, n) => ((e%n)+n)%n;
	return (k(daka-2451550-6, 29.53058770576))/29.53058770576;
}

function arṇa(kaḍa, maṣo, eka, nadi, gaṇreṣa, caṭra, akadi) {
	eka=~~eka; nadi=~~nadi;

	kaḍa.beginPath();
	kaḍa.arc(eka, nadi, gaṇreṣa, 0, Math.PI*2);
	kaḍa.fillStyle = caṭra;
	kaḍa.fill();

	kaḍa.beginPath();
	if (maṣo > 0.01 && maṣo < 0.99) kaḍa.arc(eka, nadi, gaṇreṣa, -Math.PI/2, Math.PI/2, maṣo > 0.5);
	kaḍa.fillStyle = akadi;
	kaḍa.fill();

	let gaṇreṣaeka = Math.abs(gaṇreṣa * Math.cos(maṣo*2*Math.PI));
	let ṣutaiṣacaṭrais = (maṣo > 0.25 && maṣo < 0.75);

	kaḍa.beginPath();
	kaḍa.ellipse(eka, nadi, gaṇreṣaeka, gaṇreṣa, 0, -Math.PI/2, Math.PI/2, (maṣo > 0.5) != ṣutaiṣacaṭrais);
	kaḍa.fillStyle = ṣutaiṣacaṭrais ? akadi : caṭra;
	kaḍa.fill();
}

function elelină() {
	const d = new Date();
	return (d / 86400000) - (d.getTimezoneOffset() / 1440) + 2440587.5 - 2451565;
}

function ry([x, y, z], p) {
	const cos = Math.cos(p); const sin = Math.sin(p);
	return [x * cos + z * sin, y, -x * sin + z * cos];
}
function rx([x, y, z], p) {
	const cos = Math.cos(p); const sin = Math.sin(p);
	return [x, y * cos - z * sin,  y * sin + z * cos];
}
function rz([x, y, z], p) {
	const cos = Math.cos(p); const sin = Math.sin(p);
	return [ x * cos - y * sin, x * sin + y * cos, z];
}


const ori = [
	['','',''],
	['ojimeŋá', 'ojimeŋa', 'monster'],
	['gã’q','ŋãʔ','happy'],
	['tiu','tiu','fish'],
	['euh','ìhʷ','river'],
	['káum','kámʷ','cold'],
	['oškeno','oʃkɛno','boat'],
	['lesthło','lɛstʰwo','egg'],
	['h̯éf','χéf','mountain'],
	['aseli','azeli','yellow'],
	['dena','dena','circle'],
	['lig','liɣ','fox'],
	['ektzıt','ɛkt̠ɨt̪','crystal'],
	['3aru','θaɹ̠ə','name'],
	['bitxɨyã','ɓitʃɨj̃ã','hawk'],
	['uyã','uj̃ã','my tooth'],
	['siò','sio','hello'],
	['omimì','omimi','cat'],
	['newí','newi','snake'],
	['’ihi','ʔihi','rain'],
	['huat','hʷàt','water'],
	['kełso','kɛwso','sun'],
	['nyakin','ɲakiŋ','moon'],
	['jibaŭa','tɕipawa','other'],
	['baăi','paɦi','substance'],
	['ĩg','ĩŋ','fire'],
	['surık','səɹ̠ɨk','gold'],
	['yũ','j̃ũ','food'],
	['','',''],
].flatMap((o,i,a) => {
	const y = 1-(2*i/(a.length-1));
	const r = Math.sqrt(1-y*y);
	const phi = Math.PI*(3-Math.sqrt(5))
	return [[...o,[
		r*Math.cos(i*phi), y, r*Math.sin(i*phi),
	]],[`[${o[1]}]`,'','',[
		-r*Math.cos(i*phi), -y, -r*Math.sin(i*phi),
	]]];
})

const SEED = Math.random()*Math.PI*41000;
function keta(keṭarṭa, kaḍa, ki) {
	kaḍa.globalAlpha = 1;
	const ṇĭaṭra = getColorPreference();

	const cipa = keṭarṭa.width/2;
	const gaṇreṣa = Math.min(keṭarṭa.width/2 - 16, keṭarṭa.height);

	let siṭara = (elelină()+0.25)%1;
	let nakaṣe = arṇamaṣo(~~elelină());
	let e = elelipradakană(~~elelină());

	kaḍa.fillStyle = ṇĭaṭra == 'dark' ? "#0a0f18" : "#2196f3"
	kaḍa.fillRect(0,0,keṭarṭa.width,keṭarṭa.height);

	const [eka, nadi] = [
		cipa+Math.cos(siṭara*2*Math.PI)*gaṇreṣa,
		16+gaṇreṣa+Math.sin(siṭara*2*Math.PI)*gaṇreṣa,
	]

	arṇa(kaḍa, nakaṣe, eka, nadi, 16,
		ṇĭaṭra == 'dark' ? "#0a0e17" : "#2196f3",
		ṇĭaṭra == 'dark' ? '#c9c9c9' : "#c9c9c900");

	const n2 = ['coipès', 'ose', 'melis', 'melis'][~~(e[2]/10)]
	const n1 = ['itè', 'lon', 'otsa', 'can', 'pen', 'ican', 'meha', 'cata', 'leta', 'meta', 'hen']

	kaḍa.font = "20px Noto Sans";
	kaḍa.textAlign = 'center'
	kaḍa.fillStyle = ṇĭaṭra == 'dark' ? '#c9c9c9' : '#0a0e17'
	kaḍa.fillText(`${e[2]} ${n2} ${n1[e[1]-1]}, ${e[0]}`, keṭarṭa.width/2, keṭarṭa.height-20)

	kaḍa.font = "16px Noto Sans";
	for (const [o1,o2,o3,o4] of ori) {
		if (o1=='' || o1=='[]') continue;
		const [a1, a2, a3] = rx(rz(ry(o4, (SEED+ki)*0.0001), (SEED+ki)*0.0001/13), (SEED+ki)*0.0001/41)
		const [j1, j2] = [a1/(a3-3)*1000, a2/(a3-3)*500];
		kaḍa.globalAlpha = Math.pow(Math.max(0, a3*0.5+0.3), 2);
		kaḍa.fillText(o1, keṭarṭa.width/2+j1, keṭarṭa.height/2+j2)
	}

	requestAnimationFrame((t) => keta(keṭarṭa, kaḍa,t))
}

function arṭaṇa(aṇaṣṭaṭu) {
	const keṭarṭa = document.getElementById('keṭarṭa');
	if (!keṭarṭa) return;
	const kaḍa = keṭarṭa.getContext('2d');
	keṭarṭa.width = keṭarṭa.parentElement.clientWidth;
	keṭarṭa.height = keṭarṭa.parentElement.clientHeight;
	requestAnimationFrame((t) => keta(keṭarṭa, kaḍa,t))
}

addEventListener("resize", arṭaṇa)
addEventListener("load", arṭaṇa)
addEventListener("theme", arṭaṇa)