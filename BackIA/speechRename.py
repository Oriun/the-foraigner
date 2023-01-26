import gtts
from playsound import playsound

def vocalResponse(text):
    tts = gtts.gTTS(text, lang="fr")
    # save the audio file
    tts.save("hello.mp3")
    # play the audio file
    playsound("hello.mp3")
