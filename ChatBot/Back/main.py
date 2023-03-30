import speech
import speechRename
import iafunction

from flask import Flask , jsonify , request , json
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/ia')
@cross_origin(supports_credentials=True)
def ResponseIA():
    # question = speech.speech()
    # print(question)
    
    # content = request.json
    print(request.args.get('answer'))
    print(request.args.get('lang'))

    questionReform = iafunction.getPhraselang(request.args.get('answer') , request.args.get('lang'))
    responseIA = iafunction.ask(questionReform , )

    if request.args.get('lang') != "en" :
        translate = iafunction.TranslateLang(request.args.get('lang') , responseIA)
    else :
        translate = responseIA
    # speechRename.vocalResponse(responseIA)
    return jsonify(answer =  request.args.get('answer') , result = translate)

app.run(host='0.0.0.0', port=6969)
