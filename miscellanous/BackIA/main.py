import speech
import speechRename
import iafunction

from flask import Flask , jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/ia')
@cross_origin(supports_credentials=True)
def ResponseIA():
    question = speech.speech()
    print(question)
    questionReform = 'Translate this into 1. English \n\n'+question+' ?\n\n'
    responseIA = iafunction.ask(questionReform)
    # speechRename.vocalResponse(responseIA)
    return jsonify(responseIA)

app.run(host='0.0.0.0', port=6969)
