import numpy
import matplotlib.pyplot

population_data = numpy.genfromtxt("population_data.csv", delimiter=",", names=True, usecols=[0, 3, 7])
population_data = numpy.array(population_data.tolist())

years = population_data[:, 0]
population = population_data[:, 1]

matplotlib.pyplot.plot(years, population)
matplotlib.pyplot.xlabel("Year")
matplotlib.pyplot.ylabel("Population")
matplotlib.pyplot.title("ACT Population Growth")
matplotlib.pyplot.show()