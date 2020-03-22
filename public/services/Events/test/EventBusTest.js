// import EventBus from '../EventBus.js'

QUnit.module('Тестируем eventBus', function () {
	QUnit.test('Обеспечение событийной модели взаимодействия', function (assert) {
        let eBus = new EventBus();

        let eName = 'qwer';
        let consumer1 = 0, consumer2 = 0, consumer3 = 0;
        let rightCons1Val = 1;
        let rightCons2Val = 2;
        let rightCons3Val = 3;
        let data = { val: rightCons3Val };

        let unsub1 = eBus.subscribe(eName, () => {consumer1 = rightCons1Val});
        let unsub2 = eBus.subscribe(eName, () => {consumer2 = rightCons2Val});
        let unsub3 = eBus.subscribe(eName, (data) => {consumer3 = data.val});

        eBus.publish(eName, data);

        assert.strictEqual(consumer1, rightCons1Val);
        assert.strictEqual(consumer2, rightCons2Val);
        assert.strictEqual(consumer3, rightCons3Val);

        unsub1(); unsub2(); unsub3();

        assert.strictEqual(0 , eBus._listeners[eName].length);
	});

    QUnit.test('Верная подписка и отписка нескольких событий', function (assert) {
        let eBus = new EventBus();

        let counter = 0;
        let eName1 = 'qwer', eName2 = 'asdf';
        let eNames = eName1 + ' ' + eName2;
        let unsub = eBus.subscribe(eNames, () => counter++);

        eBus.publish(eName1);
        assert.strictEqual(counter, 1);

        eBus.publish(eName2);
        assert.strictEqual(counter, 2);

        assert.strictEqual(1, eBus._listeners[eName1].length);
        assert.strictEqual(1, eBus._listeners[eName2].length);
        
        unsub();
        assert.strictEqual(0, eBus._listeners[eName1].length);
        assert.strictEqual(0, eBus._listeners[eName2].length);

        eBus.publish(eName1);
        assert.strictEqual(counter, 2);

        eBus.publish(eName2);
        assert.strictEqual(counter, 2);
	});
});