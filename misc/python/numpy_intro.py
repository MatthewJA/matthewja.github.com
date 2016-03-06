import numpy
import matplotlib.pyplot

population_data = numpy.genfromtxt("population_data.csv", delimiter=",", names=True, usecols=[0, 3, 7])
population_data = numpy.array(population_data.tolist())

# years = population_data[:, 0]
# population = population_data[:, 1]

# matplotlib.pyplot.plot(years, population)
# matplotlib.pyplot.xlabel("Year")
# matplotlib.pyplot.ylabel("Population")
# matplotlib.pyplot.title("ACT Population Growth")
# matplotlib.pyplot.show()

# residuals = []
# for row in population_data:
#   # figure out what the model population is
#   year = row[0]
#   population = row[1]
#   model_population = 4057 * year - 7796730
#   residual = population - model_population
#   residuals.append(residual)

# years = population_data[:, 0]
# matplotlib.pyplot.plot(years, residuals)
# matplotlib.pyplot.xlabel("Year")
# matplotlib.pyplot.ylabel("Residual")
# matplotlib.pyplot.title("Residuals for linear model of ACT population growth")
# matplotlib.pyplot.show()

# years = population_data[:, 0]
# populations = population_data[:, 1]

# predicted_populations = []

# for year in years:
#   # figure out what the model population is
#   model_population = 4057 * year - 7796730

#   # add it onto the predictions list
#   predicted_populations.append(model_population)

# matplotlib.pyplot.plot(years, populations)
# matplotlib.pyplot.plot(years, predicted_populations)
# matplotlib.pyplot.xlabel("Year")
# matplotlib.pyplot.ylabel("Population")
# matplotlib.pyplot.title("Linear model of ACT population growth")
# matplotlib.pyplot.legend(["data", "model"])
# matplotlib.pyplot.show()

residuals = []
for row in population_data:
  year = row[0]
  population = row[1]

  # figure out what the model population is
  model_population = 4057 * year - 7796730

  # calculate and store the residual
  residual = population - model_population
  residuals.append(residual)

years = population_data[:, 0]

matplotlib.pyplot.plot(years, residuals)
matplotlib.pyplot.xlabel("Year")
matplotlib.pyplot.ylabel("Residual")
matplotlib.pyplot.title("Residuals for linear model of ACT population growth")
matplotlib.pyplot.show()
