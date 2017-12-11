QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test('sum()', function(assert) {
    assert.ok(sum(1,2)== 3,'Passed');
})

QUnit.test('setCategory()', function(assert) {
    assert.ok(setCategory("Покупки") === 'Покупки', 'Passed');
})
