import { TaskListUIPage } from './app.po';

describe('task-list-ui App', () => {
  let page: TaskListUIPage;

  beforeEach(() => {
    page = new TaskListUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
