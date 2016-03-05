import numpy

population_data = numpy.genfromtxt("population_data.csv", delimiter=",", names=True, usecols=[0, 3, 7])

for row in population_data:
  year = row[0]
  pop = row[1]
  age = row[2]

  print(year)