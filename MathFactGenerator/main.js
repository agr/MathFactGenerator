requirejs(
[
    'LongMultiplicationGenerator',
    'GeneratorManager',
    'TableMultiplicationGenerator',
    'TableDivisionGenerator',
    'HorizontalAdditionRenderer',
    'HorizontalSubtractionGenerator'
],
function (lmg, gm, tmg, tdg, har, hsg) {
    var m = new gm.GeneratorManager();
    m.addInstantiator(function () { return new lmg.LongMultiplicationGenerator(); }, "Long multiplication");
    m.addInstantiator(function () { return new tmg.TableMultiplicationGenerator(); }, "Table multiplication");
    m.addInstantiator(function () { return new tdg.TableDivisionGenerator(); }, "Table division");
    m.addInstantiator(function () { return new har.HorizontalAdditionRenderer(); }, "Horizontal addition");
    m.addInstantiator(function () { return new hsg.HorizontalSubtractionGenerator(); }, "Horizontal subtraction");

    var genBtn = document.getElementById('generate');
    genBtn.onclick = function () { m.generateFacts(); };
    var clearBtn = document.getElementById('clear');
    clearBtn.onclick = function () { m.clear();}
});