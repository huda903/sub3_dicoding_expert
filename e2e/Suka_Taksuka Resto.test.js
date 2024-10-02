Feature('Suka Taksuka Resto');

Before(({ I }) => {
  I.amOnPage('/');
  I.wait(3);
});

Scenario('Suka Restoran', async ({ I }) => {
  I.click('.favorite_a');
  I.wait(1);
  I.scrollTo('#kk');
  I.click('.home_a');
  I.wait(2);
  I.scrollTo('#kk');
  I.click(locate('.textLinkDetail').first());
  I.wait(1);
  const id = await I.executeScript(() => sessionStorage.getItem('id'));
  I.click(`#likeUnlike_${id}`);
  I.wait(2);
  I.click('.favorite_a');
  I.scrollTo('#kk');
  I.wait(2);
});

Scenario('Batal Suka Restoran', async ({ I }) => {
  I.click('.favorite_a');
  I.wait(1);
  I.scrollTo('#kk');
  I.click('.home_a');
  I.wait(2);
  I.scrollTo('#kk');
  I.click(locate('.textLinkDetail').first());
  I.wait(1);
  const id = await I.executeScript(() => sessionStorage.getItem('id'));
  I.click(`#likeUnlike_${id}`);
  I.wait(2);
  I.click('.favorite_a');
  I.scrollTo('#kk');
  I.wait(2);
  I.click(locate('.textLinkDetail').first());
  I.wait(1);
  const id2 = await I.executeScript(() => sessionStorage.getItem('id'));
  I.click(`#likeUnlike_${id2}`);
  I.wait(2);
  I.click('.favorite_a');
  I.scrollTo('#kk');
  I.wait(2);
});
