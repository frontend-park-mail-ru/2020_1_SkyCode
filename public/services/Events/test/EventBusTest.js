// import EventBus from '../EventBus.js'

QUnit.module('Тестируем eventBus', () => {
	QUnit.test('Обеспечение событийной модели взаимодействия', function (assert) {
        const eBus = new EventBus();

        const eName = 'qwer';
        let consumer1 = 0, consumer2 = 0, consumer3 = 0;
        const rightCons1Val = 1;
        const rightCons2Val = 2;
        const rightCons3Val = 3;
        const data = { val: rightCons3Val };

        const unsub1 = eBus.subscribe(eName, () => {consumer1 = rightCons1Val});
        const unsub2 = eBus.subscribe(eName, () => {consumer2 = rightCons2Val});
        const unsub3 = eBus.subscribe(eName, (data) => {consumer3 = data.val});

        eBus.broadcast(eName, data);

        assert.strictEqual(consumer1, rightCons1Val);
        assert.strictEqual(consumer2, rightCons2Val);
        assert.strictEqual(consumer3, rightCons3Val);

        unsub1(); unsub2(); unsub3();

        assert.strictEqual(0 , eBus._callbacksMap[eName].length);
	});

    QUnit.test('Верная подписка и отписка нескольких событий', (assert) => {
        const eventBus = new EventBus();

        let counter = 0;
        const eventName1 = 'qwer', eventName2 = 'asdf';
        const eventNames = eventName1 + ' ' + eventName2;
        const unsub = eventBus.subscribe(eventNames, () => counter++);

        eventBus.broadcast(eventName1);
        assert.strictEqual(counter, 1);

        eventBus.broadcast(eventName2);
        assert.strictEqual(counter, 2);

        assert.strictEqual(1, eventBus._callbacksMap[eventName1].length);
        assert.strictEqual(1, eventBus._callbacksMap[eventName2].length);
        
        unsub();
        assert.strictEqual(0, eventBus._callbacksMap[eventName1].length);
        assert.strictEqual(0, eventBus._callbacksMap[eventName2].length);

        eventBus.broadcast(eventName1);
        assert.strictEqual(counter, 2);

        eventBus.broadcast(eventName2);
        assert.strictEqual(counter, 2);
	});
});
