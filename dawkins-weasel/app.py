from flask import Flask, request, render_template

import random
import string


app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def index_post():
    target = request.form['target']
    target_score = len(target)
    return match_target(target, target_score)


def get_random():
    return random.choice(string.ascii_uppercase + ' ')


# 1. Start with a random string of characters the same length as the target
def get_chars(random_choices, target_score):
    return ''.join(random_choices for _ in range(target_score))


# 2. Make 100 copies of the string (reproduce)
def reproduce(chars):
    return [chars] * 100


# 3. For each character in each of the 100 copies, with a probability of 5%, replace (mutate) the character with a new random character.
def mutate(chars):
    new_char = ''
    for c in chars:
        if random.random() < 0.05:
            new_char += ''.join(get_random())
        else:
            new_char += c
    return new_char


# 4. Compare each new string with the target string, and give each a score (the number of letters in the string that are correct and in the correct position).
def score(chars, target, target_score):
    score = 0
    for i in range(target_score):
        if chars[i] == target[i]:
            score += 1
    return score


# 5. If any of the new strings has a perfect score (target length), halt. Otherwise, take the highest scoring string, and go to step 2.
def match_target(target, target_score):
    """
    While the score of new random characters doesn't match the target character length:

    1. Create 100 empty strings and None scores
    2. For each sequence in 100, assign empty copies at that sequence to mutated chars and empty scores to the score of mutated chars
    3. Check the highest score (target char length) and append the chars at this best score's index to the empty array
    4. Increment loop index to see how many iterations it took to match the target
    """
    mutated_target = []
    loop_index = 0
    new_chars = get_chars(get_random(), target_score)
    while score(new_chars, target, target_score) != target_score:
        strings = reproduce('')
        scores = reproduce(None)
        for i in range(100):
            strings[i] = mutate(new_chars)
            scores[i] = score(strings[i], target, target_score)
        high_score = max(scores)
        new_chars = strings[scores.index(high_score)]
        mutated_target.append(new_chars)
        loop_index += 1
    return render_template('index.html', output='<br>'.join(mutated_target), index=loop_index)


if __name__ == '__main__':
  app.run(debug=True)
