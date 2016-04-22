requirejs(
[
    'LongMultiplicationGenerator',
    'GeneratorManager',
    'TableMultiplicationGenerator',
    'TableDivisionGenerator',
    'HorizontalAdditionGenerator',
    'HorizontalSubtractionGenerator'
],
function (lmg, gm, tmg, tdg, hag, hsg) {
    var m = new gm.GeneratorManager();
    m.addInstantiator(function () { return new lmg.LongMultiplicationGenerator(); }, "Long multiplication");
    m.addInstantiator(function () { return new tmg.TableMultiplicationGenerator(); }, "Table multiplication");
    m.addInstantiator(function () { return new tdg.TableDivisionGenerator(); }, "Table division");
    m.addInstantiator(function () { return new hag.HorizontalAdditionGenerator(); }, "Horizontal addition");
    m.addInstantiator(function () { return new hsg.HorizontalSubtractionGenerator(); }, "Horizontal subtraction");

    var genBtn = document.getElementById('generate');
    genBtn.onclick = function () { m.generateFacts(); };
    var clearBtn = document.getElementById('clear');
    clearBtn.onclick = function () { m.clear();}
});