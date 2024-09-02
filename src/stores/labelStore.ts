import { makeAutoObservable, runInAction } from 'mobx';
import { ISectionOptLabel } from '@api/LabelApi';

class LabelStore {
    labels: ISectionOptLabel[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setLabels(labels: ISectionOptLabel[]) {
        runInAction(()=> {
            this.labels = labels;
        })
    }

    getLabels() {
        return this.labels;
    }

    addLabel(label: ISectionOptLabel) {
         runInAction(()=> {
            this.labels.push(label);
         });
    }

    updateLabel(updateLabel: ISectionOptLabel) {
        runInAction(() => {
            const index = this.labels.findIndex(label => label.id === updateLabel.id);
            if(index !== 1) {
                this.labels[index] = updateLabel;
            }
        });
    }

    deleteLabel(id: number) {
        runInAction(() => {
            this.labels = this.labels.filter(label => label.id !== id);
        });
    }
}
const labelStore = new LabelStore();
export default labelStore;