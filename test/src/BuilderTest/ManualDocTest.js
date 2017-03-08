import {readDoc, assert, find} from './../util.js';

/** @test {ManualDocBuilder} */
describe('Manual:', ()=>{
  it('has manual link in header', ()=>{
    const doc = readDoc('index.html');
    assert.includes(doc, '[data-ice="manualHeaderLink"]', 'Manual');
    assert.includes(doc, '[data-ice="manualHeaderLink"]', './manual/index.html', 'href');
  });

  /** @test {ManualDocBuilder#_buildManualNav} */
  it('has manual navigation', ()=>{
    const doc = readDoc('manual/index.html');
    find(doc, '[data-ice="nav"]', (doc)=>{
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(1)', 'Overview');
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(2)', 'Installation');
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(3)', 'Tutorial');
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(4)', 'Usage');
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(5)', 'Configuration');
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(6)', 'Example');
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(7)', 'Reference');
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(8)', 'FAQ');
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(9)', 'Changelog');
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(10)', 'Custom Page 1');
      assert.includes(doc, '[data-ice="manual"]:nth-of-type(11)', 'Custom Page 2');
      assert.notFound(doc, '[data-ice="manual"]:nth-of-type(12)');
    });
  });

  /** @test {ManualDocBuilder#_buildManualIndex} */
  it('has each heading tags', ()=>{
    const doc = readDoc('manual/index.html');

    // overview
    find(doc, '.content [data-ice="manual"]:nth-of-type(1)', (doc)=>{
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Overview');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'Feature');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3)', 'Demo');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(4)', 'License');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(5)', 'Author');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/overview/overview.html', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/overview/overview.html#feature', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3) a', 'manual/overview/overview.html#demo', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(4) a', 'manual/overview/overview.html#license', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(5) a', 'manual/overview/overview.html#author', 'href');
    });

    // installation
    find(doc, '.content [data-ice="manual"]:nth-of-type(2)', (doc)=>{
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Installation');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'indent 2');
      assert.includes(doc, '.indent-h3[data-ice="manualNav"]:nth-of-type(3)', 'indent 3');
      assert.includes(doc, '.indent-h4[data-ice="manualNav"]:nth-of-type(4)', 'indent 4');
      assert.includes(doc, '.indent-h5[data-ice="manualNav"]:nth-of-type(5)', 'indent 5');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/installation/installation.html', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/installation/installation.html#indent-2', 'href');
      assert.includes(doc, '.indent-h3[data-ice="manualNav"]:nth-of-type(3) a', 'manual/installation/installation.html#indent-3', 'href');
      assert.includes(doc, '.indent-h4[data-ice="manualNav"]:nth-of-type(4) a', 'manual/installation/installation.html#indent-4', 'href');
      assert.includes(doc, '.indent-h5[data-ice="manualNav"]:nth-of-type(5) a', 'manual/installation/installation.html#indent-5', 'href');
    });

    // tutorial
    find(doc, '.content [data-ice="manual"]:nth-of-type(3)', (doc)=>{
      assert.includes(doc, '[data-ice="manualNav"]:nth-of-type(1) a', 'manual/tutorial/tutorial.html', 'href');
    });

    // usage
    find(doc, '.content [data-ice="manual"]:nth-of-type(4)', (doc)=>{
      assert.includes(doc, '[data-ice="manualNav"]:nth-of-type(1) a', 'manual/usage/usage1.html', 'href');
      assert.includes(doc, '[data-ice="manualNav"]:nth-of-type(2) a', 'manual/usage/usage2.html', 'href');
      assert.includes(doc, '[data-ice="manualNav"]:nth-of-type(3) a', 'manual/usage/usage2.html#h2-in-usage2', 'href');
      assert.includes(doc, '[data-ice="manualNav"]:nth-of-type(4) a', 'manual/usage/usage2.html#h3-in-usage2', 'href');
    });

    // configuration
    find(doc, '.content [data-ice="manual"]:nth-of-type(5)', (doc)=>{
      assert.includes(doc, '[data-ice="manualNav"]:nth-of-type(1) a', 'manual/configuration/configuration.html', 'href');
    });

    // example
    find(doc, '.content [data-ice="manual"]:nth-of-type(6)', (doc)=>{
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Example');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'Minimum Config');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3)', 'Integration Test Code Into Documentation');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/example/example.html', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/example/example.html#minimum-config', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3) a', 'manual/example/example.html#integration-test-code-into-documentation', 'href');
    });

    // reference
    find(doc, '.content [data-ice="manual"]:nth-of-type(7)', (doc)=>{
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Reference');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'Class');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3)', 'Interface');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(4)', 'Function');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(5)', 'Variable');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(6)', 'Typedef');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(7)', 'External');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'identifiers.html', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'identifiers.html#class', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(3) a', 'identifiers.html#interface', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(4) a', 'identifiers.html#function', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(5) a', 'identifiers.html#variable', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(6) a', 'identifiers.html#typedef', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(7) a', 'identifiers.html#external', 'href');
    });

    // faq
    find(doc, '.content [data-ice="manual"]:nth-of-type(8)', (doc)=>{
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'FAQ');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'Goal');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/faq/faq.html', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/faq/faq.html#goal', 'href');
    });

    // changelog
    find(doc, '.content [data-ice="manual"]:nth-of-type(9)', (doc)=>{
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Changelog');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', '0.0.1');

      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/changelog/CHANGELOG.html', 'href');
      assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/changelog/CHANGELOG.html#0-0-1', 'href');
    });

    // custom page 1
    find(doc, '.content [data-ice="manual"]:nth-of-type(10)', (doc)=>{
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/custom_page_1/customPage1.html', 'href');
    });

    // custom page 2
    find(doc, '.content [data-ice="manual"]:nth-of-type(11)', (doc)=>{
      assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/custom_page_2/customPage2.html', 'href');
    });
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has overview', ()=>{
    const doc = readDoc('manual/overview/overview.html');
    assert.includes(doc, '.github-markdown h1', 'Overview');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'ESDoc is a documentation generator for JavaScript(ES6).');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has installation', ()=>{
    const doc = readDoc('manual/installation/installation.html');
    assert.includes(doc, '.github-markdown h1', 'Installation');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'npm install -g esdoc');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has usage', ()=>{
    const doc = readDoc('manual/usage/usage1.html');
    assert.includes(doc, '.github-markdown h1:nth-of-type(1)', 'Usage');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'esdoc -c esdoc.json');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has tutorial', ()=>{
    const doc = readDoc('manual/tutorial/tutorial.html');
    assert.includes(doc, '.github-markdown h1', 'Tutorial');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'this is tutorial');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has configuration', ()=>{
    const doc = readDoc('manual/configuration/configuration.html');
    assert.includes(doc, '.github-markdown h1', 'Configuration');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'this is configuration');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has example', ()=>{
    const doc = readDoc('manual/example/example.html');
    assert.includes(doc, '.github-markdown h1', 'Example');
    assert.includes(doc, '.github-markdown [data-ice="content"] h2:nth-of-type(1)', 'Minimum Config');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has faq', ()=>{
    const doc = readDoc('manual/faq/faq.html');
    assert.includes(doc, '.github-markdown h1', 'FAQ');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'ESDoc has two goals.');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has changelog', ()=>{
    const doc = readDoc('manual/changelog/CHANGELOG.html');
    assert.includes(doc, '.github-markdown h1', 'Changelog');
    assert.includes(doc, '.github-markdown [data-ice="content"] h2:nth-of-type(1)', '0.0.1');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has custom page 1', ()=>{
    const doc = readDoc('manual/custom_page_1/customPage1.html');
    assert.includes(doc, '.github-markdown h1', 'Custom Page 1');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'Foo 1');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has custom page 2', ()=>{
    const doc = readDoc('manual/custom_page_2/customPage2.html');
    assert.includes(doc, '.github-markdown h1', 'Custom Page 2');
    assert.includes(doc, '.github-markdown [data-ice="content"]', 'Foo 2');
  });
});
