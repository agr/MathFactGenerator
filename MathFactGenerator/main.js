requirejs(['LongMultiplicationGenerator', 'GeneratorManager', 'TableMultiplicationGenerator'], function (lmg, gm, tmg) {
    var el = document.getElementById('content');
    var f = document.getElementById('facts');
    var genBtn = document.getElementById('btn-generate');

    var m = new gm.GeneratorManager();
    m.addGenerator(new lmg.LongMultiplicationGenerator());
    m.addGenerator(new tmg.TableMultiplicationGenerator())
    m.buildConfigurator();

    genBtn.onclick = () => { m.generateFacts(); };
});