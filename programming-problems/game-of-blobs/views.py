import random

class GameOfBlobs():
    def __init__(self):
        self.blobs = self.random_blobs(20, 20, 20)
        self.changed = False

    def random_blobs(self, width, height, count):
        blobs = []
        for i in range(count):
            random_x = random.randrange(width)
            random_y = random.randrange(height)
            random_size = random.randrange(count)
            blob = (random_x, random_y, random_size)
            blobs.append(blob)
        return blobs

    def run(self, rounds = None):
        _rounds = 0
        while len(self.blobs) > 1:
            self.cycle()
            self.merge()

            _rounds += 1
            if rounds == _rounds or not self.changed:
                break
            self.changed = False
        print(f"Finished in {_rounds} round{'s' if _rounds > 1 else ''}.\nResult:  {[tuple(b) for b in self.blobs]}\n")

    def cycle(self):
        new_blobs = []
        for i, blob in enumerate(self.blobs):
            new_blob = [x for x in blob]
            target = self.get_target(i)
            position = blob[:-1]

            if target:
                for d in range(len(position)):
                    if blob[d] < target[d]:
                        new_blob[d] += 1
                    elif blob[d] > target[d]:
                        new_blob[d] -= 1
                self.changed = True
            new_blobs.append(new_blob)
        self.blobs = new_blobs

    def get_target(self, index):
        targets = []
        for blob in self.blobs:
            blob_size = blob[-1]
            current_blob_size = self.blobs[index][-1]
            if blob_size >= current_blob_size or blob == self.blobs[index]:
                continue
            if not targets or blob_size > targets[0][-1]:
                targets = [blob]
            elif blob_size == targets[0][-1]:
                targets.append(blob)

        return self.get_closest_target(targets, index)

    def get_closest_target(self, targets, index):
        """
        TODO: Determine target based on smallest distance 
        then update blob orientation in clockwise manner
        """

    def merge(self):
        new_blobs = []
        new_set = set()
        for i, blob in enumerate(self.blobs):
            if i in new_set:
                continue
            new_blob = [x for x in blob]
            for j, other in enumerate(self.blobs):
                position = blob[:-1]
                if j in new_set or i == j:
                    continue

                for d in range(len(position)):
                    if not blob[d] == other[d]:
                        break
                else:
                    new_set.add(j)
                    new_blob[-1] += other[-1]

            new_blobs.append(new_blob)

        self.blobs = new_blobs

GameOfBlobs().run()
