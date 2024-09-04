import { makeAutoObservable, runInAction, action } from 'mobx';
import { ISection, ISectionNLabel } from '@api/SectionApi';

class SectionStore {
  sections: ISection[] = [];
  sectionNLabel: ISectionNLabel | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  clear() {
    runInAction(() => {
      this.sections = [];
      this.sectionNLabel = null;
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

  setSectionNLabel(sectionNlabel: ISectionNLabel) {
    runInAction(()=> {
      this.sectionNLabel = sectionNlabel;
    })
  }

  getSectionNLabel() {
    return this.sectionNLabel;
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
    runInAction(() => {
      const index = this.sections.findIndex(section => section.id === updatedSection.id);
      if (index !== -1) {
          this.sections[index] = updatedSection;
        };
      });
  }

  getSection(id: number) {
    return this.sections.find(section => section.id === id);
  }

  deleteSection(id: number) {
    runInAction(() => {
      this.sections = this.sections.filter(section => section.id !== id);
    });
  }

  //강제 리랜더링
  //sectionStore.triggerRerender();
  triggerRerender = action(() => {
    this.sections = [...this.sections];
  });
}

const sectionStore = new SectionStore();
export default sectionStore;