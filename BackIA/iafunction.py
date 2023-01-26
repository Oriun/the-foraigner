import openai
import os

from dotenv import load_dotenv
load_dotenv()
openai.api_key = os.getenv('OPENAI_KEY')
completion = openai.Completion()


start_chat_log = '''Human: Hello, who are you?
AI: I am doing great. How can I help you today?
'''

def ask(question, chat_log=None):
    if chat_log is None:
        chat_log = start_chat_log
    prompt = f'{chat_log}Human: {question}\nAI:'

    # First part translate to english
    responsetranslateEnglish = completion.create(
        model='text-davinci-003' , prompt=prompt, stop=['\nHuman'], temperature=0.9,
        top_p=1, frequency_penalty=0, presence_penalty=0.6, best_of=1,
        max_tokens=150)
    answertranslate = responsetranslateEnglish.choices[0].text.strip()
    print(answertranslate)

    # Second part response to the question
    promptEnglish = f'{chat_log}Human:{answertranslate}\nAI:'
    responseAnswer = completion.create(
        model='davinci' , prompt=promptEnglish, stop=['\n'], temperature=0.8,
        top_p=1, frequency_penalty=0, presence_penalty=0.3, best_of=1,
        max_tokens=150)
    answer = responseAnswer.choices[0].text.strip()
    print("response anglais :")
    print(answer)


    # Last part translate in french
    promptForFrench = f'{chat_log}Human: Translate this into 1. French \n\n{answer} \n\n\nAI:'
    responselast = completion.create(
        model='text-davinci-003' , prompt=promptForFrench, stop=['\nAI'], temperature=0.8,
        top_p=1, frequency_penalty=0, presence_penalty=0.6, best_of=1,
        max_tokens=150)
    answerFinal = responselast.choices[0].text.strip()
    print("french : ")
    print(answerFinal)
    print("------------------------")
    return answerFinal

def append_interaction_to_chat_log(question, answer, chat_log=None):
    if chat_log is None:
        chat_log = start_chat_log
    return f'{chat_log}Human: {question}\nAI: {answer}\n'