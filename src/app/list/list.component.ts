import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    // INI: load initial data into variables
    public selectedProviders = [];
    public unselectedProviders = [
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

    constructor() {
    }

    /*
      Adds given provider to the selectedProviders array
     */
    public addToSelectedProviders(event, provider) {
        // add provider to selectedProviders array
        this.selectedProviders.push(provider);

        // remove provider from unselectedProviders array
        this.removeFromUnselectedProviders(provider);

        // update local storage of both provider arrays
        this.saveDataLocally();
    }

    /*
     Adds given provider to the unselectedProviders array
    */
    public addToUnselectedProviders(event, provider) {
        // add provider to unselectedProviders array
        this.unselectedProviders.push(provider);

        // remove provider from selectedProviders array
        this.removeFromSelectedProviders(provider);

        // update local storage of both provider arrays
        this.saveDataLocally();
    }

    /*
     Removes given provider from the unselectedProviders array
    */
    public removeFromUnselectedProviders(provider) {
        // find index of provider in selectedProviders array
        const providerIndex = this.unselectedProviders.indexOf(provider);

       if (providerIndex >= 0) {
           // remove provider from selectedProviders array using index
           this.unselectedProviders.splice(providerIndex, 1);
       }
    }

    /*
     Removes given provider from the selectedProviders array
    */
    public removeFromSelectedProviders(provider) {
        // find index of provider in selectedProviders array
        const providerIndex = this.selectedProviders.indexOf(provider);

        if (providerIndex >= 0) {
            // remove provider from selectedProviders array using index
            this.selectedProviders.splice(providerIndex, 1);
        }
    }

    /*
       Saves the provider arrays into local storage
     */
    public saveDataLocally() {
        localStorage.setItem('unselectedProviders', JSON.stringify(this.unselectedProviders));
        localStorage.setItem('selectedProviders', JSON.stringify(this.selectedProviders));
    }

    ngOnInit() {
        // INI: load provider array data from local storage
        const local_unselectedProviders = localStorage.getItem('unselectedProviders');
        const local_selectedProviders   = localStorage.getItem('selectedProviders');

        // CHECK: if unselectedProvider array data exists in local storage
        //        if true, load into the unselectedProviders array
        if (local_unselectedProviders && local_unselectedProviders !== '') {
            this.unselectedProviders = JSON.parse(local_unselectedProviders);
        }

        // CHECK: if selectedProviders array data exists in local storage
        //        if true, load into the selectedProviders array
        if (local_selectedProviders && local_selectedProviders !== '') {
            this.selectedProviders = JSON.parse(local_selectedProviders);
        }


    }

}
