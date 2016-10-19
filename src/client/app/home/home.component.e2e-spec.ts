describe('Home', () => {

  beforeEach( () => {
    browser.get('/');
  });

  it('should have a form', () => {
    expect(element(by.css('sd-home form input')).isPresent()).toEqual(true);
  });

  it('form should have one input field', () => {
    expect(element(by.css('sd-home form input')).isPresent()).toEqual(true);
  });

  it('form should have a dropdown select field', () => {
    expect(element(by.css('sd-home form select')).isPresent()).toEqual(true);
  });

  // it('should have a list of computer scientists', () => {
  //   expect(element(by.css('sd-home ul')).getText())
  //     .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper');
  // });

  // it('should add a name to the list using the form', () => {
  //   element(by.css('sd-home form input')).sendKeys('Tim Berners-Lee');
  //   element(by.css('sd-home form button')).click();

  //   expect(element(by.css('sd-home ul')).getText())
  //     .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper\nTim Berners-Lee');
  // });

});
