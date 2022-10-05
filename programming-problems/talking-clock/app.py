from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html', message=get_message())

ones = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
}

tens = {
    2: 'twenty',
    3: 'thirty',
    4: 'fourty',
    5: 'fifty'
}

after_noon = {
    13: 'one',
    14: 'two',
    15: 'three',
    16: 'four',
    17: 'five',
    18: 'six',
    19: 'seven',
    20: 'eight',
    21: 'nine',
    22: 'ten',
    23: 'eleven',
    00: 'twelve'
}

def add_word(time, clock_message, is_minute = False):
    if is_minute:
        if time == 00:
            pass
        elif len(str(time)) == 1:
            clock_message.append('oh')
    if time in ones.keys():
        clock_message.append(ones[time])
    elif len(str(time)) == 2:
        num_1 = int(str(time)[:1])
        num_2 = int(str(time)[1:2])
        if num_1 in tens.keys():
            clock_message.append(tens[num_1])
        if num_2 in ones.keys():
            clock_message.append(ones[num_2])
    return clock_message

def get_message():
    clock_message = ['It\'s']
    hour = datetime.now().hour
    minute = datetime.now().minute

    # Determine message if hour is past noon or before
    if hour > 12 or hour == 00:
        if hour in after_noon.keys():
            clock_message.append(after_noon[hour])
        add_word(minute, clock_message, True)
    else:
        add_word(hour, clock_message)
        add_word(minute, clock_message, True)

    # Determine if time is am or pm
    clock_message.append('pm') if hour > 12 else clock_message.append('am')

    # Combine list strings to sentence
    talking_clock = ' '.join(clock_message)
    return talking_clock
