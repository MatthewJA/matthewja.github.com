# Handles formula searches.

define ["jquery", "formulae", "render", "addEquation"], ($, formulae, render, addEquation) ->

    # Draw a collection of formulae to the frontend.
    drawFormulae = (names) ->
        $("#searchresults").empty()
        for name in names
            formula = formulae.getEquation(name)
            title = formulae.getName(name)
            li = $("<li>")
            li.addClass("searchresult")
            li.html("<math>#{formula.toMathML()}</math>")
            li.attr("title", title)
            $("#searchresults").append(li)
            li.tooltip()
            li.attr("data-formula-name", name)
            li.click((event) ->
                addEquation(formulae.getEquation(
                    $(event.target).closest(".searchresult").attr("data-formula-name"), true))
            )
        render.math()

    # Setup search handlers etc.
    setup = ->
        $("#searchbar").val("")
        $("#searchbar").on("change keyup paste", (->
            q = $("#searchbar").val()
            keywords = q.split(/\s+/)
            fs = formulaSearch(keywords)
            drawFormulae(fs)
        ))

    # Search for formulae with a given array of keywords.
    formulaSearch = (keywords) ->
        names = formulae.getAllFormulaNames()
        toReturn = []
        for name in names
            fwords = formulae.getKeywords(name)
            formulaMatches = true
            for keyword in keywords
                matchfound = false
                for fword in fwords
                    if fword.lastIndexOf(keyword, 0) == 0 # .startswith(keyword)
                        # This keyword matches, yay
                        matchfound = true
                        break
                unless matchfound # keyword doesn't match
                    formulaMatches = false
                    break
            if formulaMatches
                toReturn.push(name)

        return toReturn

    return {
        drawFormulae: drawFormulae
        formulaSearch: formulaSearch
        setup: setup
    }