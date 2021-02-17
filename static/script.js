const list_quran = [
  "Al Fatihah",
  "Al Baqarah",
  "Ali 'Imran",
  "An Nisa'",
  "Al Ma'idah",
  "Al An'am",
  "Al A'raf\xa0",
  "Al Anfal",
  "At Taubah",
  "Yunus",
  "Hud",
  "Yusuf",
  "Ar Ra'd",
  "Ibrahim",
  "Al Hijr",
  "An Nahl",
  "Al Isra'",
  "Al Kahfi",
  "Maryam",
  "Taha",
  "Al Anbiya'",
  "Al Hajj",
  "Al Mu'minun",
  "An Nur",
  "Al Furqan",
  "Asy Syu'ara'",
  "An Naml",
  "Al Qasas",
  "Al 'Ankabut",
  "Ar Rum",
  "Luqman",
  "As Sajdah",
  "Al Ahzab",
  "Saba'",
  "Fatir",
  "Yasin",
  "As Saffat",
  "Sad",
  "Az Zumar",
  "Gafir",
  "Fussilat",
  "Asy Syura",
  "Az Zukhruf",
  "Ad Dukhan",
  "Al Jasiyah",
  "Al Ahqaf",
  "Muhammad",
  "Al Fath",
  "Al Hujurat",
  "Qaf",
  "Az Zariyat",
  "At Tur",
  "An Najm",
  "Al Qamar",
  "Ar Rahman",
  "Al Waqi'ah",
  "Al Hadid",
  "Al Mujadilah",
  "Al Hasyr",
  "Al Mumtahanah",
  "As Saff",
  "Al Jumu'ah",
  "Al-Munafiqun",
  "At Tagabun",
  "At Talaq",
  "At Tahrim",
  "Al Mulk",
  "Al Qalam",
  "Al Haqqah",
  "Al Ma'arij",
  "Nuh",
  "Al Jinn",
  "Al Muzzammil",
  "Al Muddassir",
  "Al Qiyamah",
  "Al Insan",
  "Al Mursalat",
  "An Naba'",
  "An Nazi'at",
  "'Abasa",
  "At Takwir",
  "Al Infitar",
  "Al Mutaffifin",
  "Al-Insyiqaq",
  "Al Buruj",
  "At Tariq",
  "Al A´Laa",
  "Al-Gasyiyah",
  "Al Fajr",
  "Al Balad",
  "Asy Syams",
  "Al Lail",
  "Ad Duha",
  "Asy Syarh",
  "At Tin",
  "Al 'Alaq",
  "Al Qadr",
  "Al Bayyinah",
  "Al Zalzalah",
  "Al 'Adiyat",
  "Al Qari'ah",
  "At Takasur",
  "Al 'Asr",
  "Al Humazah",
  "Al Fil",
  "Quraisy",
  "Al Ma'un",
  "Al Kausar",
  "Al Kafirun",
  "An Nasr",
  "Al Lahab",
  "Al Ikhlas",
  "Al Falaq",
  "An Nas",
];
const list = document.querySelector("#list");
const upper = document.querySelector("#upper");
const keyword = document.querySelector("#keyword");
const button = document.querySelector("#click");
const surah = document.querySelectorAll(".surah");
const input = document.querySelector("input");

list.addEventListener("click", () => {
  const rawHtml = parsHtml();
  document.querySelector("#demo").innerHTML = rawHtml;
});

$("#upper").on("click", () => {
  $("html").animate({ scrollTop: "0" }, 1000);
});

button.addEventListener("click", async () => {
  const value = keyword.value;
  const data = { type: "search", data: { query: value } };
  const res = await getSurah(data);
  if (res.success) {
    const pars = parseHtml(res);
    document.querySelector("#demo").innerHTML = pars;
  } else {
    Swal.fire({
      icon: "error",
      title: res.message,
    });
  }
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("surah")) {
    const data = { type: "surah", data: { surah: e.target.innerText } };
    const surah = await getSurah(data);
    if (surah.success) {
      const pars = parsing(surah);
      document.querySelector("#demo").innerHTML = pars;
    } else {
      Swal.fire({
        icon: "error",
        title: surah.message,
        text: "not found",
        footer: "<a href>Why do I have this issue?</a>",
      });
    }
  }
});

function getSurah(data) {
  return fetch("/quran/api", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((s) => s.json())
    .then((s) => s);
}
function parseHtml(results) {
  let text = "";
  const judul = document.querySelector("#judul").innerHTML = '';
  results.data.forEach((surah) => {
    surah.data.forEach((ayat) => {
      text += `<div class="w-auto sm:w-1/2 p-2">
              <div class="bg-white p-5 rounded-md shadow-md box-border hover:bg-green-50 transition-all transition-duration-500">
                <p class="font-semibold font-poppins text-sm">QS. ${surah.surah}:${ayat.ayat}</p>
                <h3 class="text-right text-3xl font-montsserat mt-3 mb-5 text-green-400">${ayat.arab}</h3>
                <h4 class="text-sm font-montsserat mb-2">${ayat.latin}</h4>
                <p class="font-montsserat text-xs text-gray-700">${ayat.arti}</p>
              </div>
            </div>`;
    });
  });
  return text;
}
function parsing(surah) {
  let text = "";
  const judul = document.querySelector("#judul");
  judul.innerHTML = `<h1 class="text-semibold text-3xl font-yanone text-center">QS. ${surah.data.surah} - ${surah.data.nomor}</h1>`;
  surah.data.data.forEach((ayat) => {
    // prettier-ignore
    text += `<div class="w-auto sm:w-1/2 p-2">
              <div class="bg-white p-5 rounded-md shadow-md box-border hover:bg-green-50 transition-all transition-duration-500">
                <p class="w-8 h-8 pt-2 text-center font-semibold font-poppins text-sm text-gray-500 shadow-inner shadow rounded-full">${ayat.ayat}</p>
                <h3 class="text-right text-3xl font-montsserat mt-3 mb-5 text-green-400">${ayat.arab}</h3>
                <h4 class="text-sm font-montsserat mb-2">${ayat.latin}</h4>
                <p class="font-montsserat text-xs text-gray-700">${ayat.arti}</p>
              </div>
            </div>`;
  });
  return text;
}
function parsHtml() {
  let li = "";
  list_quran.forEach((surah) => {
    li += `<li class="list-none w-1/2 p-2"><p class="surah w-full bg-white text-center text-sm text-gray-600 font-montsserat font-thin py-4 rounded shadow-md transition-all transition-duration-700 hover:bg-green-50">${surah}</p></li>`;
  });
  const res = `<ul class="w-full mt-2 flex flex-wrap justify-around">${li}</ul>`;
  return res;
}
