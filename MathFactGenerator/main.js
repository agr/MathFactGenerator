requirejs(['LongMultiplicationGenerator', 'GeneratorManager'], function (lmg, gm) {
    var el = document.getElementById('content');
    var f = document.getElementById('facts');
    var genBtn = document.getElementById('btn-generate');

    var m = new gm.GeneratorManager();
    m.addGenerator(new lmg.LongMultiplicationGenerator());
    m.buildConfigurator();

    genBtn.onclick = () => { m.generateFacts(); };
});