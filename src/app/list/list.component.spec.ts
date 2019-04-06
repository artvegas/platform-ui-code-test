import {ListComponent} from './list.component';

describe('ListComponent', () => {
    let component: ListComponent;

    beforeEach(() => {
        component = new ListComponent();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('unselected providers', () => {
        it('should have an initial length of 3', () => {
            expect(component.unselectedProviders.length).toEqual(3);
        });

        it('should have an id', () => {
            expect(component.unselectedProviders[0].id).toEqual('1');
        });

        it('should have a name', () => {
            expect(component.unselectedProviders[0].name).toEqual('John');
        });

        it('should have an address', () => {
            expect(component.unselectedProviders[0].address).toEqual('123 Greenway Blvd');
        });

        it('should have a phone', () => {
            expect(component.unselectedProviders[0].phone).toEqual('8991234321');
        });
    });

    describe('selected providers', () => {
        it('should have no initial length', () => {
            expect(component.selectedProviders.length).toEqual(0);
        });
    });

    describe('addToSelectedProviders', () => {

        it('should add a provider to selectedProviders', () => {
            // INI: mock provider
            const provider = {
                id: '1',
                name: 'Aritra',
                address: '123 Stony Blvd',
                phone: '123123213123'
            };

            // INI: set up spys to mock removeFromunSelectedProviders and saveDataLocally
            spyOn(component, 'removeFromUnselectedProviders').and.callFake(function (value) {
                return;
            });

            spyOn(component, 'saveDataLocally').and.callFake(function () {
                return;
            });

            // ACTION: add provider into selectedProviders
            component.addToSelectedProviders(null, provider);

            // ASSERT:
            expect(component.selectedProviders.length).toEqual(1);
        });
    });

    describe('addToUnselectedProviders', () => {

        it('should add a provider to unselectedProviders', () => {
            // INI: mock provider
            const provider = {
                id: '1',
                name: 'Aritra',
                address: '123 Stony Blvd',
                phone: '123123213123'
            };

            // INI: set up spys to mock removeFromSelectedProviders and saveDataLocally
            spyOn(component, 'removeFromSelectedProviders').and.callFake(function (value) {
                return;
            });

            spyOn(component, 'saveDataLocally').and.callFake(function () {
                return;
            });

            // ACTION: add mock provider into unselectedProviders
            component.addToUnselectedProviders(null, provider);

            // ASSERT:
            expect(component.unselectedProviders.length).toEqual(4);
        });
    });

    describe('removeFromSelectedProviders', () => {

        it('should remove a provider from selectedProviders', () => {
            // INI: mock selectProviders array with one provider
            component.selectedProviders = [
                {
                    id: '1',
                    name: 'Aritra',
                    address: '123 Stony Blvd',
                    phone: '123123213123'
                }
            ];

            // get mock provider
            const provider = component.selectedProviders[0];

            // ACTION: remove mock provider from selectedProviders array
            component.removeFromSelectedProviders(provider);

            // ASSERT:
            expect(component.selectedProviders.length).toEqual(0);
        });
    });

    describe('removeFromunSelectedProviders', () => {

        it('should remove a provider from unselectedProviders', () => {
            // INI: mock unselectProviders array with one provider
            component.unselectedProviders = [
                {
                    id: '1',
                    name: 'Aritra',
                    address: '123 Stony Blvd',
                    phone: '123123213123'
                }
            ];

            // get mock provider
            const provider = component.unselectedProviders[0];

            // ACTION: remove mock provider from unselectedProviders array
            component.removeFromUnselectedProviders(provider);

            // ASSERT:
            expect(component.unselectedProviders.length).toEqual(0);
        });
    });

    describe('saveLocally', () => {

        it('should save data into local storage', () => {
            // INI: set up mock provider arrays
            component.selectedProviders = [];
            component.unselectedProviders = [
                {
                    id: '1',
                    name: 'John',
                    address: '123 Greenway Blvd',
                    phone: '8991234321'
                },
                {
                    id: '2',
                    name: 'Mary',
                    address: '443 Windwhisper Road',
                    phone: '2233211903'
                },
                {
                    id: '3',
                    name: 'Jason',
                    address: '9992 Pumpkin Hollow',
                    phone: '4343219384'
                }
            ];

            // INI: temp local storage store
            const store = {};

            // INI: set up spys to mock local storage
            spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
                return store[key] = value;
            });

            spyOn(localStorage, 'getItem').and.callFake(function (key) {
                return store[key];
            });

            // ACTION: save current provider arrays into local storage
            component.saveDataLocally();

            // LOAD: load provider arrays from local storage
            const local_selectedProviders   = JSON.parse(localStorage.getItem('selectedProviders'));
            const local_unselectedProviders = JSON.parse(localStorage.getItem('unselectedProviders'));

            // ASSERT:
            expect(local_selectedProviders.length).toEqual(component.selectedProviders.length);
            expect(local_unselectedProviders.length).toEqual(component.unselectedProviders.length);

        });
    });
});
