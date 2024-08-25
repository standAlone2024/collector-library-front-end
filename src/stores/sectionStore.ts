import { makeAutoObservable, runInAction } from 'mobx';
import { ISection } from '@model/ISection';

class SectionStore {
  sections: ISection[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  clear() {
    runInAction(() => {
      this.sections = [];
    });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setSections(sections: ISection[]){
    runInAction(() => {
      this.sections = sections;
    });
  }

  getSections(){
    return this.sections;
  }

  addSection(section: ISection) {
    runInAction(() => {
      this.sections.push(section);
    });
  }

  updateSection(updatedSection: ISection) {
    const index = this.sections.findIndex(section => section.id === updatedSection.id);
    if (index !== -1) {
      runInAction(() => {
        this.sections[index] = updatedSection;
      });
    }
  }

  getSection(id: number) {
    return this.sections.find(section => section.id === id);
  }

  deleteSection(id: number) {
    runInAction(() => {
      this.sections = this.sections.filter(section => section.id !== id);
    });
  }
}

const sectionStore = new SectionStore();
export default sectionStore;