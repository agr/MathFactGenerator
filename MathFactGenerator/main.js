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
    var el = document.getElementById('content');
    var f = document.getElementById('facts');
    var genBtn = document.getElementById('btn-generate');

    var m = new gm.GeneratorManager();
    m.addGenerator(new lmg.LongMultiplicationGenerator());
    m.addGenerator(new tmg.TableMultiplicationGenerator());
    m.addGenerator(new tdg.TableDivisionGenerator());
    m.addGenerator(new hag.HorizontalAdditionGenerator());
    m.addGenerator(new hsg.HorizontalSubtractionGenerator());
    m.buildConfigurator();

    genBtn.onclick = function() { m.generateFacts(); };
});