import setup from "../setup-base";
import desired from './desired';
import { clickButton } from '../helpers/recipes';

describe('uicatalog - controls @skip-ios6', function () {
  let session = setup(this, desired);
  let driver = session.driver;

  afterEach(async () => {
    await clickButton(driver, 'UICatalog');
  });

  it('should be able to get and set a picker value(s)', async () => {
    let el1 = await driver.findElement('xpath', "//UIAStaticText[contains(@label,'Picker View')]");
    await driver.click(el1);

    for(let color of ['Red', 'Green', 'Blue']){
      let wheel = await driver.findElement('xpath', `//UIAPickerWheel[@name = '${color} color component value']`);
      let value;
      if (color === 'Red') {
        value = await driver.getAttribute("value", wheel);
        parseInt(value, 10).should.equal(65);
      }
      await driver.setValue(70, wheel);
      value = await driver.getAttribute("value", wheel);
      parseInt(value, 10).should.equal(70);
    }

    let wheel = await driver.findElement('class name', "UIAPickerWheel");
    let values = await driver.getAttribute("values", wheel);
    values.should.have.length(52);
  });

  it('should be able to get and set a slider value', async () => {
    let el1 = await driver.findElement('xpath', "//UIAStaticText[contains(@label,'Sliders')]");
    await driver.click(el1);

    let slider = await driver.findElement('class name', "UIASlider");
    let value = await driver.getAttribute("value", slider);
    value.should.equal('42%');

    await driver.setValue(0.8, slider);
    value = await driver.getAttribute("value", slider);
    value = parseInt(value.replace('%', ''), 10);
    value.should.be.above(75);
    value.should.be.below(85);
  });
});
