requirejs(['LongMultiplicationGenerator', 'GeneratorManager', 'TableMultiplicationGenerator', 'TableDivisionGenerator'], function (lmg, gm, tmg, tdg) {
    var el = document.getElementById('content');
    var f = document.getElementById('facts');
    var genBtn = document.getElementById('btn-generate');

    var m = new gm.GeneratorManager();
    m.addGenerator(new lmg.LongMultiplicationGenerator());
    m.addGenerator(new tmg.TableMultiplicationGenerator());
    m.addGenerator(new tdg.TableDivisionGenerator());
    m.buildConfigurator();

    genBtn.onclick = () => { m.generateFacts(); };
});