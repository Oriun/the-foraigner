import iafunction


chat_log=None

question1 = 'Translate this into 1. English \n\nSalut comment ca va ?\n\n'
answer = iafunction.ask(question1)
chat_log = iafunction.append_interaction_to_chat_log(question1, answer, chat_log)

# print("chat log")
# print(chat_log)
# print("---------------")
question2 = "Translate this into 1. English \n\nJe m'appel Alex et toi ?\n\n"
answer2 = iafunction.ask(question2)
chat_log = iafunction.append_interaction_to_chat_log(question2, answer2, chat_log)

# print("chat log")
# print(chat_log)
# print("---------------")

question3 = "Translate this into 1. English \n\nComment je m'appel ?\n\n"
answer3 = iafunction.ask(question3)
