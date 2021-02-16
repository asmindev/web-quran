from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
from quran import Quran
import os


app = Flask(__name__)
CORS(app)
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0


def _json():
    return open("./quran.json").read().encode("utf8")


@cross_origin()
@app.route("/quran/api", methods=["POST", "GET"])
def quran_api():
    if request.method == "POST":
        quran = Quran()
        data = request.get_json()
        if data:
            if data["type"] == "select":
                data = data.get("data")
                if data:
                    surah = data.get("surah")
                    ayat = data.get("ayat")
                    return jsonify(quran.select(surah, ayat))
                else:
                    return jsonify(
                        dict(success=False, message="gagal, param data tidak ada")
                    )
            elif data["type"] == "surah":
                data = data.get("data")
                if data:
                    surah = data.get("surah")
                    return jsonify(quran.surah(surah))
                else:
                    return jsonify(
                        dict(success=False, message="gagal, param data tidak ada")
                    )
            elif data["type"] == "specify":
                data = data.get("data")
                if data:
                    surah = data.get("surah")
                    start = data.get("start")
                    end = data.get("end")
                    return jsonify(quran.specify(surah, start=start, end=end))
                else:
                    return jsonify(
                        dict(success=False, message="gagal, param data tidak ada")
                    )
            else:
                return jsonify(status=False, message=None)
        else:
            return jsonify(status=False, message=None)
    return render_template("api.html", path="api", title="API Quran")


@app.route("/")
def index():
    return render_template("index.html", path="home", title="Quran web")


app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=True)
