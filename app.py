from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

candidates = []
next_id = 1


def jaccard(a, b):
    A, B = set(a), set(b)
    inter = len(A & B)
    union = len(A | B)
    return 1.0 if union == 0 else inter / union


def rule_score(A, B):
    common = len([x for x in A["subjects"] if x in B["subjects"]])
    jac = jaccard(A["subjects"], B["subjects"])
    track_same = 1 if A["track"] == B["track"] else 0
    dur_diff = abs(A["duration"] - B["duration"])
    size_diff = abs(A["size"] - B["size"])

    score = 0
    score += common * 3
    score += jac * 4
    score += track_same * 2
    score -= dur_diff * 0.8
    score -= size_diff * 1.0

    return {
        "score": score,
        "common": common,
        "jac": jac,
        "trackSame": track_same,
        "durDiff": dur_diff,
        "sizeDiff": size_diff,
    }


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/api/candidates")
def api_candidates():
    return jsonify({"candidates": candidates})


@app.post("/api/candidates")
def api_add_candidate():
    global next_id
    data = request.get_json(force=True)

    if not data.get("subjects"):
        return jsonify({"error": "과목을 최소 1개는 선택해야 함"}), 400

    student = {
        "id": f"U{next_id:03d}",
        "grade": int(data["grade"]),
        "track": data["track"],
        "subjects": list(data["subjects"]),
        "duration": int(data["duration"]),
        "size": int(data["size"]),
    }
    next_id += 1
    candidates.append(student)
    return jsonify({"ok": True, "student": student})


@app.delete("/api/candidates")
def api_clear_candidates():
    global candidates, next_id
    candidates = []
    next_id = 1
    return jsonify({"ok": True})


@app.post("/api/recommend")
def api_recommend():
    data = request.get_json(force=True)

    me = {
        "grade": int(data["grade"]),
        "track": data["track"],
        "subjects": list(data["subjects"]),
        "duration": int(data["duration"]),
        "size": int(data["size"]),
    }
    top_n = int(data.get("topN", 5))

    if not me["subjects"]:
        return jsonify({"error": "과목을 최소 1개는 선택해야 함"}), 400
    if not candidates:
        return jsonify({"error": "후보가 없음"}), 400

    filtered = [c for c in candidates if c["grade"] == me["grade"]]

    if not filtered:
        return jsonify({"results": []})

    scored = []
    for B in filtered:
        info = rule_score(me, B)
        why = (
            f"공통과목 {info['common']}개, 과목겹침 {info['jac']:.2f}, "
            + ("학과 같음, " if info["trackSame"] else "학과 다름, ")
            + f"기간차 {info['durDiff']}주, 인원차 {info['sizeDiff']}명"
        )
        scored.append({
            "candidate_id": B["id"],
            "score": info["score"],
            "why": why
        })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return jsonify({"results": scored[:top_n]})


if __name__ == "__main__":
    app.run(debug=True)
