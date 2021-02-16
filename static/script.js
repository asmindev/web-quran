function getSurah(data) {
  return fetch("http://localhost:5001/quran/api", {
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
function parsing(surah) {
  let text = "";
  const judul = document.querySelector("#judul");
  judul.innerHTML = `<h1 class="text-semibold text-3xl font-yanone text-center">QS. ${surah.data.surah} - ${surah.data.nomor}</h1>`;
  surah.data.data.forEach((ayat, index) => {
    // prettier-ignore
    text += `<div class="w-auto sm:w-1/2 p-2">
              <div class="bg-white p-5 rounded-md shadow-md box-border hover:bg-green-50 transition-all transition-duration-500">
                <p class="w-8 h-8 pt-2 text-center font-semibold font-poppins text-sm text-gray-500 shadow-inner shadow rounded-full">${index + 1}</p>
                <h3 class="text-right text-3xl font-montsserat mt-3 mb-5 text-green-400">${ayat.arab}</h3>
                <h4 class="text-sm font-montsserat mb-2">${ayat.latin}</h4>
                <p class="font-montsserat text-xs text-gray-700">${ayat.arti}</p>
              </div>
            </div>`;
  });
  return text;
}
const upper = document.querySelector("#upper");
const keyword = document.querySelector("#keyword");
const button = document.querySelector("#click");
button.addEventListener("click", async () => {
  if (keyword.value !== "") {
    const data = { type: "surah", data: { surah: keyword.value } };
    const surah = await getSurah(data);
    if (surah.success) {
      const pars = parsing(surah);
      document.querySelector("#demo").innerHTML = pars;
    }
  }
});
$("#upper").on("click", () => {
  $("html").animate({ scrollTop: "0" }, 1000);
});
