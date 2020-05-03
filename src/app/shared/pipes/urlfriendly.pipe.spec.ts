import { URLFriendlyPipe } from './urlfriendly.pipe';

describe('URLFriendlyPipe', () => {
  it('create an instance', () => {
    const pipe = new URLFriendlyPipe();
    expect(pipe).toBeTruthy();
  });
});
