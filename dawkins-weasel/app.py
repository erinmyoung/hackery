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
    population = len(target)
    return find_fittest(target, population)


def get_random():
    return random.choice(string.ascii_uppercase + ' ')


# 1. Start with a random string of characters the same length as the target
def get_individuals(random_characters, population):
    return ''.join(random_characters for _ in range(population))


# 2. Make 100 copies of the string (reproduce)
def reproduce(individuals):
    return [individuals] * 100


# 3. For each character in each of the 100 copies, with a probability of 5%, replace (mutate) the character with a new random character.
def mutate(individuals):
    new_individual = ''
    for c in individuals:
        if random.random() < 0.05:
            new_individual += ''.join(get_random())
        else:
            new_individual += c
    return new_individual


# 4. Compare each new string with the target string, and give each a score (the number of letters in the string that are correct and in the correct position).
def fitness_score(individuals, target, population):
    fitness_score = 0
    for i in range(population):
        if individuals[i] == target[i]:
            fitness_score += 1
    return fitness_score


# 5. If any of the new strings has a perfect score (target length), halt. Otherwise, take the highest scoring string, and go to step 2.
def find_fittest(target, population):
    """
    While the score of new random characters doesn't match the target character length:

    1. Create 100 empty strings and None scores
    2. For each sequence in 100, assign empty copies at that sequence to mutated individuals and empty scores to the score of mutated individuals
    3. Check the highest score (target char length) and append the individuals at this best score's index to the empty array
    4. Increment loop index to see how many iterations it took to match the target
    """
    fittest = []
    generation = 0
    new_individuals = get_individuals(get_random(), population)
    while fitness_score(new_individuals, target, population) != population:
        individual_list = reproduce('')
        fitness_score_list = reproduce(None)
        for i in range(100):
            individual_list[i] = mutate(new_individuals)
            fitness_score_list[i] = fitness_score(individual_list[i], target, population)
        high_score = max(fitness_score_list)
        new_individuals = individual_list[fitness_score_list.index(high_score)]
        fittest.append(new_individuals)
        generation += 1
    return render_template('index.html', output='<br>'.join(fittest), index=generation)


if __name__ == '__main__':
  app.run(debug=True)
