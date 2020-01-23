import { LightningElement, api, track } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class ViewEditSobject extends LightningElement {
    @api objectApiName;
    @api layoutType;
    @api mode;
    @api availableActions = [];

    @track _recordId;

    @api
    get recordId() {
        return this._recordId;
    }
    set recordId(value) {
        this._recordId = value;
    }

    handleSubmit() {
    }
    
    handleSuccess(event) {
        this._recordId = event.detail.id;
        this.notifyChangeToFlow('recordId', this._recordId);
        this.handleGoNext();
    }

    notifyChangeToFlow(attributeName, attributeValue) {
        const attributeChangeEvent = new FlowAttributeChangeEvent(attributeName, attributeValue);
        this.dispatchEvent(attributeChangeEvent);
    }

    handleGoNext() {
        // check if NEXT is allowed on this screen
        if (this.availableActions.find(action => action === 'NEXT')) {
            // navigate to the next screen
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        }
    }
}