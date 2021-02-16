import difflib

list_quran = [
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
]


def get_by_name(word: str):
    res = difflib.get_close_matches(word, list_quran)
    if len(res) != 0:
        return res[0]
    else:
        None


def get_by_index(index: int):
    if 0 == int(index):
        return None
    else:
        if int(index) >= 115:
            return None
        else:
            return [
                element
                for count, element in enumerate(list_quran)
                if count == int(index) - 1
            ][0]


def get_surah(surah: str):
    quran = eval(open("./quran/quran.json").read())
    for _surah in quran:
        if surah == _surah.get("surah"):
            return dict(success=True, message="berhasil", data=_surah)
    return dict(success=False, message="gagal", data={})


class Quran:
    def __init__(self):
        self._quran = eval(open("./quran/quran.json").read())

    def surah(self, surah: str):
        if surah:
            if surah.isdigit():
                return get_surah(get_by_index(surah))
            else:
                return get_surah(get_by_name(surah))
        else:
            return dict(
                success=False,
                message="gagal, surah '%s' tidak ditemukan" % surah,
                data={},
            )

    def select(self, surah, ayat):
        data = self.surah(surah)
        if data["success"]:
            surah = data["data"]["surah"]
            for _ayat in data["data"]["data"]:
                if ayat and ayat.isdigit() and int(_ayat["ayat"]) == int(ayat):
                    success = True
                    message = "berhasil"
                    data = dict(surah=surah, data=_ayat)
                    break
                else:
                    success = False
                    message = "gagal, ayat '%s' tidak ditemukan" % ayat
                    data = {}
        else:

            success = False
            message = "gagal, surah '%s' tidak ditemukan" % surah
            data = {}
        return dict(success=success, message=message, data=data)

    def specify(self, surah_: str, start: str = None, end: str = None):
        surah = self.surah(surah_)
        result = []
        if surah["success"]:
            ayats = surah["data"]["data"]
            if end:
                if end.isdigit():
                    if start:
                        if start.isdigit():
                            for ayat in ayats:
                                if int(ayat["ayat"]) == int(end):
                                    result.append(ayat)
                                    success = True
                                    message = "berhasil"
                                    break
                                elif int(start) <= int(ayat["ayat"]):
                                    result.append(ayat)
                        else:
                            success = False
                            message = "gagal, param end yang diberikan '%s', yang dibutuhkan adalah nomor"
                    else:
                        for ayat in ayats:
                            if int(ayat["ayat"]) == int(end):
                                result.append(ayat)
                                success = True
                                message = "berhasil"
                                break
                            else:
                                result.append(ayat)
                else:
                    success = False
                    message = "gagal, param end yang diberikan '%s', yang dibutuhkan adalah nomor"
            else:
                if start:
                    if start.isdigit():
                        if int(start) <= len(ayats):
                            for ayat in ayats:
                                if int(start) <= int(ayat["ayat"]):
                                    result.append(ayat)
                            success = True
                            message = "berhasil"
                        else:
                            success = False
                            message = "gagal, param start lebih besar dari jumlah ayat"

                    else:
                        success = False
                        message = "gagal, param end yang diberikan '%s', yang dibutuhkan adalah nomor"
        else:
            success = False
            message = "surah '%s' tidak ditemukan" % surah_
        return dict(success=success, message=message, data=result)
