test('Input username', async () => {
  // Inputs Rice as the meal name
  wrapper.find('.meal-name').instance().value = 'Rice';

  // finds the submit button and simulates a click event
  wrapper.find('.submitbtn').simulate('click');

  // Waits for the meal
  await wait(wrapper, w => w.find('.meal').at(4).exists());

  // expects the meal-name field to be cleared after the meal is added
  expect(wrapper.find('.meal-name').instance().value).toEqual('');

  // Finds the new meal and retrieves the meal name
  const newMeal = wrapper.find('.meal').at(3).find('.mealItem-name').text();

  // confirm the meal name is equal to Rice
  expect(newMeal).toEqual('Rice');
});


