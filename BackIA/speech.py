
import speech_recognition as sr


def speech():
    r = sr.Recognizer()
    micro = sr.Microphone()

    with micro as source:
        print("Speak!")
        audio_data = r.listen(source)
        print("End!")
    result = r.recognize_google(audio_data , language="fr-FR")
    print (">", result)
    return result
    # print (">", "test fdp")
    # return {'text':'Hello World!'}
