from datetime import datetime

ones = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '10': 'ten',
    '11': 'eleven',
    '12': 'twelve',
    '13': 'thirteen',
    '14': 'fourteen',
    '15': 'fifteen',
    '16': 'sixteen',
    '17': 'seventeen',
    '18': 'eighteen',
    '19': 'nineteen',
}

tens = {
    '2': 'twenty',
    '3': 'thirty',
    '4': 'fourty',
    '5': 'fifty'
}

after_noon = {
    '13': 'one',
    '14': 'two',
    '15': 'three',
    '16': 'four',
    '17': 'five',
    '18': 'six',
    '19': 'seven',
    '20': 'eight',
    '21': 'nine',
    '22': 'ten',
    '23': 'eleven',
    '00': 'twelve'
}

def add_word(time, clock_message, is_minute = False):
    num_1 = str(time[0])
    num_2 = str(time[1])
    if is_minute:
        if time == '00':
            pass
        elif num_1 == '0':
            clock_message.append('oh')
    if time in ones.keys():
        clock_message.append(ones[time])
    else:
        if num_1 in tens.keys():
            clock_message.append(tens[num_1])
        if num_2 in ones.keys():
            clock_message.append(ones[num_2])
    return clock_message

def talking_clock():
    clock_message = ['It\'s']
    now = datetime.now().strftime('%H, %M')
    current_time = [x.strip() for x in now.split(',')]
    hour = current_time[0]
    minutes = current_time[1]

    # Determine message if hour is past noon or before
    if int(hour) > 12 or int(hour) == 00:
        if hour in after_noon.keys():
            clock_message.append(after_noon[hour])
        add_word(minutes, clock_message, True)
    else:
        add_word(hour, clock_message)
        add_word(minutes, clock_message, True)

    # Determine if time is am or pm
    if int(hour) > 12:
        clock_message.append('pm')
    else:
        clock_message.append('am')

    # Combine list strings to sentence
    talking_clock = ' '.join(clock_message)
    print(talking_clock)

talking_clock()
