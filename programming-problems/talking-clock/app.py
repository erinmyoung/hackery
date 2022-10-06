from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def index():
    hour = datetime.now().hour
    minute = datetime.now().minute
    return render_template('index.html', message=get_message(hour, minute))

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

def add_word(time, message, is_minute = False):
    """
    1. Minute at the beginning of an hour (00) will not be applied
    2. If there's only one minute, append with 'oh'
    3. If there are two digits in the minute, check the tens first, then the ones
    """
    if is_minute:
        if time == 00:
            pass
        elif len(str(time)) == 1:
            message.append('oh')
    if time in ones.keys():
        message.append(ones[time])
    elif len(str(time)) == 2:
        num_1 = int(str(time)[:1])
        num_2 = int(str(time)[1:2])
        if num_1 in tens.keys():
            message.append(tens[num_1])
        if num_2 in ones.keys():
            message.append(ones[num_2])
    return message

def get_message(hour, minute):
    """
    1. Determine if the hour is past noon or before and then append word accordingly
    2. Determine if the time is morning (am) or afternoon/evening (pm)
    3. Combine all strings to the final clock message
    """
    message = ['It\'s']
    if hour > 12 or hour == 00:
        if hour in after_noon.keys():
            message.append(after_noon[hour])
        add_word(minute, message, True)
    else:
        add_word(hour, message)
        add_word(minute, message, True)
    message.append('pm') if hour > 12 else message.append('am')

    return ' '.join(message)
