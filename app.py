from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

messages = [
    {"sender": "Alice", "text": "Hi there!"},
    {"sender": "You", "text": "Hello!"},
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/messages", methods=["GET"])
def get_messages():
    return jsonify(messages)

@app.route("/send", methods=["POST"])
def send_message():
    data = request.get_json()
    messages.append({"sender": "You", "text": data["text"]})
    return jsonify(success=True)

if __name__ == "__main__":
    app.run(debug=True)
